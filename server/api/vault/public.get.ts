import { defineEventHandler, setHeader } from 'h3'
import { eq, desc } from 'drizzle-orm'
import { db, vaultQuestions } from '../../database'
import { handleServerError } from '../../utils/sanitize'

/**
 * ============================================================================
 * GET /api/vault/public
 * ============================================================================
 * Mengambil pertanyaan The Vault yang sudah dijawab untuk ditampilkan publik.
 * - TIDAK memerlukan autentikasi — endpoint ini bersifat publik.
 * - Hanya mengembalikan pertanyaan dengan status = 'answered'.
 * - TIDAK menyertakan data sensitif: answeredBy (UUID), answeredByEmail,
 *   atau data identitas penanya apapun.
 * - Diurutkan berdasarkan answeredAt descending (terbaru di atas).
 */
export default defineEventHandler(async (event) => {
  // Edge & Browser Caching Header: 60s cache, 300s SWR
  setHeader(event, 'Cache-Control', 'public, max-age=60, s-maxage=300, stale-while-revalidate=600')

  try {
    const questions = await db
      .select({
        // ── Field publik yang aman ──────────────────────────────────────────
        id: vaultQuestions.id,
        question: vaultQuestions.question,
        category: vaultQuestions.category,
        answer: vaultQuestions.answer,
        status: vaultQuestions.status,
        answeredAt: vaultQuestions.answeredAt
        // ── Field yang SENGAJA TIDAK disertakan untuk keamanan privasi ──────
        // answeredBy     → UUID internal
        // answeredByName → nama pastoral internal
        // answeredByEmail→ email internal
        // createdAt      → tidak perlu di publik
      })
      .from(vaultQuestions)
      .where(eq(vaultQuestions.status, 'answered'))
      .orderBy(desc(vaultQuestions.answeredAt))

    return {
      success: true,
      message: 'Public vault answers retrieved successfully.',
      total: questions.length,
      data: questions
    }
  } catch (error: unknown) {
    handleServerError(error, 'Failed to retrieve answers from The Vault.')
  }
})
