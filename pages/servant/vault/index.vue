<template>
  <div class="space-y-8">
    <!-- Toast Notification Banner -->
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div
        v-if="toastMessage"
        :class="[
          'p-3.5 rounded-xl border flex items-center justify-between gap-3 text-xs shadow-lg transition-all',
          toastType === 'success'
            ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-200'
            : 'bg-rose-950/80 border-rose-500/50 text-rose-200'
        ]"
      >
        <div class="flex items-center gap-2">
          <span v-if="toastType === 'success'" class="text-emerald-400 font-bold">✓</span>
          <span v-else class="text-rose-400 font-bold">✕</span>
          <span>{{ toastMessage }}</span>
        </div>
        <button
          type="button"
          class="text-zinc-400 hover:text-white p-1 text-sm leading-none"
          @click="toastMessage = ''"
        >
          &times;
        </button>
      </div>
    </transition>

    <!-- 1. Header Section -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-zinc-800 pb-6">
      <div class="space-y-1">
        <div class="flex items-center gap-2">
          <h1 class="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100 font-sans">
            The Vault Questions
          </h1>
          <UiBadge variant="accent" size="sm">
            MINISTRY CARE
          </UiBadge>
        </div>
        <p class="text-xs sm:text-sm text-zinc-400">
          Explore anonymous youth questions for pre-service prayer, spiritual counseling readiness, and pastoral support.
        </p>
      </div>

      <div class="flex items-center gap-2.5">
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

        <NuxtLink to="/servant">
          <UiButton variant="secondary" size="sm" class="text-xs">
            &larr; Servant Hub
          </UiButton>
        </NuxtLink>
      </div>
    </div>

    <!-- 2. Statistics Summary Cards -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      <UiCard variant="default" padding="sm" class="bg-zinc-950/80 border-zinc-800/80">
        <p class="text-[10px] font-pixel text-zinc-400 uppercase tracking-wider">ALL SUBMISSIONS</p>
        <div class="flex items-baseline justify-between mt-1">
          <span class="text-2xl sm:text-3xl font-bold text-zinc-100">{{ stats.total }}</span>
          <UiBadge variant="outline" size="sm">The Vault</UiBadge>
        </div>
      </UiCard>

      <UiCard variant="default" padding="sm" class="bg-zinc-950/80 border-zinc-800/80">
        <p class="text-[10px] font-pixel text-brand-yellow uppercase tracking-wider">PRAYER TARGETS</p>
        <div class="flex items-baseline justify-between mt-1">
          <span class="text-2xl sm:text-3xl font-bold text-amber-300">{{ stats.pending }}</span>
          <UiBadge variant="accent" size="sm" dot>Unanswered</UiBadge>
        </div>
      </UiCard>

      <UiCard variant="default" padding="sm" class="bg-zinc-950/80 border-zinc-800/80">
        <p class="text-[10px] font-pixel text-emerald-400 uppercase tracking-wider">ANSWERED</p>
        <div class="flex items-baseline justify-between mt-1">
          <span class="text-2xl sm:text-3xl font-bold text-emerald-400">{{ stats.answered }}</span>
          <UiBadge variant="success" size="sm">Pastoral Ready</UiBadge>
        </div>
      </UiCard>

      <UiCard variant="default" padding="sm" class="bg-zinc-950/80 border-zinc-800/80">
        <p class="text-[10px] font-pixel text-zinc-500 uppercase tracking-wider">ARCHIVED / REJECTED</p>
        <div class="flex items-baseline justify-between mt-1">
          <span class="text-2xl sm:text-3xl font-bold text-zinc-400">{{ stats.rejected }}</span>
          <UiBadge variant="secondary" size="sm">Filtered</UiBadge>
        </div>
      </UiCard>
    </div>

    <!-- 3. Filter & Search Toolbar -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
      <!-- Status Tabs Filter -->
      <div class="flex flex-wrap items-center gap-1.5 p-1 bg-zinc-950 rounded-lg border border-zinc-800/80" role="tablist" aria-label="Inquiry status filters">
        <button
          v-for="tab in statusTabs"
          :key="tab.value"
          type="button"
          role="tab"
          :aria-selected="activeStatus === tab.value"
          :class="[
            'px-3 py-1.5 rounded-md text-xs font-medium transition-colors flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow',
            activeStatus === tab.value
              ? 'bg-brand-purple text-white shadow-sm font-semibold'
              : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
          ]"
          @click="activeStatus = tab.value"
        >
          <span>{{ tab.label }}</span>
          <span
            :class="[
              'px-1.5 py-0.2 rounded-full text-[10px]',
              activeStatus === tab.value ? 'bg-purple-900/80 text-white' : 'bg-zinc-800 text-zinc-400'
            ]"
          >
            {{ tab.count }}
          </span>
        </button>
      </div>

      <!-- Search Input -->
      <div class="w-full md:w-72">
        <div class="relative">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search questions or topics..."
            class="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3.5 py-2 pl-9 text-xs text-zinc-200 placeholder:text-zinc-500 focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition-colors"
          />
          <svg
            class="w-4 h-4 text-zinc-500 absolute left-3 top-2.5 pointer-events-none"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>
    </div>

    <!-- 4. Loading State (Structured Skeleton Cards) -->
    <div v-if="pending && !vaultQuestionsList.length" class="space-y-4">
      <UiCard
        v-for="i in 3"
        :key="i"
        variant="default"
        padding="md"
        class="border-zinc-800/80 bg-zinc-950/80 space-y-3"
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <UiSkeleton width="80px" height="20px" rounded="full" />
            <UiSkeleton width="60px" height="20px" rounded="md" />
          </div>
          <UiSkeleton width="90px" height="16px" rounded="sm" />
        </div>
        <UiSkeleton width="90%" height="18px" rounded="sm" class="mt-1" />
        <UiSkeleton width="65%" height="18px" rounded="sm" />
        <div class="pt-2 border-t border-zinc-900 flex items-center justify-between">
          <UiSkeleton width="120px" height="14px" rounded="sm" />
          <UiSkeleton width="100px" height="28px" rounded="md" />
        </div>
      </UiCard>
    </div>

    <!-- 5. Error State -->
    <UiCard
      v-else-if="error"
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
        <h3 class="text-sm font-semibold text-zinc-100">Unable to Retrieve Vault Inquiries</h3>
        <p class="text-xs text-zinc-400 max-w-sm mx-auto">
          {{ fetchErrorMessage }}
        </p>
      </div>
      <div class="pt-2 flex justify-center gap-3">
        <UiButton
          variant="outline"
          size="sm"
          class="text-xs border-zinc-700"
          @click="refreshData"
        >
          <template #leading>
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </template>
          Try Again
        </UiButton>
      </div>
    </UiCard>

    <!-- 6. Empty State -->
    <UiCard
      v-else-if="filteredQuestions.length === 0"
      variant="default"
      padding="lg"
      class="text-center py-14 border-dashed border-zinc-800 bg-zinc-950/40"
    >
      <div class="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto text-zinc-500 mb-3">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      </div>
      <h3 class="text-sm font-semibold text-zinc-200">
        {{ searchQuery || activeStatus !== 'all' ? 'No Matching Inquiries Found' : 'The Vault is Currently Clear' }}
      </h3>
      <p class="text-xs text-zinc-500 mt-1 max-w-sm mx-auto">
        {{ searchQuery || activeStatus !== 'all'
          ? 'No anonymous questions match your search filter.'
          : 'No questions have been logged in The Vault yet. Share the anonymous link with youth members!' }}
      </p>
      <div class="mt-4 flex items-center justify-center gap-2.5">
        <UiButton
          v-if="searchQuery || activeStatus !== 'all'"
          variant="outline"
          size="sm"
          class="text-xs"
          @click="resetFilters"
        >
          Clear Filters
        </UiButton>
        <NuxtLink v-else to="/vault" target="_blank">
          <UiButton variant="pixel" size="sm" class="text-xs">
            Open Public Form &rarr;
          </UiButton>
        </NuxtLink>
      </div>
    </UiCard>

    <!-- 6. Questions List -->
    <div v-else class="space-y-4">
      <UiCard
        v-for="item in filteredQuestions"
        :key="item.id"
        variant="default"
        padding="md"
        class="border-zinc-800/90 bg-zinc-950/90 hover:border-zinc-700/80 transition-colors space-y-4"
      >
        <!-- Card Header Info -->
        <div class="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-900 pb-3">
          <div class="flex flex-wrap items-center gap-2">
            <!-- Category Tag -->
            <UiBadge variant="primary" size="sm">
              {{ item.category || 'General Inquiries' }}
            </UiBadge>

            <!-- Status Badge -->
            <UiBadge
              :variant="getStatusBadgeVariant(item.status)"
              size="sm"
              dot
            >
              {{ item.status.toUpperCase() }}
            </UiBadge>

            <!-- Pre-Service Prayer Indicator -->
            <span
              v-if="item.status === 'pending'"
              class="inline-flex items-center gap-1 text-[11px] text-amber-400 font-medium"
            >
              <span class="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
              Prayer Target
            </span>

            <span
              v-else-if="item.answer"
              class="inline-flex items-center gap-1 text-[11px] text-emerald-400 font-medium"
            >
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              Pastoral Answered
            </span>
          </div>

          <!-- Timestamp -->
          <div class="text-[11px] text-zinc-400 flex items-center gap-1.5 font-mono">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {{ formatDate(item.createdAt) }}
          </div>
        </div>

        <!-- Question Content -->
        <div class="space-y-2">
          <p class="text-sm sm:text-base text-zinc-100 font-normal leading-relaxed whitespace-pre-line">
            "{{ item.question }}"
          </p>
        </div>

        <!-- Answer / Guidance Box (If Answered) -->
        <div
          v-if="item.answer"
          class="p-3.5 rounded-lg bg-emerald-950/20 border border-emerald-800/30 space-y-2"
        >
          <div class="flex items-center justify-between text-[11px]">
            <span class="font-pixel text-emerald-400 tracking-wider">PASTORAL RESPONSE</span>
            <span v-if="item.answeredByName" class="text-zinc-400">
              Guidance by: <strong class="text-zinc-200">{{ item.answeredByName }}</strong>
            </span>
          </div>
          <p class="text-xs sm:text-sm text-zinc-300 leading-relaxed whitespace-pre-line">
            {{ item.answer }}
          </p>
        </div>

        <!-- Card Footer Actions -->
        <div class="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-zinc-900">
          <div class="text-[11px] text-zinc-500 font-mono">
            Status: <span class="capitalize text-zinc-300">{{ item.status }}</span>
          </div>

          <div class="flex items-center gap-2">
            <!-- View Details / Reply Button -->
            <NuxtLink :to="`/servant/vault/${item.id}`">
              <UiButton
                variant="outline"
                size="sm"
                class="text-xs"
              >
                <template #leading>
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </template>
                {{ item.answer ? 'View Detail & Guidance' : 'View Detail & Reply' }}
              </UiButton>
            </NuxtLink>
          </div>
        </div>
      </UiCard>
    </div>

    <!-- 7. Detail & Reply Modal for Servants -->
    <div
      v-if="activeModalQuestion"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      @click.self="closeDetailModal"
    >
      <div class="w-full max-w-2xl bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <!-- Modal Header -->
        <div class="px-6 py-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/50">
          <div class="flex items-center gap-2">
            <span class="font-pixel text-xs text-brand-yellow">THE VAULT INQUIRY DETAIL</span>
            <UiBadge :variant="getStatusBadgeVariant(activeModalQuestion.status)" size="sm">
              {{ activeModalQuestion.status.toUpperCase() }}
            </UiBadge>
          </div>
          <button
            type="button"
            class="text-zinc-400 hover:text-white p-1 rounded-md hover:bg-zinc-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow"
            aria-label="Close inquiry dialog"
            @click="closeDetailModal"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Modal Body -->
        <div class="p-6 space-y-5 overflow-y-auto flex-1">
          <!-- Submission Metadata -->
          <div class="p-3.5 rounded-lg bg-zinc-900/80 border border-zinc-800 flex flex-wrap items-center justify-between text-xs text-zinc-400">
            <div>
              Topic: <span class="font-semibold text-zinc-200">{{ activeModalQuestion.category || 'General' }}</span>
            </div>
            <div>
              Submitted: <span class="font-mono text-zinc-300">{{ formatDate(activeModalQuestion.createdAt) }}</span>
            </div>
          </div>

          <!-- Original Question -->
          <div class="space-y-1.5">
            <label class="text-xs font-pixel text-zinc-400 uppercase tracking-wider">
              YOUTH QUESTION
            </label>
            <div class="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800 text-sm text-zinc-100 whitespace-pre-line leading-relaxed">
              {{ activeModalQuestion.question }}
            </div>
          </div>

          <!-- Pastoral Guidance / Ministry Answer -->
          <div class="space-y-1.5">
            <div class="flex items-center justify-between">
              <label class="text-xs font-pixel text-emerald-400 uppercase tracking-wider">
                MINISTRY &amp; PASTORAL GUIDANCE
              </label>
              <span class="text-[11px] text-zinc-500">Shared with the pastoral team</span>
            </div>
            <textarea
              v-model="replyForm.answer"
              rows="5"
              placeholder="Provide biblical encouragement, counsel notes, or prayer pointers for this inquiry..."
              class="w-full bg-zinc-900/90 border border-zinc-800 rounded-xl p-3.5 text-xs sm:text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition-colors leading-relaxed"
            />
          </div>

          <!-- Status Indicator -->
          <div class="flex items-center justify-between p-3 rounded-lg bg-zinc-900/50 border border-zinc-800 text-xs">
            <span class="text-zinc-400">Mark as Resolved &amp; Answered upon save:</span>
            <label class="flex items-center gap-2 cursor-pointer">
              <input
                v-model="markAsAnswered"
                type="checkbox"
                class="w-4 h-4 rounded border-zinc-700 bg-zinc-900 text-brand-purple focus:ring-brand-purple"
              />
              <span class="text-zinc-200 font-medium">Mark Answered</span>
            </label>
          </div>
        </div>

        <!-- Modal Footer -->
        <div class="px-6 py-4 border-t border-zinc-800 bg-zinc-900/50 flex items-center justify-end gap-3">
          <UiButton
            variant="ghost"
            size="sm"
            class="text-xs"
            @click="closeDetailModal"
          >
            Close
          </UiButton>
          <UiButton
            variant="pixel"
            size="sm"
            :loading="isSubmittingReply"
            class="text-xs"
            @click="submitReply"
          >
            Save Guidance
          </UiButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// 1. Middleware & Page Setup
