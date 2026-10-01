<template>
  <div class="min-h-screen flex flex-col bg-background text-foreground overflow-x-hidden selection:bg-brand-yellow selection:text-black">

    <!-- ====================================================================
         1. HERO: DYNAMIC RADAR BANNER
         ==================================================================== -->
    <section class="relative px-4 sm:px-6 lg:px-8 pt-16 pb-20 sm:pt-24 sm:pb-24 border-b border-zinc-900 bg-retro-grid overflow-hidden">
      <!-- Glow ambient lights (Purple & Yellow) -->
      <div
        class="absolute -top-32 left-1/3 -translate-x-1/2 w-96 sm:w-[650px] h-96 sm:h-[650px] bg-brand-purple/20 rounded-full blur-[150px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        class="absolute top-1/2 right-12 -translate-y-1/2 w-80 sm:w-[450px] h-80 sm:h-[450px] bg-brand-yellow/10 rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true"
      />

      <div class="relative max-w-5xl mx-auto text-center space-y-6 z-10">
        
        <!-- Live Ticker Pill -->
        <div class="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-zinc-800 bg-zinc-950/80 backdrop-blur-md shadow-sm">
          <span class="relative flex h-2 w-2">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-yellow opacity-75" />
            <span class="relative inline-flex rounded-full h-2 w-2 bg-brand-yellow" />
          </span>
          <span class="font-pixel text-[9px] text-zinc-300 tracking-wider uppercase">
            LIVE GATHERING RADAR <span class="text-brand-yellow">• WEEKLY &amp; MIDWEEK</span>
          </span>
        </div>

        <!-- Big Headline -->
        <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-50 font-sans leading-[1.1]">
          Find Your Room. <br class="hidden sm:inline" />
          <span class="relative inline-block text-brand-yellow">
            Gather
            <svg class="absolute -bottom-2 left-0 w-full h-2 text-brand-purple/60" viewBox="0 0 100 8" preserveAspectRatio="none" aria-hidden="true">
              <path d="M0,5 Q50,0 100,5" stroke="currentColor" stroke-width="3" fill="none" />
            </svg>
          </span>
          With Us.
        </h1>

        <!-- Crisp, modern copy -->
        <p class="max-w-2xl mx-auto text-base sm:text-lg text-zinc-300 font-sans leading-relaxed">
          Three gatherings every week for youth, students, and young professionals. High-energy worship, practical scripture, and a room full of people figuring life out together.
        </p>

        <!-- Quick Access Stat Strip -->
        <div class="pt-2 flex flex-wrap items-center justify-center gap-3 text-xs text-zinc-400">
          <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900/90 border border-zinc-800">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Doors open 30 mins prior
          </span>
          <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900/90 border border-zinc-800">
            <span class="text-brand-yellow">✦</span>
            Free Barista Coffee in Atrium
          </span>
          <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900/90 border border-zinc-800">
            <span class="text-purple-400">✦</span>
            Bilingual Subtitles (EN/ID)
          </span>
        </div>

      </div>
    </section>

    <!-- ====================================================================
         2. INTERACTIVE FILTER & TIMETABLE GRID
         ==================================================================== -->
    <section class="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-10">

      <!-- Controls Bar: Filter Pills + Quick Search -->
      <div class="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 border-b border-zinc-800/80 pb-6">
        
        <!-- Day Filter Pills -->
        <div class="flex flex-wrap items-center gap-2" role="tablist" aria-label="Schedule Filters">
          <button
            v-for="filter in filterOptions"
            :key="filter.id"
            role="tab"
            :aria-selected="activeFilter === filter.id"
            :class="[
              'px-4 py-2 rounded-xl text-xs font-sans font-medium transition-all select-none flex items-center gap-2 border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow cursor-pointer',
              activeFilter === filter.id
                ? 'bg-zinc-900 border-brand-yellow text-zinc-100 shadow-pixel-yellow font-bold'
                : 'bg-zinc-950/60 border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700'
            ]"
            @click="activeFilter = filter.id"
          >
            <span :class="['font-pixel text-[9px]', activeFilter === filter.id ? 'text-brand-yellow' : 'text-zinc-500']">
              {{ filter.badge }}
            </span>
            <span>{{ filter.label }}</span>
            <span class="text-[10px] px-1.5 py-0.2 rounded-full bg-zinc-800 text-zinc-300 font-mono">
              {{ getFilterCount(filter.id) }}
            </span>
          </button>
        </div>

        <!-- Venue Directions & First-Timer Fast Link -->
        <div class="flex items-center gap-3 shrink-0 self-end md:self-auto">
          <NuxtLink
            to="/first-time"
            class="text-xs text-brand-yellow hover:text-brand-yellow-hover font-medium flex items-center gap-1.5 transition-colors"
          >
            <span class="font-pixel text-[10px]">★</span>
            <span>First time visiting? Read our newcomer guide &rarr;</span>
          </NuxtLink>
        </div>

      </div>

      <!-- ── Loading Skeleton ── -->
      <div v-if="pending" class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div
          v-for="i in 4"
          :key="i"
          class="rounded-2xl border border-zinc-800/80 bg-zinc-950/60 p-7 space-y-6"
        >
          <div class="flex items-center justify-between">
            <UiSkeleton width="90px" height="18px" rounded="sm" />
            <UiSkeleton width="60px" height="18px" rounded="sm" />
          </div>
          <div class="space-y-3">
            <UiSkeleton width="70%" height="28px" rounded="md" />
            <UiSkeleton width="90%" height="16px" rounded="sm" />
          </div>
          <div class="pt-4 border-t border-zinc-800/80 flex items-center justify-between">
            <UiSkeleton width="120px" height="16px" rounded="sm" />
            <UiSkeleton width="100px" height="32px" rounded="md" />
          </div>
        </div>
      </div>

      <!-- ── Error State ── -->
      <UiCard
        v-else-if="fetchError"
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
          <h3 class="text-sm font-semibold text-zinc-100 font-sans">Unable to Load Live Schedules</h3>
          <p class="text-xs text-zinc-400 max-w-sm mx-auto">
            We are having trouble connecting to the schedule database right now. Please try again or reach out on WhatsApp.
          </p>
        </div>
        <div class="pt-2 flex justify-center gap-3">
          <UiButton variant="outline" size="sm" class="text-xs" @click="refresh()">
            Try Again
          </UiButton>
        </div>
      </UiCard>

      <!-- ── Empty State ── -->
      <UiCard
        v-else-if="filteredSchedules.length === 0"
        variant="default"
        padding="lg"
        class="text-center py-16 border-dashed border-zinc-800 bg-zinc-950/40 space-y-4"
      >
        <div class="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto text-zinc-500 font-pixel text-sm">
          ?
        </div>
        <div class="space-y-1">
          <h3 class="text-base font-semibold text-zinc-200 font-sans">No Gatherings Found</h3>
          <p class="text-xs text-zinc-400 max-w-sm mx-auto">
            No active gatherings matched the selected filter. Try selecting "All Gatherings" to see the full lineup.
          </p>
        </div>
        <div class="pt-2">
          <UiButton variant="outline" size="sm" @click="activeFilter = 'all'">
            Show All Gatherings
          </UiButton>
        </div>
      </UiCard>

      <!-- ── Main Schedule Grid: Bento / High-Scan Cards ── -->
      <div v-else class="space-y-8">
        
        <!-- Featured Flagship Gathering Card (If Present) -->
        <div
          v-if="featuredGathering && (activeFilter === 'all' || activeFilter === 'saturday' || activeFilter === 'weekend')"
          class="relative rounded-2xl bg-zinc-950 border-2 border-brand-purple/70 p-6 sm:p-9 shadow-2xl overflow-hidden group hover:border-brand-purple transition-all duration-300"
        >
          <!-- Pixel Corner Brackets -->
          <span class="absolute -top-px -left-px w-3.5 h-3.5 border-t-2 border-l-2 border-brand-yellow pointer-events-none" aria-hidden="true" />
          <span class="absolute -top-px -right-px w-3.5 h-3.5 border-t-2 border-r-2 border-brand-yellow pointer-events-none" aria-hidden="true" />
          <span class="absolute -bottom-px -left-px w-3.5 h-3.5 border-b-2 border-l-2 border-brand-purple pointer-events-none" aria-hidden="true" />
          <span class="absolute -bottom-px -right-px w-3.5 h-3.5 border-b-2 border-r-2 border-brand-purple pointer-events-none" aria-hidden="true" />

          <!-- Background subtle watermark text -->
          <span class="absolute right-4 -bottom-6 font-pixel text-7xl sm:text-9xl text-zinc-900/30 select-none pointer-events-none" aria-hidden="true">
            SAT
          </span>

          <div class="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <!-- Left Info (7 cols) -->
            <div class="lg:col-span-7 space-y-4">
              
              <!-- Top Badges -->
              <div class="flex flex-wrap items-center gap-2.5">
                <span class="font-pixel text-[9px] px-2.5 py-1 rounded bg-brand-yellow text-black font-bold uppercase tracking-wider">
                  FLAGSHIP GATHERING
                </span>
                <span class="text-xs text-purple-300 font-mono flex items-center gap-1.5">
                  <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Doors Open 4:30 PM WIB
                </span>
              </div>

              <!-- Big Time & Day Display -->
              <div class="space-y-1">
                <div class="flex items-baseline gap-3 flex-wrap">
                  <span class="font-pixel text-sm text-brand-yellow uppercase tracking-wider">
                    {{ featuredGathering.day }}
                  </span>
                  <span class="text-3xl sm:text-4xl font-extrabold text-zinc-50 font-sans tracking-tight">
                    {{ featuredGathering.time }}
                  </span>
                  <span class="text-xs text-zinc-500 font-mono">WIB (GMT+7)</span>
                </div>

                <h2 class="text-2xl sm:text-3xl font-extrabold text-zinc-100 font-sans tracking-tight">
                  {{ featuredGathering.title }}
                </h2>
              </div>

              <!-- Theme or Focus -->
              <p v-if="featuredGathering.theme" class="text-sm text-purple-200 leading-relaxed font-sans">
                <span class="font-pixel text-[9px] text-brand-purple mr-1.5">SERIES:</span>
                "{{ featuredGathering.theme }}"
              </p>

              <!-- Highlights / Tags -->
              <div class="flex flex-wrap items-center gap-2 pt-1 text-xs text-zinc-300">
                <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800">
                  <span class="text-brand-yellow">⚡</span> Full-Band Live Praise
                </span>
                <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800">
                  <span class="text-purple-400">☕</span> Barista Cold Brew on Us
                </span>
                <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800">
                  <span class="text-brand-yellow">👥</span> Youth &amp; Young Adults (15–35)
                </span>
              </div>

              <!-- Location line -->
              <div class="flex items-center gap-2 text-xs text-zinc-400 pt-1">
                <svg class="w-4 h-4 text-brand-yellow shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
                <span class="text-zinc-200 font-medium">{{ featuredGathering.location }}</span>
              </div>

            </div>

            <!-- Right Actions Block (5 cols) -->
            <div class="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col items-stretch justify-center gap-3 bg-zinc-900/80 p-5 sm:p-6 rounded-xl border border-zinc-800">
              
              <!-- Calendar Sync Dropdown / Buttons -->
              <div class="space-y-1.5 w-full">
                <button
                  type="button"
                  class="w-full py-3 px-4 rounded-xl bg-brand-yellow text-black font-sans text-xs font-bold shadow-pixel-purple hover:bg-brand-yellow-hover active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  @click="openGoogleCalendar(featuredGathering)"
                >
                  <span>📅 Add to Google Calendar</span>
                </button>

                <button
                  type="button"
                  class="w-full py-2 px-3 rounded-lg border border-zinc-800 bg-zinc-950 text-zinc-300 hover:text-white hover:border-zinc-700 text-[11px] font-sans flex items-center justify-center gap-1.5 transition-colors"
                  @click="downloadIcs(featuredGathering)"
                >
                  <span>Download .ICS (Apple &amp; Outlook)</span>
                </button>
              </div>

              <div class="flex items-center gap-2 w-full pt-1">
                <button
                  type="button"
                  class="flex-1 py-2 px-3 rounded-lg border border-zinc-800 bg-zinc-950 hover:bg-zinc-800 text-xs text-zinc-300 transition-colors flex items-center justify-center gap-1.5"
                  @click="openDirections(featuredGathering.location)"
                >
                  <span>📍 Directions ↗</span>
                </button>

                <button
                  type="button"
                  class="py-2 px-3 rounded-lg border border-zinc-800 bg-zinc-950 hover:bg-zinc-800 text-xs text-zinc-300 transition-colors"
                  title="Copy location address"
                  @click="copyLocation(featuredGathering.location)"
                >
                  <span>{{ copiedLocation === featuredGathering.location ? '✓ Copied' : 'Copy' }}</span>
                </button>
              </div>

            </div>

          </div>
        </div>

        <!-- Secondary Gatherings Grid (2 columns on desktop) -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            v-for="item in standardGatherings"
            :key="item.id"
            class="schedule-card group relative rounded-2xl bg-zinc-950/80 border border-zinc-800 hover:border-zinc-700 p-6 sm:p-7 flex flex-col justify-between space-y-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
          >
            <!-- Card Pixel Corner -->
            <span class="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 border-brand-purple opacity-40 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
            <span class="absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2 border-brand-yellow opacity-40 group-hover:opacity-100 transition-opacity" aria-hidden="true" />

            <div class="space-y-4">
              
              <!-- Top Row: Day + Status Badge -->
              <div class="flex items-center justify-between gap-3 border-b border-zinc-900 pb-3">
                <span class="font-pixel text-[10px] text-brand-yellow uppercase tracking-wider flex items-center gap-1.5">
                  <span class="w-1.5 h-1.5 rounded-full bg-brand-yellow" />
                  {{ item.day }}
                </span>

                <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400">
                  {{ isMidweek(item.day) ? 'MIDWEEK' : 'WEEKEND' }}
                </span>
              </div>

              <!-- Time & Title -->
              <div class="space-y-1.5">
                <p class="text-2xl sm:text-3xl font-bold text-zinc-100 font-sans tracking-tight">
                  {{ item.time }}
                </p>
                <h3 class="text-lg sm:text-xl font-bold text-zinc-50 font-sans group-hover:text-brand-yellow transition-colors">
                  {{ item.title }}
                </h3>
              </div>

              <!-- Theme or Focus -->
              <p v-if="item.theme" class="text-xs text-purple-300 font-sans leading-relaxed">
                Series: <span class="italic text-zinc-300 font-normal">"{{ item.theme }}"</span>
              </p>

              <!-- Location -->
              <div class="flex items-center gap-1.5 text-xs text-zinc-400 pt-1">
                <svg class="w-3.5 h-3.5 text-brand-yellow shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
                <span class="truncate">{{ item.location }}</span>
              </div>

            </div>

            <!-- Card Bottom Actions -->
            <div class="pt-4 border-t border-zinc-900 flex items-center justify-between gap-2.5">
              
              <div class="flex items-center gap-2">
                <button
                  type="button"
                  class="px-3 py-1.5 rounded-lg border border-zinc-800 bg-zinc-900 hover:border-zinc-700 text-xs text-zinc-200 transition-colors flex items-center gap-1.5"
                  @click="openGoogleCalendar(item)"
                >
                  <span>+ Calendar</span>
                </button>

                <button
                  type="button"
                  class="p-1.5 rounded-lg border border-zinc-800 bg-zinc-900 hover:border-zinc-700 text-xs text-zinc-400 hover:text-zinc-200 transition-colors"
                  title="Download .ics file"
                  @click="downloadIcs(item)"
                >
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </button>
              </div>

              <button
                type="button"
                class="text-xs text-brand-yellow hover:text-brand-yellow-hover font-medium flex items-center gap-1 transition-colors"
                @click="openDirections(item.location)"
              >
                <span>Directions ↗</span>
              </button>

            </div>

          </div>
        </div>

      </div>

    </section>

    <!-- ====================================================================
         3. "WHICH GATHERING FITS YOU?" — FAST MATRIX
         ==================================================================== -->
    <section class="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-zinc-950/80 border-t border-b border-zinc-900">
      <div class="max-w-6xl mx-auto space-y-12">
        
        <div class="text-center space-y-3 max-w-2xl mx-auto">
          <div class="inline-flex items-center gap-2">
            <span class="w-1.5 h-1.5 bg-brand-yellow" />
            <span class="font-pixel text-[10px] text-brand-yellow uppercase tracking-widest">
              AT A GLANCE
            </span>
          </div>
          <h2 class="text-3xl sm:text-4xl font-extrabold text-zinc-50 font-sans tracking-tight">
            Which Gathering Is Right For You?
          </h2>
          <p class="text-sm text-zinc-400 leading-relaxed">
            Every room has a distinct rhythm. Here is how to pick your best first experience.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <!-- Matrix Card 1 -->
          <div class="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-4">
            <div class="flex items-center justify-between">
              <span class="font-pixel text-[9px] text-brand-yellow bg-zinc-950 border border-zinc-800 px-2 py-0.5 rounded">
                SATURDAY 5 PM
              </span>
              <span class="text-lg">🔥</span>
            </div>
            <h3 class="text-xl font-bold text-zinc-100 font-sans">
              Youth &amp; Young Adults
            </h3>
            <p class="text-xs text-zinc-400 leading-relaxed">
              Electric worship, full band, relevant life-stage messages, and a vibrant community lounge afterparty. Best for high schoolers, uni students, and 20s–30s creatives.
            </p>
            <div class="pt-2 border-t border-zinc-800/80 text-[11px] text-zinc-500 font-mono">
              Vibe: Loud, Energetic, Communal
            </div>
          </div>

          <!-- Matrix Card 2 -->
          <div class="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-4">
            <div class="flex items-center justify-between">
              <span class="font-pixel text-[9px] text-purple-300 bg-zinc-950 border border-zinc-800 px-2 py-0.5 rounded">
                SUNDAY 9:30 AM
              </span>
              <span class="text-lg">☀️</span>
            </div>
            <h3 class="text-xl font-bold text-zinc-100 font-sans">
              Generation Service
            </h3>
            <p class="text-xs text-zinc-400 leading-relaxed">
              Warm Sunday morning atmosphere, deep verse-by-verse scripture teaching, acoustic &amp; contemporary praise. Children and family rooms available next door.
            </p>
            <div class="pt-2 border-t border-zinc-800/80 text-[11px] text-zinc-500 font-mono">
              Vibe: Grounded, Reflective, Warm
            </div>
          </div>

          <!-- Matrix Card 3 -->
          <div class="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-4">
            <div class="flex items-center justify-between">
              <span class="font-pixel text-[9px] text-zinc-300 bg-zinc-950 border border-zinc-800 px-2 py-0.5 rounded">
                MIDWEEK 7 PM
              </span>
              <span class="text-lg">🕯️</span>
            </div>
            <h3 class="text-xl font-bold text-zinc-100 font-sans">
              Acoustic Prayer Circle
            </h3>
            <p class="text-xs text-zinc-400 leading-relaxed">
              Quiet candlelight, intimate unhurried acoustic worship, personal prayer, and pastoral support. A peaceful sanctuary to reset in the middle of a frantic week.
            </p>
            <div class="pt-2 border-t border-zinc-800/80 text-[11px] text-zinc-500 font-mono">
              Vibe: Intimate, Restorative, Quiet
            </div>
          </div>

        </div>

      </div>
    </section>

    <!-- ====================================================================
         4. VENUE & LOGISTICS STRIP
         ==================================================================== -->
    <section class="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
      <div class="rounded-2xl border-2 border-zinc-800 bg-zinc-950 p-7 sm:p-10 space-y-8">
        
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-zinc-900 pb-6">
          <div class="space-y-1">
            <span class="font-pixel text-[9px] text-brand-yellow uppercase tracking-wider block">
              VENUE LOGISTICS
            </span>
            <h3 class="text-2xl font-bold text-zinc-100 font-sans">
              Arrow Gen Campus &amp; Hall
            </h3>
          </div>

          <div class="flex items-center gap-3">
            <button
              type="button"
              class="px-4 py-2 rounded-xl bg-brand-yellow text-black font-sans text-xs font-bold hover:bg-brand-yellow-hover transition-colors shadow-sm"
              @click="openDirections('Arrow Gen Church')"
            >
              Open in Google Maps ↗
            </button>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-zinc-300">
          <div class="space-y-2 p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
            <span class="text-brand-yellow font-pixel text-xs block">🅿️ PARKING</span>
            <p class="text-zinc-400 leading-relaxed">
              100% free secure basement &amp; surface parking with attendants on duty for all services.
            </p>
          </div>

          <div class="space-y-2 p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
            <span class="text-purple-400 font-pixel text-xs block">🎧 TRANSLATION</span>
            <p class="text-zinc-400 leading-relaxed">
              Live English &amp; Indonesian subtitle screens plus audio translation headphones at the sound booth.
            </p>
          </div>

          <div class="space-y-2 p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
            <span class="text-brand-yellow font-pixel text-xs block">☕ BARISTA BAR</span>
            <p class="text-zinc-400 leading-relaxed">
              Free espresso, cold brew, and matcha available 30 minutes before and after every gathering.
            </p>
          </div>
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
  title: 'Gathering Schedule — Weekly Services & Youth Gatherings',
  ogTitle: 'Gathering Schedule — Arrow Gen Services & Gatherings',
  description: 'Explore the weekly gathering schedule of Arrow Gen Youth & Young Adults. Saturday Youth, Sunday Generation, and Midweek Acoustic Prayer.',
  ogDescription: 'Find service times, locations, and directions for Arrow Gen youth services, prayer nights, and community gatherings.',
  ogImage: '/logo-arrow.png',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Gathering Schedule — Arrow Gen',
  twitterDescription: 'Join us for worship, community, and transformative fellowship this week.',
  twitterImage: '/logo-arrow.png'
})

