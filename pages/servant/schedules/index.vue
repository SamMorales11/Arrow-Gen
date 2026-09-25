<template>
  <div class="space-y-8 max-w-7xl mx-auto">
    <!-- 1. Header Section -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-zinc-800 pb-6">
      <div class="space-y-1">
        <div class="flex items-center gap-2">
          <h1 class="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100 font-sans">
            Ministry Schedules
          </h1>
          <UiBadge variant="accent" size="sm">
            SERVANT WORKSPACE
          </UiBadge>
        </div>
        <p class="text-xs sm:text-sm text-zinc-400">
          Coordinate weekly youth services, call times, room allocations, and spiritual gathering themes.
        </p>
      </div>

      <div class="flex flex-wrap items-center gap-2.5">
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

        <!-- Add Schedule Entry: hidden for demo role -->
        <UiButton
          v-if="!isDemo"
          variant="pixel"
          size="sm"
          class="text-xs"
          @click="openCreateModal"
        >
          <template #leading>
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
          </template>
          Add Schedule Entry
        </UiButton>
      </div>
    </div>

    <!-- 2. Statistics Summary Cards -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      <UiCard variant="default" padding="sm" class="bg-zinc-950/80 border-zinc-800/80">
        <p class="text-[10px] font-pixel text-zinc-400 uppercase tracking-wider">ALL GATHERINGS</p>
        <div class="flex items-baseline justify-between mt-1">
          <span class="text-2xl sm:text-3xl font-bold text-zinc-100">{{ schedulesList.length }}</span>
          <UiBadge variant="outline" size="sm">Roster</UiBadge>
        </div>
      </UiCard>

      <UiCard variant="default" padding="sm" class="bg-zinc-950/80 border-zinc-800/80">
        <p class="text-[10px] font-pixel text-emerald-400 uppercase tracking-wider">ACTIVE SERVICES</p>
        <div class="flex items-baseline justify-between mt-1">
          <span class="text-2xl sm:text-3xl font-bold text-emerald-400">{{ activeCount }}</span>
          <UiBadge variant="success" size="sm" dot>Live</UiBadge>
        </div>
      </UiCard>

      <UiCard variant="default" padding="sm" class="bg-zinc-950/80 border-zinc-800/80">
        <p class="text-[10px] font-pixel text-brand-yellow uppercase tracking-wider">PRIMARY DAY</p>
        <div class="flex items-baseline justify-between mt-1">
          <span class="text-xl sm:text-2xl font-bold text-amber-300">Saturday</span>
          <UiBadge variant="accent" size="sm">Youth Main</UiBadge>
        </div>
      </UiCard>

      <UiCard variant="default" padding="sm" class="bg-zinc-950/80 border-zinc-800/80">
        <p class="text-[10px] font-pixel text-purple-400 uppercase tracking-wider">PUBLIC PORTAL</p>
        <div class="flex items-baseline justify-between mt-1">
          <NuxtLink to="/schedule" target="_blank" class="text-xs text-purple-300 hover:underline flex items-center gap-1 font-medium mt-1">
            <span>View Landing</span>
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </NuxtLink>
          <UiBadge variant="secondary" size="sm">Live</UiBadge>
        </div>
      </UiCard>
    </div>

    <!-- 3. Toast Alert Message -->
    <div
      v-if="toastMessage"
      :class="[
        'p-4 rounded-xl flex items-center justify-between text-xs font-medium border animate-fadeIn',
        toastType === 'success'
          ? 'bg-emerald-950/50 border-emerald-500/50 text-emerald-300'
          : 'bg-rose-950/50 border-rose-500/50 text-rose-300'
      ]"
    >
      <div class="flex items-center gap-2">
        <svg v-if="toastType === 'success'" class="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
        <svg v-else class="w-4 h-4 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
        <span>{{ toastMessage }}</span>
      </div>
      <button type="button" class="opacity-75 hover:opacity-100 text-sm p-1 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow" aria-label="Dismiss notification" @click="toastMessage = ''">&times;</button>
    </div>

    <!-- 4. Loading Skeleton (Structured Schedule Cards) -->
    <div v-if="pending && !schedulesList.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <UiCard v-for="i in 3" :key="i" variant="default" padding="md" class="border-zinc-800 bg-zinc-950/80 space-y-3">
        <div class="flex items-center justify-between">
          <UiSkeleton width="110px" height="20px" rounded="md" />
          <UiSkeleton width="55px" height="20px" rounded="full" />
        </div>
        <UiSkeleton width="85%" height="22px" rounded="sm" />
        <UiSkeleton width="60%" height="16px" rounded="sm" />
        <UiSkeleton width="75%" height="14px" rounded="sm" />
        <div class="pt-3 border-t border-zinc-900 flex justify-end gap-2">
          <UiSkeleton width="60px" height="28px" rounded="md" />
          <UiSkeleton width="60px" height="28px" rounded="md" />
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
        <h3 class="text-sm font-semibold text-zinc-100">Failed to Retrieve Schedules</h3>
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
      v-else-if="schedulesList.length === 0"
      variant="default"
      padding="lg"
      class="text-center py-16 border-dashed border-zinc-800 bg-zinc-950/40"
    >
      <div class="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto text-zinc-500 mb-3">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
      <h3 class="text-sm font-semibold text-zinc-200">No Ministry Schedules Listed</h3>
      <p class="text-xs text-zinc-500 mt-1 max-w-sm mx-auto">
        Set up the service time and location for upcoming ministry gatherings.
      </p>
      <UiButton
        v-if="!isDemo"
        variant="pixel"
        size="sm"
        class="mt-4 text-xs"
        @click="openCreateModal"
      >
        Add Schedule Entry
      </UiButton>
    </UiCard>

    <!-- 6. Schedules Grid List -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <UiCard
        v-for="item in schedulesList"
        :key="item.id"
        variant="default"
        padding="md"
        class="border-zinc-800/90 bg-zinc-950/90 hover:border-zinc-700/80 transition-all flex flex-col justify-between space-y-4"
      >
        <!-- Top Status & Theme -->
        <div class="space-y-3">
          <div class="flex items-center justify-between gap-2 border-b border-zinc-900 pb-3">
            <span class="font-pixel text-[10px] text-brand-yellow uppercase tracking-wider flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full bg-brand-yellow"></span>
              {{ item.day }}
            </span>

            <UiBadge
              :variant="item.isActive ? 'success' : 'secondary'"
              size="sm"
              dot
            >
              {{ item.isActive ? 'ACTIVE' : 'INACTIVE' }}
            </UiBadge>
          </div>

          <!-- Schedule Title -->
          <div class="space-y-1">
            <h2 class="text-base sm:text-lg font-bold text-zinc-100 tracking-tight">
              {{ item.title }}
            </h2>
            <div v-if="item.theme" class="inline-block">
              <span class="text-[11px] font-mono text-purple-300 bg-purple-950/40 border border-purple-800/40 px-2 py-0.5 rounded">
                Theme: {{ item.theme }}
              </span>
            </div>
          </div>

          <!-- Time & Location Details -->
          <div class="space-y-2 pt-1 text-xs text-zinc-300">
            <!-- Time -->
            <div class="flex items-center gap-2 text-zinc-300">
              <svg class="w-4 h-4 text-zinc-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span class="font-medium font-mono text-zinc-200">{{ item.time }}</span>
            </div>

            <!-- Location -->
            <div class="flex items-start gap-2 text-zinc-400">
              <svg class="w-4 h-4 text-zinc-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span class="leading-relaxed">{{ item.location }}</span>
            </div>
          </div>
        </div>

        <!-- Footer Actions (Edit & Delete) -->
        <div class="flex items-center justify-between pt-3 border-t border-zinc-900 text-xs">
          <span class="text-[10px] text-zinc-600 font-mono">
            {{ item.id.slice(0, 8) }}...
          </span>

          <!-- Edit & Delete Actions: hidden for demo role -->
          <div v-if="!isDemo" class="flex items-center gap-2">
            <UiButton
              variant="outline"
              size="sm"
              class="text-xs py-1 px-2.5"
              @click="openEditModal(item)"
            >
              <template #leading>
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </template>
              Edit
            </UiButton>

            <UiButton
              variant="ghost"
              size="sm"
              class="text-xs py-1 px-2.5 text-rose-400 hover:text-rose-300 hover:bg-rose-950/40"
              @click="openDeleteConfirmation(item)"
            >
              <template #leading>
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </template>
              Delete
            </UiButton>
          </div>
          <span v-else class="text-[10px] text-zinc-500 font-pixel tracking-wider">READ ONLY</span>
        </div>
      </UiCard>
    </div>

    <!-- 7. Create & Edit Schedule Modal -->
    <div
      v-if="isModalOpen"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      @click.self="closeModal"
    >
      <div class="w-full max-w-xl bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <!-- Modal Header -->
        <div class="px-6 py-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/50">
          <div class="flex items-center gap-2">
            <span class="font-pixel text-xs text-brand-yellow">
              {{ isEditMode ? 'EDIT SCHEDULE ENTRY' : 'ADD MINISTRY SCHEDULE' }}
            </span>
            <UiBadge :variant="isEditMode ? 'accent' : 'pixel'" size="sm">
              {{ isEditMode ? 'UPDATE' : 'CREATE' }}
            </UiBadge>
          </div>

          <button
            type="button"
            class="text-zinc-400 hover:text-white p-1 rounded-md hover:bg-zinc-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow"
            aria-label="Close dialog"
            @click="closeModal"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Modal Form Body -->
        <form class="p-6 space-y-4 overflow-y-auto flex-1" @submit.prevent="saveSchedule">
          <!-- Title Field -->
          <UiInput
            v-model="form.title"
            label="Service / Gathering Title"
            placeholder="e.g. Youth Saturday Gathering"
            required
            hint="Primary name of service"
          />

          <!-- Day and Time Row -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <UiInput
              v-model="form.day"
              label="Day of Gathering"
              placeholder="e.g. Saturday, Sunday"
              required
              hint="Day of the week"
            />

            <UiInput
              v-model="form.time"
              label="Service Time"
              placeholder="e.g. 17:00 WIB"
              required
              hint="Call time or start time"
            />
          </div>

          <!-- Location Field -->
          <UiInput
            v-model="form.location"
            label="Location & Room"
            placeholder="e.g. Upper Room, 3rd Floor"
            required
            hint="Ministry hall or venue"
          />

          <!-- Theme Field (Optional) -->
          <UiInput
            v-model="form.theme"
            label="Service Theme (Optional)"
            placeholder="e.g. Identity in Christ"
            hint="Topic or teaching theme"
          />

          <!-- IsActive Toggle -->
          <div class="pt-2">
            <label class="flex items-start gap-3 p-3.5 rounded-xl border border-zinc-800 bg-zinc-900/50 cursor-pointer hover:border-zinc-700 transition-colors">
              <input
                v-model="form.isActive"
                type="checkbox"
                class="w-4 h-4 mt-0.5 rounded border-zinc-700 bg-zinc-900 text-brand-purple focus:ring-brand-purple"
              />
              <div class="space-y-0.5">
                <span class="text-xs font-semibold text-zinc-100 flex items-center gap-1.5">
                  Publish Service Schedule (isActive)
                  <UiBadge :variant="form.isActive ? 'success' : 'secondary'" size="sm">
                    {{ form.isActive ? 'Active' : 'Draft' }}
                  </UiBadge>
                </span>
                <p class="text-[11px] text-zinc-400">
                  When enabled, this service is visible on the public schedule and congregation page.
                </p>
              </div>
            </label>
          </div>

          <!-- Error Feedback in Modal -->
          <div v-if="modalError" class="p-3 rounded-lg bg-rose-950/40 border border-rose-800/50 text-xs text-rose-300">
            {{ modalError }}
          </div>

          <!-- Modal Action Buttons -->
          <div class="pt-4 border-t border-zinc-800 flex items-center justify-end gap-3">
            <UiButton
              variant="ghost"
              size="sm"
              type="button"
              class="text-xs"
              @click="closeModal"
            >
              Cancel
            </UiButton>

            <UiButton
              variant="pixel"
              size="sm"
              type="submit"
              :loading="isSaving"
              class="text-xs"
            >
              {{ isEditMode ? 'Save Changes' : 'Save Entry' }}
            </UiButton>
          </div>
        </form>
      </div>
    </div>

    <!-- 8. Delete Confirmation Modal -->
    <div
      v-if="deletingItem"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      @click.self="deletingItem = null"
    >
      <div class="w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden p-6 space-y-4">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full bg-rose-950/60 border border-rose-800/60 flex items-center justify-center text-rose-400 shrink-0">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </div>
          <div>
            <h3 class="text-sm font-bold text-zinc-100 font-sans">Delete Schedule Entry?</h3>
            <p class="text-xs text-zinc-400 mt-0.5">
              "{{ deletingItem.title }}"
            </p>
          </div>
        </div>

        <p class="text-xs text-zinc-300 leading-relaxed">
          Are you sure you want to delete this schedule? This action will remove it from the roster database.
        </p>

        <div class="pt-2 flex items-center justify-end gap-2.5">
          <UiButton
            variant="ghost"
            size="sm"
            class="text-xs"
            @click="deletingItem = null"
          >
            Cancel
          </UiButton>

          <UiButton
            variant="pixel"
            size="sm"
            :loading="isDeleting"
            class="text-xs bg-rose-600 hover:bg-rose-500 text-white"
            @click="executeDelete"
          >
            Confirm Delete
          </UiButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useSession } from '~/utils/auth-client'

