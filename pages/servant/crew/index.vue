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
            Crew Applicants
          </h1>
          <UiBadge variant="accent" size="sm">
            SERVANT DESK
          </UiBadge>
        </div>
        <p class="text-xs sm:text-sm text-zinc-400">
          Review youth volunteering submissions, read heart motivations &amp; callings, and guide candidates through ministry onboarding.
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
    <div class="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
      <UiCard variant="default" padding="sm" class="bg-zinc-950/80 border-zinc-800/80">
        <p class="text-[10px] font-pixel text-zinc-400 uppercase tracking-wider">ALL CANDIDATES</p>
        <div class="flex items-baseline justify-between mt-1">
          <span class="text-2xl sm:text-3xl font-bold text-zinc-100">{{ stats.total }}</span>
          <UiBadge variant="outline" size="sm">Roster</UiBadge>
        </div>
      </UiCard>

      <UiCard variant="default" padding="sm" class="bg-zinc-950/80 border-zinc-800/80">
        <p class="text-[10px] font-pixel text-amber-400 uppercase tracking-wider">AWAITING REVIEW</p>
        <div class="flex items-baseline justify-between mt-1">
          <span class="text-2xl sm:text-3xl font-bold text-amber-300">{{ stats.pending }}</span>
          <UiBadge variant="accent" size="sm" dot>Pending</UiBadge>
        </div>
      </UiCard>

      <UiCard variant="default" padding="sm" class="bg-zinc-950/80 border-zinc-800/80">
        <p class="text-[10px] font-pixel text-sky-400 uppercase tracking-wider">INTERVIEWING</p>
        <div class="flex items-baseline justify-between mt-1">
          <span class="text-2xl sm:text-3xl font-bold text-sky-400">{{ stats.reviewed }}</span>
          <UiBadge variant="primary" size="sm">Reviewed</UiBadge>
        </div>
      </UiCard>

      <UiCard variant="default" padding="sm" class="bg-zinc-950/80 border-zinc-800/80">
        <p class="text-[10px] font-pixel text-emerald-400 uppercase tracking-wider">ACCEPTED CREW</p>
        <div class="flex items-baseline justify-between mt-1">
          <span class="text-2xl sm:text-3xl font-bold text-emerald-400">{{ stats.accepted }}</span>
          <UiBadge variant="success" size="sm">Active</UiBadge>
        </div>
      </UiCard>

      <UiCard variant="default" padding="sm" class="bg-zinc-950/80 border-zinc-800/80 col-span-2 lg:col-span-1">
        <p class="text-[10px] font-pixel text-zinc-500 uppercase tracking-wider">NOT ASSIGNED</p>
        <div class="flex items-baseline justify-between mt-1">
          <span class="text-2xl sm:text-3xl font-bold text-zinc-400">{{ stats.rejected }}</span>
          <UiBadge variant="secondary" size="sm">Archived</UiBadge>
        </div>
      </UiCard>
    </div>

    <!-- 3. Filter & Search Toolbar -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
      <!-- Status Tabs Filter -->
      <div class="flex flex-wrap items-center gap-1.5 p-1 bg-zinc-950 rounded-lg border border-zinc-800/80" role="tablist" aria-label="Candidate status filters">
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
      <div class="w-full md:w-80">
        <div class="relative">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search candidate, phone, or ministry..."
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

    <!-- 4. Loading State (Structured Applicant Skeletons) -->
    <div v-if="pending && !applicantList.length" class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <UiCard v-for="i in 4" :key="i" variant="default" padding="md" class="border-zinc-800 bg-zinc-950/80 space-y-3">
        <div class="flex items-center justify-between pb-3 border-b border-zinc-900">
          <div class="flex items-center gap-3">
            <UiSkeleton width="40px" height="40px" rounded="full" />
            <div class="space-y-1">
              <UiSkeleton width="120px" height="18px" rounded="sm" />
              <UiSkeleton width="80px" height="12px" rounded="sm" />
            </div>
          </div>
          <UiSkeleton width="70px" height="22px" rounded="full" />
        </div>
        <UiSkeleton width="90%" height="16px" rounded="sm" />
        <div class="flex gap-2">
          <UiSkeleton width="60px" height="20px" rounded="sm" />
          <UiSkeleton width="70px" height="20px" rounded="sm" />
        </div>
        <div class="pt-3 border-t border-zinc-900 flex justify-end">
          <UiSkeleton width="90px" height="26px" rounded="md" />
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
        <h3 class="text-sm font-semibold text-zinc-100">Unable to Retrieve Crew Applications</h3>
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
      v-else-if="filteredApplicants.length === 0"
      variant="default"
      padding="lg"
      class="text-center py-14 border-dashed border-zinc-800 bg-zinc-950/40"
    >
      <div class="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto text-zinc-500 mb-3">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      </div>
      <h3 class="text-sm font-semibold text-zinc-200">
        {{ searchQuery || activeStatus !== 'all' ? 'No Matching Applicants Found' : 'No Crew Applications Yet' }}
      </h3>
      <p class="text-xs text-zinc-500 mt-1 max-w-sm mx-auto">
        {{ searchQuery || activeStatus !== 'all'
          ? 'No candidates match your current search or status filter. Try clearing filters or use different keywords.'
          : 'No applicants have registered for the crew yet. Share the /join-the-crew page with your community!' }}
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
        <NuxtLink v-else to="/join-the-crew" target="_blank">
          <UiButton variant="pixel" size="sm" class="text-xs">
            Open Join The Crew Page &rarr;
          </UiButton>
        </NuxtLink>
      </div>
    </UiCard>

    <!-- 6. Applicants Cards Grid / List -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <UiCard
        v-for="item in filteredApplicants"
        :key="item.id"
        variant="default"
        padding="md"
        class="border-zinc-800/90 bg-zinc-950/90 hover:border-zinc-700/90 transition-all duration-200 flex flex-col justify-between cursor-pointer group"
        @click="openDetailModal(item)"
      >
        <!-- Card Top Section -->
        <div class="space-y-3.5">
          <!-- Header: Name, Status, Date -->
          <div class="flex items-start justify-between gap-2 border-b border-zinc-900 pb-3">
            <div>
              <h3 class="text-base font-semibold text-zinc-100 group-hover:text-purple-300 transition-colors flex items-center gap-2">
                {{ item.fullName }}
              </h3>
              <p class="text-xs text-zinc-400 font-mono flex items-center gap-1.5 mt-0.5">
                <svg class="w-3.5 h-3.5 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>{{ item.contact }}</span>
              </p>
            </div>

            <div class="flex flex-col items-end gap-1 shrink-0">
              <UiBadge :variant="getStatusBadgeVariant(item.status)" size="sm" dot>
                {{ item.status.toUpperCase() }}
              </UiBadge>
              <span class="text-[10px] text-zinc-500 font-mono">
                {{ formatDate(item.createdAt) }}
              </span>
            </div>
          </div>

          <!-- Interests Badges -->
          <div class="space-y-1.5">
            <span class="text-[10px] font-pixel text-zinc-400 uppercase tracking-wider block">
              MINISTRY INTERESTS
            </span>
            <div class="flex flex-wrap gap-1.5">
              <UiBadge
                v-for="interest in item.interests"
                :key="interest"
                variant="outline"
                size="sm"
                class="bg-zinc-900/80 text-zinc-300 border-zinc-700/80 text-[11px]"
              >
                {{ interest }}
              </UiBadge>
              <span v-if="!item.interests || item.interests.length === 0" class="text-xs text-zinc-600 italic">
                No ministry field selected
              </span>
            </div>
          </div>

          <!-- Motivation Snippet -->
          <div class="space-y-1">
            <span class="text-[10px] font-pixel text-zinc-400 uppercase tracking-wider block">
              MOTIVATION &amp; VISION
            </span>
            <p class="text-xs text-zinc-300 line-clamp-2 leading-relaxed bg-zinc-900/40 p-2.5 rounded-lg border border-zinc-900">
              "{{ item.motivation }}"
            </p>
          </div>
        </div>

        <!-- Card Footer Actions -->
        <div class="flex items-center justify-between gap-2 pt-3 mt-4 border-t border-zinc-900" @click.stop>
          <span class="text-[10px] text-zinc-400 font-mono">
            ID: {{ item.id.slice(0, 8) }}...
          </span>

          <div class="flex items-center gap-1.5">
            <!-- Quick Status Buttons: hidden for demo role -->
            <template v-if="!isDemo">
              <!-- Quick Status Change: Review -->
              <button
                v-if="item.status !== 'reviewed' && item.status !== 'accepted'"
                type="button"
                class="px-2 py-1 rounded text-[11px] font-medium text-sky-400 hover:text-sky-300 hover:bg-sky-950/40 transition-colors"
                title="Mark as Under Review"
                @click="quickUpdateStatus(item.id, 'reviewed')"
              >
                Review
              </button>

              <!-- Quick Status Change: Accept -->
              <button
                v-if="item.status !== 'accepted'"
                type="button"
                class="px-2 py-1 rounded text-[11px] font-medium text-emerald-400 hover:text-emerald-300 hover:bg-emerald-950/40 transition-colors"
                title="Accept Candidate"
                @click="quickUpdateStatus(item.id, 'accepted')"
              >
                Accept
              </button>

              <!-- Quick Status Change: Reject -->
              <button
                v-if="item.status !== 'rejected'"
                type="button"
                class="px-2 py-1 rounded text-[11px] font-medium text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 transition-colors"
                title="Decline Candidate"
                @click="quickUpdateStatus(item.id, 'rejected')"
              >
                Reject
              </button>
            </template>

            <!-- Open Full Details Modal -->
            <UiButton
              variant="outline"
              size="sm"
              class="text-xs ml-1"
              @click="openDetailModal(item)"
            >
              View Full
            </UiButton>
          </div>
        </div>
      </UiCard>
    </div>

    <!-- 7. Interactive Detail & Status Modal -->
    <div
      v-if="activeApplicant"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      @click.self="closeDetailModal"
    >
      <div class="w-full max-w-2xl bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <!-- Modal Header -->
        <div class="px-6 py-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/60">
          <div class="flex items-center gap-2.5">
            <span class="font-pixel text-xs text-brand-yellow">CANDIDATE DOSSIER</span>
            <UiBadge :variant="getStatusBadgeVariant(activeApplicant.status)" size="sm" dot>
              {{ activeApplicant.status.toUpperCase() }}
            </UiBadge>
          </div>
          <button
            type="button"
            class="text-zinc-400 hover:text-white p-1 rounded-md hover:bg-zinc-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow"
            aria-label="Close candidate dossier dialog"
            @click="closeDetailModal"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Modal Body -->
        <div class="p-6 space-y-6 overflow-y-auto flex-1">
          <!-- Candidate Header Summary -->
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-zinc-900/80 border border-zinc-800">
            <div>
              <h2 class="text-xl font-bold text-zinc-100">
                {{ activeApplicant.fullName }}
              </h2>
              <p class="text-xs text-zinc-400 font-mono mt-0.5">
                Applied on: {{ formatDate(activeApplicant.createdAt) }}
              </p>
            </div>

            <!-- Contact Link & Copy -->
            <div class="flex items-center gap-2">
              <a
                :href="getContactHref(activeApplicant.contact)"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950/60 border border-emerald-700/60 text-emerald-300 text-xs font-semibold hover:bg-emerald-900/50 transition-colors"
              >
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Contact
              </a>
              <button
                type="button"
                class="px-2.5 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-200 text-xs font-medium transition-colors"
                @click="copyContact(activeApplicant.contact)"
              >
                {{ copied ? 'Copied!' : 'Copy' }}
              </button>
            </div>
          </div>

          <!-- Ministry Interests Field -->
          <div class="space-y-2">
            <label class="text-xs font-pixel text-zinc-400 uppercase tracking-wider block">
              DESIRED MINISTRY INVOLVEMENT
            </label>
            <div class="flex flex-wrap gap-2">
              <UiBadge
                v-for="interest in activeApplicant.interests"
                :key="interest"
                variant="primary"
                size="sm"
                class="py-1 px-2.5 text-xs font-medium"
              >
                {{ interest }}
              </UiBadge>
              <p v-if="!activeApplicant.interests || activeApplicant.interests.length === 0" class="text-xs text-zinc-500 italic">
                No specific fields designated by candidate.
              </p>
            </div>
          </div>

          <!-- Motivation & Calling -->
          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <label class="text-xs font-pixel text-brand-yellow uppercase tracking-wider">
                HEART MOTIVATION &amp; PERSONAL TESTIMONY
              </label>
              <span class="text-[11px] text-zinc-400 font-mono">Pastoral Reference</span>
            </div>
            <div class="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800 text-sm text-zinc-200 whitespace-pre-line leading-relaxed">
              {{ activeApplicant.motivation }}
            </div>
          </div>

          <!-- Status Controls: read-only for demo, interactive for others -->
          <div class="space-y-2.5 pt-2 border-t border-zinc-900">
            <label class="text-xs font-pixel text-zinc-400 uppercase tracking-wider block">
              {{ isDemo ? 'CURRENT CANDIDATE STATUS' : 'SET CANDIDATE STATUS' }}
            </label>
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-2" role="group" aria-label="Candidate status options">
              <button
                v-for="opt in statusOptions"
                :key="opt.value"
                type="button"
                :aria-pressed="modalStatus === opt.value"
                :disabled="isDemo"
                :class="[
                  'py-2.5 px-3 rounded-xl text-xs font-semibold border text-center transition-all flex flex-col items-center justify-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow',
                  isDemo ? 'cursor-not-allowed opacity-60' : '',
                  modalStatus === opt.value
                    ? opt.activeClass
                    : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200'
                ]"
                @click="!isDemo && (modalStatus = opt.value)"
              >
                <span>{{ opt.label }}</span>
                <span class="text-[10px] font-normal opacity-80">{{ opt.hint }}</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Modal Footer -->
        <div class="px-6 py-4 border-t border-zinc-800 bg-zinc-900/60 flex items-center justify-between">
          <div class="text-[11px] text-zinc-500 font-mono">
            UUID: {{ activeApplicant.id }}
          </div>

          <div class="flex items-center gap-3">
            <UiButton
              variant="ghost"
              size="sm"
              class="text-xs"
              @click="closeDetailModal"
            >
              {{ isDemo ? 'Close' : 'Cancel' }}
            </UiButton>
            <template v-if="!isDemo">
              <UiButton
                variant="pixel"
                size="sm"
                :loading="isUpdatingStatus"
                :disabled="modalStatus === activeApplicant.status"
                class="text-xs"
                @click="submitStatusUpdate"
              >
                Update Status
              </UiButton>
            </template>
            <span v-else class="text-[10px] text-amber-400/80 font-pixel tracking-wider">READ ONLY</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useSession } from '~/utils/auth-client'

