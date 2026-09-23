<template>
  <div class="min-h-screen flex flex-col bg-background text-foreground">

    <!-- ====================================================================
         1. HERO HEADER BANNER
         ==================================================================== -->
    <section class="relative px-4 sm:px-6 lg:px-8 py-16 sm:py-24 bg-retro-grid border-b border-zinc-900 overflow-hidden">
      <!-- Glow ambient light -->
      <div
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 sm:w-[550px] h-96 sm:h-[550px] bg-brand-purple/15 rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true"
      />

      <div class="relative max-w-3xl mx-auto text-center space-y-6 z-10">
        <UiBadge variant="pixel" size="sm">
          CREATIVE &amp; MINISTRY CALLING
        </UiBadge>

        <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-zinc-50 font-sans">
          Join <span class="text-brand-yellow">The Crew</span>
        </h1>

        <p class="text-base sm:text-lg text-zinc-400 font-sans leading-relaxed">
          Your talents, ideas, and passions belong to something greater. Whether you are a musician, designer, coder, writer, or love hosting people, there is a place for your craft in Arrow Gen.
        </p>

        <!-- Role Count Pill -->
        <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-zinc-800 bg-zinc-950/80 text-xs text-zinc-300">
          <span class="w-2 h-2 rounded-full bg-brand-yellow animate-pulse" />
          <span>Auditions &amp; Crew Onboarding Open for 2026 Season</span>
        </div>
      </div>
    </section>

    <!-- ====================================================================
         2. RECRUITMENT APPLICATION FORM
         ==================================================================== -->
    <section class="flex-1 max-w-3xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      
      <!-- SUCCESS STATE -->
      <UiCard
        v-if="submissionState === 'success'"
        variant="pixel"
        padding="lg"
        class="text-center space-y-6 animate-fade-in"
      >
        <div class="w-16 h-16 rounded-full bg-brand-yellow/15 border-2 border-brand-yellow flex items-center justify-center mx-auto text-brand-yellow">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <div class="space-y-3">
          <UiBadge variant="accent" size="sm">
            APPLICATION RECEIVED
          </UiBadge>
          <h2 class="text-2xl sm:text-3xl font-bold text-zinc-100 font-sans">
            Welcome to the Arrow Gen Pipeline!
          </h2>
          <p class="text-sm text-zinc-400 max-w-lg mx-auto leading-relaxed">
            Thank you, <span class="text-zinc-200 font-semibold">{{ form.fullName }}</span>. Your creative crew application has been dispatched to our department leads. We will reach out via WhatsApp / Email within 48 hours for an informal coffee chat.
          </p>
        </div>

        <!-- Next Steps Card -->
        <div class="p-4 rounded-lg bg-zinc-900/60 border border-zinc-800 text-left max-w-md mx-auto space-y-2 text-xs text-zinc-400">
          <p class="font-pixel text-[10px] text-brand-yellow uppercase">What Happens Next?</p>
          <p>1. Review by Department Director (Music, Tech, Design, or Ops)</p>
          <p>2. Casual 20-min introductory video or coffee chat</p>
          <p>3. Guided shadowing session during Saturday Youth service</p>
        </div>

        <div class="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <UiButton
            variant="pixel"
            size="md"
            @click="resetForm"
          >
            SUBMIT ANOTHER APPLICATION
          </UiButton>
          <UiButton
            variant="outline"
            size="md"
            @click="navigateTo('/')"
          >
            Back to Home
          </UiButton>
        </div>
      </UiCard>

      <!-- IDLE / LOADING / ERROR FORM STATE -->
      <UiCard
        v-else
        variant="default"
        padding="lg"
        class="border-zinc-800/80 bg-zinc-950/80 space-y-8"
      >
        <div class="border-b border-zinc-800 pb-5 space-y-1">
          <div class="flex items-center justify-between">
            <h2 class="text-xl font-bold text-zinc-100 font-sans">
              Crew Recruitment Form
            </h2>
            <UiBadge variant="secondary" size="sm">
              All Levels Welcome
            </UiBadge>
          </div>
          <p class="text-xs text-zinc-400">
            Tell us about your interests, skills, and why you’d love to serve with the Arrow Gen crew.
          </p>
        </div>

        <!-- Global Error Alert -->
        <div
          v-if="submissionState === 'error'"
          class="p-4 rounded-lg bg-rose-950/40 border border-rose-800/60 text-rose-300 text-xs flex items-center gap-2.5"
          role="alert"
        >
          <svg class="w-4 h-4 shrink-0 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span>{{ errorMessage || 'Please review the highlighted fields below and try again.' }}</span>
        </div>

        <form class="space-y-6" @submit.prevent="handleSubmit">
          
          <!-- Field 1: Full Name -->
          <UiInput
            v-model="form.fullName"
            type="text"
            label="Full Name"
            placeholder="e.g. Jonathan Alexander"
            hint="As you prefer to be called"
            :error="errors.fullName"
            :disabled="submissionState === 'loading'"
            required
          />

          <!-- Field 2: Email & Phone Contact -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <UiInput
              v-model="form.email"
              type="email"
              label="Email Address"
              placeholder="e.g. jonathan@example.com"
              :error="errors.email"
              :disabled="submissionState === 'loading'"
              required
            />
            <UiInput
              v-model="form.phone"
              type="tel"
              label="WhatsApp / Phone"
              placeholder="e.g. +62 812-3456-7890"
              hint="For quick chat &amp; onboarding"
              :error="errors.phone"
              :disabled="submissionState === 'loading'"
              required
            />
          </div>

          <!-- Field 3: Areas of Interest (Multi-select Checkbox Grid) -->
          <div class="space-y-2.5">
            <label class="text-sm font-medium text-zinc-200 select-none flex items-center justify-between">
              <span>
                Areas of Interest <span class="text-brand-yellow">*</span>
              </span>
              <span class="text-xs text-zinc-500 font-mono">Select one or more</span>
            </label>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <button
                v-for="area in interestAreas"
                :key="area.id"
                type="button"
                :class="[
                  'p-3.5 rounded-lg border text-left transition-all flex items-start gap-3 select-none',
                  form.interests.includes(area.id)
                    ? 'bg-brand-purple/20 border-brand-purple text-purple-200 shadow-sm'
                    : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700'
                ]"
                @click="toggleInterest(area.id)"
              >
                <!-- Custom Checkbox Indicator -->
                <div
                  :class="[
                    'w-4 h-4 rounded mt-0.5 flex items-center justify-center shrink-0 border transition-colors',
                    form.interests.includes(area.id)
                      ? 'bg-brand-purple border-brand-purple text-white'
                      : 'border-zinc-700 bg-zinc-800'
                  ]"
                >
                  <svg v-if="form.interests.includes(area.id)" class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                  </svg>
                </div>

                <div class="space-y-0.5">
                  <p class="text-sm font-medium text-zinc-100">{{ area.label }}</p>
                  <p class="text-[11px] text-zinc-500">{{ area.desc }}</p>
                </div>
              </button>
            </div>

            <p v-if="errors.interests" role="alert" class="text-xs text-rose-400 font-medium pt-1">
              {{ errors.interests }}
            </p>
          </div>

          <!-- Field 4: Short Motivation & Heart (Textarea) -->
          <UiInput
            v-model="form.motivation"
            type="textarea"
            label="Why do you want to join the Crew?"
            placeholder="Tell us a little bit about your heart, your journey, or what you hope to experience while serving..."
            hint="Min. 15 characters • No prior professional experience required"
            :error="errors.motivation"
            :disabled="submissionState === 'loading'"
            required
            rows="4"
          />

          <!-- Field 5: Optional Portfolio / Instagram / GitHub Link -->
          <UiInput
            v-model="form.portfolioLink"
            type="url"
            label="Portfolio, GitHub or Instagram Link (Optional)"
            placeholder="e.g. https://instagram.com/myname or github.com/myname"
            hint="Share samples of your craft, music, or design if available"
            :disabled="submissionState === 'loading'"
          />

          <!-- Action Buttons -->
          <div class="pt-4 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p class="text-[11px] text-zinc-500 font-mono">
              STATUS: {{ submissionState.toUpperCase() }}
            </p>

            <UiButton
              type="submit"
              variant="pixel"
              size="lg"
              class="w-full sm:w-auto"
              :loading="submissionState === 'loading'"
              :disabled="submissionState === 'loading'"
            >
              SUBMIT APPLICATION
            </UiButton>
          </div>

        </form>
      </UiCard>

    </section>

    <!-- ====================================================================
         3. WHY SERVE WITH ARROW GEN?
         ==================================================================== -->
    <section class="border-t border-zinc-900 bg-zinc-950/70 py-16 px-4 sm:px-6 lg:px-8">
      <div class="max-w-5xl mx-auto space-y-10">
        <div class="text-center space-y-2">
          <span class="font-pixel text-[11px] text-brand-yellow">CULTURE &amp; GROWTH</span>
          <h3 class="text-2xl sm:text-3xl font-bold text-zinc-100 font-sans">
            What You Can Expect As a Crew Member
          </h3>
          <p class="text-xs sm:text-sm text-zinc-400 max-w-lg mx-auto">
            Serving is not just about tasks; it's about discipleship, community, and personal craft elevation.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="p-5 rounded-xl border border-zinc-800 bg-zinc-900/60 space-y-2.5">
            <span class="font-pixel text-xs text-brand-yellow">01 / MENTORSHIP</span>
            <h4 class="text-base font-bold text-zinc-100">Mentorship &amp; Craft Growth</h4>
            <p class="text-xs text-zinc-400 leading-relaxed">
              Work alongside experienced creative directors, audio engineers, and pastors who will pour into your skills and spiritual walk.
            </p>
          </div>

          <div class="p-5 rounded-xl border border-zinc-800 bg-zinc-900/60 space-y-2.5">
            <span class="font-pixel text-xs text-purple-400">02 / BROTHERHOOD</span>
            <h4 class="text-base font-bold text-zinc-100">Deep, Lasting Friendships</h4>
            <p class="text-xs text-zinc-400 leading-relaxed">
              Crew dinners, retreat weekends, late-night rehearsals, and team prayers. You won't just serve together; you'll grow together.
            </p>
          </div>

          <div class="p-5 rounded-xl border border-zinc-800 bg-zinc-900/60 space-y-2.5">
            <span class="font-pixel text-xs text-zinc-300">03 / KINGDOM IMPACT</span>
            <h4 class="text-base font-bold text-zinc-100">Direct Cultural Influence</h4>
            <p class="text-xs text-zinc-400 leading-relaxed">
              Your graphics, chords, code, or warm smile will welcome hundreds of searching young people into a genuine encounter with Jesus.
            </p>
          </div>
        </div>
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

