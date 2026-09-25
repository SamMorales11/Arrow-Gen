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
            Pelayan Tuhan Accounts
          </h1>
          <UiBadge variant="pixel" size="sm">
            ADMIN DIRECTORY
          </UiBadge>
        </div>
        <p class="text-xs sm:text-sm text-zinc-400">
          Provision, activate, and manage credentials for church ministry leaders and Pelayan Tuhan (Servants).
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

        <UiButton
          variant="pixel"
          size="sm"
          class="text-xs"
          @click="openCreateModal"
        >
          <template #leading>
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </template>
          Add Pelayan Tuhan
        </UiButton>
      </div>
    </div>

    <!-- 2. Statistics Summary Cards -->
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
      <UiCard variant="default" padding="sm" class="bg-zinc-950/80 border-zinc-800/80">
        <p class="text-[10px] font-pixel text-zinc-400 uppercase tracking-wider">TOTAL SERVANTS</p>
        <div class="flex items-baseline justify-between mt-1">
          <span class="text-2xl sm:text-3xl font-bold text-zinc-100">{{ stats.total }}</span>
          <UiBadge variant="outline" size="sm">Roster</UiBadge>
        </div>
      </UiCard>

      <UiCard variant="default" padding="sm" class="bg-zinc-950/80 border-zinc-800/80">
        <p class="text-[10px] font-pixel text-emerald-400 uppercase tracking-wider">ACTIVE ACCOUNTS</p>
        <div class="flex items-baseline justify-between mt-1">
          <span class="text-2xl sm:text-3xl font-bold text-emerald-400">{{ stats.active }}</span>
          <UiBadge variant="success" size="sm" dot>Enabled</UiBadge>
        </div>
      </UiCard>

      <UiCard variant="default" padding="sm" class="bg-zinc-950/80 border-zinc-800/80">
        <p class="text-[10px] font-pixel text-amber-400 uppercase tracking-wider">DEACTIVATED</p>
        <div class="flex items-baseline justify-between mt-1">
          <span class="text-2xl sm:text-3xl font-bold text-amber-300">{{ stats.inactive }}</span>
          <UiBadge variant="accent" size="sm">Suspended</UiBadge>
        </div>
      </UiCard>

      <UiCard variant="default" padding="sm" class="bg-zinc-950/80 border-zinc-800/80">
        <p class="text-[10px] font-pixel text-purple-400 uppercase tracking-wider">WORKSPACE ROLE</p>
        <div class="flex items-baseline justify-between mt-1">
          <span class="text-sm font-semibold text-purple-300 font-mono">ROLE_SERVANT</span>
          <UiBadge variant="pixel" size="sm">PT Portal</UiBadge>
        </div>
      </UiCard>
    </div>

    <!-- 3. Filter & Search Toolbar -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
      <!-- Status Tabs -->
      <div class="flex items-center gap-1.5 p-1 bg-zinc-950 rounded-lg border border-zinc-800/80" role="tablist" aria-label="Account status filters">
        <button
          v-for="tab in filterTabs"
          :key="tab.value"
          type="button"
          role="tab"
          :aria-selected="activeFilter === tab.value"
          :class="[
            'px-3 py-1.5 rounded-md text-xs font-medium transition-colors flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow',
            activeFilter === tab.value
              ? 'bg-brand-purple text-white shadow-sm font-semibold'
              : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
          ]"
          @click="activeFilter = tab.value"
        >
          <span>{{ tab.label }}</span>
          <span
            :class="[
              'px-1.5 py-0.2 rounded-full text-[10px]',
              activeFilter === tab.value ? 'bg-purple-900/80 text-white' : 'bg-zinc-800 text-zinc-400'
            ]"
          >
            {{ tab.count }}
          </span>
        </button>
      </div>

      <!-- Search Input -->
      <div class="w-full sm:w-72">
        <div class="relative">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search name or email..."
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

    <!-- 4. Loading State -->
    <div v-if="pending && !servantsList.length" class="space-y-3">
      <UiSkeleton v-for="i in 4" :key="i" class="h-20 rounded-xl" />
    </div>

    <!-- 5. Empty State -->
    <UiCard
      v-else-if="filteredServants.length === 0"
      variant="default"
      padding="lg"
      class="text-center py-16 border-dashed border-zinc-800 bg-zinc-950/40"
    >
      <div class="w-14 h-14 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto text-zinc-500 mb-3">
        <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      </div>
      <h3 class="text-sm font-semibold text-zinc-200">No Pelayan Tuhan accounts found</h3>
      <p class="text-xs text-zinc-500 mt-1 max-w-sm mx-auto">
        {{ searchQuery ? 'No accounts match your search query.' : 'Click "Add Pelayan Tuhan" above to provision a ministry account.' }}
      </p>
      <div class="mt-5 flex justify-center gap-3">
        <UiButton
          v-if="searchQuery || activeFilter !== 'all'"
          variant="outline"
          size="sm"
          class="text-xs"
          @click="resetFilters"
        >
          Reset Filters
        </UiButton>
        <UiButton
          variant="pixel"
          size="sm"
          class="text-xs"
          @click="openCreateModal"
        >
          + Add First Servant
        </UiButton>
      </div>
    </UiCard>

    <!-- 6. Servants Roster List -->
    <div v-else class="space-y-3">
      <UiCard
        v-for="user in filteredServants"
        :key="user.id"
        variant="default"
        padding="md"
        class="border-zinc-800/90 bg-zinc-950/90 hover:border-zinc-700/80 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <!-- User Info & Avatar -->
        <div class="flex items-center gap-3.5 min-w-0">
          <!-- Avatar Icon with Initials -->
          <div
            :class="[
              'w-11 h-11 rounded-xl flex items-center justify-center font-pixel text-sm shrink-0 border select-none',
              user.isActive
                ? 'bg-brand-purple/20 border-brand-purple/40 text-purple-300'
                : 'bg-zinc-900 border-zinc-800 text-zinc-600'
            ]"
          >
            {{ getInitials(user.name) }}
          </div>

          <!-- Name, Email, Creation Date -->
          <div class="min-w-0 space-y-1">
            <div class="flex items-center gap-2 flex-wrap">
              <h3 class="text-sm font-semibold text-zinc-100 truncate">
                {{ user.name }}
              </h3>
              <UiBadge
                :variant="user.isActive ? 'success' : 'secondary'"
                size="sm"
                dot
              >
                {{ user.isActive ? 'ACTIVE' : 'DEACTIVATED' }}
              </UiBadge>
              <UiBadge variant="primary" size="sm" class="text-[10px]">
                SERVANT
              </UiBadge>
            </div>

            <div class="flex items-center gap-3 text-xs text-zinc-400 font-mono">
              <span class="truncate">{{ user.email }}</span>
              <span class="text-zinc-600">•</span>
              <span class="text-[11px] text-zinc-500">Joined {{ formatDate(user.createdAt) }}</span>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex items-center gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-zinc-900">
          <!-- Toggle Activation Button -->
          <button
            type="button"
            :class="[
              'px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors',
              user.isActive
                ? 'bg-amber-950/40 border-amber-800/50 text-amber-300 hover:bg-amber-900/40'
                : 'bg-emerald-950/40 border-emerald-800/50 text-emerald-300 hover:bg-emerald-900/40'
            ]"
            :title="user.isActive ? 'Deactivate servant access' : 'Activate servant access'"
            @click="toggleUserActivation(user)"
          >
            {{ user.isActive ? 'Deactivate' : 'Activate' }}
          </button>

          <!-- Edit Account / Reset Password -->
          <UiButton
            variant="outline"
            size="sm"
            class="text-xs"
            @click="openEditModal(user)"
          >
            <template #leading>
              <svg class="w-3.5 h-3.5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </template>
            Edit / Password
          </UiButton>

          <!-- Delete User Button -->
          <button
            type="button"
            class="p-2 rounded-lg text-zinc-400 hover:text-rose-400 hover:bg-rose-950/30 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow"
            title="Delete servant account permanently"
            aria-label="Delete servant account permanently"
            @click="openDeleteDialog(user)"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </UiCard>
    </div>

    <!-- 7. Create Servant Modal -->
    <div
      v-if="isCreateModalOpen"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      @click.self="isCreateModalOpen = false"
    >
      <div class="w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <!-- Modal Header -->
        <div class="px-6 py-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/60">
          <div class="flex items-center gap-2">
            <span class="font-pixel text-xs text-brand-yellow">NEW PELAYAN TUHAN ACCOUNT</span>
          </div>
          <button
            type="button"
            class="text-zinc-400 hover:text-white p-1 rounded-md hover:bg-zinc-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow"
            aria-label="Close dialog"
            @click="isCreateModalOpen = false"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Create Form Body -->
        <form class="p-6 space-y-4 overflow-y-auto flex-1" @submit.prevent="submitCreateUser">
          <!-- Full Name -->
          <div class="space-y-1.5">
            <label class="text-xs font-pixel text-zinc-300 uppercase tracking-wider block">
              FULL NAME <span class="text-rose-400">*</span>
            </label>
            <UiInput
              v-model="createForm.name"
              type="text"
              required
              placeholder="e.g., Jonathan Alexander"
              class="w-full"
            />
          </div>

          <!-- Email Address -->
          <div class="space-y-1.5">
            <label class="text-xs font-pixel text-zinc-300 uppercase tracking-wider block">
              EMAIL ADDRESS <span class="text-rose-400">*</span>
            </label>
            <UiInput
              v-model="createForm.email"
              type="email"
              required
              placeholder="e.g., servant@arrowgen.church"
              class="w-full"
            />
            <p class="text-[11px] text-zinc-500">
              Used as the login username for the Servant Hub.
            </p>
          </div>

          <!-- Initial Password -->
          <div class="space-y-1.5">
            <div class="flex items-center justify-between">
              <label class="text-xs font-pixel text-zinc-300 uppercase tracking-wider block">
                PASSWORD <span class="text-rose-400">*</span>
              </label>
              <button
                type="button"
                class="text-[11px] text-zinc-400 hover:text-white"
                @click="showCreatePassword = !showCreatePassword"
              >
                {{ showCreatePassword ? 'Hide' : 'Show' }}
              </button>
            </div>
            <UiInput
              v-model="createForm.password"
              :type="showCreatePassword ? 'text' : 'password'"
              required
              minlength="8"
              placeholder="Minimum 8 characters..."
              class="w-full font-mono text-xs"
            />
            <p class="text-[11px] text-zinc-500">
              Hashed securely via Better Auth scrypt algorithm.
            </p>
          </div>

          <!-- Account Active Status Switch -->
          <div class="pt-2">
            <label class="relative flex items-center gap-3 cursor-pointer">
              <input
                v-model="createForm.isActive"
                type="checkbox"
                class="sr-only peer"
              />
              <div class="w-11 h-6 bg-zinc-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
              <div>
                <span class="text-xs font-medium text-zinc-200 block">
                  {{ createForm.isActive ? 'Active (Can login)' : 'Inactive (Suspended)' }}
                </span>
                <span class="text-[11px] text-zinc-500">
                  Allow this servant to access the Servant Portal immediately.
                </span>
              </div>
            </label>
          </div>
        </form>

        <!-- Modal Footer -->
        <div class="px-6 py-4 border-t border-zinc-800 bg-zinc-900/60 flex items-center justify-end gap-3">
          <UiButton
            variant="ghost"
            size="sm"
            class="text-xs"
            @click="isCreateModalOpen = false"
          >
            Cancel
          </UiButton>
          <UiButton
            variant="pixel"
            size="sm"
            :loading="isSubmittingCreate"
            class="text-xs"
            @click="submitCreateUser"
          >
            Create Account
          </UiButton>
        </div>
      </div>
    </div>

    <!-- 8. Edit / Reset Password Modal -->
    <div
      v-if="editingUser"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      @click.self="editingUser = null"
    >
      <div class="w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <!-- Header -->
        <div class="px-6 py-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/60">
          <div class="flex items-center gap-2">
            <span class="font-pixel text-xs text-brand-yellow">EDIT SERVANT ACCOUNT</span>
          </div>
          <button
            type="button"
            class="text-zinc-400 hover:text-white p-1 rounded-md hover:bg-zinc-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow"
            aria-label="Close dialog"
            @click="editingUser = null"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Form Body -->
        <form class="p-6 space-y-4 overflow-y-auto flex-1" @submit.prevent="submitEditUser">
          <!-- Full Name -->
          <div class="space-y-1.5">
            <label class="text-xs font-pixel text-zinc-300 uppercase tracking-wider block">
              FULL NAME <span class="text-rose-400">*</span>
            </label>
            <UiInput
              v-model="editForm.name"
              type="text"
              required
              class="w-full"
            />
          </div>

          <!-- Email Address -->
          <div class="space-y-1.5">
            <label class="text-xs font-pixel text-zinc-300 uppercase tracking-wider block">
              EMAIL ADDRESS <span class="text-rose-400">*</span>
            </label>
            <UiInput
              v-model="editForm.email"
              type="email"
              required
              class="w-full"
            />
          </div>

          <!-- Reset Password (Optional) -->
          <div class="space-y-1.5 pt-2 border-t border-zinc-900">
            <div class="flex items-center justify-between">
              <label class="text-xs font-pixel text-zinc-300 uppercase tracking-wider block">
                RESET PASSWORD (OPTIONAL)
              </label>
              <button
                type="button"
                class="text-[11px] text-zinc-400 hover:text-white"
                @click="showEditPassword = !showEditPassword"
              >
                {{ showEditPassword ? 'Hide' : 'Show' }}
              </button>
            </div>
            <UiInput
              v-model="editForm.password"
              :type="showEditPassword ? 'text' : 'password'"
              minlength="8"
              placeholder="Leave blank to keep existing password..."
              class="w-full font-mono text-xs"
            />
            <p class="text-[11px] text-zinc-500">
              Only fill this if you want to assign a new password for this servant.
            </p>
          </div>

          <!-- Active Toggle -->
          <div class="pt-2">
            <label class="relative flex items-center gap-3 cursor-pointer">
              <input
                v-model="editForm.isActive"
                type="checkbox"
                class="sr-only peer"
              />
              <div class="w-11 h-6 bg-zinc-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
              <div>
                <span class="text-xs font-medium text-zinc-200 block">
                  {{ editForm.isActive ? 'Active (Can login)' : 'Inactive (Suspended)' }}
                </span>
              </div>
            </label>
          </div>
        </form>

        <!-- Footer -->
        <div class="px-6 py-4 border-t border-zinc-800 bg-zinc-900/60 flex items-center justify-end gap-3">
          <UiButton
            variant="ghost"
            size="sm"
            class="text-xs"
            @click="editingUser = null"
          >
            Cancel
          </UiButton>
          <UiButton
            variant="pixel"
            size="sm"
            :loading="isSubmittingEdit"
            class="text-xs"
            @click="submitEditUser"
          >
            Save Changes
          </UiButton>
        </div>
      </div>
    </div>

    <!-- 9. Delete Confirmation Dialog -->
    <div
      v-if="deletingUser"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      @click.self="deletingUser = null"
    >
      <div class="w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl p-6 space-y-4">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full bg-rose-950/60 border border-rose-800/80 flex items-center justify-center text-rose-400 shrink-0">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </div>
          <div>
            <h3 class="text-sm font-semibold text-zinc-100">Delete Servant Account?</h3>
            <p class="text-xs text-zinc-400">
              Permanent removal confirmation
            </p>
          </div>
        </div>

        <div class="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 space-y-1">
          <p class="text-xs font-semibold text-zinc-200">
            {{ deletingUser.name }}
          </p>
          <p class="text-[11px] text-zinc-400 font-mono">
            {{ deletingUser.email }}
          </p>
        </div>

        <p class="text-xs text-zinc-400 leading-relaxed">
          This account will be permanently erased along with active login sessions. This action cannot be undone.
        </p>

        <div class="pt-2 flex items-center justify-end gap-2.5">
          <UiButton
            variant="ghost"
            size="sm"
            class="text-xs"
            @click="deletingUser = null"
          >
            Cancel
          </UiButton>
          <UiButton
            variant="outline"
            size="sm"
            :loading="isDeletingUser"
            class="text-xs bg-rose-600 hover:bg-rose-500 text-white border-rose-600 hover:border-rose-500"
            @click="confirmDeleteUser"
          >
            Delete Account
          </UiButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// 1. Page Metadata & Authorization Middleware
