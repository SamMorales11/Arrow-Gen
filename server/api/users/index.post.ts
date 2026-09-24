import { defineEventHandler, readBody, createError } from 'h3'
import { randomUUID } from 'node:crypto'
import { eq } from 'drizzle-orm'
import { hashPassword } from 'better-auth/crypto'
import { db, users, accounts } from '../../database'
import { requireRole } from '../../utils/session'

interface CreateServantBody {
  name?: unknown
  email?: unknown
  password?: unknown
  isActive?: unknown
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * ============================================================================
 * POST /api/users
 * ============================================================================
 * Menambahkan akun Pelayan Tuhan (Servant) baru.
 * - Akses eksklusif: Hanya untuk role 'admin'.
 * - Melakukan hashing password dengan algoritma resmi Better Auth (scrypt).
 * - Mendaftarkan entri di tabel `users` dan tabel `accounts` (credential provider).
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
  const cleanName = body.name.trim().slice(0, 255)

  // 3. Validasi field 'email'
  if (typeof body.email !== 'string' || !EMAIL_REGEX.test(body.email.trim())) {
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

  // 5. Validasi field 'password' (minimal 8 karakter)
  if (typeof body.password !== 'string' || body.password.length < 8) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      message: 'Password is required and must be at least 8 characters long.'
    })
  }

  // 6. Validasi field 'isActive' (default true)
  const cleanIsActive = typeof body.isActive === 'boolean' ? body.isActive : true

  try {
    // 7. Hash password secara aman dengan Better Auth crypto
    const hashedPassword = await hashPassword(body.password)
    const userId = randomUUID()

    // 8. Simpan ke tabel users
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
    if (error && typeof error === 'object' && 'statusCode' in error) {
      throw error
    }

    console.error('❌ [POST /api/users Error]:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
      message: 'Failed to create servant account. Please try again later.'
    })
  }
})
