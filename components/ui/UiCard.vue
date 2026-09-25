<template>
  <component
    :is="as"
    :class="cardClasses"
  >
    <!-- Card Header Slot -->
    <header
      v-if="$slots.header"
      :class="['border-b border-zinc-800/80', headerPaddingClass]"
    >
      <slot name="header" />
    </header>

    <!-- Main Card Body Slot -->
    <div :class="bodyPaddingClass">
      <slot />
    </div>

    <!-- Card Footer Slot -->
    <footer
      v-if="$slots.footer"
      :class="['border-t border-zinc-800/80 bg-zinc-950/40', footerPaddingClass]"
    >
      <slot name="footer" />
    </footer>
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type CardVariant = 'default' | 'elevated' | 'outline' | 'pixel'
type CardPadding = 'none' | 'sm' | 'md' | 'lg'

interface Props {
  as?: string
  variant?: CardVariant
  padding?: CardPadding
  hoverable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  as: 'div',
  variant: 'default',
  padding: 'md',
  hoverable: false
})

const cardClasses = computed(() => {
  const base = [
    'rounded-xl overflow-hidden transition-all duration-200'
  ]

  const variants: Record<CardVariant, string> = {
    default: 'bg-zinc-950/80 border border-zinc-800/80 text-zinc-100 backdrop-blur-sm',
    elevated: 'bg-zinc-900 border border-zinc-700/60 shadow-xl shadow-black/40 text-zinc-100',
    outline: 'bg-transparent border border-zinc-800 text-zinc-200',
    pixel: 'rounded-none bg-zinc-950 border-2 border-zinc-700 shadow-pixel-purple text-zinc-100'
  }

  const hoverStyles = props.hoverable
    ? props.variant === 'pixel'
      ? 'hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-pixel-yellow cursor-pointer'
      : 'hover:border-zinc-700 hover:shadow-lg hover:shadow-brand-purple/10 cursor-pointer'
    : ''

  return [...base, variants[props.variant], hoverStyles].join(' ')
})

const bodyPaddingClass = computed(() => {
  const paddings: Record<CardPadding, string> = {
    none: 'p-0',
    sm: 'p-3 sm:p-4',
    md: 'p-5 sm:p-6',
    lg: 'p-6 sm:p-8'
  }
  return paddings[props.padding]
})

const headerPaddingClass = computed(() => {
  const paddings: Record<CardPadding, string> = {
    none: 'p-0',
    sm: 'px-3 py-2.5 sm:px-4',
    md: 'px-5 py-4 sm:px-6',
    lg: 'px-6 py-5 sm:px-8'
  }
  return paddings[props.padding]
})

const footerPaddingClass = computed(() => {
  const paddings: Record<CardPadding, string> = {
    none: 'p-0',
    sm: 'px-3 py-2 sm:px-4',
    md: 'px-5 py-3 sm:px-6',
    lg: 'px-6 py-4 sm:px-8'
  }
  return paddings[props.padding]
})
</script>
