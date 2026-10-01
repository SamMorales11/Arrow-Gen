<template>
  <div class="min-h-screen flex flex-col bg-background text-foreground overflow-x-hidden selection:bg-brand-yellow selection:text-black">

    <!-- ====================================================================
         1. HERO: THE ENCRYPTED SAFE HARBOR
         ==================================================================== -->
    <section class="relative px-4 sm:px-6 lg:px-8 pt-16 pb-20 sm:pt-24 sm:pb-24 border-b border-zinc-900 bg-retro-grid overflow-hidden">
      <!-- Glow ambient light (Dual Purple & Yellow) -->
      <div
        class="absolute -top-32 left-1/3 -translate-x-1/2 w-96 sm:w-[650px] h-96 sm:h-[650px] bg-brand-purple/20 rounded-full blur-[160px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        class="absolute bottom-4 right-10 w-72 sm:w-[450px] h-72 sm:h-[450px] bg-brand-yellow/10 rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true"
      />

      <div class="relative max-w-4xl mx-auto text-center space-y-6 z-10">
        
        <!-- Live Security Protocol Badge -->
        <div class="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-zinc-800 bg-zinc-950/90 backdrop-blur-md shadow-sm">
          <span class="relative flex h-2 w-2">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
          </span>
          <span class="font-pixel text-[9px] text-zinc-300 tracking-wider uppercase">
            VAULT PROTOCOL ACTIVE <span class="text-brand-yellow">• ZERO-TRACE SANCTUARY</span>
          </span>
        </div>

        <!-- Big Headline -->
        <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-50 font-sans leading-[1.1]">
          Ask What You Can't Say Out Loud. <br />
          <span class="relative inline-block text-brand-yellow">
            Zero Judgment.
            <svg class="absolute -bottom-2 left-0 w-full h-2 text-brand-purple/60" viewBox="0 0 100 8" preserveAspectRatio="none" aria-hidden="true">
              <path d="M0,5 Q50,0 100,5" stroke="currentColor" stroke-width="3" fill="none" />
            </svg>
          </span>
          100% Anonymous.
        </h1>

        <!-- Sharp, Human, Welcoming Copy -->
        <p class="max-w-2xl mx-auto text-base sm:text-lg text-zinc-300 font-sans leading-relaxed">
          Doubts about God? Messy relationships? Silent mental health battles? There are no forbidden or dumb questions in this community. Dropping an inquiry into The Vault leaves zero digital footprints.
        </p>

        <!-- The 3 Privacy Seals -->
        <div class="pt-2 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs text-zinc-400">
          <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900/90 border border-zinc-800">
            <span class="text-emerald-400 font-mono">✓</span> No Accounts or Login
          </span>
          <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900/90 border border-zinc-800">
            <span class="text-brand-yellow font-mono">✓</span> Zero IP or Device Tracking
          </span>
          <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900/90 border border-zinc-800">
            <span class="text-purple-400 font-mono">✓</span> Pastoral Team Only
          </span>
        </div>

        <!-- Section Navigation Switcher -->
        <div class="pt-4 flex items-center justify-center gap-3">
          <button
            type="button"
            :class="[
              'px-6 py-2.5 rounded-xl text-xs font-sans font-bold transition-all select-none border focus-visible:ring-2 focus-visible:ring-brand-yellow focus-visible:outline-none flex items-center gap-2',
              activeTab === 'ask'
                ? 'bg-brand-yellow text-black border-brand-yellow shadow-pixel-purple'
                : 'bg-zinc-950/80 text-zinc-300 border-zinc-800 hover:border-zinc-700 hover:text-white'
            ]"
            @click="activeTab = 'ask'"
          >
            <span class="font-pixel text-[9px]">↓</span>
            <span>Deposit a Question</span>
          </button>

          <button
            type="button"
            :class="[
              'px-6 py-2.5 rounded-xl text-xs font-sans font-bold transition-all select-none border focus-visible:ring-2 focus-visible:ring-brand-yellow focus-visible:outline-none flex items-center gap-2',
              activeTab === 'answers'
                ? 'bg-zinc-900 text-zinc-50 border-brand-purple shadow-pixel-yellow'
                : 'bg-zinc-950/80 text-zinc-400 border-zinc-800 hover:border-zinc-700 hover:text-white'
            ]"
            @click="activeTab = 'answers'"
          >
            <span class="font-pixel text-[9px]">★</span>
            <span>Browse Answers</span>
            <span class="text-[10px] px-1.5 py-0.2 rounded-full bg-zinc-800 text-zinc-300 font-mono">
              {{ displayedAnswers.length }}
            </span>
          </button>
        </div>

      </div>
    </section>

    <!-- ====================================================================
         2. TAB 1: DEPOSIT A QUESTION (THE VAULT CHAMBER)
         ==================================================================== -->
    <section v-if="activeTab === 'ask'" class="flex-1 max-w-3xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      
      <!-- SUCCESS STATE: THE VAULT LOCK CONFIRMATION -->
      <div
        v-if="submissionState === 'success'"
        class="relative rounded-2xl bg-zinc-950 border-2 border-brand-yellow p-8 sm:p-12 text-center space-y-6 shadow-2xl overflow-hidden animate-fade-in"
      >
        <!-- Pixel Corner Accents -->
        <span class="absolute top-0 left-0 w-3.5 h-3.5 border-t-2 border-l-2 border-brand-yellow pointer-events-none" aria-hidden="true" />
        <span class="absolute top-0 right-0 w-3.5 h-3.5 border-t-2 border-r-2 border-brand-yellow pointer-events-none" aria-hidden="true" />
        <span class="absolute bottom-0 left-0 w-3.5 h-3.5 border-b-2 border-l-2 border-brand-purple pointer-events-none" aria-hidden="true" />
        <span class="absolute bottom-0 right-0 w-3.5 h-3.5 border-b-2 border-r-2 border-brand-purple pointer-events-none" aria-hidden="true" />

        <div class="w-16 h-16 rounded-full bg-brand-yellow/15 border-2 border-brand-yellow flex items-center justify-center mx-auto text-brand-yellow text-2xl font-mono">
          ✓
        </div>

        <div class="space-y-3">
          <span class="font-pixel text-[9px] px-2.5 py-1 rounded bg-brand-yellow text-black font-semibold uppercase tracking-wider">
            DEPOSIT SECURED
          </span>
          <h2 class="text-2xl sm:text-3xl font-extrabold text-zinc-100 font-sans tracking-tight">
            Locked Inside The Vault
          </h2>
          <p class="text-sm text-zinc-300 max-w-lg mx-auto leading-relaxed">
            Thank you for being brave and open. Your question has been delivered directly to our pastoral team with all metadata scrubbed clean. When answered, it may be published to encourage others in the <strong class="text-zinc-100">Browse Answers</strong> tab.
          </p>
        </div>

        <div class="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            class="w-full sm:w-auto px-6 py-3 rounded-xl bg-brand-yellow text-black font-sans text-xs font-bold shadow-pixel-purple hover:bg-brand-yellow-hover active:translate-x-0.5 active:translate-y-0.5 transition-all"
            @click="resetForm"
          >
            DROP ANOTHER QUESTION
          </button>
          
          <button
            type="button"
            class="w-full sm:w-auto px-6 py-3 rounded-xl border border-zinc-700 bg-zinc-900 text-zinc-200 hover:text-white hover:border-zinc-500 font-sans text-xs font-medium transition-colors"
            @click="activeTab = 'answers'"
          >
            Explore Public Answers &rarr;
          </button>
        </div>
      </div>

      <!-- IDLE / FORM STATE -->
      <div
        v-else
        class="relative rounded-2xl bg-zinc-950/90 border border-zinc-800 p-6 sm:p-10 shadow-2xl space-y-8"
      >
        <!-- Pixel Corner Accents -->
        <span class="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-brand-yellow pointer-events-none" aria-hidden="true" />
        <span class="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-brand-yellow pointer-events-none" aria-hidden="true" />
        <span class="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-brand-purple pointer-events-none" aria-hidden="true" />
        <span class="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-brand-purple pointer-events-none" aria-hidden="true" />

        <!-- Form Top Header -->
        <div class="border-b border-zinc-800/80 pb-5 space-y-1.5">
          <div class="flex items-center justify-between">
            <h2 class="text-xl sm:text-2xl font-bold text-zinc-100 font-sans tracking-tight">
              Deposit Your Question
            </h2>
            <span class="font-pixel text-[9px] px-2 py-0.5 rounded bg-zinc-900 text-purple-300 border border-zinc-800">
              ENCRYPTED
            </span>
          </div>
          <p class="text-xs text-zinc-400 leading-relaxed">
            Take your time. No one is watching, judging, or tracking where this came from.
          </p>
        </div>

        <!-- Global Error Notification -->
        <div
          v-if="submissionState === 'error'"
          class="p-4 rounded-xl bg-rose-950/50 border border-rose-800/80 text-rose-200 text-xs flex items-start gap-3"
          role="alert"
        >
          <span class="font-mono text-base text-rose-400 mt-0.5">!</span>
          <div>
            <p class="font-semibold text-rose-100">Unable to Deposit Question</p>
            <p class="text-rose-300 text-[11px] mt-0.5">{{ errorMessage || 'Please verify the question length and try again.' }}</p>
          </div>
        </div>

        <form class="space-y-6" @submit.prevent="handleSubmit">
          
          <!-- Category Selector -->
          <div class="space-y-2">
            <label class="text-xs font-semibold text-zinc-200 select-none flex items-center justify-between">
              <span>Topic Category <span class="text-zinc-500 font-normal">(Optional)</span></span>
              <span class="text-[11px] text-zinc-500 font-mono">Helps direct to the right pastor</span>
            </label>

            <div class="flex flex-wrap gap-2" role="group" aria-label="Topic Categories">
              <button
                v-for="cat in categories"
                :key="cat"
                type="button"
                :aria-pressed="selectedCategory === cat"
                :class="[
                  'px-3 py-1.5 rounded-lg text-xs font-sans transition-all border select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow',
                  selectedCategory === cat
                    ? 'bg-brand-purple/25 border-brand-purple text-purple-200 font-bold shadow-sm'
                    : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700'
                ]"
                @click="selectedCategory = selectedCategory === cat ? '' : cat"
              >
                {{ cat }}
              </button>
            </div>
          </div>

          <!-- Main Question Input -->
          <div class="space-y-1.5">
            <div class="flex items-center justify-between">
              <label for="vault-question-input" class="text-xs font-semibold text-zinc-200">
                Your Question or Thought <span class="text-rose-400">*</span>
              </label>
              <span class="text-[10px] text-zinc-500 font-mono">
                {{ questionText.length }} / 2000 chars (min. 10)
              </span>
            </div>

            <textarea
              id="vault-question-input"
              v-model="questionText"
              rows="6"
              required
              :disabled="submissionState === 'loading'"
              placeholder="What's been keeping you awake? What doubt or life question feels too risky to ask out loud? Speak your mind here..."
              class="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-brand-yellow leading-relaxed resize-y disabled:opacity-50"
            />

            <p v-if="questionError" class="text-xs text-rose-400 font-medium">
              {{ questionError }}
            </p>
          </div>

          <!-- Optional Context Field -->
          <div class="space-y-1.5">
            <button
              type="button"
              class="text-xs text-zinc-400 hover:text-zinc-200 transition-colors flex items-center gap-1.5 select-none"
              @click="showContextField = !showContextField"
            >
              <span class="font-pixel text-[9px] text-brand-yellow">{{ showContextField ? '▼' : '▶' }}</span>
              <span>{{ showContextField ? 'Hide Additional Context' : '+ Add Background Context (Optional)' }}</span>
            </button>

            <div v-if="showContextField" class="pt-1">
              <textarea
                v-model="contextText"
                rows="3"
                placeholder="Any personal backstory or specific context you want the pastoral team to know..."
                class="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-brand-yellow leading-relaxed resize-y"
              />
            </div>
          </div>

          <!-- Anonymity Confirmation -->
          <div class="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 flex items-start gap-3">
            <input
              id="confirm-anon"
              v-model="acknowledgement"
              type="checkbox"
              class="mt-1 w-4 h-4 rounded border-zinc-700 bg-zinc-800 text-brand-purple focus:ring-brand-yellow"
            />
            <label for="confirm-anon" class="text-xs text-zinc-400 cursor-pointer select-none leading-relaxed">
              I understand this inquiry is completely anonymous. It will be reviewed by our pastoral team with genuine care, and may be published publicly to support others wrestling with similar questions.
            </label>
          </div>

          <!-- Submit Button -->
          <div class="pt-4 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div class="text-[11px] text-zinc-500 font-mono flex items-center gap-2">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>TLS 256-BIT ENCRYPTION AT REST</span>
            </div>

            <button
              type="submit"
              :disabled="submissionState === 'loading' || !acknowledgement"
              class="w-full sm:w-auto py-3 px-6 rounded-xl bg-brand-yellow text-black font-sans text-xs font-bold shadow-pixel-purple hover:bg-brand-yellow-hover active:translate-x-0.5 active:translate-y-0.5 disabled:opacity-50 disabled:pointer-events-none transition-all flex items-center justify-center gap-2"
            >
              <span>{{ submissionState === 'loading' ? 'ENCRYPTING & DEPOSITING...' : 'DEPOSIT INTO THE VAULT' }}</span>
              <span class="font-pixel text-[10px]" aria-hidden="true">&rarr;</span>
            </button>
          </div>

        </form>
      </div>

    </section>

    <!-- ====================================================================
         3. TAB 2: PUBLIC ARCHIVE (ANSWERED QUESTIONS)
         ==================================================================== -->
    <section v-else class="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-8">
      
      <!-- Top Archive Bar: Search & Category Filter -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800/80 pb-6">
        
        <div class="space-y-1">
          <div class="flex items-center gap-2">
            <span class="font-pixel text-[9px] text-brand-yellow uppercase tracking-wider">
              PUBLIC WISDOM ARCHIVE
            </span>
            <span class="text-xs px-2 py-0.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 font-mono">
              {{ displayedAnswers.length }} Answered
            </span>
          </div>
          <h2 class="text-2xl sm:text-3xl font-bold text-zinc-100 font-sans tracking-tight">
            Pastoral Responses
          </h2>
        </div>

        <!-- Search Input -->
        <div class="w-full md:w-72">
          <div class="relative">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search by topic or keyword..."
              class="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2 text-xs text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-brand-yellow"
            />
            <span v-if="searchQuery" class="absolute right-3 top-2.5 text-xs text-zinc-500 cursor-pointer" @click="searchQuery = ''">
              ✕
            </span>
          </div>
        </div>

      </div>

      <!-- Filter Category Badges -->
      <div class="flex flex-wrap items-center gap-2">
        <button
          type="button"
          :class="[
            'px-3 py-1 rounded-lg text-xs font-sans transition-all border select-none',
            archiveCategoryFilter === 'ALL'
              ? 'bg-zinc-900 border-brand-yellow text-zinc-100 font-bold shadow-sm'
              : 'bg-zinc-950/80 border-zinc-800 text-zinc-400 hover:text-zinc-200'
          ]"
          @click="archiveCategoryFilter = 'ALL'"
        >
          All Topics
        </button>

        <button
          v-for="cat in availableCategoriesInArchive"
          :key="cat"
          type="button"
          :class="[
            'px-3 py-1 rounded-lg text-xs font-sans transition-all border select-none',
            archiveCategoryFilter === cat
              ? 'bg-brand-purple/20 border-brand-purple text-purple-200 font-bold'
              : 'bg-zinc-950/80 border-zinc-800 text-zinc-400 hover:text-zinc-200'
          ]"
          @click="archiveCategoryFilter = cat"
        >
          {{ cat }}
        </button>
      </div>

      <!-- ── Loading Skeleton ── -->
      <div v-if="answersPending" class="space-y-6">
        <div v-for="i in 3" :key="i" class="p-6 rounded-2xl border border-zinc-800/80 bg-zinc-950/60 space-y-4">
          <UiSkeleton width="80px" height="18px" rounded="sm" />
          <UiSkeleton width="85%" height="24px" rounded="md" />
          <UiSkeleton width="100%" height="60px" rounded="sm" />
        </div>
      </div>

      <!-- ── Empty State ── -->
      <div
        v-else-if="displayedAnswers.length === 0"
        class="text-center py-16 border-dashed border-2 border-zinc-800 rounded-2xl bg-zinc-950/40 p-8 space-y-4"
      >
        <div class="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto text-zinc-500 font-pixel text-xs">
          00
        </div>
        <div class="space-y-1">
          <h3 class="text-base font-bold text-zinc-200 font-sans">No Matching Vault Answers</h3>
          <p class="text-xs text-zinc-400 max-w-sm mx-auto">
            Try adjusting your search query or category filter. Or be the first to ask!
          </p>
        </div>
        <button
          type="button"
          class="px-4 py-2 rounded-xl bg-brand-yellow text-black font-sans text-xs font-bold shadow-sm"
          @click="activeTab = 'ask'"
        >
          Deposit a Question
        </button>
      </div>

      <!-- ── Answer Cards Feed ── -->
      <div v-else class="space-y-6">
        <article
          v-for="(item, idx) in displayedAnswers"
          :key="item.id"
          class="vault-card group relative rounded-2xl bg-zinc-950 border border-zinc-800 hover:border-zinc-700 p-6 sm:p-8 space-y-6 transition-all duration-200 shadow-xl"
        >
          <!-- Pixel Corner Brackets -->
          <span class="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 border-brand-purple opacity-40 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
          <span class="absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2 border-brand-yellow opacity-40 group-hover:opacity-100 transition-opacity" aria-hidden="true" />

          <!-- Card Header: Category + Index -->
          <div class="flex items-center justify-between border-b border-zinc-900 pb-4">
            <div class="flex items-center gap-2.5">
              <span class="font-pixel text-[9px] text-zinc-500 bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded">
                #{{ String(displayedAnswers.length - idx).padStart(3, '0') }}
              </span>

              <span :class="['text-[11px] font-medium px-2.5 py-0.5 rounded-full border', getCategoryBadgeStyle(item.category)]">
                {{ item.category || 'General Inquiry' }}
              </span>
            </div>

            <span v-if="item.answeredAt" class="text-[11px] text-zinc-500 font-mono">
              {{ formatDate(item.answeredAt) }}
            </span>
          </div>

          <!-- The Question Block -->
          <div class="space-y-2">
            <span class="font-pixel text-[9px] text-brand-yellow uppercase tracking-wider block">
              ANONYMOUS INQUIRY
            </span>
            <p class="text-lg sm:text-xl font-bold text-zinc-100 font-sans tracking-tight leading-snug">
              "{{ item.question }}"
            </p>
          </div>

          <!-- The Pastoral Answer Block -->
          <div class="p-5 sm:p-6 rounded-xl bg-zinc-900/70 border border-zinc-800/90 space-y-3">
            <div class="flex items-center justify-between">
              <span class="font-pixel text-[9px] text-purple-300 uppercase tracking-wider flex items-center gap-1.5">
                <span class="text-brand-yellow">✦</span> PASTORAL RESPONSE
              </span>
              <span class="text-[10px] text-zinc-500 font-mono">Arrow Gen Team</span>
            </div>

            <p class="text-sm text-zinc-300 font-sans leading-relaxed whitespace-pre-line">
              {{ item.answer }}
            </p>
          </div>

          <!-- Micro Card Footer: Copy Insight -->
          <div class="flex items-center justify-between text-xs text-zinc-500 pt-1">
            <span class="text-[11px] text-zinc-600 font-mono">Identity Protected</span>
            <button
              type="button"
              class="text-zinc-400 hover:text-brand-yellow transition-colors flex items-center gap-1 font-sans text-xs"
              @click="copyInsight(item)"
            >
              <span>{{ copiedId === item.id ? '✓ Copied' : 'Share Wisdom' }}</span>
            </button>
          </div>

        </article>

        <!-- Bottom Ask Prompt -->
        <div class="pt-6 text-center space-y-3">
          <p class="text-xs text-zinc-400">
            Have a question on your heart that hasn't been addressed?
          </p>
          <button
            type="button"
            class="px-6 py-2.5 rounded-xl bg-brand-yellow text-black font-sans text-xs font-bold shadow-pixel-purple hover:bg-brand-yellow-hover transition-all"
            @click="activeTab = 'ask'"
          >
            Deposit Your Anonymous Question &rarr;
          </button>
        </div>

      </div>

    </section>

    <!-- ====================================================================
         4. CRISIS & DIRECT CARE SAFETY NET
         ==================================================================== -->
    <section class="border-t border-zinc-900 bg-zinc-950/70 py-16 px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto text-center space-y-6">
        
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs text-zinc-400">
          <span class="w-2 h-2 rounded-full bg-rose-400" />
          <span>URGENT CARE LINE</span>
        </div>

        <h3 class="text-2xl sm:text-3xl font-bold text-zinc-100 font-sans tracking-tight">
          In Acute Pain or Need Someone to Talk to Right Now?
        </h3>

        <p class="max-w-xl mx-auto text-sm text-zinc-400 leading-relaxed">
          The Vault is designed for thoughtful, asynchronous reflection. If you are facing an urgent crisis, deep grief, or need direct pastoral prayer right this minute, please reach out to us directly on WhatsApp. We are here for you.
        </p>

        <div class="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            type="button"
            class="px-5 py-2.5 rounded-xl bg-zinc-900 border border-brand-purple/60 hover:border-brand-purple text-purple-200 text-xs font-bold transition-all flex items-center gap-2"
            @click="openDirectCareWhatsApp"
          >
            <span>💬 Chat Confidentially on WhatsApp</span>
          </button>
          
          <NuxtLink
            to="/connect"
            class="px-5 py-2.5 rounded-xl border border-zinc-800 bg-zinc-950 text-zinc-400 hover:text-white text-xs font-medium transition-colors"
          >
            Pastoral Care Details &rarr;
          </NuxtLink>
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
  title: 'The Vault — Anonymous Questions & Pastoral Answers | Arrow Gen',
  ogTitle: 'The Vault — Anonymous Questions & Pastoral Answers',
  description: 'A secure, anonymous space to ask hard questions about faith, mental health, relationships, and culture. No identity required, answered with care.',
  ogDescription: 'Ask what you cannot say out loud. Zero judgment, 100% anonymous, direct pastoral care.',
  ogImage: '/logo-arrow.png',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: 'The Vault — Anonymous Questions | Arrow Gen',
  twitterDescription: 'Ask what you cannot say out loud. 100% anonymous.',
  twitterImage: '/logo-arrow.png'
})

