<template>
  <div class="flex flex-col bg-background text-foreground overflow-hidden">

    <!-- ====================================================================
         1. HERO SECTION
         ==================================================================== -->
    <section class="relative min-h-[85vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20 bg-retro-grid border-b border-zinc-900">
      
      <!-- Subtle Ambient Glow -->
      <div 
        class="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 sm:w-[550px] h-96 sm:h-[550px] bg-brand-purple/20 rounded-full blur-[130px] pointer-events-none"
        aria-hidden="true"
      />
      <div 
        class="absolute bottom-10 right-10 w-72 h-72 bg-brand-yellow/10 rounded-full blur-[100px] pointer-events-none"
        aria-hidden="true"
      />

      <div class="relative max-w-5xl mx-auto flex flex-col items-center text-center space-y-8 z-10">
        
        <!-- Retro Pixel Pill Badge -->
        <div class="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-zinc-800 bg-zinc-950/80 backdrop-blur-md">
          <span class="w-2 h-2 rounded-full bg-brand-yellow animate-pulse" />
          <span class="font-pixel text-[11px] text-brand-yellow tracking-wider">ARROW GENERATION MOVEMENT</span>
        </div>

        <!-- Headline & Tagline (Professional English) -->
        <div class="space-y-5 max-w-4xl">
          <h1 class="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-zinc-50 leading-[1.1]">
            A Generation Sharpened for 
            <span class="relative inline-block px-2 text-brand-yellow">
              Divine Purpose
              <span class="absolute -bottom-1 left-0 right-0 h-1 bg-brand-purple" />
            </span>
          </h1>

          <p class="max-w-2xl mx-auto text-base sm:text-xl text-zinc-400 font-sans leading-relaxed">
            Like arrows in the hands of a warrior, we empower youth and young adults to live boldly, worship authentically, and transform culture through Christ-centered fellowship.
          </p>
        </div>

        <!-- Call to Action Buttons -->
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 w-full sm:w-auto">
          <UiButton
            variant="pixel"
            size="lg"
            class="w-full sm:w-auto"
            @click="scrollToSection('schedule')"
          >
            VIEW SERVICE SCHEDULE
          </UiButton>

          <UiButton
            variant="accent"
            size="lg"
            class="w-full sm:w-auto"
            @click="scrollToSection('first-time')"
          >
            FIRST TIME HERE?
          </UiButton>
        </div>

        <!-- Pillar Stats Strip -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 w-full pt-10 border-t border-zinc-900/80">
          <div class="p-4 rounded-lg bg-zinc-950/50 border border-zinc-900">
            <p class="font-pixel text-lg sm:text-2xl text-brand-yellow">WEEKLY</p>
            <p class="text-xs text-zinc-400 mt-1">Vibrant Gatherings</p>
          </div>
          <div class="p-4 rounded-lg bg-zinc-950/50 border border-zinc-900">
            <p class="font-pixel text-lg sm:text-2xl text-purple-400">100%</p>
            <p class="text-xs text-zinc-400 mt-1">Biblical Community</p>
          </div>
          <div class="p-4 rounded-lg bg-zinc-950/50 border border-zinc-900">
            <p class="font-pixel text-lg sm:text-2xl text-zinc-100">ALL</p>
            <p class="text-xs text-zinc-400 mt-1">Welcome As You Are</p>
          </div>
          <div class="p-4 rounded-lg bg-zinc-950/50 border border-zinc-900">
            <p class="font-pixel text-lg sm:text-2xl text-brand-yellow">IMPACT</p>
            <p class="text-xs text-zinc-400 mt-1">City &amp; Beyond</p>
          </div>
        </div>

      </div>
    </section>

    <!-- ====================================================================
         2. PHOTO REEL SECTION (Smooth Interactive Showcase)
         ==================================================================== -->
    <section class="py-20 px-4 sm:px-6 lg:px-8 bg-zinc-950/90 border-b border-zinc-900">
      <div class="max-w-7xl mx-auto space-y-12">
        
        <!-- Section Header -->
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div class="space-y-3">
            <UiBadge variant="pixel" size="sm">
              COMMUNITY PHOTO REEL
            </UiBadge>
            <h2 class="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-50">
              Moments of Faith, Fellowship &amp; Joy
            </h2>
            <p class="text-zinc-400 text-sm sm:text-base max-w-xl">
              Real memories from our weekly services, creative collectives, campus ministries, and outreach gatherings.
            </p>
          </div>

          <!-- Reel Controller Buttons -->
          <div class="flex items-center gap-3">
            <UiButton
              variant="outline"
              size="icon"
              aria-label="Previous Slide"
              @click="prevPhoto"
            >
              <svg class="w-5 h-5 text-zinc-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            </UiButton>
            <UiButton
              variant="outline"
              size="icon"
              aria-label="Next Slide"
              @click="nextPhoto"
            >
              <svg class="w-5 h-5 text-zinc-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </UiButton>
          </div>
        </div>

        <!-- Active Featured Photo Reel Showcase -->
        <div 
          class="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-xl overflow-hidden border-2 border-zinc-800 bg-zinc-950 shadow-pixel-purple"
          @mouseenter="pauseAutoplay"
          @mouseleave="resumeAutoplay"
        >
          <!-- Smooth Transition Cross-Fade Container -->
          <div
            v-for="(photo, index) in photos"
            :key="photo.id"
            :class="[
              'absolute inset-0 transition-all duration-700 ease-in-out',
              index === currentPhotoIndex 
                ? 'opacity-100 scale-100 pointer-events-auto z-10' 
                : 'opacity-0 scale-105 pointer-events-none z-0'
            ]"
          >
            <!-- Smooth Shimmer / Blur Placeholder when image hasn't loaded -->
            <div
              v-if="!isImageLoaded(photo.id)"
              class="absolute inset-0 bg-zinc-900 animate-pulse flex items-center justify-center z-0"
            >
              <div class="w-10 h-10 rounded-full border border-zinc-800 bg-zinc-950/80 flex items-center justify-center text-zinc-600">
                <svg class="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>

            <!-- Optimized Image with Blur-Up Transition, Modern Formats & SrcSet -->
            <img
              :src="getOptimizedImageUrl(photo.url, { width: 1440, quality: 80, format: 'auto' })"
              :srcset="getImageSrcSet(photo.url, [640, 1024, 1440, 1920]) || undefined"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 95vw, 1440px"
              :alt="photo.caption || photo.title"
              width="1440"
              height="810"
              :loading="index === 0 ? 'eager' : 'lazy'"
              decoding="async"
              class="img-blur-up w-full h-full object-cover select-none relative z-1"
              :class="isImageLoaded(photo.id) ? 'opacity-100 blur-0 scale-100' : 'opacity-0 blur-md scale-105'"
              @load="markImageLoaded(photo.id)"
            />
            
            <!-- Vignette & Gradient Overlay -->
            <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent z-2 pointer-events-none" />

            <!-- Caption Card Overlaid -->
            <div class="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4 z-3">
              <div class="space-y-1.5 max-w-lg">
                <UiBadge :variant="photo.tagVariant" size="sm">
                  {{ photo.tag }}
                </UiBadge>
                <h3 class="text-xl sm:text-2xl font-bold text-white font-sans drop-shadow-md">
                  {{ photo.title }}
                </h3>
                <p class="text-xs sm:text-sm text-zinc-300 drop-shadow">
                  {{ photo.caption }}
                </p>
              </div>

              <div class="font-pixel text-xs text-brand-yellow bg-black/70 px-3 py-1.5 border border-zinc-700/80 rounded backdrop-blur-md self-start sm:self-auto shadow-lg">
                {{ String(index + 1).padStart(2, '0') }} / {{ String(photos.length).padStart(2, '0') }}
              </div>
            </div>
          </div>
        </div>

        <!-- Smooth Horizontal Thumbnails Strip -->
        <div class="flex items-center gap-3 overflow-x-auto pb-4 pt-1 scrollbar-none">
          <button
            v-for="(photo, idx) in photos"
            :key="`thumb-${photo.id}`"
            type="button"
            :class="[
              'relative shrink-0 w-28 sm:w-36 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 aspect-[16/10] bg-zinc-900 focus-visible:ring-2 focus-visible:ring-brand-yellow focus-visible:outline-none',
              idx === currentPhotoIndex
                ? 'border-brand-yellow scale-105 shadow-pixel-yellow opacity-100 ring-2 ring-brand-yellow/30'
                : 'border-zinc-800 opacity-60 hover:opacity-100 hover:border-zinc-600'
            ]"
            :aria-label="`Jump to photo ${idx + 1}: ${photo.title}`"
            :aria-current="idx === currentPhotoIndex ? 'true' : undefined"
            @click="currentPhotoIndex = idx"
          >
            <!-- Thumbnail Shimmer Placeholder -->
            <div
              v-if="!isThumbLoaded(photo.id)"
              class="absolute inset-0 bg-zinc-900 animate-pulse"
            />

            <!-- Compressed Lightweight Thumbnail (drops payload by ~95%) -->
            <img
              :src="getOptimizedImageUrl(photo.url, { width: 280, height: 160, quality: 75, format: 'auto' })"
              :alt="photo.title"
              width="280"
              height="160"
              loading="lazy"
              decoding="async"
              class="img-blur-up w-full h-full object-cover select-none relative z-1"
              :class="isThumbLoaded(photo.id) ? 'opacity-100 blur-0 scale-100' : 'opacity-0 blur-sm scale-105'"
              @load="markThumbLoaded(photo.id)"
            />
          </button>
        </div>

      </div>
    </section>

    <!-- ====================================================================
         3. SERVICE SCHEDULE & FIRST TIME HERE SECTIONS (CTA)
         ==================================================================== -->
    <section class="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        <!-- Left Column: FIRST TIME HERE? -->
        <div id="first-time" class="lg:col-span-6 flex">
          <UiCard
            variant="pixel"
            padding="lg"
            class="w-full flex flex-col justify-between"
          >
            <div class="space-y-6">
              <div class="flex items-center justify-between">
                <UiBadge variant="accent" size="md">
                  NEW TO ARROW GEN?
                </UiBadge>
                <span class="font-pixel text-[10px] text-zinc-500">START HERE</span>
              </div>

              <div class="space-y-3">
                <h3 class="text-3xl font-bold text-zinc-50 font-sans">
                  First Time Here? <br />
                  <span class="text-brand-yellow">You Belong in This Family.</span>
                </h3>
                <p class="text-zinc-400 text-sm leading-relaxed">
                  Stepping into a new community can be overwhelming. We’ve designed a special experience to make your first visit smooth, meaningful, and welcoming:
                </p>
              </div>

              <!-- Perks / What to Expect List -->
              <div class="space-y-3 pt-2">
                <div class="flex items-start gap-3">
                  <div class="w-6 h-6 rounded bg-brand-purple/30 border border-brand-purple flex items-center justify-center font-pixel text-[10px] text-purple-300 shrink-0 mt-0.5">
                    01
                  </div>
                  <div>
                    <h4 class="text-sm font-semibold text-zinc-200">Friendly Host Team</h4>
                    <p class="text-xs text-zinc-400">Our welcoming hosts will greet you at the entrance and answer any questions.</p>
                  </div>
                </div>

                <div class="flex items-start gap-3">
                  <div class="w-6 h-6 rounded bg-brand-yellow/30 border border-brand-yellow flex items-center justify-center font-pixel text-[10px] text-brand-yellow shrink-0 mt-0.5">
                    02
                  </div>
                  <div>
                    <h4 class="text-sm font-semibold text-zinc-200">Inspiring Praise &amp; Deep Truth</h4>
                    <p class="text-xs text-zinc-400">Contemporary worship alongside solid, Christ-centered teaching applicable to your life.</p>
                  </div>
                </div>

                <div class="flex items-start gap-3">
                  <div class="w-6 h-6 rounded bg-zinc-800 border border-zinc-700 flex items-center justify-center font-pixel text-[10px] text-zinc-300 shrink-0 mt-0.5">
                    03
                  </div>
                  <div>
                    <h4 class="text-sm font-semibold text-zinc-200">Arrow Connect Lounge</h4>
                    <p class="text-xs text-zinc-400">Enjoy complimentary coffee and connect with small group leaders right after service.</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Action Area -->
            <div class="pt-8 border-t border-zinc-800 flex flex-col sm:flex-row items-center gap-3">
              <UiButton
                variant="accent"
                size="md"
                class="w-full sm:w-auto"
                @click="handlePlanVisit"
              >
                PLAN YOUR VISIT TODAY
              </UiButton>
              <UiButton
                variant="ghost"
                size="md"
                class="w-full sm:w-auto"
                @click="navigateTo('/kontak')"
              >
                Ask a Question
              </UiButton>
            </div>
          </UiCard>
        </div>

        <!-- Right Column: SERVICE SCHEDULE & LOCATION -->
        <div id="schedule" class="lg:col-span-6 flex">
          <UiCard
            variant="default"
            padding="lg"
            class="w-full flex flex-col justify-between border-zinc-800 bg-zinc-950/80"
          >
            <div class="space-y-6">
              <div class="flex items-center justify-between">
                <UiBadge variant="primary" size="md">
                  WEEKLY SCHEDULE
                </UiBadge>
                <div class="flex items-center gap-1.5 text-xs text-emerald-400">
                  <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>On-Site &amp; Streaming</span>
                </div>
              </div>

              <div>
                <h3 class="text-3xl font-bold text-zinc-50 font-sans">
                  Gather With Us
                </h3>
                <p class="text-zinc-400 text-sm mt-1">
                  Join our weekend and midweek gatherings. There is always a place for you.
                </p>
              </div>

              <!-- Schedule Grid -->
              <div class="space-y-3 pt-2">
                <!-- Service 1 -->
                <div class="p-4 rounded-lg bg-zinc-900/80 border border-zinc-800 flex items-center justify-between gap-4 hover:border-zinc-700 transition-colors">
                  <div class="space-y-1">
                    <div class="flex items-center gap-2">
                      <span class="font-pixel text-xs text-brand-yellow">SATURDAY YOUTH</span>
                      <span class="text-[10px] px-1.5 py-0.5 rounded bg-brand-purple/20 text-purple-300 font-medium">Main Service</span>
                    </div>
                    <p class="text-xs text-zinc-400">Praise, message, and young adult collective fellowship.</p>
                  </div>
                  <div class="text-right shrink-0">
                    <p class="font-pixel text-sm text-zinc-100">05:00 PM</p>
                    <p class="text-[11px] text-zinc-500 font-mono">WIB / GMT+7</p>
                  </div>
                </div>

                <!-- Service 2 -->
                <div class="p-4 rounded-lg bg-zinc-900/80 border border-zinc-800 flex items-center justify-between gap-4 hover:border-zinc-700 transition-colors">
                  <div class="space-y-1">
                    <div class="flex items-center gap-2">
                      <span class="font-pixel text-xs text-purple-400">SUNDAY GENERATION</span>
                      <span class="text-[10px] px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300 font-medium">Morning</span>
                    </div>
                    <p class="text-xs text-zinc-400">Family &amp; discipleship session with interactive breakouts.</p>
                  </div>
                  <div class="text-right shrink-0">
                    <p class="font-pixel text-sm text-zinc-100">10:00 AM</p>
                    <p class="text-[11px] text-zinc-500 font-mono">WIB / GMT+7</p>
                  </div>
                </div>

                <!-- Service 3 -->
                <div class="p-4 rounded-lg bg-zinc-900/80 border border-zinc-800 flex items-center justify-between gap-4 hover:border-zinc-700 transition-colors">
                  <div class="space-y-1">
                    <div class="flex items-center gap-2">
                      <span class="font-pixel text-xs text-zinc-300">MIDWEEK PRAYER</span>
                      <span class="text-[10px] px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400 font-medium">Online &amp; On-Site</span>
                    </div>
                    <p class="text-xs text-zinc-400">Deep intercession, acoustic prayer &amp; pastoral care.</p>
                  </div>
                  <div class="text-right shrink-0">
                    <p class="font-pixel text-sm text-zinc-100">07:00 PM</p>
                    <p class="text-[11px] text-zinc-500 font-mono">Wednesday</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Footer Details -->
            <div class="pt-6 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-400">
              <div class="flex items-center gap-2">
                <svg class="w-4 h-4 text-brand-yellow shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Arrow Gen Hall • Main Auditorium</span>
              </div>
              <UiButton
                variant="outline"
                size="sm"
                @click="openMaps"
              >
                Get Directions
              </UiButton>
            </div>
          </UiCard>
        </div>

      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

