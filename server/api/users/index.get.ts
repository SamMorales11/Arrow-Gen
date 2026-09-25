import { defineEventHandler, getQuery } from 'h3'
import { eq, desc } from 'drizzle-orm'
import { db, users } from '../../database'
import { requireRole } from '../../utils/session'
import { handleServerError } from '../../utils/sanitize'

/**
 * ============================================================================
 * GET /api/users
 * ============================================================================
 * Mengambil daftar user (khususnya Pelayan Tuhan / role 'servant').
 * - Akses eksklusif: Hanya untuk role 'admin'.
 * - Query param ?role=servant (default 'servant') atau 'all'.
 * - Tidak mengekspos field sensitif (password, password_hash, token, secret).
 */
export default defineEventHandler(async (event) => {
  // 1. Otorisasi role: Hanya admin
  await requireRole(event, ['admin'])

  try {
    const query = getQuery(event)
    const targetRole = typeof query.role === 'string' ? query.role.trim().toLowerCase() : 'servant'

    const queryBuilder = db
      .select({
        id: users.id,
        name: users.name,
        email: users.email,
        emailVerified: users.emailVerified,
        image: users.image,
        role: users.role,
        isActive: users.isActive,
        createdAt: users.createdAt,
        updatedAt: users.updatedAt
      })
      .from(users)
      .orderBy(desc(users.createdAt))

    const userList = targetRole === 'all'
      ? await queryBuilder
      : await queryBuilder.where(eq(users.role, targetRole as 'admin' | 'servant'))

    const stats = {
      total: userList.length,
      active: userList.filter(u => u.isActive).length,
      inactive: userList.filter(u => !u.isActive).length
    }

    return {
      success: true,
      message: 'Users retrieved successfully.',
      total: userList.length,
      stats,
      data: userList
    }
  } catch (error: unknown) {
    handleServerError(error, 'Failed to retrieve user list.')
  }
})
