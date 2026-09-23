<template>
  <div class="min-h-screen flex flex-col bg-background text-foreground font-sans selection:bg-brand-purple selection:text-white">
    
    <!-- ====================================================================
         1. COMPACT & RESPONSIVE HEADER
         ==================================================================== -->
    <header class="sticky top-0 z-50 w-full border-b border-zinc-800/80 bg-black/90 backdrop-blur-md">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        <!-- Brand Identity Logo -->
        <NuxtLink to="/" class="flex items-center gap-2 group shrink-0">
          <span class="font-pixel text-brand-yellow text-xs sm:text-sm tracking-wider flex items-center gap-2 group-hover:text-amber-300 transition-colors">
            <span class="inline-block w-2.5 h-2.5 bg-brand-yellow animate-pulse" />
            ARROW GEN
          </span>
          <UiBadge variant="pixel" size="sm" class="hidden sm:inline-flex">
            2026
          </UiBadge>
        </NuxtLink>

        <!-- Desktop Navigation Bar (7 Public Pages) -->
        <nav class="hidden xl:flex items-center gap-1.5 text-xs lg:text-[13px]">
          <NuxtLink
            v-for="item in navLinks"
            :key="item.path"
            :to="item.path"
            :class="[
              'px-3 py-1.5 rounded-md transition-all font-medium flex items-center gap-1.5 select-none',
              $route.path === item.path
                ? 'text-brand-yellow bg-zinc-900/90 font-semibold border border-zinc-800'
                : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/50'
            ]"
          >
            <span
              v-if="$route.path === item.path"
              class="w-1.5 h-1.5 rounded-full bg-brand-yellow"
            />
            <span>{{ item.label }}</span>
            <UiBadge
              v-if="item.badge"
              :variant="item.badgeVariant || 'secondary'"
              size="sm"
              class="text-[9px] px-1.5 py-0"
            >
              {{ item.badge }}
            </UiBadge>
          </NuxtLink>
        </nav>

        <!-- Medium Screens Navigation (Scrollable or Collapsed) -->
        <nav class="hidden md:flex xl:hidden items-center gap-1 text-xs overflow-x-auto py-1 scrollbar-none">
          <NuxtLink
            v-for="item in navLinks.slice(0, 5)"
            :key="item.path"
            :to="item.path"
            :class="[
              'px-2.5 py-1.5 rounded-md transition-all font-medium whitespace-nowrap',
              $route.path === item.path
                ? 'text-brand-yellow bg-zinc-900 font-semibold'
                : 'text-zinc-400 hover:text-zinc-100'
            ]"
          >
            {{ item.label }}
          </NuxtLink>
        </nav>

        <!-- Desktop Right Actions -->
        <div class="hidden sm:flex items-center gap-2.5 shrink-0">
          <NuxtLink to="/connect">
            <UiButton
              variant="accent"
              size="sm"
              class="font-medium text-xs px-3"
            >
              <template #leading>
                <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </template>
              TALK TO US
            </UiButton>
          </NuxtLink>

          <NuxtLink to="/dashboard">
            <UiButton
              variant="outline"
              size="sm"
              class="text-xs px-3 border-zinc-700"
            >
              Portal
            </UiButton>
          </NuxtLink>
        </div>

        <!-- Mobile Menu Toggle Button (Hamburger) -->
        <div class="flex items-center gap-2 xl:hidden">
          <NuxtLink to="/connect" class="sm:hidden">
            <UiButton variant="accent" size="sm" class="text-xs px-2.5 py-1">
              Talk
            </UiButton>
          </NuxtLink>

          <UiButton
            variant="ghost"
            size="icon"
            aria-label="Toggle Mobile Navigation"
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

      <!-- ==================================================================
           MOBILE MENU DROPDOWN
           ================================================================== -->
      <transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0 -translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-2"
      >
        <div
          v-if="isMobileMenuOpen"
          class="xl:hidden border-b border-zinc-800 bg-zinc-950/98 px-4 pt-3 pb-6 space-y-4 shadow-2xl"
        >
          <div class="space-y-1">
            <NuxtLink
              v-for="item in navLinks"
              :key="`mobile-${item.path}`"
              :to="item.path"
              :class="[
                'flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm transition-all',
                $route.path === item.path
                  ? 'bg-zinc-900 text-brand-yellow font-semibold border border-zinc-800 shadow-sm'
                  : 'text-zinc-300 hover:bg-zinc-900/60 hover:text-white'
              ]"
              @click="isMobileMenuOpen = false"
            >
              <div class="flex items-center gap-2.5">
                <span
                  v-if="$route.path === item.path"
                  class="w-1.5 h-1.5 rounded-full bg-brand-yellow"
                />
                <span>{{ item.label }}</span>
              </div>
              <UiBadge
                v-if="item.badge"
                :variant="item.badgeVariant || 'secondary'"
                size="sm"
              >
                {{ item.badge }}
              </UiBadge>
            </NuxtLink>
          </div>

          <!-- Mobile Action Buttons -->
          <div class="pt-4 border-t border-zinc-800 flex flex-col gap-2.5">
            <NuxtLink to="/connect" class="w-full" @click="isMobileMenuOpen = false">
              <UiButton
                variant="accent"
                size="md"
                block
              >
                NEED SOMEONE TO TALK TO? (WHATSAPP)
              </UiButton>
            </NuxtLink>
            
            <NuxtLink to="/dashboard" class="w-full" @click="isMobileMenuOpen = false">
              <UiButton
                variant="outline"
                size="md"
                block
              >
                Portal Pelayan &amp; Admin
              </UiButton>
            </NuxtLink>
          </div>
        </div>
      </transition>
    </header>

    <!-- ====================================================================
         2. MAIN CONTENT SLOT
         ==================================================================== -->
    <main class="flex-1 flex flex-col">
      <slot />
    </main>

    <!-- ====================================================================
         3. FOOTER
         ==================================================================== -->
    <footer class="border-t border-zinc-900 bg-black/95 py-12 px-4 sm:px-6 lg:px-8 text-xs text-zinc-500">
      <div class="max-w-7xl mx-auto space-y-8">
        
        <!-- Footer Navigation Links Grid -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-2 pb-6 border-b border-zinc-900">
          <div class="space-y-2">
            <p class="font-pixel text-[10px] text-brand-yellow uppercase tracking-wider">Navigation</p>
            <ul class="space-y-1.5 text-zinc-400">
              <li><NuxtLink to="/" class="hover:text-zinc-200 transition-colors">Home</NuxtLink></li>
              <li><NuxtLink to="/about" class="hover:text-zinc-200 transition-colors">About Us</NuxtLink></li>
              <li><NuxtLink to="/schedule" class="hover:text-zinc-200 transition-colors">Gathering Schedule</NuxtLink></li>
              <li><NuxtLink to="/first-time" class="hover:text-zinc-200 transition-colors">First Time Guide</NuxtLink></li>
            </ul>
          </div>

          <div class="space-y-2">
            <p class="font-pixel text-[10px] text-purple-400 uppercase tracking-wider">Community</p>
            <ul class="space-y-1.5 text-zinc-400">
              <li><NuxtLink to="/vault" class="hover:text-zinc-200 transition-colors">The Vault (Anonymous Q&amp;A)</NuxtLink></li>
              <li><NuxtLink to="/join-the-crew" class="hover:text-zinc-200 transition-colors">Join The Crew</NuxtLink></li>
              <li><NuxtLink to="/connect" class="hover:text-zinc-200 transition-colors">WhatsApp Pastoral Chat</NuxtLink></li>
            </ul>
          </div>

          <div class="space-y-2">
            <p class="font-pixel text-[10px] text-zinc-400 uppercase tracking-wider">Internal</p>
            <ul class="space-y-1.5 text-zinc-400">
              <li><NuxtLink to="/dashboard" class="hover:text-zinc-200 transition-colors">Portal Pelayan Tuhan</NuxtLink></li>
              <li><NuxtLink to="/dashboard/jadwal" class="hover:text-zinc-200 transition-colors">Jadwal Tugas</NuxtLink></li>
              <li><NuxtLink to="/dashboard/generator" class="hover:text-zinc-200 transition-colors">Arrow Studio</NuxtLink></li>
            </ul>
          </div>

          <div class="space-y-2">
            <p class="font-pixel text-[10px] text-brand-yellow uppercase tracking-wider">Arrow Movement</p>
            <p class="text-zinc-400 text-xs leading-relaxed">
              Empowering next generation youth &amp; young adults with kingdom purpose and authenticity.
            </p>
            <UiBadge variant="success" size="sm" dot class="mt-2">
              All Systems Operational
            </UiBadge>
          </div>
        </div>

        <!-- Copyright & Credits -->
        <div class="flex flex-col sm:flex-row items-center justify-between gap-4 text-zinc-500">
          <div class="flex items-center gap-3">
            <span class="font-pixel text-[11px] text-zinc-300">▲ ARROW GEN</span>
            <span class="text-zinc-700">|</span>
            <p>© 2026 Arrow Gen. All rights reserved.</p>
          </div>

          <p class="text-zinc-500">
            Powered by <span class="text-brand-purple font-medium">Nuxt 3</span> • <span class="text-brand-yellow font-medium">Tailwind CSS</span>
          </p>
        </div>

      </div>
    </footer>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isMobileMenuOpen = ref(false)

// 7 Halaman Publik Sesuai Ketentuan
interface NavLink {
  label: string
  path: string
  badge?: string
  badgeVariant?: 'primary' | 'secondary' | 'accent' | 'pixel'
}

const navLinks: NavLink[] = [
  { label: 'Home', path: '/' },
  { label: 'Schedule', path: '/schedule' },
  { label: 'First Time Here?', path: '/first-time' },
  { label: 'The Vault', path: '/vault', badge: 'Q&A', badgeVariant: 'accent' },
  { label: 'Join The Crew', path: '/join-the-crew', badge: 'Join', badgeVariant: 'primary' },
  { label: 'About', path: '/about' },
  { label: 'Connect', path: '/connect' }
]
</script>
