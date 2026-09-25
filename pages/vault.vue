<template>
  <div class="min-h-screen flex flex-col bg-background text-foreground">

    <!-- ====================================================================
         1. HERO HEADER BANNER
         ==================================================================== -->
    <section class="relative px-4 sm:px-6 lg:px-8 py-16 sm:py-24 bg-retro-grid border-b border-zinc-900 overflow-hidden">
      <!-- Glow ambient light -->
      <div
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 sm:w-[600px] h-96 sm:h-[600px] bg-brand-purple/15 rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        class="absolute bottom-0 right-20 w-64 h-64 bg-brand-yellow/8 rounded-full blur-[100px] pointer-events-none"
        aria-hidden="true"
      />

      <div class="relative max-w-3xl mx-auto text-center space-y-6 z-10">
        <UiBadge variant="pixel" size="sm">
          ANONYMOUS &amp; CONFIDENTIAL
        </UiBadge>

        <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-zinc-50 font-sans">
          The <span class="text-brand-yellow">Vault</span>
        </h1>

        <p class="text-base sm:text-lg text-zinc-400 font-sans leading-relaxed">
          Ask the hard questions. Wrestle with theology, mental health, relationships, or cultural pressure. There are no dumb or forbidden questions here.
        </p>

        <!-- Privacy & Anonymity Guarantee Pill -->
        <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-zinc-800 bg-zinc-950/80 text-xs text-zinc-300">
          <svg class="w-3.5 h-3.5 text-brand-yellow shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <span>100% Anonymous • Identity never stored or revealed</span>
        </div>

        <!-- Section Nav Tabs -->
        <div class="flex items-center justify-center gap-2 pt-2">
          <button
            type="button"
            :class="[
              'px-5 py-2 rounded-lg text-xs font-medium transition-all border select-none focus-visible:ring-2 focus-visible:ring-brand-yellow focus-visible:outline-none',
              activeTab === 'ask'
                ? 'bg-brand-purple text-white border-brand-purple shadow-sm'
                : 'bg-zinc-900/80 text-zinc-300 border-zinc-800 hover:text-white hover:border-zinc-700'
            ]"
            @click="activeTab = 'ask'"
          >
            Ask a Question
          </button>
          <button
            type="button"
            :class="[
              'px-5 py-2 rounded-lg text-xs font-medium transition-all border select-none focus-visible:ring-2 focus-visible:ring-brand-yellow focus-visible:outline-none',
              activeTab === 'answers'
                ? 'bg-brand-purple text-white border-brand-purple shadow-sm'
                : 'bg-zinc-900/80 text-zinc-300 border-zinc-800 hover:text-white hover:border-zinc-700'
            ]"
            @click="activeTab = 'answers'"
          >
            Browse Answers
            <span
              v-if="publicAnswers.length > 0"
              class="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full bg-brand-yellow text-black text-[9px] font-bold"
            >
              {{ publicAnswers.length > 99 ? '99+' : publicAnswers.length }}
            </span>
          </button>
        </div>
      </div>
    </section>

    <!-- ====================================================================
         2. ASK TAB — FORM SECTION
         ==================================================================== -->
    <section v-if="activeTab === 'ask'" class="flex-1 max-w-3xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16">

      <!-- SUCCESS STATE -->
      <UiCard
        v-if="submissionState === 'success'"
        variant="pixel"
        padding="lg"
        class="text-center space-y-6"
      >
        <div class="w-16 h-16 rounded-full bg-brand-yellow/15 border-2 border-brand-yellow flex items-center justify-center mx-auto text-brand-yellow">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <div class="space-y-3">
          <UiBadge variant="accent" size="sm">
            SUBMISSION SECURED
          </UiBadge>
          <h2 class="text-2xl sm:text-3xl font-bold text-zinc-100 font-sans">
            Question Deposited Into The Vault
          </h2>
          <p class="text-sm text-zinc-400 max-w-lg mx-auto leading-relaxed">
            Thank you for being brave and open. Your question has been delivered to our internal leadership team without any identifying metadata. When answered, it may appear in the <strong class="text-zinc-200">Browse Answers</strong> section below.
          </p>
        </div>

        <div class="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <UiButton variant="pixel" size="md" @click="resetForm">
            SUBMIT ANOTHER QUESTION
          </UiButton>
          <UiButton variant="outline" size="md" @click="activeTab = 'answers'">
            Browse Answered Questions
          </UiButton>
        </div>
      </UiCard>

      <!-- IDLE / LOADING / ERROR FORM STATE -->
      <UiCard
        v-else
        variant="default"
        padding="lg"
        class="border-zinc-800/80 bg-zinc-950/80 space-y-8"
      >
        <div class="border-b border-zinc-800 pb-5 space-y-1">
          <div class="flex items-center justify-between">
            <h2 class="text-xl font-bold text-zinc-100 font-sans">
              Drop Your Question Below
            </h2>
            <UiBadge variant="secondary" size="sm">
              Vault Form
            </UiBadge>
          </div>
          <p class="text-xs text-zinc-400">
            All submissions are strictly confidential and anonymized at rest.
          </p>
        </div>

        <!-- Global Error Alert -->
        <div
          v-if="submissionState === 'error'"
          class="p-4 rounded-xl bg-rose-950/50 border border-rose-800/80 text-rose-200 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3"
          role="alert"
        >
          <div class="flex items-start sm:items-center gap-2.5">
            <svg class="w-5 h-5 shrink-0 text-rose-400 mt-0.5 sm:mt-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <div>
              <p class="font-semibold text-rose-100">Unable to Deposit Question</p>
              <p class="text-rose-300/90 text-[11px] mt-0.5">{{ errorMessage || 'We experienced an issue depositing your question into The Vault. Please verify the fields below and try again.' }}</p>
            </div>
          </div>
          <UiButton
            type="button"
            variant="outline"
            size="sm"
            class="text-[11px] border-rose-700/60 hover:bg-rose-900/40 text-rose-200 shrink-0 self-start sm:self-auto"
            @click="handleSubmit"
          >
            Retry Submission
          </UiButton>
        </div>

        <form class="space-y-6" @submit.prevent="handleSubmit">

          <!-- Category Selection (Optional) -->
          <div class="space-y-2">
            <label class="text-sm font-medium text-zinc-200 select-none flex items-center justify-between">
              <span>Topic Category <span class="text-zinc-400 font-normal text-xs">(Optional)</span></span>
              <span class="text-xs text-zinc-400 font-mono">Helps direct to the right pastor</span>
            </label>

            <div class="grid grid-cols-2 sm:grid-cols-3 gap-2" role="group" aria-label="Topic Category Options">
              <button
                v-for="cat in categories"
                :key="cat"
                type="button"
                :aria-pressed="selectedCategory === cat"
                :class="[
                  'px-3 py-2 rounded-lg text-xs font-medium text-left transition-all border select-none focus-visible:ring-2 focus-visible:ring-brand-yellow focus-visible:outline-none',
                  selectedCategory === cat
                    ? 'bg-brand-purple/20 border-brand-purple text-purple-200'
                    : 'bg-zinc-900/60 border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700'
                ]"
                @click="selectedCategory = selectedCategory === cat ? '' : cat"
              >
                {{ cat }}
              </button>
            </div>
          </div>

          <!-- Main Question Field (Required) -->
          <UiInput
            v-model="questionText"
            type="textarea"
            label="Your Question"
            placeholder="Type your question or thought here with as much detail as you feel comfortable sharing..."
            hint="Min. 10 characters"
            :error="questionError"
            :disabled="submissionState === 'loading'"
            required
            rows="6"
          />

          <!-- Anonymity Confirmation Checkbox -->
          <div class="p-3.5 rounded-lg bg-zinc-900/60 border border-zinc-800 flex items-start gap-3">
            <input
              id="confirm-anon"
              v-model="acknowledgement"
              type="checkbox"
              class="mt-1 w-4 h-4 rounded border-zinc-700 bg-zinc-800 text-brand-purple focus:ring-brand-purple focus-visible:ring-2 focus-visible:ring-brand-yellow focus-visible:outline-none"
            />
            <label for="confirm-anon" class="text-xs text-zinc-300 cursor-pointer select-none leading-relaxed">
              I understand that this question is submitted anonymously and will be reviewed solely by the internal pastoral team for ministry guidance. When answered, it may be published publicly (without my identity).
            </label>
          </div>

          <!-- Action Buttons -->
          <div class="pt-4 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p class="text-[11px] text-zinc-400 font-mono">
              STATUS: {{ submissionState.toUpperCase() }}
            </p>

            <UiButton
              type="submit"
              variant="pixel"
              size="lg"
              class="w-full sm:w-auto"
              :loading="submissionState === 'loading'"
              :disabled="submissionState === 'loading'"
            >
              DEPOSIT QUESTION
            </UiButton>
          </div>

        </form>
      </UiCard>
    </section>

    <!-- ====================================================================
         3. ANSWERS TAB — PUBLIC Q&A FEED
         ==================================================================== -->
    <section v-else class="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16">

      <!-- Section Intro -->
      <div class="mb-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div class="space-y-1">
          <span class="font-pixel text-[11px] text-brand-yellow tracking-wider">PASTORAL RESPONSES</span>
          <h2 class="text-2xl sm:text-3xl font-bold text-zinc-100 font-sans">
            Answered Questions
          </h2>
          <p class="text-xs text-zinc-400">
            Real anonymous questions, pastorally answered. No identities revealed.
          </p>
        </div>

        <UiBadge v-if="!answersPending" variant="success" size="sm" dot>
          {{ publicAnswers.length }} Answered
        </UiBadge>
      </div>

      <!-- ── Loading Skeleton ── -->
      <div v-if="answersPending" class="space-y-5">
        <UiCard
          v-for="i in 4"
          :key="i"
          variant="default"
          padding="lg"
          class="border-zinc-800/80 bg-zinc-950/90 space-y-4"
        >
          <div class="flex items-center gap-2">
            <UiSkeleton width="80px" height="20px" rounded="full" />
            <UiSkeleton width="120px" height="16px" rounded="sm" />
          </div>
          <UiSkeleton width="90%" height="18px" rounded="sm" />
          <UiSkeleton width="70%" height="14px" rounded="sm" />
          <div class="pt-3 border-t border-zinc-900 space-y-2">
            <UiSkeleton width="50px" height="14px" rounded="sm" />
            <UiSkeleton width="85%" height="14px" rounded="sm" />
            <UiSkeleton width="60%" height="14px" rounded="sm" />
          </div>
        </UiCard>
      </div>

      <!-- ── Error State ── -->
      <UiCard
        v-else-if="answersError"
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
          <h3 class="text-sm font-semibold text-zinc-100">Unable to Load Answers</h3>
          <p class="text-xs text-zinc-400 max-w-sm mx-auto">
            We're having trouble loading answered questions right now. Please try again.
          </p>
        </div>
        <div class="pt-2 flex justify-center">
          <UiButton variant="outline" size="sm" class="text-xs" @click="refreshAnswers()">
            Try Again
          </UiButton>
        </div>
      </UiCard>

      <!-- ── Empty State ── -->
      <UiCard
        v-else-if="publicAnswers.length === 0"
        variant="default"
        padding="lg"
        class="text-center py-16 border-dashed border-zinc-800 bg-zinc-950/40 space-y-4"
      >
        <div class="w-14 h-14 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto text-zinc-500">
          <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </div>
        <div class="space-y-1">
          <h3 class="text-sm font-semibold text-zinc-200">No Answered Questions Yet</h3>
          <p class="text-xs text-zinc-400 max-w-sm mx-auto">
            Our pastoral team is reviewing submitted questions. Answers will appear here soon — be the first to ask!
          </p>
        </div>
        <UiButton variant="outline" size="sm" class="text-xs" @click="activeTab = 'ask'">
          Submit Your Question
        </UiButton>
      </UiCard>

      <!-- ── Q&A Cards Feed ── -->
      <div v-else class="space-y-5">
        <article
          v-for="(item, index) in publicAnswers"
          :key="item.id"
          class="group rounded-2xl border border-zinc-800/80 bg-zinc-950/90 overflow-hidden hover:border-zinc-700 transition-all duration-200"
        >
          <!-- Card Header: Index + Category + Date -->
          <div class="px-6 py-3 border-b border-zinc-900 bg-zinc-900/30 flex items-center justify-between gap-3 flex-wrap">
            <div class="flex items-center gap-2.5">
              <!-- Entry number pill -->
              <span class="font-pixel text-[10px] text-zinc-500 bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded">
                #{{ String(publicAnswers.length - index).padStart(3, '0') }}
              </span>

              <!-- Category badge -->
              <UiBadge
                v-if="item.category"
                :variant="categoryVariant(item.category)"
                size="sm"
              >
                {{ item.category }}
              </UiBadge>
              <UiBadge v-else variant="secondary" size="sm">
                General
              </UiBadge>
            </div>

            <!-- Answered date -->
            <span v-if="item.answeredAt" class="text-[11px] text-zinc-500 font-mono">
              {{ formatDate(item.answeredAt) }}
            </span>
          </div>

          <!-- Question Block -->
          <div class="px-6 pt-5 pb-4">
            <div class="flex items-start gap-3">
              <!-- Anonymous icon -->
              <div class="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center shrink-0 mt-0.5 text-zinc-400">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div class="flex-1 min-w-0">
                <span class="text-[10px] font-pixel text-zinc-500 uppercase tracking-wider block mb-1">Anonymous Question</span>
                <p class="text-sm sm:text-base text-zinc-100 font-sans leading-relaxed">
                  {{ item.question }}
                </p>
              </div>
            </div>
          </div>

          <!-- Divider with "Answer" label -->
          <div class="mx-6 flex items-center gap-3 py-1">
            <div class="flex-1 h-px bg-zinc-800" />
            <div class="flex items-center gap-1.5 text-[10px] font-pixel text-brand-yellow tracking-wider">
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              PASTORAL ANSWER
            </div>
            <div class="flex-1 h-px bg-zinc-800" />
          </div>

          <!-- Answer Block -->
          <div class="px-6 pb-6 pt-3">
            <div class="flex items-start gap-3">
              <!-- Pastoral icon -->
              <div class="w-8 h-8 rounded-full bg-brand-purple/20 border border-brand-purple/40 flex items-center justify-center shrink-0 mt-0.5 text-brand-purple-hover">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <div class="flex-1 min-w-0">
                <span class="text-[10px] font-pixel text-brand-purple-hover uppercase tracking-wider block mb-1">Arrow Gen Pastoral Team</span>
                <p class="text-sm text-zinc-300 font-sans leading-relaxed whitespace-pre-line">
                  {{ item.answer }}
                </p>
              </div>
            </div>
          </div>
        </article>

        <!-- Ask another CTA at bottom -->
        <div class="pt-4 text-center">
          <p class="text-xs text-zinc-500 mb-3">Have a question that hasn't been covered yet?</p>
          <UiButton variant="pixel" size="sm" class="text-xs" @click="activeTab = 'ask'">
            ASK YOUR QUESTION
          </UiButton>
        </div>
      </div>

    </section>

    <!-- ====================================================================
         4. BOTTOM CTA STRIP
         ==================================================================== -->
    <section class="border-t border-zinc-900 bg-zinc-950/60 py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto text-center space-y-4">
        <div class="flex items-center justify-center gap-2 text-zinc-500">
          <svg class="w-4 h-4 text-brand-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <span class="text-xs font-mono">PRIVACY COMMITMENT</span>
        </div>
        <p class="max-w-xl mx-auto text-xs text-zinc-400 leading-relaxed">
          Your identity is never stored, tracked, or shared. Questions are reviewed by our pastoral team only. Answers are published without any identifying information whatsoever.
        </p>
        <div class="flex flex-wrap items-center justify-center gap-3 pt-2">
          <UiButton variant="outline" size="sm" class="text-xs" @click="navigateTo('/')">
            Back to Home
          </UiButton>
          <UiButton variant="ghost" size="sm" class="text-xs" @click="navigateTo('/schedule')">
            View Service Schedule
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
  title: 'The Vault — Anonymous Questions & Pastoral Answers',
  ogTitle: 'The Vault — Anonymous Inquiries & Spiritual Answers',
  description: 'Submit honest, anonymous questions about faith, theology, relationships, and life to the Arrow Gen pastoral team. Browse answered questions from our community.',
  ogDescription: 'A secure, anonymous space to ask hard questions. Browse pastoral answers or submit your own — no identity required.',
  ogImage: '/logo-arrow.png',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: 'The Vault — Anonymous Questions | Arrow Gen',
  twitterDescription: 'Ask anonymously. Answered pastorally. No identity revealed.',
  twitterImage: '/logo-arrow.png'
})

