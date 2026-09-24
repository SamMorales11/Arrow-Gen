import { defineEventHandler, getRouterParam, createError } from 'h3'
import { eq } from 'drizzle-orm'
import { db, crewApplications } from '../../database'
import { requireRole } from '../../utils/session'

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

/**
 * ============================================================================
 * GET /api/crew/:id
 * ============================================================================
 * Mengambil detail lengkap satu pendaftar Join The Crew berdasarkan UUID.
 * - Akses terbatas: hanya untuk role 'admin' dan 'servant'.
 * - Memvalidasi format UUID.
 * - Mengembalikan data pendaftar lengkap termasuk kontak, minat, motivasi, dan status.
 */
export default defineEventHandler(async (event) => {
  // 1. Otorisasi role: Hanya admin dan servant
  await requireRole(event, ['admin', 'servant'])

  // 2. Validasi format router parameter ID
  const id = getRouterParam(event, 'id')
  if (!id || !UUID_REGEX.test(id)) {
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
    if (error && typeof error === 'object' && 'statusCode' in error) {
      throw error
    }

    console.error(`❌ [GET /api/crew/${id} Error]:`, error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
      message: 'Failed to retrieve crew applicant details.'
    })
  }
})
