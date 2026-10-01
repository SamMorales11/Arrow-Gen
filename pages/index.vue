<template>
  <div class="flex flex-col bg-background text-foreground overflow-hidden">

    <!-- ====================================================================
         1. HERO SECTION
         ==================================================================== -->
    <section class="relative min-h-screen flex items-center border-b border-zinc-900 overflow-hidden">

      <!-- Background: Retro grid texture -->
      <div class="absolute inset-0 bg-retro-grid opacity-100" aria-hidden="true" />

      <!-- Single controlled glow — positioned behind the headline, not floating everywhere -->
      <div
        class="absolute top-[-5%] left-[-10%] w-[600px] h-[600px] bg-brand-purple/15 rounded-full blur-[160px] pointer-events-none"
        aria-hidden="true"
      />

      <!-- Main content: asymmetric two-column on desktop -->
      <div class="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-0 lg:min-h-screen lg:flex lg:items-center z-10">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-0 items-center w-full">

          <!-- LEFT COLUMN: Typography & CTA (7 cols) -->
          <div class="lg:col-span-7 lg:pr-16 xl:pr-24 space-y-10">

            <!-- Movement label — simple, not rounded-pill generic -->
            <div class="hero-label">
              <span class="hero-label__dot" aria-hidden="true" />
              <span class="hero-label__text font-pixel">ARROW GENERATION MOVEMENT</span>
            </div>

            <!-- Main headline: bold typographic hierarchy, no underline gimmick -->
            <div class="space-y-4">
              <h1 class="hero-headline">
                <span class="hero-headline__line hero-headline__line--white">A Generation</span>
                <span class="hero-headline__line hero-headline__line--yellow">Sharpened</span>
                <span class="hero-headline__line hero-headline__line--muted">for Purpose.</span>
              </h1>

              <p class="hero-body">
                Like arrows in the hands of a warrior—we raise youth and young adults to live boldly, worship authentically, and transform culture through Christ-centered community.
              </p>
            </div>

            <!-- CTA buttons: clear hierarchy — primary > secondary -->
            <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                class="hero-cta hero-cta--primary"
                @click="scrollToSection('schedule')"
              >
                <span class="hero-cta__pixel-corner hero-cta__pixel-corner--tl" aria-hidden="true" />
                <span class="hero-cta__pixel-corner hero-cta__pixel-corner--tr" aria-hidden="true" />
                <span class="hero-cta__pixel-corner hero-cta__pixel-corner--bl" aria-hidden="true" />
                <span class="hero-cta__pixel-corner hero-cta__pixel-corner--br" aria-hidden="true" />
                VIEW SERVICE SCHEDULE
              </button>
              <button
                class="hero-cta hero-cta--secondary"
                @click="scrollToSection('first-time')"
              >
                FIRST TIME HERE?
              </button>
            </div>

            <!-- Conviction lines — replace stat boxes with something with actual character -->
            <div class="hero-convictions" role="list" aria-label="Our commitments">
              <div class="hero-conviction" role="listitem">
                <span class="hero-conviction__tick font-pixel" aria-hidden="true">✦</span>
                <span class="hero-conviction__text">Weekly gatherings. Genuine community.</span>
              </div>
              <div class="hero-conviction" role="listitem">
                <span class="hero-conviction__tick font-pixel" aria-hidden="true">✦</span>
                <span class="hero-conviction__text">100% Christ-centered. Zero performance.</span>
              </div>
              <div class="hero-conviction" role="listitem">
                <span class="hero-conviction__tick font-pixel" aria-hidden="true">✦</span>
                <span class="hero-conviction__text">All are welcome, exactly as they are.</span>
              </div>
            </div>
          </div>

          <!-- RIGHT COLUMN: Geometric pixel visual (5 cols) -->
          <div class="lg:col-span-5 flex items-center justify-center lg:justify-end" aria-hidden="true">
            <div class="hero-visual">
              <!-- Outer frame with pixel corners -->
              <div class="hero-visual__frame">
                <span class="hero-visual__corner hero-visual__corner--tl" />
                <span class="hero-visual__corner hero-visual__corner--tr" />
                <span class="hero-visual__corner hero-visual__corner--bl" />
                <span class="hero-visual__corner hero-visual__corner--br" />

                <!-- Inner content: stacked pixel blocks forming an abstract arrow motif -->
                <div class="hero-visual__inner">
                  <!-- Arrow shape made of pixel blocks -->
                  <div class="hero-pixel-grid">
                    <div class="hero-pixel-row">
                      <div class="hero-pixel hero-pixel--off" />
                      <div class="hero-pixel hero-pixel--off" />
                      <div class="hero-pixel hero-pixel--yellow hero-pixel--glow" />
                      <div class="hero-pixel hero-pixel--off" />
                      <div class="hero-pixel hero-pixel--off" />
                    </div>
                    <div class="hero-pixel-row">
                      <div class="hero-pixel hero-pixel--off" />
                      <div class="hero-pixel hero-pixel--yellow" />
                      <div class="hero-pixel hero-pixel--yellow hero-pixel--glow" />
                      <div class="hero-pixel hero-pixel--yellow" />
                      <div class="hero-pixel hero-pixel--off" />
                    </div>
                    <div class="hero-pixel-row">
                      <div class="hero-pixel hero-pixel--purple" />
                      <div class="hero-pixel hero-pixel--purple" />
                      <div class="hero-pixel hero-pixel--yellow hero-pixel--glow" />
                      <div class="hero-pixel hero-pixel--purple" />
                      <div class="hero-pixel hero-pixel--purple" />
                    </div>
                    <div class="hero-pixel-row">
                      <div class="hero-pixel hero-pixel--off" />
                      <div class="hero-pixel hero-pixel--off" />
                      <div class="hero-pixel hero-pixel--purple" />
                      <div class="hero-pixel hero-pixel--off" />
                      <div class="hero-pixel hero-pixel--off" />
                    </div>
                    <div class="hero-pixel-row">
                      <div class="hero-pixel hero-pixel--off" />
                      <div class="hero-pixel hero-pixel--off" />
                      <div class="hero-pixel hero-pixel--purple" />
                      <div class="hero-pixel hero-pixel--off" />
                      <div class="hero-pixel hero-pixel--off" />
                    </div>
                    <div class="hero-pixel-row">
                      <div class="hero-pixel hero-pixel--off" />
                      <div class="hero-pixel hero-pixel--off" />
                      <div class="hero-pixel hero-pixel--purple hero-pixel--dim" />
                      <div class="hero-pixel hero-pixel--off" />
                      <div class="hero-pixel hero-pixel--off" />
                    </div>
                  </div>

                  <!-- Tagline inside the frame -->
                  <div class="hero-visual__tagline">
                    <p class="font-pixel text-[10px] text-zinc-500 tracking-widest leading-relaxed text-center">
                      ARROWS ARE MADE<br/>TO BE LAUNCHED.
                    </p>
                  </div>
                </div>
              </div>

              <!-- Floating accent: verse reference -->
              <div class="hero-visual__verse">
                <span class="font-pixel text-[9px] text-brand-yellow/70">PSALM 127:4</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      <!-- Bottom edge: scroll indicator line -->
      <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30" aria-hidden="true">
        <span class="font-pixel text-[9px] text-zinc-500 tracking-widest">SCROLL</span>
        <div class="w-px h-10 bg-gradient-to-b from-zinc-500 to-transparent" />
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
         3. FIRST TIME HERE + GATHER WITH US
         v3 — Breathing-room revision: ~50% less text, scroll-reveal anim
         ==================================================================== -->
    <section class="section-reveal py-24 lg:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      
      <!-- Section Header — Compact, one punchy line -->
      <div class="reveal-child mb-14 lg:mb-20 space-y-2">
        <div class="inline-flex items-center gap-2">
          <span class="w-2 h-2 bg-brand-yellow" aria-hidden="true" />
          <span class="font-pixel text-[10px] text-brand-yellow tracking-widest uppercase">
            YOUR NEXT STEP
          </span>
        </div>
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-50 font-sans tracking-tight leading-[1.1]">
          New here? <span class="text-brand-yellow">You already belong.</span>
        </h2>
      </div>

      <!-- Two-panel asymmetric grid -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        
        <!-- LEFT: First Time Concierge (5 cols) — trimmed & airy -->
        <div id="first-time" class="reveal-child lg:col-span-5">
          <div class="relative rounded-2xl bg-zinc-950 border border-zinc-800/80 p-7 sm:p-9 space-y-8 overflow-hidden">
            
            <!-- Pixel corner accents -->
            <span class="absolute -top-px -left-px w-3 h-3 border-t-2 border-l-2 border-brand-yellow pointer-events-none" aria-hidden="true" />
            <span class="absolute -bottom-px -right-px w-3 h-3 border-b-2 border-r-2 border-brand-purple pointer-events-none" aria-hidden="true" />

            <!-- Heading -->
            <div class="space-y-3">
              <h3 class="text-xl sm:text-2xl font-bold text-zinc-50 font-sans tracking-tight leading-snug">
                No dress code. No pressure. <br class="hidden sm:block" />
                <span class="text-brand-yellow">Just come as you are.</span>
              </h3>
              <p class="text-zinc-400 text-sm leading-relaxed max-w-sm">
                A host greets you, shows you around, and makes sure your first visit feels like home.
              </p>
            </div>

            <!-- Three-line commitments — single-line each, no cards -->
            <div class="space-y-3 text-sm text-zinc-300">
              <div class="flex items-center gap-3 group">
                <span class="font-pixel text-[10px] text-brand-yellow opacity-80 group-hover:opacity-100 transition-opacity">✦</span>
                <span>Friendly welcome host at the door</span>
              </div>
              <div class="flex items-center gap-3 group">
                <span class="font-pixel text-[10px] text-purple-400 opacity-80 group-hover:opacity-100 transition-opacity">✦</span>
                <span>Modern worship &amp; real teaching</span>
              </div>
              <div class="flex items-center gap-3 group">
                <span class="font-pixel text-[10px] text-zinc-500 opacity-80 group-hover:opacity-100 transition-opacity">✦</span>
                <span>Free coffee lounge after service</span>
              </div>
            </div>

            <!-- Single CTA -->
            <div class="space-y-2 pt-2">
              <UiButton
                variant="accent"
                size="md"
                class="w-full justify-center group"
                @click="navigateTo('/first-time')"
              >
                <span>PLAN YOUR VISIT</span>
                <span class="ml-2 transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
              </UiButton>

              <p class="text-[11px] text-zinc-500 text-center">
                Free parking • Wheelchair accessible
              </p>
            </div>

          </div>
        </div>

        <!-- RIGHT: Weekly Gathering Timetable (7 cols) — condensed rows -->
        <div id="schedule" class="reveal-child lg:col-span-7">
          <div class="space-y-8">

            <!-- Schedule Header — inline -->
            <div class="flex flex-wrap items-center justify-between gap-3">
              <div class="space-y-1">
                <h3 class="text-xl sm:text-2xl font-bold text-zinc-50 font-sans tracking-tight">
                  Gather With Us
                </h3>
                <p class="text-xs text-zinc-400">
                  Three gatherings each week for every stage of life.
                </p>
              </div>

              <NuxtLink
                to="/schedule"
                class="font-pixel text-[10px] text-brand-yellow hover:text-brand-yellow-hover transition-colors inline-flex items-center gap-1.5"
              >
                <span>FULL SCHEDULE</span>
                <span aria-hidden="true">→</span>
              </NuxtLink>
            </div>

            <!-- Condensed Schedule Rows -->
            <!-- Condensed Schedule Rows -->
            <div class="space-y-3.5">
              
              <!-- Saturday Youth — Flagship (highlighted) -->
              <div class="relative rounded-xl bg-zinc-950 border-2 border-brand-purple/70 hover:border-brand-purple p-4 sm:p-5 flex items-center justify-between gap-4 transition-all duration-200 group hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brand-purple/10">
                <span class="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 border-brand-yellow pointer-events-none" aria-hidden="true" />
                
                <div class="flex items-center gap-4 sm:gap-5 flex-1 min-w-0">
                  <div class="shrink-0 w-[95px] sm:w-[105px] border-r border-zinc-800/80 pr-3">
                    <span class="font-pixel text-[9px] text-brand-yellow uppercase tracking-wider block">SATURDAY</span>
                    <span class="text-xl sm:text-2xl font-extrabold text-zinc-50 font-sans tracking-tight leading-none mt-1 block">5:00 PM</span>
                  </div>
                  <div class="min-w-0 space-y-0.5">
                    <div class="flex items-center gap-2 flex-wrap">
                      <h4 class="text-sm sm:text-base font-bold text-zinc-100 group-hover:text-brand-yellow transition-colors truncate">
                        Saturday Youth Gathering
                      </h4>
                      <span class="font-pixel text-[8px] px-1.5 py-0.5 rounded bg-brand-yellow text-black font-semibold shrink-0">
                        FLAGSHIP
                      </span>
                    </div>
                    <p class="text-xs text-zinc-400 truncate">Full-band modern praise, relevant Word &amp; coffee hangout</p>
                  </div>
                </div>

                <div class="shrink-0 flex items-center gap-2">
                  <button
                    type="button"
                    class="hidden sm:inline-flex px-3 py-1.5 rounded-lg border border-zinc-700 bg-zinc-900 hover:bg-zinc-800 text-xs font-sans text-zinc-200 hover:text-white transition-colors"
                    title="Add Saturday Youth Gathering to Google Calendar"
                    @click="handleReminder('Saturday Youth Gathering')"
                  >
                    + Calendar
                  </button>
                </div>
              </div>

              <!-- Sunday Generation -->
              <div class="relative rounded-xl bg-zinc-900/60 border border-zinc-800 hover:border-zinc-700 p-4 sm:p-5 flex items-center justify-between gap-4 transition-all duration-200 group hover:-translate-y-0.5">
                <div class="flex items-center gap-4 sm:gap-5 flex-1 min-w-0">
                  <div class="shrink-0 w-[95px] sm:w-[105px] border-r border-zinc-800/80 pr-3">
                    <span class="font-pixel text-[9px] text-purple-300 uppercase tracking-wider block">SUNDAY</span>
                    <span class="text-xl sm:text-2xl font-extrabold text-zinc-50 font-sans tracking-tight leading-none mt-1 block">9:30 AM</span>
                  </div>
                  <div class="min-w-0 space-y-0.5">
                    <div class="flex items-center gap-2 flex-wrap">
                      <h4 class="text-sm sm:text-base font-bold text-zinc-100 group-hover:text-purple-300 transition-colors truncate">
                        Sunday Generation Service
                      </h4>
                      <span class="text-[10px] text-zinc-500 font-mono">1st Service</span>
                    </div>
                    <p class="text-xs text-zinc-400 truncate">Discipleship, worship &amp; expository scripture teaching</p>
                  </div>
                </div>

                <div class="shrink-0 flex items-center gap-2">
                  <button
                    type="button"
                    class="hidden sm:inline-flex px-3 py-1.5 rounded-lg border border-zinc-800 bg-zinc-950 hover:bg-zinc-800 text-xs font-sans text-zinc-300 transition-colors"
                    title="Add Sunday Generation Service to Google Calendar"
                    @click="handleReminder('Sunday Generation Service')"
                  >
                    + Calendar
                  </button>
                </div>
              </div>

              <!-- Midweek Prayer -->
              <div class="relative rounded-xl bg-zinc-900/60 border border-zinc-800 hover:border-zinc-700 p-4 sm:p-5 flex items-center justify-between gap-4 transition-all duration-200 group hover:-translate-y-0.5">
                <div class="flex items-center gap-4 sm:gap-5 flex-1 min-w-0">
                  <div class="shrink-0 w-[95px] sm:w-[105px] border-r border-zinc-800/80 pr-3">
                    <span class="font-pixel text-[9px] text-zinc-400 uppercase tracking-wider block">WEDNESDAY</span>
                    <span class="text-xl sm:text-2xl font-extrabold text-zinc-50 font-sans tracking-tight leading-none mt-1 block">7:00 PM</span>
                  </div>
                  <div class="min-w-0 space-y-0.5">
                    <div class="flex items-center gap-2 flex-wrap">
                      <h4 class="text-sm sm:text-base font-bold text-zinc-100 group-hover:text-zinc-50 transition-colors truncate">
                        Midweek Acoustic Prayer
                      </h4>
                      <span class="text-[10px] text-zinc-500 font-mono">Intimate</span>
                    </div>
                    <p class="text-xs text-zinc-400 truncate">Intimate acoustic worship, intercession &amp; prayer support</p>
                  </div>
                </div>

                <div class="shrink-0 flex items-center gap-2">
                  <button
                    type="button"
                    class="hidden sm:inline-flex px-3 py-1.5 rounded-lg border border-zinc-800 bg-zinc-950 hover:bg-zinc-800 text-xs font-sans text-zinc-300 transition-colors"
                    title="Add Midweek Acoustic Prayer to Google Calendar"
                    @click="handleReminder('Midweek Acoustic Prayer')"
                  >
                    + Calendar
                  </button>
                </div>
              </div>

            </div>

            <!-- Location line — single row -->
            <div class="flex items-center justify-between gap-4 pt-2 border-t border-zinc-800/60 text-xs text-zinc-400">
              <div class="flex items-center gap-2">
                <svg class="w-3.5 h-3.5 text-brand-yellow shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
                <span class="text-zinc-300">Arrow Gen Hall</span>
                <span class="text-zinc-600">•</span>
                <span>Main Auditorium &amp; Chapel</span>
              </div>
              <a
                href="https://maps.google.com/?q=Arrow+Gen+Church"
                target="_blank"
                rel="noopener noreferrer"
                class="text-brand-yellow hover:text-brand-yellow-hover transition-colors font-medium inline-flex items-center gap-1 shrink-0"
              >
                Directions ↗
              </a>
            </div>

          </div>
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

