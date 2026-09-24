<template>
  <div class="min-h-screen flex flex-col bg-background text-foreground">

    <!-- ====================================================================
         1. HERO HEADER BANNER
         ==================================================================== -->
    <section class="relative px-4 sm:px-6 lg:px-8 py-14 sm:py-20 bg-retro-grid border-b border-zinc-900 overflow-hidden">
      <!-- Glow ambient light -->
      <div
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 sm:w-[500px] h-96 sm:h-[500px] bg-brand-purple/15 rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true"
      />

      <div class="relative max-w-2xl mx-auto text-center space-y-4 z-10">
        <UiBadge variant="pixel" size="sm">
          PORTAL AUTHENTICATION
        </UiBadge>

        <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-zinc-50 font-sans">
          Internal <span class="text-brand-yellow">Access</span>
        </h1>

        <p class="text-sm sm:text-base text-zinc-400 font-sans leading-relaxed">
          Secure portal sign in for Arrow Gen Pastors, Ministry Leads, and Creative Servants.
        </p>
      </div>
    </section>

    <!-- ====================================================================
         2. LOGIN FORM SECTION
         ==================================================================== -->
    <section class="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <div class="w-full max-w-md">

        <!-- SUCCESS STATE NOTICE -->
        <UiCard
          v-if="submissionState === 'success'"
          variant="pixel"
          padding="lg"
          class="text-center space-y-5 animate-fade-in"
        >
          <div class="w-14 h-14 rounded-full bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400">
            <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <div class="space-y-2">
            <UiBadge variant="accent" size="sm">
              AUTHENTICATED
            </UiBadge>
            <h2 class="text-2xl font-bold text-zinc-100 font-sans">
              Welcome Back!
            </h2>
            <p class="text-xs sm:text-sm text-zinc-400">
              Redirecting you to your workspace...
            </p>
          </div>

          <div class="pt-2 flex items-center justify-center">
            <div class="w-6 h-6 border-2 border-brand-yellow border-t-transparent rounded-full animate-spin" />
          </div>
        </UiCard>

        <!-- LOGIN FORM CARD -->
        <UiCard
          v-else
          variant="default"
          padding="lg"
          class="border-zinc-800/80 bg-zinc-950/80 shadow-2xl space-y-6"
        >
          <div class="border-b border-zinc-800 pb-4 space-y-1">
            <div class="flex items-center justify-between">
              <h2 class="text-lg font-bold text-zinc-100 font-sans">
                Sign In to Account
              </h2>
              <span class="font-pixel text-[10px] text-zinc-500 uppercase">
                v1.0 AUTH
              </span>
            </div>
            <p class="text-xs text-zinc-400">
              Enter your ministry email and authorized credentials.
            </p>
          </div>

          <!-- Error Alert Banner -->
          <div
            v-if="submissionState === 'error'"
            class="p-3.5 rounded-lg bg-rose-950/40 border border-rose-800/60 text-rose-300 text-xs flex items-center gap-2.5 animate-fade-in"
            role="alert"
          >
            <svg class="w-4 h-4 shrink-0 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>{{ errorMessage || 'Failed to authenticate. Please verify your credentials.' }}</span>
          </div>

          <!-- Form Element -->
          <form class="space-y-4" @submit.prevent="handleLogin">
            <!-- Email Input -->
            <UiInput
              v-model="form.email"
              type="email"
              label="Ministry Email"
              placeholder="e.g. pastor@arrowgen.church"
              :error="errors.email"
              :disabled="submissionState === 'loading'"
              required
            >
              <template #leading>
                <svg class="w-4 h-4 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
              </template>
            </UiInput>

            <!-- Password Input -->
            <UiInput
              v-model="form.password"
              type="password"
              label="Password"
              placeholder="••••••••••••"
              :error="errors.password"
              :disabled="submissionState === 'loading'"
              required
            >
              <template #leading>
                <svg class="w-4 h-4 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </template>
            </UiInput>

            <!-- Submit Button -->
            <div class="pt-2">
              <UiButton
                type="submit"
                variant="pixel"
                size="lg"
                class="w-full"
                :loading="submissionState === 'loading'"
                :disabled="submissionState === 'loading'"
              >
                SIGN IN
              </UiButton>
            </div>
          </form>

          <!-- Help Desk Footer -->
          <div class="pt-4 border-t border-zinc-800/80 text-center space-y-1 text-xs text-zinc-500">
            <p>Don't have leadership access or forgot your password?</p>
            <p class="text-zinc-400">
              Please contact the Arrow Gen Systems Administrator or WhatsApp Helpdesk.
            </p>
          </div>
        </UiCard>

      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { signIn } from '~/utils/auth-client'

// Layout Default Publik
definePageMeta({
  layout: 'default'
})

// Head SEO
useHead({
  title: 'Sign In | Arrow Gen Leadership & Ministry',
  meta: [
    {
      name: 'description',
      content: 'Authorized portal sign in for Arrow Gen Pastors, Ministry Directors, and Servants.'
    }
  ]
})

// Form State
type FormState = 'idle' | 'loading' | 'success' | 'error'

const submissionState = ref<FormState>('idle')
const errorMessage = ref('')

const form = reactive({
  email: '',
  password: ''
})

const errors = reactive({
  email: '',
  password: ''
})

// Validation & Login Handler
const handleLogin = async () => {
  // Reset previous errors
  errors.email = ''
  errors.password = ''
  errorMessage.value = ''

  let hasError = false

  const trimmedEmail = form.email.trim()
  if (!trimmedEmail) {
    errors.email = 'Please enter your ministry email address.'
    hasError = true
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
    errors.email = 'Please provide a valid email format.'
    hasError = true
  }

  if (!form.password) {
    errors.password = 'Password is required.'
    hasError = true
  }

  if (hasError) {
    submissionState.value = 'error'
    errorMessage.value = 'Please provide valid credentials in all required fields.'
    return
  }

  // Trigger loading state
  submissionState.value = 'loading'

  try {
    // Authenticate with Better Auth client
    const res = await signIn.email({
      email: trimmedEmail,
      password: form.password
    })

    if (res.error) {
      submissionState.value = 'error'
      errorMessage.value =
        res.error.message ||
        'Authentication failed. Please verify your email and password.'
      return
    }

    // Success State
    submissionState.value = 'success'

    // Extract user role from response or fallback to 'servant'
    const userRole = (res.data?.user as { role?: string } | undefined)?.role || 'servant'

    const route = useRoute()
    const targetRedirect = (route.query.redirect as string) || (userRole === 'admin' ? '/admin' : '/servant')

    // Delay slightly for smooth transition animation
    setTimeout(async () => {
      await navigateTo(targetRedirect)
    }, 700)
  } catch (err: any) {
    submissionState.value = 'error'
    const serverMsg =
      err?.data?.message ||
      err?.message ||
      'An unexpected network error occurred. Please try again.'
    errorMessage.value = serverMsg
  }
}
</script>
