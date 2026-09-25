<template>
  <div class="space-y-8">
    <!-- 1. Header Section -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-zinc-800 pb-6">
      <div class="space-y-1">
        <div class="flex items-center gap-2">
          <h1 class="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100 font-sans">
            Admin Control Center
          </h1>
          <UiBadge variant="pixel" size="sm">
            ROOT ACCESS
          </UiBadge>
        </div>
        <p class="text-xs sm:text-sm text-zinc-400">
          Executive live oversight for Arrow Gen ministry operations, pending inquiries, crew recruitment, and schedules.
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

        <NuxtLink to="/admin/users">
          <UiButton variant="outline" size="sm" class="text-xs">
            Pelayan Tuhan
          </UiButton>
        </NuxtLink>

        <NuxtLink to="/admin/photos">
          <UiButton variant="outline" size="sm" class="text-xs">
            Photo Reel
          </UiButton>
        </NuxtLink>

        <NuxtLink to="/servant">
          <UiButton variant="pixel" size="sm" class="text-xs">
            Servant View &rarr;
          </UiButton>
        </NuxtLink>
      </div>
    </div>

    <!-- 2. Loading State Skeletons -->
    <div v-if="pending && !dashboardData" class="space-y-8">
      <!-- KPI Skeletons -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <UiCard v-for="i in 4" :key="i" variant="default" padding="md" class="border-zinc-800 bg-zinc-950/80 space-y-4">
          <div class="flex items-center justify-between">
            <UiSkeleton class="h-3.5 w-24 rounded" />
            <UiSkeleton class="h-4 w-16 rounded-full" />
          </div>
          <div class="flex items-baseline justify-between">
            <UiSkeleton class="h-8 w-14 rounded" />
            <UiSkeleton class="h-3 w-16 rounded" />
          </div>
          <div class="pt-2 border-t border-zinc-900 flex justify-between">
            <UiSkeleton class="h-2.5 w-32 rounded" />
            <UiSkeleton class="h-2.5 w-4 rounded" />
          </div>
        </UiCard>
      </div>

      <!-- Panels Skeletons -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UiCard v-for="p in 2" :key="p" variant="default" padding="lg" class="border-zinc-800 bg-zinc-950/80 space-y-4">
          <div class="flex items-center justify-between border-b border-zinc-800/80 pb-3">
            <div class="space-y-1.5">
              <UiSkeleton class="h-4 w-36 rounded" />
              <UiSkeleton class="h-3 w-48 rounded" />
            </div>
            <UiSkeleton class="h-3.5 w-24 rounded" />
          </div>
          <div class="space-y-3">
            <div v-for="item in 3" :key="item" class="p-3.5 rounded-lg border border-zinc-800/80 bg-zinc-900/40 space-y-2">
              <div class="flex justify-between">
                <UiSkeleton class="h-3.5 w-24 rounded" />
                <UiSkeleton class="h-3 w-16 rounded" />
              </div>
              <UiSkeleton class="h-3 w-full rounded" />
              <UiSkeleton class="h-3 w-2/3 rounded" />
            </div>
          </div>
        </UiCard>
      </div>
    </div>

    <!-- 3. Error State -->
    <UiCard
      v-else-if="error && !dashboardData"
      variant="default"
      padding="lg"
      class="text-center py-16 border-rose-900/50 bg-rose-950/20"
    >
      <div class="w-12 h-12 rounded-2xl bg-rose-950/60 border border-rose-800/80 flex items-center justify-center mx-auto text-rose-400 mb-3">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <h3 class="text-sm font-semibold text-rose-200">Unable to Load Dashboard Data</h3>
      <p class="text-xs text-rose-300/80 mt-1 max-w-sm mx-auto">
        {{ error.message || 'We could not reach the server to fetch live dashboard metrics. Please check your network connection.' }}
      </p>
      <div class="mt-5 flex justify-center gap-3">
        <UiButton
          variant="outline"
          size="sm"
          class="text-xs"
          @click="refreshData"
        >
          Retry Connection
        </UiButton>
      </div>
    </UiCard>

    <!-- 4. Dashboard Real Content -->
    <div v-else class="space-y-8">
      <!-- KPI Summary Cards (Live Data) -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <!-- Card 1: Pending Vault Questions -->
        <NuxtLink to="/admin/vault" class="block group">
          <UiCard
            variant="default"
            padding="md"
            class="space-y-2 border-zinc-800 bg-zinc-950/80 group-hover:border-amber-500/50 transition-colors h-full flex flex-col justify-between"
          >
            <div>
              <div class="flex items-center justify-between">
                <span class="font-pixel text-[10px] text-amber-400 uppercase tracking-wider">
                  THE VAULT INQUIRIES
                </span>
                <UiBadge variant="accent" size="sm" dot>
                  {{ vaultStats.pending > 0 ? 'Needs Action' : 'All Answered' }}
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
              <span>Awaiting pastoral guidance</span>
              <span class="text-amber-400 font-medium group-hover:translate-x-0.5 transition-transform">&rarr;</span>
            </p>
          </UiCard>
        </NuxtLink>

        <!-- Card 2: Pending Crew Applications -->
        <NuxtLink to="/admin/crew" class="block group">
          <UiCard
            variant="default"
            padding="md"
            class="space-y-2 border-zinc-800 bg-zinc-950/80 group-hover:border-purple-500/50 transition-colors h-full flex flex-col justify-between"
          >
            <div>
              <div class="flex items-center justify-between">
                <span class="font-pixel text-[10px] text-purple-400 uppercase tracking-wider">
                  CREW APPLICATIONS
                </span>
                <UiBadge variant="primary" size="sm">
                  {{ crewStats.pending > 0 ? 'Needs Review' : 'Reviewed' }}
                </UiBadge>
              </div>
              <div class="flex items-baseline justify-between mt-2">
                <span class="text-3xl font-bold text-zinc-100 group-hover:text-purple-300 transition-colors">
                  {{ crewStats.pending }}
                </span>
                <span class="text-xs text-zinc-400 font-mono">
                  / {{ crewStats.total }} Total
                </span>
              </div>
            </div>
            <p class="text-[11px] text-zinc-400 pt-1 border-t border-zinc-900 flex items-center justify-between">
              <span>Candidate submissions in queue</span>
              <span class="text-purple-400 font-medium group-hover:translate-x-0.5 transition-transform">&rarr;</span>
            </p>
          </UiCard>
        </NuxtLink>

        <!-- Card 3: Active Gathering Schedules -->
        <NuxtLink to="/admin/schedules" class="block group">
          <UiCard
            variant="default"
            padding="md"
            class="space-y-2 border-zinc-800 bg-zinc-950/80 group-hover:border-emerald-500/50 transition-colors h-full flex flex-col justify-between"
          >
            <div>
              <div class="flex items-center justify-between">
                <span class="font-pixel text-[10px] text-emerald-400 uppercase tracking-wider">
                  GATHERING SCHEDULES
                </span>
                <UiBadge variant="success" size="sm" dot>
                  Live
                </UiBadge>
              </div>
              <div class="flex items-baseline justify-between mt-2">
                <span class="text-3xl font-bold text-zinc-100 group-hover:text-emerald-300 transition-colors">
                  {{ activeSchedulesCount }}
                </span>
                <span class="text-xs text-zinc-400 font-mono">
                  / {{ allSchedules.length }} Registered
                </span>
              </div>
            </div>
            <p class="text-[11px] text-zinc-400 pt-1 border-t border-zinc-900 flex items-center justify-between">
              <span>Active youth &amp; weekend services</span>
              <span class="text-emerald-400 font-medium group-hover:translate-x-0.5 transition-transform">&rarr;</span>
            </p>
          </UiCard>
        </NuxtLink>

        <!-- Card 4: Curated Photo Reel -->
        <NuxtLink to="/admin/photos" class="block group">
          <UiCard
            variant="default"
            padding="md"
            class="space-y-2 border-zinc-800 bg-zinc-950/80 group-hover:border-sky-500/50 transition-colors h-full flex flex-col justify-between"
          >
            <div>
              <div class="flex items-center justify-between">
                <span class="font-pixel text-[10px] text-sky-400 uppercase tracking-wider">
                  PHOTO REEL CURATION
                </span>
                <UiBadge variant="secondary" size="sm">
                  Carousel
                </UiBadge>
              </div>
              <div class="flex items-baseline justify-between mt-2">
                <span class="text-3xl font-bold text-zinc-100 group-hover:text-sky-300 transition-colors">
                  {{ activePhotosCount }}
                </span>
                <span class="text-xs text-zinc-400 font-mono">
                  / {{ allPhotos.length }} Photos
                </span>
              </div>
            </div>
            <p class="text-[11px] text-zinc-400 pt-1 border-t border-zinc-900 flex items-center justify-between">
              <span>Featured on public landing page</span>
              <span class="text-sky-400 font-medium group-hover:translate-x-0.5 transition-transform">&rarr;</span>
            </p>
          </UiCard>
        </NuxtLink>
      </div>

      <!-- Recent Real Activity Panels -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        <!-- Panel 1: Recent Vault Inquiries (Live) -->
        <UiCard variant="default" padding="lg" class="border-zinc-800 bg-zinc-950/80 space-y-4 flex flex-col justify-between">
          <div class="space-y-4">
            <div class="flex items-center justify-between border-b border-zinc-800/80 pb-3">
              <div>
                <h2 class="text-base font-bold text-zinc-100 font-sans flex items-center gap-2">
                  Recent Vault Inquiries
                  <span class="px-2 py-0.5 rounded-full text-[10px] font-mono bg-zinc-900 text-zinc-400 border border-zinc-800">
                    Live Feed
                  </span>
                </h2>
                <p class="text-xs text-zinc-400">
                  Anonymous questions submitted by church youth
                </p>
              </div>
              <NuxtLink to="/admin/vault" class="text-xs text-brand-yellow hover:underline font-medium">
                Manage All ({{ vaultQuestionsList.length }}) &rarr;
              </NuxtLink>
            </div>

            <!-- Empty State -->
            <div
              v-if="recentVaultQuestions.length === 0"
              class="py-10 text-center border border-dashed border-zinc-800/80 rounded-xl bg-zinc-950/40 space-y-2"
            >
              <div class="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto text-zinc-500">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <p class="text-xs text-zinc-400 font-medium">No Vault Inquiries Yet</p>
              <p class="text-[11px] text-zinc-500 max-w-xs mx-auto">Questions asked by church youth will appear here in real-time.</p>
              <div class="pt-1">
                <NuxtLink to="/vault" target="_blank">
                  <UiButton variant="ghost" size="sm" class="text-xs text-brand-yellow">
                    Open Public Vault &rarr;
                  </UiButton>
                </NuxtLink>
              </div>
            </div>

            <!-- Questions List -->
            <div v-else class="space-y-3">
              <div
                v-for="q in recentVaultQuestions"
                :key="q.id"
                class="p-3.5 rounded-lg border border-zinc-800/80 bg-zinc-900/50 space-y-2 hover:border-zinc-700 transition-colors"
              >
                <div class="flex items-center justify-between text-xs gap-2">
                  <UiBadge variant="secondary" size="sm">
                    {{ q.category || 'General Inquiries' }}
                  </UiBadge>
                  <span class="text-[11px] text-zinc-500 font-mono">{{ formatDate(q.createdAt) }}</span>
                </div>
                
                <p class="text-xs text-zinc-200 font-sans leading-relaxed line-clamp-2">
                  "{{ q.question }}"
                </p>

                <div class="pt-1 flex items-center justify-between text-xs">
                  <span
                    :class="[
                      'text-[11px] font-medium capitalize',
                      q.status === 'answered'
                        ? 'text-emerald-400'
                        : q.status === 'rejected'
                        ? 'text-rose-400'
                        : 'text-amber-400'
                    ]"
                  >
                    Status: {{ q.status }}
                  </span>
                  <NuxtLink :to="`/admin/vault/${q.id}`" class="text-brand-yellow hover:underline text-[11px] font-semibold">
                    {{ q.answer ? 'Review Answer &rarr;' : 'Answer Inquiry &rarr;' }}
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>

          <div class="pt-3 border-t border-zinc-900 text-xs text-zinc-500 flex items-center justify-between">
            <span>Filtered pastoral database</span>
            <NuxtLink to="/admin/vault" class="text-zinc-400 hover:text-zinc-200">
              Open Vault Desk
            </NuxtLink>
          </div>
        </UiCard>

        <!-- Panel 2: Crew Recruitment Pipeline (Live) -->
        <UiCard variant="default" padding="lg" class="border-zinc-800 bg-zinc-950/80 space-y-4 flex flex-col justify-between">
          <div class="space-y-4">
            <div class="flex items-center justify-between border-b border-zinc-800/80 pb-3">
              <div>
                <h2 class="text-base font-bold text-zinc-100 font-sans flex items-center gap-2">
                  Crew Recruitment Pipeline
                  <span class="px-2 py-0.5 rounded-full text-[10px] font-mono bg-zinc-900 text-zinc-400 border border-zinc-800">
                    Live Feed
                  </span>
                </h2>
                <p class="text-xs text-zinc-400">
                  Volunteering registrations submitted via Join The Crew
                </p>
              </div>
              <NuxtLink to="/admin/crew" class="text-xs text-brand-yellow hover:underline font-medium">
                Manage Roster ({{ crewApplicantsList.length }}) &rarr;
              </NuxtLink>
            </div>

            <!-- Empty State -->
            <div
              v-if="recentCrewApplicants.length === 0"
              class="py-10 text-center border border-dashed border-zinc-800/80 rounded-xl bg-zinc-950/40 space-y-2"
            >
              <div class="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto text-zinc-500">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <p class="text-xs text-zinc-400 font-medium">No Volunteers in Pipeline</p>
              <p class="text-[11px] text-zinc-500 max-w-xs mx-auto">Applications submitted through Join The Crew will show up here.</p>
              <div class="pt-1">
                <NuxtLink to="/join-the-crew" target="_blank">
                  <UiButton variant="ghost" size="sm" class="text-xs text-purple-400">
                    Open Join Form &rarr;
                  </UiButton>
                </NuxtLink>
              </div>
            </div>

            <!-- Applicants List -->
            <div v-else class="space-y-3">
              <div
                v-for="applicant in recentCrewApplicants"
                :key="applicant.id"
                class="p-3.5 rounded-lg border border-zinc-800/80 bg-zinc-900/50 space-y-2 hover:border-zinc-700 transition-colors"
              >
                <div class="flex items-center justify-between text-xs">
                  <span class="font-semibold text-zinc-100">{{ applicant.fullName }}</span>
                  <span class="text-[11px] text-zinc-500 font-mono">{{ applicant.contact }}</span>
                </div>
                
                <div class="flex flex-wrap gap-1.5 pt-0.5">
                  <UiBadge
                    v-for="interest in applicant.interests"
                    :key="interest"
                    variant="accent"
                    size="sm"
                    class="text-[10px]"
                  >
                    {{ interest }}
                  </UiBadge>
                </div>

                <p class="text-xs text-zinc-400 italic line-clamp-1">
                  "{{ applicant.motivation }}"
                </p>

                <div class="pt-1 flex items-center justify-between text-xs">
                  <span
                    :class="[
                      'text-[11px] font-mono uppercase',
                      applicant.status === 'accepted'
                        ? 'text-emerald-400'
                        : applicant.status === 'rejected'
                        ? 'text-rose-400'
                        : applicant.status === 'reviewed'
                        ? 'text-sky-400'
                        : 'text-amber-400'
                    ]"
                  >
                    Status: {{ applicant.status }}
                  </span>
                  <NuxtLink to="/admin/crew" class="text-brand-yellow hover:underline text-[11px] font-semibold">
                    Review Dossier &rarr;
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>

          <div class="pt-3 border-t border-zinc-900 text-xs text-zinc-500 flex items-center justify-between">
            <span>Creative volunteers &amp; production</span>
            <NuxtLink to="/admin/crew" class="text-zinc-400 hover:text-zinc-200">
              Open Crew Manager
            </NuxtLink>
          </div>
        </UiCard>

      </div>

      <!-- Panel 3: Active Gathering Schedules Snapshot -->
      <UiCard variant="default" padding="lg" class="border-zinc-800 bg-zinc-950/80 space-y-4">
        <div class="flex items-center justify-between border-b border-zinc-800/80 pb-3">
          <div>
            <h2 class="text-base font-bold text-zinc-100 font-sans">
              Active Gathering Schedules &amp; Services
            </h2>
            <p class="text-xs text-zinc-400">
              Currently broadcasted services on the public website
            </p>
          </div>
          <NuxtLink to="/admin/schedules" class="text-xs text-brand-yellow hover:underline font-medium">
            Manage Schedules &rarr;
          </NuxtLink>
        </div>

        <div v-if="activeSchedulesList.length === 0" class="py-8 text-center border border-dashed border-zinc-800/80 rounded-xl bg-zinc-950/40 space-y-2">
          <p class="text-xs text-zinc-400 font-medium">No Active Schedules Published</p>
          <p class="text-[11px] text-zinc-500">Create or activate a gathering schedule to broadcast it on the public schedule page.</p>
          <div class="pt-1">
            <NuxtLink to="/admin/schedules">
              <UiButton variant="pixel" size="sm" class="text-xs">
                + Create Schedule
              </UiButton>
            </NuxtLink>
          </div>
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div
            v-for="item in activeSchedulesList.slice(0, 3)"
            :key="item.id"
            class="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-2 flex flex-col justify-between"
          >
            <div class="space-y-1">
              <div class="flex items-center justify-between">
                <span class="text-xs font-bold text-brand-yellow font-mono">
                  {{ item.day }} • {{ item.time }}
                </span>
                <UiBadge variant="success" size="sm">Active</UiBadge>
              </div>
              <h3 class="text-sm font-semibold text-zinc-100">
                {{ item.title }}
              </h3>
              <p class="text-xs text-zinc-400">
                {{ item.location }}
              </p>
            </div>

            <p v-if="item.theme" class="text-[11px] text-zinc-500 italic pt-2 border-t border-zinc-900">
              Theme: "{{ item.theme }}"
            </p>
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
  middleware: ['auth', 'admin']
})

