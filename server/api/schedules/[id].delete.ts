import { defineEventHandler, getRouterParam, getQuery, createError } from 'h3'
import { eq } from 'drizzle-orm'
import { db, schedules } from '../../database'
import { requireRole } from '../../utils/session'

/**
 * ============================================================================
 * DELETE /api/schedules/[id]
 * ============================================================================
 * Menghapus jadwal berdasarkan ID.
 * - Akses dilindungi: Hanya untuk user terotentikasi dengan role 'admin' atau 'servant'.
 * - Default: Melakukan Soft Delete dengan menandai `isActive: false` agar histori tetap aman.
 * - Permanent: Jika query param `?permanent=true`, jadwal akan dihapus secara permanen dari database.
 */

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

export default defineEventHandler(async (event) => {
  // 1. Otorisasi role: Hanya admin dan servant
  await requireRole(event, ['admin', 'servant'])

  // 2. Ambil dan validasi ID dari parameter rute
  const id = getRouterParam(event, 'id')

  if (!id || !UUID_REGEX.test(id)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      message: 'Invalid schedule ID format. Must be a valid UUID.'
    })
  }

  // 3. Periksa apakah jadwal ada di database
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

  const query = getQuery(event)
  const isPermanent = query.permanent === 'true'

  try {
    if (isPermanent) {
      // Hard Delete: Hapus baris secara permanen dari database
      await db.delete(schedules).where(eq(schedules.id, id))

      return {
        success: true,
        message: 'Schedule permanently deleted from database.',
        data: {
          id,
          title: existingSchedule.title,
          permanent: true
        }
      }
    } else {
      // Soft Delete (Default): Set isActive = false
      const [softDeletedSchedule] = await db
        .update(schedules)
        .set({
          isActive: false,
          updatedAt: new Date()
        })
        .where(eq(schedules.id, id))
        .returning()

      return {
        success: true,
        message: 'Schedule deactivated (soft deleted) successfully.',
        data: softDeletedSchedule
      }
    }
  } catch (error: unknown) {
    if (error && typeof error === 'object' && 'statusCode' in error) {
      throw error
    }

    console.error(`❌ [DELETE /api/schedules/${id} Error]:`, error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
      message: 'Failed to delete schedule. Please try again later.'
    })
  }
})
