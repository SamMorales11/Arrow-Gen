<template>
  <div class="space-y-6 max-w-5xl mx-auto">
    <!-- 1. Breadcrumbs & Top Navigation -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-zinc-800 pb-5">
      <div class="flex items-center gap-2 text-xs text-zinc-400">
        <NuxtLink to="/servant" class="hover:text-zinc-200 transition-colors">
          Servant Hub
        </NuxtLink>
        <span>/</span>
        <NuxtLink to="/servant/vault" class="hover:text-zinc-200 transition-colors">
          The Vault
        </NuxtLink>
        <span>/</span>
        <span class="text-zinc-200 font-mono font-medium truncate max-w-[200px]">
          {{ questionId.slice(0, 8) }}...
        </span>
      </div>

      <div class="flex items-center gap-2.5">
        <NuxtLink to="/servant/vault">
          <UiButton variant="outline" size="sm" class="text-xs">
            <template #leading>
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </template>
            Back to Inquiries
          </UiButton>
        </NuxtLink>

        <UiButton
          variant="ghost"
          size="sm"
          class="text-xs"
          :loading="pending"
          @click="refreshData"
        >
          <template #leading>
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </template>
          Refresh
        </UiButton>
      </div>
    </div>

    <!-- 2. Loading State (Structured Skeletons) -->
    <div v-if="pending && !question" class="space-y-6">
      <UiCard variant="default" padding="lg" class="border-zinc-800 bg-zinc-950/80 space-y-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <UiSkeleton width="90px" height="24px" rounded="full" />
            <UiSkeleton width="70px" height="20px" rounded="md" />
          </div>
          <UiSkeleton width="110px" height="16px" rounded="sm" />
        </div>
        <UiSkeleton width="92%" height="24px" rounded="sm" class="mt-2" />
        <UiSkeleton width="65%" height="20px" rounded="sm" />
        <UiSkeleton width="45%" height="16px" rounded="sm" />
      </UiCard>

      <UiCard variant="default" padding="lg" class="border-zinc-800 bg-zinc-950/80 space-y-4">
        <div class="space-y-1">
          <UiSkeleton width="160px" height="20px" rounded="sm" />
          <UiSkeleton width="220px" height="14px" rounded="sm" />
        </div>
        <UiSkeleton width="100%" height="130px" rounded="lg" />
        <div class="flex justify-end gap-3 pt-2">
          <UiSkeleton width="120px" height="36px" rounded="md" />
        </div>
      </UiCard>
    </div>

    <!-- 3. Error / Not Found State -->
    <UiCard
      v-else-if="error || !question"
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
        <h2 class="text-base font-semibold text-zinc-100">Question Not Found or Failed to Load</h2>
        <p class="text-xs text-zinc-400 max-w-sm mx-auto">
          The requested anonymous question could not be retrieved from the server.
        </p>
      </div>
      <div class="pt-2 flex justify-center gap-3">
        <UiButton
          variant="outline"
          size="sm"
          class="text-xs border-zinc-700"
          @click="refreshData"
        >
          Try Again
        </UiButton>
        <NuxtLink to="/servant/vault">
          <UiButton variant="pixel" size="sm" class="text-xs">
            Return to Vault List
          </UiButton>
        </NuxtLink>
      </div>
    </UiCard>

    <!-- 4. Main Detail & Response Content -->
    <div v-else class="space-y-6">
      <!-- Success Notification Banner -->
      <div
        v-if="showSuccessBanner"
        class="p-4 rounded-xl bg-emerald-950/50 border border-emerald-500/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-emerald-300 transition-all animate-fadeIn"
      >
        <div class="flex items-center gap-2.5">
          <div class="w-7 h-7 rounded-full bg-emerald-900/60 border border-emerald-500/50 flex items-center justify-center shrink-0">
            <svg class="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <p class="text-xs font-semibold text-emerald-200">Response Successfully Saved</p>
            <p class="text-[11px] text-emerald-400">Pastoral guidance and status have been updated in The Vault.</p>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <NuxtLink to="/servant/vault">
            <UiButton variant="outline" size="sm" class="text-xs border-emerald-700 text-emerald-300 hover:bg-emerald-900/30">
              Return to Inquiries &rarr;
            </UiButton>
          </NuxtLink>
          <button
            type="button"
            class="text-emerald-400 hover:text-emerald-200 p-1 text-xs"
            aria-label="Dismiss banner"
            @click="showSuccessBanner = false"
          >
            &times;
          </button>
        </div>
      </div>

      <!-- Error Notification Banner -->
      <div
        v-if="saveErrorMessage"
        class="p-4 rounded-xl bg-rose-950/50 border border-rose-500/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-rose-300 transition-all animate-fadeIn"
      >
        <div class="flex items-center gap-2.5">
          <div class="w-7 h-7 rounded-full bg-rose-900/60 border border-rose-500/50 flex items-center justify-center shrink-0">
            <svg class="w-4 h-4 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <div>
            <p class="text-xs font-semibold text-rose-200">Unable to Save Changes</p>
            <p class="text-[11px] text-rose-400">{{ saveErrorMessage }}</p>
          </div>
        </div>
        <button
          type="button"
          class="text-rose-400 hover:text-rose-200 p-1 text-xs"
          aria-label="Dismiss banner"
          @click="saveErrorMessage = ''"
        >
          &times;
        </button>
      </div>

      <!-- Question Overview Card -->
      <UiCard variant="default" padding="md" class="border-zinc-800 bg-zinc-950/80 space-y-4">
        <!-- Metadata Header -->
        <div class="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-900 pb-3">
          <div class="flex items-center gap-2">
            <UiBadge variant="primary" size="sm">
              {{ question.category || 'General Inquiries' }}
            </UiBadge>
            <UiBadge :variant="getStatusBadgeVariant(question.status)" size="sm" dot>
              {{ question.status.toUpperCase() }}
            </UiBadge>
          </div>

          <div class="flex items-center gap-3 text-[11px] text-zinc-400 font-mono">
            <span>Submitted: <strong class="text-zinc-300">{{ formatDate(question.createdAt) }}</strong></span>
            <span>•</span>
            <span>ID: <strong class="text-zinc-400">{{ question.id }}</strong></span>
          </div>
        </div>

        <!-- Question Body -->
        <div class="space-y-2">
          <span class="text-[10px] font-pixel text-brand-yellow uppercase tracking-wider block">
            ANONYMOUS SUBMISSION (PRAYER &amp; CARE)
          </span>
          <div class="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800/80 text-sm sm:text-base text-zinc-100 leading-relaxed whitespace-pre-line">
            "{{ question.question }}"
          </div>
        </div>

        <!-- Previous Recorded Answer (If Any) -->
        <div
          v-if="question.answer"
          class="p-4 rounded-xl bg-emerald-950/20 border border-emerald-800/30 space-y-2"
        >
          <div class="flex flex-wrap items-center justify-between text-[11px]">
            <span class="font-pixel text-emerald-400 tracking-wider">RECORDED PASTORAL GUIDANCE</span>
            <span v-if="question.answeredByName" class="text-zinc-400">
              Provided by: <strong class="text-zinc-200">{{ question.answeredByName }}</strong> ({{ formatDate(question.answeredAt) }})
            </span>
          </div>
          <p class="text-xs sm:text-sm text-zinc-300 leading-relaxed whitespace-pre-line">
            {{ question.answer }}
          </p>
        </div>
      </UiCard>

      <!-- Ministry Response & Guidance Form -->
      <UiCard variant="default" padding="md" class="border-zinc-800 bg-zinc-950/80 space-y-6">
        <div class="border-b border-zinc-800/80 pb-3">
          <h2 class="text-base font-bold text-zinc-100 font-sans flex items-center gap-2">
            <span>Ministry Response &amp; Prayer Pointers</span>
            <UiBadge variant="accent" size="sm">MINISTRY CARE</UiBadge>
          </h2>
          <p class="text-xs text-zinc-400 mt-0.5">
            Add biblical guidance, counseling notes, or prayer pointers to support the attendee and ministry team.
          </p>
        </div>

        <form class="space-y-5" @submit.prevent="saveResponse">
          <!-- Textarea Response Form -->
          <UiInput
            v-model="form.answer"
            type="textarea"
            :rows="6"
            label="Pastoral Answer & Guidance"
            hint="Provide scripture-backed, empathetic, and clear counsel."
            placeholder="Write your guidance and prayer pointers here..."
          />

          <!-- Publication Status Radio Selector -->
          <div class="space-y-2">
            <label class="font-pixel text-[11px] text-zinc-300 block uppercase tracking-wider">
              INQUIRY STATUS
            </label>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3" role="radiogroup" aria-label="Inquiry status">
              <!-- Pending Option -->
              <label
                :class="[
                  'flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-all focus-within:ring-2 focus-within:ring-brand-yellow',
                  form.status === 'pending'
                    ? 'bg-amber-950/30 border-brand-yellow text-zinc-100 shadow-sm'
                    : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:bg-zinc-900'
                ]"
              >
                <input
                  v-model="form.status"
                  type="radio"
                  value="pending"
                  class="text-brand-yellow focus:ring-brand-yellow bg-zinc-950 border-zinc-700"
                />
                <div>
                  <p class="text-xs font-semibold text-zinc-200">Pending</p>
                  <p class="text-[10px] text-zinc-400">Prayer target / in progress</p>
                </div>
              </label>

              <!-- Answered Option -->
              <label
                :class="[
                  'flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-all focus-within:ring-2 focus-within:ring-brand-yellow',
                  form.status === 'answered'
                    ? 'bg-emerald-950/30 border-emerald-500 text-zinc-100 shadow-sm'
                    : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:bg-zinc-900'
                ]"
              >
                <input
                  v-model="form.status"
                  type="radio"
                  value="answered"
                  class="text-emerald-500 focus:ring-emerald-500 bg-zinc-950 border-zinc-700"
                />
                <div>
                  <p class="text-xs font-semibold text-zinc-200">Answered</p>
                  <p class="text-[10px] text-zinc-400">Resolved &amp; counsel ready</p>
                </div>
              </label>

              <!-- Rejected Option -->
              <label
                :class="[
                  'flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-all focus-within:ring-2 focus-within:ring-brand-yellow',
                  form.status === 'rejected'
                    ? 'bg-zinc-800/80 border-zinc-600 text-zinc-100 shadow-sm'
                    : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:bg-zinc-900'
                ]"
              >
                <input
                  v-model="form.status"
                  type="radio"
                  value="rejected"
                  class="text-zinc-400 focus:ring-zinc-400 bg-zinc-950 border-zinc-700"
                />
                <div>
                  <p class="text-xs font-semibold text-zinc-200">Rejected</p>
                  <p class="text-[10px] text-zinc-400">Filtered or off-topic</p>
                </div>
              </label>
            </div>
          </div>

          <!-- Form Actions Footer -->
          <div class="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-zinc-900">
            <NuxtLink to="/servant/vault">
              <UiButton variant="ghost" size="sm" type="button" class="text-xs">
                Cancel
              </UiButton>
            </NuxtLink>

            <div class="flex items-center gap-2">
              <UiButton
                variant="outline"
                size="sm"
                type="button"
                :loading="isSubmitting"
                class="text-xs"
                @click="saveAndReturn"
              >
                Save &amp; Return to List
              </UiButton>

              <UiButton
                variant="pixel"
                size="sm"
                type="submit"
                :loading="isSubmitting"
                class="text-xs"
              >
                Save Guidance
              </UiButton>
            </div>
          </div>
        </form>
      </UiCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