// 1. Middleware & Meta
definePageMeta({
  layout: 'dashboard',
  middleware: ['auth', 'servant']
})

useHead({
  title: 'Ministry Schedules | Servant Portal'
})

// Demo role check - read-only mode
const session = useSession()
const isDemo = computed(() => (session.value.data?.user as { role?: string })?.role === 'demo')

// 2. Data Types
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

interface SchedulesResponse {
  success: boolean
  total: number
  data: ScheduleItem[]
}

// 3. Fetch Data from GET /api/schedules?all=true
const { data: apiResponse, pending, error, refresh } = await useFetch<SchedulesResponse>('/api/schedules?all=true', {
  headers: useRequestHeaders(['cookie']) as Record<string, string>
})

const fetchErrorMessage = computed<string>(() => {
  if (!error.value) return ''
  const errData = error.value.data as { message?: string } | null | undefined
  return errData?.message || error.value.message || 'We encountered an error connecting to the gathering schedules database. Please try again.'
})

const schedulesList = computed<ScheduleItem[]>(() => {
  return apiResponse.value?.data || []
})

const activeCount = computed(() => {
  return schedulesList.value.filter(s => s.isActive).length
})

const refreshData = async () => {
  await refresh()
}

// 4. Modal & Form State
const isModalOpen = ref(false)
const isEditMode = ref(false)
const currentScheduleId = ref<string | null>(null)
const isSaving = ref(false)
const modalError = ref('')

