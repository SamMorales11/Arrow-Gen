import type { Config } from 'tailwindcss'

export default {
  content: [
    './app/**/*.{vue,js,ts,jsx,tsx}',
    './components/**/*.{vue,js,ts,jsx,tsx}',
    './layouts/**/*.{vue,js,ts,jsx,tsx}',
    './pages/**/*.{vue,js,ts,jsx,tsx}',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
    './app.vue',
    './error.vue'
  ],
  theme: {
    extend: {
      colors: {
        // Semantic Tokens
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)'
        },
        border: {
          DEFAULT: 'var(--border)',
          subtle: 'var(--border-subtle)',
          strong: 'var(--border-strong)'
        },
        primary: {
          DEFAULT: 'var(--primary)',
          hover: 'var(--primary-hover)',
          active: 'var(--primary-active)',
          foreground: 'var(--primary-foreground)'
        },
        accent: {
          DEFAULT: 'var(--accent)',
          hover: 'var(--accent-hover)',
          active: 'var(--accent-active)',
          foreground: 'var(--accent-foreground)'
        },

        // Brand Colors
        brand: {
          black: 'var(--color-black)',
          purple: {
            DEFAULT: 'var(--color-purple)',
            hover: 'var(--color-purple-hover)',
            active: 'var(--color-purple-active)'
          },
          yellow: {
            DEFAULT: 'var(--color-yellow)',
            hover: 'var(--color-yellow-hover)',
            active: 'var(--color-yellow-active)'
          }
        },

        // Zinc Palette (Mapped to CSS Variables)
        zinc: {
          50: 'var(--color-zinc-50)',
          100: 'var(--color-zinc-100)',
          200: 'var(--color-zinc-200)',
          300: 'var(--color-zinc-300)',
          400: 'var(--color-zinc-400)',
          500: 'var(--color-zinc-500)',
          600: 'var(--color-zinc-600)',
          700: 'var(--color-zinc-700)',
          800: 'var(--color-zinc-800)',
          900: 'var(--color-zinc-900)',
          950: 'var(--color-zinc-950)'
        }
      },

      fontFamily: {
        sans: ['"Space Grotesk"', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        pixel: ['"Press Start 2P"', 'monospace']
      },

      boxShadow: {
        'pixel-purple': '4px 4px 0px 0px var(--color-purple)',
        'pixel-yellow': '4px 4px 0px 0px var(--color-yellow)',
        'pixel-zinc': '4px 4px 0px 0px var(--color-zinc-800)'
      }
    }
  },
  plugins: []
} satisfies Config
