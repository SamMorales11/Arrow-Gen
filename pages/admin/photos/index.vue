<template>
  <div class="space-y-8">
    <!-- 1. Header Section -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-zinc-800 pb-6">
      <div class="space-y-1">
        <div class="flex items-center gap-2">
          <h1 class="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100 font-sans">
            Photo Reel Gallery
          </h1>
          <UiBadge variant="pixel" size="sm">
            ADMIN EXCLUSIVE
          </UiBadge>
        </div>
        <p class="text-xs sm:text-sm text-zinc-400">
          Curate youth gathering moments, worship photography, and community highlights for the public landing page Photo Reel.
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
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
          </template>
          Add New Photo
        </UiButton>
      </div>
    </div>

    <!-- 2. Statistics Summary Cards -->
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
      <UiCard variant="default" padding="sm" class="bg-zinc-950/80 border-zinc-800/80">
        <p class="text-[10px] font-pixel text-zinc-400 uppercase tracking-wider">TOTAL PHOTOS</p>
        <div class="flex items-baseline justify-between mt-1">
          <span class="text-2xl sm:text-3xl font-bold text-zinc-100">{{ photosList.length }}</span>
          <UiBadge variant="outline" size="sm">Reel DB</UiBadge>
        </div>
      </UiCard>

      <UiCard variant="default" padding="sm" class="bg-zinc-950/80 border-zinc-800/80">
        <p class="text-[10px] font-pixel text-emerald-400 uppercase tracking-wider">ACTIVE IN REEL</p>
        <div class="flex items-baseline justify-between mt-1">
          <span class="text-2xl sm:text-3xl font-bold text-emerald-400">{{ activePhotosCount }}</span>
          <UiBadge variant="success" size="sm" dot>Live</UiBadge>
        </div>
      </UiCard>

      <UiCard variant="default" padding="sm" class="bg-zinc-950/80 border-zinc-800/80">
        <p class="text-[10px] font-pixel text-zinc-500 uppercase tracking-wider">INACTIVE / HIDDEN</p>
        <div class="flex items-baseline justify-between mt-1">
          <span class="text-2xl sm:text-3xl font-bold text-zinc-400">{{ inactivePhotosCount }}</span>
          <UiBadge variant="secondary" size="sm">Draft</UiBadge>
        </div>
      </UiCard>

      <UiCard variant="default" padding="sm" class="bg-zinc-950/80 border-zinc-800/80">
        <p class="text-[10px] font-pixel text-brand-yellow uppercase tracking-wider">DISPLAY ORDER</p>
        <div class="flex items-baseline justify-between mt-1">
          <span class="text-xs sm:text-sm font-semibold text-zinc-200 truncate">
            {{ sortedPhotos[0]?.alt || 'Ascending' }}
          </span>
          <UiBadge variant="accent" size="sm">0 to {{ maxOrder }}</UiBadge>
        </div>
      </UiCard>
    </div>

    <!-- 3. Filter & Search Toolbar -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
      <!-- Status Filter Tabs -->
      <div class="flex items-center gap-1.5 p-1 bg-zinc-950 rounded-lg border border-zinc-800/80" role="tablist" aria-label="Photo status filters">
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
            placeholder="Search by alt text or URL..."
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
    <div v-if="pending && !photosList.length" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <div
        v-for="i in 8"
        :key="i"
        class="border border-zinc-800/80 rounded-xl bg-zinc-950/80 overflow-hidden flex flex-col justify-between"
      >
        <UiSkeleton class="aspect-video w-full rounded-none" />
        <div class="p-3.5 space-y-3">
          <div class="flex items-center justify-between">
            <UiSkeleton class="h-4 w-16 rounded" />
            <UiSkeleton class="h-4 w-12 rounded" />
          </div>
          <UiSkeleton class="h-3 w-3/4 rounded" />
          <div class="pt-2 border-t border-zinc-900 flex items-center justify-between">
            <div class="flex gap-1">
              <UiSkeleton class="h-6 w-6 rounded" />
              <UiSkeleton class="h-6 w-6 rounded" />
            </div>
            <div class="flex gap-1.5">
              <UiSkeleton class="h-6 w-12 rounded" />
              <UiSkeleton class="h-6 w-12 rounded" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 5. Error State -->
    <UiCard
      v-else-if="error"
      variant="default"
      padding="lg"
      class="text-center py-14 border-rose-900/50 bg-rose-950/20"
    >
      <div class="w-12 h-12 rounded-2xl bg-rose-950/60 border border-rose-800/80 flex items-center justify-center mx-auto text-rose-400 mb-3">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <h3 class="text-sm font-semibold text-rose-200">Failed to Load Photo Reel</h3>
      <p class="text-xs text-rose-300/80 mt-1 max-w-sm mx-auto">
        {{ error.message || 'Could not fetch photo gallery records from server. Please check connection and try again.' }}
      </p>
      <div class="mt-5 flex justify-center gap-3">
        <UiButton
          variant="outline"
          size="sm"
          class="text-xs"
          @click="refreshData"
        >
          Try Again
        </UiButton>
      </div>
    </UiCard>

    <!-- 5. Empty State -->
    <UiCard
      v-else-if="filteredPhotos.length === 0"
      variant="default"
      padding="lg"
      class="text-center py-16 border-dashed border-zinc-800 bg-zinc-950/40"
    >
      <div class="w-14 h-14 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto text-zinc-500 mb-3">
        <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
      <h3 class="text-sm font-semibold text-zinc-200">No photos in the reel</h3>
      <p class="text-xs text-zinc-500 mt-1 max-w-sm mx-auto">
        {{ searchQuery ? 'No photos match your search keyword.' : 'Start adding moments and worship photographs to display on the landing page Photo Reel.' }}
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
          + Add First Photo
        </UiButton>
      </div>
    </UiCard>

    <!-- 6. Photos Grid View -->
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <UiCard
        v-for="(item, index) in filteredPhotos"
        :key="item.id"
        variant="default"
        padding="none"
        class="border-zinc-800/90 bg-zinc-950/90 overflow-hidden flex flex-col justify-between group hover:border-zinc-700/80 transition-all duration-200"
      >
        <!-- Thumbnail Preview Area with Overlay Badges -->
        <div class="relative aspect-video w-full bg-zinc-900 overflow-hidden border-b border-zinc-900">
          <!-- Shimmer Placeholder before image loads -->
          <div
            v-if="!isGridImageLoaded(item.id) && !brokenImages.has(item.id)"
            class="absolute inset-0 bg-zinc-900 animate-pulse flex items-center justify-center z-0"
          >
            <svg class="w-5 h-5 text-zinc-700 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>

          <img
            :src="getOptimizedImageUrl(item.url, { width: 640, height: 360, quality: 75, format: 'auto' })"
            :alt="item.alt || 'Photo Reel Image'"
            width="480"
            height="270"
            loading="lazy"
            decoding="async"
            class="img-blur-up w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 select-none relative z-1"
            :class="isGridImageLoaded(item.id) ? 'opacity-100 blur-0' : 'opacity-0 blur-sm'"
            @load="markGridImageLoaded(item.id)"
            @error="onImageLoadError(item.id)"
          />

          <!-- Fallback when image fails to load -->
          <div
            v-if="brokenImages.has(item.id)"
            class="absolute inset-0 bg-zinc-900 flex flex-col items-center justify-center p-3 text-center"
          >
            <svg class="w-6 h-6 text-zinc-600 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span class="text-[10px] text-zinc-500 font-mono">Image load failed</span>
          </div>

          <!-- Top Badges Overlay -->
          <div class="absolute top-2 left-2 flex items-center gap-1.5">
            <span class="px-2 py-0.5 rounded bg-black/80 backdrop-blur-md text-[10px] font-pixel text-brand-yellow border border-zinc-800 shadow">
              #{{ item.order }}
            </span>
            <UiBadge
              :variant="item.isActive ? 'success' : 'secondary'"
              size="sm"
              class="backdrop-blur-md shadow"
            >
              {{ item.isActive ? 'LIVE' : 'HIDDEN' }}
            </UiBadge>
          </div>

          <!-- Quick Move Up/Down Buttons on Thumbnail -->
          <div class="absolute bottom-2 right-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity bg-black/80 backdrop-blur-md rounded-md p-1 border border-zinc-800">
            <button
              type="button"
              :disabled="index === 0 || isReordering"
              class="p-1 rounded text-zinc-300 hover:text-white hover:bg-zinc-800 disabled:opacity-30 disabled:pointer-events-none transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow"
              title="Move photo earlier in order"
              aria-label="Move photo earlier in order"
              @click="movePhoto(index, -1)"
            >
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
              </svg>
            </button>
            <button
              type="button"
              :disabled="index === filteredPhotos.length - 1 || isReordering"
              class="p-1 rounded text-zinc-300 hover:text-white hover:bg-zinc-800 disabled:opacity-30 disabled:pointer-events-none transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow"
              title="Move photo later in order"
              aria-label="Move photo later in order"
              @click="movePhoto(index, 1)"
            >
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Photo Metadata Info -->
        <div class="p-3.5 space-y-2 flex-1 flex flex-col justify-between">
          <div class="space-y-1">
            <h4 class="text-xs font-semibold text-zinc-200 line-clamp-1 group-hover:text-zinc-100 transition-colors">
              {{ item.alt || 'No description provided' }}
            </h4>
            <p class="text-[10px] text-zinc-500 font-mono truncate" :title="item.url">
              {{ item.url }}
            </p>
          </div>

          <!-- Bottom Action Buttons -->
          <div class="pt-3 border-t border-zinc-900/80 flex items-center justify-between gap-1">
            <!-- Toggle Active Switcher -->
            <button
              type="button"
              class="text-[11px] font-medium transition-colors"
              :class="item.isActive ? 'text-zinc-400 hover:text-amber-400' : 'text-emerald-400 hover:text-emerald-300'"
              @click="toggleActiveStatus(item)"
            >
              {{ item.isActive ? 'Hide' : 'Publish' }}
            </button>

            <div class="flex items-center gap-1">
              <!-- Edit Button -->
              <UiButton
                variant="ghost"
                size="sm"
                class="h-7 px-2 text-xs text-zinc-300 hover:text-white"
                @click="openEditModal(item)"
              >
                <template #leading>
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </template>
                Edit
              </UiButton>

              <!-- Delete Button -->
              <button
                type="button"
                class="p-1.5 rounded-md text-zinc-400 hover:text-rose-400 hover:bg-rose-950/30 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow"
                title="Delete Photo"
                aria-label="Delete Photo"
                @click="openDeleteDialog(item)"
              >
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </UiCard>
    </div>

    <!-- 7. Create & Edit Photo Modal -->
    <div
      v-if="isModalOpen"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      @click.self="closeModal"
    >
      <div class="w-full max-w-lg bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <!-- Modal Header -->
        <div class="px-6 py-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/60">
          <div class="flex items-center gap-2">
            <span class="font-pixel text-xs text-brand-yellow">
              {{ isEditing ? 'EDIT PHOTO' : 'ADD NEW REEL PHOTO' }}
            </span>
            <UiBadge v-if="isEditing" variant="outline" size="sm">
              #{{ form.order }}
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
        <form class="p-6 space-y-4 overflow-y-auto flex-1" @submit.prevent="handleSubmit">
          <!-- Photo URL Field -->
          <div class="space-y-1.5">
            <label class="text-xs font-pixel text-zinc-300 uppercase tracking-wider block">
              PHOTO IMAGE URL <span class="text-rose-400">*</span>
            </label>
            <UiInput
              v-model="form.url"
              type="url"
              required
              placeholder="https://images.unsplash.com/... or /photos/reel-1.jpg"
              class="w-full"
            />
            <p class="text-[11px] text-zinc-500">
              Provide a direct HTTPS image URL or a local static path.
            </p>
          </div>

          <!-- Live Image Preview Card -->
          <div v-if="form.url" class="space-y-1.5">
            <label class="text-[10px] font-pixel text-zinc-400 uppercase tracking-wider block">
              LIVE PREVIEW
            </label>
            <div class="relative aspect-video w-full rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800 flex items-center justify-center">
              <img
                :src="form.url"
                :alt="form.alt || 'Live preview'"
                width="480"
                height="270"
                loading="eager"
                decoding="async"
                class="w-full h-full object-cover"
                @load="previewError = false"
                @error="previewError = true"
              />
              <div
                v-if="previewError"
                class="absolute inset-0 bg-zinc-900/90 flex flex-col items-center justify-center p-4 text-center"
              >
                <svg class="w-6 h-6 text-amber-400 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <p class="text-xs text-amber-300">Unable to load image preview</p>
                <p class="text-[10px] text-zinc-500 mt-0.5">Please check that the image link is valid and publicly reachable.</p>
              </div>
            </div>
          </div>

          <!-- Alt Text Field -->
          <div class="space-y-1.5">
            <label class="text-xs font-pixel text-zinc-300 uppercase tracking-wider block">
              ALT TEXT / CAPTION
            </label>
            <UiInput
              v-model="form.alt"
              type="text"
              placeholder="e.g., Youth worship night acoustic set"
              class="w-full"
            />
            <p class="text-[11px] text-zinc-500">
              Descriptive text for accessibility, image search, and hover previews.
            </p>
          </div>

          <!-- Order and Status Grid -->
          <div class="grid grid-cols-2 gap-4 pt-1">
            <!-- Display Order -->
            <div class="space-y-1.5">
              <label class="text-xs font-pixel text-zinc-300 uppercase tracking-wider block">
                DISPLAY ORDER <span class="text-rose-400">*</span>
              </label>
              <UiInput
                v-model.number="form.order"
                type="number"
                min="0"
                step="1"
                required
                class="w-full font-mono"
              />
              <p class="text-[10px] text-zinc-500">
                Determines slide sequence (lower = displayed earlier).
              </p>
            </div>

            <!-- Active Status Toggle -->
            <div class="space-y-1.5">
              <label class="text-xs font-pixel text-zinc-300 uppercase tracking-wider block">
                VISIBILITY STATUS
              </label>
              <div class="h-10 flex items-center">
                <label class="relative flex items-center gap-2.5 cursor-pointer">
                  <input
                    v-model="form.isActive"
                    type="checkbox"
                    class="sr-only peer"
                  />
                  <div class="w-11 h-6 bg-zinc-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                  <span class="text-xs text-zinc-300 font-medium select-none">
                    {{ form.isActive ? 'Active (Live)' : 'Draft (Hidden)' }}
                  </span>
                </label>
              </div>
            </div>
          </div>
        </form>

        <!-- Modal Footer Actions -->
        <div class="px-6 py-4 border-t border-zinc-800 bg-zinc-900/60 flex items-center justify-end gap-3">
          <UiButton
            variant="ghost"
            size="sm"
            class="text-xs"
            @click="closeModal"
          >
            Cancel
          </UiButton>
          <UiButton
            variant="pixel"
            size="sm"
            :loading="isSubmitting"
            class="text-xs"
            @click="handleSubmit"
          >
            {{ isEditing ? 'Save Changes' : 'Add to Reel' }}
          </UiButton>
        </div>
      </div>
    </div>

    <!-- 8. Delete Confirmation Modal -->
    <div
      v-if="deletingItem"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      @click.self="deletingItem = null"
    >
      <div class="w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl p-6 space-y-4">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full bg-rose-950/60 border border-rose-800/80 flex items-center justify-center text-rose-400 shrink-0">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </div>
          <div>
            <h3 class="text-sm font-semibold text-zinc-100">Delete Photo from Reel?</h3>
            <p class="text-xs text-zinc-400">
              Are you sure you want to remove this photo?
            </p>
          </div>
        </div>

        <!-- Photo Snippet Preview -->
        <div class="flex items-center gap-3 p-3 rounded-xl bg-zinc-900 border border-zinc-800">
          <img
            :src="getOptimizedImageUrl(deletingItem.url, { width: 120, height: 120, quality: 75, format: 'auto' })"
            :alt="deletingItem.alt"
            width="56"
            height="56"
            loading="lazy"
            decoding="async"
            class="w-14 h-14 rounded-lg object-cover bg-zinc-950 border border-zinc-800 shrink-0 select-none"
          />
          <div class="min-w-0">
            <p class="text-xs font-semibold text-zinc-200 truncate">
              {{ deletingItem.alt || 'Untitled photo' }}
            </p>
            <p class="text-[10px] text-zinc-500 font-mono truncate mt-0.5">
              Order: #{{ deletingItem.order }}
            </p>
          </div>
        </div>

        <p class="text-xs text-zinc-400 leading-relaxed">
          This action will permanently delete the photo from the database and remove it from the public Photo Reel.
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
            variant="danger"
            size="sm"
            :loading="isDeleting"
            class="text-xs"
            @click="confirmDelete"
          >
            Delete Permanently
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
  title: 'Photo Reel Management | Admin Control Center'
})

