<template>
  <div class="min-h-screen flex flex-col bg-background text-foreground overflow-x-hidden selection:bg-brand-yellow selection:text-black">

    <!-- ====================================================================
         1. HERO: HIGH-ENERGY CREATIVE CALL TO ACTION
         ==================================================================== -->
    <section class="relative px-4 sm:px-6 lg:px-8 pt-16 pb-20 sm:pt-24 sm:pb-24 border-b border-zinc-900 bg-retro-grid overflow-hidden">
      <!-- Ambient dual glow lights -->
      <div
        class="absolute -top-32 left-1/3 -translate-x-1/2 w-96 sm:w-[650px] h-96 sm:h-[650px] bg-brand-purple/20 rounded-full blur-[160px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        class="absolute bottom-4 right-10 w-72 sm:w-[450px] h-72 sm:h-[450px] bg-brand-yellow/10 rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true"
      />

      <div class="relative max-w-5xl mx-auto text-center space-y-6 z-10">
        
        <!-- Live Recruitment Beacon -->
        <div class="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-zinc-800 bg-zinc-950/90 backdrop-blur-md shadow-sm">
          <span class="relative flex h-2 w-2">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-yellow opacity-75" />
            <span class="relative inline-flex rounded-full h-2 w-2 bg-brand-yellow" />
          </span>
          <span class="font-pixel text-[9px] text-zinc-300 tracking-wider uppercase">
            CREW CADRE 2026 <span class="text-brand-yellow">• OPEN ONBOARDING</span>
          </span>
        </div>

        <!-- Big Headline -->
        <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-50 font-sans leading-[1.1]">
          Don't Waste Your Craft. <br />
          <span class="relative inline-block text-brand-yellow">
            Build The Future
            <svg class="absolute -bottom-2 left-0 w-full h-2 text-brand-purple/60" viewBox="0 0 100 8" preserveAspectRatio="none" aria-hidden="true">
              <path d="M0,5 Q50,0 100,5" stroke="currentColor" stroke-width="3" fill="none" />
            </svg>
          </span>
          With The Crew.
        </h1>

        <!-- Inspiring, Sharp Copy -->
        <p class="max-w-2xl mx-auto text-base sm:text-lg text-zinc-300 font-sans leading-relaxed">
          Musicians, filmmakers, sound engineers, visual designers, coders, and warm hosts. We don't do boring routines. We push creative boundaries, forge authentic brotherhood, and deploy our gifts for the Kingdom.
        </p>

        <!-- Quick Value Pillars -->
        <div class="pt-2 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs text-zinc-400">
          <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900/90 border border-zinc-800">
            <span class="text-brand-yellow font-pixel text-[10px]">⚡</span> 0% Bureaucracy
          </span>
          <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900/90 border border-zinc-800">
            <span class="text-purple-400 font-pixel text-[10px]">✦</span> Real Gear &amp; Mentorship
          </span>
          <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900/90 border border-zinc-800">
            <span class="text-emerald-400 font-mono">✓</span> All Experience Levels Welcome
          </span>
        </div>

        <!-- CTA Buttons -->
        <div class="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            class="w-full sm:w-auto px-6 py-3 rounded-xl bg-brand-yellow text-black font-sans text-xs font-bold shadow-pixel-purple hover:bg-brand-yellow-hover active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center justify-center gap-2"
            @click="scrollToSection('application-form')"
          >
            <span>JOIN THE CREW NOW</span>
            <span class="font-pixel text-[10px]" aria-hidden="true">&darr;</span>
          </button>

          <button
            type="button"
            class="w-full sm:w-auto px-6 py-3 rounded-xl border border-zinc-700 bg-zinc-950/80 text-zinc-200 hover:text-white hover:border-zinc-500 font-sans text-xs font-medium transition-colors"
            @click="scrollToSection('departments')"
          >
            Explore Departments &rarr;
          </button>
        </div>

      </div>
    </section>

    <!-- ====================================================================
         2. DEPARTMENTS: "PICK YOUR LANE" INTERACTIVE SHOWCASE
         ==================================================================== -->
    <section id="departments" class="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full space-y-12">
      
      <div class="text-center space-y-3 max-w-2xl mx-auto">
        <div class="inline-flex items-center gap-2">
          <span class="w-1.5 h-1.5 bg-brand-yellow" />
          <span class="font-pixel text-[10px] text-brand-yellow uppercase tracking-widest">
            WHERE DO YOU FIT?
          </span>
        </div>
        <h2 class="text-3xl sm:text-4xl font-extrabold text-zinc-50 font-sans tracking-tight">
          Find Your Creative Track
        </h2>
        <p class="text-sm text-zinc-400 leading-relaxed">
          Tap any department to instantly add it to your application below.
        </p>
      </div>

      <!-- Department Cards Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        
        <div
          v-for="dept in departments"
          :key="dept.id"
          :class="[
            'department-card relative rounded-2xl border p-6 flex flex-col justify-between space-y-6 transition-all duration-200 cursor-pointer select-none',
            form.interests.includes(dept.id)
              ? 'bg-zinc-900 border-brand-yellow shadow-pixel-yellow'
              : 'bg-zinc-950/80 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/50'
          ]"
          @click="toggleInterest(dept.id)"
        >
          <!-- Corner Bracket when active -->
          <span v-if="form.interests.includes(dept.id)" class="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 border-brand-yellow" aria-hidden="true" />

          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-2xl" role="img" :aria-label="dept.name">{{ dept.icon }}</span>
              <span
                :class="[
                  'font-pixel text-[8px] px-2 py-0.5 rounded transition-colors',
                  form.interests.includes(dept.id) ? 'bg-brand-yellow text-black font-bold' : 'bg-zinc-900 text-zinc-400'
                ]"
              >
                {{ form.interests.includes(dept.id) ? 'SELECTED' : 'SELECT' }}
              </span>
            </div>

            <h3 class="text-lg font-bold text-zinc-100 font-sans">
              {{ dept.name }}
            </h3>

            <p class="text-xs text-zinc-400 leading-relaxed">
              {{ dept.desc }}
            </p>
          </div>

          <div class="pt-3 border-t border-zinc-900 text-[11px] text-zinc-500 font-mono">
            Focus: {{ dept.focus }}
          </div>
        </div>

      </div>

    </section>

    <!-- ====================================================================
         3. APPLICATION TERMINAL: STREAMLINED & FRICTIONLESS FORM
         ==================================================================== -->
    <section id="application-form" class="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
      
      <!-- SUCCESS STATE: THE DIGITAL CREW ONBOARDING PASS -->
      <div
        v-if="submissionState === 'success'"
        class="relative rounded-2xl bg-zinc-950 border-2 border-brand-yellow p-8 sm:p-12 text-center space-y-6 shadow-2xl overflow-hidden animate-fade-in"
      >
        <!-- Pixel Corner Accents -->
        <span class="absolute top-0 left-0 w-3.5 h-3.5 border-t-2 border-l-2 border-brand-yellow pointer-events-none" aria-hidden="true" />
        <span class="absolute top-0 right-0 w-3.5 h-3.5 border-t-2 border-r-2 border-brand-yellow pointer-events-none" aria-hidden="true" />
        <span class="absolute bottom-0 left-0 w-3.5 h-3.5 border-b-2 border-l-2 border-brand-purple pointer-events-none" aria-hidden="true" />
        <span class="absolute bottom-0 right-0 w-3.5 h-3.5 border-b-2 border-r-2 border-brand-purple pointer-events-none" aria-hidden="true" />

        <div class="w-16 h-16 rounded-full bg-brand-yellow/15 border-2 border-brand-yellow flex items-center justify-center mx-auto text-brand-yellow text-2xl font-mono">
          ✓
        </div>

        <div class="space-y-3">
          <span class="font-pixel text-[9px] px-2.5 py-1 rounded bg-brand-yellow text-black font-semibold uppercase tracking-wider">
            PASS #CREW-2026 // APPLICATION RECEIVED
          </span>
          
          <h2 class="text-2xl sm:text-3xl font-extrabold text-zinc-50 font-sans tracking-tight">
            Welcome to the Pipeline, <br class="hidden sm:inline" />
            <span class="text-brand-yellow">{{ submittedName }}!</span>
          </h2>
          
          <p class="text-sm text-zinc-300 max-w-lg mx-auto leading-relaxed">
            Your application has landed on our Department Directors' desk. We review every single application with excitement. Here is what you can look forward to next:
          </p>
        </div>

        <!-- 3 Simple Next Steps -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left max-w-2xl mx-auto pt-2 text-xs">
          <div class="p-4 rounded-xl bg-zinc-900/70 border border-zinc-800 space-y-1.5">
            <span class="font-pixel text-[9px] text-brand-yellow block">STEP 01</span>
            <p class="font-bold text-zinc-100">WhatsApp Ping</p>
            <p class="text-zinc-400 text-[11px] leading-relaxed">Within 48 hours, a team lead will text you a warm hello.</p>
          </div>
          <div class="p-4 rounded-xl bg-zinc-900/70 border border-zinc-800 space-y-1.5">
            <span class="font-pixel text-[9px] text-purple-300 block">STEP 02</span>
            <p class="font-bold text-zinc-100">Coffee &amp; Banter</p>
            <p class="text-zinc-400 text-[11px] leading-relaxed">A casual 20-min chat to know your heart, skills, and goals.</p>
          </div>
          <div class="p-4 rounded-xl bg-zinc-900/70 border border-zinc-800 space-y-1.5">
            <span class="font-pixel text-[9px] text-zinc-400 block">STEP 03</span>
            <p class="font-bold text-zinc-100">Backstage Shadow</p>
            <p class="text-zinc-400 text-[11px] leading-relaxed">Hang out backstage during Saturday Youth gathering.</p>
          </div>
        </div>

        <div class="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            class="w-full sm:w-auto px-6 py-3 rounded-xl bg-brand-yellow text-black font-sans text-xs font-bold shadow-pixel-purple hover:bg-brand-yellow-hover active:translate-x-0.5 active:translate-y-0.5 transition-all"
            @click="resetForm"
          >
            SUBMIT ANOTHER TRACK
          </button>
          
          <NuxtLink
            to="/first-time"
            class="w-full sm:w-auto px-6 py-3 rounded-xl border border-zinc-700 bg-zinc-900 text-zinc-200 hover:text-white font-sans text-xs font-medium transition-colors"
          >
            Visit Us First This Weekend &rarr;
          </NuxtLink>
        </div>
      </div>

      <!-- IDLE / FORM TERMINAL STATE -->
      <div
        v-else
        class="relative rounded-2xl bg-zinc-950 border border-zinc-800 p-6 sm:p-10 shadow-2xl space-y-8"
      >
        <!-- Pixel Corner Accents -->
        <span class="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-brand-yellow pointer-events-none" aria-hidden="true" />
        <span class="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-brand-yellow pointer-events-none" aria-hidden="true" />
        <span class="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-brand-purple pointer-events-none" aria-hidden="true" />
        <span class="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-brand-purple pointer-events-none" aria-hidden="true" />

        <!-- Form Top Bar -->
        <div class="border-b border-zinc-800/80 pb-5 space-y-1.5">
          <div class="flex items-center justify-between">
            <h2 class="text-xl sm:text-2xl font-bold text-zinc-100 font-sans tracking-tight">
              Crew Onboarding Terminal
            </h2>
            <span class="font-pixel text-[9px] px-2.5 py-1 rounded bg-zinc-900 text-brand-yellow border border-zinc-800">
              FAST TRACK
            </span>
          </div>
          <p class="text-xs text-zinc-400 leading-relaxed">
            No corporate resumes needed. Just tell us who you are and where you want to grow.
          </p>
        </div>

        <!-- Global Error Notification -->
        <div
          v-if="submissionState === 'error'"
          class="p-4 rounded-xl bg-rose-950/50 border border-rose-800/80 text-rose-200 text-xs flex items-start gap-3 animate-fade-in"
          role="alert"
        >
          <span class="font-mono text-base text-rose-400 mt-0.5">!</span>
          <div>
            <p class="font-semibold text-rose-100">Application Needs a Quick Fix</p>
            <p class="text-rose-300 text-[11px] mt-0.5">{{ errorMessage || 'Please check highlighted fields and make sure at least one department is selected.' }}</p>
          </div>
        </div>

        <form class="space-y-6" @submit.prevent="handleSubmit">
          
          <!-- Name & Coordinates -->
          <div class="space-y-1.5">
            <label for="crew-name" class="text-xs font-semibold text-zinc-200">
              Your Full Name <span class="text-brand-yellow">*</span>
            </label>
            <input
              id="crew-name"
              v-model="form.fullName"
              type="text"
              required
              :disabled="submissionState === 'loading'"
              placeholder="e.g. Jonathan Alexander"
              class="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-brand-yellow"
            />
            <p v-if="errors.fullName" class="text-xs text-rose-400">{{ errors.fullName }}</p>
          </div>

          <!-- Email & WhatsApp Row -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="space-y-1.5">
              <label for="crew-email" class="text-xs font-semibold text-zinc-200">
                Email Address <span class="text-brand-yellow">*</span>
              </label>
              <input
                id="crew-email"
                v-model="form.email"
                type="email"
                required
                :disabled="submissionState === 'loading'"
                placeholder="e.g. jonathan@gmail.com"
                class="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-brand-yellow"
              />
              <p v-if="errors.email" class="text-xs text-rose-400">{{ errors.email }}</p>
            </div>

            <div class="space-y-1.5">
              <label for="crew-phone" class="text-xs font-semibold text-zinc-200">
                WhatsApp / Phone <span class="text-brand-yellow">*</span>
              </label>
              <input
                id="crew-phone"
                v-model="form.phone"
                type="tel"
                required
                :disabled="submissionState === 'loading'"
                placeholder="e.g. +62 812-3456-7890"
                class="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-brand-yellow"
              />
              <p v-if="errors.phone" class="text-xs text-rose-400">{{ errors.phone }}</p>
            </div>
          </div>

          <!-- Department / Interest Chips (Multi-Select) -->
          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <label class="text-xs font-semibold text-zinc-200">
                Which tracks spark your fire? <span class="text-brand-yellow">*</span>
              </label>
              <span class="text-[11px] text-zinc-500 font-mono">Select one or more</span>
            </div>

            <div class="grid grid-cols-2 sm:grid-cols-4 gap-2" role="group" aria-label="Creative Tracks">
              <button
                v-for="dept in departments"
                :key="dept.id"
                type="button"
                :aria-pressed="form.interests.includes(dept.id)"
                :class="[
                  'p-3 rounded-xl border text-left transition-all select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow',
                  form.interests.includes(dept.id)
                    ? 'bg-brand-purple/25 border-brand-purple text-purple-200 font-bold shadow-sm'
                    : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700'
                ]"
                @click="toggleInterest(dept.id)"
              >
                <div class="flex items-center gap-2">
                  <span class="text-base">{{ dept.icon }}</span>
                  <span class="text-xs truncate">{{ dept.name }}</span>
                </div>
              </button>
            </div>

            <p v-if="errors.interests" class="text-xs text-rose-400 font-medium">{{ errors.interests }}</p>
          </div>

          <!-- Motivation / Heart -->
          <div class="space-y-1.5">
            <div class="flex items-center justify-between">
              <label for="crew-motivation" class="text-xs font-semibold text-zinc-200">
                Why do you want to run with us? <span class="text-brand-yellow">*</span>
              </label>
              <span class="text-[10px] text-zinc-500 font-mono">
                Min. 15 characters
              </span>
            </div>

            <textarea
              id="crew-motivation"
              v-model="form.motivation"
              rows="4"
              required
              :disabled="submissionState === 'loading'"
              placeholder="Tell us what excites you, what crafts you want to sharpen, or why you'd love to serve with the Arrow Gen crew..."
              class="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-xs sm:text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-brand-yellow leading-relaxed resize-y"
            />
            <p v-if="errors.motivation" class="text-xs text-rose-400">{{ errors.motivation }}</p>
          </div>

          <!-- Portfolio / Instagram / GitHub link -->
          <div class="space-y-1.5">
            <label for="crew-portfolio" class="text-xs font-semibold text-zinc-200 flex items-center justify-between">
              <span>Link to Portfolio, Instagram, or GitHub <span class="text-zinc-500 font-normal">(Optional)</span></span>
              <span class="text-[10px] text-zinc-500 font-mono">No pressure if you don't have one</span>
            </label>
            <input
              id="crew-portfolio"
              v-model="form.portfolioLink"
              type="url"
              :disabled="submissionState === 'loading'"
              placeholder="e.g. https://instagram.com/myname or behance.net/myname"
              class="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-brand-yellow"
            />
          </div>

          <!-- Action Launch Button -->
          <div class="pt-4 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div class="text-[11px] text-zinc-500 font-mono flex items-center gap-1.5">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>DIRECT DISPATCH TO DIRECTORS</span>
            </div>

            <button
              type="submit"
              :disabled="submissionState === 'loading'"
              class="w-full sm:w-auto py-3 px-8 rounded-xl bg-brand-yellow text-black font-sans text-xs font-bold shadow-pixel-purple hover:bg-brand-yellow-hover active:translate-x-0.5 active:translate-y-0.5 disabled:opacity-50 disabled:pointer-events-none transition-all flex items-center justify-center gap-2"
            >
              <span>{{ submissionState === 'loading' ? 'TRANSMITTING APPLICATION...' : 'SUBMIT APPLICATION' }}</span>
              <span class="font-pixel text-[10px]" aria-hidden="true">&rarr;</span>
            </button>
          </div>

        </form>

      </div>

    </section>

    <!-- ====================================================================
         4. THE CREW CULTURE PLAYBOOK (WHAT YOU ACTUALLY GET)
         ==================================================================== -->
    <section class="border-t border-zinc-900 bg-zinc-950/70 py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
      <div class="max-w-5xl mx-auto space-y-12">
        
        <div class="text-center space-y-3 max-w-2xl mx-auto">
          <div class="inline-flex items-center gap-2">
            <span class="w-1.5 h-1.5 bg-brand-purple" />
            <span class="font-pixel text-[10px] text-brand-purple uppercase tracking-widest">
              THE UNWRITTEN CODE
            </span>
          </div>
          <h2 class="text-3xl sm:text-4xl font-extrabold text-zinc-50 font-sans tracking-tight">
            What Serving Actually Feels Like Here
          </h2>
          <p class="text-sm text-zinc-400 leading-relaxed">
            We don't use people to build church events. We use creative projects to build people.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div class="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-3.5">
            <div class="flex items-center justify-between">
              <span class="font-pixel text-xs text-brand-yellow">01 // MASTERY</span>
              <span class="text-xl">🛠️</span>
            </div>
            <h3 class="text-lg font-bold text-zinc-100 font-sans">
              Real Gear &amp; Craft Growth
            </h3>
            <p class="text-xs text-zinc-400 leading-relaxed">
              You won't be folding brochures. You will be trained on professional audio consoles, cinema cameras, stage lighting rigs, or creative direction alongside seasoned mentors.
            </p>
          </div>

          <div class="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-3.5">
            <div class="flex items-center justify-between">
              <span class="font-pixel text-xs text-purple-300">02 // BROTHERHOOD</span>
              <span class="text-xl">🍕</span>
            </div>
            <h3 class="text-lg font-bold text-zinc-100 font-sans">
              Late Nights &amp; Real Friends
            </h3>
            <p class="text-xs text-zinc-400 leading-relaxed">
              Post-service burger runs, creative retreats, jam sessions, and people who will show up in prayer when life gets heavy outside of church walls.
            </p>
          </div>

          <div class="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-3.5">
            <div class="flex items-center justify-between">
              <span class="font-pixel text-xs text-emerald-400">03 // KINGDOM FIRE</span>
              <span class="text-xl">🔥</span>
            </div>
            <h3 class="text-lg font-bold text-zinc-100 font-sans">
              Direct Cultural Impact
            </h3>
            <p class="text-xs text-zinc-400 leading-relaxed">
              Every guitar riff, camera angle, web feature, and warm cup of coffee welcomes hundreds of searching young people into a life-changing encounter with Jesus.
            </p>
          </div>

        </div>

      </div>
    </section>

    <!-- ====================================================================
         5. HAVE QUESTIONS FIRST? (WHATSAPP CONCIERGE)
         ==================================================================== -->
    <section class="border-t border-zinc-900 bg-zinc-950 py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
        <div class="space-y-1">
          <h4 class="text-lg font-bold text-zinc-100 font-sans">
            Want to Chat Before You Apply?
          </h4>
          <p class="text-xs text-zinc-400">
            Reach out to our creative director directly on WhatsApp with any questions.
          </p>
        </div>

        <button
          type="button"
          class="px-5 py-2.5 rounded-xl border border-zinc-700 bg-zinc-900 hover:border-brand-yellow text-zinc-200 hover:text-white text-xs font-bold transition-all shrink-0 flex items-center gap-2"
          @click="openCrewChatWhatsApp"
        >
          <span>💬 Ask a Question on WhatsApp</span>
        </button>
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'