useHead({
  htmlAttrs: { lang: 'en' }
})

// ─── Active Tab ───────────────────────────────────────────────────────────────
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

// ─── Fetch live answered questions ────────────────────────────────────────────
const {
  data: answersApiResponse,
  pending: answersPending,
  error: answersError,
  refresh: refreshAnswers
} = await useFetch<PublicVaultResponse>('/api/vault/public', {
  dedupe: 'cancel'
})

// Curated fallback entries if the database has not yet been populated
const defaultAnswers: PublicVaultItem[] = [
  {
    id: 'vault-qa-1',
    category: 'Mental Health & Anxiety',
    question: "Is it a sin or lack of faith if I'm a follower of Jesus but struggle with anxiety and panic attacks?",
    answer: "Not at all. Your anxiety is never a measure of your salvation or a defect in your spiritual devotion. Elijah sat under a broom tree wishing for his life to end; David cried out with overwhelming dread throughout the Psalms; and Jesus wept in deep anguish in Gethsemane.\n\nArrow Gen sees mental health as part of holistic human stewardship. You are completely safe to seek therapy, medical care, and prayer simultaneously.",
    answeredAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'vault-qa-2',
    category: 'Faith & Doubts',
    question: 'How do I keep believing when God feels completely silent during the hardest season of my life?',
    answer: "Silence from God is not the same as absence from God. In quiet seasons, faith matures from being fueled by emotional highs to being anchored in covenant promises.\n\nBring your honest frustration and grief to Him — God is not fragile, and scripture is full of people who wrestled with Him. Take it one day at a time.",
    answeredAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'vault-qa-3',
    category: 'Relationships & Dating',
    question: "How do I set boundaries with close friends who constantly pull me back into habits I'm trying to leave behind?",
    answer: "Boundaries are not walls of hatred; they are fences of self-respect and spiritual clarity. You can love someone deeply without allowing them to steer your decisions.\n\nHave an honest, gentle conversation: 'I love you, but I am in a season where I need to protect my peace.' True friends will respect your journey.",
    answeredAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'vault-qa-4',
    category: 'Life Purpose & Calling',
    question: "I'm in my early 20s and have zero clue what my 'calling' is. Am I falling behind everyone else?",
    answer: "You are not falling behind. Calling is rarely a single lightning-bolt career title; it is faithfulness in whatever room you currently stand in.\n\nBe faithful with what is in your hands today: love the people around you, serve your campus or workplace with integrity, and remember that God directs steps in motion, not parked cars.",
    answeredAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString()
  }
]

