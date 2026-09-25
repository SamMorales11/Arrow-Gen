import { defineEventHandler, readBody, createError } from 'h3'
import { db, crewApplications } from '../database'
import { checkRateLimit } from '../utils/rate-limit'
import {
  stripHtml,
  sanitizeString,
  isValidEmail,
  isValidPhone,
  isValidUrl,
  handleServerError
} from '../utils/sanitize'

/**
 * ============================================================================
 * POST /api/crew
 * ============================================================================
 * Endpoint publik untuk pendaftaran tim/pelayan kreatif (Join The Crew).
 * - Dilindungi Rate Limiting (Maksimum 5 submission per 10 menit per IP).
 * - Validasi ketat pada nama, format kontak (email/telepon), minat, dan motivasi.
 * - Sanitasi input (HTML stripping) dan validasi URL pada portfolio.
 * - Error handling aman tanpa kebocoran data internal server/database.
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

const ALLOWED_INTEREST_IDS = [
  'creative-media',
  'worship-band',
  'hospitality-greeter',
  'production-sound',
  'youth-usher',
  'intercessor-prayer'
]

export default defineEventHandler(async (event) => {
  // 1. Rate Limiting: Maksimal 5 pendaftaran per 10 menit per IP address
  checkRateLimit(event, {
    keyPrefix: 'crew-submit',
    maxRequests: 5,
    windowSeconds: 600
  })

  // 2. Parse request body
  const body = (await readBody<CrewRequestBody>(event)) || {}

  // 3. Validasi & sanitasi field 'fullName'
  if (typeof body.fullName !== 'string' || !body.fullName.trim()) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      message: 'Full name is required.'
    })
  }

  const cleanFullName = sanitizeString(body.fullName, { maxLen: 100 })
  if (cleanFullName.length < 2) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      message: 'Full name must be at least 2 characters.'
    })
  }

  // 4. Validasi & sanitasi field 'contact' (email atau telepon)
  let cleanContact = ''
  if (typeof body.contact === 'string' && body.contact.trim()) {
    cleanContact = sanitizeString(body.contact, { maxLen: 150 })
  } else {
    const rawEmail = typeof body.email === 'string' ? body.email.trim() : ''
    const rawPhone = typeof body.phone === 'string' ? body.phone.trim() : ''

    if (!rawEmail && !rawPhone) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Bad Request',
        message: 'Contact information (email or phone) is required.'
      })
    }

    if (rawEmail && !isValidEmail(rawEmail)) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Bad Request',
        message: 'Invalid email address format.'
      })
    }

    if (rawPhone && !isValidPhone(rawPhone)) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Bad Request',
        message: 'Invalid phone number format.'
      })
    }

    cleanContact = [rawEmail.toLowerCase(), rawPhone].filter(Boolean).join(' | ')
  }

  if (cleanContact.length < 4) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      message: 'A valid contact (email or active WhatsApp phone number) is required.'
    })
  }

  // 5. Validasi field 'interests' (array)
  if (!Array.isArray(body.interests) || body.interests.length === 0) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      message: 'Please select at least one area of interest.'
    })
  }

  if (body.interests.length > 10) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      message: 'You can select a maximum of 10 interest areas.'
    })
  }

  const cleanInterests = body.interests
    .filter((item): item is string => typeof item === 'string' && item.trim().length > 0)
    .map((item) => sanitizeString(item, { maxLen: 60 }))
    .filter(Boolean)

  if (cleanInterests.length === 0) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      message: 'Invalid interests format: at least one valid interest area is required.'
    })
  }

  // 6. Validasi field 'motivation'
  if (typeof body.motivation !== 'string' || !body.motivation.trim()) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      message: 'Please share your motivation for joining the crew.'
    })
  }

  const cleanMotivation = stripHtml(body.motivation).trim().slice(0, 2500)
  if (cleanMotivation.length < 15) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      message: 'Motivation must be at least 15 characters.'
    })
  }

  // 7. Validasi opsional: Portfolio link (cegah skema berbahaya seperti javascript:)
  let finalMotivation = cleanMotivation
  if (typeof body.portfolioLink === 'string' && body.portfolioLink.trim()) {
    const rawUrl = body.portfolioLink.trim()
    if (!isValidUrl(rawUrl)) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Bad Request',
        message: 'Invalid portfolio link. Please provide a valid HTTP or HTTPS web address.'
      })
    }
    const cleanUrl = rawUrl.slice(0, 255)
    finalMotivation = `${cleanMotivation}\n\n[Portfolio / Profile Link]:\n${cleanUrl}`
  }

  // 8. Simpan ke database Neon melalui Drizzle
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

    return {
      success: true,
      message: 'Your application to Join The Crew has been received! Our leadership team will be in touch soon.',
      data: newApplication
    }
  } catch (error: unknown) {
    // Tangani error secara aman: tidak membocorkan query SQL atau credential Neon
    handleServerError(error, 'Failed to submit application. Please try again later.')
  }
})