// 2. Types & Interfaces
interface PhotoItem {
  id: string
  url: string
  alt: string
  order: number
  isActive: boolean
  createdAt: string
}

interface PhotosApiResponse {
  success: boolean
  message: string
  total: number
  data: PhotoItem[]
}

// 3. State Management
const activeFilter = ref<'all' | 'active' | 'inactive'>('all')
const searchQuery = ref('')
const isModalOpen = ref(false)
const isEditing = ref(false)
const currentPhotoId = ref<string | null>(null)
const previewError = ref(false)
const isSubmitting = ref(false)
const isReordering = ref(false)
const deletingItem = ref<PhotoItem | null>(null)
const isDeleting = ref(false)
const brokenImages = ref<Set<string>>(new Set())
const loadedGridImages = ref<Record<string, boolean>>({})

const isGridImageLoaded = (id: string) => Boolean(loadedGridImages.value[id])
const markGridImageLoaded = (id: string) => {
  loadedGridImages.value[id] = true
}

const form = ref({
  url: '',
  alt: '',
  order: 0,
  isActive: true
})

// 4. Fetch All Photos from API
const { data: apiResponse, pending, error, refresh } = await useFetch<PhotosApiResponse>('/api/photos?all=true', {
  headers: useRequestHeaders(['cookie']) as Record<string, string>
})

