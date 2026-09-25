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

        <!-- Filter Category Tabs -->
        <div class="flex flex-wrap items-center justify-center gap-2 pt-4" role="tablist" aria-label="Schedule Category Filters">
          <button
            v-for="category in categories"
            :key="category.id"
            type="button"
            role="tab"
            :aria-selected="activeCategory === category.id"
            :class="[
              'px-4 py-2 rounded-lg text-xs font-medium transition-all select-none focus-visible:ring-2 focus-visible:ring-brand-yellow focus-visible:outline-none',
              activeCategory === category.id
                ? 'bg-brand-purple text-white shadow-sm font-semibold'
                : 'bg-zinc-900/80 text-zinc-300 border border-zinc-800 hover:text-white hover:border-zinc-700'
            ]"
            @click="activeCategory = category.id"
          >
            {{ category.label }}
          </button>
        </div>
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

      <!-- Empty State -->
      <UiCard
        v-if="filteredSchedules.length === 0"
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
          <h3 class="text-sm font-semibold text-zinc-200">No Gatherings Found in this Category</h3>
          <p class="text-xs text-zinc-400 max-w-sm mx-auto">
            We currently don't have scheduled services under this specific filter. You can explore all our regular weekly gatherings below.
          </p>
        </div>
        <div class="pt-2">
          <UiButton
            variant="outline"
            size="sm"
            class="text-xs"
            @click="activeCategory = 'all'"
          >
            Show All Gatherings
          </UiButton>
        </div>
      </UiCard>

      <!-- Schedule Cards Grid -->
      <div v-else class="space-y-6">
        <UiCard
          v-for="item in filteredSchedules"
          :key="item.id"
          :variant="item.isFeatured ? 'pixel' : 'default'"
          padding="none"
          class="border-zinc-800/80 hover:border-zinc-700 transition-all duration-200"
        >
          <div class="p-6 sm:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            
            <!-- Left Block: Date, Day & Time Badge Box -->
            <div class="flex sm:flex-col items-center sm:items-start justify-between w-full lg:w-48 shrink-0 pb-4 lg:pb-0 border-b lg:border-b-0 lg:border-r border-zinc-800/80 lg:pr-6 gap-3">
              <div class="space-y-1">
                <span class="font-pixel text-xs text-brand-yellow uppercase tracking-wider block">
                  {{ item.day }}
                </span>
                <p class="text-2xl sm:text-3xl font-bold text-zinc-100 font-sans tracking-tight">
                  {{ item.time }}
                </p>
                <p class="text-[11px] text-zinc-400 font-mono">
                  {{ item.timezone }}
                </p>
              </div>

              <UiBadge
                :variant="item.badgeVariant"
                size="sm"
                class="self-center sm:self-start mt-1"
              >
                {{ item.typeBadge }}
              </UiBadge>
            </div>

            <!-- Center Block: Title, Theme, Host, & Location -->
            <div class="flex-1 space-y-3">
              <div class="flex flex-wrap items-center gap-2">
                <h2 class="text-xl sm:text-2xl font-bold text-zinc-100 font-sans">
                  {{ item.title }}
                </h2>
                <span
                  v-if="item.isFeatured"
                  class="font-pixel text-[9px] px-2 py-0.5 rounded bg-brand-yellow text-black font-semibold"
                >
                  MAIN SERVICE
                </span>
              </div>

              <!-- Theme & Focus -->
              <p class="text-sm font-medium text-purple-300">
                Current Series: <span class="text-zinc-200 italic font-normal">"{{ item.theme }}"</span>
              </p>

              <!-- Description -->
              <p class="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-2xl">
                {{ item.description }}
              </p>

              <!-- Meta Tags: Location & Speaker -->
              <div class="flex flex-wrap items-center gap-4 text-xs text-zinc-400 pt-2">
                <div class="flex items-center gap-1.5 text-zinc-300">
                  <svg class="w-4 h-4 text-brand-yellow shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{{ item.location }}</span>
                </div>

                <div class="flex items-center gap-1.5">
                  <svg class="w-4 h-4 text-brand-purple-hover shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span>{{ item.leader }}</span>
                </div>

                <span v-if="item.streamingAvailable" class="text-emerald-400 flex items-center gap-1 text-[11px]">
                  <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Live Stream Available
                </span>
              </div>
            </div>

            <!-- Right Block: Actions -->
            <div class="flex flex-row lg:flex-col items-center justify-end gap-3 w-full lg:w-auto shrink-0 pt-4 lg:pt-0 border-t lg:border-t-0 border-zinc-800">
              <UiButton
                :variant="item.isFeatured ? 'pixel' : 'accent'"
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

      <!-- No items found fallback -->
      <div
        v-if="filteredSchedules.length === 0"
        class="text-center py-16 space-y-4"
      >
        <p class="font-pixel text-sm text-zinc-500">NO GATHERINGS FOUND IN THIS CATEGORY</p>
        <UiButton variant="ghost" size="sm" @click="activeCategory = 'all'">
          Reset Filter
        </UiButton>
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
import { ref, computed } from 'vue'

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