// 1. Page Metadata & Authentication
definePageMeta({
  layout: 'dashboard',
  middleware: ['auth', 'servant']
})

useHead({
  title: 'Crew Applicants | Servant Desk'
})

// Demo role check - read-only mode
const session = useSession()
const isDemo = computed(() => (session.value.data?.user as { role?: string })?.role === 'demo')

// 2. Types & Interfaces
type CrewStatus = 'pending' | 'reviewed' | 'accepted' | 'rejected'

interface CrewApplicant {
  id: string
  fullName: string
  contact: string
  interests: string[]
  motivation: string
  status: CrewStatus
  createdAt: string
  updatedAt: string
}

interface CrewApiResponse {
  success: boolean
  message: string
  total: number
  filter: string
  stats: {
    total: number
    pending: number
    reviewed: number
    accepted: number
    rejected: number
  }
  data: CrewApplicant[]
}

// 3. Reactive State
const activeStatus = ref<string>('all')
const searchQuery = ref<string>('')
const activeApplicant = ref<CrewApplicant | null>(null)
const modalStatus = ref<CrewStatus>('pending')
const isUpdatingStatus = ref(false)
const copied = ref(false)

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

// 4. Fetch Data from GET /api/crew
const { data: responseData, pending, error, refresh } = await useFetch<CrewApiResponse>('/api/crew', {
  headers: useRequestHeaders(['cookie']) as Record<string, string>
})

