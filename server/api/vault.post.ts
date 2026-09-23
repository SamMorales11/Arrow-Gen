import { defineEventHandler, readBody, createError } from 'h3'
import { db, vaultQuestions } from '../database'

/**
 * ============================================================================
 * POST /api/vault
 * ============================================================================
 * Endpoint publik untuk menerima pertanyaan anonim (The Vault).
 * Menyimpan data ke tabel `vault_questions` dengan status "pending".
 */

interface VaultRequestBody {
  question?: unknown
  category?: unknown
  context?: unknown
}

export default defineEventHandler(async (event) => {
  // 1. Parse request body
  const body = (await readBody<VaultRequestBody>(event)) || {}

  // 2. Validasi field 'question'
  if (typeof body.question !== 'string' || !body.question.trim()) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      message: 'Question is required and cannot be empty.'
    })
  }

  const trimmedQuestion = body.question.trim()

  if (trimmedQuestion.length < 5) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      message: 'Question is too short (minimum 5 characters required).'
    })
  }

  if (trimmedQuestion.length > 2500) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      message: 'Question exceeds maximum allowed length of 2500 characters.'
    })
  }

  // 3. Validasi & sanitasi field 'category' (opsional)
  let cleanCategory: string | null = null
  if (typeof body.category === 'string' && body.category.trim()) {
    cleanCategory = body.category.trim().slice(0, 100)
  }

  // 4. Handle context tambahan (opsional)
  let finalQuestion = trimmedQuestion
  if (typeof body.context === 'string' && body.context.trim()) {
    const trimmedContext = body.context.trim()
    finalQuestion = `${trimmedQuestion}\n\n[Additional Context]:\n${trimmedContext}`
  }

  // 5. Simpan ke database Neon melalui Drizzle
  try {
    const [newQuestion] = await db
      .insert(vaultQuestions)
      .values({
        question: finalQuestion,
        category: cleanCategory,
        status: 'pending'
      })
      .returning({
        id: vaultQuestions.id,
        category: vaultQuestions.category,
        status: vaultQuestions.status,
        createdAt: vaultQuestions.createdAt
      })

    // Return response yang rapi dan aman (tanpa leak data sensitif internal)
    return {
      success: true,
      message: 'Your question has been securely deposited into The Vault.',
      data: newQuestion
    }
  } catch (error: unknown) {
    // Log error internal di console server (tidak diekspos ke client)
    console.error('❌ [API /api/vault Error]:', error)

    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
      message: 'Failed to deposit question into The Vault. Please try again later.'
    })
  }
})
