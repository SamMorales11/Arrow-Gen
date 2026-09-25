import { defineEventHandler, getRouterParam, readBody, createError } from 'h3'
import { eq } from 'drizzle-orm'
import { db, vaultQuestions } from '../../database'
import { requireRole } from '../../utils/session'
import { isValidUuid, stripHtml, handleServerError } from '../../utils/sanitize'

export type VaultStatus = 'pending' | 'answered' | 'rejected'

export interface PatchVaultBody {
  answer?: unknown
  status?: unknown
  answeredBy?: unknown
  answeredAt?: unknown
}

/**
 * ============================================================================
 * PATCH /api/vault/:id
 * ============================================================================
 * Memperbarui jawaban (answer), status, serta metadata penjawab The Vault.
 * - Otorisasi ketat: Hanya user yang sudah login dengan role 'admin' atau 'servant'.
 * - Field yang diperbolehkan diupdate: answer, status, answeredBy, answeredAt.
 * - Otomatis mengisi answeredAt (dan answeredBy) ketika status menjadi "answered".
 * - Error handling aman tanpa kebocoran data sensitif database.
 */
export default defineEventHandler(async (event) => {
  // 1. Otorisasi role (hanya admin dan servant)
  const session = await requireRole(event, ['admin', 'servant'])

  // 2. Validasi ID parameter (UUID)
  const id = getRouterParam(event, 'id')
  if (!id || !isValidUuid(id)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      message: 'Invalid question ID format (must be a valid UUID).'
    })
  }

  // 3. Parse request body
  const body = (await readBody<PatchVaultBody>(event)) || {}
  const updateData: Partial<typeof vaultQuestions.$inferInsert> = {}

  // 4. Validasi & proses field 'answer'
  if (body.answer !== undefined) {
    if (typeof body.answer === 'string') {
      const sanitized = stripHtml(body.answer).trim()
      updateData.answer = sanitized.length > 0 ? sanitized : null
    } else if (body.answer === null) {
      updateData.answer = null
    } else {
      throw createError({
        statusCode: 400,
        statusMessage: 'Bad Request',
        message: "Field 'answer' must be a string or null."
      })
    }
  }

  // 5. Validasi & proses field 'status'
  const validStatuses: VaultStatus[] = ['pending', 'answered', 'rejected']
  if (body.status !== undefined) {
    if (typeof body.status !== 'string' || !validStatuses.includes(body.status as VaultStatus)) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Bad Request',
        message: `Field 'status' must be one of: ${validStatuses.join(', ')}.`
      })
    }
    updateData.status = body.status as VaultStatus
  }

  // 6. Validasi & proses field 'answeredBy'
  if (body.answeredBy !== undefined) {
    if (typeof body.answeredBy === 'string') {
      if (!isValidUuid(body.answeredBy)) {
        throw createError({
          statusCode: 400,
          statusMessage: 'Bad Request',
          message: "Field 'answeredBy' must be a valid UUID string."
        })
      }
      updateData.answeredBy = body.answeredBy
    } else if (body.answeredBy === null) {
      updateData.answeredBy = null
    } else {
      throw createError({
        statusCode: 400,
        statusMessage: 'Bad Request',
        message: "Field 'answeredBy' must be a valid UUID string or null."
      })
    }
  }

  // 7. Validasi & proses field 'answeredAt'
  if (body.answeredAt !== undefined) {
    if (typeof body.answeredAt === 'string') {
      const parsedDate = new Date(body.answeredAt)
      if (isNaN(parsedDate.getTime())) {
        throw createError({
          statusCode: 400,
          statusMessage: 'Bad Request',
          message: "Field 'answeredAt' must be a valid ISO date string."
        })
      }
      updateData.answeredAt = parsedDate
    } else if (body.answeredAt === null) {
      updateData.answeredAt = null
    } else {
      throw createError({
        statusCode: 400,
        statusMessage: 'Bad Request',
        message: "Field 'answeredAt' must be an ISO date string or null."
      })
    }
  }

  // 8. Logic otomatis status 'answered' & 'pending'
  const effectiveStatus = updateData.status ?? (updateData.answer ? 'answered' : undefined)
  if (effectiveStatus === 'answered') {
    if (updateData.answeredAt === undefined) {
      updateData.answeredAt = new Date()
    }
    if (updateData.answeredBy === undefined && session?.user?.id) {
      updateData.answeredBy = session.user.id
    }
  } else if (updateData.status === 'pending' && body.answeredAt === undefined && body.answeredBy === undefined) {
    updateData.answeredAt = null
    updateData.answeredBy = null
  }

  // 9. Pastikan ada field yang diupdate
  if (Object.keys(updateData).length === 0) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      message: 'No valid updatable fields provided. Allowed fields: answer, status, answeredBy, answeredAt.'
    })
  }

  // 10. Eksekusi single atomic update di database dalam 1 roundtrip
  try {
    const [updatedQuestion] = await db
      .update(vaultQuestions)
      .set(updateData)
      .where(eq(vaultQuestions.id, id))
      .returning()

    if (!updatedQuestion) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Not Found',
        message: `The Vault question with ID "${id}" was not found.`
      })
    }

    return {
      success: true,
      message: 'The Vault question updated successfully.',
      data: {
        ...updatedQuestion,
        answeredByName: updatedQuestion.answeredBy === session.user?.id ? (session.user?.name || 'Pastor / Servant') : null,
        answeredByEmail: updatedQuestion.answeredBy === session.user?.id ? (session.user?.email || null) : null
      }
    }
  } catch (error: unknown) {
    handleServerError(error, 'Failed to update question in database.')
  }
})