definePageMeta({
  layout: 'dashboard',
  middleware: ['auth', 'servant']
})

useHead({
  title: 'The Vault Questions | Servant Portal'
})

// 2. Data Types
interface VaultQuestionItem {
  id: string
  question: string
  category: string | null
  status: 'pending' | 'answered' | 'rejected'
  answer: string | null
  answeredBy: string | null
  answeredByName: string | null
  answeredByEmail: string | null
  answeredAt: string | null
  createdAt: string
}

interface VaultApiResponse {
  success: boolean
  total: number
  stats: {
    total: number
    pending: number
    answered: number
    rejected: number
  }
  data: VaultQuestionItem[]
}

// 3. Reactive State
const activeStatus = ref<string>('all')
const searchQuery = ref<string>('')
const activeModalQuestion = ref<VaultQuestionItem | null>(null)
const isSubmittingReply = ref(false)
const markAsAnswered = ref(true)

const replyForm = ref({
  answer: ''
})

// Toast State
const toastMessage = ref('')
const toastType = ref<'success' | 'error'>('success')

const showToast = (message: string, type: 'success' | 'error' = 'success') => {
  toastMessage.value = message
  toastType.value = type
  setTimeout(() => {
    toastMessage.value = ''
  }, 4000)
}

// 4. Fetch Data from GET /api/vault
const { data: responseData, pending, error, refresh } = await useFetch<VaultApiResponse>('/api/vault', {
  headers: useRequestHeaders(['cookie']) as Record<string, string>
})

