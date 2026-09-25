<template>
  <div class="min-h-screen flex flex-col bg-background text-foreground">

    <!-- ====================================================================
         1. SCHEDULE HEADER BANNER
         ==================================================================== -->
    <section class="relative px-4 sm:px-6 lg:px-8 py-16 sm:py-20 bg-retro-grid border-b border-zinc-900 overflow-hidden">
      <!-- Glow effect -->
      <div
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 sm:w-[600px] h-96 sm:h-[600px] bg-brand-purple/15 rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true"
      />

      <div class="relative max-w-4xl mx-auto text-center space-y-6 z-10">
        <UiBadge variant="pixel" size="sm">
          WEEKLY &amp; MONTHLY TIMELINE
        </UiBadge>

        <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-50 font-sans">
          Gathering <span class="text-brand-yellow">Schedule</span>
        </h1>

        <p class="max-w-2xl mx-auto text-base sm:text-lg text-zinc-400 font-sans leading-relaxed">
          Every gathering is crafted to deepen your faith, ignite divine purpose, and connect you with an authentic family in Christ. Find your service and join us this week.
        </p>
      </div>
    </section>

    <!-- ====================================================================
         2. SCHEDULE ITEMS LIST
         ==================================================================== -->
    <section class="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16">

      <!-- Quick Information Notice Strip -->
      <div class="mb-10 p-4 rounded-xl border border-zinc-800 bg-zinc-950/80 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-lg bg-brand-yellow/15 border border-brand-yellow/30 flex items-center justify-center text-brand-yellow shrink-0">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p class="text-xs sm:text-sm text-zinc-300">
            All Saturday &amp; Sunday services offer live simultaneous English &amp; Indonesian translation.
          </p>
        </div>

        <UiBadge variant="success" size="sm" dot>
          Auditorium Doors Open 30 Mins Prior
        </UiBadge>
      </div>

      <!-- ── Loading Skeleton ── -->
      <div v-if="pending" class="space-y-6">
        <UiCard
          v-for="i in 3"
          :key="i"
          variant="default"
          padding="none"
          class="border-zinc-800/80"
        >
          <div class="p-6 sm:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div class="flex flex-col gap-3 w-full lg:w-48 shrink-0 pb-4 lg:pb-0 border-b lg:border-b-0 lg:border-r border-zinc-800/80 lg:pr-6">
              <UiSkeleton width="80px" height="12px" rounded="sm" />
              <UiSkeleton width="120px" height="36px" rounded="md" />
              <UiSkeleton width="90px" height="12px" rounded="sm" />
            </div>
            <div class="flex-1 space-y-3">
              <UiSkeleton width="60%" height="28px" rounded="md" />
              <UiSkeleton width="50%" height="16px" rounded="sm" />
              <UiSkeleton width="80%" height="14px" rounded="sm" />
              <UiSkeleton width="40%" height="14px" rounded="sm" />
            </div>
          </div>
        </UiCard>
      </div>

      <!-- ── Error State ── -->
      <UiCard
        v-else-if="fetchError"
        variant="default"
        padding="lg"
        class="text-center py-14 border-rose-900/60 bg-rose-950/20 space-y-4"
      >
        <div class="w-12 h-12 rounded-full bg-rose-950/80 border border-rose-800/80 flex items-center justify-center mx-auto text-rose-400">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <div class="space-y-1">
          <h3 class="text-sm font-semibold text-zinc-100">Unable to Load Schedule</h3>
          <p class="text-xs text-zinc-400 max-w-sm mx-auto">
            We're having trouble loading the schedule right now. Please refresh the page or try again later.
          </p>
        </div>
        <div class="pt-2 flex justify-center">
          <UiButton variant="outline" size="sm" class="text-xs" @click="refresh()">
            Try Again
          </UiButton>
        </div>
      </UiCard>

      <!-- ── Empty State ── -->
      <UiCard
        v-else-if="!pending && schedules.length === 0"
        variant="default"
        padding="lg"
        class="text-center py-16 border-dashed border-zinc-800 bg-zinc-950/40 space-y-4"
      >
        <div class="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto text-zinc-500">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <div class="space-y-1">
          <h3 class="text-sm font-semibold text-zinc-200">No Gatherings Scheduled Yet</h3>
          <p class="text-xs text-zinc-400 max-w-sm mx-auto">
            We currently don't have any published gathering schedules. Please check back soon — our team is finalizing the upcoming lineup!
          </p>
        </div>
      </UiCard>

      <!-- ── Schedule Cards Grid ── -->
      <div v-else class="space-y-6">
        <UiCard
          v-for="item in schedules"
          :key="item.id"
          variant="default"
          padding="none"
          class="border-zinc-800/80 hover:border-zinc-700 transition-all duration-200"
        >
          <div class="p-6 sm:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">

            <!-- Left Block: Day & Time Badge Box -->
            <div class="flex sm:flex-col items-center sm:items-start justify-between w-full lg:w-48 shrink-0 pb-4 lg:pb-0 border-b lg:border-b-0 lg:border-r border-zinc-800/80 lg:pr-6 gap-3">
              <div class="space-y-1">
                <span class="font-pixel text-xs text-brand-yellow uppercase tracking-wider block">
                  {{ item.day }}
                </span>
                <p class="text-2xl sm:text-3xl font-bold text-zinc-100 font-sans tracking-tight">
                  {{ item.time }}
                </p>
                <p class="text-[11px] text-zinc-400 font-mono">
                  WIB (GMT+7)
                </p>
              </div>

              <UiBadge
                variant="primary"
                size="sm"
                class="self-center sm:self-start mt-1"
              >
                GATHERING
              </UiBadge>
            </div>

            <!-- Center Block: Title, Theme & Location -->
            <div class="flex-1 space-y-3">
              <div class="flex flex-wrap items-center gap-2">
                <h2 class="text-xl sm:text-2xl font-bold text-zinc-100 font-sans">
                  {{ item.title }}
                </h2>
              </div>

              <!-- Theme & Focus -->
              <p v-if="item.theme" class="text-sm font-medium text-purple-300">
                Current Series: <span class="text-zinc-200 italic font-normal">"{{ item.theme }}"</span>
              </p>

              <!-- Meta Tags: Location -->
              <div class="flex flex-wrap items-center gap-4 text-xs text-zinc-400 pt-2">
                <div class="flex items-center gap-1.5 text-zinc-300">
                  <svg class="w-4 h-4 text-brand-yellow shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{{ item.location }}</span>
                </div>
              </div>
            </div>

            <!-- Right Block: Actions -->
            <div class="flex flex-row lg:flex-col items-center justify-end gap-3 w-full lg:w-auto shrink-0 pt-4 lg:pt-0 border-t lg:border-t-0 border-zinc-800">
              <UiButton
                variant="pixel"
                size="sm"
                class="w-full lg:w-36 text-center"
                @click="handleReminder(item.title)"
              >
                SET REMINDER
              </UiButton>

              <UiButton
                variant="outline"
                size="sm"
                class="w-full lg:w-36"
                @click="openDirections(item.location)"
              >
                Directions
              </UiButton>
            </div>

          </div>
        </UiCard>
      </div>

    </section>

    <!-- ====================================================================
         3. CONNECT & LIFE GROUPS CALLOUT SECTION
         ==================================================================== -->
    <section class="border-t border-zinc-900 bg-zinc-950/70 py-16 px-4 sm:px-6 lg:px-8">
      <div class="max-w-5xl mx-auto text-center space-y-6">
        <h3 class="text-2xl sm:text-3xl font-bold text-zinc-100 font-sans">
          Looking for a Midweek Life Group?
        </h3>
        <p class="max-w-xl mx-auto text-sm text-zinc-400 leading-relaxed">
          Beyond our large services, we gather in cozy homes and neighborhood cafes throughout the week. Find people who will pray with you, celebrate with you, and do life together.
        </p>
        <div class="flex flex-wrap items-center justify-center gap-4 pt-2">
          <UiButton
            variant="accent"
            size="md"
            @click="navigateTo('/kontak')"
          >
            JOIN A LIFE GROUP
          </UiButton>
          <UiButton
            variant="outline"
            size="md"
            @click="navigateTo('/')"
          >
            Back to Home
          </UiButton>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