const refreshData = async () => {
  await refresh()
}

// 5. Computed Lists & Metrics
const photosList = computed<PhotoItem[]>(() => {
  return apiResponse.value?.data || []
})

// Photos sorted strictly by order ascending, then createdAt
const sortedPhotos = computed<PhotoItem[]>(() => {
  return [...photosList.value].sort((a, b) => {
    if (a.order !== b.order) return a.order - b.order
    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  })
})

const activePhotosCount = computed(() => {
  return photosList.value.filter(p => p.isActive).length
})

const inactivePhotosCount = computed(() => {
  return photosList.value.filter(p => !p.isActive).length
})

const maxOrder = computed(() => {
  if (photosList.value.length === 0) return 0
  return Math.max(...photosList.value.map(p => p.order))
})

const filterTabs = computed(() => [
  { label: 'All Photos', value: 'all' as const, count: photosList.value.length },
  { label: 'Active', value: 'active' as const, count: activePhotosCount.value },
  { label: 'Hidden', value: 'inactive' as const, count: inactivePhotosCount.value }
])

const filteredPhotos = computed<PhotoItem[]>(() => {
  return sortedPhotos.value.filter(item => {
    // Tab filter
    if (activeFilter.value === 'active' && !item.isActive) return false
    if (activeFilter.value === 'inactive' && item.isActive) return false

    // Search query filter
    if (searchQuery.value.trim()) {
      const q = searchQuery.value.toLowerCase()
      const matchAlt = item.alt.toLowerCase().includes(q)
      const matchUrl = item.url.toLowerCase().includes(q)
      return matchAlt || matchUrl
    }

    return true
  })
})

