import { authClient } from '~/utils/auth-client'

/**
 * ============================================================================
 * NUXT AUTH PLUGIN
 * ============================================================================
 * Menyediakan `$auth` instance ke aplikasi Nuxt secara universal.
 */
export default defineNuxtPlugin(() => {
  return {
    provide: {
      auth: authClient
    }
  }
})
