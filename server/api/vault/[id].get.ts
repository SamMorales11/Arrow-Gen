import { defineEventHandler, getRouterParam, createError } from 'h3'
import { eq } from 'drizzle-orm'
import { db, vaultQuestions, users } from '../../database'
import { requireRole } from '../../utils/session'
import { isValidUuid, handleServerError } from '../../utils/sanitize'

/**
 * ============================================================================
 * GET /api/vault/:id
 * ============================================================================
 * Mengambil detail satu pertanyaan The Vault berdasarkan ID unik (UUID).
 * - Otorisasi ketat: Hanya user yang sudah login dengan role 'admin' atau 'servant'.
 * - Memvalidasi format UUID ID parameter.
 * - Mengembalikan response konsisten tanpa membocorkan error database internal.
 */
export default defineEventHandler(async (event) => {
  // 1. Otorisasi: Pastikan user terautentikasi dengan role admin, servant, atau demo (read-only)
  await requireRole(event, ['admin', 'servant', 'demo'])

  // 2. Ambil dan validasi router parameter 'id'
  const id = getRouterParam(event, 'id')

  if (!id || !isValidUuid(id)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      message: 'Invalid question ID format (must be a valid UUID).'
    })
  }

  try {
    // 3. Query detail pertanyaan dari database dengan join ke tabel users
    const [question] = await db
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

    // 4. Periksa apakah pertanyaan ditemukan
    if (!question) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Not Found',
        message: `The Vault question with ID "${id}" was not found.`
      })
    }

    // 5. Response konsisten
    return {
      success: true,
      message: 'The Vault question details retrieved successfully.',
      data: question
    }
  } catch (error: unknown) {
    handleServerError(error, 'Failed to retrieve the question.')
  }
})