const fetchErrorMessage = computed<string>(() => {
  if (!error.value) return ''
  const errData = error.value.data as { message?: string } | null | undefined
  return errData?.message || error.value.message || 'We could not sync anonymous inquiries from the server. Please check database connectivity and retry.'
})

const refreshData = async () => {
  await refresh()
}

// 5. Computed Properties
const vaultQuestionsList = computed<VaultQuestionItem[]>(() => {
  return responseData.value?.data || []
})

const stats = computed(() => {
  return responseData.value?.stats || {
    total: vaultQuestionsList.value.length,
    pending: vaultQuestionsList.value.filter(q => q.status === 'pending').length,
    answered: vaultQuestionsList.value.filter(q => q.status === 'answered').length,
    rejected: vaultQuestionsList.value.filter(q => q.status === 'rejected').length
  }
})

const statusTabs = computed(() => [
  { label: 'All Inquiries', value: 'all', count: stats.value.total },
  { label: 'Prayer Targets', value: 'pending', count: stats.value.pending },
  { label: 'Answered', value: 'answered', count: stats.value.answered },
  { label: 'Rejected', value: 'rejected', count: stats.value.rejected }
])

const filteredQuestions = computed(() => {
  return vaultQuestionsList.value.filter(item => {
    // Status filter
    if (activeStatus.value !== 'all' && item.status !== activeStatus.value) {
      return false
    }

    // Search query filter
    if (searchQuery.value.trim()) {
      const q = searchQuery.value.toLowerCase()
      const matchQuestion = item.question.toLowerCase().includes(q)
      const matchCategory = item.category?.toLowerCase().includes(q)
      const matchAnswer = item.answer?.toLowerCase().includes(q)
      return matchQuestion || matchCategory || matchAnswer
    }

    return true
  })
})

