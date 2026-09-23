import { defineEventHandler, getQuery, createError } from 'h3'
import { eq, asc } from 'drizzle-orm'
import { db, schedules } from '../../database'

/**
 * ============================================================================
 * GET /api/schedules
 * ============================================================================
 * Mengambil jadwal ibadah & fellowship.
 * - Secara default hanya mengambil jadwal yang aktif (isActive = true).
 * - Mendukung query param ?all=true untuk mengambil semua jadwal (termasuk non-aktif).
 * - Terbuka untuk akses publik.
 */
export default defineEventHandler(async (event) => {
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
    console.error('❌ [GET /api/schedules Error]:', error)

    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
      message: 'Failed to retrieve schedules. Please try again later.'
    })
  }
})
