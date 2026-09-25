<template>
  <div
    role="status"
    aria-busy="true"
    aria-label="Loading..."
    :class="skeletonClasses"
    :style="customStyles"
  >
    <span class="sr-only">Loading...</span>
  </div>
</template>

<script setup lang="ts">
import { computed, type CSSProperties } from 'vue'

type SkeletonVariant = 'text' | 'circular' | 'rectangular' | 'card' | 'pixel'
type SkeletonAnimation = 'pulse' | 'wave' | 'none'
type SkeletonRounded = 'none' | 'sm' | 'md' | 'lg' | 'full'

interface Props {
  variant?: SkeletonVariant
  animate?: SkeletonAnimation
  rounded?: SkeletonRounded
  width?: string
  height?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'rectangular',
  animate: 'pulse',
  rounded: 'md',
  width: undefined,
  height: undefined
})

const customStyles = computed<CSSProperties>(() => {
  const styles: CSSProperties = {}
  if (props.width) styles.width = props.width
  if (props.height) styles.height = props.height
  return styles
})

const skeletonClasses = computed(() => {
  const base = [
    'bg-zinc-800/60 overflow-hidden select-none'
  ]

  // Animations
  const animations: Record<SkeletonAnimation, string> = {
    pulse: 'animate-pulse',
    wave: 'relative after:absolute after:inset-0 after:-translate-x-full after:animate-[shimmer_2s_infinite] after:bg-gradient-to-r after:from-transparent after:via-white/5 after:to-transparent',
    none: ''
  }

  // Rounded styles
  const roundeds: Record<SkeletonRounded, string> = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full'
  }

  // Variants preset sizing & rounding
  const variants: Record<SkeletonVariant, string> = {
    text: 'h-4 w-3/4 rounded',
    circular: 'w-10 h-10 rounded-full shrink-0',
    rectangular: 'w-full h-24',
    card: 'w-full h-48 border border-zinc-800/80',
    pixel: 'w-full h-20 rounded-none border-2 border-zinc-800 bg-zinc-900 shadow-pixel-zinc'
  }

  const roundedClass = props.variant === 'circular'
    ? 'rounded-full'
    : props.variant === 'pixel'
      ? 'rounded-none'
      : roundeds[props.rounded]

  return [...base, animations[props.animate], variants[props.variant], roundedClass].join(' ')
})
</script>