// Terapkan layout default untuk halaman publik
definePageMeta({
  layout: 'default'
})

// SEO & Open Graph Meta Tags
useSeoMeta({
  title: 'Home — Equipping The Next Generation',
  ogTitle: 'Arrow Gen — Equipping The Next Generation',
  description: 'Welcome to Arrow Gen, a vibrant youth & young adult church community passionate about authentic worship, discipleship, and transformative fellowship in Jesus Christ.',
  ogDescription: 'Arrow Gen is an authentic youth ministry community focused on passionate worship, small groups, and raising leaders for Christ.',
  ogImage: '/logo-arrow.png',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Arrow Gen — Equipping The Next Generation',
  twitterDescription: 'Join Arrow Gen youth & young adult community. Authentic faith, worship, and fellowship.',
  twitterImage: '/logo-arrow.png'
})

useHead({
  htmlAttrs: { lang: 'en' }
})

// Data Curated Default untuk Section Photo Reel
interface ReelPhoto {
  id: string | number
  title: string
  caption: string
  tag: string
  tagVariant: 'primary' | 'secondary' | 'accent' | 'pixel'
  url: string
}

interface PhotoApiResponse {
  success: boolean
  total: number
  data: Array<{
    id: string
    url: string
    alt: string
    order: number
    isActive: boolean
  }>
}

