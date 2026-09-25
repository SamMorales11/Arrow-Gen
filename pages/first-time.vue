<template>
  <div class="min-h-screen flex flex-col bg-background text-foreground">

    <!-- ====================================================================
         1. HERO HEADER
         ==================================================================== -->
    <section class="relative px-4 sm:px-6 lg:px-8 py-16 sm:py-24 bg-retro-grid border-b border-zinc-900 overflow-hidden">
      <!-- Glow ambient light -->
      <div
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 sm:w-[550px] h-96 sm:h-[550px] bg-brand-purple/15 rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true"
      />

      <div class="relative max-w-3xl mx-auto text-center space-y-6 z-10">
        <UiBadge variant="pixel" size="sm">
          WELCOME TO THE FAMILY
        </UiBadge>

        <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-zinc-50 font-sans">
          First Time <span class="text-brand-yellow">Here?</span>
        </h1>

        <p class="text-base sm:text-lg text-zinc-400 font-sans leading-relaxed">
          We know visiting a new church community can feel intimidating. Take a breath — there are no dress codes, no secret handshakes, and no expectations. You are welcome here exactly as you are.
        </p>

        <!-- Quick Jump Buttons -->
        <div class="flex flex-wrap items-center justify-center gap-3 pt-4">
          <UiButton
            variant="pixel"
            size="md"
            @click="navigateTo('/schedule')"
          >
            VIEW SCHEDULE
          </UiButton>
          <UiButton
            variant="outline"
            size="md"
            @click="scrollToSection('what-to-expect')"
          >
            What to Expect
          </UiButton>
        </div>
      </div>
    </section>

    <!-- ====================================================================
         2. STEP-BY-STEP NEWCOMER ROADMAP
         ==================================================================== -->
    <section id="what-to-expect" class="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
      <div class="space-y-12">
        
        <div class="text-center space-y-3">
          <UiBadge variant="accent" size="sm">
            SIMPLE ROADMAP
          </UiBadge>
          <h2 class="text-2xl sm:text-3xl font-bold text-zinc-100 font-sans">
            What Your First Visit Looks Like
          </h2>
          <p class="text-sm text-zinc-400 max-w-lg mx-auto">
            From arrival to after-service hangout, here is the simple flow of what you can look forward to.
          </p>
        </div>

        <!-- 4 Simple Steps Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <!-- Step 1 -->
          <UiCard variant="default" padding="lg" class="border-zinc-800/80 hover:border-zinc-700 transition-colors">
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <span class="font-pixel text-xs text-brand-yellow bg-zinc-900 border border-zinc-800 px-2.5 py-1 rounded">
                  STEP 01
                </span>
                <span class="text-xs text-zinc-500 font-mono">15 Mins Prior</span>
              </div>
              <h3 class="text-xl font-bold text-zinc-100 font-sans">
                Arrive &amp; Grab a Drink
              </h3>
              <p class="text-sm text-zinc-400 leading-relaxed">
                Parking is straightforward and free. Head through the main glass doors into the atrium. Grab complimentary handcrafted coffee or cold brew from our community barista bar.
              </p>
            </div>
          </UiCard>

          <!-- Step 2 -->
          <UiCard variant="default" padding="lg" class="border-zinc-800/80 hover:border-zinc-700 transition-colors">
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <span class="font-pixel text-xs text-purple-400 bg-zinc-900 border border-zinc-800 px-2.5 py-1 rounded">
                  STEP 02
                </span>
                <span class="text-xs text-zinc-500 font-mono">Atrium Desk</span>
              </div>
              <h3 class="text-xl font-bold text-zinc-100 font-sans">
                Say Hi at the Welcome Desk
              </h3>
              <p class="text-sm text-zinc-400 leading-relaxed">
                Look for the glowing yellow <span class="font-pixel text-[10px] text-brand-yellow">"START HERE"</span> sign. Our host team will give you a first-timer gift pack and show you where the auditorium and restrooms are.
              </p>
            </div>
          </UiCard>

          <!-- Step 3 -->
          <UiCard variant="default" padding="lg" class="border-zinc-800/80 hover:border-zinc-700 transition-colors">
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <span class="font-pixel text-xs text-zinc-300 bg-zinc-900 border border-zinc-800 px-2.5 py-1 rounded">
                  STEP 03
                </span>
                <span class="text-xs text-zinc-500 font-mono">75-80 Mins</span>
              </div>
              <h3 class="text-xl font-bold text-zinc-100 font-sans">
                Experience the Gathering
              </h3>
              <p class="text-sm text-zinc-400 leading-relaxed">
                Sit wherever you want. Our service opens with heartfelt modern worship followed by practical, scripture-grounded teaching. We will <span class="text-zinc-200 font-medium">never</span> single you out or make you speak.
              </p>
            </div>
          </UiCard>

          <!-- Step 4 -->
          <UiCard variant="default" padding="lg" class="border-zinc-800/80 hover:border-zinc-700 transition-colors">
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <span class="font-pixel text-xs text-brand-yellow bg-zinc-900 border border-zinc-800 px-2.5 py-1 rounded">
                  STEP 04
                </span>
                <span class="text-xs text-zinc-500 font-mono">Post-Service</span>
              </div>
              <h3 class="text-xl font-bold text-zinc-100 font-sans">
                Connect at The Lounge
              </h3>
              <p class="text-sm text-zinc-400 leading-relaxed">
                Don’t rush out! Join us at the Arrow Connect Lounge for fresh pastries, good conversation, and an opportunity to meet pastors, campus leaders, or find a weekday Life Group.
              </p>
            </div>
          </UiCard>

        </div>

      </div>
    </section>

    <!-- ====================================================================
         3. WHAT YOU SHOULD KNOW (COMMON QUESTIONS)
         ==================================================================== -->
    <section class="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-zinc-950/80 border-t border-b border-zinc-900">
      <div class="max-w-4xl mx-auto space-y-10">
        
        <div class="space-y-2 text-center">
          <h2 class="text-2xl sm:text-3xl font-bold text-zinc-100 font-sans">
            Good to Know Before You Arrive
          </h2>
          <p class="text-sm text-zinc-400">
            A few answers to help you feel completely at ease.
          </p>
        </div>

        <div class="space-y-4">
          <!-- Question 1 -->
          <div class="p-5 rounded-lg border border-zinc-800 bg-zinc-900/60 space-y-2">
            <h4 class="text-base font-semibold text-zinc-100 flex items-center gap-2">
              <span class="text-brand-yellow font-pixel text-xs">Q.</span>
              What should I wear?
            </h4>
            <p class="text-sm text-zinc-400 leading-relaxed pl-6">
              Wear whatever you feel comfortable in. You will see people in jeans, hoodies, sneakers, tees, and casual shirts. We care about you, not your wardrobe.
            </p>
          </div>

          <!-- Question 2 -->
          <div class="p-5 rounded-lg border border-zinc-800 bg-zinc-900/60 space-y-2">
            <h4 class="text-base font-semibold text-zinc-100 flex items-center gap-2">
              <span class="text-brand-yellow font-pixel text-xs">Q.</span>
              Will I be pressured to donate or speak publicly?
            </h4>
            <p class="text-sm text-zinc-400 leading-relaxed pl-6">
              Absolutely not. Giving is for regular attendees who call Arrow Gen their spiritual home. As our guest, the entire experience is our gift to you.
            </p>
          </div>

          <!-- Question 3 -->
          <div class="p-5 rounded-lg border border-zinc-800 bg-zinc-900/60 space-y-2">
            <h4 class="text-base font-semibold text-zinc-100 flex items-center gap-2">
              <span class="text-brand-yellow font-pixel text-xs">Q.</span>
              Can I come alone, or should I bring someone?
            </h4>
            <p class="text-sm text-zinc-400 leading-relaxed pl-6">
              Either way is great! Many young adults show up solo. If you let us know beforehand via our contact page, a host will meet you right at the door so you don't have to navigate alone.
            </p>
          </div>
        </div>

      </div>
    </section>

    <!-- ====================================================================
         4. DUAL CALL-TO-ACTION (SCHEDULE & THE VAULT)
         ==================================================================== -->
    <section class="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        
        <!-- CTA 1: Schedule -->
        <UiCard variant="pixel" padding="lg" class="flex flex-col justify-between space-y-6">
          <div class="space-y-3">
            <UiBadge variant="primary" size="sm">
              PLAN YOUR VISIT
            </UiBadge>
            <h3 class="text-2xl font-bold text-zinc-100 font-sans">
              Ready to Visit Us in Person?
            </h3>
            <p class="text-sm text-zinc-400 leading-relaxed">
              Check out all service dates, times, and location details for our upcoming weekend services and midweek gatherings.
            </p>
          </div>

          <div class="pt-4">
            <UiButton
              variant="pixel"
              size="md"
              block
              @click="navigateTo('/schedule')"
            >
              VIEW GATHERING SCHEDULE
            </UiButton>
          </div>
        </UiCard>

        <!-- CTA 2: The Vault -->
        <UiCard variant="default" padding="lg" class="flex flex-col justify-between space-y-6 border-zinc-800 bg-zinc-950">
          <div class="space-y-3">
            <UiBadge variant="accent" size="sm">
              DIGITAL RESOURCE ARCHIVE
            </UiBadge>
            <h3 class="text-2xl font-bold text-zinc-100 font-sans">
              Explore The Vault
            </h3>
            <p class="text-sm text-zinc-400 leading-relaxed">
              Curious about what we teach? Dive into our sermon notes, media resources, discipleship reading guides, and worship tracks.
            </p>
          </div>

          <div class="pt-4">
            <UiButton
              variant="accent"
              size="md"
              block
              @click="navigateTo('/vault')"
            >
              EXPLORE THE VAULT
            </UiButton>
          </div>
        </UiCard>

      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
// Terapkan Layout Default Publik
definePageMeta({
  layout: 'default'
})

// Head SEO & Open Graph Meta Tags
useSeoMeta({
  title: 'First Time Here? — Plan Your Visit to Arrow Gen',
  ogTitle: 'First Time Here? — Welcome to Arrow Gen',
  description: 'Everything you need to know for your first visit to Arrow Gen youth and young adult church community. What to expect, parking, translations, and warm hospitality.',
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

const scrollToSection = (id: string) => {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>
