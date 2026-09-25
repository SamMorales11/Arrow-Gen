import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { db } from '../database'
import * as schema from '../database/schema'

/**
 * ============================================================================
 * BETTER AUTH SERVER CONFIGURATION
 * ============================================================================
 * Konfigurasi autentikasi modern menggunakan Better Auth dengan adaptor Drizzle ORM.
 * - Menggunakan tabel `users` yang sudah ada di database.
 * - Mendukung role: "admin" dan "servant".
 * - Autentikasi berbasis Email & Password.
 * - Generasi ID kompatibel dengan PostgreSQL UUID.
 */
export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema: {
      user: schema.users,
      session: schema.sessions,
      account: schema.accounts,
      verification: schema.verifications
    }
  }),
  emailAndPassword: {
    enabled: true,
    disableSignUp: true,
    requireEmailVerification: false
  },
  user: {
    additionalFields: {
      role: {
        type: 'string',
        required: false,
        defaultValue: 'servant',
        input: true
      },
      isActive: {
        type: 'boolean',
        required: false,
        defaultValue: true,
        input: false
      }
    }
  },
  advanced: {
    // Memastikan ID yang digenerate adalah UUID standar yang kompatibel dengan PostgreSQL
    database: {
      generateId: 'uuid'
    }
  },
  secret: process.env.BETTER_AUTH_SECRET || 'arrow-gen-auth-secret-key-change-in-production',
  baseURL:
    process.env.BETTER_AUTH_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : 'http://localhost:3000')
})

export type Auth = typeof auth