const defaultPhotos: ReelPhoto[] = [
  {
    id: 'default-1',
    title: 'Night of Worship & Encounter',
    caption: 'Passionate worship lifting the name of Jesus with heart and soul.',
    tag: 'WORSHIP',
    tagVariant: 'primary',
    url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1440&q=80'
  },
  {
    id: 'default-2',
    title: 'Authentic Small Group Circles',
    caption: 'Life is better together. Doing life, scriptures, and coffee as one family.',
    tag: 'FELLOWSHIP',
    tagVariant: 'accent',
    url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1440&q=80'
  },
  {
    id: 'default-3',
    title: 'Creative Media & Tech Team',
    caption: 'Using sound, lighting, code, and visuals for kingdom excellence.',
    tag: 'CREATIVE',
    tagVariant: 'pixel',
    url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1440&q=80'
  },
  {
    id: 'default-4',
    title: 'Deep Prayer & Intercession',
    caption: 'Seeking God’s face for our generation, families, and city.',
    tag: 'PRAYER',
    tagVariant: 'secondary',
    url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1440&q=80'
  },
  {
    id: 'default-5',
    title: 'Arrow Leadership Camp',
    caption: 'Equipping disciples and future leaders with clarity and character.',
    tag: 'DISCIPLESHIP',
    tagVariant: 'primary',
    url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1440&q=80'
  },
  {
    id: 'default-6',
    title: 'City Outreach & Blessing',
    caption: 'Being the hands and feet of Christ to those in need across the city.',
    tag: 'OUTREACH',
    tagVariant: 'accent',
    url: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=1440&q=80'
  }
]

