import { defineEventHandler, readBody, createError } from 'h3'
import { db, photos } from '../../database'

/**
 * ============================================================================
 * POST /api/photos
 * ============================================================================
 * Menambahkan foto baru ke dalam koleksi Photo Reel.
 * Validasi ketat pada `url`, `alt`, dan urutan `order`.
 */

interface CreatePhotoBody {
  url?: unknown
  alt?: unknown
  order?: unknown
  isActive?: unknown
}

export default defineEventHandler(async (event) => {
  const body = (await readBody<CreatePhotoBody>(event)) || {}

  // 1. Validasi field 'url'
  if (typeof body.url !== 'string' || !body.url.trim()) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      message: 'Photo URL is required.'
    })
  }
  const cleanUrl = body.url.trim()

  // 2. Validasi field 'alt' (opsional)
  let cleanAlt = ''
  if (typeof body.alt === 'string') {
    cleanAlt = body.alt.trim().slice(0, 255)
  }

  // 3. Validasi field 'order' (opsional, default 0)
  let cleanOrder = 0
  if (typeof body.order === 'number' && Number.isInteger(body.order)) {
    cleanOrder = body.order
  } else if (typeof body.order === 'string' && /^-?\d+$/.test(body.order.trim())) {
    cleanOrder = parseInt(body.order.trim(), 10)
  }

  // 4. Validasi field 'isActive' (opsional, default true)
  const cleanIsActive = typeof body.isActive === 'boolean' ? body.isActive : true

  // 5. Simpan ke database Neon melalui Drizzle
  try {
    const [newPhoto] = await db
      .insert(photos)
      .values({
        url: cleanUrl,
        alt: cleanAlt,
        order: cleanOrder,
        isActive: cleanIsActive
      })
      .returning()

    return {
      success: true,
      message: 'Photo added to reel successfully.',
      data: newPhoto
    }
  } catch (error: unknown) {
    console.error('❌ [POST /api/photos Error]:', error)

    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
      message: 'Failed to add photo. Please try again later.'
    })
  }
})
