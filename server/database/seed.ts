import 'dotenv/config'
import { randomUUID } from 'node:crypto'
import { fileURLToPath } from 'node:url'
import { resolve } from 'node:path'
import { eq } from 'drizzle-orm'
import { hashPassword } from 'better-auth/crypto'
import { db } from './index'
import * as schema from './schema'

/**
 * ============================================================================
 * DATABASE SEED SCRIPT (ARROW GEN)
 * ============================================================================
 * Script ini digunakan untuk inisialisasi akun Super Admin pertama kali secara manual.
 * 
 * Ketentuan & Keamanan:
 * 1. Hanya bisa dijalankan secara manual via script: `npm run seed`
 * 2. Proteksi blokir di environment production (NODE_ENV === 'production').
 * 3. Idempoten: hanya membuat admin jika belum ada user dengan role "admin".
 * 4. Kredensial diambil secara dinamis dari environment variable (.env).
 * 5. Password di-hash menggunakan algoritma bawaan Better Auth (scrypt).
 * ============================================================================
 */

export async function seed() {
  console.log('\n🌱 [Seed]: Memulai proses database seeding...')

  // 1. Proteksi Environment: Cegah eksekusi di environment production
  if (process.env.NODE_ENV === 'production') {
    console.error('🚫 [Seed Guard]: Seeding diblokir pada environment production (NODE_ENV=production)!')
    console.error('   Operasi seeding hanya diizinkan pada local / staging environment.\n')
    process.exit(1)
  }

  // 2. Baca dan validasi kredensial dari environment variable
  const adminName = process.env.SEED_ADMIN_NAME?.trim()
  const adminEmail = process.env.SEED_ADMIN_EMAIL?.trim().toLowerCase()
  const adminPassword = process.env.SEED_ADMIN_PASSWORD

  if (!adminName || !adminEmail || !adminPassword) {
    console.error('❌ [Seed Error]: Environment variable untuk seed admin belum lengkap!')
    console.error('   Pastikan variabel berikut tersedia di file .env Anda:')
    console.error('   - SEED_ADMIN_NAME')
    console.error('   - SEED_ADMIN_EMAIL')
    console.error('   - SEED_ADMIN_PASSWORD\n')
    process.exit(1)
  }

  // Validasi format email dasar
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(adminEmail)) {
    console.error(`❌ [Seed Error]: Format email "${adminEmail}" tidak valid!\n`)
    process.exit(1)
  }

  // Validasi panjang minimum password
  if (adminPassword.length < 8) {
    console.error('❌ [Seed Error]: SEED_ADMIN_PASSWORD harus memiliki panjang minimal 8 karakter!\n')
    process.exit(1)
  }

  try {
    // 3. Cek apakah sudah ada pengguna dengan role "admin" (Idempotency)
    console.log('🔍 [Seed]: Memeriksa keberadaan user dengan role "admin"...')
    const [existingAdmin] = await db
      .select({
        id: schema.users.id,
        email: schema.users.email,
        name: schema.users.name,
        role: schema.users.role
      })
      .from(schema.users)
      .where(eq(schema.users.role, 'admin'))
      .limit(1)

    if (existingAdmin) {
      console.log(`ℹ️ [Seed Skipped]: Akun admin sudah terdaftar di database:`)
      console.log(`   - Nama : ${existingAdmin.name}`)
      console.log(`   - Email: ${existingAdmin.email}`)
      console.log('   Tidak ada perubahan yang dilakukan ke database.\n')
      process.exit(0)
    }

    // 4. Cek apakah email yang dimasukkan sudah digunakan oleh user dengan role lain
    const [existingUserByEmail] = await db
      .select({
        id: schema.users.id,
        email: schema.users.email,
        role: schema.users.role
      })
      .from(schema.users)
      .where(eq(schema.users.email, adminEmail))
      .limit(1)

    if (existingUserByEmail) {
      console.error(`❌ [Seed Error]: Email "${adminEmail}" sudah terdaftar dengan role "${existingUserByEmail.role}".`)
      console.error('   Gunakan email lain atau perbarui role pengguna tersebut secara langsung.\n')
      process.exit(1)
    }

    // 5. Hash password menggunakan metode resmi Better Auth
    console.log('🔐 [Seed]: Melakukan hashing password dengan Better Auth crypto...')
    const hashedPassword = await hashPassword(adminPassword)

    // 6. Buat user admin baru dan catat kredensial di tabel accounts
    const userId = randomUUID()

    console.log('📝 [Seed]: Menyimpan user admin baru ke tabel "users"...')
    const [newUser] = await db
      .insert(schema.users)
      .values({
        id: userId,
        name: adminName,
        email: adminEmail,
        emailVerified: true,
        passwordHash: hashedPassword, // Backward-compatibility
        role: 'admin',
        isActive: true
      })
      .returning()

    console.log('🔗 [Seed]: Mendaftarkan akun kredensial ke tabel "accounts" (Better Auth provider)...')
    await db.insert(schema.accounts).values({
      id: randomUUID(),
      userId: newUser.id,
      accountId: newUser.id, // Sesuai standar Better Auth untuk credential provider
      providerId: 'credential',
      password: hashedPassword
    })

    console.log('\n🎉 [Seed Success]: Akun admin berhasil dibuat!')
    console.log(`   - ID   : ${newUser.id}`)
    console.log(`   - Nama : ${newUser.name}`)
    console.log(`   - Email: ${newUser.email}`)
    console.log(`   - Role : ${newUser.role}`)
    console.log('\nAnda sekarang dapat login melalui halaman /login dengan kredensial tersebut.\n')

    process.exit(0)
  } catch (error) {
    console.error('💥 [Seed Fatal Error]: Terjadi kegagalan saat menjalankan seeding:')
    if (error instanceof Error) {
      console.error(`   Pesan error: ${error.message}`)
    } else {
      console.error(error)
    }
    console.error('\nProses dibatalkan.\n')
    process.exit(1)
  }
}

// 7. Proteksi Eksekusi Manual: Pastikan script dijalankan langsung melalui CLI / npm
const isDirectExecution = () => {
  if (!process.argv[1]) return false
  const currentFilePath = resolve(fileURLToPath(import.meta.url))
  const executedFilePath = resolve(process.argv[1])
  return currentFilePath === executedFilePath
}

if (isDirectExecution()) {
  seed()
}
