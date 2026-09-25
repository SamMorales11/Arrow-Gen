import { defineEventHandler, getQuery } from 'h3'
import { eq, asc } from 'drizzle-orm'
import { db, schedules } from '../../database'
import { requireRole } from '../../utils/session'
import { handleServerError } from '../../utils/sanitize'

/**
 * ============================================================================
 * GET /api/schedules
 * ============================================================================
 * Mengambil jadwal ibadah & fellowship.
 * - Akses dilindungi: Hanya untuk user terotentikasi dengan role 'admin' atau 'servant'.
 * - Secara default hanya mengambil jadwal yang aktif (isActive = true).
 * - Mendukung query param ?all=true untuk mengambil semua jadwal (termasuk non-aktif).
 */
export default defineEventHandler(async (event) => {
  // 1. Otorisasi role: Admin, servant, dan demo (read-only) diizinkan
  await requireRole(event, ['admin', 'servant', 'demo'])

  try {
    const query = getQuery(event)
    const showAll = query.all === 'true'

    const queryBuilder = db.select().from(schedules)

    const data = showAll
      ? await queryBuilder.orderBy(asc(schedules.createdAt))
      : await queryBuilder.where(eq(schedules.isActive, true)).orderBy(asc(schedules.createdAt))

    return {
      success: true,
      message: 'Schedules retrieved successfully.',
      total: data.length,
      data
    }
  } catch (error: unknown) {
    handleServerError(error, 'Failed to retrieve schedules. Please try again later.')
  }
})