definePageMeta({
  layout: 'dashboard',
  middleware: ['auth', 'admin']
})

useHead({
  title: 'Pelayan Tuhan Accounts | Admin Directory'
})

// 2. Types & Interfaces
interface ServantUser {
  id: string
  name: string
  email: string
  emailVerified: boolean
  image: string | null
  role: 'admin' | 'servant'
  isActive: boolean
  createdAt: string
  updatedAt: string
}

interface UsersApiResponse {
  success: boolean
  message: string
  total: number
  stats: {
    total: number
    active: number
    inactive: number
  }
  data: ServantUser[]
}

// 3. State Management
const activeFilter = ref<'all' | 'active' | 'inactive'>('all')
const searchQuery = ref('')
const isCreateModalOpen = ref(false)
const showCreatePassword = ref(false)
const isSubmittingCreate = ref(false)

const createForm = ref({
  name: '',
  email: '',
  password: '',
  isActive: true
})

const editingUser = ref<ServantUser | null>(null)
const showEditPassword = ref(false)
const isSubmittingEdit = ref(false)
const editForm = ref({
  name: '',
  email: '',
  password: '',
  isActive: true
})

const deletingUser = ref<ServantUser | null>(null)
const isDeletingUser = ref(false)

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

// 4. Fetch Users (role: servant) from API
const { data: apiResponse, pending, error, refresh } = await useFetch<UsersApiResponse>('/api/users?role=servant', {
  headers: useRequestHeaders(['cookie']) as Record<string, string>
})

