import { createAuthClient } from 'better-auth/vue'

/**
 * ============================================================================
 * BETTER AUTH CLIENT (FRONTEND VUE / NUXT)
 * ============================================================================
 * Client instance reaktif untuk frontend Vue 3 / Nuxt 3.
 * Menyediakan composables seperti `useSession()`, `signIn`, `signUp`, `signOut`.
 */
export const authClient = createAuthClient({
  baseURL: typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000'
})

// Ekspor fungsi & composable bawaan untuk kemudahan impor di halaman/komponen
export const { signIn, signUp, signOut, useSession } = authClient
