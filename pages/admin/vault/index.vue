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
            The Vault Inquiries
          </h1>
          <UiBadge variant="pixel" size="sm">
            ADMIN DESK
          </UiBadge>
        </div>
        <p class="text-xs sm:text-sm text-zinc-400">
          Review anonymous youth submissions, compose official pastoral answers, and curate answers for the ministry.
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

        <NuxtLink to="/admin">
          <UiButton variant="secondary" size="sm" class="text-xs">
            &larr; Admin Overview
          </UiButton>
        </NuxtLink>
      </div>
    </div>

    <!-- 2. Statistics Summary Cards -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      <UiCard variant="default" padding="sm" class="bg-zinc-950/80 border-zinc-800/80">
        <p class="text-[10px] font-pixel text-zinc-400 uppercase tracking-wider">TOTAL INQUIRIES</p>
        <div class="flex items-baseline justify-between mt-1">
          <span class="text-2xl sm:text-3xl font-bold text-zinc-100">{{ stats.total }}</span>
          <UiBadge variant="outline" size="sm">Vault DB</UiBadge>
        </div>
      </UiCard>

      <UiCard variant="default" padding="sm" class="bg-zinc-950/80 border-zinc-800/80">
        <p class="text-[10px] font-pixel text-brand-yellow uppercase tracking-wider">PENDING REVIEW</p>
        <div class="flex items-baseline justify-between mt-1">
          <span class="text-2xl sm:text-3xl font-bold text-amber-300">{{ stats.pending }}</span>
          <UiBadge variant="accent" size="sm" dot>Needs Action</UiBadge>
        </div>
      </UiCard>

      <UiCard variant="default" padding="sm" class="bg-zinc-950/80 border-zinc-800/80">
        <p class="text-[10px] font-pixel text-emerald-400 uppercase tracking-wider">ANSWERED</p>
        <div class="flex items-baseline justify-between mt-1">
          <span class="text-2xl sm:text-3xl font-bold text-emerald-400">{{ stats.answered }}</span>
          <UiBadge variant="success" size="sm">Pastoral Done</UiBadge>
        </div>
      </UiCard>

      <UiCard variant="default" padding="sm" class="bg-zinc-950/80 border-zinc-800/80">
        <p class="text-[10px] font-pixel text-rose-400 uppercase tracking-wider">REJECTED</p>
        <div class="flex items-baseline justify-between mt-1">
          <span class="text-2xl sm:text-3xl font-bold text-rose-400">{{ stats.rejected }}</span>
          <UiBadge variant="danger" size="sm">Filtered Out</UiBadge>
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
            placeholder="Search questions or category..."
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
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
        </svg>
      </div>
      <h3 class="text-sm font-semibold text-zinc-200">
        {{ searchQuery || activeStatus !== 'all' ? 'No Matching Inquiries Found' : 'The Vault is Currently Clear' }}
      </h3>
      <p class="text-xs text-zinc-500 mt-1 max-w-sm mx-auto">
        {{ searchQuery || activeStatus !== 'all'
          ? 'No questions match your current search or status filter. Try clearing filters or use different keywords.'
          : 'There are no questions submitted by church youth at the moment. Share the public form to encourage questions!' }}
      </p>
      <div class="mt-4 flex items-center justify-center gap-2.5">
        <UiButton
          v-if="searchQuery || activeStatus !== 'all'"
          variant="outline"
          size="sm"
          class="text-xs"
          @click="resetFilters"
        >
          Reset Filters
        </UiButton>
        <NuxtLink v-else to="/vault" target="_blank">
          <UiButton variant="pixel" size="sm" class="text-xs">
            Open Public Vault Form &rarr;
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

            <!-- Answered Indicator -->
            <span
              v-if="item.answer"
              class="inline-flex items-center gap-1 text-[11px] text-emerald-400 font-medium"
            >
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              Answered
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

        <!-- Question Body -->
        <div class="space-y-2">
          <p class="text-sm sm:text-base text-zinc-100 font-normal leading-relaxed whitespace-pre-line">
            "{{ item.question }}"
          </p>
        </div>

        <!-- Existing Pastoral Answer Box -->
        <div
          v-if="item.answer"
          class="p-3.5 rounded-lg bg-emerald-950/20 border border-emerald-800/30 space-y-2"
        >
          <div class="flex items-center justify-between text-[11px]">
            <span class="font-pixel text-emerald-400 tracking-wider">OFFICIAL PASTORAL ANSWER</span>
            <span v-if="item.answeredByName" class="text-zinc-400">
              By: <strong class="text-zinc-200">{{ item.answeredByName }}</strong> ({{ formatDate(item.answeredAt) }})
            </span>
          </div>
          <p class="text-xs sm:text-sm text-zinc-300 leading-relaxed whitespace-pre-line">
            {{ item.answer }}
          </p>
        </div>

        <!-- Card Footer Actions -->
        <div class="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-zinc-900">
          <div class="text-[11px] text-zinc-500 font-mono">
            ID: <span class="text-zinc-400">{{ item.id.slice(0, 8) }}...</span>
          </div>

          <div class="flex items-center gap-2">
            <!-- Quick Status Change: Reject -->
            <button
              v-if="item.status !== 'rejected'"
              type="button"
              class="px-2.5 py-1.5 rounded-md text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-950/30 transition-colors"
              @click="quickUpdateStatus(item.id, 'rejected')"
            >
              Reject
            </button>

            <!-- Quick Status Change: Mark Pending -->
            <button
              v-if="item.status !== 'pending'"
              type="button"
              class="px-2.5 py-1.5 rounded-md text-xs text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 transition-colors"
              @click="quickUpdateStatus(item.id, 'pending')"
            >
              Set Pending
            </button>

            <!-- Detail & Reply Page Link -->
            <NuxtLink :to="`/admin/vault/${item.id}`">
              <UiButton
                :variant="item.answer ? 'outline' : 'pixel'"
                size="sm"
                class="text-xs"
              >
                <template #leading>
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </template>
                {{ item.answer ? 'Edit Response' : 'Answer / Reply' }}
              </UiButton>
            </NuxtLink>
          </div>
        </div>
      </UiCard>
    </div>

    <!-- 7. Detail & Reply Modal -->
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
              Category: <span class="font-semibold text-zinc-200">{{ activeModalQuestion.category || 'General Inquiries' }}</span>
            </div>
            <div>
              Submitted: <span class="font-mono text-zinc-300">{{ formatDate(activeModalQuestion.createdAt) }}</span>
            </div>
          </div>

          <!-- Original Question -->
          <div class="space-y-1.5">
            <label class="text-xs font-pixel text-zinc-400 uppercase tracking-wider">
              ORIGINAL INQUIRY
            </label>
            <div class="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800 text-sm text-zinc-100 whitespace-pre-line leading-relaxed">
              {{ activeModalQuestion.question }}
            </div>
          </div>

          <!-- Pastoral Answer Input -->
          <div class="space-y-1.5">
            <div class="flex items-center justify-between">
              <label class="text-xs font-pixel text-brand-yellow uppercase tracking-wider">
                PASTORAL RESPONSE &amp; GUIDANCE
              </label>
              <span class="text-[11px] text-zinc-500">Visible to church leadership &amp; public replies</span>
            </div>
            <textarea
              v-model="replyForm.answer"
              rows="5"
              placeholder="Write biblically grounded, compassionate, and practical guidance for this inquiry..."
              class="w-full bg-zinc-900/90 border border-zinc-800 rounded-xl p-3.5 text-xs sm:text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition-colors leading-relaxed"
            />
          </div>

          <!-- Status Selector -->
          <div class="space-y-1.5">
            <label class="text-xs font-pixel text-zinc-400 uppercase tracking-wider">
              PUBLICATION STATUS
            </label>
            <div class="grid grid-cols-3 gap-2" role="group" aria-label="Publication status options">
              <button
                v-for="st in ['pending', 'answered', 'rejected'] as const"
                :key="st"
                type="button"
                :aria-pressed="replyForm.status === st"
                :class="[
                  'py-2 px-3 rounded-lg text-xs font-medium border text-center transition-colors uppercase tracking-wider focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow',
                  replyForm.status === st
                    ? st === 'answered'
                      ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300 font-bold'
                      : st === 'rejected'
                      ? 'bg-rose-950/60 border-rose-500 text-rose-300 font-bold'
                      : 'bg-amber-950/60 border-amber-500 text-amber-300 font-bold'
                    : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:bg-zinc-800'
                ]"
                @click="replyForm.status = st"
              >
                {{ st }}
              </button>
            </div>
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
            Cancel
          </UiButton>
          <UiButton
            variant="pixel"
            size="sm"
            :loading="isSubmittingReply"
            class="text-xs"
            @click="submitReply"
          >
            Save Pastoral Response
          </UiButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// 1. Middleware & Meta Setup
