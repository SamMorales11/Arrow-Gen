<template>
  <div class="min-h-screen flex bg-background text-foreground font-sans selection:bg-brand-purple selection:text-white">
    <!-- Mobile Backdrop Overlay -->
    <div
      v-if="isSidebarOpen"
      class="fixed inset-0 z-40 bg-black/75 backdrop-blur-sm lg:hidden transition-opacity"
      aria-hidden="true"
      @click="isSidebarOpen = false"
    />

    <!-- ====================================================================
         1. SIDEBAR INTERNAL (Admin & Servant Dynamic Navigation)
         ==================================================================== -->
    <aside
      :class="[
        'fixed top-0 bottom-0 left-0 z-50 w-72 bg-zinc-950 border-r border-zinc-800/80 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:z-auto',
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      ]"
    >
      <!-- Sidebar Brand Header -->
      <div class="h-20 px-5 border-b border-zinc-800/80 flex items-center justify-between">
        <NuxtLink :to="role === 'admin' ? '/admin' : '/servant'" class="flex items-center gap-3 group">
          <img
            src="/logo-arrow.png"
            alt="Arrow Gen Logo"
            class="h-10 w-auto object-contain shrink-0 transition-transform group-hover:scale-105"
          />
          <div class="flex flex-col">
            <span class="font-pixel text-brand-yellow text-xs tracking-wider group-hover:text-amber-300 transition-colors">
              ARROW GEN
            </span>
            <span class="text-[9px] text-zinc-500 font-mono tracking-widest uppercase mt-0.5">
              {{ role === 'admin' ? 'ADMIN CONSOLE' : 'MINISTRY HUB' }}
            </span>
          </div>
          <UiBadge variant="pixel" size="sm" class="ml-1 hidden sm:inline-flex">
            PORTAL
          </UiBadge>
        </NuxtLink>

        <!-- Close Button (Mobile only) -->
        <button
          class="lg:hidden text-zinc-400 hover:text-white p-1.5 rounded-md hover:bg-zinc-900 ml-auto"
          aria-label="Close sidebar"
          @click="isSidebarOpen = false"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Active User & Role Pill -->
      <div class="p-4 border-b border-zinc-900">
        <div class="p-3.5 rounded-xl bg-zinc-900/80 border border-zinc-800/80 flex items-center justify-between">
          <div class="flex items-center gap-2.5 min-w-0">
            <div
              :class="[
                'w-8 h-8 rounded-lg flex items-center justify-center font-pixel text-xs shrink-0 border',
                role === 'admin'
                  ? 'bg-amber-500/15 border-brand-yellow/40 text-brand-yellow'
                  : 'bg-brand-purple/20 border-brand-purple/40 text-purple-300'
              ]"
            >
              {{ role === 'admin' ? 'AD' : 'PT' }}
            </div>
            <div class="min-w-0">
              <p class="text-xs font-semibold text-zinc-100 truncate">
                {{ userName }}
              </p>
              <p class="text-[10px] text-zinc-400 font-mono uppercase tracking-wider">
                Role: {{ role.toUpperCase() }}
              </p>
            </div>
          </div>

          <UiBadge :variant="role === 'admin' ? 'pixel' : 'accent'" size="sm">
            {{ role === 'admin' ? 'Admin' : 'Servant' }}
          </UiBadge>
        </div>
      </div>

      <!-- Navigation Links (Dynamic by Role) -->
      <nav class="flex-1 px-3.5 py-4 space-y-1.5 overflow-y-auto">
        <p class="px-2 pb-2 text-[10px] font-pixel text-zinc-500 uppercase tracking-widest">
          {{ role === 'admin' ? 'ADMINISTRATION' : 'MINISTRY WORKSPACE' }}
        </p>

        <NuxtLink
          v-for="item in currentNavItems"
          :key="item.path"
          :to="item.path"
          :class="[
            'group flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-all select-none border',
            isRouteActive(item.path)
              ? 'bg-brand-purple text-white shadow-md shadow-brand-purple/20 border-brand-purple/60 font-semibold'
              : 'text-zinc-400 border-transparent hover:bg-zinc-900/90 hover:text-zinc-100 hover:border-zinc-800'
          ]"
          @click="isSidebarOpen = false"
        >
          <component
            :is="item.icon"
            :class="[
              'w-4 h-4 shrink-0 transition-colors',
              isRouteActive(item.path) ? 'text-brand-yellow' : 'text-zinc-400 group-hover:text-zinc-200'
            ]"
            aria-hidden="true"
          />
          <span class="truncate">{{ item.label }}</span>

          <!-- Active dot indicator -->
          <span
            v-if="isRouteActive(item.path)"
            class="ml-auto w-1.5 h-1.5 rounded-full bg-brand-yellow shrink-0 animate-pulse"
            aria-hidden="true"
          />
        </NuxtLink>

        <!-- Role Switcher Shortcut for Admins -->
        <div v-if="role === 'admin'" class="pt-4 mt-4 border-t border-zinc-900">
          <p class="px-2 pb-2 text-[10px] font-pixel text-zinc-500 uppercase tracking-widest">
            SWITCH WORKSPACE
          </p>
          <NuxtLink
            to="/servant"
            :class="[
              'group flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-colors border',
              isRouteActive('/servant')
                ? 'bg-zinc-800 text-white font-semibold border-zinc-700'
                : 'text-zinc-400 border-transparent hover:bg-zinc-900 hover:text-zinc-300'
            ]"
            @click="isSidebarOpen = false"
          >
            <svg class="w-4 h-4 text-purple-400 shrink-0 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
            <span>View Servant Portal</span>
          </NuxtLink>
        </div>
      </nav>

      <!-- Sidebar Footer (User Info & Logout) -->
      <div class="p-4 border-t border-zinc-800/80 bg-zinc-950/70">
        <div class="flex items-center justify-between gap-3">
          <div class="flex items-center gap-2.5 truncate">
            <div class="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-xs font-semibold text-zinc-200 shrink-0">
              {{ (userName[0] || 'U').toUpperCase() }}
            </div>
            <div class="truncate">
              <p class="text-xs font-medium text-zinc-200 truncate">
                {{ userName }}
              </p>
              <p class="text-[10px] text-zinc-500 truncate font-mono">
                {{ userEmail }}
              </p>
            </div>
          </div>

          <button
            type="button"
            class="p-2 rounded-lg text-zinc-400 hover:text-rose-400 hover:bg-rose-950/30 transition-colors shrink-0 disabled:opacity-50"
            aria-label="Sign Out"
            title="Sign Out"
            :disabled="isLoggingOut"
            @click="handleSignOut"
          >
            <svg v-if="!isLoggingOut" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <svg v-else class="w-4 h-4 animate-spin text-rose-400" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
            </svg>
          </button>
        </div>
      </div>
    </aside>

    <!-- ====================================================================
         2. MAIN CONTENT AREA & TOPBAR
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
            aria-label="Toggle Navigation Sidebar"
            @click="isSidebarOpen = true"
          >
            <svg class="w-5 h-5 text-zinc-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </UiButton>

          <!-- Breadcrumb Title -->
          <div class="flex items-center gap-2">
            <NuxtLink :to="role === 'admin' ? '/admin' : '/servant'" class="flex items-center gap-1.5 hover:opacity-80 transition-opacity">
              <img
                src="/logo-arrow.png"
                alt="Arrow Gen Logo"
                class="h-5 w-auto object-contain shrink-0"
              />
              <span class="font-pixel text-[10px] text-brand-yellow hidden sm:inline">
                ARROW GEN
              </span>
            </NuxtLink>
            <span class="text-zinc-600 hidden sm:inline">/</span>
            <span class="text-xs sm:text-sm font-semibold text-zinc-100">
              {{ currentRouteTitle }}
            </span>
          </div>
        </div>

        <!-- Topbar Right Actions -->
        <div class="flex items-center gap-2.5">
          <NuxtLink to="/">
            <UiButton
              variant="outline"
              size="sm"
              class="text-xs"
            >
              Public Website &rarr;
            </UiButton>
          </NuxtLink>

          <UiButton
            variant="pixel"
            size="sm"
            class="text-xs"
            :disabled="isLoggingOut"
            @click="handleSignOut"
          >
            <span v-if="!isLoggingOut">LOGOUT</span>
            <span v-else class="flex items-center gap-1.5">
              <svg class="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
              </svg>
              EXITING...
            </span>
          </UiButton>
        </div>
      </header>

      <!-- Main Slot Content -->
      <main class="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, h } from 'vue'