// Fetch live active photos from ministry API (with fallback to curated defaults)
const { data: apiPhotosResponse } = await useFetch<PhotoApiResponse>('/api/photos', {
  lazy: true
})

const photos = computed<ReelPhoto[]>(() => {
  const activePhotos = apiPhotosResponse.value?.data
  if (activePhotos && activePhotos.length > 0) {
    const tags: Array<{ tag: string; variant: 'primary' | 'secondary' | 'accent' | 'pixel' }> = [
      { tag: 'WORSHIP', variant: 'primary' },
      { tag: 'FELLOWSHIP', variant: 'accent' },
      { tag: 'CREATIVE', variant: 'pixel' },
      { tag: 'OUTREACH', variant: 'secondary' }
    ]
    return activePhotos.map((item, index) => {
      const tagInfo = tags[index % tags.length]
      return {
        id: item.id,
        title: item.alt || `Ministry Moment #${item.order || index + 1}`,
        caption: item.alt || 'Arrow Gen youth community gathering & fellowship.',
        tag: tagInfo.tag,
        tagVariant: tagInfo.variant,
        url: item.url
      }
    })
  }
  return defaultPhotos
})

// Photo Reel State & Smooth Carousel Logic
const currentPhotoIndex = ref(0)
let autoplayTimer: NodeJS.Timeout | null = null

