import { authClient } from '~/utils/auth-client'

/**
 * ============================================================================
 * SERVANT ROUTE MIDDLEWARE
 * ============================================================================
 * Memastikan pengguna telah login dan memiliki role 'servant', 'admin', atau 'demo'.
 * - Belum login: dialihkan ke /login.
 * - Role tidak valid: melempar error 403 Forbidden.
 * - Role 'demo': diizinkan masuk (read-only), tombol write disembunyikan di frontend.
 */
export default defineNuxtRouteMiddleware(async (to) => {
  const { data: session } = await authClient.getSession({
    fetchOptions: {
      headers: useRequestHeaders(['cookie'])
    }
  })

  // 1. Validasi sesi login
  if (!session) {
    return navigateTo({
      path: '/login',
      query: {
        redirect: to.fullPath !== '/login' ? to.fullPath : undefined
      }
    })
  }

  // 2. Validasi role (servant, admin, atau demo diizinkan)
  const userRole = (session.user as { role?: string })?.role || 'servant'

  if (userRole !== 'servant' && userRole !== 'admin' && userRole !== 'demo') {
    throw createError({
      statusCode: 403,
      statusMessage: 'Forbidden',
      message: 'Access denied: You must be an authorized servant or staff member to view this page.'
    })
  }
})
