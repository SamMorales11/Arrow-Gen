<template>
  <div class="space-y-8">
    <!-- 1. Header Section -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-zinc-800 pb-6">
      <div class="space-y-1">
        <div class="flex items-center gap-2">
          <h1 class="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100 font-sans">
            Servant Portal
          </h1>
          <UiBadge variant="accent" size="sm">
            MINISTRY CREW
          </UiBadge>
        </div>
        <p class="text-xs sm:text-sm text-zinc-400">
          Gathering rosters, active service schedules, pre-service prayer requests, and ministry onboarding.
        </p>
      </div>

      <div class="flex items-center gap-2.5 flex-wrap">
        <UiButton
          variant="outline"
          size="sm"
          :loading="pending"
          class="text-xs"
          @click="refreshData"
        >
          <template #leading>
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </template>
          Refresh
        </UiButton>

        <NuxtLink to="/servant/schedules">
          <UiButton variant="outline" size="sm" class="text-xs">
            Manage Schedules
          </UiButton>
        </NuxtLink>

        <NuxtLink to="/servant/crew">
          <UiButton variant="outline" size="sm" class="text-xs">
            Review Crew
          </UiButton>
        </NuxtLink>

        <NuxtLink to="/connect">
          <UiButton variant="pixel" size="sm" class="text-xs">
            WhatsApp Group &rarr;
          </UiButton>
        </NuxtLink>
      </div>
    </div>

    <!-- 2. Loading State Skeletons -->
    <div v-if="pending && !dashboardData" class="space-y-8">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <UiSkeleton v-for="i in 4" :key="i" class="h-28 rounded-xl" />
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UiSkeleton class="h-80 rounded-xl" />
        <UiSkeleton class="h-80 rounded-xl" />
      </div>
    </div>

    <!-- 3. Dashboard Real Content -->
    <div v-else class="space-y-8">
      <!-- Quick Status Cards Grid (Live Data) -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <!-- Card 1: Pending Vault Questions -->
        <NuxtLink to="/servant/vault" class="block group">
          <UiCard
            variant="default"
            padding="md"
            class="space-y-2 border-zinc-800 bg-zinc-950/80 group-hover:border-amber-500/50 transition-colors h-full flex flex-col justify-between"
          >
            <div>
              <div class="flex items-center justify-between">
                <span class="font-pixel text-[10px] text-amber-400 uppercase tracking-wider">
                  VAULT PRAYER ITEMS
                </span>
                <UiBadge variant="accent" size="sm" dot>
                  {{ vaultStats.pending > 0 ? 'Needs Prayer' : 'All Answered' }}
                </UiBadge>
              </div>
              <div class="flex items-baseline justify-between mt-2">
                <span class="text-3xl font-bold text-zinc-100 group-hover:text-amber-300 transition-colors">
                  {{ vaultStats.pending }}
                </span>
                <span class="text-xs text-zinc-400 font-mono">
                  / {{ vaultStats.total }} Total
                </span>
              </div>
            </div>
            <p class="text-[11px] text-zinc-400 pt-1 border-t border-zinc-900 flex items-center justify-between">
              <span>Youth inquiries for pastoral support</span>
              <span class="text-amber-400 font-medium group-hover:translate-x-0.5 transition-transform">&rarr;</span>
            </p>
          </UiCard>
        </NuxtLink>

        <!-- Card 2: Pending Crew Candidates -->
        <NuxtLink to="/servant/crew" class="block group">
          <UiCard
            variant="default"
            padding="md"
            class="space-y-2 border-zinc-800 bg-zinc-950/80 group-hover:border-purple-500/50 transition-colors h-full flex flex-col justify-between"
          >
            <div>
              <div class="flex items-center justify-between">
                <span class="font-pixel text-[10px] text-purple-400 uppercase tracking-wider">
                  CREW CANDIDATES
                </span>
                <UiBadge variant="primary" size="sm">
                  {{ crewStats.pending > 0 ? 'Evaluating' : 'Reviewed' }}
                </UiBadge>
              </div>
              <div class="flex items-baseline justify-between mt-2">
                <span class="text-3xl font-bold text-zinc-100 group-hover:text-purple-300 transition-colors">
                  {{ crewStats.pending }}
                </span>
                <span class="text-xs text-zinc-400 font-mono">
                  / {{ crewStats.total }} Applicants
                </span>
              </div>
            </div>
            <p class="text-[11px] text-zinc-400 pt-1 border-t border-zinc-900 flex items-center justify-between">
              <span>Prospective volunteers awaiting review</span>
              <span class="text-purple-400 font-medium group-hover:translate-x-0.5 transition-transform">&rarr;</span>
            </p>
          </UiCard>
        </NuxtLink>

        <!-- Card 3: Active Gathering Schedules -->
        <NuxtLink to="/servant/schedules" class="block group">
          <UiCard
            variant="default"
            padding="md"
            class="space-y-2 border-zinc-800 bg-zinc-950/80 group-hover:border-emerald-500/50 transition-colors h-full flex flex-col justify-between"
          >
            <div>
              <div class="flex items-center justify-between">
                <span class="font-pixel text-[10px] text-emerald-400 uppercase tracking-wider">
                  ACTIVE SCHEDULES
                </span>
                <UiBadge variant="success" size="sm" dot>
                  Weekly
                </UiBadge>
              </div>
              <div class="flex items-baseline justify-between mt-2">
                <span class="text-3xl font-bold text-zinc-100 group-hover:text-emerald-300 transition-colors">
                  {{ activeSchedulesCount }}
                </span>
                <span class="text-xs text-zinc-400 font-mono">
                  / {{ allSchedules.length }} Total
                </span>
              </div>
            </div>
            <p class="text-[11px] text-zinc-400 pt-1 border-t border-zinc-900 flex items-center justify-between">
              <span>Gathering sessions on roster</span>
              <span class="text-emerald-400 font-medium group-hover:translate-x-0.5 transition-transform">&rarr;</span>
            </p>
          </UiCard>
        </NuxtLink>

        <!-- Card 4: Next Highlight Service -->
        <div class="block">
          <UiCard
            variant="default"
            padding="md"
            class="space-y-2 border-zinc-800 bg-zinc-950/80 h-full flex flex-col justify-between"
          >
            <div>
              <div class="flex items-center justify-between">
                <span class="font-pixel text-[10px] text-brand-yellow uppercase tracking-wider">
                  NEXT MAIN SERVICE
                </span>
                <UiBadge variant="pixel" size="sm">
                  {{ activeSchedulesList[0]?.day || 'Schedule' }}
                </UiBadge>
              </div>
              <div class="mt-2">
                <p class="text-xl font-bold text-zinc-100 truncate">
                  {{ activeSchedulesList[0]?.time || 'TBA' }}
                </p>
                <p class="text-xs text-zinc-400 truncate mt-0.5">
                  {{ activeSchedulesList[0]?.title || 'Check schedules roster' }}
                </p>
              </div>
            </div>
            <p class="text-[11px] text-zinc-500 pt-1 border-t border-zinc-900 truncate">
              {{ activeSchedulesList[0]?.location || 'Campus location' }}
            </p>
          </UiCard>
        </div>
      </div>

      <!-- Main Activity Panels Grid (Live Data) -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <!-- Panel 1: Active Gathering Services Runsheet -->
        <UiCard variant="default" padding="lg" class="border-zinc-800 bg-zinc-950/80 space-y-4 flex flex-col justify-between">
          <div class="space-y-4">
            <div class="flex items-center justify-between border-b border-zinc-800/80 pb-3">
              <div>
                <h2 class="text-base font-bold text-zinc-100 font-sans flex items-center gap-2">
                  Active Ministry Services
                  <span class="px-2 py-0.5 rounded-full text-[10px] font-mono bg-zinc-900 text-zinc-400 border border-zinc-800">
                    Live Roster
                  </span>
                </h2>
                <p class="text-xs text-zinc-400">
                  Current weekend services and gatherings in the ministry
                </p>
              </div>
              <NuxtLink to="/servant/schedules" class="text-xs text-brand-yellow hover:underline font-medium">
                Manage All ({{ allSchedules.length }}) &rarr;
              </NuxtLink>
            </div>

            <!-- Empty State -->
            <div
              v-if="activeSchedulesList.length === 0"
              class="py-10 text-center border border-dashed border-zinc-800/80 rounded-xl"
            >
              <p class="text-xs text-zinc-500">No active gathering schedules currently scheduled.</p>
            </div>

            <!-- Schedules Items -->
            <div v-else class="space-y-3">
              <div
                v-for="item in activeSchedulesList.slice(0, 4)"
                :key="item.id"
                class="p-3.5 rounded-lg border border-zinc-800/80 bg-zinc-900/50 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 hover:border-zinc-700 transition-colors"
              >
                <div class="space-y-1 min-w-0">
                  <div class="flex items-center gap-2">
                    <span class="font-mono text-xs font-semibold text-brand-yellow">
                      {{ item.day }} • {{ item.time }}
                    </span>
                    <UiBadge variant="success" size="sm">Active</UiBadge>
                  </div>
                  <h3 class="text-xs sm:text-sm font-semibold text-zinc-100 truncate">
                    {{ item.title }}
                  </h3>
                  <p class="text-[11px] text-zinc-400 truncate">
                    {{ item.location }}
                  </p>
                </div>

                <div v-if="item.theme" class="text-left sm:text-right shrink-0">
                  <span class="text-[10px] font-pixel text-zinc-500 uppercase block">THEME</span>
                  <span class="text-xs text-zinc-300 font-sans italic">"{{ item.theme }}"</span>
                </div>
              </div>
            </div>
          </div>

          <div class="pt-3 border-t border-zinc-900 text-xs text-zinc-500 flex items-center justify-between">
            <span>Official youth gathering calendar</span>
            <NuxtLink to="/servant/schedules" class="text-zinc-400 hover:text-zinc-200">
              Open Schedules &rarr;
            </NuxtLink>
          </div>
        </UiCard>

        <!-- Panel 2: The Vault Anonymous Inquiries for Ministry Prayer -->
        <UiCard variant="default" padding="lg" class="border-zinc-800 bg-zinc-950/80 space-y-4 flex flex-col justify-between">
          <div class="space-y-4">
            <div class="flex items-center justify-between border-b border-zinc-800/80 pb-3">
              <div>
                <h2 class="text-base font-bold text-zinc-100 font-sans flex items-center gap-2">
                  Youth Inquiries for Prayer
                  <span class="px-2 py-0.5 rounded-full text-[10px] font-mono bg-zinc-900 text-zinc-400 border border-zinc-800">
                    Live Feed
                  </span>
                </h2>
                <p class="text-xs text-zinc-400">
                  Recent anonymous questions to uplift during pre-service prayer
                </p>
              </div>
              <NuxtLink to="/servant/vault" class="text-xs text-brand-yellow hover:underline font-medium">
                View All ({{ vaultQuestionsList.length }}) &rarr;
              </NuxtLink>
            </div>

            <!-- Empty State -->
            <div
              v-if="recentVaultQuestions.length === 0"
              class="py-10 text-center border border-dashed border-zinc-800/80 rounded-xl"
            >
              <p class="text-xs text-zinc-500">No prayer inquiries in The Vault right now.</p>
            </div>

            <!-- Questions List -->
            <div v-else class="space-y-3">
              <div
                v-for="query in recentVaultQuestions"
                :key="query.id"
                class="p-3.5 rounded-lg border border-zinc-800/80 bg-zinc-900/50 space-y-2 hover:border-zinc-700 transition-colors"
              >
                <div class="flex items-center justify-between text-xs">
                  <UiBadge variant="secondary" size="sm">
                    {{ query.category || 'Youth Concern' }}
                  </UiBadge>
                  <span class="text-[11px] text-zinc-500 font-mono">{{ formatDate(query.createdAt) }}</span>
                </div>
                <p class="text-xs text-zinc-200 italic leading-relaxed line-clamp-2">
                  "{{ query.question }}"
                </p>
                <div class="pt-1 flex items-center justify-between text-xs">
                  <span
                    :class="[
                      'text-[11px] font-medium capitalize',
                      query.status === 'answered' ? 'text-emerald-400' : 'text-amber-400'
                    ]"
                  >
                    Status: {{ query.status === 'answered' ? 'Answered' : 'Awaiting Prayer / Guidance' }}
                  </span>
                  <NuxtLink to="/servant/vault" class="text-brand-yellow hover:underline text-[11px] font-semibold">
                    Support &rarr;
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>

          <!-- Pre-service prayer prompt strip -->
          <div class="p-3 rounded-lg bg-brand-purple/10 border border-brand-purple/30 text-xs text-purple-200 flex items-center justify-between">
            <span>Remember: All-team pre-service prayer is held before each gathering.</span>
            <span class="font-pixel text-[10px] text-brand-yellow">READY</span>
          </div>
        </UiCard>

      </div>

      <!-- Panel 3: Recent Join The Crew Candidates -->
      <UiCard variant="default" padding="lg" class="border-zinc-800 bg-zinc-950/80 space-y-4">
        <div class="flex items-center justify-between border-b border-zinc-800/80 pb-3">
          <div>
            <h2 class="text-base font-bold text-zinc-100 font-sans flex items-center gap-2">
              Recent Crew Registrations
              <span class="px-2 py-0.5 rounded-full text-[10px] font-mono bg-zinc-900 text-zinc-400 border border-zinc-800">
                Onboarding
              </span>
            </h2>
            <p class="text-xs text-zinc-400">
              Youth eager to serve in production, media, and hospitality
            </p>
          </div>
          <NuxtLink to="/servant/crew" class="text-xs text-brand-yellow hover:underline font-medium">
            Review Candidates ({{ crewApplicantsList.length }}) &rarr;
          </NuxtLink>
        </div>

        <div v-if="recentCrewApplicants.length === 0" class="py-8 text-center text-xs text-zinc-500">
          No new crew registrations awaiting review.
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div
            v-for="applicant in recentCrewApplicants"
            :key="applicant.id"
            class="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-2 flex flex-col justify-between"
          >
            <div class="space-y-1.5">
              <div class="flex items-center justify-between">
                <h3 class="text-xs sm:text-sm font-semibold text-zinc-100 truncate">
                  {{ applicant.fullName }}
                </h3>
                <UiBadge
                  :variant="applicant.status === 'accepted' ? 'success' : 'accent'"
                  size="sm"
                >
                  {{ applicant.status.toUpperCase() }}
                </UiBadge>
              </div>

              <div class="flex flex-wrap gap-1">
                <UiBadge
                  v-for="interest in applicant.interests"
                  :key="interest"
                  variant="outline"
                  size="sm"
                  class="text-[10px]"
                >
                  {{ interest }}
                </UiBadge>
              </div>

              <p class="text-xs text-zinc-400 italic line-clamp-2 pt-1">
                "{{ applicant.motivation }}"
              </p>
            </div>

            <div class="pt-2 border-t border-zinc-900 flex items-center justify-between text-xs">
              <span class="text-[10px] text-zinc-500 font-mono">{{ formatDate(applicant.createdAt) }}</span>
              <NuxtLink to="/servant/crew" class="text-brand-yellow hover:underline text-[11px] font-semibold">
                Dossier &rarr;
              </NuxtLink>
            </div>
          </div>
        </div>
      </UiCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

