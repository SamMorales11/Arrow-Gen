<template>
  <div id="app" class="selection:bg-brand-purple selection:text-white">
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
// Impor stylesheet utama yang memuat Tailwind CSS dan Design System Arrow Gen
import '~/assets/css/main.css'

// Metadata & Global SEO Head
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} | Arrow Gen` : 'Arrow Gen — Equipping The Next Generation'
  },
  meta: [
    { name: 'description', content: 'Arrow Gen - Equipping the next generation with purpose, faith, and transformative fellowship.' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'theme-color', content: '#0a0a0a' }
  ],
  htmlAttrs: {
    lang: 'en'
  }
})
</script>
