<template>
  <div class="space-y-8">
    <!-- Header Section -->
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
          Executive oversight for Arrow Gen ministry operations, incoming inquiries, and media curation.
        </p>
      </div>

      <div class="flex items-center gap-3">
        <NuxtLink to="/schedule">
          <UiButton variant="outline" size="sm" class="text-xs">
            Manage Schedules
          </UiButton>
        </NuxtLink>
        <NuxtLink to="/servant">
          <UiButton variant="pixel" size="sm" class="text-xs">
            Servant View &rarr;
          </UiButton>
        </NuxtLink>
      </div>
    </div>

    <!-- Quick Stats Grid (Ringkasan Data) -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <UiCard variant="default" padding="md" class="space-y-2 border-zinc-800 bg-zinc-950/80">
        <span class="font-pixel text-[10px] text-brand-yellow uppercase">THE VAULT INQUIRIES</span>
        <div class="flex items-baseline justify-between">
          <span class="text-3xl font-bold text-zinc-100">{{ stats.pendingVaultQuestions }}</span>
          <UiBadge variant="pixel" size="sm">Action Needed</UiBadge>
        </div>
        <p class="text-[11px] text-zinc-400">Anonymous questions pending pastoral response</p>
      </UiCard>

      <UiCard variant="default" padding="md" class="space-y-2 border-zinc-800 bg-zinc-950/80">
        <span class="font-pixel text-[10px] text-purple-400 uppercase">CREW APPLICATIONS</span>
        <div class="flex items-baseline justify-between">
          <span class="text-3xl font-bold text-zinc-100">{{ stats.crewApplicationsCount }}</span>
          <UiBadge variant="accent" size="sm">Needs Review</UiBadge>
        </div>
        <p class="text-[11px] text-zinc-400">Creative talent submissions awaiting interview</p>
      </UiCard>

      <UiCard variant="default" padding="md" class="space-y-2 border-zinc-800 bg-zinc-950/80">
        <span class="font-pixel text-[10px] text-emerald-400 uppercase">GATHERING SCHEDULES</span>
        <div class="flex items-baseline justify-between">
          <span class="text-3xl font-bold text-zinc-100">{{ stats.activeSchedules }}</span>
          <UiBadge variant="success" size="sm">Active</UiBadge>
        </div>
        <p class="text-[11px] text-zinc-400">Published services across youth and weekend main</p>
      </UiCard>

      <UiCard variant="default" padding="md" class="space-y-2 border-zinc-800 bg-zinc-950/80">
        <span class="font-pixel text-[10px] text-zinc-400 uppercase">PHOTO REEL CURATED</span>
        <div class="flex items-baseline justify-between">
          <span class="text-3xl font-bold text-zinc-100">{{ stats.curatedPhotos }}</span>
          <UiBadge variant="secondary" size="sm">Live Carousel</UiBadge>
        </div>
        <p class="text-[11px] text-zinc-400">Photos actively featured on homepage landing</p>
      </UiCard>
    </div>

    <!-- Management Panels Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      
      <!-- Panel 1: Pending Vault Questions Preview -->
      <UiCard variant="default" padding="lg" class="border-zinc-800 bg-zinc-950/80 space-y-4">
        <div class="flex items-center justify-between border-b border-zinc-800/80 pb-3">
          <div>
            <h2 class="text-base font-bold text-zinc-100 font-sans">
              Recent Vault Questions
            </h2>
            <p class="text-xs text-zinc-400">
              Submitted anonymously via /vault
            </p>
          </div>
          <NuxtLink to="/vault" class="text-xs text-brand-yellow hover:underline font-medium">
            View Live Vault &rarr;
          </NuxtLink>
        </div>

        <div class="space-y-3">
          <div
            v-for="q in recentVaultQuestions"
            :key="q.id"
            class="p-3.5 rounded-lg border border-zinc-800/80 bg-zinc-900/50 space-y-2 hover:border-zinc-700 transition-colors"
          >
            <div class="flex items-center justify-between text-xs">
              <UiBadge variant="secondary" size="sm">
                {{ q.category }}
              </UiBadge>
              <span class="text-[11px] text-zinc-500 font-mono">{{ q.submittedAt }}</span>
            </div>
            <p class="text-xs text-zinc-200 font-sans leading-relaxed line-clamp-2">
              "{{ q.question }}"
            </p>
            <div class="pt-1 flex items-center justify-between text-xs">
              <span class="text-[11px] text-amber-400/90 font-medium">
                Status: Pending Pastoral Reply
              </span>
              <button class="text-brand-yellow hover:underline text-[11px] font-semibold">
                Draft Reply &rarr;
              </button>
            </div>
          </div>
        </div>
      </UiCard>

      <!-- Panel 2: Crew Recruitment Pipeline Preview -->
      <UiCard variant="default" padding="lg" class="border-zinc-800 bg-zinc-950/80 space-y-4">
        <div class="flex items-center justify-between border-b border-zinc-800/80 pb-3">
          <div>
            <h2 class="text-base font-bold text-zinc-100 font-sans">
              Crew Recruitment Pipeline
            </h2>
            <p class="text-xs text-zinc-400">
              Submitted via /join-the-crew
            </p>
          </div>
          <NuxtLink to="/join-the-crew" class="text-xs text-brand-yellow hover:underline font-medium">
            View Public Form &rarr;
          </NuxtLink>
        </div>

        <div class="space-y-3">
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
              <span class="text-[11px] text-purple-400 font-mono">
                Status: {{ applicant.status }}
              </span>
              <button class="text-brand-yellow hover:underline text-[11px] font-semibold">
                Review Profile &rarr;
              </button>
            </div>
          </div>
        </div>
      </UiCard>

    </div>
  </div>