// 1. Page Metadata & Authentication
definePageMeta({
  layout: 'dashboard',
  middleware: ['auth', 'servant']
})

useHead({
  title: 'Servant Portal | Arrow Gen Ministry'
})

// 2. Types & Interfaces
interface VaultApiResponse {
  success: boolean
  total: number
  stats: {
    total: number
    pending: number
    answered: number
    rejected: number
  }
  data: Array<{
    id: string
    question: string
    category: string | null
    status: 'pending' | 'answered' | 'rejected'
    answer: string | null
    createdAt: string
  }>
}

interface CrewApiResponse {
  success: boolean
  total: number
  stats: {
    total: number
    pending: number
    reviewed: number
    accepted: number
    rejected: number
  }
  data: Array<{
    id: string
    fullName: string
    contact: string
    interests: string[]
    motivation: string
    status: 'pending' | 'reviewed' | 'accepted' | 'rejected'
    createdAt: string
  }>
}

interface SchedulesApiResponse {
  success: boolean
  total: number
  data: Array<{
    id: string
    title: string
    day: string
    time: string
    location: string
    theme: string | null
    isActive: boolean
    createdAt: string
  }>
}

// 3. Fetch Real Live Data from APIs
const { data: dashboardData, pending, refresh } = await useAsyncData('servant-live-dashboard', async () => {
  const reqHeaders = useRequestHeaders(['cookie']) as Record<string, string>

  const [vaultRes, crewRes, schedulesRes] = await Promise.all([
    $fetch<VaultApiResponse>('/api/vault', { headers: reqHeaders }).catch(() => null),
    $fetch<CrewApiResponse>('/api/crew', { headers: reqHeaders }).catch(() => null),
    $fetch<SchedulesApiResponse>('/api/schedules?all=true', { headers: reqHeaders }).catch(() => null)
  ])

  return {
    vault: vaultRes,
    crew: crewRes,
    schedules: schedulesRes
  }
})

