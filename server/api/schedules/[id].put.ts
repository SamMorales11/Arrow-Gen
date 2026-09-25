import { defineEventHandler, getRouterParam, readBody, createError } from 'h3'
import { eq } from 'drizzle-orm'
import { db, schedules } from '../../database'
import { requireRole } from '../../utils/session'
import { isValidUuid, sanitizeString, handleServerError } from '../../utils/sanitize'

/**
 * ============================================================================
 * PUT /api/schedules/[id]
 * ============================================================================
 * Mengubah data jadwal yang sudah ada berdasarkan ID.
 * - Akses dilindungi: Hanya untuk user terotentikasi dengan role 'admin' atau 'servant'.
 * - Memvalidasi format UUID dan sanitasi nilai string input.
 * - Error handling aman tanpa membocorkan detail database.
 */

interface UpdateScheduleBody {
  title?: unknown
  day?: unknown
  time?: unknown
  location?: unknown
  theme?: unknown
  isActive?: unknown
}

export default defineEventHandler(async (event) => {
  // 1. Otorisasi role: Hanya admin dan servant
  await requireRole(event, ['admin', 'servant'])

  // 2. Ambil dan validasi ID dari parameter rute
  const id = getRouterParam(event, 'id')

  if (!id || !isValidUuid(id)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      message: 'Invalid schedule ID format. Must be a valid UUID.'
    })
  }

  // 3. Periksa apakah jadwal dengan ID tersebut ada di database
  const [existingSchedule] = await db
    .select()
    .from(schedules)
    .where(eq(schedules.id, id))
    .limit(1)

  if (!existingSchedule) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Not Found',
      message: `Schedule with ID '${id}' not found.`
    })
  }

  // 4. Parse dan validasi field update
  const body = (await readBody<UpdateScheduleBody>(event)) || {}
  const updateData: Partial<typeof schedules.$inferInsert> = {
    updatedAt: new Date()
  }

  if (body.title !== undefined) {
    if (typeof body.title !== 'string' || !body.title.trim()) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Bad Request',
        message: 'Title cannot be empty.'
      })
    }
    updateData.title = sanitizeString(body.title, { maxLen: 255 })
  }

  if (body.day !== undefined) {
    if (typeof body.day !== 'string' || !body.day.trim()) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Bad Request',
        message: 'Day cannot be empty.'
      })
    }
    updateData.day = sanitizeString(body.day, { maxLen: 50 })
  }

  if (body.time !== undefined) {
    if (typeof body.time !== 'string' || !body.time.trim()) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Bad Request',
        message: 'Time cannot be empty.'
      })
    }
    updateData.time = sanitizeString(body.time, { maxLen: 50 })
  }

  if (body.location !== undefined) {
    if (typeof body.location !== 'string' || !body.location.trim()) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Bad Request',
        message: 'Location cannot be empty.'
      })
    }
    updateData.location = sanitizeString(body.location, { maxLen: 255 })
  }

  if (body.theme !== undefined) {
    updateData.theme =
      typeof body.theme === 'string' && body.theme.trim()
        ? sanitizeString(body.theme, { maxLen: 255 })
        : null
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
    const [updatedSchedule] = await db
      .update(schedules)
      .set(updateData)
      .where(eq(schedules.id, id))
      .returning()

    return {
      success: true,
      message: 'Schedule updated successfully.',
      data: updatedSchedule
    }
  } catch (error: unknown) {
    handleServerError(error, 'Failed to update schedule. Please try again later.')
  }
})
