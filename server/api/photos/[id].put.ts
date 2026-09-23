import { defineEventHandler, getRouterParam, readBody, createError } from 'h3'
import { eq } from 'drizzle-orm'
import { db, photos } from '../../database'

/**
 * ============================================================================
 * PUT /api/photos/[id]
 * ============================================================================
 * Mengubah data foto yang ada di Photo Reel berdasarkan ID (UUID).
 * Mendukung pembaruan URL, teks alternatif, urutan display, dan status aktif.
 */

interface UpdatePhotoBody {
  url?: unknown
  alt?: unknown
  order?: unknown
  isActive?: unknown
}

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

export default defineEventHandler(async (event) => {
  // 1. Ambil dan validasi ID dari route parameter
  const id = getRouterParam(event, 'id')

  if (!id || !UUID_REGEX.test(id)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      message: 'Invalid photo ID format. Must be a valid UUID.'
    })
  }

  // 2. Periksa apakah foto ada di database
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

  // 3. Parse dan validasi field update
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
    updateData.url = body.url.trim()
  }

  if (body.alt !== undefined) {
    updateData.alt = typeof body.alt === 'string' ? body.alt.trim().slice(0, 255) : ''
  }

  if (body.order !== undefined) {
    if (typeof body.order === 'number' && Number.isInteger(body.order)) {
      updateData.order = body.order
    } else if (typeof body.order === 'string' && /^-?\d+$/.test(body.order.trim())) {
      updateData.order = parseInt(body.order.trim(), 10)
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

  // 4. Jalankan update ke database
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
    console.error(`❌ [PUT /api/photos/${id} Error]:`, error)

    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
      message: 'Failed to update photo. Please try again later.'
    })
  }
})