// Fetch live active photos from ministry API on client (avoiding 6MB SSR payload bloat)
const { data: apiPhotosResponse } = await useFetch<PhotoApiResponse>('/api/photos', {
  lazy: true,
  server: false
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
  navigateTo('/first-time')
}

const handleReminder = (title: string) => {
  if (typeof window === 'undefined') return
  const eventTitle = encodeURIComponent(`Arrow Gen — ${title}`)
  const details = encodeURIComponent(`Join us for ${title} at Arrow Gen!\n\nDoors open 30 minutes prior with complimentary specialty coffee at the atrium barista bar.\n\nMore info: https://arrowgen.org/first-time`)
  const location = encodeURIComponent('Arrow Gen Church, Main Auditorium & Chapel')
  
  // Calculate next target date based on title
  const daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
  let targetDay = 'saturday'
  let startHour = 17
  let startMin = 0

  if (title.toLowerCase().includes('sunday')) {
    targetDay = 'sunday'
    startHour = 9
    startMin = 30
  } else if (title.toLowerCase().includes('midweek') || title.toLowerCase().includes('wednesday')) {
    targetDay = 'wednesday'
    startHour = 19
    startMin = 0
  }

  const targetDayIndex = daysOfWeek.indexOf(targetDay)
  const now = new Date()
  const targetDate = new Date()
  if (targetDayIndex !== -1) {
    const currentDayIndex = now.getDay()
    let daysUntil = (targetDayIndex - currentDayIndex + 7) % 7
    if (daysUntil === 0 && now.getHours() >= 20) {
      daysUntil = 7
    }
    targetDate.setDate(now.getDate() + daysUntil)
  }
  targetDate.setHours(startHour, startMin, 0, 0)
  const endDate = new Date(targetDate.getTime() + 90 * 60 * 1000)

  const formatGCalDate = (d: Date) => d.toISOString().replace(/-|:|\.\d\d\d/g, '')
  const dates = `${formatGCalDate(targetDate)}/${formatGCalDate(endDate)}`

  const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${eventTitle}&details=${details}&location=${location}&dates=${dates}`
  window.open(url, '_blank', 'noopener,noreferrer')
}

const openMaps = () => {
  window.open('https://maps.google.com/?q=Arrow+Gen+Church', '_blank')
}
</script>

<style scoped>
/* =============================================================================
   HERO SECTION — Arrow Gen Redesign
   Design System: Black (#0a0a0a) · Purple (#770bba) · Yellow (#f5dc20)
   Typefaces: Space Grotesk (body/headline) · Press Start 2P (pixel accents)
   Uses CSS custom properties from :root defined in main.css
   ============================================================================= */

/* ── Movement Label ─────────────────────────────────────────────────────────── */
.hero-label {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 6px 0;
  border-bottom: 1px solid var(--color-zinc-800);
}

.hero-label__dot {
  display: block;
  width: 6px;
  height: 6px;
  background-color: var(--color-yellow);
  flex-shrink: 0;
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.hero-label__text {
  font-size: 10px;
  letter-spacing: 0.18em;
  color: var(--color-zinc-400);
}

/* ── Headline ───────────────────────────────────────────────────────────────── */
.hero-headline {
  display: flex;
  flex-direction: column;
  font-weight: 800;
  line-height: 1.05;
  letter-spacing: -0.03em;
  font-size: clamp(3rem, 7vw, 5.5rem);
}

.hero-headline__line {
  display: block;
}

.hero-headline__line--white {
  color: var(--color-zinc-50);
}

.hero-headline__line--yellow {
  color: var(--color-yellow);
}

.hero-headline__line--muted {
  color: var(--color-zinc-400);
}

/* ── Body Copy ──────────────────────────────────────────────────────────────── */
.hero-body {
  max-width: 38rem;
  font-size: clamp(0.9375rem, 1.5vw, 1.0625rem);
  line-height: 1.75;
  color: var(--color-zinc-400);
}

/* ── CTA Buttons ────────────────────────────────────────────────────────────── */
.hero-cta {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 14px 28px;
  font-family: var(--font-family-pixel);
  font-size: 11px;
  letter-spacing: 0.06em;
  cursor: pointer;
  transition: background-color 0.18s ease, color 0.18s ease, border-color 0.18s ease;
  text-align: center;
  white-space: nowrap;
}

/* Primary CTA: solid yellow background with pixel bracket corners */
.hero-cta--primary {
  background-color: var(--color-yellow);
  color: var(--color-black);
  border: 2px solid var(--color-yellow);
}

.hero-cta--primary:hover {
  background-color: transparent;
  color: var(--color-yellow);
}

/* Pixel bracket corners — visible on both default and hover states */
.hero-cta__pixel-corner {
  position: absolute;
  width: 8px;
  height: 8px;
  border-color: var(--color-black);
  border-style: solid;
  transition: border-color 0.18s ease;
}

.hero-cta--primary:hover .hero-cta__pixel-corner {
  border-color: var(--color-yellow);
}

.hero-cta__pixel-corner--tl {
  top: -4px;
  left: -4px;
  border-width: 2px 0 0 2px;
}
.hero-cta__pixel-corner--tr {
  top: -4px;
  right: -4px;
  border-width: 2px 2px 0 0;
}
.hero-cta__pixel-corner--bl {
  bottom: -4px;
  left: -4px;
  border-width: 0 0 2px 2px;
}
.hero-cta__pixel-corner--br {
  bottom: -4px;
  right: -4px;
  border-width: 0 2px 2px 0;
}

/* Secondary CTA: ghost style */
.hero-cta--secondary {
  background-color: transparent;
  color: var(--color-zinc-300);
  border: 1px solid var(--color-zinc-700);
}

.hero-cta--secondary:hover {
  border-color: var(--color-zinc-500);
  color: var(--color-zinc-100);
}

/* ── Conviction Lines ───────────────────────────────────────────────────────── */
.hero-convictions {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-top: 16px;
  border-top: 1px solid var(--color-zinc-900);
}

.hero-conviction {
  display: flex;
  align-items: center;
  gap: 12px;
}

.hero-conviction__tick {
  font-size: 8px;
  color: var(--color-yellow);
  flex-shrink: 0;
  opacity: 0.8;
}

.hero-conviction__text {
  font-size: 0.875rem;
  color: var(--color-zinc-400);
  letter-spacing: 0.01em;
}

/* ── Right Column: Visual Frame ─────────────────────────────────────────────── */
.hero-visual {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.hero-visual__frame {
  position: relative;
  border: 1px solid var(--color-zinc-800);
  background: linear-gradient(135deg, rgba(119, 11, 186, 0.05) 0%, rgba(10, 10, 10, 0.92) 100%);
  padding: 48px;
}

/* Pixel corner brackets on the visual frame */
.hero-visual__corner {
  position: absolute;
  width: 16px;
  height: 16px;
  border-style: solid;
  border-color: var(--color-zinc-600);
}

.hero-visual__corner--tl {
  top: -1px;
  left: -1px;
  border-width: 2px 0 0 2px;
}
.hero-visual__corner--tr {
  top: -1px;
  right: -1px;
  border-width: 2px 2px 0 0;
}
.hero-visual__corner--bl {
  bottom: -1px;
  left: -1px;
  border-width: 0 0 2px 2px;
}
.hero-visual__corner--br {
  bottom: -1px;
  right: -1px;
  border-width: 0 2px 2px 0;
}

.hero-visual__inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
}

/* ── Pixel Grid: Abstract Arrow Motif ───────────────────────────────────────── */
.hero-pixel-grid {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.hero-pixel-row {
  display: flex;
  gap: 8px;
}

.hero-pixel {
  width: 40px;
  height: 40px;
  transition: opacity 0.3s ease;
}

.hero-pixel--off {
  background: transparent;
  border: 1px solid var(--color-zinc-900);
  opacity: 0.3;
}

.hero-pixel--yellow {
  background-color: var(--color-yellow);
  opacity: 0.85;
}

.hero-pixel--yellow.hero-pixel--glow {
  opacity: 1;
  box-shadow:
    0 0 12px var(--color-yellow),
    0 0 28px rgba(245, 220, 32, 0.4);
}

.hero-pixel--purple {
  background-color: var(--color-purple);
  opacity: 0.7;
}

.hero-pixel--purple.hero-pixel--dim {
  opacity: 0.35;
}

/* ── Visual Tagline (inside the frame) ─────────────────────────────────────── */
.hero-visual__tagline {
  border-top: 1px solid var(--color-zinc-800);
  padding-top: 20px;
  width: 100%;
}

/* ── Verse Reference (floating below frame) ─────────────────────────────────── */
.hero-visual__verse {
  margin-top: 16px;
  padding: 6px 12px;
  border: 1px solid var(--color-zinc-800);
  background-color: rgba(10, 10, 10, 0.8);
}

/* ── Responsive adjustments ─────────────────────────────────────────────────── */
@media (max-width: 1023px) {
  .hero-visual__frame {
    padding: 32px;
  }

  .hero-headline {
    font-size: clamp(2.5rem, 10vw, 3.5rem);
  }
}

@media (max-width: 768px) {
  .hero-pixel {
    width: 28px;
    height: 28px;
  }
  .hero-pixel-row {
    gap: 6px;
  }
  .hero-pixel-grid {
    gap: 6px;
  }
}

/* ── Schedule Row (Condensed Timetable) ──────────────────────────────────────── */
.schedule-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 14px 16px;
  border-radius: 12px;
  border: 1px solid var(--color-zinc-800);
  background: rgba(24, 24, 27, 0.5);
  transition: border-color 0.2s ease, background-color 0.2s ease;
}

.schedule-row:hover {
  border-color: var(--color-zinc-700);
  background: rgba(24, 24, 27, 0.8);
}

.schedule-row--featured {
  border-color: rgba(119, 11, 186, 0.3);
  background: rgba(119, 11, 186, 0.06);
}

.schedule-row--featured:hover {
  border-color: rgba(119, 11, 186, 0.5);
  background: rgba(119, 11, 186, 0.1);
}

/* ── Scroll-Reveal Animation System ──────────────────────────────────────────── */
.section-reveal .reveal-child {
  opacity: 0;
  transform: translateY(20px);
  animation: revealUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.section-reveal .reveal-child:nth-child(1) { animation-delay: 0.05s; }
.section-reveal .reveal-child:nth-child(2) { animation-delay: 0.2s; }
.section-reveal .reveal-child:nth-child(3) { animation-delay: 0.35s; }

@keyframes revealUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
