import 'dotenv/config'
import { randomUUID } from 'node:crypto'
import { fileURLToPath } from 'node:url'
import { resolve } from 'node:path'
import { eq } from 'drizzle-orm'
import { hashPassword } from 'better-auth/crypto'
import { db, sql } from './index'
import * as schema from './schema'

/**
 * ============================================================================
 * DEMO ACCOUNT SEED SCRIPT (ARROW GEN)
 * ============================================================================
 * Script ini membuat akun demo read-only untuk keperluan preview / demonstrasi.
 *
 * Keamanan:
 * 1. Akun demo menggunakan role 'demo' yang hanya diizinkan di GET endpoint.
 * 2. Semua request write (POST/PUT/PATCH/DELETE) di-reject 403 di level API.
 * 3. Password di-hash menggunakan Better Auth scrypt.
 * 4. Idempoten: aman dijalankan berkali-kali (tidak duplikasi).
 *
 * Jalankan: npm run seed:demo
 * ============================================================================
 */

const DEMO_NAME = 'Demo User'
const DEMO_EMAIL = 'demo@arrowgen.local'
const DEMO_PASSWORD = 'DemoArrow2026!'

async function seedDemoAccount() {
  console.log('\n🎭 [Demo Seed]: Memulai proses pembuatan akun demo...')

  // 1. Tambahkan value 'demo' ke PostgreSQL enum user_role
  console.log('⚙️  [Demo Seed]: Menambahkan role "demo" ke enum user_role di database...')
  try {
    await sql`ALTER TYPE user_role ADD VALUE IF NOT EXISTS 'demo'`
    console.log('✅ [Demo Seed]: Enum user_role berhasil diperbarui (atau sudah ada).')
  } catch (enumError) {
    const existing = await sql`
      SELECT enumlabel FROM pg_enum 
      JOIN pg_type ON pg_enum.enumtypid = pg_type.oid 
      WHERE typname = 'user_role' AND enumlabel = 'demo'
    `
    if (existing && existing.length > 0) {
      console.log('ℹ️  [Demo Seed]: Role "demo" sudah terdaftar di enum, melanjutkan...')
    } else {
      console.error('❌ [Demo Seed]: Gagal menambahkan enum value. Detail:', enumError)
      process.exit(1)
    }
  }

  // 2. Cek apakah akun demo sudah ada (idempotency)
  console.log('🔍 [Demo Seed]: Memeriksa keberadaan akun demo...')
  const [existingUser] = await db
    .select({
      id: schema.users.id,
      email: schema.users.email,
      name: schema.users.name,
      role: schema.users.role,
      isActive: schema.users.isActive
    })
    .from(schema.users)
    .where(eq(schema.users.email, DEMO_EMAIL))
    .limit(1)

  if (existingUser) {
    console.log(`ℹ️  [Demo Seed Skipped]: Akun demo sudah terdaftar di database:`)
    console.log(`   - Nama  : ${existingUser.name}`)
    console.log(`   - Email : ${existingUser.email}`)
    console.log(`   - Role  : ${existingUser.role}`)
    console.log(`   - Aktif : ${existingUser.isActive}`)
    console.log('   Tidak ada perubahan yang dilakukan.\n')
    return
  }

  // 3. Hash password dengan Better Auth crypto (scrypt)
  console.log('🔐 [Demo Seed]: Melakukan hashing password...')
  const hashedPassword = await hashPassword(DEMO_PASSWORD)

  // 4. Buat record user demo
  const userId = randomUUID()
  console.log('📝 [Demo Seed]: Menyimpan akun demo ke tabel "users"...')
  const [newUser] = await db
    .insert(schema.users)
    .values({
      id: userId,
      name: DEMO_NAME,
      email: DEMO_EMAIL,
      emailVerified: true,
      passwordHash: hashedPassword,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      role: 'demo' as any, // Enum sudah diupdate di DB di atas
      isActive: true
    })
    .returning()

  // 5. Daftarkan ke tabel accounts (diperlukan Better Auth untuk credential login)
  console.log('🔗 [Demo Seed]: Mendaftarkan akun ke tabel "accounts" (Better Auth)...')
  await db.insert(schema.accounts).values({
    id: randomUUID(),
    userId: newUser.id,
    accountId: newUser.id,
    providerId: 'credential',
    password: hashedPassword
  })

  console.log('\n🎉 [Demo Seed Success]: Akun demo berhasil dibuat!')
  console.log(`   - ID    : ${newUser.id}`)
  console.log(`   - Nama  : ${newUser.name}`)
  console.log(`   - Email : ${newUser.email}`)
  console.log(`   - Role  : ${newUser.role}`)
  console.log(`   - Aktif : ${newUser.isActive}`)
  console.log('\n📋 Kredensial Demo (sudah otomatis di-prefill di halaman Login):')
  console.log(`   Email    : ${DEMO_EMAIL}`)
  console.log(`   Password : ${DEMO_PASSWORD}`)
  console.log('\n⚠️  KEAMANAN: Akun ini bersifat READ-ONLY.')
  console.log('   Semua request write ditolak 403 di level API server.\n')
}

const isDirectExecution = () => {
  if (!process.argv[1]) return false
  const currentFilePath = resolve(fileURLToPath(import.meta.url))
  const executedFilePath = resolve(process.argv[1])
  return currentFilePath === executedFilePath
}

if (isDirectExecution()) {
  seedDemoAccount()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error('💥 [Demo Seed Fatal Error]:', error)
      process.exit(1)
    })
}

export { seedDemoAccount }