// Terapkan Layout Default Publik
definePageMeta({
  layout: 'default'
})

// Head SEO & Open Graph Meta Tags
useSeoMeta({
  title: 'Gathering Schedule — Weekly Services & Youth Gatherings',
  ogTitle: 'Gathering Schedule — Arrow Gen Services & Gatherings',
  description: 'Explore the weekly service and gathering schedule of Arrow Gen Youth & Young Adults. Join us for worship, message, and fellowship this weekend.',
  ogDescription: 'Find service times, locations, and special events for Arrow Gen youth services, prayer nights, and community gatherings.',
  ogImage: '/logo-arrow.png',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Gathering Schedule — Arrow Gen',
  twitterDescription: 'Join us for worship, community, and transformative fellowship this week.',
  twitterImage: '/logo-arrow.png'
})

useHead({
  htmlAttrs: { lang: 'en' }
})

// ─── Types ────────────────────────────────────────────────────────────────────
interface ScheduleItem {
  id: string
  title: string
  day: string
  time: string
  location: string
  theme: string | null
  isActive: boolean
  createdAt: string
  updatedAt: string
}

interface PublicSchedulesResponse {
  success: boolean
  total: number
  data: ScheduleItem[]
}

// ─── Fetch live data from public API (no auth required) ───────────────────────
const { data: apiResponse, pending, error: fetchError, refresh } = await useFetch<PublicSchedulesResponse>(
  '/api/schedules/public',
  {
    // Caching pendek agar perubahan admin langsung tercermin
    dedupe: 'cancel'
  }
)

// Computed list — hanya data dari database, tidak ada dummy
const schedules = computed<ScheduleItem[]>(() => apiResponse.value?.data ?? [])

// ─── Actions ──────────────────────────────────────────────────────────────────
const handleReminder = (title: string) => {
  alert(`Reminder scheduled for "${title}". A calendar invite notification has been registered!`)
}

const openDirections = (location: string) => {
  const query = encodeURIComponent(`Arrow Gen Church ${location}`)
  window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank')
}
</script>
