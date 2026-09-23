<template>
  <div class="min-h-screen flex bg-background text-foreground font-sans selection:bg-brand-purple selection:text-white">
    <!-- Backdrop Mobile Overlay -->
    <div
      v-if="isSidebarOpen"
      class="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden transition-opacity"
      aria-hidden="true"
      @click="isSidebarOpen = false"
    />

    <!-- ====================================================================
         1. SIDEBAR INTERNAL (Admin & Pelayan Tuhan)
         ==================================================================== -->
    <aside
      :class="[
        'fixed top-0 bottom-0 left-0 z-50 w-72 bg-zinc-950 border-r border-zinc-800/80 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:z-auto',
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      ]"
    >
      <!-- Sidebar Header & Logo -->
      <div class="h-16 px-6 border-b border-zinc-800/80 flex items-center justify-between">
        <NuxtLink to="/dashboard" class="flex items-center gap-2.5">
          <span class="font-pixel text-brand-yellow text-xs tracking-wider flex items-center gap-2">
            <span class="inline-block w-2 h-2 bg-brand-yellow"></span>
            ARROW GEN
          </span>
          <UiBadge variant="pixel" size="sm">
            PORTAL
          </UiBadge>
        </NuxtLink>

        <!-- Close button (Mobile only) -->
        <button
          class="lg:hidden text-zinc-400 hover:text-white p-1"
          aria-label="Tutup Sidebar"
          @click="isSidebarOpen = false"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- User Role Indicator Card -->
      <div class="p-4 border-b border-zinc-900">
        <div class="p-3 rounded-lg bg-zinc-900/90 border border-zinc-800 flex items-center justify-between">
          <div class="flex items-center gap-2.5">
            <div class="w-8 h-8 rounded-md bg-brand-purple/20 border border-brand-purple/40 flex items-center justify-center font-pixel text-xs text-purple-300">
              PT
            </div>
            <div>
              <p class="text-xs font-semibold text-zinc-200">Pelayan Tuhan</p>
              <p class="text-[10px] text-zinc-500 font-mono">Role: Internal Access</p>
            </div>
          </div>
          <UiBadge variant="success" size="sm" dot>
            Online
          </UiBadge>
        </div>
      </div>

      <!-- Navigation Links -->
      <nav class="flex-1 px-4 py-4 space-y-1.5 overflow-y-auto">
        <NuxtLink
          v-for="item in navItems"
          :key="item.path"
          :to="item.path"
          :class="[
            'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
            $route.path === item.path
              ? 'bg-brand-purple text-white shadow-sm'
              : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200'
          ]"
          @click="isSidebarOpen = false"
        >
          <component :is="item.icon" class="w-4 h-4 shrink-0" aria-hidden="true" />
          <span>{{ item.label }}</span>
          <UiBadge
            v-if="item.badge"
            :variant="item.badgeVariant || 'secondary'"
            size="sm"
            class="ml-auto"
          >
            {{ item.badge }}
          </UiBadge>
        </NuxtLink>
      </nav>

      <!-- Sidebar Footer (User Info & Logout) -->
      <div class="p-4 border-t border-zinc-800/80 bg-zinc-950/60">
        <div class="flex items-center justify-between gap-2">
          <div class="flex items-center gap-2 truncate">
            <div class="w-7 h-7 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-xs font-medium text-zinc-300 shrink-0">
              A
            </div>
            <div class="truncate">
              <p class="text-xs font-medium text-zinc-200 truncate">Admin Pelayanan</p>
              <p class="text-[10px] text-zinc-500 truncate">admin@arrowgen.org</p>
            </div>
          </div>

          <UiButton
            variant="ghost"
            size="icon"
            aria-label="Logout"
            title="Keluar"
            @click="handleLogout"
          >
            <svg class="w-4 h-4 text-zinc-400 hover:text-rose-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </UiButton>
        </div>
      </div>
    </aside>

    <!-- ====================================================================
         2. AREA KONTEN UTAMA & TOPBAR
         ==================================================================== -->
    <div class="flex-1 flex flex-col min-w-0">
      <!-- Topbar Header -->
      <header class="h-16 sticky top-0 z-30 border-b border-zinc-800/80 bg-black/80 backdrop-blur-md px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <!-- Mobile Sidebar Toggle -->
          <UiButton
            variant="ghost"
            size="icon"
            class="lg:hidden"
            aria-label="Buka Sidebar Menu"
            @click="isSidebarOpen = true"
          >
            <svg class="w-5 h-5 text-zinc-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </UiButton>

          <!-- Breadcrumb / Status Title -->
          <div class="flex items-center gap-2">
            <span class="font-pixel text-[11px] text-zinc-400 hidden sm:inline">PORTAL</span>
            <span class="text-zinc-600 hidden sm:inline">/</span>
            <span class="text-sm font-semibold text-zinc-100">
              Dashboard Internal
            </span>
          </div>
        </div>

        <!-- Topbar Right Actions -->
        <div class="flex items-center gap-3">
          <UiButton
            variant="pixel"
            size="sm"
            class="hidden sm:inline-flex"
            @click="navigateTo('/generator')"
          >
            + NEW ARROW
          </UiButton>

          <NuxtLink to="/">
            <UiButton
              variant="outline"
              size="sm"
            >
              Lihat Web Publik
            </UiButton>
          </NuxtLink>
        </div>
      </header>

      <!-- Main Slot Content Area -->
      <main class="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, h } from 'vue'

const isSidebarOpen = ref(false)

// Navigasi Internal Dashboard Siap Ekstensi
const navItems = [
  {
    label: 'Ikhtisar (Overview)',
    path: '/dashboard',
    icon: () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' })
    ])
  },
  {
    label: 'Jadwal Pelayanan',
    path: '/dashboard/jadwal',
    icon: () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' })
    ]),
    badge: 'Aktif',
    badgeVariant: 'accent' as const
  },
  {
    label: 'Tim & Pelayan Tuhan',
    path: '/dashboard/pelayan',
    icon: () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' })
    ])
  },
  {
    label: 'Arrow Studio Generator',
    path: '/dashboard/generator',
    icon: () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M13 10V3L4 14h7v7l9-11h-7z' })
    ]),
    badge: 'Pro',
    badgeVariant: 'primary' as const
  },
  {
    label: 'Pengaturan Sistem',
    path: '/dashboard/settings',
    icon: () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' }),
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z' })
    ])
  }
]

const handleLogout = () => {
  navigateTo('/')
}
</script>
