import { defineEventHandler, getQuery, createError } from 'h3'
import { eq, desc, sql } from 'drizzle-orm'
import { db, crewApplications } from '../database'
import { requireRole } from '../utils/session'
import { handleServerError } from '../utils/sanitize'

export type CrewApplicationStatus = 'pending' | 'reviewed' | 'accepted' | 'rejected'

/**
 * ============================================================================
 * GET /api/crew
 * ============================================================================
 * Mengambil daftar pendaftar Join The Crew.
 * - Akses terbatas: hanya untuk role 'admin' dan 'servant'.
 * - Mendukung filter query: ?status=pending | reviewed | accepted | rejected | all
 * - Mengembalikan ringkasan statistik (stats) per status.
 */
export default defineEventHandler(async (event) => {
  // 1. Otorisasi role: Hanya admin dan servant
  await requireRole(event, ['admin', 'servant'])

  try {
    const query = getQuery(event)
    const rawStatus = typeof query.status === 'string' ? query.status.trim().toLowerCase() : 'all'

    const validStatuses: CrewApplicationStatus[] = ['pending', 'reviewed', 'accepted', 'rejected']
    if (rawStatus !== 'all' && !validStatuses.includes(rawStatus as CrewApplicationStatus)) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Bad Request',
        message: `Invalid status filter "${rawStatus}". Allowed values: all, pending, reviewed, accepted, rejected.`
      })
    }

    // 2. Query daftar pendaftar
    const baseQuery = db
      .select()
      .from(crewApplications)
      .orderBy(desc(crewApplications.createdAt))

    const applicants = rawStatus !== 'all'
      ? await baseQuery.where(eq(crewApplications.status, rawStatus as CrewApplicationStatus))
      : await baseQuery

    // 3. Ringkasan statistik (counts)
    const statusCounts = await db
      .select({
        status: crewApplications.status,
        count: sql<number>`count(*)::int`
      })
      .from(crewApplications)
      .groupBy(crewApplications.status)

    const stats = {
      total: 0,
      pending: 0,
      reviewed: 0,
      accepted: 0,
      rejected: 0
    }

    for (const item of statusCounts) {
      const count = Number(item.count) || 0
      stats.total += count
      if (item.status === 'pending') stats.pending = count
      if (item.status === 'reviewed') stats.reviewed = count
      if (item.status === 'accepted') stats.accepted = count
      if (item.status === 'rejected') stats.rejected = count
    }

    return {
      success: true,
      message: 'Crew applications retrieved successfully.',
      total: applicants.length,
      filter: rawStatus,
      stats,
      data: applicants
    }
  } catch (error: unknown) {
    handleServerError(error, 'Failed to retrieve crew applications.')
  }
})