const fetchErrorMessage = computed<string>(() => {
  if (!error.value) return ''
  const errData = error.value.data as { message?: string } | null | undefined
  return errData?.message || error.value.message || 'We encountered a database error while retrieving applicant entries. Please retry.'
})

const refreshData = async () => {
  await refresh()
}

// 5. Computed Lists & Metrics
const applicantList = computed<CrewApplicant[]>(() => {
  return responseData.value?.data || []
})

const stats = computed(() => {
  return responseData.value?.stats || {
    total: applicantList.value.length,
    pending: applicantList.value.filter(a => a.status === 'pending').length,
    reviewed: applicantList.value.filter(a => a.status === 'reviewed').length,
    accepted: applicantList.value.filter(a => a.status === 'accepted').length,
    rejected: applicantList.value.filter(a => a.status === 'rejected').length
  }
})

const statusTabs = computed(() => [
  { label: 'All Candidates', value: 'all', count: stats.value.total },
  { label: 'Pending', value: 'pending', count: stats.value.pending },
  { label: 'Reviewed', value: 'reviewed', count: stats.value.reviewed },
  { label: 'Accepted', value: 'accepted', count: stats.value.accepted },
  { label: 'Archived', value: 'rejected', count: stats.value.rejected }
])

const statusOptions: { value: CrewStatus; label: string; hint: string; activeClass: string }[] = [
  {
    value: 'pending',
    label: 'Pending',
    hint: 'Needs review',
    activeClass: 'bg-amber-950/80 border-amber-500 text-amber-300 ring-1 ring-amber-500'
  },
  {
    value: 'reviewed',
    label: 'Reviewed',
    hint: 'Interviewing',
    activeClass: 'bg-sky-950/80 border-sky-500 text-sky-300 ring-1 ring-sky-500'
  },
  {
    value: 'accepted',
    label: 'Accepted',
    hint: 'Joined team',
    activeClass: 'bg-emerald-950/80 border-emerald-500 text-emerald-300 ring-1 ring-emerald-500'
  },
  {
    value: 'rejected',
    label: 'Archived',
    hint: 'Not assigned',
    activeClass: 'bg-rose-950/80 border-rose-500 text-rose-300 ring-1 ring-rose-500'
  }
]

