import { defineEventHandler, getRouterParam, getQuery, createError } from 'h3'
import { eq } from 'drizzle-orm'
import { db, photos } from '../../database'
import { requireRole } from '../../utils/session'
import { isValidUuid, handleServerError } from '../../utils/sanitize'

/**
 * ============================================================================
 * DELETE /api/photos/[id]
 * ============================================================================
 * Menghapus foto dari Photo Reel berdasarkan ID (UUID).
 * - Akses terbatas: hanya untuk role 'admin'.
 * - Default: Menghapus permanen (Hard Delete) dari tabel photos.
 * - Soft Delete: Jika dikirim query param `?soft=true`, foto hanya dinonaktifkan (`isActive: false`).
 * - Error handling aman tanpa kebocoran data internal.
 */

export default defineEventHandler(async (event) => {
  // 1. Otorisasi role: Hanya admin
  await requireRole(event, ['admin'])

  // 2. Ambil dan validasi ID dari parameter rute
  const id = getRouterParam(event, 'id')

  if (!id || !isValidUuid(id)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      message: 'Invalid photo ID format. Must be a valid UUID.'
    })
  }

  // 3. Periksa apakah foto ada di database
  const [existingPhoto] = await db
    .select()
    .from(photos)
    .where(eq(photos.id, id))
    .limit(1)

  if (!existingPhoto) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Not Found',
      message: `Photo with ID '${id}' not found.`
    })
  }

  const query = getQuery(event)
  const isSoftDelete = query.soft === 'true'

  try {
    if (isSoftDelete) {
      // Soft Delete: Tandai isActive = false
      const [softDeletedPhoto] = await db
        .update(photos)
        .set({ isActive: false })
        .where(eq(photos.id, id))
        .returning()

      return {
        success: true,
        message: 'Photo deactivated (soft deleted) successfully.',
        data: softDeletedPhoto
      }
    } else {
      // Hard Delete (Default): Hapus dari tabel
      await db.delete(photos).where(eq(photos.id, id))

      return {
        success: true,
        message: 'Photo deleted successfully.',
        data: {
          id,
          url: existingPhoto.url,
          deleted: true
        }
      }
    }
  } catch (error: unknown) {
    handleServerError(error, 'Failed to delete photo. Please try again later.')
  }
})