useHead({
  htmlAttrs: { lang: 'en' }
})

// ─── Tab state ────────────────────────────────────────────────────────────────
const activeTab = ref<'ask' | 'answers'>('ask')

// ─── Types ────────────────────────────────────────────────────────────────────
interface PublicVaultItem {
  id: string
  question: string
  category: string | null
  answer: string | null
  answeredAt: string | null
}

interface PublicVaultResponse {
  success: boolean
  total: number
  data: PublicVaultItem[]
}

// ─── Fetch live answered questions (no auth required) ─────────────────────────
const {
  data: answersApiResponse,
  pending: answersPending,
  error: answersError,
  refresh: refreshAnswers
} = await useFetch<PublicVaultResponse>('/api/vault/public', {
  dedupe: 'cancel'
})

const publicAnswers = computed<PublicVaultItem[]>(
  () => answersApiResponse.value?.data ?? []
)

// ─── Form State ───────────────────────────────────────────────────────────────
type FormState = 'idle' | 'loading' | 'success' | 'error'

const submissionState = ref<FormState>('idle')
const questionText = ref('')
const selectedCategory = ref('')
const acknowledgement = ref(true)
const questionError = ref('')
const errorMessage = ref('')

// These must match ALLOWED_CATEGORIES in server/api/vault.post.ts
const categories = [
  'Faith & Doubts',
  'Relationships & Dating',
  'Mental Health & Anxiety',
  'Life Purpose & Calling',
  'Church & Community',
  'Bible Questions',
  'Other / General'
]

