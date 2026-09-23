<template>
  <div :class="['w-full', compact ? 'py-4' : 'py-12 sm:py-16']">
    <UiCard
      variant="pixel"
      padding="lg"
      class="max-w-3xl mx-auto w-full border-zinc-800 bg-zinc-950/95"
    >
      <div class="space-y-6">
        
        <!-- Header -->
        <div class="space-y-2.5 text-center sm:text-left border-b border-zinc-800 pb-5">
          <div class="flex items-center justify-center sm:justify-start gap-2">
            <UiBadge variant="accent" size="sm">
              DIRECT PASTORAL LINE
            </UiBadge>
            <span class="text-xs text-emerald-400 flex items-center gap-1.5 font-medium">
              <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              WhatsApp Active
            </span>
          </div>

          <h2 class="text-2xl sm:text-3xl font-bold text-zinc-100 font-sans tracking-tight">
            {{ customTitle }}
          </h2>

          <p class="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-xl">
            {{ customSubtitle }}
          </p>
        </div>

        <!-- Form Area -->
        <form class="space-y-5" @submit.prevent="handleConnect">
          
          <!-- Optional Name Field -->
          <UiInput
            v-model="name"
            type="text"
            label="Your Name (Optional)"
            placeholder="e.g. Alex (or leave blank to stay anonymous)"
            hint="You can share your real name or remain anonymous"
          />

          <!-- Quick Topic Pills -->
          <div class="space-y-2">
            <label class="text-xs sm:text-sm font-medium text-zinc-200 select-none flex items-center justify-between">
              <span>What would you like to talk about?</span>
              <span class="text-[11px] text-zinc-500 font-mono">Select a topic</span>
            </label>

            <div class="flex flex-wrap gap-2">
              <button
                v-for="topic in topics"
                :key="topic.id"
                type="button"
                :class="[
                  'px-3 py-1.5 rounded-lg text-xs font-medium transition-all border select-none flex items-center gap-1.5',
                  selectedTopic === topic.id
                    ? 'bg-brand-purple/20 border-brand-purple text-purple-200 font-semibold'
                    : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700'
                ]"
                @click="selectedTopic = selectedTopic === topic.id ? '' : topic.id"
              >
                <span>{{ topic.icon }}</span>
                <span>{{ topic.label }}</span>
              </button>
            </div>
          </div>

          <!-- Message Field (Required) -->
          <UiInput
            v-model="message"
            type="textarea"
            label="Your Message"
            placeholder="Share what is on your heart, a prayer request, or a question..."
            hint="Type your message — it will be prefilled directly into WhatsApp"
            :error="messageError"
            required
            rows="4"
          />

          <!-- Submission & Reassurance Info -->
          <div class="pt-4 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div class="flex items-center gap-2 text-xs text-zinc-400">
              <svg class="w-4 h-4 text-emerald-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span>Encrypted end-to-end chat via WhatsApp</span>
            </div>

            <UiButton
              type="submit"
              variant="accent"
              size="md"
              class="w-full sm:w-auto font-medium"
            >
              <template #leading>
                <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
              </template>
              CHAT ON WHATSAPP
            </UiButton>
          </div>

        </form>

      </div>
    </UiCard>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  customTitle?: string
  customSubtitle?: string
  compact?: boolean
  phoneNumber?: string
}

const props = withDefaults(defineProps<Props>(), {
  customTitle: 'Need Someone to Talk To?',
  customSubtitle: 'Whether you need someone to pray with you, have life questions, or just want to chat with our pastoral team — we are only a message away.',
  compact: false,
  phoneNumber: undefined
})

// Konfigurasi Nomor WhatsApp (Dapat diatur melalui runtimeConfig atau .env)
const config = useRuntimeConfig()
const DEFAULT_WHATSAPP_NUMBER = '6281234567890'

const name = ref('')
const selectedTopic = ref('')
const message = ref('')
const messageError = ref('')

const topics = [
  { id: 'prayer', label: 'Prayer Request', icon: '🙏' },
  { id: 'counseling', label: 'Life & Counseling', icon: '💬' },
  { id: 'faith', label: 'Faith & Theology', icon: '❓' },
  { id: 'connect', label: 'Saying Hi & Connect', icon: '👋' }
]

const handleConnect = () => {
  messageError.value = ''
  
  if (!message.value.trim()) {
    messageError.value = 'Please write a message before connecting on WhatsApp.'
    return
  }

  // Tentukan nomor tujuan (Prioritas: Prop -> runtimeConfig -> Default constant)
  const targetNumber = 
    props.phoneNumber || 
    (config.public?.whatsappNumber as string) || 
    DEFAULT_WHATSAPP_NUMBER

  // Bersihkan format nomor (hanya digit)
  const sanitizedNumber = targetNumber.replace(/\D/g, '')

  // Format pesan WhatsApp yang rapi
  const topicLabel = topics.find(t => t.id === selectedTopic.value)?.label || 'General Inquiry'
  const senderName = name.value.trim() ? name.value.trim() : 'Anonymous'

  const lines = [
    `*Hello Arrow Gen Team!*`,
    ``,
    `*Name:* ${senderName}`,
    `*Topic:* ${topicLabel}`,
    ``,
    `*Message:*`,
    `"${message.value.trim()}"`,
    ``,
    `_Sent via Arrow Gen Connect Portal_`
  ]

  const encodedText = encodeURIComponent(lines.join('\n'))
  const whatsappUrl = `https://wa.me/${sanitizedNumber}?text=${encodedText}`

  // Arahkan pengguna ke WhatsApp
  if (typeof window !== 'undefined') {
    window.open(whatsappUrl, '_blank')
  }
}
</script>