// Head SEO
useHead({
  title: 'Join The Crew | Arrow Gen Creative & Ministry',
  meta: [
    { name: 'description', content: 'Apply to join the Arrow Gen creative, worship, production, tech, and hospitality crew.' }
  ]
})

// Form Data & State
type FormState = 'idle' | 'loading' | 'success' | 'error'

const submissionState = ref<FormState>('idle')
const errorMessage = ref('')

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

// Interest Areas Data
const interestAreas = [
  { id: 'design', label: 'Graphic & Visual Design', desc: 'Branding, stage motion, digital assets' },
  { id: 'worship', label: 'Music, Vocals & Worship', desc: 'Band instruments, singers, choir' },
  { id: 'media', label: 'Video & Photography', desc: 'Shooting, reels, color grading, recap' },
  { id: 'writing', label: 'Writing & Storytelling', desc: 'Devotionals, copy, newsletter, scripts' },
  { id: 'sound', label: 'Sound & Stage Lighting', desc: 'FOH mixing, DMX lighting, live streaming' },
  { id: 'tech', label: 'Tech & Web Development', desc: 'Apps, web, automation, presentation tech' },
  { id: 'host', label: 'Hospitality & Welcome Host', desc: 'Greeting, barista lounge, connect desk' },
  { id: 'ops', label: 'Stage Management & Ops', desc: 'Service cues, backstage, logistics' }
]

