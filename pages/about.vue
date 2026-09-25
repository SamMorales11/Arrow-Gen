<template>
  <div class="min-h-screen flex flex-col bg-background text-foreground">

    <!-- ====================================================================
         1. ABOUT HEADER
         ==================================================================== -->
    <section class="relative px-4 sm:px-6 lg:px-8 py-16 sm:py-24 bg-retro-grid border-b border-zinc-900 overflow-hidden">
      <!-- Glow ambient light -->
      <div
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 sm:w-[500px] h-96 sm:h-[500px] bg-brand-purple/15 rounded-full blur-[130px] pointer-events-none"
        aria-hidden="true"
      />

      <div class="relative max-w-3xl mx-auto text-center space-y-6 z-10">
        <UiBadge variant="pixel" size="sm">
          IDENTITY &amp; MISSION
        </UiBadge>

        <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-zinc-50 font-sans">
          About <span class="text-brand-yellow">Arrow Gen</span>
        </h1>

        <p class="text-base sm:text-lg text-zinc-400 font-sans leading-relaxed">
          We are a Christ-centered youth and young adult movement committed to forging a generation that is grounded in biblical truth, bold in culture, and launched with divine precision.
        </p>
      </div>
    </section>

    <!-- ====================================================================
         2. WHAT IS ARROW GEN? (THE VISION)
         ==================================================================== -->
    <section class="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
      <div class="space-y-8">
        
        <div class="space-y-3">
          <div class="flex items-center gap-2">
            <span class="w-1.5 h-1.5 rounded-full bg-brand-yellow" />
            <span class="font-pixel text-xs text-brand-yellow tracking-wider">THE VISION</span>
          </div>
          <h2 class="text-2xl sm:text-3xl font-bold text-zinc-100 font-sans">
            Sharpened for Purpose, Released into Culture
          </h2>
        </div>

        <div class="prose prose-invert max-w-none text-zinc-300 text-base sm:text-lg leading-relaxed space-y-5">
          <p>
            Arrow Gen takes its name from ancient wisdom: <span class="text-zinc-100 italic font-serif">"Like arrows in the hands of a warrior are children born in one’s youth."</span> An arrow cannot aim itself; it requires careful shaping, alignment, and an intentional archer.
          </p>
          <p class="text-zinc-400 text-sm sm:text-base leading-relaxed">
            We believe the next generation is not merely the church of tomorrow — we are the church of today. In an era marked by noise and shifting standards, Arrow Gen exists as a grounded community where young people are sharpened in character, anchored in Christ, and launched into society to make an eternal mark.
          </p>
        </div>

        <!-- Scriptural Anchor Callout Card -->
        <div class="p-6 rounded-xl border border-zinc-800 bg-zinc-950/70 border-l-4 border-l-brand-purple flex items-start gap-4">
          <div class="text-brand-purple shrink-0 pt-0.5 font-pixel text-xl">
            ▲
          </div>
          <div class="space-y-1">
            <p class="text-sm font-medium text-zinc-200 italic">
              "He made my mouth like a sharpened sword, in the shadow of his hand he hid me; he made me into a polished arrow and concealed me in his quiver."
            </p>
            <p class="text-xs text-zinc-500 font-mono">
              — Isaiah 49:2
            </p>
          </div>
        </div>

      </div>
    </section>

    <!-- ====================================================================
         3. WHO IS IT FOR?
         ==================================================================== -->
    <section class="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-zinc-950/80 border-t border-b border-zinc-900">
      <div class="max-w-5xl mx-auto space-y-12">
        
        <div class="text-center space-y-3">
          <div class="inline-flex items-center gap-2">
            <span class="w-1.5 h-1.5 rounded-full bg-brand-purple" />
            <span class="font-pixel text-xs text-purple-400 tracking-wider">OUR PEOPLE</span>
          </div>
          <h2 class="text-2xl sm:text-3xl font-bold text-zinc-100 font-sans">
            Who Belongs at Arrow Gen?
          </h2>
          <p class="text-sm text-zinc-400 max-w-md mx-auto">
            Regardless of your background or where you are in your spiritual journey, our doors are open.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <!-- Audience 1 -->
          <UiCard variant="default" padding="lg" class="border-zinc-800/80 hover:border-zinc-700 transition-colors">
            <div class="space-y-3">
              <span class="font-pixel text-xs text-brand-yellow">01 / STUDENTS</span>
              <h3 class="text-lg font-bold text-zinc-100 font-sans">
                High School &amp; Campus
              </h3>
              <p class="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Navigating academic pressure, career choices, and identity. We provide mentors, authentic peer circles, and solid truth for everyday life.
              </p>
            </div>
          </UiCard>

          <!-- Audience 2 -->
          <UiCard variant="default" padding="lg" class="border-zinc-800/80 hover:border-zinc-700 transition-colors">
            <div class="space-y-3">
              <span class="font-pixel text-xs text-brand-purple">02 / PROFESSIONALS</span>
              <h3 class="text-lg font-bold text-zinc-100 font-sans">
                Young Adults &amp; Creatives
              </h3>
              <p class="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Entrepreneurs, artists, coders, and working professionals integrating kingdom ethics and creative excellence into the modern marketplace.
              </p>
            </div>
          </UiCard>

          <!-- Audience 3 -->
          <UiCard variant="default" padding="lg" class="border-zinc-800/80 hover:border-zinc-700 transition-colors">
            <div class="space-y-3">
              <span class="font-pixel text-xs text-zinc-400">03 / SEEKERS</span>
              <h3 class="text-lg font-bold text-zinc-100 font-sans">
                Honest Seekers
              </h3>
              <p class="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Those who have questions, doubts, or have been disconnected from church. We believe in candid, thoughtful discussions free from superficial answers.
              </p>
            </div>
          </UiCard>

        </div>

      </div>
    </section>

    <!-- ====================================================================
         4. CORE VALUES
         ==================================================================== -->
    <section class="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
      <div class="space-y-12">
        
        <div class="text-center space-y-3">
          <UiBadge variant="accent" size="sm">
            PILLARS OF CULTURE
          </UiBadge>
          <h2 class="text-2xl sm:text-3xl font-bold text-zinc-100 font-sans">
            What We Value
          </h2>
          <p class="text-sm text-zinc-400 max-w-lg mx-auto">
            These four non-negotiable convictions shape everything we do across all gatherings and teams.
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
          
          <div class="p-6 rounded-xl border border-zinc-800/80 bg-zinc-950/60 space-y-3">
            <div class="flex items-center gap-2">
              <span class="font-pixel text-xs text-brand-yellow">#01</span>
              <h4 class="text-base font-bold text-zinc-100">Bold &amp; Authentic Faith</h4>
            </div>
            <p class="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              We pursue God wholeheartedly through sincere worship, scriptural depth, and uncompromising reliance on the Holy Spirit.
            </p>
          </div>

          <div class="p-6 rounded-xl border border-zinc-800/80 bg-zinc-950/60 space-y-3">
            <div class="flex items-center gap-2">
              <span class="font-pixel text-xs text-purple-400">#02</span>
              <h4 class="text-base font-bold text-zinc-100">Radical Belonging</h4>
            </div>
            <p class="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              Real community over performance. We practice hospitality, mutual care, and genuine vulnerability in life groups across the city.
            </p>
          </div>

          <div class="p-6 rounded-xl border border-zinc-800/80 bg-zinc-950/60 space-y-3">
            <div class="flex items-center gap-2">
              <span class="font-pixel text-xs text-zinc-300">#03</span>
              <h4 class="text-base font-bold text-zinc-100">Creative Excellence</h4>
            </div>
            <p class="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              We bring our highest craft to music, technology, media, and design to reflect the beauty and majesty of our Creator.
            </p>
          </div>

          <div class="p-6 rounded-xl border border-zinc-800/80 bg-zinc-950/60 space-y-3">
            <div class="flex items-center gap-2">
              <span class="font-pixel text-xs text-brand-yellow">#04</span>
              <h4 class="text-base font-bold text-zinc-100">Kingdom Impact</h4>
            </div>
            <p class="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              Faith is expressed through outward service. We stand with the marginalized, care for our neighborhoods, and love our cities practically.
            </p>
          </div>

        </div>

      </div>
    </section>

    <!-- ====================================================================
         5. BOTTOM CTA STRIP
         ==================================================================== -->
    <section class="border-t border-zinc-900 bg-zinc-950/90 py-16 px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto text-center space-y-6">
        <h3 class="text-2xl sm:text-3xl font-bold text-zinc-100 font-sans">
          Ready to Experience the Community?
        </h3>
        <p class="max-w-lg mx-auto text-sm text-zinc-400 leading-relaxed">
          Join our weekend services or plan your first visit. There is a place prepared and waiting for you.
        </p>
        <div class="flex flex-wrap items-center justify-center gap-4 pt-2">
          <UiButton
            variant="pixel"
            size="md"
            @click="navigateTo('/schedule')"
          >
            VIEW GATHERINGS
          </UiButton>
          <UiButton
            variant="accent"
            size="md"
            @click="navigateTo('/first-time')"
          >
            FIRST TIME GUIDE
          </UiButton>
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
  title: 'About Arrow Gen — Vision, Values & Next Generation Movement',
  ogTitle: 'About Arrow Gen — Sharpened for Purpose, Released into Culture',
  description: 'Discover the vision, mission, and kingdom values of Arrow Gen. We are a Christ-centered community raising young disciples to be bold in culture and rooted in truth.',
  ogDescription: 'Like arrows in the hands of a warrior. Discover our identity, pastors, leadership, and vision for the next generation.',
  ogImage: '/logo-arrow.png',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: 'About Arrow Gen — Vision & Values',
  twitterDescription: 'Raising a generation grounded in biblical truth and released into culture with divine precision.',
  twitterImage: '/logo-arrow.png'
})

useHead({
  htmlAttrs: { lang: 'en' }
})
</script>
