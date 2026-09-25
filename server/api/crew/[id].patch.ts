import { defineEventHandler, getRouterParam, readBody, createError } from 'h3'
import { eq } from 'drizzle-orm'
import { db, crewApplications } from '../../database'
import { requireRole } from '../../utils/session'
import { isValidUuid, handleServerError } from '../../utils/sanitize'

export type CrewApplicationStatus = 'pending' | 'reviewed' | 'accepted' | 'rejected'

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
 * - Mengembalikan response konsisten tanpa membocorkan error database.
 */
export default defineEventHandler(async (event) => {
  // 1. Otorisasi role: Hanya admin dan servant
  await requireRole(event, ['admin', 'servant'])

  // 2. Validasi ID parameter (UUID)
  const id = getRouterParam(event, 'id')
  if (!id || !isValidUuid(id)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      message: 'Invalid applicant ID format (must be a valid UUID).'
    })
  }

  // 3. Parse request body
  const body = (await readBody<PatchCrewBody>(event)) || {}

  // 4. Validasi field 'status'
  const validStatuses: CrewApplicationStatus[] = ['pending', 'reviewed', 'accepted', 'rejected']
  if (!body.status || typeof body.status !== 'string' || !validStatuses.includes(body.status as CrewApplicationStatus)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      message: `Field 'status' is required and must be one of: ${validStatuses.join(', ')}.`
    })
  }

  const newStatus = body.status as CrewApplicationStatus

  // 5. Eksekusi atomic update di database dalam 1 roundtrip
  try {
    const [updated] = await db
      .update(crewApplications)
      .set({
        status: newStatus,
        updatedAt: new Date()
      })
      .where(eq(crewApplications.id, id))
      .returning()

    if (!updated) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Not Found',
        message: `Crew applicant with ID "${id}" was not found.`
      })
    }

    return {
      success: true,
      message: `Applicant status successfully updated to "${newStatus}".`,
      data: updated
    }
  } catch (error: unknown) {
    handleServerError(error, 'Failed to update crew applicant status.')
  }
})
