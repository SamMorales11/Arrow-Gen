<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :aria-disabled="disabled || loading"
    :aria-busy="loading"
    :aria-label="ariaLabel"
    :class="buttonClasses"
    @click="handleClick"
  >
    <!-- Loading Spinner -->
    <svg
      v-if="loading"
      class="animate-spin -ml-1 mr-2 h-4 w-4 shrink-0"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      />
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>

    <!-- Leading Icon Slot -->
    <span
      v-if="$slots.leading && !loading"
      class="mr-2 inline-flex items-center shrink-0"
      aria-hidden="true"
    >
      <slot name="leading" />
    </span>

    <!-- Default Content Slot -->
    <span class="inline-flex items-center">
      <slot />
    </span>

    <!-- Trailing Icon Slot -->
    <span
      v-if="$slots.trailing"
      class="ml-2 inline-flex items-center shrink-0"
      aria-hidden="true"
    >
      <slot name="trailing" />
    </span>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost' | 'pixel' | 'danger'
type ButtonSize = 'sm' | 'md' | 'lg' | 'icon'

interface Props {
  variant?: ButtonVariant
  size?: ButtonSize
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  loading?: boolean
  block?: boolean
  ariaLabel?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  type: 'button',
  disabled: false,
  loading: false,
  block: false,
  ariaLabel: undefined
})

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

const handleClick = (event: MouseEvent) => {
  if (props.disabled || props.loading) {
    event.preventDefault()
    return
  }
  emit('click', event)
}

const buttonClasses = computed(() => {
  const base = [
    'inline-flex items-center justify-center font-medium transition-all select-none',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-black',
    props.block ? 'w-full' : 'w-auto',
    props.disabled || props.loading ? 'opacity-50 cursor-not-allowed pointer-events-none' : 'cursor-pointer'
  ]

  // Size styles
  const sizes: Record<ButtonSize, string> = {
    sm: 'text-xs px-3 py-1.5 rounded-md gap-1.5',
    md: 'text-sm px-4 py-2 rounded-lg gap-2',
    lg: 'text-base px-6 py-3 rounded-lg gap-2.5',
    icon: 'p-2 rounded-lg aspect-square'
  }

  // Variant styles
  const variants: Record<ButtonVariant, string> = {
    primary: [
      'bg-brand-purple text-white shadow-sm',
      'hover:bg-brand-purple-hover active:bg-brand-purple-active',
      'focus-visible:ring-brand-purple'
    ].join(' '),

    secondary: [
      'bg-zinc-800 text-zinc-100 border border-zinc-700',
      'hover:bg-zinc-700 active:bg-zinc-600',
      'focus-visible:ring-zinc-400'
    ].join(' '),

    accent: [
      'bg-brand-yellow text-black font-semibold shadow-sm',
      'hover:bg-brand-yellow-hover active:bg-brand-yellow-active',
      'focus-visible:ring-brand-yellow'
    ].join(' '),

    outline: [
      'bg-transparent border border-zinc-700 text-zinc-200',
      'hover:bg-zinc-900 hover:border-zinc-500 hover:text-white active:bg-zinc-800',
      'focus-visible:ring-brand-purple'
    ].join(' '),

    ghost: [
      'bg-transparent text-zinc-300',
      'hover:bg-zinc-900 hover:text-white active:bg-zinc-800',
      'focus-visible:ring-brand-purple'
    ].join(' '),

    danger: [
      'bg-rose-600 text-white shadow-sm font-medium',
      'hover:bg-rose-700 active:bg-rose-800',
      'focus-visible:ring-rose-500'
    ].join(' '),

    pixel: [
      'font-pixel rounded-none border-2 border-zinc-100 bg-brand-purple text-white',
      'shadow-pixel-yellow hover:translate-x-0.5 hover:translate-y-0.5',
      'active:translate-x-1 active:translate-y-1 active:shadow-none',
      'focus-visible:ring-brand-yellow'
    ].join(' ')
  }

  return [...base, sizes[props.size], variants[props.variant] || variants.primary].join(' ')
})
</script>
