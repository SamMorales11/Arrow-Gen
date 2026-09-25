import { defineEventHandler, readBody, createError } from 'h3'
import { randomUUID } from 'node:crypto'
import { eq } from 'drizzle-orm'
import { hashPassword } from 'better-auth/crypto'
import { db, users, accounts } from '../../database'
import { requireRole } from '../../utils/session'
import { sanitizeString, isValidEmail, handleServerError } from '../../utils/sanitize'

interface CreateServantBody {
  name?: unknown
  email?: unknown
  password?: unknown
  isActive?: unknown
}

/**
 * ============================================================================
 * POST /api/users
 * ============================================================================
 * Menambahkan akun Pelayan Tuhan (Servant) baru.
 * - Akses eksklusif: Hanya untuk role 'admin'.
 * - Melakukan hashing password dengan algoritma resmi Better Auth (scrypt).
 * - Mendaftarkan entri di tabel `users` dan tabel `accounts` (credential provider).
 * - Tidak mengekspos hash atau data sensitif di response client.
 */
export default defineEventHandler(async (event) => {
  // 1. Otorisasi role: Hanya admin
  await requireRole(event, ['admin'])

  const body = (await readBody<CreateServantBody>(event)) || {}

  // 2. Validasi field 'name'
  if (typeof body.name !== 'string' || body.name.trim().length < 2) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      message: 'Name is required and must be at least 2 characters.'
    })
  }
  const cleanName = sanitizeString(body.name, { maxLen: 100 })

  // 3. Validasi field 'email'
  if (typeof body.email !== 'string' || !isValidEmail(body.email.trim())) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      message: 'A valid email address is required.'
    })
  }
  const cleanEmail = body.email.trim().toLowerCase().slice(0, 255)

  // 4. Cek apakah email sudah terdaftar
  const [existingUser] = await db
    .select({ id: users.id, email: users.email })
    .from(users)
    .where(eq(users.email, cleanEmail))
    .limit(1)

  if (existingUser) {
    throw createError({
      statusCode: 409,
      statusMessage: 'Conflict',
      message: `An account with email "${cleanEmail}" already exists.`
    })
  }

  // 5. Validasi field 'password' (8 s.d. 128 karakter)
  if (typeof body.password !== 'string' || body.password.length < 8) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      message: 'Password is required and must be at least 8 characters long.'
    })
  }

  if (body.password.length > 128) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      message: 'Password exceeds maximum length of 128 characters.'
    })
  }

  // 6. Validasi field 'isActive' (default true)
  const cleanIsActive = typeof body.isActive === 'boolean' ? body.isActive : true

  try {
    // 7. Hash password secara aman dengan Better Auth crypto
    const hashedPassword = await hashPassword(body.password)
    const userId = randomUUID()

    // 8. Simpan ke tabel users (hanya ambil field publik non-sensitif di returning)
    const [newUser] = await db
      .insert(users)
      .values({
        id: userId,
        name: cleanName,
        email: cleanEmail,
        emailVerified: true,
        passwordHash: hashedPassword,
        role: 'servant',
        isActive: cleanIsActive
      })
      .returning({
        id: users.id,
        name: users.name,
        email: users.email,
        role: users.role,
        isActive: users.isActive,
        createdAt: users.createdAt
      })

    // 9. Simpan kredensial ke tabel accounts untuk Better Auth
    await db.insert(accounts).values({
      id: randomUUID(),
      userId: newUser.id,
      accountId: newUser.id,
      providerId: 'credential',
      password: hashedPassword
    })

    return {
      success: true,
      message: 'Servant account created successfully.',
      data: newUser
    }
  } catch (error: unknown) {
    handleServerError(error, 'Failed to create servant account. Please try again later.')
  }
})