const refreshData = async () => {
  await refresh()
}

// 5. Computed Lists & Metrics
const servantsList = computed<ServantUser[]>(() => {
  return apiResponse.value?.data || []
})

const stats = computed(() => {
  return apiResponse.value?.stats || {
    total: servantsList.value.length,
    active: servantsList.value.filter(u => u.isActive).length,
    inactive: servantsList.value.filter(u => !u.isActive).length
  }
})

const filterTabs = computed(() => [
  { label: 'All Servants', value: 'all' as const, count: stats.value.total },
  { label: 'Active', value: 'active' as const, count: stats.value.active },
  { label: 'Deactivated', value: 'inactive' as const, count: stats.value.inactive }
])

const filteredServants = computed(() => {
  return servantsList.value.filter(user => {
    // Tab filter
    if (activeFilter.value === 'active' && !user.isActive) return false
    if (activeFilter.value === 'inactive' && user.isActive) return false

    // Search query filter
    if (searchQuery.value.trim()) {
      const q = searchQuery.value.toLowerCase()
      const matchName = user.name.toLowerCase().includes(q)
      const matchEmail = user.email.toLowerCase().includes(q)
      return matchName || matchEmail
    }

    return true
  })
})

const resetFilters = () => {
  activeFilter.value = 'all'
  searchQuery.value = ''
}