// Terapkan Layout Default Publik
definePageMeta({
  layout: 'default'
})

// Head SEO & Open Graph Meta Tags
useSeoMeta({
  title: 'Join The Crew — Creative, Production & Ministry Volunteering | Arrow Gen',
  ogTitle: 'Join The Crew — Build the Future with Arrow Gen',
  description: 'Deploy your gifts in music, cinema, design, audio, tech, and hospitality. Join the creative movement of Arrow Gen youth and young adults.',
  ogDescription: 'Step into your creative calling. Join the Arrow Gen crew in worship, media, sound, tech, and hospitality.',
  ogImage: '/logo-arrow.png',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Join The Crew — Arrow Gen Creative Collective',
  twitterDescription: 'Music, media, design, sound, tech, and hospitality. Join our team.',
  twitterImage: '/logo-arrow.png'
})

useHead({
  htmlAttrs: { lang: 'en' }
})

// Form Data & State
type FormState = 'idle' | 'loading' | 'success' | 'error'

const submissionState = ref<FormState>('idle')
const errorMessage = ref('')
const submittedName = ref('')

const form = reactive({
  fullName: '',
  email: '',
  phone: '',
  interests: [] as string[],
  motivation: '',
  portfolioLink: ''
})

const errors = reactive({
  fullName: '',
  email: '',
  phone: '',
  interests: '',
  motivation: ''
})

