import { defineEventHandler, getRouterParam, readBody, createError } from 'h3'
import { eq } from 'drizzle-orm'
import { db, schedules } from '../../database'

/**
 * ============================================================================
 * PUT /api/schedules/[id]
 * ============================================================================
 * Mengubah data jadwal yang sudah ada berdasarkan ID.
 * Mendukung pembaruan parsial maupun penuh.
 */

interface UpdateScheduleBody {
  title?: unknown
  day?: unknown
  time?: unknown
  location?: unknown
  theme?: unknown
  isActive?: unknown
}

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

export default defineEventHandler(async (event) => {
  // 1. Ambil dan validasi ID dari parameter rute
  const id = getRouterParam(event, 'id')

  if (!id || !UUID_REGEX.test(id)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      message: 'Invalid schedule ID format. Must be a valid UUID.'
    })
  }

  // 2. Periksa apakah jadwal dengan ID tersebut ada di database
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

  // 3. Parse dan validasi field update
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
    updateData.title = body.title.trim().slice(0, 255)
  }

  if (body.day !== undefined) {
    if (typeof body.day !== 'string' || !body.day.trim()) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Bad Request',
        message: 'Day cannot be empty.'
      })
    }
    updateData.day = body.day.trim().slice(0, 50)
  }

  if (body.time !== undefined) {
    if (typeof body.time !== 'string' || !body.time.trim()) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Bad Request',
        message: 'Time cannot be empty.'
      })
    }
    updateData.time = body.time.trim().slice(0, 50)
  }

  if (body.location !== undefined) {
    if (typeof body.location !== 'string' || !body.location.trim()) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Bad Request',
        message: 'Location cannot be empty.'
      })
    }
    updateData.location = body.location.trim()
  }

  if (body.theme !== undefined) {
    updateData.theme =
      typeof body.theme === 'string' && body.theme.trim() ? body.theme.trim() : null
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
    console.error(`❌ [PUT /api/schedules/${id} Error]:`, error)

    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
      message: 'Failed to update schedule. Please try again later.'
    })
  }
})
