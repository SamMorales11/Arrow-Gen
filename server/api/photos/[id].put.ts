import { defineEventHandler, getRouterParam, readBody, createError } from 'h3'
import { eq } from 'drizzle-orm'
import { db, photos } from '../../database'
import { requireRole } from '../../utils/session'
import { isValidUuid, isValidImageUrl, sanitizeString, handleServerError } from '../../utils/sanitize'

/**
 * ============================================================================
 * PUT /api/photos/[id]
 * ============================================================================
 * Mengubah data foto yang ada di Photo Reel berdasarkan ID (UUID).
 * - Akses terbatas: hanya untuk role 'admin'.
 * - Validasi format UUID, protokol URL aman, dan tipe data.
 * - Error handling aman tanpa membocorkan detail database.
 */

interface UpdatePhotoBody {
  url?: unknown
  alt?: unknown
  order?: unknown
  isActive?: unknown
}

export default defineEventHandler(async (event) => {
  // 1. Otorisasi role: Hanya admin
  await requireRole(event, ['admin'])

  // 2. Ambil dan validasi ID dari route parameter
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

  // 4. Parse dan validasi field update
  const body = (await readBody<UpdatePhotoBody>(event)) || {}
  const updateData: Partial<typeof photos.$inferInsert> = {}

  if (body.url !== undefined) {
    if (typeof body.url !== 'string' || !body.url.trim()) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Bad Request',
        message: 'URL cannot be empty.'
      })
    }
    const cleanUrl = body.url.trim()
    if (!isValidImageUrl(cleanUrl)) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Bad Request',
        message: 'Invalid photo format. Only HTTP, HTTPS, relative paths, or uploaded images are allowed.'
      })
    }
    updateData.url = cleanUrl
  }

  if (body.alt !== undefined) {
    updateData.alt = typeof body.alt === 'string' ? sanitizeString(body.alt, { maxLen: 255 }) : ''
  }

  if (body.order !== undefined) {
    if (typeof body.order === 'number' && Number.isInteger(body.order)) {
      updateData.order = Math.max(-1000, Math.min(1000, body.order))
    } else if (typeof body.order === 'string' && /^-?\d+$/.test(body.order.trim())) {
      updateData.order = Math.max(-1000, Math.min(1000, parseInt(body.order.trim(), 10)))
    } else {
      throw createError({
        statusCode: 400,
        statusMessage: 'Bad Request',
        message: 'Order must be an integer.'
      })
    }
  }

  if (body.isActive !== undefined) {
    if (typeof body.isActive !== 'boolean') {
      throw createError({
        statusCode: 400,
        statusMessage: 'Bad Request',
        message: 'isActive must be a boolean value.'
      })
    }
    updateData.isActive = body.isActive
  }

  // 5. Jalankan update ke database
  try {
    const [updatedPhoto] = await db
      .update(photos)
      .set(updateData)
      .where(eq(photos.id, id))
      .returning()

    return {
      success: true,
      message: 'Photo updated successfully.',
      data: updatedPhoto
    }
  } catch (error: unknown) {
    handleServerError(error, 'Failed to update photo. Please try again later.')
  }
})