useHead({
  title: 'Admin Control Center | Arrow Gen Internal'
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

interface PhotosApiResponse {
  success: boolean
  total: number
  data: Array<{
    id: string
    url: string
    alt: string
    order: number
    isActive: boolean
    createdAt: string
  }>
}

// 3. Fetch Real Live Data from APIs
const { data: dashboardData, pending, error, refresh } = await useAsyncData('admin-live-dashboard', async () => {
  const reqHeaders = useRequestHeaders(['cookie']) as Record<string, string>

  const [vaultRes, crewRes, schedulesRes, photosRes] = await Promise.all([
    $fetch<VaultApiResponse>('/api/vault', { headers: reqHeaders }).catch(() => null),
    $fetch<CrewApiResponse>('/api/crew', { headers: reqHeaders }).catch(() => null),
    $fetch<SchedulesApiResponse>('/api/schedules?all=true', { headers: reqHeaders }).catch(() => null),
    $fetch<PhotosApiResponse>('/api/photos?all=true', { headers: reqHeaders }).catch(() => null)
  ])

  if (!vaultRes && !crewRes && !schedulesRes && !photosRes) {
    throw new Error('Unable to connect to internal services. Please verify your connection or re-login.')
  }

  return {
    vault: vaultRes,
    crew: crewRes,
    schedules: schedulesRes,
    photos: photosRes
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

const allPhotos = computed(() => {
  return dashboardData.value?.photos?.data || []
})

const activePhotosCount = computed(() => {
  return allPhotos.value.filter(p => p.isActive).length
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