const form = ref({
  title: '',
  day: '',
  time: '',
  location: '',
  theme: '',
  isActive: true
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

// 5. Open Modals
const openCreateModal = () => {
  isEditMode.value = false
  currentScheduleId.value = null
  modalError.value = ''
  form.value = {
    title: '',
    day: 'Saturday',
    time: '17:00 WIB',
    location: 'Upper Room, 3rd Floor',
    theme: '',
    isActive: true
  }
  isModalOpen.value = true
}

const openEditModal = (item: ScheduleItem) => {
  isEditMode.value = true
  currentScheduleId.value = item.id
  modalError.value = ''
  form.value = {
    title: item.title,
    day: item.day,
    time: item.time,
    location: item.location,
    theme: item.theme || '',
    isActive: item.isActive
  }
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
  isSaving.value = false
  modalError.value = ''
}

// 6. Save (Create or Update) Action
const saveSchedule = async () => {
  modalError.value = ''

  if (!form.value.title.trim()) {
    modalError.value = 'Title is required.'
    return
  }
  if (!form.value.day.trim()) {
    modalError.value = 'Day is required.'
    return
  }
  if (!form.value.time.trim()) {
    modalError.value = 'Time is required.'
    return
  }
  if (!form.value.location.trim()) {
    modalError.value = 'Location is required.'
    return
  }

  isSaving.value = true
  try {
    if (isEditMode.value && currentScheduleId.value) {
      // PUT /api/schedules/[id]
      const res = await $fetch<{ success: boolean; data: ScheduleItem }>(`/api/schedules/${currentScheduleId.value}`, {
        method: 'PUT',
        body: {
          title: form.value.title.trim(),
          day: form.value.day.trim(),
          time: form.value.time.trim(),
          location: form.value.location.trim(),
          theme: form.value.theme.trim() || null,
          isActive: form.value.isActive
        }
      })

      // Optimistically update list in-place
      if (apiResponse.value?.data && res?.data) {
        const idx = apiResponse.value.data.findIndex(s => s.id === currentScheduleId.value)
        if (idx !== -1) {
          apiResponse.value.data[idx] = res.data
        }
      }

      closeModal()
      showToast('Ministry schedule updated successfully.')
    } else {
      // POST /api/schedules
      const res = await $fetch<{ success: boolean; data: ScheduleItem }>('/api/schedules', {
        method: 'POST',
        body: {
          title: form.value.title.trim(),
          day: form.value.day.trim(),
          time: form.value.time.trim(),
          location: form.value.location.trim(),
          theme: form.value.theme.trim() || null,
          isActive: form.value.isActive
        }
      })

      // Optimistically prepend new schedule into list
      if (apiResponse.value?.data && res?.data) {
        apiResponse.value.data.unshift(res.data)
      }

      closeModal()
      showToast('New gathering schedule added successfully.')
    }

    // Non-blocking background sync
    refresh()
  } catch (err: unknown) {
    console.error('Failed to save schedule:', err)
    const errData = err && typeof err === 'object' && 'data' in err ? (err as { data?: { message?: string } }).data : null
    modalError.value = errData?.message || 'Failed to save schedule. Please check all fields and try again.'
  } finally {
    isSaving.value = false
  }
}

// 7. Delete Action
const deletingItem = ref<ScheduleItem | null>(null)
const isDeleting = ref(false)

const openDeleteConfirmation = (item: ScheduleItem) => {
  deletingItem.value = item
}

const executeDelete = async () => {
  if (!deletingItem.value) return

  isDeleting.value = true
  try {
    // DELETE /api/schedules/[id]?permanent=true
    await $fetch(`/api/schedules/${deletingItem.value.id}?permanent=true`, {
      method: 'DELETE'
    })

    showToast(`Schedule "${deletingItem.value.title}" was deleted.`)
    deletingItem.value = null
    await refresh()
  } catch (err: unknown) {
    console.error('Failed to delete schedule:', err)
    showToast('Failed to delete schedule. Please try again.', 'error')
  } finally {
    isDeleting.value = false
  }
}
</script>
