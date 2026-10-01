<template>
  <div class="min-h-screen flex flex-col bg-background text-foreground font-sans selection:bg-brand-purple selection:text-white">
    
    <!-- ====================================================================
         1. COMPACT & RESPONSIVE HEADER
         ==================================================================== -->
    <header class="sticky top-0 z-50 w-full border-b border-zinc-800/80 bg-black/90 backdrop-blur-md">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        <!-- Brand Identity Logo -->
        <NuxtLink to="/" class="flex items-center gap-2.5 sm:gap-3 group shrink-0">
          <img
            src="/logo-arrow.png"
            alt="Arrow Gen Logo"
            width="40"
            height="40"
            loading="eager"
            decoding="async"
            class="pixel-logo h-8 md:h-10 w-auto object-contain shrink-0 transition-transform duration-200 group-hover:scale-105"
          />
          <span class="font-pixel text-brand-yellow text-xs sm:text-sm tracking-wider flex items-center gap-2 group-hover:text-amber-300 transition-colors">
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
            :aria-expanded="isMobileMenuOpen"
            aria-controls="mobile-navigation"
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
          id="mobile-navigation"
          role="region"
          aria-label="Mobile Navigation"
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
         3. FOOTER — v3 Airy Minimal
         ==================================================================== -->
    <footer class="border-t border-zinc-800/60 bg-black pt-14 pb-10 px-4 sm:px-6 lg:px-8 text-xs text-zinc-400 relative">
      
      <!-- Top accent line -->
      <div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-purple/40 to-transparent pointer-events-none" aria-hidden="true" />

      <div class="max-w-7xl mx-auto space-y-10">
        
        <!-- Row 1: Brand + Quick Links (2-zone, side by side) -->
        <div class="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-10">
          
          <!-- Left: Brand identity -->
          <div class="space-y-3 max-w-md">
            <div class="flex items-center gap-3">
              <img
                src="/logo-arrow.png"
                alt="Arrow Gen Logo"
                width="28"
                height="28"
                loading="lazy"
                decoding="async"
                class="pixel-logo h-7 w-auto object-contain shrink-0"
              />
              <span class="font-bold text-lg text-zinc-100 font-sans tracking-tight">
                ARROW GEN
              </span>
              <span class="font-pixel text-[9px] text-brand-yellow tracking-widest">
                EST. 2026
              </span>
            </div>
            <p class="text-xs text-zinc-400 leading-relaxed">
              Equipping the next generation to stand in truth, walk in authority, and shoot straight with purpose.
            </p>
          </div>

          <!-- Right: Compact nav links -->
          <div class="flex flex-wrap gap-x-10 gap-y-6 text-xs">
            
            <!-- Community Links -->
            <div class="space-y-2.5">
              <p class="font-pixel text-[9px] text-brand-yellow tracking-wider uppercase">COMMUNITY</p>
              <ul class="space-y-1.5 text-zinc-300">
                <li>
                  <NuxtLink to="/first-time" class="hover:text-white transition-colors">
                    First Time Here?
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink to="/schedule" class="hover:text-white transition-colors">
                    Weekly Schedule
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink to="/about" class="hover:text-white transition-colors">
                    About Us
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink to="/vault" class="hover:text-white transition-colors">
                    The Vault
                  </NuxtLink>
                </li>
              </ul>
            </div>

            <!-- Get Involved -->
            <div class="space-y-2.5">
              <p class="font-pixel text-[9px] text-purple-400 tracking-wider uppercase">GET INVOLVED</p>
              <ul class="space-y-1.5 text-zinc-300">
                <li>
                  <NuxtLink to="/join-the-crew" class="hover:text-white transition-colors">
                    Join The Crew
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink to="/connect" class="hover:text-white transition-colors">
                    Pastoral Care
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink to="/login" class="hover:text-white transition-colors">
                    Servant Portal
                  </NuxtLink>
                </li>
              </ul>
            </div>

            <!-- Location -->
            <div class="space-y-2.5">
              <p class="font-pixel text-[9px] text-zinc-500 tracking-wider uppercase">CAMPUS</p>
              <div class="space-y-1.5 text-zinc-300 text-xs">
                <p>Arrow Gen Hall</p>
                <p class="text-zinc-500">Sat 5 PM • Sun 10 AM</p>
                <a
                  href="https://maps.google.com/?q=Arrow+Gen+Church"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-brand-yellow hover:text-brand-yellow-hover transition-colors inline-flex items-center gap-1"
                >
                  <span>Directions</span>
                  <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>

          </div>
        </div>

        <!-- Row 2: Baseline -->
        <div class="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 border-t border-zinc-900 text-zinc-500 text-[11px]">
          
          <p>© 2026 Arrow Gen Church. All rights reserved.</p>

          <p class="font-pixel text-[9px] text-zinc-500 tracking-wider">
            "LIKE ARROWS IN THE HANDS OF A WARRIOR" — PSA 127:4
          </p>

          <button
            type="button"
            class="text-zinc-500 hover:text-brand-yellow transition-colors font-pixel text-[10px] cursor-pointer inline-flex items-center gap-1"
            @click="scrollToTop"
          >
            <span>TOP</span>
            <span aria-hidden="true">↑</span>
          </button>

        </div>

      </div>
    </footer>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isMobileMenuOpen = ref(false)

const scrollToTop = () => {
  if (typeof window !== 'undefined') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

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
