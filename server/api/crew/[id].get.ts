import { defineEventHandler, getRouterParam, createError } from 'h3'
import { eq } from 'drizzle-orm'
import { db, crewApplications } from '../../database'
import { requireRole } from '../../utils/session'
import { isValidUuid, handleServerError } from '../../utils/sanitize'

/**
 * ============================================================================
 * GET /api/crew/:id
 * ============================================================================
 * Mengambil detail lengkap satu pendaftar Join The Crew berdasarkan UUID.
 * - Akses terbatas: hanya untuk role 'admin' dan 'servant'.
 * - Memvalidasi format UUID.
 * - Mengembalikan data pendaftar lengkap tanpa membocorkan error internal.
 */
export default defineEventHandler(async (event) => {
  // 1. Otorisasi role: Admin, servant, dan demo (read-only) diizinkan
  await requireRole(event, ['admin', 'servant', 'demo'])

  // 2. Validasi format router parameter ID
  const id = getRouterParam(event, 'id')
  if (!id || !isValidUuid(id)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      message: 'Invalid applicant ID format (must be a valid UUID).'
    })
  }

  try {
    // 3. Ambil data pendaftar dari database
    const [applicant] = await db
      .select()
      .from(crewApplications)
      .where(eq(crewApplications.id, id))
      .limit(1)

    // 4. Periksa keberadaan data
    if (!applicant) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Not Found',
        message: `Crew applicant with ID "${id}" was not found.`
      })
    }

    // 5. Response sukses
    return {
      success: true,
      message: 'Crew applicant details retrieved successfully.',
      data: applicant
    }
  } catch (error: unknown) {
    handleServerError(error, 'Failed to retrieve crew applicant details.')
  }
})