// ─── Form Actions ─────────────────────────────────────────────────────────────
const handleSubmit = async () => {
  questionError.value = ''
  errorMessage.value = ''

  const trimmed = questionText.value.trim()
  if (!trimmed) {
    questionError.value = 'Please provide your question before submitting.'
    submissionState.value = 'error'
    errorMessage.value = 'Your question cannot be empty.'
    return
  }

  if (trimmed.length < 10) {
    questionError.value = 'Please write at least 10 characters so we can understand your question.'
    submissionState.value = 'error'
    errorMessage.value = 'Question is too short (min. 10 characters).'
    return
  }

  submissionState.value = 'loading'

  try {
    await $fetch('/api/vault', {
      method: 'POST',
      body: {
        question: trimmed,
        category: selectedCategory.value || undefined
      }
    })

    questionText.value = ''
    selectedCategory.value = ''
    questionError.value = ''
    errorMessage.value = ''
    submissionState.value = 'success'
  } catch (err: unknown) {
    submissionState.value = 'error'
    const e = err as { data?: { message?: string }; statusMessage?: string; message?: string }
    errorMessage.value =
      e?.data?.message ||
      e?.statusMessage ||
      e?.message ||
      'Failed to deposit question into The Vault. Please try again.'
  }
}

const resetForm = () => {
  questionText.value = ''
  selectedCategory.value = ''
  questionError.value = ''
  errorMessage.value = ''
  submissionState.value = 'idle'
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
const formatDate = (iso: string | null): string => {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

type BadgeVariant = 'primary' | 'secondary' | 'accent' | 'pixel'

const categoryVariant = (category: string): BadgeVariant => {
  const map: Record<string, BadgeVariant> = {
    'Faith & Doubts': 'primary',
    'Relationships & Dating': 'accent',
    'Mental Health & Anxiety': 'secondary',
    'Life Purpose & Calling': 'pixel',
    'Church & Community': 'accent',
    'Bible Questions': 'primary',
    'Other / General': 'secondary'
  }
  return map[category] ?? 'secondary'
}
</script>
