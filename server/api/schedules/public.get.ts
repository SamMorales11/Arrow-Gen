import { defineEventHandler } from 'h3'
import { eq, asc } from 'drizzle-orm'
import { db, schedules } from '../../database'
import { handleServerError } from '../../utils/sanitize'

/**
 * ============================================================================
 * GET /api/schedules/public
 * ============================================================================
 * Mengambil jadwal ibadah & fellowship untuk halaman publik.
 * - TIDAK memerlukan autentikasi — endpoint ini bersifat publik.
 * - Hanya mengembalikan jadwal dengan isActive = true.
 * - Diurutkan berdasarkan waktu pembuatan secara ascending.
 */
export default defineEventHandler(async (_event) => {
  try {
    const data = await db
      .select()
      .from(schedules)
      .where(eq(schedules.isActive, true))
      .orderBy(asc(schedules.createdAt))

    return {
      success: true,
      message: 'Public schedules retrieved successfully.',
      total: data.length,
      data
    }
  } catch (error: unknown) {
    handleServerError(error, 'Failed to retrieve schedules. Please try again later.')
  }
})
