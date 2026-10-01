<template>
  <div class="min-h-screen flex flex-col bg-background text-foreground overflow-x-hidden selection:bg-brand-yellow selection:text-black">

    <!-- ====================================================================
         1. HERO SECTION: THE RADICAL WELCOME + INTERACTIVE VISITOR PASS
         ==================================================================== -->
    <section class="relative px-4 sm:px-6 lg:px-8 pt-16 pb-20 sm:pt-24 sm:pb-28 border-b border-zinc-900 bg-retro-grid overflow-hidden">
      <!-- Glow ambient light (Dual Purple & Yellow) -->
      <div
        class="absolute -top-32 left-1/4 -translate-x-1/2 w-96 sm:w-[620px] h-96 sm:h-[620px] bg-brand-purple/20 rounded-full blur-[150px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        class="absolute top-1/2 right-10 -translate-y-1/2 w-72 sm:w-[420px] h-72 sm:h-[420px] bg-brand-yellow/10 rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true"
      />

      <div class="relative max-w-6xl mx-auto z-10">
        
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          <!-- LEFT: Human, Disarming Copy (7 cols) -->
          <div class="lg:col-span-7 space-y-7 text-center lg:text-left">
            
            <!-- Live Protocol Badge -->
            <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-zinc-800 bg-zinc-950/80 backdrop-blur-md">
              <span class="relative flex h-2 w-2">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-yellow opacity-75" />
                <span class="relative inline-flex rounded-full h-2 w-2 bg-brand-yellow" />
              </span>
              <span class="font-pixel text-[9px] text-zinc-300 tracking-wider uppercase">
                FIRST-TIMER PROTOCOL <span class="text-brand-yellow">• 100% WELCOME</span>
              </span>
            </div>

            <!-- Big Main Headline -->
            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-50 font-sans leading-[1.1]">
              First time here? <br />
              <span class="relative inline-block text-brand-yellow">
                Relax.
                <!-- Underline doodle pixel style -->
                <svg class="absolute -bottom-2 left-0 w-full h-2 text-brand-purple/60" viewBox="0 0 100 8" preserveAspectRatio="none" aria-hidden="true">
                  <path d="M0,5 Q50,0 100,5" stroke="currentColor" stroke-width="3" fill="none" />
                </svg>
              </span>
              You already belong.
            </h1>

            <!-- Snappy, Human, Anti-Awkward Copy -->
            <p class="text-base sm:text-lg text-zinc-300 font-sans leading-relaxed max-w-xl mx-auto lg:mx-0">
              Visiting a new church can feel intimidating, awkward, or weird. So we got rid of the weird stuff:
              <strong class="text-zinc-100 font-semibold">no secret dress codes</strong>, 
              <strong class="text-zinc-100 font-semibold">no forced introductions</strong>, and 
              <strong class="text-zinc-100 font-semibold">zero awkward spotlights</strong>. Just good humans, real worship, and free artisan coffee.
            </p>

            <!-- Quick Pill Perks -->
            <div class="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1 text-xs text-zinc-400">
              <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-zinc-900/80 border border-zinc-800">
                <span class="text-brand-yellow">✦</span> 100% Free Specialty Coffee
              </span>
              <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-zinc-900/80 border border-zinc-800">
                <span class="text-purple-400">✦</span> Casual Clothes Only
              </span>
              <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-zinc-900/80 border border-zinc-800">
                <span class="text-brand-yellow">✦</span> Sit Anywhere You Like
              </span>
            </div>

            <!-- Primary CTAs -->
            <div class="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <UiButton
                variant="accent"
                size="lg"
                class="w-full sm:w-auto font-sans font-bold tracking-tight shadow-pixel-purple"
                @click="scrollToSection('timeline')"
              >
                <span>See What to Expect</span>
                <span class="ml-2 font-pixel text-xs" aria-hidden="true">↓</span>
              </UiButton>

              <UiButton
                variant="outline"
                size="lg"
                class="w-full sm:w-auto border-zinc-700 hover:border-zinc-500 font-sans"
                @click="scrollToSection('concierge')"
              >
                <span>Have a Host Meet You</span>
                <span class="ml-2 font-pixel text-xs text-brand-yellow" aria-hidden="true">→</span>
              </UiButton>
            </div>

          </div>

          <!-- RIGHT: Interactive Digital VIP Guest Pass (5 cols) -->
          <div class="lg:col-span-5 flex justify-center">
            <div class="relative w-full max-w-md">
              
              <!-- Subtle decorative backing frame -->
              <div class="absolute -inset-1 bg-gradient-to-r from-brand-purple via-zinc-800 to-brand-yellow rounded-2xl blur-sm opacity-50 transition duration-500 group-hover:opacity-100" />
              
              <!-- The Ticket / Pass Card -->
              <div class="relative rounded-2xl bg-zinc-950 border-2 border-zinc-800 p-6 sm:p-7 shadow-2xl text-left overflow-hidden">
                
                <!-- Ticket Pixel Corners -->
                <span class="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-brand-yellow" aria-hidden="true" />
                <span class="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-brand-yellow" aria-hidden="true" />
                <span class="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-brand-purple" aria-hidden="true" />
                <span class="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-brand-purple" aria-hidden="true" />

                <!-- Pass Header -->
                <div class="flex items-center justify-between border-b border-dashed border-zinc-800 pb-4">
                  <div class="space-y-0.5">
                    <span class="font-pixel text-[9px] text-brand-purple tracking-widest uppercase">
                      ARROW COMMUNITY PASS
                    </span>
                    <h2 class="text-lg font-bold text-zinc-100 font-sans tracking-tight">
                      First-Timer Access
                    </h2>
                  </div>

                  <div class="text-right">
                    <span class="inline-block font-pixel text-[8px] bg-brand-yellow text-black font-semibold px-2 py-0.5 rounded-sm">
                      PASS #001
                    </span>
                    <span class="block text-[10px] text-zinc-500 font-mono mt-0.5">ZERO PRESSURE</span>
                  </div>
                </div>

                <!-- Perforated notch circle on sides -->
                <div class="absolute -left-3 top-20 w-6 h-6 rounded-full bg-background border border-zinc-800" aria-hidden="true" />
                <div class="absolute -right-3 top-20 w-6 h-6 rounded-full bg-background border border-zinc-800" aria-hidden="true" />

                <!-- Pass Perks List -->
                <div class="py-5 space-y-3">
                  <div class="text-[11px] font-pixel text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                    <span class="text-brand-yellow">▶</span> INCLUDED GUEST PRIVILEGES:
                  </div>

                  <div class="space-y-2 text-xs text-zinc-300">
                    <div class="flex items-start gap-2.5 p-2 rounded-lg bg-zinc-900/60 border border-zinc-800/80">
                      <span class="text-emerald-400 font-mono text-sm leading-none mt-0.5">✓</span>
                      <div>
                        <strong class="text-zinc-100 font-medium">Free Specialty Barista Coffee:</strong>
                        <span class="text-zinc-400 block text-[11px]">Espresso, cold brew, or iced matcha at the atrium bar.</span>
                      </div>
                    </div>

                    <div class="flex items-start gap-2.5 p-2 rounded-lg bg-zinc-900/60 border border-zinc-800/80">
                      <span class="text-emerald-400 font-mono text-sm leading-none mt-0.5">✓</span>
                      <div>
                        <strong class="text-zinc-100 font-medium">Zero Call-Out Guarantee:</strong>
                        <span class="text-zinc-400 block text-[11px]">No standing up, no mics, no awkward moments.</span>
                      </div>
                    </div>

                    <div class="flex items-start gap-2.5 p-2 rounded-lg bg-zinc-900/60 border border-zinc-800/80">
                      <span class="text-emerald-400 font-mono text-sm leading-none mt-0.5">✓</span>
                      <div>
                        <strong class="text-zinc-100 font-medium">Welcome Gift Pack:</strong>
                        <span class="text-zinc-400 block text-[11px]">Stickers, journal, and treats at the "Start Here" desk.</span>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Interactive Pass Action -->
                <div class="pt-2 border-t border-dashed border-zinc-800 space-y-3">
                  <button
                    type="button"
                    class="w-full py-3 px-4 rounded-xl border border-brand-purple/60 bg-brand-purple/20 hover:bg-brand-purple/30 text-purple-200 font-sans text-xs font-semibold flex items-center justify-between transition-all group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow"
                    @click="handleClaimPass"
                  >
                    <span class="flex items-center gap-2">
                      <span class="font-pixel text-[10px] text-brand-yellow">★</span>
                      <span>{{ passClaimed ? 'PASS CLAIMED! SHOW AT DOOR' : 'TAP TO ACTIVATE YOUR PASS' }}</span>
                    </span>
                    <span class="font-pixel text-[10px] group-hover:translate-x-1 transition-transform">
                      {{ passClaimed ? '✓' : 'CLAIM →' }}
                    </span>
                  </button>

                  <p v-if="passClaimed" class="text-[11px] text-emerald-400 text-center font-medium animate-fade-in">
                    🎉 Awesome! Show this screen to any host at the Start Here desk.
                  </p>
                  <p v-else class="text-[10px] text-zinc-500 text-center font-mono">
                    No sign-up or download needed. Valid this upcoming weekend.
                  </p>
                </div>

              </div>
            </div>
          </div>

        </div>

      </div>
    </section>

    <!-- ====================================================================
         2. THE 4 ZERO-PRESSURE PROMISES (KILLING FIRST-TIMER ANXIETY)
         ==================================================================== -->
    <section class="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
      <div class="space-y-12">
        
        <!-- Header -->
        <div class="text-center space-y-3 max-w-2xl mx-auto">
          <div class="inline-flex items-center gap-2">
            <span class="w-1.5 h-1.5 bg-brand-yellow" />
            <span class="font-pixel text-[10px] text-brand-yellow uppercase tracking-widest">
              PEACE OF MIND
            </span>
          </div>
          <h2 class="text-3xl sm:text-4xl font-extrabold text-zinc-50 font-sans tracking-tight">
            Our 4 Promises to Every First-Timer
          </h2>
          <p class="text-sm text-zinc-400 leading-relaxed">
            We remember what it felt like walking into church for the first time. Here is what we will never do to you.
          </p>
        </div>

        <!-- 4 Cards Grid with Pixel Accents -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          
          <!-- Promise 1 -->
          <div class="promise-card group">
            <div class="promise-card__badge">
              <span class="font-pixel text-[9px] text-brand-yellow">01</span>
              <span class="text-[10px] text-zinc-500 font-mono">NO CALL-OUTS</span>
            </div>
            <div class="space-y-2">
              <h3 class="text-lg font-bold text-zinc-100 font-sans group-hover:text-brand-yellow transition-colors">
                Never Put On The Spot
              </h3>
              <p class="text-xs text-zinc-400 leading-relaxed">
                You will never be asked to stand up, raise your hand, introduce yourself, or read out loud. Feel free to stay 100% anonymous.
              </p>
            </div>
            <div class="promise-card__tag">
              Introvert Friendly
            </div>
          </div>

          <!-- Promise 2 -->
          <div class="promise-card group">
            <div class="promise-card__badge">
              <span class="font-pixel text-[9px] text-purple-400">02</span>
              <span class="text-[10px] text-zinc-500 font-mono">NO DRESS CODE</span>
            </div>
            <div class="space-y-2">
              <h3 class="text-lg font-bold text-zinc-100 font-sans group-hover:text-purple-300 transition-colors">
                Hoodies &amp; Sneakers Welcome
              </h3>
              <p class="text-xs text-zinc-400 leading-relaxed">
                Most of us wear jeans, oversized tees, hoodies, or sneakers. Wear whatever makes you feel confident and comfortable.
              </p>
            </div>
            <div class="promise-card__tag">
              Come As You Are
            </div>
          </div>

          <!-- Promise 3 -->
          <div class="promise-card group">
            <div class="promise-card__badge">
              <span class="font-pixel text-[9px] text-brand-yellow">03</span>
              <span class="text-[10px] text-zinc-500 font-mono">NO MONEY TALK</span>
            </div>
            <div class="space-y-2">
              <h3 class="text-lg font-bold text-zinc-100 font-sans group-hover:text-brand-yellow transition-colors">
                Keep Your Wallet Put Away
              </h3>
              <p class="text-xs text-zinc-400 leading-relaxed">
                As our guest, you don't give a cent. Financial giving is strictly for regulars who call Arrow Gen home. Today is entirely our treat.
              </p>
            </div>
            <div class="promise-card__tag">
              Zero Obligation
            </div>
          </div>

          <!-- Promise 4 -->
          <div class="promise-card group">
            <div class="promise-card__badge">
              <span class="font-pixel text-[9px] text-purple-400">04</span>
              <span class="text-[10px] text-zinc-500 font-mono">BARISTA BAR</span>
            </div>
            <div class="space-y-2">
              <h3 class="text-lg font-bold text-zinc-100 font-sans group-hover:text-purple-300 transition-colors">
                Handcrafted Coffee on Us
              </h3>
              <p class="text-xs text-zinc-400 leading-relaxed">
                No bad lukewarm drip coffee. Hand-pulled espresso, specialty lattes, and artisan cold brew are served right in the atrium.
              </p>
            </div>
            <div class="promise-card__tag">
              100% Free Drinks
            </div>
          </div>

        </div>

      </div>
    </section>

    <!-- ====================================================================
         3. INTERACTIVE SUNDAY TIMELINE: STEP-BY-STEP MAP
         ==================================================================== -->
    <section id="timeline" class="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-zinc-950/80 border-t border-b border-zinc-900">
      <div class="max-w-5xl mx-auto space-y-12">
        
        <!-- Header -->
        <div class="text-center space-y-3 max-w-2xl mx-auto">
          <div class="inline-flex items-center gap-2">
            <span class="w-1.5 h-1.5 bg-brand-purple" />
            <span class="font-pixel text-[10px] text-brand-purple uppercase tracking-widest">
              CLEAR ROADMAP
            </span>
          </div>
          <h2 class="text-3xl sm:text-4xl font-extrabold text-zinc-50 font-sans tracking-tight">
            What Your Sunday Actually Looks Like
          </h2>
          <p class="text-sm text-zinc-400 leading-relaxed">
            Click through the timeline so you know exactly where to go from the second your tires hit the parking lot.
          </p>
        </div>

        <!-- Interactive Stepper Tabs -->
        <div class="flex flex-wrap items-center justify-center gap-2 sm:gap-3" role="tablist" aria-label="Sunday Steps">
          <button
            v-for="(step, idx) in steps"
            :key="step.number"
            role="tab"
            :aria-selected="activeStepIndex === idx"
            :class="[
              'px-4 py-2.5 rounded-xl text-xs font-sans font-medium transition-all select-none flex items-center gap-2.5 border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow',
              activeStepIndex === idx
                ? 'bg-zinc-900 border-brand-yellow text-zinc-100 shadow-pixel-yellow'
                : 'bg-zinc-950/60 border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700'
            ]"
            @click="activeStepIndex = idx"
          >
            <span :class="['font-pixel text-[9px]', activeStepIndex === idx ? 'text-brand-yellow' : 'text-zinc-500']">
              {{ step.number }}
            </span>
            <span class="font-bold">{{ step.tabLabel }}</span>
          </button>
        </div>

        <!-- Active Step Card: High-Impact Visual Display -->
        <div class="relative rounded-2xl bg-zinc-900/90 border border-zinc-800 p-6 sm:p-10 overflow-hidden shadow-2xl transition-all">
          
          <!-- Background pixel watermark -->
          <div class="absolute -right-6 -bottom-8 font-pixel text-8xl text-zinc-800/20 select-none pointer-events-none" aria-hidden="true">
            {{ activeStep.number }}
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            <!-- Left Info (7 cols) -->
            <div class="lg:col-span-7 space-y-5">
              
              <div class="flex items-center gap-3">
                <span class="font-pixel text-[10px] text-brand-yellow bg-zinc-950 border border-zinc-800 px-3 py-1 rounded">
                  STEP {{ activeStep.number }} OF 04
                </span>
                <span class="text-xs text-zinc-400 font-mono flex items-center gap-1.5">
                  <span class="w-1.5 h-1.5 rounded-full bg-brand-purple" />
                  {{ activeStep.timing }}
                </span>
              </div>

              <h3 class="text-2xl sm:text-3xl font-extrabold text-zinc-100 font-sans tracking-tight">
                {{ activeStep.title }}
              </h3>

              <p class="text-sm sm:text-base text-zinc-300 font-sans leading-relaxed">
                {{ activeStep.description }}
              </p>

              <!-- Pro-tip Box -->
              <div class="p-4 rounded-xl border border-zinc-800/80 bg-zinc-950/70 space-y-1">
                <div class="flex items-center gap-2">
                  <span class="font-pixel text-[9px] text-brand-yellow">PRO-TIP</span>
                  <span class="text-[11px] font-semibold text-zinc-300">Newcomer Insider Advice</span>
                </div>
                <p class="text-xs text-zinc-400 leading-relaxed pl-1">
                  {{ activeStep.protip }}
                </p>
              </div>

              <!-- Navigation Mini Buttons -->
              <div class="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  :disabled="activeStepIndex === 0"
                  class="px-3.5 py-1.5 rounded-lg border border-zinc-800 bg-zinc-950 text-xs text-zinc-300 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
                  @click="activeStepIndex--"
                >
                  &larr; Previous Step
                </button>
                <button
                  type="button"
                  :disabled="activeStepIndex === steps.length - 1"
                  class="px-3.5 py-1.5 rounded-lg border border-zinc-700 bg-zinc-800 hover:bg-zinc-700 text-xs text-zinc-100 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                  @click="activeStepIndex++"
                >
                  Next Step &rarr;
                </button>
              </div>

            </div>

            <!-- Right Graphic / Highlights (5 cols) -->
            <div class="lg:col-span-5 bg-zinc-950/90 rounded-xl border border-zinc-800/90 p-6 space-y-4">
              <span class="font-pixel text-[9px] text-brand-purple block uppercase tracking-wider">
                AT A GLANCE
              </span>

              <ul class="space-y-3 text-xs text-zinc-300">
                <li v-for="(item, i) in activeStep.bullets" :key="i" class="flex items-start gap-2.5">
                  <span class="font-pixel text-[9px] text-brand-yellow mt-0.5">✦</span>
                  <span class="leading-relaxed">{{ item }}</span>
                </li>
              </ul>

              <div class="pt-2 border-t border-zinc-900 flex items-center justify-between text-[11px] text-zinc-500">
                <span>Location: {{ activeStep.location }}</span>
                <span>Duration: {{ activeStep.duration }}</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>

    <!-- ====================================================================
         4. "CHOOSE YOUR VIBE" — EMPATHETIC PERSONALIZATION
         ==================================================================== -->
    <section class="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
      <div class="space-y-12">
        
        <div class="text-center space-y-3 max-w-2xl mx-auto">
          <div class="inline-flex items-center gap-2">
            <span class="w-1.5 h-1.5 bg-brand-yellow" />
            <span class="font-pixel text-[10px] text-brand-yellow uppercase tracking-widest">
              CUSTOM EXPERIENCE
            </span>
          </div>
          <h2 class="text-3xl sm:text-4xl font-extrabold text-zinc-50 font-sans tracking-tight">
            How Do You Prefer to Visit?
          </h2>
          <p class="text-sm text-zinc-400 leading-relaxed">
            Different people recharge differently. Choose your social vibe and see how we accommodate you.
          </p>
        </div>

        <!-- 3 Interactive Vibe Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          <button
            v-for="vibe in vibes"
            :key="vibe.id"
            type="button"
            :aria-pressed="selectedVibeId === vibe.id"
            :class="[
              'text-left p-6 rounded-2xl border transition-all relative flex flex-col justify-between space-y-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow cursor-pointer',
              selectedVibeId === vibe.id
                ? 'bg-zinc-900 border-brand-yellow shadow-pixel-yellow'
                : 'bg-zinc-950/70 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/50'
            ]"
            @click="selectedVibeId = vibe.id"
          >
            <!-- Pixel Corner Accent when active -->
            <span v-if="selectedVibeId === vibe.id" class="absolute -top-px -left-px w-2.5 h-2.5 border-t-2 border-l-2 border-brand-yellow" aria-hidden="true" />
            <span v-if="selectedVibeId === vibe.id" class="absolute -bottom-px -right-px w-2.5 h-2.5 border-b-2 border-r-2 border-brand-yellow" aria-hidden="true" />

            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <span class="text-2xl" role="img" :aria-label="vibe.title">{{ vibe.emoji }}</span>
                <span :class="['font-pixel text-[8px] px-2 py-0.5 rounded', selectedVibeId === vibe.id ? 'bg-brand-yellow text-black' : 'bg-zinc-900 text-zinc-400']">
                  {{ vibe.badge }}
                </span>
              </div>

              <h3 class="text-lg font-bold text-zinc-100 font-sans">
                {{ vibe.title }}
              </h3>

              <p class="text-xs text-zinc-400 leading-relaxed">
                "{{ vibe.quote }}"
              </p>
            </div>

            <!-- Our Strategy for this vibe -->
            <div class="pt-4 border-t border-zinc-800/80 space-y-1.5">
              <span class="font-pixel text-[9px] text-purple-400 uppercase block">OUR GAMEPLAN:</span>
              <p class="text-xs text-zinc-300 leading-relaxed">
                {{ vibe.gameplan }}
              </p>
            </div>
          </button>

        </div>

      </div>
    </section>

    <!-- ====================================================================
         5. "NO STUPID QUESTIONS" — THE ACCORDION FAQ
         ==================================================================== -->
    <section class="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-zinc-950/70 border-t border-b border-zinc-900">
      <div class="max-w-3xl mx-auto space-y-10">
        
        <div class="text-center space-y-3">
          <div class="inline-flex items-center gap-2">
            <span class="w-1.5 h-1.5 bg-brand-yellow" />
            <span class="font-pixel text-[10px] text-brand-yellow uppercase tracking-widest">
              HONEST ANSWERS
            </span>
          </div>
          <h2 class="text-3xl sm:text-4xl font-extrabold text-zinc-50 font-sans tracking-tight">
            Frequently Wondered Questions
          </h2>
          <p class="text-sm text-zinc-400">
            Real questions people text us before showing up for the first time.
          </p>
        </div>

        <!-- Accordion List -->
        <div class="space-y-3">
          <div
            v-for="(faq, idx) in faqs"
            :key="idx"
            class="rounded-xl border border-zinc-800/90 bg-zinc-900/60 overflow-hidden transition-colors"
          >
            <button
              type="button"
              class="w-full p-5 text-left flex items-center justify-between gap-4 select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow"
              :aria-expanded="openFaqIndex === idx"
              @click="toggleFaq(idx)"
            >
              <span class="text-sm sm:text-base font-semibold text-zinc-100 font-sans flex items-center gap-3">
                <span class="font-pixel text-xs text-brand-yellow">Q.</span>
                <span>{{ faq.question }}</span>
              </span>

              <span
                :class="[
                  'font-pixel text-xs text-zinc-400 transition-transform duration-200 shrink-0',
                  openFaqIndex === idx ? 'rotate-45 text-brand-yellow' : ''
                ]"
                aria-hidden="true"
              >
                +
              </span>
            </button>

            <!-- Expanded Body with smooth CSS transition -->
            <div
              v-show="openFaqIndex === idx"
              class="px-5 pb-5 pt-1 text-xs sm:text-sm text-zinc-300 leading-relaxed border-t border-zinc-800/60 font-sans"
            >
              <p class="pl-6">{{ faq.answer }}</p>
            </div>
          </div>
        </div>

      </div>
    </section>

    <!-- ====================================================================
         6. THE WELCOME CONCIERGE: WANT A FRIENDLY FACE WAITING?
         ==================================================================== -->
    <section id="concierge" class="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
      <div class="relative rounded-2xl bg-zinc-950 border-2 border-zinc-800 p-8 sm:p-12 overflow-hidden shadow-2xl">
        
        <!-- Ambient decorative corner glow -->
        <div class="absolute -top-20 -right-20 w-60 h-60 bg-brand-yellow/10 rounded-full blur-[80px] pointer-events-none" aria-hidden="true" />
        <div class="absolute -bottom-20 -left-20 w-60 h-60 bg-brand-purple/20 rounded-full blur-[80px] pointer-events-none" aria-hidden="true" />

        <div class="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <!-- Left Details (7 cols) -->
          <div class="lg:col-span-7 space-y-5">
            <div class="inline-flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span class="font-pixel text-[9px] text-emerald-400 uppercase tracking-wider">
                HOST CONCIERGE ACTIVE
              </span>
            </div>

            <h2 class="text-3xl sm:text-4xl font-extrabold text-zinc-50 font-sans tracking-tight">
              Want a Friendly Face <br class="hidden sm:block" />
              <span class="text-brand-yellow">Waiting for You at the Door?</span>
            </h2>

            <p class="text-sm text-zinc-300 leading-relaxed">
              If walking into an unfamiliar room solo gives you sweaty palms, we get it. Drop a quick message on WhatsApp — one of our welcome hosts will meet you outside, buy your first coffee, and introduce you to great people.
            </p>

            <div class="space-y-2 pt-2 text-xs text-zinc-400">
              <div class="flex items-center gap-2">
                <span class="text-brand-yellow font-pixel text-[10px]">✦</span>
                <span>Zero obligation to join anything or give personal info</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-purple-400 font-pixel text-[10px]">✦</span>
                <span>Real young adults, not automated bots</span>
              </div>
            </div>
          </div>

          <!-- Right Action Panel (5 cols) -->
          <div class="lg:col-span-5 bg-zinc-900/90 rounded-xl border border-zinc-800 p-6 space-y-4 text-left">
            <span class="font-pixel text-[9px] text-zinc-400 uppercase block tracking-wider">
              QUICK LAUNCHER
            </span>

            <!-- Service Selection -->
            <div class="space-y-1.5">
              <label for="gathering-select" class="text-xs font-semibold text-zinc-200">
                Which gathering are you eyeing?
              </label>
              <select
                id="gathering-select"
                v-model="selectedServiceTime"
                class="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:ring-2 focus:ring-brand-yellow"
              >
                <option value="Saturday 5:00 PM (Youth & Young Adults)">
                  Saturday 5:00 PM — Youth &amp; Young Adults
                </option>
                <option value="Sunday 9:30 AM (Morning Gathering)">
                  Sunday 9:30 AM — Morning Gathering
                </option>
                <option value="Sunday 11:30 AM (Second Gathering)">
                  Sunday 11:30 AM — Second Gathering
                </option>
                <option value="Midweek Life Group">
                  Midweek — Community Life Group
                </option>
              </select>
            </div>

            <!-- Optional Name -->
            <div class="space-y-1.5">
              <label for="visitor-name" class="text-xs font-semibold text-zinc-200">
                Your name (optional)
              </label>
              <input
                id="visitor-name"
                v-model="visitorName"
                type="text"
                placeholder="e.g. Sam (or leave blank)"
                class="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-brand-yellow"
              />
            </div>

            <!-- WhatsApp Trigger Button -->
            <button
              type="button"
              class="w-full py-3 px-4 rounded-xl bg-brand-yellow text-black font-sans text-xs font-bold shadow-pixel-purple hover:bg-brand-yellow-hover active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              @click="openWhatsAppConcierge"
            >
              <span class="text-sm">💬</span>
              <span>Say Hi on WhatsApp</span>
            </button>

            <!-- Or Schedule link -->
            <div class="pt-2 text-center">
              <NuxtLink
                to="/schedule"
                class="font-pixel text-[9px] text-zinc-400 hover:text-brand-yellow transition-colors inline-flex items-center gap-1"
              >
                <span>VIEW FULL SCHEDULE &amp; MAP</span>
                <span>&rarr;</span>
              </NuxtLink>
            </div>

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
  title: 'First Time Here? — Plan Your Visit to Arrow Gen',
  ogTitle: 'First Time Here? — Welcome to Arrow Gen',
  description: 'Visiting Arrow Gen for the first time? No dress codes, zero forced call-outs, free artisan coffee, and authentic community in Christ.',
  ogDescription: 'Visiting for the first time? No dress code, no expectations, just authentic faith and community in Christ.',
  ogImage: '/logo-arrow.png',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: 'First Time Here? — Welcome to Arrow Gen',
  twitterDescription: 'Plan your first visit to Arrow Gen. Discover what to expect, parking, service times, and our friendly Welcome Team.',
  twitterImage: '/logo-arrow.png'
})

