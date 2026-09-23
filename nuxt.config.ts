import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  // 1. Server-Side Rendering (SSR)
  ssr: true,

  // 2. TypeScript Configuration
  typescript: {
    strict: true
  },

  // 3. Nuxt Modules
  modules: [
    '@nuxtjs/google-fonts'
  ],

  // 4. Google Fonts Configuration (Space Grotesk & Press Start 2P)
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

  // 5. CSS & Tailwind CSS Integration (via Vite Plugin)
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [
      tailwindcss()
    ]
  },

  // 6. Runtime Configuration (Environment Variables Placeholder)
  runtimeConfig: {
    // Private keys (hanya dapat diakses di sisi server)
    // apiSecret: '',

    // Public keys (dapat diakses di sisi klien maupun server)
    public: {
      whatsappNumber: '6281234567890' // Dapat di-override melalui NUXT_PUBLIC_WHATSAPP_NUMBER di .env
    }
  },

  // 7. Developer Experience
  devtools: { enabled: true }
})
