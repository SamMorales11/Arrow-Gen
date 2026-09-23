import { defineEventHandler, getQuery, createError } from 'h3'
import { eq, asc } from 'drizzle-orm'
import { db, photos } from '../../database'

/**
 * ============================================================================
 * GET /api/photos
 * ============================================================================
 * Mengambil daftar foto untuk Photo Reel.
 * - Secara default hanya mengambil foto yang aktif (isActive = true).
 * - Diurutkan berdasarkan field `order` secara ascending, lalu waktu pembuatan.
 * - Mendukung query param ?all=true untuk admin.
 * - Terbuka untuk akses publik.
 */
export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event)
    const showAll = query.all === 'true'

    const queryBuilder = db.select().from(photos)

    const data = showAll
      ? await queryBuilder.orderBy(asc(photos.order), asc(photos.createdAt))
      : await queryBuilder
          .where(eq(photos.isActive, true))
          .orderBy(asc(photos.order), asc(photos.createdAt))

    return {
      success: true,
      message: 'Photos retrieved successfully.',
      total: data.length,
      data
    }
  } catch (error: unknown) {
    console.error('❌ [GET /api/photos Error]:', error)

    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
      message: 'Failed to retrieve photos. Please try again later.'
    })
  }
})
