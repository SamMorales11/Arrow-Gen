import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  // 1. Server-Side Rendering (SSR)
  ssr: true,

  // 2. Nitro & Vercel Deployment Configuration
  nitro: {
    preset: process.env.VERCEL ? 'vercel' : undefined
  },

  // App Metadata & Favicon
  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/png', href: '/logo-arrow.png' },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', href: '/logo-arrow.png' }
      ]
    }
  },

  // 3. TypeScript Configuration
  typescript: {
    strict: true
  },

  // 4. Nuxt Modules
  modules: [
    '@nuxtjs/google-fonts'
  ],

  // 5. Google Fonts Configuration (Space Grotesk & Press Start 2P)
  googleFonts: {
    families: {
      'Space Grotesk': [300, 400, 500, 600, 700],
      'Press Start 2P': true
    },
    display: 'swap',
    prefetch: true,
    preconnect: true,
    download: true,
    inject: true
  },

  // 6. CSS & Tailwind CSS Integration (via Vite Plugin)
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [
      tailwindcss()
    ]
  },

  // 7. Runtime Configuration (Environment Variables)
  runtimeConfig: {
    // Private keys (hanya dapat diakses di sisi server)
    databaseUrl: process.env.DATABASE_URL || '',
    betterAuthSecret: process.env.BETTER_AUTH_SECRET || '',
    betterAuthUrl: process.env.BETTER_AUTH_URL || '',

    // Public keys (dapat diakses di sisi klien maupun server)
    public: {
      whatsappNumber: process.env.NUXT_PUBLIC_WHATSAPP_NUMBER || '6281234567890'
    }
  },

  // 8. Developer Experience
  devtools: { enabled: false }
})
