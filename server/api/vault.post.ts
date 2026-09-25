import { defineEventHandler, readBody, createError } from 'h3'
import { db, vaultQuestions } from '../database'
import { checkRateLimit } from '../utils/rate-limit'
import { stripHtml, sanitizeString, handleServerError } from '../utils/sanitize'

/**
 * ============================================================================
 * POST /api/vault
 * ============================================================================
 * Endpoint publik untuk menerima pertanyaan anonim (The Vault).
 * - Dilindungi Rate Limiting (Maksimum 5 submission per 10 menit per IP).
 * - Sanitasi input ketat (Strips HTML tags & scripts untuk mencegah Stored XSS).
 * - Menangani error secara aman tanpa membocorkan detail database ke response.
 */

interface VaultRequestBody {
  question?: unknown
  category?: unknown
  context?: unknown
}

const ALLOWED_CATEGORIES = [
  'Faith & Doubts',
  'Relationships & Dating',
  'Mental Health & Anxiety',
  'Life Purpose & Calling',
  'Church & Community',
  'Bible Questions',
  'Other / General'
]

export default defineEventHandler(async (event) => {
  // 1. Rate Limiting: Maksimal 5 pengiriman pertanyaan per 10 menit per IP address
  checkRateLimit(event, {
    keyPrefix: 'vault-submit',
    maxRequests: 5,
    windowSeconds: 600
  })

  // 2. Parse request body
  const body = (await readBody<VaultRequestBody>(event)) || {}

  // 3. Validasi & sanitasi field 'question'
  if (typeof body.question !== 'string' || !body.question.trim()) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      message: 'Question is required and cannot be empty.'
    })
  }

  // Bersihkan tag HTML untuk mencegah XSS
  const cleanedQuestion = stripHtml(body.question).trim()

  if (cleanedQuestion.length < 10) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      message: 'Question is too short (minimum 10 characters required).'
    })
  }

  if (cleanedQuestion.length > 2000) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      message: 'Question exceeds maximum allowed length of 2000 characters.'
    })
  }

  // 4. Validasi & sanitasi field 'category' (opsional)
  let cleanCategory: string | null = null
  if (typeof body.category === 'string' && body.category.trim()) {
    const rawCategory = sanitizeString(body.category, { maxLen: 60 })
    cleanCategory = ALLOWED_CATEGORIES.includes(rawCategory) ? rawCategory : 'Other / General'
  }

  // 5. Validasi & sanitasi context tambahan (opsional)
  let finalQuestion = cleanedQuestion
  if (typeof body.context === 'string' && body.context.trim()) {
    const cleanContext = sanitizeString(body.context, { maxLen: 1000 })
    if (cleanContext) {
      finalQuestion = `${cleanedQuestion}\n\n[Additional Context]:\n${cleanContext}`
    }
  }

  // 6. Simpan ke database Neon melalui Drizzle
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
    // Tangani error secara aman: tidak membocorkan query SQL atau credential Neon
    handleServerError(error, 'Failed to deposit question into The Vault. Please try again later.')
  }
})