useHead({
  htmlAttrs: { lang: 'en' }
})

// ─── Types ────────────────────────────────────────────────────────────────────
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

interface PublicSchedulesResponse {
  success: boolean
  total: number
  data: ScheduleItem[]
}

// ─── Fetch live data from public API ──────────────────────────────────────────
const { data: apiResponse, pending, error: fetchError, refresh } = await useFetch<PublicSchedulesResponse>(
  '/api/schedules/public',
  {
    dedupe: 'cancel'
  }
)

// Fallback curated showcase items if the database has not yet been seeded
const defaultSchedules: ScheduleItem[] = [
  {
    id: 'default-sat-youth',
    title: 'Saturday Youth Gathering',
    day: 'Saturday',
    time: '5:00 PM',
    location: 'Arrow Gen Main Auditorium • Level 2',
    theme: 'Sharpened: Bold Faith in Modern Culture',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'default-sun-gen',
    title: 'Sunday Generation Service',
    day: 'Sunday',
    time: '9:30 AM',
    location: 'Arrow Gen Main Auditorium • Level 2',
    theme: 'Rooted: Unshakeable Foundations',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'default-sun-noon',
    title: 'Sunday Second Gathering',
    day: 'Sunday',
    time: '11:30 AM',
    location: 'Arrow Gen Main Auditorium • Level 2',
    theme: 'Contemporary Worship & Practical Word',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'default-wed-prayer',
    title: 'Midweek Acoustic Prayer & Worship',
    day: 'Wednesday',
    time: '7:00 PM',
    location: 'Arrow Gen Chapel & Community Lounge',
    theme: 'Intimate Intercession & Quiet Space',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
]

// Computed live list (uses DB items if present, otherwise default showcase)
const schedules = computed<ScheduleItem[]>(() => {
  const dbData = apiResponse.value?.data
  if (dbData && dbData.length > 0) {
    return dbData
  }
  return defaultSchedules
})

// ─── Filters & Search ─────────────────────────────────────────────────────────
const activeFilter = ref<'all' | 'weekend' | 'saturday' | 'sunday' | 'midweek'>('all')

const filterOptions = [
  { id: 'all' as const, label: 'All Gatherings', badge: 'ALL' },
  { id: 'weekend' as const, label: 'Weekend', badge: 'WKND' },
  { id: 'saturday' as const, label: 'Saturday', badge: 'SAT' },
  { id: 'sunday' as const, label: 'Sunday', badge: 'SUN' },
  { id: 'midweek' as const, label: 'Midweek', badge: 'MID' }
]

const isMidweek = (day: string) => {
  const lower = day.toLowerCase()
  return lower.includes('wed') || lower.includes('rabu') || lower.includes('thu') || lower.includes('kamis') || lower.includes('tue') || lower.includes('selasa') || lower.includes('mon') || lower.includes('senin') || lower.includes('fri') || lower.includes('jumat')
}

const isWeekend = (day: string) => {
  const lower = day.toLowerCase()
  return lower.includes('sat') || lower.includes('sabtu') || lower.includes('sun') || lower.includes('minggu')
}

const getFilterCount = (filterId: typeof activeFilter.value) => {
  if (filterId === 'all') return schedules.value.length
  if (filterId === 'weekend') return schedules.value.filter(s => isWeekend(s.day)).length
  if (filterId === 'saturday') return schedules.value.filter(s => s.day.toLowerCase().includes('sat') || s.day.toLowerCase().includes('sabtu')).length
  if (filterId === 'sunday') return schedules.value.filter(s => s.day.toLowerCase().includes('sun') || s.day.toLowerCase().includes('minggu')).length
  if (filterId === 'midweek') return schedules.value.filter(s => isMidweek(s.day)).length
  return 0
}

const filteredSchedules = computed(() => {
  const list = schedules.value
  if (activeFilter.value === 'all') return list
  if (activeFilter.value === 'weekend') return list.filter(s => isWeekend(s.day))
  if (activeFilter.value === 'saturday') return list.filter(s => s.day.toLowerCase().includes('sat') || s.day.toLowerCase().includes('sabtu'))
  if (activeFilter.value === 'sunday') return list.filter(s => s.day.toLowerCase().includes('sun') || s.day.toLowerCase().includes('minggu'))
  if (activeFilter.value === 'midweek') return list.filter(s => isMidweek(s.day))
  return list
})

// Featured gathering: usually the Saturday Youth gathering or the first item
const featuredGathering = computed(() => {
  return schedules.value.find(s => s.day.toLowerCase().includes('sat') || s.day.toLowerCase().includes('sabtu')) || schedules.value[0]
})

// Standard gatherings (non-featured or other list)
const standardGatherings = computed(() => {
  if (activeFilter.value === 'all' || activeFilter.value === 'saturday' || activeFilter.value === 'weekend') {
    return filteredSchedules.value.filter(s => s.id !== featuredGathering.value?.id)
  }
  return filteredSchedules.value
})

// ─── Calendar Sync Utilities ──────────────────────────────────────────────────
const openGoogleCalendar = (item: ScheduleItem) => {
  const title = encodeURIComponent(`Arrow Gen — ${item.title}`)
  const details = encodeURIComponent(
    `Join us for ${item.title} at Arrow Gen!\n\n` +
    (item.theme ? `Current Series: "${item.theme}"\n` : '') +
    `Doors open 30 minutes prior with complimentary specialty coffee at the atrium barista bar.\n\n` +
    `Venue: ${item.location}\n` +
    `More info: https://arrowgen.org/first-time`
  )
  const location = encodeURIComponent(`Arrow Gen Church, ${item.location}`)

  // Calculate upcoming target date
  const daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
  const targetDayIndex = daysOfWeek.findIndex(d => item.day.toLowerCase().includes(d.slice(0, 3)))
  
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

  // Parse time (e.g. "5:00 PM" or "17:00")
  let startHour = 17
  let startMin = 0
  const timeStr = item.time.toUpperCase()
  const isPM = timeStr.includes('PM')
  const match = timeStr.match(/(\d+)(?::(\d+))?/)
  if (match) {
    let h = parseInt(match[1], 10)
    if (isPM && h < 12) h += 12
    if (!isPM && timeStr.includes('AM') && h === 12) h = 0
    startHour = h
    startMin = match[2] ? parseInt(match[2], 10) : 0
  }

  targetDate.setHours(startHour, startMin, 0, 0)
  const endDate = new Date(targetDate.getTime() + 90 * 60 * 1000)

  const formatGCalDate = (d: Date) => d.toISOString().replace(/-|:|\.\d\d\d/g, '')
  const dates = `${formatGCalDate(targetDate)}/${formatGCalDate(endDate)}`

  const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${dates}`
  window.open(url, '_blank', 'noopener,noreferrer')
}

const downloadIcs = (item: ScheduleItem) => {
  const cleanTitle = item.title.replace(/[^\w\s-]/g, '')
  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Arrow Gen//Gathering Schedule//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `SUMMARY:Arrow Gen — ${item.title}`,
    `LOCATION:${item.location}`,
    `DESCRIPTION:${item.theme ? 'Series: ' + item.theme + '. ' : ''}Join us at Arrow Gen. Doors open 30 mins prior with free coffee.`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n')

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', `${cleanTitle.toLowerCase().replace(/\s+/g, '-')}.ics`)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

// ─── Location & Directions Utilities ──────────────────────────────────────────
const copiedLocation = ref('')

const copyLocation = async (loc: string) => {
  try {
    await navigator.clipboard.writeText(`Arrow Gen Church, ${loc}`)
    copiedLocation.value = loc
    setTimeout(() => {
      copiedLocation.value = ''
    }, 2500)
  } catch {
    copiedLocation.value = loc
  }
}

const openDirections = (location: string) => {
  const query = encodeURIComponent(`Arrow Gen Church ${location}`)
  window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank', 'noopener,noreferrer')
}
</script>

<style scoped>
.schedule-card {
  transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1),
              border-color 0.2s cubic-bezier(0.16, 1, 0.3, 1),
              box-shadow 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}
</style>