// Kategori Filter
const activeCategory = ref<string>('all')

const categories = [
  { id: 'all', label: 'All Gatherings' },
  { id: 'weekend', label: 'Weekend Services' },
  { id: 'creative', label: 'Creative & Campus' },
  { id: 'prayer', label: 'Prayer & Intercession' },
  { id: 'lifegroups', label: 'Life Groups' }
]

// Data Jadwal (Minimal 4 Item Lengkap dengan Hari, Waktu, Lokasi, dan Tema)
interface ScheduleItem {
  id: number
  category: string
  day: string
  time: string
  timezone: string
  title: string
  theme: string
  description: string
  location: string
  leader: string
  typeBadge: string
  badgeVariant: 'primary' | 'secondary' | 'accent' | 'pixel'
  isFeatured?: boolean
  streamingAvailable?: boolean
}

const schedules: ScheduleItem[] = [
  {
    id: 1,
    category: 'weekend',
    day: 'Saturday Night',
    time: '05:00 PM',
    timezone: 'WIB (GMT+7)',
    title: 'Arrow Youth Movement',
    theme: 'Unshakable Identity in Christ',
    description: 'Our primary high-energy gathering tailored for teens and young adults featuring dynamic modern worship, inspiring teaching, and after-hours cafe connect.',
    location: 'Main Auditorium • Central Campus (Lv. 3)',
    leader: 'Ps. Joshua Nathan & Arrow Worship',
    typeBadge: 'WEEKLY MAIN',
    badgeVariant: 'primary',
    isFeatured: true,
    streamingAvailable: true
  },
  {
    id: 2,
    category: 'weekend',
    day: 'Sunday Morning',
    time: '10:00 AM',
    timezone: 'WIB (GMT+7)',
    title: 'Sunday Generation Service',
    theme: 'The Power of Divine Alignment',
    description: 'A multigenerational experience dedicated to grounded biblical exegesis, corporate prayer, discipleship breakouts, and pastoral ministry.',
    location: 'Arrow Worship Hall • North Wing',
    leader: 'Pastoral Teaching Team',
    typeBadge: 'SUNDAY SERVICE',
    badgeVariant: 'accent',
    isFeatured: false,
    streamingAvailable: true
  },
  {
    id: 3,
    category: 'creative',
    day: 'Tuesday Evening',
    time: '06:30 PM',
    timezone: 'WIB (GMT+7)',
    title: 'Arrow Campus & Creative Collective',
    theme: 'Kingdom Creativity & Light in the Marketplace',
    description: 'A collaborative lab for designers, musicians, media creators, and university students seeking to bring excellence into culture and campus life.',
    location: 'Studio Loft 2B • Creative Center',
    leader: 'Arrow Creative Team',
    typeBadge: 'BI-WEEKLY LAB',
    badgeVariant: 'secondary',
    isFeatured: false,
    streamingAvailable: false
  },
  {
    id: 4,
    category: 'prayer',
    day: 'Wednesday Night',
    time: '07:00 PM',
    timezone: 'WIB (GMT+7)',
    title: 'Midweek Prayer & Intercession Encounter',
    theme: 'Burning Hearts & Open Heavens',
    description: 'An unhurried space for intimate acoustic praise, soaking prayer, personal reflection, and earnest intercession for our city and next generation.',
    location: 'The Upper Room Chapel & Zoom Live',
    leader: 'Intercession Ministry',
    typeBadge: 'PRAYER NIGHT',
    badgeVariant: 'primary',
    isFeatured: false,
    streamingAvailable: true
  },
  {
    id: 5,
    category: 'lifegroups',
    day: 'Thursday / Friday',
    time: '07:00 PM',
    timezone: 'WIB (GMT+7)',
    title: 'Arrow Life Groups (Connect Circles)',
    theme: 'Doing Life Together in Authenticity',
    description: 'Small groups of 8-12 young people meeting across the city for shared dinners, genuine accountability, scripture discussion, and life support.',
    location: 'Various Neighborhood Hubs & Coffee Shops',
    leader: 'Local Connect Pastors & Leaders',
    typeBadge: 'COMMUNITY',
    badgeVariant: 'accent',
    isFeatured: false,
    streamingAvailable: false
  }
]

// Computed Filter
const filteredSchedules = computed(() => {
  if (activeCategory.value === 'all') {
    return schedules
  }
  return schedules.filter(item => item.category === activeCategory.value)
})

// Actions
const handleReminder = (title: string) => {
  alert(`Reminder scheduled for "${title}". A calendar invite notification has been registered!`)
}

const openDirections = (location: string) => {
  const query = encodeURIComponent(`Arrow Gen Church ${location}`)
  window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank')
}
</script>
