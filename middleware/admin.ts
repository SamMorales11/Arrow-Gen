import { authClient } from '~/utils/auth-client'

/**
 * ============================================================================
 * ADMIN ROUTE MIDDLEWARE
 * ============================================================================
 * Memastikan pengguna telah login dan memiliki role 'admin'.
 * - Belum login: dialihkan ke /login.
 * - Bukan admin: melempar error 403 Forbidden.
 */
export default defineNuxtRouteMiddleware(async (to) => {
  const { data: session } = await authClient.getSession({
    fetchOptions: {
      headers: useRequestHeaders(['cookie'])
    }
  })

  // 1. Validasi keberadaan sesi login
  if (!session) {
    return navigateTo({
      path: '/login',
      query: {
        redirect: to.fullPath !== '/login' ? to.fullPath : undefined
      }
    })
  }

  // 2. Validasi role 'admin'
  const userRole = (session.user as { role?: string })?.role || 'servant'

  if (userRole !== 'admin') {
    throw createError({
      statusCode: 403,
      statusMessage: 'Forbidden',
      message: 'Access denied: Administrator privileges are required to view this page.'
    })
  }
})
