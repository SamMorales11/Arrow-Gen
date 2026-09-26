import { defineEventHandler, getQuery, setHeader } from 'h3'
import { eq, asc } from 'drizzle-orm'
import { db, photos } from '../../database'
import { requireRole } from '../../utils/session'
import { handleServerError } from '../../utils/sanitize'

/**
 * ============================================================================
 * GET /api/photos
 * ============================================================================
 * Mengambil daftar foto untuk Photo Reel.
 * - Publik: Secara default hanya mengambil foto yang aktif (isActive = true).
 * - Admin: Mendukung query param ?all=true yang diproteksi autentikasi role 'admin'.
 * - Diurutkan berdasarkan field `order` secara ascending, lalu waktu pembuatan.
 */
export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event)
    let showAll = false

    // Otorisasi role: Hanya admin yang diizinkan mengambil foto hidden / nonaktif
    if (query.all === 'true') {
      await requireRole(event, ['admin'])
      showAll = true
      setHeader(event, 'Cache-Control', 'no-store, no-cache, must-revalidate')
    } else {
      // Public caching: 120s browser, 600s CDN edge cache
      setHeader(event, 'Cache-Control', 'public, max-age=120, s-maxage=600, stale-while-revalidate=1200')
    }

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
    handleServerError(error, 'Failed to retrieve photos. Please try again later.')
  }
})
