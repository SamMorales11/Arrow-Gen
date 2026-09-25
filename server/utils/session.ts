import { auth } from './auth'
import { createError } from 'h3'
import type { H3Event } from 'h3'

/**
 * ============================================================================
 * SERVER SESSION UTILITIES
 * ============================================================================
 * Helper untuk memeriksa sesi dan mengamankan rute API di backend Nitro.
 */

/**
 * Mengambil session aktif saat ini dari request H3.
 */
export async function getServerSession(event: H3Event) {
  return await auth.api.getSession({
    headers: event.headers
  })
}

/**
 * Memastikan pemanggil sudah login. Melempar error 401 jika belum ada sesi aktif.
 */
export async function requireAuth(event: H3Event) {
  const session = await getServerSession(event)
  if (!session || !session.user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
      message: 'You must be signed in to perform this action.'
    })
  }

  // Cek apakah akun dinonaktifkan oleh administrator
  const user = session.user as { isActive?: boolean; role?: string }
  if (user.isActive === false) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Forbidden',
      message: 'Your account has been deactivated. Please contact an administrator.'
    })
  }

  return session
}

/**
 * Memastikan pemanggil memiliki role tertentu ('admin' atau 'servant').
 * Melempar error 403 Forbidden jika role tidak sesuai atau akun dinonaktifkan.
 */
export async function requireRole(
  event: H3Event,
  allowedRoles: ('admin' | 'servant')[]
) {
  const session = await requireAuth(event)
  const userRole = (session.user as { role?: string })?.role || 'servant'

  if (!allowedRoles.includes(userRole as 'admin' | 'servant')) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Forbidden',
      message: 'You do not have the required permissions for this action.'
    })
  }

  return session
}
