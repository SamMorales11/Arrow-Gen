import { defineEventHandler, readBody, createError } from 'h3'
import { db, crewApplications } from '../database'

/**
 * ============================================================================
 * POST /api/crew
 * ============================================================================
 * Endpoint publik untuk pendaftaran tim/pelayan kreatif (Join The Crew).
 * Menyimpan data pendaftar ke tabel `crew_applications` dengan status "pending".
 */

interface CrewRequestBody {
  fullName?: unknown
  contact?: unknown
  email?: unknown
  phone?: unknown
  interests?: unknown
  motivation?: unknown
  portfolioLink?: unknown
}

export default defineEventHandler(async (event) => {
  // 1. Parse request body
  const body = (await readBody<CrewRequestBody>(event)) || {}

  // 2. Validasi field 'fullName'
  if (typeof body.fullName !== 'string' || !body.fullName.trim()) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      message: 'Full name is required.'
    })
  }

  const cleanFullName = body.fullName.trim().slice(0, 255)
  if (cleanFullName.length < 2) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      message: 'Full name must be at least 2 characters.'
    })
  }

  // 3. Validasi field 'contact' (menerima contact langsung, atau kombinasi email & phone)
  let cleanContact = ''
  if (typeof body.contact === 'string' && body.contact.trim()) {
    cleanContact = body.contact.trim()
  } else {
    const emailStr = typeof body.email === 'string' ? body.email.trim() : ''
    const phoneStr = typeof body.phone === 'string' ? body.phone.trim() : ''

    if (!emailStr && !phoneStr) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Bad Request',
        message: 'Contact information (email or phone) is required.'
      })
    }

    if (emailStr && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailStr)) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Bad Request',
        message: 'Invalid email address format.'
      })
    }

    cleanContact = [emailStr, phoneStr].filter(Boolean).join(' | ')
  }

  cleanContact = cleanContact.slice(0, 255)

  // 4. Validasi field 'interests' (array of strings)
  if (!Array.isArray(body.interests) || body.interests.length === 0) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      message: 'Please select at least one area of interest.'
    })
  }

  const cleanInterests = body.interests
    .filter((item): item is string => typeof item === 'string' && item.trim().length > 0)
    .map((item) => item.trim().slice(0, 100))

  if (cleanInterests.length === 0) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      message: 'Invalid interests format: at least one valid interest area is required.'
    })
  }

  // 5. Validasi field 'motivation'
  if (typeof body.motivation !== 'string' || !body.motivation.trim()) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      message: 'Please share your motivation for joining the crew.'
    })
  }

  const trimmedMotivation = body.motivation.trim()
  if (trimmedMotivation.length < 15) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      message: 'Motivation must be at least 15 characters.'
    })
  }

  // 6. Opsional: Portfolio link
  let finalMotivation = trimmedMotivation
  if (typeof body.portfolioLink === 'string' && body.portfolioLink.trim()) {
    finalMotivation = `${trimmedMotivation}\n\n[Portfolio / Profile Link]:\n${body.portfolioLink.trim()}`
  }

  // 7. Simpan ke database Neon melalui Drizzle
  try {
    const [newApplication] = await db
      .insert(crewApplications)
      .values({
        fullName: cleanFullName,
        contact: cleanContact,
        interests: cleanInterests,
        motivation: finalMotivation,
        status: 'pending'
      })
      .returning({
        id: crewApplications.id,
        fullName: crewApplications.fullName,
        status: crewApplications.status,
        createdAt: crewApplications.createdAt
      })

    // Return response yang rapi dan aman
    return {
      success: true,
      message: 'Your application to Join The Crew has been received! Our leadership team will be in touch soon.',
      data: newApplication
    }
  } catch (error: unknown) {
    // Log error internal di server tanpa expose credential/query ke client
    console.error('❌ [API /api/crew Error]:', error)

    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
      message: 'Failed to submit application. Please try again later.'
    })
  }
})