const refreshData = async () => {
  await refresh()
}

// 4. Computed Metrics & Data Lists
const vaultStats = computed(() => {
  return dashboardData.value?.vault?.stats || {
    total: 0,
    pending: 0,
    answered: 0,
    rejected: 0
  }
})

const vaultQuestionsList = computed(() => {
  return dashboardData.value?.vault?.data || []
})

const recentVaultQuestions = computed(() => {
  return vaultQuestionsList.value.slice(0, 3)
})

const crewStats = computed(() => {
  return dashboardData.value?.crew?.stats || {
    total: 0,
    pending: 0,
    reviewed: 0,
    accepted: 0,
    rejected: 0
  }
})

const crewApplicantsList = computed(() => {
  return dashboardData.value?.crew?.data || []
})

const recentCrewApplicants = computed(() => {
  return crewApplicantsList.value.slice(0, 3)
})

const allSchedules = computed(() => {
  return dashboardData.value?.schedules?.data || []
})

const activeSchedulesList = computed(() => {
  return allSchedules.value.filter(s => s.isActive)
})

const activeSchedulesCount = computed(() => {
  return activeSchedulesList.value.length
})

// 5. Helpers
const formatDate = (dateString?: string | null) => {
  if (!dateString) return '-'
  try {
    const d = new Date(dateString)
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  } catch {
    return dateString
  }
}
</script>