const toggleInterest = (id: string) => {
  if (form.interests.includes(id)) {
    form.interests = form.interests.filter(item => item !== id)
  } else {
    form.interests.push(id)
  }
}

// Validation & Submit Handler
const handleSubmit = async () => {
  // Clear all errors
  errors.fullName = ''
  errors.email = ''
  errors.phone = ''
  errors.interests = ''
  errors.motivation = ''
  errorMessage.value = ''

  let hasError = false

  if (!form.fullName.trim()) {
    errors.fullName = 'Please enter your full name.'
    hasError = true
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!form.email.trim()) {
    errors.email = 'Please provide a valid email address.'
    hasError = true
  } else if (!emailRegex.test(form.email.trim())) {
    errors.email = 'Invalid email address format.'
    hasError = true
  }

  if (!form.phone.trim()) {
    errors.phone = 'Please provide your WhatsApp or phone number.'
    hasError = true
  }

  if (form.interests.length === 0) {
    errors.interests = 'Please select at least one area of interest.'
    hasError = true
  }

  if (!form.motivation.trim() || form.motivation.trim().length < 15) {
    errors.motivation = 'Please share a brief motivation of at least 15 characters.'
    hasError = true
  }

  if (hasError) {
    submissionState.value = 'error'
    errorMessage.value = 'Please complete all required fields.'
    return
  }

  // Trigger loading
  submissionState.value = 'loading'

  // Simulate dummy backend submission
  try {
    await new Promise(resolve => setTimeout(resolve, 1400))
    submissionState.value = 'success'
  } catch {
    submissionState.value = 'error'
    errorMessage.value = 'A connection error occurred. Please try again.'
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
  submissionState.value = 'idle'
}
</script>
