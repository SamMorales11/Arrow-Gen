import { defineEventHandler, readBody, createError } from 'h3'
import { db, photos } from '../../database'
import { requireRole } from '../../utils/session'
import { isValidImageUrl, sanitizeString, handleServerError } from '../../utils/sanitize'

/**
 * ============================================================================
 * POST /api/photos
 * ============================================================================
 * Menambahkan foto baru ke dalam koleksi Photo Reel.
 * - Akses terbatas: hanya untuk role 'admin'.
 * - Validasi ketat pada `url` (HTTP, HTTPS, local static path, atau Base64 image data URL), `alt`, dan urutan `order`.
 */

interface CreatePhotoBody {
  url?: unknown
  alt?: unknown
  order?: unknown
  isActive?: unknown
}

export default defineEventHandler(async (event) => {
  // 1. Otorisasi role: Hanya admin
  await requireRole(event, ['admin'])

  const body = (await readBody<CreatePhotoBody>(event)) || {}

  // 2. Validasi field 'url'
  if (typeof body.url !== 'string' || !body.url.trim()) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      message: 'Photo URL or uploaded image is required.'
    })
  }

  const cleanUrl = body.url.trim()
  if (!isValidImageUrl(cleanUrl)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      message: 'Invalid photo format. Please provide a valid HTTP/HTTPS URL or upload an image file (PNG, JPG, WEBP).'
    })
  }

  // 3. Validasi field 'alt' (opsional)
  let cleanAlt = ''
  if (typeof body.alt === 'string') {
    cleanAlt = sanitizeString(body.alt, { maxLen: 255 })
  }

  // 4. Validasi field 'order' (opsional, default 0)
  let cleanOrder = 0
  if (typeof body.order === 'number' && Number.isInteger(body.order)) {
    cleanOrder = Math.max(-1000, Math.min(1000, body.order))
  } else if (typeof body.order === 'string' && /^-?\d+$/.test(body.order.trim())) {
    cleanOrder = Math.max(-1000, Math.min(1000, parseInt(body.order.trim(), 10)))
  }

  // 5. Validasi field 'isActive' (opsional, default true)
  const cleanIsActive = typeof body.isActive === 'boolean' ? body.isActive : true

  // 6. Simpan ke database Neon melalui Drizzle
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
    handleServerError(error, 'Failed to add photo. Please try again later.')
  }
})