// Department Data
const departments = [
  {
    id: 'worship',
    name: 'Music & Band',
    icon: '🎸',
    desc: 'Vocals, electric & acoustic guitars, keys, synths, drums, and worship band.',
    focus: 'Live Modern Praise'
  },
  {
    id: 'media',
    name: 'Cinema & Photos',
    icon: '🎬',
    desc: 'Cinema cameras, reels creation, color grading, photography, and recap edits.',
    focus: 'Visual Storytelling'
  },
  {
    id: 'design',
    name: 'Visual & Motion',
    icon: '🎨',
    desc: 'Stage graphics, typography, social assets, 3D motion, and brand curation.',
    focus: 'Aesthetic Direction'
  },
  {
    id: 'sound',
    name: 'Audio & Lights',
    icon: '🎧',
    desc: 'FOH sound mixing, in-ear monitor setups, DMX stage lighting, and broadcast.',
    focus: 'Stage Engineering'
  },
  {
    id: 'tech',
    name: 'Code & Tech Ops',
    icon: '💻',
    desc: 'Web applications, presentation tech, automation scripts, and screen systems.',
    focus: 'Digital Infrastructure'
  },
  {
    id: 'host',
    name: 'Host & Barista',
    icon: '☕',
    desc: 'Atrium welcome desk, barista craft bar, first-timer care, and lounge vibes.',
    focus: 'Radical Hospitality'
  },
  {
    id: 'writing',
    name: 'Story & Copy',
    icon: '✍️',
    desc: 'Devotionals, sermon notes, podcast scripts, and creative copywriting.',
    focus: 'Written Content'
  },
  {
    id: 'ops',
    name: 'Stage Ops',
    icon: '⚡',
    desc: 'Backstage logistics, service timing, cue calling, and green room coordination.',
    focus: 'Live Coordination'
  }
]

