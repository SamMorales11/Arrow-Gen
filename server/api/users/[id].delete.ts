import { defineEventHandler, getRouterParam, createError } from 'h3'
import { eq } from 'drizzle-orm'
import { db, users } from '../../database'
import { requireRole } from '../../utils/session'

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

/**
 * ============================================================================
 * DELETE /api/users/:id
 * ============================================================================
 * Menghapus akun Pelayan Tuhan (Servant) dari sistem.
 * - Akses eksklusif: Hanya untuk role 'admin'.
 * - Mencegah admin menghapus akunnya sendiri.
 * - Cascade delete menghapus sessions dan accounts secara otomatis.
 */
export default defineEventHandler(async (event) => {
  // 1. Otorisasi role: Hanya admin
  const session = await requireRole(event, ['admin'])

  // 2. Validasi ID parameter (UUID)
  const id = getRouterParam(event, 'id')
  if (!id || !UUID_REGEX.test(id)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      message: 'Invalid user ID format (must be a valid UUID).'
    })
  }

  // 3. Mencegah admin menghapus diri sendiri
  if (session.user.id === id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      message: 'You cannot delete your own admin account.'
    })
  }

  // 4. Pastikan user ada di database
  const [existingUser] = await db
    .select()
    .from(users)
    .where(eq(users.id, id))
    .limit(1)

  if (!existingUser) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Not Found',
      message: `User with ID "${id}" was not found.`
    })
  }

  // 5. Eksekusi penghapusan di database
  try {
    await db.delete(users).where(eq(users.id, id))

    return {
      success: true,
      message: `User "${existingUser.name}" (${existingUser.email}) has been permanently deleted.`,
      data: {
        id,
        name: existingUser.name,
        email: existingUser.email
      }
    }
  } catch (error: unknown) {
    console.error(`❌ [DELETE /api/users/${id} Error]:`, error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
      message: 'Failed to delete user account.'
    })
  }
})