// 6. Helpers
const getInitials = (name: string) => {
  if (!name) return 'PT'
  const parts = name.trim().split(/\s+/)
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase()
  }
  return name.slice(0, 2).toUpperCase()
}

const formatDate = (dateString?: string | null) => {
  if (!dateString) return '-'
  try {
    const d = new Date(dateString)
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  } catch {
    return dateString
  }
}

// 7. Create Servant Actions
const openCreateModal = () => {
  createForm.value = {
    name: '',
    email: '',
    password: '',
    isActive: true
  }
  showCreatePassword.value = false
  isCreateModalOpen.value = true
}

const submitCreateUser = async () => {
  if (!createForm.value.name.trim() || !createForm.value.email.trim() || !createForm.value.password) {
    showToast('Please fill out all required fields.', 'error')
    return
  }

  isSubmittingCreate.value = true
  try {
    const res = await $fetch<{ success: boolean; data: ServantUser }>('/api/users', {
      method: 'POST',
      body: {
        name: createForm.value.name.trim(),
        email: createForm.value.email.trim(),
        password: createForm.value.password,
        isActive: createForm.value.isActive
      }
    })

    if (apiResponse.value?.data && res?.data) {
      apiResponse.value.data.unshift(res.data)
    }

    isCreateModalOpen.value = false
    showToast('New servant account created successfully.')
    refresh()
  } catch (err: unknown) {
    console.error('Failed to create servant:', err)
    const errorMsg = (err as { data?: { message?: string } })?.data?.message || 'Failed to create servant account.'
    showToast(errorMsg, 'error')
  } finally {
    isSubmittingCreate.value = false
  }
}