useHead({
  htmlAttrs: { lang: 'en' }
})

// Runtime config for WhatsApp concierge
const config = useRuntimeConfig()
const DEFAULT_WHATSAPP_NUMBER = '6281234567890'
const whatsappNumber = (config.public?.whatsappNumber as string) || DEFAULT_WHATSAPP_NUMBER

// State
const passClaimed = ref(false)
const activeStepIndex = ref(0)
const selectedVibeId = ref('undercover')
const openFaqIndex = ref<number | null>(0)
const selectedServiceTime = ref('Saturday 5:00 PM (Youth & Young Adults)')
const visitorName = ref('')

// Interactive VIP Pass Action
const handleClaimPass = () => {
  passClaimed.value = true
}

// Smooth scroll helper
const scrollToSection = (id: string) => {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

// FAQ toggle
const toggleFaq = (idx: number) => {
  openFaqIndex.value = openFaqIndex.value === idx ? null : idx
}

// WhatsApp Concierge Launcher
const openWhatsAppConcierge = () => {
  const cleanNumber = whatsappNumber.replace(/\D/g, '')
  const nameStr = visitorName.value.trim() ? `My name is ${visitorName.value.trim()}` : "I'm a first-timer"
  const msg = `Hey Arrow Gen team! ${nameStr} and I'm planning to visit this weekend for ${selectedServiceTime.value}. Could someone meet me at the door for coffee?`
  const url = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(msg)}`
  window.open(url, '_blank', 'noopener,noreferrer')
}

// Steps Data for Sunday Timeline
const steps = [
  {
    number: '01',
    tabLabel: 'Arrive & Park',
    timing: '15 Mins Prior',
    title: 'Easy Free Parking & Warm Glass Doors',
    description: 'Pull right into our venue lot. Parking attendants in high-vis vests will point you directly to a free spot. Walk toward the glowing Arrow Gen glass doors into the main atrium.',
    protip: 'Aim to arrive 10-15 minutes before the gathering starts so you can grab coffee and choose your favorite seat without any hurry.',
    bullets: [
      '100% free secure parking on site',
      'Accessible wheelchair ramps & elevators',
      'Clear digital signage right at the entrance'
    ],
    location: 'Main Parking Lot & Atrium',
    duration: '~5 mins'
  },
  {
    number: '02',
    tabLabel: 'Coffee & Start Here',
    timing: '10 Mins Prior',
    title: 'Grab Fresh Specialty Coffee On Us',
    description: 'Walk into the atrium and spot the illuminated "START HERE" sign. Our host team will hand you your first-timer gift pack and point you directly to our community barista bar.',
    protip: 'Our baristas pull double-shot espresso, oat milk lattes, and artisan cold brew. It is completely on the house — no tokens or payment needed.',
    bullets: [
      'Complimentary handcrafted hot & cold drinks',
      'Welcome gift pack (stickers, journal, snacks)',
      'Restrooms and auditorium doors clearly marked'
    ],
    location: 'Atrium Barista Lounge',
    duration: '~10 mins'
  },
  {
    number: '03',
    tabLabel: 'The Gathering',
    timing: '75 Minutes',
    title: 'Modern Worship & Practical Truth',
    description: 'Find a seat anywhere in the auditorium. The gathering opens with energetic, heartfelt live worship followed by an encouraging, scripture-grounded message addressing real-world life.',
    protip: 'Prefer to be low-key? The back corners and balcony have comfortable seating with easy exit paths if you ever need to slip out early.',
    bullets: [
      'Zero public call-outs or spotlight moments',
      'Full live modern band & lyric screens',
      'Bilingual friendly (Indonesian & English subtitles)'
    ],
    location: 'Main Auditorium',
    duration: '75-80 mins'
  },
  {
    number: '04',
    tabLabel: 'The Lounge',
    timing: 'Post-Service',
    title: 'Pastries, Banter & The Connect Lounge',
    description: 'The moment the service wraps up, head back to the atrium. Fresh snacks, iced drinks, and friendly pastors and table leaders hang out at The Connect Lounge.',
    protip: 'No rush to leave, but zero guilt if you need to head out immediately. Stay for 5 minutes or an hour — totally your call.',
    bullets: [
      'Fresh baked pastries and cold refreshments',
      'Meet young adults in your industry or campus',
      'Ask any questions about faith or weekday life groups'
    ],
    location: 'Connect Lounge (Atrium)',
    duration: 'Open-ended'
  }
]

const activeStep = computed(() => steps[activeStepIndex.value])

// Vibes Data
const vibes = [
  {
    id: 'undercover',
    emoji: '🕶️',
    badge: 'STEALTH MODE',
    title: 'The Undercover Guest',
    quote: 'I want to slip in, check it out quietly, and leave without making awkward small talk.',
    gameplan: 'We respect ninjas! Dim room lighting, wide rear seats, and immediate exit doors. Zero eye contact pressure.'
  },
  {
    id: 'curious',
    emoji: '☕',
    badge: 'CHILL OBSERVER',
    title: 'The Curious Coffee Drinker',
    quote: "I'm checking out the vibe with a friend, open to a warm smile and great music.",
    gameplan: 'Stop by the Start Here desk, grab your cold brew, and our hosts will point you to great seats with optimal sound.'
  },
  {
    id: 'crew',
    emoji: '🤝',
    badge: 'READY TO CONNECT',
    title: 'Looking for My Crew',
    quote: "I just moved to the city or want to make genuine friends in my stage of life ASAP.",
    gameplan: 'Hang out at the lounge after! We will introduce you to people who love coffee, creatives, or young pros right away.'
  }
]

// FAQ Data
const faqs = [
  {
    question: 'Can I come alone without feeling weird?',
    answer: 'Over 60% of our community showed up alone on their very first visit. Our host team is positioned at the door specifically to make sure you never have to stand around wondering where to go.'
  },
  {
    question: 'What should I wear? Do I have to dress up?',
    answer: 'Wear whatever you normally wear on a weekend. Jeans, hoodies, sneakers, t-shirts, and casual shirts are the standard. If someone wears a tuxedo, people will probably ask if they are getting married today.'
  },
  {
    question: "What if I'm not religious, have doubts, or haven't been in church in years?",
    answer: 'You are completely welcome here. Arrow Gen is a community of people navigating real life, questions, and faith together. You don\'t need to have your life figured out or have a theological resume to take a seat with us.'
  },
  {
    question: 'Will I be pressured to donate money or speak?',
    answer: 'Never. Giving is exclusively for regular attendees who call Arrow Gen their spiritual family. As our guest, you are our treat. You will also never be called up to the stage or handed a microphone.'
  },
  {
    question: 'How long is the service, and what does it include?',
    answer: 'Each gathering runs approximately 75 to 80 minutes. It typically consists of 25 minutes of energetic live modern worship, a 35-minute practical teaching rooted in the Bible, and a brief closing prayer.'
  },
  {
    question: 'Where is parking, and do I have to pay?',
    answer: 'Parking is 100% free and located directly on-site with dedicated security and parking hosts guiding traffic. Both car and motorcycle spaces are plentiful.'
  }
]
</script>

<style scoped>
/* Promise Card Custom Neo-Brutalist Styling */
.promise-card {
  position: relative;
  background-color: rgba(9, 9, 11, 0.85);
  border: 1px solid rgba(39, 39, 42, 0.8);
  border-radius: 1rem;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1.25rem;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.promise-card:hover {
  border-color: rgba(119, 11, 186, 0.6);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px -4px rgba(119, 11, 186, 0.15);
}

.promise-card__badge {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.promise-card__tag {
  font-family: var(--font-family-pixel, monospace);
  font-size: 8px;
  color: var(--color-zinc-400);
  background-color: rgba(24, 24, 27, 0.8);
  border: 1px solid rgba(39, 39, 42, 0.8);
  padding: 0.35rem 0.65rem;
  border-radius: 0.375rem;
  width: fit-content;
  letter-spacing: -0.02em;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.3s ease-out forwards;
}
</style>
