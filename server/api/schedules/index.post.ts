import { defineEventHandler, readBody, createError } from 'h3'
import { db, schedules } from '../../database'
import { requireRole } from '../../utils/session'
import { sanitizeString, handleServerError } from '../../utils/sanitize'

/**
 * ============================================================================
 * POST /api/schedules
 * ============================================================================
 * Membuat entri jadwal ibadah / kegiatan baru.
 * - Akses dilindungi: Hanya untuk user terotentikasi dengan role 'admin' atau 'servant'.
 * - Melakukan sanitasi dan validasi ketat pada seluruh field input.
 * - Error handling aman tanpa kebocoran data database.
 */

interface CreateScheduleBody {
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

  const body = (await readBody<CreateScheduleBody>(event)) || {}

  // 2. Validasi field 'title'
  if (typeof body.title !== 'string' || !body.title.trim()) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      message: 'Title is required.'
    })
  }
  const cleanTitle = sanitizeString(body.title, { maxLen: 255 })
  if (cleanTitle.length < 2) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      message: 'Title must be at least 2 characters.'
    })
  }

  // 3. Validasi field 'day'
  if (typeof body.day !== 'string' || !body.day.trim()) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      message: 'Day is required (e.g., Saturday, Sunday).'
    })
  }
  const cleanDay = sanitizeString(body.day, { maxLen: 50 })

  // 4. Validasi field 'time'
  if (typeof body.time !== 'string' || !body.time.trim()) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      message: 'Time is required (e.g., 17:00 WIB).'
    })
  }
  const cleanTime = sanitizeString(body.time, { maxLen: 50 })

  // 5. Validasi field 'location'
  if (typeof body.location !== 'string' || !body.location.trim()) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      message: 'Location is required.'
    })
  }
  const cleanLocation = sanitizeString(body.location, { maxLen: 255 })

  // 6. Validasi field opsional 'theme'
  let cleanTheme: string | null = null
  if (typeof body.theme === 'string' && body.theme.trim()) {
    cleanTheme = sanitizeString(body.theme, { maxLen: 255 })
  }

  // 7. Validasi field 'isActive' (default true jika tidak ditentukan)
  const cleanIsActive = typeof body.isActive === 'boolean' ? body.isActive : true

  // 8. Simpan ke database Neon melalui Drizzle
  try {
    const [newSchedule] = await db
      .insert(schedules)
      .values({
        title: cleanTitle,
        day: cleanDay,
        time: cleanTime,
        location: cleanLocation,
        theme: cleanTheme,
        isActive: cleanIsActive
      })
      .returning()

    return {
      success: true,
      message: 'Schedule created successfully.',
      data: newSchedule
    }
  } catch (error: unknown) {
    handleServerError(error, 'Failed to create schedule. Please try again later.')
  }
})
