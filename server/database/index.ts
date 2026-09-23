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

// 1. Membaca connection string dari process.env.DATABASE_URL
const connectionString = process.env.DATABASE_URL

if (!connectionString && process.env.NODE_ENV !== 'production') {
  console.warn(
    '⚠️ [Database Warning]: DATABASE_URL is not set in process.env. Please verify your .env file.'
  )
}

// 2. Inisialisasi HTTP client Neon
const sql = neon(connectionString || '')

// 3. Inisialisasi Drizzle ORM dengan schema registry
export const db = drizzle(sql, { schema })

// 4. Ekspor schema dan sql client untuk kemudahan akses
export * from './schema'
export { sql }
