import { getRequestIP, getHeader, setResponseHeaders, createError } from 'h3'
import type { H3Event } from 'h3'

interface RateLimitRecord {
  count: number
  resetAt: number
}

export interface RateLimitConfig {
  /** Maximum number of requests allowed in the window */
  maxRequests: number
  /** Window size in seconds */
  windowSeconds: number
  /** Namespace identifier for the endpoint, e.g. 'vault-submit' or 'crew-submit' */
  keyPrefix?: string
}

// In-memory rate limiting map
const rateLimitMap = new Map<string, RateLimitRecord>()

// Periodically clean up expired rate-limit records every 5 minutes
const cleanupTimer = setInterval(() => {
  const now = Date.now()
  for (const [key, record] of rateLimitMap.entries()) {
    if (now > record.resetAt) {
      rateLimitMap.delete(key)
    }
  }
}, 5 * 60 * 1000)

// Do not prevent process exit in CLI or tests
if (typeof cleanupTimer === 'object' && cleanupTimer && 'unref' in cleanupTimer) {
  (cleanupTimer as { unref: () => void }).unref()
}

/**
 * Mengambil client IP address dari request secara aman dengan fallback berjenjang.
 */
export function getClientIp(event: H3Event): string {
  // Cloudflare Connecting IP
  const cfConnectingIp = getHeader(event, 'cf-connecting-ip')
  if (cfConnectingIp && cfConnectingIp.trim()) {
    return cfConnectingIp.trim()
  }

  // Reverse Proxy Real IP
  const xRealIp = getHeader(event, 'x-real-ip')
  if (xRealIp && xRealIp.trim()) {
    return xRealIp.trim()
  }

  // Standard X-Forwarded-For (ambil IP pertama/paling kiri yang merupakan client asli)
  const xForwardedFor = getHeader(event, 'x-forwarded-for')
  if (xForwardedFor && xForwardedFor.trim()) {
    const ips = xForwardedFor.split(',')
    const firstIp = ips[0]?.trim()
    if (firstIp) return firstIp
  }

  // H3 Built-in getRequestIP helper
  const h3Ip = getRequestIP(event, { xForwardedFor: true })
  if (h3Ip && h3Ip.trim()) {
    return h3Ip.trim()
  }

  // Node.js Socket Remote Address
  const socketAddress = event.node?.req?.socket?.remoteAddress
  if (socketAddress && socketAddress.trim()) {
    return socketAddress.trim()
  }

  return '127.0.0.1'
}

/**
 * Memeriksa rate limit untuk request saat ini.
 * Jika batas terlampaui, otomatis mengirimkan header Retry-After dan melempar error HTTP 429.
 */
export function checkRateLimit(event: H3Event, config: RateLimitConfig): void {
  const ip = getClientIp(event)
  const prefix = config.keyPrefix || 'global'
  const storeKey = `${prefix}:${ip}`
  const now = Date.now()

  let record = rateLimitMap.get(storeKey)

  // Inisialisasi baru jika belum ada atau window sebelumnya telah berakhir
  if (!record || now > record.resetAt) {
    record = {
      count: 1,
      resetAt: now + config.windowSeconds * 1000
    }
    rateLimitMap.set(storeKey, record)
  } else {
    record.count += 1
  }

  const remaining = Math.max(0, config.maxRequests - record.count)
  const resetSeconds = Math.max(1, Math.ceil((record.resetAt - now) / 1000))

  // Pasang standard rate-limit headers
  setResponseHeaders(event, {
    'X-RateLimit-Limit': String(config.maxRequests),
    'X-RateLimit-Remaining': String(remaining),
    'X-RateLimit-Reset': String(Math.ceil(record.resetAt / 1000))
  })

  // Cek apakah melebihi ambang batas
  if (record.count > config.maxRequests) {
    setResponseHeaders(event, {
      'Retry-After': String(resetSeconds)
    })

    const minutes = Math.ceil(resetSeconds / 60)
    throw createError({
      statusCode: 429,
      statusMessage: 'Too Many Requests',
      message: `Too many submissions detected from your connection. Please wait ${minutes} minute${minutes > 1 ? 's' : ''} before trying again.`
    })
  }
}
