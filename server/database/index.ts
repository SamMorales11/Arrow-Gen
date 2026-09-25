import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import * as schema from './schema'

/**
 * ============================================================================
 * NEON SERVERLESS + DRIZZLE ORM DATABASE CLIENT
 * ============================================================================
 * Koneksi ini menggunakan driver HTTP Neon (@neondatabase/serverless + drizzle-orm/neon-http).
 * Driver ini dirancang khusus untuk lingkungan serverless (seperti Vercel, Netlify,
 * atau Cloudflare) karena:
 * 1. Menjalankan query melalui stateless HTTPS tanpa overhead koneksi TCP persisten.
 * 2. Menghindari masalah connection exhaustion / limit pool pada fungsi serverless.
 * 3. Mengurangi latensi cold start secara signifikan.
 */

/**
 * Memastikan connection string memiliki format yang aman dan sesuai untuk Neon PostgreSQL.
 * Neon Serverless mewajibkan SSL/TLS (sslmode=require) saat diakses melalui internet.
 */
function getSafeDatabaseUrl(rawUrl?: string): string {
  if (!rawUrl) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error(
        '❌ [Database Fatal Error]: DATABASE_URL is not defined in environment variables! Please configure it in your Vercel project settings.'
      )
    }
    console.warn(
      '⚠️ [Database Warning]: DATABASE_URL is not set in process.env. Database operations will fail.'
    )
    return ''
  }

  // Jika menggunakan Neon PostgreSQL dan belum memiliki parameter sslmode, tambahkan secara otomatis
  if (rawUrl.includes('neon.tech') && !rawUrl.includes('sslmode=')) {
    const separator = rawUrl.includes('?') ? '&' : '?'
    return `${rawUrl}${separator}sslmode=require`
  }

  return rawUrl
}

// 1. Membaca dan memvalidasi connection string
const connectionString = getSafeDatabaseUrl(process.env.DATABASE_URL)

// 2. Inisialisasi HTTP client Neon
const sql = neon(connectionString)

// 3. Inisialisasi Drizzle ORM dengan schema registry
export const db = drizzle(sql, { schema })

// 4. Ekspor schema dan sql client untuk kemudahan akses
export * from './schema'
export { sql }
