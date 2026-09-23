<template>
  <div id="app" class="selection:bg-brand-purple selection:text-white">
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <!-- Konten Utama Semantik -->
      <section class="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-16 sm:py-24 bg-retro-grid">
        <div class="max-w-4xl mx-auto flex flex-col items-center text-center space-y-8">
          
          <!-- Badge Pixel Accent -->
          <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-zinc-900/80 backdrop-blur-sm text-xs text-zinc-300">
            <span class="w-2 h-2 rounded-full bg-brand-yellow"></span>
            <span class="font-pixel text-[10px] text-brand-yellow">ARROW GEN ENGINE READY</span>
          </div>

          <!-- Judul Utama (Space Grotesk) -->
          <div class="space-y-4">
            <h1 class="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-zinc-50">
              High-Precision <br />
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-purple-400">Arrow</span> &amp; 
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow to-amber-300">Pixel</span> Generator
            </h1>
            <p class="max-w-2xl mx-auto text-base sm:text-lg text-zinc-400 font-sans">
              Proyek Nuxt 3 telah berhasil dikonfigurasi dengan Tailwind CSS, tipografi ganda (Space Grotesk &amp; Press Start 2P), SSR aktif, dan Design System kustom siap produksi.
            </p>
          </div>

          <!-- Tombol Aksi Pixel Accent -->
          <div class="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button class="pixel-btn-primary">
              EXPLORE GENERATOR
            </button>
            <button class="pixel-btn-accent">
              SYSTEM DOCS
            </button>
          </div>

          <!-- Showcase Kartu Desain -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full pt-8 text-left">
            <div class="pixel-box p-5 rounded">
              <span class="font-pixel text-xs text-brand-yellow block mb-2">01 / TYPOGRAPHY</span>
              <p class="text-xs text-zinc-400">Space Grotesk untuk antarmuka halus &amp; Press Start 2P untuk aksen retro pixel.</p>
            </div>
            <div class="pixel-box p-5 rounded">
              <span class="font-pixel text-xs text-brand-purple block mb-2">02 / COLOR TOKENS</span>
              <p class="text-xs text-zinc-400">Deep Black (#0a0a0a), Brand Purple (#770bba), Vibrant Yellow (#f5dc20).</p>
            </div>
            <div class="pixel-box p-5 rounded">
              <span class="font-pixel text-xs text-zinc-300 block mb-2">03 / SSR ENGINE</span>
              <p class="text-xs text-zinc-400">Full Server-Side Rendering aktif dengan Nitro Server &amp; Vite Bundler.</p>
            </div>
          </div>

        </div>
      </section>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
// Impor stylesheet utama yang memuat Tailwind CSS dan Design System Arrow Gen
import '~/assets/css/main.css'

// Metadata & SEO Head
useHead({
  title: 'Arrow Gen | Modern Pixel-Driven Generator',
  meta: [
    { name: 'description', content: 'Arrow Gen - High precision arrow and pixel design generation engine built with Nuxt 3 and Tailwind CSS.' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'theme-color', content: '#0a0a0a' }
  ],
  htmlAttrs: {
    lang: 'id'
  }
})
</script>