const publicAnswers = computed<PublicVaultItem[]>(() => {
  const dbData = answersApiResponse.value?.data
  if (dbData && dbData.length > 0) {
    return dbData
  }
  return defaultAnswers
})

// ─── Filter & Search in Archive ───────────────────────────────────────────────
const searchQuery = ref('')
const archiveCategoryFilter = ref('ALL')

const availableCategoriesInArchive = computed(() => {
  const set = new Set<string>()
  publicAnswers.value.forEach(item => {
    if (item.category) set.add(item.category)
  })
  return Array.from(set)
})

const displayedAnswers = computed(() => {
  let list = publicAnswers.value

  if (archiveCategoryFilter.value !== 'ALL') {
    list = list.filter(item => item.category === archiveCategoryFilter.value)
  }

  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase().trim()
    list = list.filter(item =>
      item.question.toLowerCase().includes(q) ||
      (item.answer && item.answer.toLowerCase().includes(q)) ||
      (item.category && item.category.toLowerCase().includes(q))
    )
  }

  return list
})

// ─── Form State ───────────────────────────────────────────────────────────────
type FormState = 'idle' | 'loading' | 'success' | 'error'

const submissionState = ref<FormState>('idle')
const questionText = ref('')
const contextText = ref('')
const showContextField = ref(false)
const selectedCategory = ref('')
const acknowledgement = ref(true)
const questionError = ref('')
const errorMessage = ref('')

