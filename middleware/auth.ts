import { authClient } from '~/utils/auth-client'

/**
 * ============================================================================
 * AUTH ROUTE MIDDLEWARE
 * ============================================================================
 * Memastikan pengguna telah terautentikasi (memiliki sesi login aktif).
 * Jika belum login: dialihkan ke halaman /login dengan query parameter `redirect`.
 */
export default defineNuxtRouteMiddleware(async (to) => {
  const { data: session } = await authClient.getSession({
    fetchOptions: {
      headers: useRequestHeaders(['cookie'])
    }
  })

  if (!session) {
    return navigateTo({
      path: '/login',
      query: {
        redirect: to.fullPath !== '/login' ? to.fullPath : undefined
      }
    })
  }
})