import { signOut, useSession } from '~/utils/auth-client'

const isSidebarOpen = ref(false)
const isLoggingOut = ref(false)
const route = useRoute()

// Ambil sesi user saat ini dari Better Auth
const session = useSession()

const user = computed(() => session.value.data?.user)
const role = computed(() => (user.value as { role?: string })?.role || 'servant')
const userName = computed(() => user.value?.name || (role.value === 'admin' ? 'Administrator' : 'Pelayan Tuhan'))
const userEmail = computed(() => user.value?.email || 'authenticated@arrowgen.church')

// Helper penentu active state route
const isRouteActive = (itemPath: string) => {
  const current = route.path
  if (itemPath === '/admin' || itemPath === '/servant') {
    return current === itemPath
  }
  return current === itemPath || current.startsWith(itemPath + '/')
}

// Navigasi Khusus Admin: Vault, Schedules, Crew, Photos, Users, Dashboard Home
const adminNavItems = [
  {
    label: 'Vault',
    path: '/admin/vault',
    icon: () =>
      h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
        h('path', {
          'stroke-linecap': 'round',
          'stroke-linejoin': 'round',
          'stroke-width': '2',
          d: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'
        })
      ])
  },
  {
    label: 'Schedules',
    path: '/admin/schedules',
    icon: () =>
      h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
        h('path', {
          'stroke-linecap': 'round',
          'stroke-linejoin': 'round',
          'stroke-width': '2',
          d: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
        })
      ])
  },
  {
    label: 'Crew',
    path: '/admin/crew',
    icon: () =>
      h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
        h('path', {
          'stroke-linecap': 'round',
          'stroke-linejoin': 'round',
          'stroke-width': '2',
          d: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
        })
      ])
  },
  {
    label: 'Photos',
    path: '/admin/photos',
    icon: () =>
      h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
        h('path', {
          'stroke-linecap': 'round',
          'stroke-linejoin': 'round',
          'stroke-width': '2',
          d: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
        })
      ])
  },
  {
    label: 'Users',
    path: '/admin/users',
    icon: () =>
      h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
        h('path', {
          'stroke-linecap': 'round',
          'stroke-linejoin': 'round',
          'stroke-width': '2',
          d: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z'
        })
      ])
  },
  {
    label: 'Dashboard Home',
    path: '/admin',
    icon: () =>
      h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
        h('path', {
          'stroke-linecap': 'round',
          'stroke-linejoin': 'round',
          'stroke-width': '2',
          d: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
        })
      ])
  }
]