const resetFilters = () => {
  activeFilter.value = 'all'
  searchQuery.value = ''
}

const onImageLoadError = (id: string) => {
  brokenImages.value.add(id)
}

// 6. Modal Open / Close Handlers
const openCreateModal = () => {
  isEditing.value = false
  currentPhotoId.value = null
  previewError.value = false
  form.value = {
    url: '',
    alt: '',
    order: photosList.value.length > 0 ? maxOrder.value + 1 : 0,
    isActive: true
  }
  isModalOpen.value = true
}

const openEditModal = (item: PhotoItem) => {
  isEditing.value = true
  currentPhotoId.value = item.id
  previewError.value = false
  form.value = {
    url: item.url,
    alt: item.alt,
    order: item.order,
    isActive: item.isActive
  }
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
  previewError.value = false
}

// 7. Form Submission (Create / Update)
const handleSubmit = async () => {
  if (!form.value.url.trim()) {
    alert('Please provide a valid Photo URL.')
    return
  }

  isSubmitting.value = true
  try {
    if (isEditing.value && currentPhotoId.value) {
      // PUT /api/photos/[id]
      await $fetch(`/api/photos/${currentPhotoId.value}`, {
        method: 'PUT',
        body: {
          url: form.value.url.trim(),
          alt: form.value.alt.trim(),
          order: Number(form.value.order) || 0,
          isActive: form.value.isActive
        }
      })
    } else {
      // POST /api/photos
      await $fetch('/api/photos', {
        method: 'POST',
        body: {
          url: form.value.url.trim(),
          alt: form.value.alt.trim(),
          order: Number(form.value.order) || 0,
          isActive: form.value.isActive
        }
      })
    }

    closeModal()
    await refresh()
  } catch (err: unknown) {
    console.error('Failed to save photo:', err)
    alert('Failed to save photo. Please verify input and try again.')
  } finally {
    isSubmitting.value = false
  }
}