// 8. Edit / Reset Password Actions
const openEditModal = (user: ServantUser) => {
  editingUser.value = user
  editForm.value = {
    name: user.name,
    email: user.email,
    password: '',
    isActive: user.isActive
  }
  showEditPassword.value = false
}

const submitEditUser = async () => {
  if (!editingUser.value) return

  const target = editingUser.value
  isSubmittingEdit.value = true
  try {
    const payload: { name: string; email: string; isActive: boolean; password?: string } = {
      name: editForm.value.name.trim(),
      email: editForm.value.email.trim(),
      isActive: editForm.value.isActive
    }

    if (editForm.value.password && editForm.value.password.trim().length >= 8) {
      payload.password = editForm.value.password
    }

    const res = await $fetch<{ success: boolean; data: ServantUser }>(`/api/users/${target.id}`, {
      method: 'PATCH',
      body: payload
    })

    if (apiResponse.value?.data && res?.data) {
      const idx = apiResponse.value.data.findIndex(u => u.id === target.id)
      if (idx !== -1) {
        apiResponse.value.data[idx] = res.data
      }
    }

    editingUser.value = null
    showToast('Servant account updated successfully.')
    refresh()
  } catch (err: unknown) {
    console.error('Failed to update servant:', err)
    const errorMsg = (err as { data?: { message?: string } })?.data?.message || 'Failed to update account.'
    showToast(errorMsg, 'error')
  } finally {
    isSubmittingEdit.value = false
  }
}