// Navigasi Khusus Servant (Pelayan Tuhan): Vault, Schedules, Crew, Dashboard Home
const servantNavItems = [
  {
    label: 'Vault',
    path: '/servant/vault',
    icon: () =>
      h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
        h('path', {
          'stroke-linecap': 'round',
          'stroke-linejoin': 'round',
          'stroke-width': '2',
          d: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'
        })
      ])
  },
  {
    label: 'Schedules',
    path: '/servant/schedules',
    icon: () =>
      h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
        h('path', {
          'stroke-linecap': 'round',
          'stroke-linejoin': 'round',
          'stroke-width': '2',
          d: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
        })
      ])
  },
  {
    label: 'Crew',
    path: '/servant/crew',
    icon: () =>
      h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
        h('path', {
          'stroke-linecap': 'round',
          'stroke-linejoin': 'round',
          'stroke-width': '2',
          d: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
        })
      ])
  },
  {
    label: 'Dashboard Home',
    path: '/servant',
    icon: () =>
      h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
        h('path', {
          'stroke-linecap': 'round',
          'stroke-linejoin': 'round',
          'stroke-width': '2',
          d: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
        })
      ])
  }
]

// Tentukan nav items berdasarkan role
const currentNavItems = computed(() => {
  return role.value === 'admin' ? adminNavItems : servantNavItems
})

// Judul breadcrumb topbar dinamis
const currentRouteTitle = computed(() => {
  const match = currentNavItems.value.find(item => isRouteActive(item.path))
  if (match) return match.label
  return role.value === 'admin' ? 'Admin Control' : 'Servant Hub'
})

// Fungsi logout terpadu
const handleSignOut = async () => {
  if (isLoggingOut.value) return
  isLoggingOut.value = true
  try {
    await signOut()
  } catch (error) {
    console.error('Logout error:', error)
  } finally {
    isLoggingOut.value = false
    await navigateTo('/login', { replace: true })
  }
}
</script>
