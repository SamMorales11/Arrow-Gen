<template>
  <div class="min-h-screen flex flex-col bg-background text-foreground font-sans selection:bg-brand-purple selection:text-white">
    <!-- Header Publik Sederhana & Responsif -->
    <header class="sticky top-0 z-50 w-full border-b border-zinc-800/80 bg-black/80 backdrop-blur-md">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        <!-- Logo & Brand Identity -->
        <NuxtLink to="/" class="flex items-center gap-2.5 group">
          <span class="font-pixel text-brand-yellow text-sm tracking-widest flex items-center gap-2 group-hover:text-amber-300 transition-colors">
            <span class="inline-block w-2.5 h-2.5 bg-brand-yellow animate-pulse"></span>
            ARROW GEN
          </span>
          <UiBadge variant="pixel" size="sm">
            v0.1
          </UiBadge>
        </NuxtLink>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center gap-6 text-sm text-zinc-300">
          <NuxtLink to="/" class="hover:text-brand-yellow transition-colors font-medium">
            Beranda
          </NuxtLink>
          <NuxtLink to="/tentang" class="hover:text-brand-yellow transition-colors font-medium">
            Tentang
          </NuxtLink>
          <NuxtLink to="/jadwal" class="hover:text-brand-yellow transition-colors font-medium">
            Jadwal Pelayanan
          </NuxtLink>
          <NuxtLink to="/kontak" class="hover:text-brand-yellow transition-colors font-medium">
            Kontak
          </NuxtLink>
        </nav>

        <!-- Desktop Actions -->
        <div class="hidden md:flex items-center gap-3">
          <UiButton
            variant="ghost"
            size="sm"
            @click="navigateTo('/login')"
          >
            Masuk
          </UiButton>
          <UiButton
            variant="accent"
            size="sm"
            @click="navigateTo('/dashboard')"
          >
            Portal Pelayan
          </UiButton>
        </div>

        <!-- Mobile Menu Toggle Button -->
        <div class="md:hidden flex items-center">
          <UiButton
            variant="ghost"
            size="icon"
            aria-label="Toggle Navigation Menu"
            @click="isMobileMenuOpen = !isMobileMenuOpen"
          >
            <svg
              class="w-5 h-5 text-zinc-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                v-if="!isMobileMenuOpen"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
              <path
                v-else
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </UiButton>
        </div>

      </div>

      <!-- Mobile Dropdown Navigation -->
      <div
        v-if="isMobileMenuOpen"
        class="md:hidden border-b border-zinc-800 bg-zinc-950/95 px-4 pt-3 pb-6 space-y-4"
      >
        <nav class="flex flex-col space-y-3 text-sm text-zinc-300">
          <NuxtLink
            to="/"
            class="hover:text-brand-yellow transition-colors py-1"
            @click="isMobileMenuOpen = false"
          >
            Beranda
          </NuxtLink>
          <NuxtLink
            to="/tentang"
            class="hover:text-brand-yellow transition-colors py-1"
            @click="isMobileMenuOpen = false"
          >
            Tentang
          </NuxtLink>
          <NuxtLink
            to="/jadwal"
            class="hover:text-brand-yellow transition-colors py-1"
            @click="isMobileMenuOpen = false"
          >
            Jadwal Pelayanan
          </NuxtLink>
          <NuxtLink
            to="/kontak"
            class="hover:text-brand-yellow transition-colors py-1"
            @click="isMobileMenuOpen = false"
          >
            Kontak
          </NuxtLink>
        </nav>

        <div class="pt-4 border-t border-zinc-800 flex flex-col gap-2">
          <UiButton
            variant="outline"
            size="sm"
            block
            @click="isMobileMenuOpen = false; navigateTo('/login')"
          >
            Masuk
          </UiButton>
          <UiButton
            variant="accent"
            size="sm"
            block
            @click="isMobileMenuOpen = false; navigateTo('/dashboard')"
          >
            Portal Pelayan
          </UiButton>
        </div>
      </div>
    </header>

    <!-- Slot Konten Halaman Publik -->
    <main class="flex-1 flex flex-col">
      <slot />
    </main>

    <!-- Footer Minimal -->
    <footer class="border-t border-zinc-900 bg-black/90 py-8 text-xs text-zinc-500">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div class="flex items-center gap-3">
          <span class="font-pixel text-[11px] text-zinc-300">▲ ARROW GEN</span>
          <span class="text-zinc-600">|</span>
          <p>© 2026 Arrow Gen. All rights reserved.</p>
        </div>

        <div class="flex items-center gap-4">
          <div class="flex items-center gap-2">
            <UiBadge variant="success" size="sm" dot>
              Sistem Aktif
            </UiBadge>
          </div>
          <p class="text-zinc-500 hidden sm:inline">
            Nuxt 3 • Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isMobileMenuOpen = ref(false)
</script>
