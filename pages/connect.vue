<template>
  <div class="min-h-screen flex flex-col bg-background text-foreground">

    <!-- ====================================================================
         1. HERO HEADER BANNER
         ==================================================================== -->
    <section class="relative px-4 sm:px-6 lg:px-8 py-16 sm:py-20 bg-retro-grid border-b border-zinc-900 overflow-hidden">
      <!-- Glow ambient light -->
      <div
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 sm:w-[550px] h-96 sm:h-[550px] bg-brand-purple/15 rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true"
      />

      <div class="relative max-w-3xl mx-auto text-center space-y-6 z-10">
        <UiBadge variant="pixel" size="sm">
          CONFIDENTIAL CARE
        </UiBadge>

        <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-zinc-50 font-sans">
          Need Someone to <span class="text-brand-yellow">Talk To?</span>
        </h1>

        <p class="text-base sm:text-lg text-zinc-400 font-sans leading-relaxed">
          Life gets heavy, decisions feel unclear, and prayer makes a difference. Our pastoral hosts and counseling prayer leaders are here to walk with you.
        </p>
      </div>
    </section>

    <!-- ====================================================================
         2. WHATSAPP FORM SECTION (USING COMPONENT)
         ==================================================================== -->
    <section class="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
      <WhatsAppConnectSection
        custom-title="Send a Direct Message"
        custom-subtitle="Type your message below and click 'Chat on WhatsApp'. You will be connected directly with an Arrow Gen pastoral host."
        compact
      />
    </section>

    <!-- ====================================================================
         3. ADDITIONAL WAYS TO CONNECT
         ==================================================================== -->
    <section class="border-t border-zinc-900 bg-zinc-950/70 py-16 px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto space-y-8">
        <div class="text-center space-y-2">
          <span class="font-pixel text-[11px] text-brand-yellow">OTHER CHANNELS</span>
          <h3 class="text-2xl font-bold text-zinc-100 font-sans">
            Prefer Other Ways to Reach Out?
          </h3>
          <p class="text-xs sm:text-sm text-zinc-400">
            We are available in person during weekly gatherings or through digital channels.
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div class="p-5 rounded-xl border border-zinc-800 bg-zinc-900/60 space-y-2 text-center">
            <span class="font-pixel text-xs text-brand-purple block mb-1">IN PERSON</span>
            <h4 class="text-sm font-semibold text-zinc-200">The Connect Lounge</h4>
            <p class="text-xs text-zinc-400">Visit our host desk every Saturday 04:30 PM &amp; Sunday 09:30 AM.</p>
          </div>

          <div class="p-5 rounded-xl border border-zinc-800 bg-zinc-900/60 space-y-2 text-center">
            <span class="font-pixel text-xs text-brand-yellow block mb-1">EMAIL CARE</span>
            <h4 class="text-sm font-semibold text-zinc-200">care@arrowgen.org</h4>
            <p class="text-xs text-zinc-400">For detailed prayer requests, counseling appointments, or pastoral letters.</p>
          </div>

          <div class="p-5 rounded-xl border border-zinc-800 bg-zinc-900/60 space-y-2 text-center">
            <span class="font-pixel text-xs text-zinc-300 block mb-1">ANONYMOUS</span>
            <h4 class="text-sm font-semibold text-zinc-200">The Vault</h4>
            <p class="text-xs text-zinc-400">Drop an encrypted, unsigned question into our leadership Q&amp;A vault.</p>
            <NuxtLink to="/vault" class="inline-block pt-1 text-xs text-brand-yellow hover:underline font-pixel text-[10px]">
              OPEN VAULT &rarr;
            </NuxtLink>
          </div>
        </div>
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
  title: 'Connect & Pastoral Care — We Are Here to Listen and Pray',
  ogTitle: 'Connect & Pastoral Care — Arrow Gen',
  description: 'Need someone to talk to, ask questions, or pray with? Connect directly and confidentially with the Arrow Gen pastoral host team via WhatsApp or in person.',
  ogDescription: 'Reach out to our pastoral team for prayer, guidance, or simply finding a friendly face this week.',
  ogImage: '/logo-arrow.png',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Connect with Arrow Gen Pastoral Care',
  twitterDescription: 'Confidential prayer and pastoral care for youth and young adults.',
  twitterImage: '/logo-arrow.png'
})

useHead({
  htmlAttrs: { lang: 'en' }
})
</script>