// 9. Quick Toggle Activation
const toggleUserActivation = async (user: ServantUser) => {
  const prev = user.isActive
  user.isActive = !prev
  showToast(`Account ${user.isActive ? 'activated' : 'deactivated'}.`)

  try {
    await $fetch(`/api/users/${user.id}`, {
      method: 'PATCH',
      body: {
        isActive: user.isActive
      }
    })
    refresh()
  } catch (err: unknown) {
    user.isActive = prev
    console.error('Failed to toggle activation status:', err)
    showToast('Failed to update activation status.', 'error')
  }
}

// 10. Delete Actions
const openDeleteDialog = (user: ServantUser) => {
  deletingUser.value = user
}

const confirmDeleteUser = async () => {
  if (!deletingUser.value) return

  const deletedId = deletingUser.value.id
  isDeletingUser.value = true
  try {
    await $fetch(`/api/users/${deletedId}`, {
      method: 'DELETE'
    })

    if (apiResponse.value?.data) {
      apiResponse.value.data = apiResponse.value.data.filter(u => u.id !== deletedId)
    }

    deletingUser.value = null
    showToast('Servant account removed successfully.')
    refresh()
  } catch (err: unknown) {
    console.error('Failed to delete servant account:', err)
    showToast('Failed to delete account.', 'error')
  } finally {
    isDeletingUser.value = false
  }
}
</script>
