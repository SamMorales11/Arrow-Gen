import { defineEventHandler, getRouterParam, readBody, createError } from 'h3'
import { eq, and, ne } from 'drizzle-orm'
import { hashPassword } from 'better-auth/crypto'
import { db, users, accounts } from '../../database'
import { requireRole } from '../../utils/session'

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

interface PatchUserBody {
  name?: unknown
  email?: unknown
  password?: unknown
  isActive?: unknown
}

/**
 * ============================================================================
 * PATCH /api/users/:id
 * ============================================================================
 * Memperbarui akun user (status aktif, nama, email, atau reset password).
 * - Akses eksklusif: Hanya untuk role 'admin'.
 * - Jika password diubah, di-hash ulang dan disinkronkan ke tabel `accounts`.
 */
export default defineEventHandler(async (event) => {
  // 1. Otorisasi role: Hanya admin
  await requireRole(event, ['admin'])

  // 2. Validasi ID parameter (UUID)
  const id = getRouterParam(event, 'id')
  if (!id || !UUID_REGEX.test(id)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      message: 'Invalid user ID format (must be a valid UUID).'
    })
  }

  // 3. Pastikan user ada di database
  const [existingUser] = await db
    .select()
    .from(users)
    .where(eq(users.id, id))
    .limit(1)

  if (!existingUser) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Not Found',
      message: `User with ID "${id}" was not found.`
    })
  }

  // 4. Parse request body
  const body = (await readBody<PatchUserBody>(event)) || {}
  const updateData: Partial<typeof users.$inferInsert> = {
    updatedAt: new Date()
  }

  // 5. Validasi & proses 'name'
  if (body.name !== undefined) {
    if (typeof body.name !== 'string' || body.name.trim().length < 2) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Bad Request',
        message: 'Name must be at least 2 characters.'
      })
    }
    updateData.name = body.name.trim().slice(0, 255)
  }

  // 6. Validasi & proses 'email'
  if (body.email !== undefined) {
    if (typeof body.email !== 'string' || !EMAIL_REGEX.test(body.email.trim())) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Bad Request',
        message: 'A valid email address is required.'
      })
    }
    const cleanEmail = body.email.trim().toLowerCase().slice(0, 255)

    // Cek apakah email sudah digunakan user lain
    const [duplicateEmail] = await db
      .select({ id: users.id })
      .from(users)
      .where(and(eq(users.email, cleanEmail), ne(users.id, id)))
      .limit(1)

    if (duplicateEmail) {
      throw createError({
        statusCode: 409,
        statusMessage: 'Conflict',
        message: `Email "${cleanEmail}" is already taken by another account.`
      })
    }
    updateData.email = cleanEmail
  }

  // 7. Validasi & proses 'isActive' (Toggle aktivasi)
  if (body.isActive !== undefined) {
    if (typeof body.isActive !== 'boolean') {
      throw createError({
        statusCode: 400,
        statusMessage: 'Bad Request',
        message: 'Field isActive must be a boolean.'
      })
    }
    updateData.isActive = body.isActive
  }

  // 8. Validasi & proses 'password' (Reset password jika disediakan)
  let newHashedPassword: string | null = null
  if (body.password !== undefined && body.password !== '') {
    if (typeof body.password !== 'string' || body.password.length < 8) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Bad Request',
        message: 'Password must be at least 8 characters long.'
      })
    }
    newHashedPassword = await hashPassword(body.password)
    updateData.passwordHash = newHashedPassword
  }

  try {
    // 9. Update data di tabel users
    const [updatedUser] = await db
      .update(users)
      .set(updateData)
      .where(eq(users.id, id))
      .returning({
        id: users.id,
        name: users.name,
        email: users.email,
        role: users.role,
        isActive: users.isActive,
        createdAt: users.createdAt,
        updatedAt: users.updatedAt
      })

    // 10. Jika password diupdate, perbarui juga di tabel accounts untuk Better Auth
    if (newHashedPassword) {
      await db
        .update(accounts)
        .set({
          password: newHashedPassword,
          updatedAt: new Date()
        })
        .where(eq(accounts.userId, id))
    }

    return {
      success: true,
      message: 'User account updated successfully.',
      data: updatedUser
    }
  } catch (error: unknown) {
    if (error && typeof error === 'object' && 'statusCode' in error) {
      throw error
    }

    console.error(`❌ [PATCH /api/users/${id} Error]:`, error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
      message: 'Failed to update user account in database.'
    })
  }
})