// 8. Move Up / Down Reordering Logic
const movePhoto = async (currentIndex: number, direction: -1 | 1) => {
  const targetIndex = currentIndex + direction
  const items = filteredPhotos.value

  if (targetIndex < 0 || targetIndex >= items.length) return

  const currentItem = items[currentIndex]
  const targetItem = items[targetIndex]

  isReordering.value = true
  try {
    // Swap their order values
    const currentOrder = currentItem.order
    let newCurrentOrder = targetItem.order

    // In case orders were identical, adjust distinctly
    if (currentOrder === newCurrentOrder) {
      newCurrentOrder = direction === -1 ? currentOrder - 1 : currentOrder + 1
    }

    await Promise.all([
      $fetch(`/api/photos/${currentItem.id}`, {
        method: 'PUT',
        body: { order: newCurrentOrder }
      }),
      $fetch(`/api/photos/${targetItem.id}`, {
        method: 'PUT',
        body: { order: currentOrder }
      })
    ])

    await refresh()
  } catch (err) {
    console.error('Failed to reorder photos:', err)
  } finally {
    isReordering.value = false
  }
}

// 9. Quick Toggle Active Status
const toggleActiveStatus = async (item: PhotoItem) => {
  try {
    await $fetch(`/api/photos/${item.id}`, {
      method: 'PUT',
      body: {
        isActive: !item.isActive
      }
    })
    await refresh()
  } catch (err) {
    console.error('Failed to toggle status:', err)
  }
}

// 10. Delete Dialog Actions
const openDeleteDialog = (item: PhotoItem) => {
  deletingItem.value = item
}

const confirmDelete = async () => {
  if (!deletingItem.value) return

  isDeleting.value = true
  try {
    await $fetch(`/api/photos/${deletingItem.value.id}`, {
      method: 'DELETE'
    })
    deletingItem.value = null
    await refresh()
  } catch (err) {
    console.error('Failed to delete photo:', err)
    alert('Failed to delete photo.')
  } finally {
    isDeleting.value = false
  }
}
</script>
