import { defineEventHandler, getRouterParam, readBody, createError } from 'h3'
import { eq } from 'drizzle-orm'
import { db, crewApplications } from '../../database'
import { requireRole } from '../../utils/session'

export type CrewApplicationStatus = 'pending' | 'reviewed' | 'accepted' | 'rejected'

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

export interface PatchCrewBody {
  status?: unknown
}

/**
 * ============================================================================
 * PATCH /api/crew/:id
 * ============================================================================
 * Mengubah status pendaftar Join The Crew (pending, reviewed, accepted, rejected).
 * - Otorisasi ketat: Hanya user yang sudah login dengan role 'admin' atau 'servant'.
 * - Memperbarui status dan timestamp updatedAt.
 * - Mengembalikan response konsisten beserta record terupdate.
 */
export default defineEventHandler(async (event) => {
  // 1. Otorisasi role: Hanya admin dan servant
  await requireRole(event, ['admin', 'servant'])

  // 2. Validasi ID parameter (UUID)
  const id = getRouterParam(event, 'id')
  if (!id || !UUID_REGEX.test(id)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      message: 'Invalid applicant ID format (must be a valid UUID).'
    })
  }

  // 3. Pastikan data pendaftar ada di database
  const [existing] = await db
    .select()
    .from(crewApplications)
    .where(eq(crewApplications.id, id))
    .limit(1)

  if (!existing) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Not Found',
      message: `Crew applicant with ID "${id}" was not found.`
    })
  }

  // 4. Parse request body
  const body = (await readBody<PatchCrewBody>(event)) || {}

  // 5. Validasi field 'status'
  const validStatuses: CrewApplicationStatus[] = ['pending', 'reviewed', 'accepted', 'rejected']
  if (!body.status || typeof body.status !== 'string' || !validStatuses.includes(body.status as CrewApplicationStatus)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      message: `Field 'status' is required and must be one of: ${validStatuses.join(', ')}.`
    })
  }

  const newStatus = body.status as CrewApplicationStatus

  // 6. Eksekusi update di database
  try {
    const [updated] = await db
      .update(crewApplications)
      .set({
        status: newStatus,
        updatedAt: new Date()
      })
      .where(eq(crewApplications.id, id))
      .returning()

    return {
      success: true,
      message: `Applicant status successfully updated to "${newStatus}".`,
      data: updated
    }
  } catch (error: unknown) {
    console.error('❌ [PATCH /api/crew/:id Error]:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
      message: 'Failed to update crew applicant status in database.'
    })
  }
})
