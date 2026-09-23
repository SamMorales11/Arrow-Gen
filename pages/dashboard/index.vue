<template>
  <div class="space-y-8">
    <!-- Header Section -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-zinc-800 pb-6">
      <div class="space-y-1">
        <h1 class="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100 font-sans">
          Ministry Workspace
        </h1>
        <p class="text-xs sm:text-sm text-zinc-400">
          Welcome to the unified Arrow Gen internal ministry platform.
        </p>
      </div>

      <div class="flex items-center gap-3">
        <UiButton variant="pixel" size="sm" @click="handleSignOut">
          SIGN OUT
        </UiButton>
      </div>
    </div>

    <!-- Hub Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <UiCard variant="default" padding="lg" class="border-zinc-800 bg-zinc-950/80 space-y-4">
        <div class="flex items-center justify-between">
          <UiBadge variant="accent" size="sm">SERVANT PORTAL</UiBadge>
          <span class="text-xs text-zinc-500 font-mono">Role: Servant / Admin</span>
        </div>
        <h2 class="text-lg font-bold text-zinc-100">
          Weekly Rosters &amp; Ministry Prep
        </h2>
        <p class="text-xs text-zinc-400 leading-relaxed">
          Access service checklists, ministry briefings, and check-in schedules for weekend gatherings.
        </p>
        <NuxtLink to="/servant">
          <UiButton variant="outline" size="sm" class="mt-2">
            Enter Servant Portal &rarr;
          </UiButton>
        </NuxtLink>
      </UiCard>

      <UiCard variant="default" padding="lg" class="border-zinc-800 bg-zinc-950/80 space-y-4">
        <div class="flex items-center justify-between">
          <UiBadge variant="pixel" size="sm">ADMIN CONTROL</UiBadge>
          <span class="text-xs text-zinc-500 font-mono">Role: Admin Only</span>
        </div>
        <h2 class="text-lg font-bold text-zinc-100">
          Full System &amp; Public Site Admin
        </h2>
        <p class="text-xs text-zinc-400 leading-relaxed">
          Oversee schedule publications, photo reel media, crew applicant onboarding, and user roles.
        </p>
        <NuxtLink to="/admin">
          <UiButton variant="pixel" size="sm" class="mt-2">
            Enter Admin Control &rarr;
          </UiButton>
        </NuxtLink>
      </UiCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { signOut } from '~/utils/auth-client'

// Menerapkan Layout Dashboard Internal & Middleware Auth
definePageMeta({
  layout: 'dashboard',
  middleware: ['auth']
})

useHead({
  title: 'Ministry Dashboard | Arrow Gen'
})

const handleSignOut = async () => {
  await signOut()
  await navigateTo('/login')
}
</script>