const categories = [
  'Faith & Doubts',
  'Relationships & Dating',
  'Mental Health & Anxiety',
  'Life Purpose & Calling',
  'Church & Community',
  'Bible Questions',
  'Other / General'
]

// ─── Form Submission ──────────────────────────────────────────────────────────
const handleSubmit = async () => {
  questionError.value = ''
  errorMessage.value = ''

  const trimmed = questionText.value.trim()
  if (!trimmed) {
    questionError.value = 'Please write your question before depositing.'
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
        category: selectedCategory.value || undefined,
        context: contextText.value.trim() || undefined
      }
    })

    questionText.value = ''
    contextText.value = ''
    showContextField.value = false
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
  contextText.value = ''
  showContextField.value = false
  selectedCategory.value = ''
  questionError.value = ''
  errorMessage.value = ''
  submissionState.value = 'idle'
}

// ─── Copy Insight Utility ─────────────────────────────────────────────────────
const copiedId = ref('')

const copyInsight = async (item: PublicVaultItem) => {
  try {
    const textToCopy = `"${item.question}"\n\nArrow Gen Pastoral Team: ${item.answer}\n\nVia The Vault: https://arrowgen.org/vault`
    await navigator.clipboard.writeText(textToCopy)
    copiedId.value = item.id
    setTimeout(() => {
      copiedId.value = ''
    }, 2500)
  } catch {
    copiedId.value = item.id
  }
}