const toggleInterest = (id: string) => {
  if (form.interests.includes(id)) {
    form.interests = form.interests.filter(item => item !== id)
  } else {
    form.interests.push(id)
  }
}

// Scroll helper
const scrollToSection = (id: string) => {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

// WhatsApp Concierge
const config = useRuntimeConfig()
const DEFAULT_WHATSAPP = '6281234567890'
const whatsappNumber = (config.public?.whatsappNumber as string) || DEFAULT_WHATSAPP

const openCrewChatWhatsApp = () => {
  const cleanNumber = whatsappNumber.replace(/\D/g, '')
  const msg = 'Hey Arrow Gen team! I am interested in joining the crew and had a quick question before applying.'
  const url = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(msg)}`
  window.open(url, '_blank', 'noopener,noreferrer')
}

// Validation & Submit Handler
const handleSubmit = async () => {
  errors.fullName = ''
  errors.email = ''
  errors.phone = ''
  errors.interests = ''
  errors.motivation = ''
  errorMessage.value = ''

  let hasError = false

  if (!form.fullName.trim() || form.fullName.trim().length < 2) {
    errors.fullName = 'Please enter your full name (min. 2 characters).'
    hasError = true
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!form.email.trim() || !emailRegex.test(form.email.trim())) {
    errors.email = 'Please provide a valid email address.'
    hasError = true
  }

  if (!form.phone.trim() || form.phone.trim().length < 5) {
    errors.phone = 'Please provide an active WhatsApp or phone number.'
    hasError = true
  }

  if (form.interests.length === 0) {
    errors.interests = 'Please select at least one department track.'
    hasError = true
  }

  if (!form.motivation.trim() || form.motivation.trim().length < 15) {
    errors.motivation = 'Please share your motivation with at least 15 characters.'
    hasError = true
  }

  if (hasError) {
    submissionState.value = 'error'
    errorMessage.value = 'Please complete all required fields highlighted above.'
    return
  }

  submissionState.value = 'loading'

  try {
    await $fetch('/api/crew', {
      method: 'POST',
      body: {
        fullName: form.fullName.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        interests: [...form.interests],
        motivation: form.motivation.trim(),
        portfolioLink: form.portfolioLink.trim() || undefined
      }
    })

    submittedName.value = form.fullName.trim()

    // Reset form
    form.fullName = ''
    form.email = ''
    form.phone = ''
    form.interests = []
    form.motivation = ''
    form.portfolioLink = ''
    submissionState.value = 'success'
  } catch (err: unknown) {
    submissionState.value = 'error'
    const e = err as { data?: { message?: string }; statusMessage?: string; message?: string }
    errorMessage.value =
      e?.data?.message ||
      e?.statusMessage ||
      e?.message ||
      'Failed to submit crew application. Please verify your details and try again.'
  }
}

const resetForm = () => {
  form.fullName = ''
  form.email = ''
  form.phone = ''
  form.interests = []
  form.motivation = ''
  form.portfolioLink = ''
  errors.fullName = ''
  errors.email = ''
  errors.phone = ''
  errors.interests = ''
  errors.motivation = ''
  errorMessage.value = ''
  submittedName.value = ''
  submissionState.value = 'idle'
}
</script>

<style scoped>
.department-card {
  transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1),
              border-color 0.2s cubic-bezier(0.16, 1, 0.3, 1),
              box-shadow 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.department-card:hover {
  transform: translateY(-2px);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(6px);
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
