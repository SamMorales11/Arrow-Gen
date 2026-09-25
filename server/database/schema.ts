import { relations, type InferSelectModel, type InferInsertModel } from 'drizzle-orm'
import {
  pgTable,
  text,
  varchar,
  timestamp,
  uuid,
  boolean,
  integer,
  jsonb,
  pgEnum
} from 'drizzle-orm/pg-core'

/**
 * ============================================================================
 * POSTGRES ENUMS
 * ============================================================================
 */

// 1. Role Pengguna: Admin, Pelayan Tuhan (Servant), & Demo (Read-Only)
export const userRoleEnum = pgEnum('user_role', ['admin', 'servant', 'demo'])

// 2. Status Pertanyaan The Vault
export const vaultStatusEnum = pgEnum('vault_question_status', [
  'pending',
  'answered',
  'rejected'
])

// 3. Status Pendaftaran Kru Kreatif
export const crewStatusEnum = pgEnum('crew_application_status', [
  'pending',
  'reviewed',
  'accepted',
  'rejected'
])

/**
 * ============================================================================
 * DATABASE TABLES
 * ============================================================================
 */

/**
 * 1. USERS
 * Tabel untuk autentikasi dan otorisasi Admin & Pelayan Tuhan (Servant).
 * Terintegrasi dengan Better Auth user model.
 */
export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  emailVerified: boolean('email_verified').default(false).notNull(),
  image: text('image'),
  passwordHash: text('password_hash'), // Opsional / backward-compatible
  role: userRoleEnum('role').default('servant').notNull(),
  isActive: boolean('is_active').default(true).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date())
})

/**
 * 2. SCHEDULES
 * Tabel jadwal ibadah, fellowship, dan kegiatan Arrow Gen.
 */
export const schedules = pgTable('schedules', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  day: varchar('day', { length: 50 }).notNull(), // e.g., 'Saturday', 'Sabtu'
  time: varchar('time', { length: 50 }).notNull(), // e.g., '17:00 WIB'
  location: text('location').notNull(),
  theme: text('theme'), // Opsional
  isActive: boolean('is_active').default(true).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date())
})

/**
 * 3. VAULT_QUESTIONS
 * Tabel pertanyaan anonim untuk sesi The Vault.
 * Berelasi dengan tabel `users` untuk mencatat siapa yang menjawab (answeredBy).
 */
export const vaultQuestions = pgTable('vault_questions', {
  id: uuid('id').defaultRandom().primaryKey(),
  question: text('question').notNull(),
  category: varchar('category', { length: 100 }), // Opsional
  status: vaultStatusEnum('status').default('pending').notNull(),
  answer: text('answer'), // Opsional
  answeredBy: uuid('answered_by').references(() => users.id, { onDelete: 'set null' }),
  answeredAt: timestamp('answered_at', { withTimezone: true }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull()
})

/**
 * 4. CREW_APPLICATIONS
 * Tabel formulir pendaftaran relawan & kru kreatif (Join The Crew).
 */
export const crewApplications = pgTable('crew_applications', {
  id: uuid('id').defaultRandom().primaryKey(),
  fullName: varchar('full_name', { length: 255 }).notNull(),
  contact: varchar('contact', { length: 255 }).notNull(),
  interests: jsonb('interests').$type<string[]>().default([]).notNull(),
  motivation: text('motivation').notNull(),
  status: crewStatusEnum('status').default('pending').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date())
})

/**
 * 5. PHOTOS
 * Tabel kurasi foto untuk Photo Reel di landing page & gallery.
 */
export const photos = pgTable('photos', {
  id: uuid('id').defaultRandom().primaryKey(),
  url: text('url').notNull(),
  alt: text('alt').default('').notNull(),
  order: integer('order').default(0).notNull(),
  isActive: boolean('is_active').default(true).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull()
})

/**
 * 6. SESSIONS (Better Auth)
 * Tabel session aktif untuk autentikasi user.
 */
export const sessions = pgTable('sessions', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
  token: text('token').notNull().unique(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' })
})

/**
 * 7. ACCOUNTS (Better Auth)
 * Tabel akun penyimpan kredensial email & password dan OAuth provider.
 */
export const accounts = pgTable('accounts', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  accountId: text('account_id').notNull(),
  providerId: text('provider_id').notNull(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  accessToken: text('access_token'),
  refreshToken: text('refresh_token'),
  idToken: text('id_token'),
  accessTokenExpiresAt: timestamp('access_token_expires_at', { withTimezone: true }),
  refreshTokenExpiresAt: timestamp('refresh_token_expires_at', { withTimezone: true }),
  scope: text('scope'),
  password: text('password'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date())
})

/**
 * 8. VERIFICATIONS (Better Auth)
 * Tabel token verifikasi email dan reset password.
 */
export const verifications = pgTable('verifications', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date())
})

/**
 * ============================================================================
 * RELATIONS (DRIZZLE ORM RELATIONAL QUERIES)
 * ============================================================================
 */

// Relasi Users
export const usersRelations = relations(users, ({ many }) => ({
  answeredVaultQuestions: many(vaultQuestions),
  sessions: many(sessions),
  accounts: many(accounts)
}))

// Relasi Sessions
export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id]
  })
}))

// Relasi Accounts
export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, {
    fields: [accounts.userId],
    references: [users.id]
  })
}))

// Relasi Vault Questions
export const vaultQuestionsRelations = relations(vaultQuestions, ({ one }) => ({
  answeredByUser: one(users, {
    fields: [vaultQuestions.answeredBy],
    references: [users.id]
  })
}))

/**
 * ============================================================================
 * TYPESCRIPT INFERRED TYPES
 * ============================================================================
 */

// Users Types
export type User = InferSelectModel<typeof users>
export type NewUser = InferInsertModel<typeof users>

// Schedules Types
export type Schedule = InferSelectModel<typeof schedules>
export type NewSchedule = InferInsertModel<typeof schedules>

// Vault Questions Types
export type VaultQuestion = InferSelectModel<typeof vaultQuestions>
export type NewVaultQuestion = InferInsertModel<typeof vaultQuestions>

// Crew Applications Types
export type CrewApplication = InferSelectModel<typeof crewApplications>
export type NewCrewApplication = InferInsertModel<typeof crewApplications>

// Photos Types
export type Photo = InferSelectModel<typeof photos>
export type NewPhoto = InferInsertModel<typeof photos>

// Sessions Types
export type Session = InferSelectModel<typeof sessions>
export type NewSession = InferInsertModel<typeof sessions>

// Accounts Types
export type Account = InferSelectModel<typeof accounts>
export type NewAccount = InferInsertModel<typeof accounts>

// Verifications Types
export type Verification = InferSelectModel<typeof verifications>
export type NewVerification = InferInsertModel<typeof verifications>
