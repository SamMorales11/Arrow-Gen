import { createError } from 'h3'

/**
 * ============================================================================
 * INPUT SANITIZATION & SAFE ERROR UTILITIES
 * ============================================================================
 * Helper untuk sanitasi data input, validasi format, dan pencegahan
 * kebocoran informasi sensitif (database stack trace, SQL query, dsb) di server.
 */

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/
const PHONE_REGEX = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{6,16}$/
const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

/**
 * Menghilangkan tag HTML dan karakter berbahaya untuk mencegah Stored XSS.
 */
export function stripHtml(input: unknown): string {
  if (typeof input !== 'string') return ''
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
    .replace(/<[^>]+>/g, '')
    .trim()
}

/**
 * Validasi dan sanitasi string dengan batasan panjang minimum dan maksimum.
 */
export function sanitizeString(
  input: unknown,
  options: { minLen?: number; maxLen?: number; stripTags?: boolean } = {}
): string {
  if (typeof input !== 'string') return ''
  let result = input.trim()

  if (options.stripTags !== false) {
    result = stripHtml(result)
  }

  if (options.maxLen && options.maxLen > 0) {
    result = result.slice(0, options.maxLen)
  }

  return result
}

/**
 * Memeriksa apakah format email valid dan aman.
 */
export function isValidEmail(email: string): boolean {
  if (!email || email.length > 255) return false
  return EMAIL_REGEX.test(email.trim().toLowerCase())
}

/**
 * Memeriksa apakah nomor telepon memiliki format yang wajar.
 */
export function isValidPhone(phone: string): boolean {
  if (!phone || phone.length > 30) return false
  return PHONE_REGEX.test(phone.trim())
}

/**
 * Memeriksa apakah format URL valid dan hanya menggunakan protokol aman (http, https, atau relative path).
 * Mencegah URI berbahaya seperti javascript: atau data:.
 */
export function isValidUrl(url: string): boolean {
  if (!url || typeof url !== 'string') return false
  const trimmed = url.trim()
  if (trimmed.length > 500) return false

  // Relative path yang diawali '/'
  if (trimmed.startsWith('/') && !trimmed.startsWith('//')) {
    return true
  }

  // Absolute URL
  try {
    const parsed = new URL(trimmed)
    return parsed.protocol === 'http:' || parsed.protocol === 'https:'
  } catch {
    return false
  }
}

const DATA_IMAGE_PREFIX_REGEX = /^data:image\/(jpeg|jpg|png|webp|gif|svg\+xml);base64,/i

/**
 * Memeriksa apakah format URL foto valid:
 * 1. Data URL base64 gambar aman (data:image/...) hingga ~7MB
 * 2. Standard HTTP / HTTPS URL
 * 3. Relative path aman (/...)
 */
export function isValidImageUrl(url: string): boolean {
  if (!url || typeof url !== 'string') return false
  const trimmed = url.trim()

  // 1. Base64 Data URL dari file picker browser
  if (trimmed.startsWith('data:image/')) {
    // Batasi panjang string maksimal 7.5 MB (~5.5MB binary)
    if (trimmed.length > 7.5 * 1024 * 1024) return false
    return DATA_IMAGE_PREFIX_REGEX.test(trimmed)
  }

  // 2. Standard URL atau relative path
  return isValidUrl(trimmed)
}

/**
 * Memeriksa apakah string merupakan format UUID valid.
 */
export function isValidUuid(id: string): boolean {
  if (!id || typeof id !== 'string') return false
  return UUID_REGEX.test(id.trim())
}

/**
 * Penangan error server yang aman.
 * - Membiarkan H3 user errors (4xx) tetap diteruskan ke client dengan pesan aslinya.
 * - Mencegah kebocoran stack trace database, query SQL, atau kredensial internal untuk error 500.
 */
export function handleServerError(
  error: unknown,
  fallbackMessage = 'An unexpected server error occurred. Please try again later.'
): never {
  // Jika error merupakan H3 error dengan status 4xx, re-throw langsung
  if (error && typeof error === 'object' && 'statusCode' in error) {
    const h3Error = error as { statusCode?: number }
    if (typeof h3Error.statusCode === 'number' && h3Error.statusCode >= 400 && h3Error.statusCode < 500) {
      throw error
    }
  }

  // Log error lengkap di console server (internal only)
  console.error('❌ [Internal Server Exception]:', error)

  // Kembalikan error 500 generik tanpa membocorkan detail database ke response client
  throw createError({
    statusCode: 500,
    statusMessage: 'Internal Server Error',
    message: fallbackMessage
  })
}
