import { defineEventHandler, toWebRequest } from 'h3'
import { auth } from '../../utils/auth'

/**
 * ============================================================================
 * BETTER AUTH NITRO SERVER HANDLER
 * ============================================================================
 * Menghandle seluruh endpoint autentikasi otomatis dari Better Auth:
 * - POST /api/auth/sign-up/email
 * - POST /api/auth/sign-in/email
 * - POST /api/auth/sign-out
 * - GET  /api/auth/get-session
 * dsb.
 */
export default defineEventHandler((event) => {
  return auth.handler(toWebRequest(event))
})
