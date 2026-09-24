import { defineEventHandler, getQuery, createError } from 'h3'
import { eq, desc, sql } from 'drizzle-orm'
import { db, vaultQuestions, users } from '../database'
import { requireRole } from '../utils/session'

export type VaultStatus = 'pending' | 'answered' | 'rejected'

/**
 * ============================================================================
 * GET /api/vault
 * ============================================================================
 * Mengambil daftar pertanyaan The Vault beserta metadata dan status.
 * - Otorisasi ketat: Hanya user yang sudah login dengan role 'admin' atau 'servant'.
 * - Mendukung filter query: ?status=pending | answered | rejected | all
 * - Mengembalikan struktur response konsisten beserta statistik ringkasan.
 */
export default defineEventHandler(async (event) => {
  // 1. Otorisasi: Pastikan user terautentikasi dengan role admin atau servant
  await requireRole(event, ['admin', 'servant'])

  try {
    const query = getQuery(event)
    const rawStatus = typeof query.status === 'string' ? query.status.trim().toLowerCase() : 'all'

    // Validasi parameter filter status jika diberikan
    const validStatuses: VaultStatus[] = ['pending', 'answered', 'rejected']
    if (rawStatus !== 'all' && !validStatuses.includes(rawStatus as VaultStatus)) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Bad Request',
        message: `Invalid status filter "${rawStatus}". Allowed values are: all, pending, answered, rejected.`
      })
    }

    // 2. Query daftar pertanyaan dari database Neon
    const baseQuery = db
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
      .orderBy(desc(vaultQuestions.createdAt))

    const questions = rawStatus !== 'all'
      ? await baseQuery.where(eq(vaultQuestions.status, rawStatus as VaultStatus))
      : await baseQuery

    // 3. Hitung ringkasan statistik (stats counts)
    const statusCounts = await db
      .select({
        status: vaultQuestions.status,
        count: sql<number>`count(*)::int`
      })
      .from(vaultQuestions)
      .groupBy(vaultQuestions.status)

    const stats = {
      total: 0,
      pending: 0,
      answered: 0,
      rejected: 0
    }

    for (const item of statusCounts) {
      const count = Number(item.count) || 0
      stats.total += count
      if (item.status === 'pending') stats.pending = count
      if (item.status === 'answered') stats.answered = count
      if (item.status === 'rejected') stats.rejected = count
    }

    // 4. Response konsisten
    return {
      success: true,
      message: 'The Vault questions retrieved successfully.',
      total: questions.length,
      filter: rawStatus,
      stats,
      data: questions
    }
  } catch (error: unknown) {
    if (error && typeof error === 'object' && 'statusCode' in error) {
      throw error
    }

    console.error('❌ [GET /api/vault Error]:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
      message: 'Failed to retrieve questions from The Vault.'
    })
  }
})