const resetFilters = () => {
  activeStatus.value = 'all'
  searchQuery.value = ''
}

// 6. Helpers
const getStatusBadgeVariant = (status: string) => {
  switch (status) {
    case 'answered':
      return 'success'
    case 'rejected':
      return 'secondary'
    default:
      return 'accent'
  }
}

const formatDate = (dateString?: string | null) => {
  if (!dateString) return '-'
  try {
    const d = new Date(dateString)
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  } catch {
    return dateString
  }
}

// 7. Modal & Reply Action
const openDetailModal = (item: VaultQuestionItem) => {
  activeModalQuestion.value = item
  replyForm.value = {
    answer: item.answer || ''
  }
  markAsAnswered.value = item.status === 'answered' || !item.answer
}

const closeDetailModal = () => {
  activeModalQuestion.value = null
  replyForm.value = { answer: '' }
}

const submitReply = async () => {
  if (!activeModalQuestion.value) return

  const item = activeModalQuestion.value
  const newAnswer = replyForm.value.answer
  const targetStatus = markAsAnswered.value ? 'answered' : item.status
  const prevAnswer = item.answer
  const prevStatus = item.status

  // 1. Optimistic UI: update reactive data immediately
  item.answer = newAnswer
  item.status = targetStatus
  const inList = vaultQuestionsList.value.find(q => q.id === item.id)
  if (inList) {
    inList.answer = newAnswer
    inList.status = targetStatus
  }

  // 2. Close modal immediately and show toast (no waiting / spinning)
  closeDetailModal()
  showToast('Guidance response recorded successfully.')

  // 3. Background sync to database
  isSubmittingReply.value = true
  try {
    await $fetch(`/api/vault/${item.id}`, {
      method: 'PATCH' as 'GET',
      body: {
        answer: newAnswer,
        status: targetStatus
      }
    })
    // Background refresh
    refresh()
  } catch (err: unknown) {
    // Revert on error
    item.answer = prevAnswer
    item.status = prevStatus
    if (inList) {
      inList.answer = prevAnswer
      inList.status = prevStatus
    }
    console.error('Failed to submit guidance:', err)
    showToast('Failed to save guidance. Reverted changes.', 'error')
  } finally {
    isSubmittingReply.value = false
  }
}
</script>