const filteredApplicants = computed(() => {
  return applicantList.value.filter(item => {
    // 1. Status Tab filter
    if (activeStatus.value !== 'all' && item.status !== activeStatus.value) {
      return false
    }

    // 2. Search Query filter
    if (searchQuery.value.trim()) {
      const q = searchQuery.value.toLowerCase()
      const matchName = item.fullName.toLowerCase().includes(q)
      const matchContact = item.contact.toLowerCase().includes(q)
      const matchInterests = item.interests?.some(i => i.toLowerCase().includes(q))
      const matchMotivation = item.motivation.toLowerCase().includes(q)
      return matchName || matchContact || matchInterests || matchMotivation
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
    case 'accepted':
      return 'success'
    case 'reviewed':
      return 'primary'
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

const getContactHref = (contact: string) => {
  if (contact.includes('@')) {
    return `mailto:${contact}`
  }
  const cleanNumber = contact.replace(/[^0-9+]/g, '')
  if (cleanNumber.startsWith('+') || cleanNumber.startsWith('62') || cleanNumber.startsWith('08')) {
    const waNumber = cleanNumber.startsWith('08') ? `62${cleanNumber.slice(1)}` : cleanNumber.replace('+', '')
    return `https://wa.me/${waNumber}`
  }
  return `tel:${contact}`
}

const copyContact = async (contact: string) => {
  try {
    await navigator.clipboard.writeText(contact)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch {
    // Clipboard fallback
  }
}

// 7. Modal & Status Update Actions
const openDetailModal = (item: CrewApplicant) => {
  activeApplicant.value = item
  modalStatus.value = item.status
  copied.value = false
}

const closeDetailModal = () => {
  activeApplicant.value = null
  copied.value = false
}

const submitStatusUpdate = async () => {
  if (!activeApplicant.value) return

  const targetApplicant = activeApplicant.value
  const newStatus = modalStatus.value
  const previousStatus = targetApplicant.status

  if (newStatus === previousStatus) {
    closeDetailModal()
    return
  }

  // 1. Optimistic UI: Update immediately in reactive memory
  targetApplicant.status = newStatus
  const itemInList = applicantList.value.find(a => a.id === targetApplicant.id)
  if (itemInList) {
    itemInList.status = newStatus
  }

  // 2. Immediately close modal & show positive toast feedback (no waiting / spinning)
  closeDetailModal()
  showToast(`Candidate ${targetApplicant.fullName} status updated to "${newStatus}".`)

  // 3. Sync to database in background
  isUpdatingStatus.value = true
  try {
    await $fetch(`/api/crew/${targetApplicant.id}`, {
      method: 'PATCH',
      body: {
        status: newStatus
      }
    })
    // Background refresh stats and list
    refresh()
  } catch (err: unknown) {
    // Revert state if network/server failed
    targetApplicant.status = previousStatus
    if (itemInList) itemInList.status = previousStatus
    console.error('Failed to update candidate status:', err)
    showToast('Failed to save status update. Reverted changes.', 'error')
  } finally {
    isUpdatingStatus.value = false
  }
}

const quickUpdateStatus = async (id: string, newStatus: CrewStatus) => {
  const item = applicantList.value.find(a => a.id === id)
  const previousStatus = item?.status

  // Optimistic update
  if (item) item.status = newStatus
  showToast(`Status updated to "${newStatus}".`)

  try {
    await $fetch(`/api/crew/${id}`, {
      method: 'PATCH',
      body: {
        status: newStatus
      }
    })
    refresh()
  } catch (err) {
    if (item && previousStatus) item.status = previousStatus
    console.error('Failed to update status:', err)
    showToast('Failed to update status.', 'error')
  }
}
</script>
