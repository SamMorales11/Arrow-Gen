<template>
  <span :class="badgeClasses">
    <!-- Status Dot -->
    <span
      v-if="dot"
      :class="['shrink-0 rounded-full', dotSizeClass, dotColorClass]"
      aria-hidden="true"
    />

    <!-- Leading Slot -->
    <span
      v-if="$slots.leading"
      class="inline-flex items-center shrink-0"
      aria-hidden="true"
    >
      <slot name="leading" />
    </span>

    <!-- Content Slot -->
    <span class="truncate">
      <slot />
    </span>
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'

export type BadgeVariant = 'primary' | 'secondary' | 'accent' | 'outline' | 'success' | 'danger' | 'pixel'
export type BadgeSize = 'sm' | 'md' | 'lg'

interface Props {
  variant?: BadgeVariant
  size?: BadgeSize
  dot?: boolean
  pill?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  dot: false,
  pill: false
})

const badgeClasses = computed(() => {
  const base = [
    'inline-flex items-center gap-1.5 font-medium select-none',
    props.pill ? 'rounded-full' : props.variant === 'pixel' ? 'rounded-none' : 'rounded-md'
  ]

  const sizes: Record<BadgeSize, string> = {
    sm: props.variant === 'pixel' ? 'font-pixel text-[9px] px-1.5 py-0.5' : 'text-[11px] px-2 py-0.5',
    md: props.variant === 'pixel' ? 'font-pixel text-[10px] px-2 py-1' : 'text-xs px-2.5 py-1',
    lg: props.variant === 'pixel' ? 'font-pixel text-xs px-3 py-1.5' : 'text-sm px-3.5 py-1.5'
  }

  const variants: Record<BadgeVariant, string> = {
    primary: 'bg-brand-purple/20 text-purple-300 border border-brand-purple/40',
    secondary: 'bg-zinc-800 text-zinc-300 border border-zinc-700/60',
    accent: 'bg-brand-yellow/15 text-amber-300 border border-brand-yellow/30',
    outline: 'bg-transparent text-zinc-300 border border-zinc-700',
    success: 'bg-emerald-950/40 text-emerald-400 border border-emerald-800/40',
    danger: 'bg-rose-950/40 text-rose-400 border border-rose-800/40',
    pixel: 'font-pixel border-2 border-zinc-100 bg-brand-purple text-white shadow-pixel-yellow'
  }

  return [...base, sizes[props.size], variants[props.variant]].join(' ')
})

const dotSizeClass = computed(() => {
  const sizes: Record<BadgeSize, string> = {
    sm: 'w-1.5 h-1.5',
    md: 'w-2 h-2',
    lg: 'w-2.5 h-2.5'
  }
  return sizes[props.size]
})

const dotColorClass = computed(() => {
  const colors: Record<BadgeVariant, string> = {
    primary: 'bg-brand-purple',
    secondary: 'bg-zinc-400',
    accent: 'bg-brand-yellow',
    outline: 'bg-zinc-400',
    success: 'bg-emerald-400 animate-pulse',
    danger: 'bg-rose-400 animate-pulse',
    pixel: 'bg-brand-yellow'
  }
  return colors[props.variant]
})
</script>