</template>

<script setup lang="ts">
// Menerapkan Layout Dashboard Internal & Middleware Admin
definePageMeta({
  layout: 'dashboard',
  middleware: ['auth', 'admin']
})

useHead({
  title: 'Admin Control Center | Arrow Gen Internal'
})

// Ringkasan Data Statistik (Dapat diperbarui dengan live query)
const stats = {
  pendingVaultQuestions: 8,
  crewApplicationsCount: 5,
  activeSchedules: 3,
  curatedPhotos: 12
}

// Data Dummy Pertanyaan Vault Terbaru
const recentVaultQuestions = [
  {
    id: 'vq-1',
    category: 'Faith & Theology',
    question: 'How do I maintain genuine faith when encountering persistent scientific doubts in university?',
    submittedAt: 'Today, 08:30 WIB',
    status: 'pending'
  },
  {
    id: 'vq-2',
    category: 'Mental Health & Identity',
    question: 'What is the biblical balance between self-discipline and granting oneself rest during intense burnout?',
    submittedAt: 'Yesterday, 19:15 WIB',
    status: 'pending'
  },
  {
    id: 'vq-3',
    category: 'Relationships & Dating',
    question: 'How do we set healthy boundaries in dating without falling into legalistic or overly critical mindsets?',
    submittedAt: 'Sep 21, 14:00 WIB',
    status: 'pending'
  }
]

// Data Dummy Pendaftar Crew Terbaru
const recentCrewApplicants = [
  {
    id: 'ca-1',
    fullName: 'Jonathan Alexander',
    contact: '+62 812 3456 7890',
    interests: ['Sound & Audio', 'Video & Media'],
    motivation: 'Experienced in FOH mixing for 3 years; passionate about youth live production.',
    status: 'In Review'
  },
  {
    id: 'ca-2',
    fullName: 'Clara Evelyn',
    contact: 'clara.evelyn@email.com',
    interests: ['Graphic Design', 'Social Media'],
    motivation: 'Love creating typography and visual stage motion assets for church ministry.',
    status: 'Interview Scheduled'
  },
  {
    id: 'ca-3',
    fullName: 'David Pratama',
    contact: '+62 819 8765 4321',
    interests: ['Worship (Acoustic Guitar)'],
    motivation: 'Desire to serve in weekly youth worship and grow in discipleship.',
    status: 'Pending Review'
  }
]
</script>
