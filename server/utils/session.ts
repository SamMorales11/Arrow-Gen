import { auth } from './auth'
import { createError } from 'h3'
import type { H3Event } from 'h3'

/**
 * ============================================================================
 * SERVER SESSION UTILITIES
 * ============================================================================
 * Helper untuk memeriksa sesi dan mengamankan rute API di backend Nitro.
 *
 * ARSITEKTUR KEAMANAN ROLE "DEMO":
 * - Role 'demo' DIIZINKAN di endpoint GET (read) melalui requireRole(['admin', 'servant', 'demo'])
 * - Role 'demo' OTOMATIS DIBLOKIR di semua endpoint write (POST/PUT/PATCH/DELETE) karena
 *   endpoint tersebut hanya mengizinkan ['admin', 'servant'] — tanpa perlu logika tambahan.
 * - Ini berarti pemblokiran terjadi di level API server, tidak bisa dibypass dari frontend.
 */

/** Tipe role yang didukung dalam sistem */
export type UserRole = 'admin' | 'servant' | 'demo'

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
 * Memastikan pemanggil memiliki role tertentu.
 * Melempar error 403 Forbidden jika role tidak sesuai atau akun dinonaktifkan.
 *
 * CATATAN KEAMANAN:
 * - Endpoint GET yang boleh diakses demo: gunakan ['admin', 'servant', 'demo']
 * - Endpoint WRITE (POST/PUT/PATCH/DELETE): gunakan ['admin', 'servant']
 *   → Role 'demo' otomatis diblokir dengan 403 tanpa kode tambahan.
 */
export async function requireRole(
  event: H3Event,
  allowedRoles: UserRole[]
) {
  const session = await requireAuth(event)
  const userRole = (session.user as { role?: string })?.role || 'servant'

  if (!allowedRoles.includes(userRole as UserRole)) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Forbidden',
      message:
        userRole === 'demo'
          ? 'Demo accounts have read-only access. Write operations are not permitted.'
          : 'You do not have the required permissions for this action.'
    })
  }

  return session
}
