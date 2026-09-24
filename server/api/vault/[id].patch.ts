import { defineEventHandler, getRouterParam, readBody, createError } from 'h3'
import { eq } from 'drizzle-orm'
import { db, vaultQuestions, users } from '../../database'
import { requireRole } from '../../utils/session'

export type VaultStatus = 'pending' | 'answered' | 'rejected'

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

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
 * - Mengembalikan response konsisten beserta data pertanyaan terupdate.
 */
export default defineEventHandler(async (event) => {
  // 1. Otorisasi role (hanya admin dan servant)
  const session = await requireRole(event, ['admin', 'servant'])

  // 2. Validasi ID parameter (UUID)
  const id = getRouterParam(event, 'id')
  if (!id || !UUID_REGEX.test(id)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      message: 'Invalid question ID format (must be a valid UUID).'
    })
  }

  // 3. Pastikan pertanyaan yang ingin diupdate ada di database
  const [existing] = await db
    .select()
    .from(vaultQuestions)
    .where(eq(vaultQuestions.id, id))
    .limit(1)

  if (!existing) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Not Found',
      message: `The Vault question with ID "${id}" was not found.`
    })
  }

  // 4. Parse request body
  const body = (await readBody<PatchVaultBody>(event)) || {}
  const updateData: Partial<typeof vaultQuestions.$inferInsert> = {}

  // 5. Validasi & proses field 'answer'
  if (body.answer !== undefined) {
    if (typeof body.answer === 'string') {
      const trimmed = body.answer.trim()
      updateData.answer = trimmed.length > 0 ? trimmed : null
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

  // 6. Validasi & proses field 'status'
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

  // 7. Validasi & proses field 'answeredBy'
  if (body.answeredBy !== undefined) {
    if (typeof body.answeredBy === 'string') {
      if (!UUID_REGEX.test(body.answeredBy)) {
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
        message: "Field 'answeredBy' must be a UUID string or null."
      })
    }
  }

  // 8. Validasi & proses field 'answeredAt'
  if (body.answeredAt !== undefined) {
    if (typeof body.answeredAt === 'string' || body.answeredAt instanceof Date) {
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
        message: "Field 'answeredAt' must be a valid date or null."
      })
    }
  }

  // 9. Aturan Khusus: Pastikan answeredAt terisi otomatis ketika status menjadi "answered"
  const targetStatus = updateData.status ?? (updateData.answer ? 'answered' : existing.status)

  if (targetStatus === 'answered') {
    // Jika status diset ke 'answered' atau jawaban terisi, pastikan status adalah 'answered'
    updateData.status = 'answered'

    // Otomatis isi answeredAt jika belum diset secara eksplisit di body
    if (updateData.answeredAt === undefined) {
      updateData.answeredAt = new Date()
    }

    // Otomatis catat ID user yang sedang login jika answeredBy belum diset
    if (updateData.answeredBy === undefined) {
      updateData.answeredBy = session.user.id
    }
  } else if (updateData.status === 'pending' && body.answeredAt === undefined && body.answeredBy === undefined) {
    // Jika status dikembalikan ke pending, reset timestamp & user jika tidak ditentukan lain
    updateData.answeredAt = null
    updateData.answeredBy = null
  }

  // 10. Pastikan ada field yang diupdate
  if (Object.keys(updateData).length === 0) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      message: 'No valid updatable fields provided. Allowed fields: answer, status, answeredBy, answeredAt.'
    })
  }

  // 11. Eksekusi update di database
  try {
    await db
      .update(vaultQuestions)
      .set(updateData)
      .where(eq(vaultQuestions.id, id))

    // Ambil data terbaru beserta informasi nama user penjawab
    const [updatedQuestion] = await db
      .select({
        id: vaultQuestions.id,
        question: vaultQuestions.question,
        category: vaultQuestions.category,
        status: vaultQuestions.status,
        answer: vaultQuestions.answer,
        answeredBy: vaultQuestions.answeredBy,
        answeredByName: users.name,
        answeredByEmail: users.email,
        answeredAt: vaultQuestions.answeredAt,
        createdAt: vaultQuestions.createdAt
      })
      .from(vaultQuestions)
      .leftJoin(users, eq(vaultQuestions.answeredBy, users.id))
      .where(eq(vaultQuestions.id, id))
      .limit(1)

    return {
      success: true,
      message: 'The Vault question updated successfully.',
      data: updatedQuestion
    }
  } catch (error: unknown) {
    console.error('❌ [PATCH /api/vault/:id Error]:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
      message: 'Failed to update question in database.'
    })
  }
})