// ─── WhatsApp Pastoral Line ───────────────────────────────────────────────────
const config = useRuntimeConfig()
const DEFAULT_WHATSAPP = '6281234567890'
const whatsappNumber = (config.public?.whatsappNumber as string) || DEFAULT_WHATSAPP

const openDirectCareWhatsApp = () => {
  const cleanNumber = whatsappNumber.replace(/\D/g, '')
  const msg = 'Hi Arrow Gen Pastoral Team, I need someone to talk to confidentially about a personal situation.'
  const url = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(msg)}`
  window.open(url, '_blank', 'noopener,noreferrer')
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

const getCategoryBadgeStyle = (category: string | null): string => {
  if (!category) return 'bg-zinc-900 border-zinc-800 text-zinc-400'
  const map: Record<string, string> = {
    'Faith & Doubts': 'bg-brand-purple/20 border-brand-purple/40 text-purple-200',
    'Relationships & Dating': 'bg-brand-yellow/15 border-brand-yellow/30 text-amber-300',
    'Mental Health & Anxiety': 'bg-rose-950/40 border-rose-800/40 text-rose-300',
    'Life Purpose & Calling': 'bg-emerald-950/40 border-emerald-800/40 text-emerald-300',
    'Church & Community': 'bg-cyan-950/40 border-cyan-800/40 text-cyan-300',
    'Bible Questions': 'bg-indigo-950/40 border-indigo-800/40 text-indigo-300',
    'Other / General': 'bg-zinc-900 border-zinc-800 text-zinc-400'
  }
  return map[category] || 'bg-zinc-900 border-zinc-800 text-zinc-400'
}
</script>

<style scoped>
.vault-card {
  transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1),
              border-color 0.2s cubic-bezier(0.16, 1, 0.3, 1),
              box-shadow 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.3s ease-out forwards;
}
</style>
