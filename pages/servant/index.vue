<template>
  <div class="space-y-8">
    <!-- Header Section -->
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
          Gathering rosters, service runsheets, pre-service prayer requests, and ministry guidelines.
        </p>
      </div>

      <div class="flex items-center gap-3">
        <NuxtLink to="/schedule">
          <UiButton variant="outline" size="sm" class="text-xs">
            View Schedule
          </UiButton>
        </NuxtLink>
        <NuxtLink to="/connect">
          <UiButton variant="pixel" size="sm" class="text-xs">
            WhatsApp Group &rarr;
          </UiButton>
        </NuxtLink>
      </div>
    </div>

    <!-- Quick Status Cards Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <UiCard variant="default" padding="md" class="space-y-2 border-zinc-800 bg-zinc-950/80">
        <span class="font-pixel text-[10px] text-brand-yellow uppercase">NEXT CALL TIME</span>
        <div class="flex items-baseline justify-between">
          <span class="text-2xl font-bold text-zinc-100">15:30 WIB</span>
          <UiBadge variant="pixel" size="sm">Saturday</UiBadge>
        </div>
        <p class="text-[11px] text-zinc-400">Upper Room • Soundcheck &amp; Briefing</p>
      </UiCard>

      <UiCard variant="default" padding="md" class="space-y-2 border-zinc-800 bg-zinc-950/80">
        <span class="font-pixel text-[10px] text-purple-400 uppercase">ACTIVE DEPARTMENT</span>
        <div class="flex items-baseline justify-between">
          <span class="text-2xl font-bold text-zinc-100">Production</span>
          <UiBadge variant="accent" size="sm">Audio / Media</UiBadge>
        </div>
        <p class="text-[11px] text-zinc-400">FOH Audio mixing &amp; stage visuals</p>
      </UiCard>

      <UiCard variant="default" padding="md" class="space-y-2 border-zinc-800 bg-zinc-950/80">
        <span class="font-pixel text-[10px] text-emerald-400 uppercase">VAULT PRAYER ITEMS</span>
        <div class="flex items-baseline justify-between">
          <span class="text-2xl font-bold text-zinc-100">4 Inquiries</span>
          <UiBadge variant="success" size="sm">Prayer Tagged</UiBadge>
        </div>
        <p class="text-[11px] text-zinc-400">Youth questions for pre-service prayer</p>
      </UiCard>

      <UiCard variant="default" padding="md" class="space-y-2 border-zinc-800 bg-zinc-950/80">
        <span class="font-pixel text-[10px] text-zinc-400 uppercase">TEAM STATUS</span>
        <div class="flex items-baseline justify-between">
          <span class="text-2xl font-bold text-zinc-100">Confirmed</span>
          <UiBadge variant="secondary" size="sm" dot>Online</UiBadge>
        </div>
        <p class="text-[11px] text-zinc-400">Roster attendance locked for this week</p>
      </UiCard>
    </div>

    <!-- Main Content Panels Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">

      <!-- Panel 1: Weekend Runsheet & Timeline -->
      <UiCard variant="default" padding="lg" class="border-zinc-800 bg-zinc-950/80 space-y-4">
        <div class="flex items-center justify-between border-b border-zinc-800/80 pb-3">
          <div>
            <h2 class="text-base font-bold text-zinc-100 font-sans">
              Saturday Youth Service Runsheet
            </h2>
            <p class="text-xs text-zinc-400">
              Session Theme: "Living Unshakable in Compromising Culture"
            </p>
          </div>
          <UiBadge variant="pixel" size="sm">
            RUNSHEET
          </UiBadge>
        </div>

        <div class="space-y-3">
          <div
            v-for="item in runsheet"
            :key="item.time"
            class="p-3 rounded-lg border border-zinc-800/80 bg-zinc-900/50 flex items-start gap-3.5"
          >
            <span class="font-mono text-xs font-semibold text-brand-yellow shrink-0 pt-0.5">
              {{ item.time }}
            </span>
            <div class="space-y-0.5 min-w-0">
              <p class="text-xs font-semibold text-zinc-100">{{ item.activity }}</p>
              <p class="text-[11px] text-zinc-400">{{ item.note }}</p>
            </div>
          </div>
        </div>
      </UiCard>

      <!-- Panel 2: The Vault Questions for Fellowship Prayer -->
      <UiCard variant="default" padding="lg" class="border-zinc-800 bg-zinc-950/80 space-y-4">
        <div class="flex items-center justify-between border-b border-zinc-800/80 pb-3">
          <div>
            <h2 class="text-base font-bold text-zinc-100 font-sans">
              Youth Concerns for Prayer
            </h2>
            <p class="text-xs text-zinc-400">
              Anonymized inquiries submitted by youth attendees
            </p>
          </div>
          <NuxtLink to="/vault" class="text-xs text-brand-yellow hover:underline font-medium">
            Go to The Vault &rarr;
          </NuxtLink>
        </div>

        <div class="space-y-3">
          <div
            v-for="query in prayerQueries"
            :key="query.id"
            class="p-3.5 rounded-lg border border-zinc-800/80 bg-zinc-900/50 space-y-2 hover:border-zinc-700 transition-colors"
          >
            <div class="flex items-center justify-between text-xs">
              <UiBadge variant="secondary" size="sm">
                {{ query.topic }}
              </UiBadge>
              <span class="text-[10px] text-zinc-500 font-mono">Anonymous Youth</span>
            </div>
            <p class="text-xs text-zinc-200 italic leading-relaxed">
              "{{ query.text }}"
            </p>
          </div>
        </div>

        <!-- Pre-service checklist strip -->
        <div class="p-3 rounded-lg bg-brand-purple/10 border border-brand-purple/30 text-xs text-purple-200 flex items-center justify-between">
          <span>Remember: Team prayer starts sharply at 16:30 in Sanctuary.</span>
          <span class="font-pixel text-[10px] text-brand-yellow">READY</span>
        </div>
      </UiCard>

    </div>
  </div>
</template>

<script setup lang="ts">
// Menerapkan Layout Dashboard Internal & Middleware Servant
definePageMeta({
  layout: 'dashboard',
  middleware: ['auth', 'servant']
})

useHead({
  title: 'Servant Portal | Arrow Gen Ministry'
})

// Runsheet data dummy
const runsheet = [
  {
    time: '15:30 WIB',
    activity: 'Crew Call Time & Audio Check',
    note: 'FOH sound engineering, IEM wireless pack calibration, and stage lighting testing.'
  },
  {
    time: '16:30 WIB',
    activity: 'All-Team Pre-Service Prayer',
    note: 'United prayer for attendees, speakers, band, and hospitality team.'
  },
  {
    time: '17:00 WIB',
    activity: 'Worship & Main Service Starts',
    note: '3 Praise & Worship songs, youth announcement reel, and pastoral preaching.'
  },
  {
    time: '18:30 WIB',
    activity: 'Coffee Fellowship & Connect Desk',
    note: 'Hospitality crew warmly welcomes newcomers at the Connect Lounge.'
  }
]

// The Vault anonymous inquiries for pre-service prayer
const prayerQueries = [
  {
    id: 'pq-1',
    topic: 'Anxiety & High School Pressure',
    text: 'How can I pray when exams and family expectations make me feel like I am constantly failing?'
  },
  {
    id: 'pq-2',
    topic: 'Friendships & Purity',
    text: 'I feel isolated in my social circle because I do not want to participate in unhealthy habits.'
  },
  {
    id: 'pq-3',
    topic: 'Calling & Discipleship',
    text: 'How do I know if God is calling me to serve more actively in church or focus on my studies?'
  }
]
</script>