// 1. Middleware & Route Setup
definePageMeta({
  layout: 'dashboard',
  middleware: ['auth', 'servant']
})

const route = useRoute()
const router = useRouter()
const questionId = computed(() => route.params.id as string)

useHead({
  title: 'Inquiry Detail | Servant Portal'
})

// 2. Data Interface
interface VaultQuestionDetail {
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

interface ApiResponse {
  success: boolean
  data: VaultQuestionDetail
}

// 3. Fetch Single Question Data
const { data: apiResponse, pending, error, refresh } = await useFetch<ApiResponse>(
  () => `/api/vault/${questionId.value}`,
  {
    headers: useRequestHeaders(['cookie']) as Record<string, string>
  }
)

const question = computed(() => apiResponse.value?.data)

// 4. Form State
const form = ref({
  answer: '',
  status: 'answered' as 'pending' | 'answered' | 'rejected'
})

const isSubmitting = ref(false)
const showSuccessBanner = ref(false)
const saveErrorMessage = ref('')

// Inisialisasi form saat data berhasil dimuat
watch(
  question,
  (val) => {
    if (val) {
      form.value = {
        answer: val.answer || '',
        status: val.status || 'answered'
      }
    }
  },
  { immediate: true }
)

const refreshData = async () => {
  await refresh()
}

// 5. Helpers
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

// 6. Action Handlers
const performSave = async () => {
  if (!question.value) return false
  isSubmitting.value = true
  showSuccessBanner.value = false
  saveErrorMessage.value = ''

  const prevAnswer = question.value.answer
  const prevStatus = question.value.status
  const updatedAnswer = form.value.answer
  const updatedStatus = form.value.status

  // Optimistic update in reactive state
  question.value.answer = updatedAnswer
  question.value.status = updatedStatus

  try {
    await $fetch(`/api/vault/${question.value.id}`, {
      method: 'PATCH',
      body: {
        answer: updatedAnswer,
        status: updatedStatus
      }
    })

    showSuccessBanner.value = true
    // Non-blocking background sync
    refresh()
    return true
  } catch (err: unknown) {
    // Revert on failure
    question.value.answer = prevAnswer
    question.value.status = prevStatus
    console.error('Failed to save guidance:', err)
    saveErrorMessage.value = 'Failed to save guidance. Please verify network and try again.'
    return false
  } finally {
    isSubmitting.value = false
  }
}

const saveResponse = async () => {
  await performSave()
}

const saveAndReturn = async () => {
  const success = await performSave()
  if (success) {
    router.push('/servant/vault')
  }
}
</script>