// Blur-Up Loading State Tracking
const loadedImages = ref<Record<string | number, boolean>>({})
const loadedThumbs = ref<Record<string | number, boolean>>({})

const isImageLoaded = (id: string | number) => Boolean(loadedImages.value[id])
const markImageLoaded = (id: string | number) => {
  loadedImages.value[id] = true
}

const isThumbLoaded = (id: string | number) => Boolean(loadedThumbs.value[id])
const markThumbLoaded = (id: string | number) => {
  loadedThumbs.value[id] = true
}

const nextPhoto = () => {
  if (photos.value.length === 0) return
  currentPhotoIndex.value = (currentPhotoIndex.value + 1) % photos.value.length
}

const prevPhoto = () => {
  if (photos.value.length === 0) return
  currentPhotoIndex.value = (currentPhotoIndex.value - 1 + photos.value.length) % photos.value.length
}

const startAutoplay = () => {
  stopAutoplay()
  autoplayTimer = setInterval(() => {
    nextPhoto()
  }, 4500)
}

const stopAutoplay = () => {
  if (autoplayTimer) {
    clearInterval(autoplayTimer)
    autoplayTimer = null
  }
}

const pauseAutoplay = () => stopAutoplay()
const resumeAutoplay = () => startAutoplay()

onMounted(() => {
  startAutoplay()
})

onUnmounted(() => {
  stopAutoplay()
})

// Navigation & Actions
const scrollToSection = (id: string) => {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

const handlePlanVisit = () => {
  alert('Thank you for planning your visit! Our Welcome Host Team will reach out to you warmly.')
}

const openMaps = () => {
  window.open('https://maps.google.com', '_blank')
}
</script>
