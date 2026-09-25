<template>
  <div class="min-h-screen flex flex-col bg-background text-foreground">

    <!-- ====================================================================
         1. HERO HEADER BANNER
         ==================================================================== -->
    <section class="relative px-4 sm:px-6 lg:px-8 py-16 sm:py-24 bg-retro-grid border-b border-zinc-900 overflow-hidden">
      <!-- Glow ambient light -->
      <div
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 sm:w-[550px] h-96 sm:h-[550px] bg-brand-purple/15 rounded-full blur-[140px] pointer-events-none"
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
          <span>100% Anonymous • Read strictly by pastoral &amp; leadership internal team</span>
        </div>
      </div>
    </section>

    <!-- ====================================================================
         2. FORM SECTION
         ==================================================================== -->
    <section class="flex-1 max-w-3xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      
      <!-- SUCCESS STATE -->
      <UiCard
        v-if="submissionState === 'success'"
        variant="pixel"
        padding="lg"
        class="text-center space-y-6 animate-fade-in"
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
            Thank you for being brave and open. Your question has been delivered to our internal leadership team without any identifying metadata. Keep an eye out during our upcoming weekend Q&amp;A sessions and message series.
          </p>
        </div>

        <div class="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <UiButton
            variant="pixel"
            size="md"
            @click="resetForm"
          >
            SUBMIT ANOTHER QUESTION
          </UiButton>
          <UiButton
            variant="outline"
            size="md"
            @click="navigateTo('/')"
          >
            Return to Home
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
              Vault Form v1.0
            </UiBadge>
          </div>
          <p class="text-xs text-zinc-400">
            All submissions are strictly confidential and encrypted at rest.
          </p>
        </div>

        <!-- Global Error Alert (if error state) -->
        <div
          v-if="submissionState === 'error'"
          class="p-4 rounded-xl bg-rose-950/50 border border-rose-800/80 text-rose-200 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-fade-in"
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
            hint="Min. 10 characters • Markdown or plain text"
            :error="questionError"
            :disabled="submissionState === 'loading'"
            required
            rows="6"
          />

          <!-- Optional Context Field -->
          <UiInput
            v-model="contextText"
            type="text"
            label="Background Context"
            placeholder="e.g. In campus, workplace, with family, or reading scripture..."
            hint="Optional background to give more nuance to your question"
            :disabled="submissionState === 'loading'"
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
              I understand that this question is submitted anonymously and will be reviewed solely by the internal pastoral team for ministry guidance.
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
         3. RECENT VAULT THEMES (INSPIRATION)
         ==================================================================== -->
    <section class="border-t border-zinc-900 bg-zinc-950/60 py-16 px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto space-y-8">
        <div class="text-center space-y-2">
          <span class="font-pixel text-[11px] text-brand-yellow">PAST DISCUSSIONS</span>
          <h3 class="text-2xl font-bold text-zinc-100 font-sans">
            Recently Explored in The Vault
          </h3>
          <p class="text-xs sm:text-sm text-zinc-400">
            Real topics that were submitted anonymously and unpacked during our Saturday youth collective.
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div class="p-4 rounded-lg bg-zinc-900/60 border border-zinc-800 space-y-2">
            <UiBadge variant="primary" size="sm">Theology</UiBadge>
            <h4 class="text-sm font-semibold text-zinc-200">"Why does God allow suffering in our generation?"</h4>
            <p class="text-xs text-zinc-400">Addressed on Saturday Youth Encounter Series, Ep. 14.</p>
          </div>

          <div class="p-4 rounded-lg bg-zinc-900/60 border border-zinc-800 space-y-2">
            <UiBadge variant="accent" size="sm">Relationships</UiBadge>
            <h4 class="text-sm font-semibold text-zinc-200">"Navigating boundaries &amp; dating in a modern digital culture."</h4>
            <p class="text-xs text-zinc-400">Addressed during Young Adult Breakout Session.</p>
          </div>

          <div class="p-4 rounded-lg bg-zinc-900/60 border border-zinc-800 space-y-2">
            <UiBadge variant="secondary" size="sm">Career &amp; Purpose</UiBadge>
            <h4 class="text-sm font-semibold text-zinc-200">"How do I know if my career choice aligns with God's will?"</h4>
            <p class="text-xs text-zinc-400">Addressed during Campus &amp; Creative Lab.</p>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Terapkan Layout Default Publik
definePageMeta({
  layout: 'default'
})

// Head SEO & Open Graph Meta Tags
useSeoMeta({
  title: 'The Vault — Anonymous Questions & Pastoral Guidance',
  ogTitle: 'The Vault — Anonymous Inquiries & Spiritual Answers',
  description: 'Submit honest, anonymous questions about faith, theology, relationships, doubts, and life to the Arrow Gen pastoral and leadership team in a confidential safe haven.',
  ogDescription: 'A secure, anonymous space to ask hard questions without fear or judgment. Pastoral guidance for youth & young adults.',
  ogImage: '/logo-arrow.png',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: 'The Vault — Anonymous Questions | Arrow Gen',
  twitterDescription: 'Submit honest, anonymous questions to Arrow Gen pastoral team in a safe, confidential environment.',
  twitterImage: '/logo-arrow.png'
})

useHead({
  htmlAttrs: { lang: 'en' }
})

// Form State
type FormState = 'idle' | 'loading' | 'success' | 'error'

const submissionState = ref<FormState>('idle')
const questionText = ref('')
const contextText = ref('')
const selectedCategory = ref('')
const acknowledgement = ref(true)

const questionError = ref('')
const errorMessage = ref('')

const categories = [
  'Faith & Theology',
  'Relationships & Dating',
  'Mental Health & Identity',
  'Career & Purpose',
  'Doubts & Questions',
  'Other / General'
]

// Frontend Validation & Submission
const handleSubmit = async () => {
  // Reset errors
  questionError.value = ''
  errorMessage.value = ''

  // Validate Question
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

  // Set loading state
  submissionState.value = 'loading'

  try {
    await $fetch('/api/vault', {
      method: 'POST',
      body: {
        question: trimmed,
        category: selectedCategory.value || undefined,
        context: contextText.value.trim() || undefined
      }
    })

    // Reset inputs upon successful submission
    questionText.value = ''
    contextText.value = ''
    selectedCategory.value = ''
    questionError.value = ''
    errorMessage.value = ''

    // Set success state
    submissionState.value = 'success'
  } catch (err: any) {
    submissionState.value = 'error'
    const serverMsg =
      err?.data?.message ||
      err?.statusMessage ||
      err?.message ||
      'Failed to deposit question into The Vault. Please try again.'
    errorMessage.value = serverMsg
  }
}

// Reset Form to Submit Again
const resetForm = () => {
  questionText.value = ''
  contextText.value = ''
  selectedCategory.value = ''
  questionError.value = ''
  errorMessage.value = ''
  submissionState.value = 'idle'
}
</script>