definePageMeta({
  layout: 'dashboard',
  middleware: ['auth', 'admin']
})

useHead({
  title: 'The Vault Inquiries | Admin Control Center'
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

const replyForm = ref({
  answer: '',
  status: 'answered' as 'pending' | 'answered' | 'rejected'
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

// 5. Computed Lists & Statistics
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
  { label: 'Pending', value: 'pending', count: stats.value.pending },
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
      return 'danger'
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

// 7. Actions & Modal Handling
const openDetailModal = (item: VaultQuestionItem) => {
  activeModalQuestion.value = item
  replyForm.value = {
    answer: item.answer || '',
    status: item.status === 'pending' && item.answer ? 'answered' : item.status
  }
}

const closeDetailModal = () => {
  activeModalQuestion.value = null
  replyForm.value = { answer: '', status: 'answered' }
}

const submitReply = async () => {
  if (!activeModalQuestion.value) return

  const item = activeModalQuestion.value
  const newAnswer = replyForm.value.answer
  const newStatus = replyForm.value.status
  const prevAnswer = item.answer
  const prevStatus = item.status

  // 1. Optimistic UI: update reactive data immediately
  item.answer = newAnswer
  item.status = newStatus
  const inList = vaultQuestionsList.value.find(q => q.id === item.id)
  if (inList) {
    inList.answer = newAnswer
    inList.status = newStatus
  }

  // 2. Close modal immediately and show toast (no waiting / spinning)
  closeDetailModal()
  showToast('Pastoral response saved successfully.')

  // 3. Background sync to database
  isSubmittingReply.value = true
  try {
    await $fetch(`/api/vault/${item.id}`, {
      method: 'PATCH',
      body: {
        answer: newAnswer,
        status: newStatus
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
    console.error('Failed to submit reply:', err)
    showToast('Failed to save pastoral response. Reverted changes.', 'error')
  } finally {
    isSubmittingReply.value = false
  }
}

const quickUpdateStatus = async (id: string, newStatus: 'pending' | 'answered' | 'rejected') => {
  const item = vaultQuestionsList.value.find(q => q.id === id)
  const prev = item?.status

  // Optimistic update
  if (item) item.status = newStatus
  showToast(`Status updated to "${newStatus}".`)

  try {
    await $fetch(`/api/vault/${id}`, {
      method: 'PATCH',
      body: {
        status: newStatus
      }
    })
    refresh()
  } catch (err) {
    if (item && prev) item.status = prev
    console.error('Failed to update status:', err)
    showToast('Failed to update question status.', 'error')
  }
}
</script>
