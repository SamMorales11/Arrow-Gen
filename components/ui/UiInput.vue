<template>
  <div :class="['flex flex-col gap-1.5 w-full', disabled ? 'opacity-60 cursor-not-allowed' : '']">
    <!-- Label -->
    <label
      v-if="label"
      :for="inputId"
      :class="[
        'font-medium text-zinc-200 select-none flex items-center justify-between',
        variant === 'pixel' ? 'font-pixel text-[11px] text-zinc-300' : 'text-sm'
      ]"
    >
      <span>
        {{ label }}
        <span v-if="required" class="text-brand-yellow ml-0.5" aria-hidden="true">*</span>
      </span>
      <span v-if="hint && !error" class="text-xs text-zinc-500 font-normal">
        {{ hint }}
      </span>
    </label>

    <!-- Input Wrapper with Leading/Trailing Slots -->
    <div class="relative flex items-center w-full">
      <!-- Leading Icon -->
      <div
        v-if="$slots.leading"
        class="absolute left-3 flex items-center pointer-events-none text-zinc-500"
        aria-hidden="true"
      >
        <slot name="leading" />
      </div>

      <!-- Input Element -->
      <input
        :id="inputId"
        :name="name"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :required="required"
        :autocomplete="autocomplete"
        :aria-invalid="!!error"
        :aria-describedby="error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined"
        :class="inputClasses"
        @input="handleInput"
        @blur="$emit('blur', $event)"
        @focus="$emit('focus', $event)"
        @change="$emit('change', $event)"
      />

      <!-- Trailing Slot -->
      <div
        v-if="$slots.trailing"
        class="absolute right-3 flex items-center text-zinc-500"
      >
        <slot name="trailing" />
      </div>
    </div>

    <!-- Error Message -->
    <p
      v-if="error"
      :id="`${inputId}-error`"
      role="alert"
      class="text-xs text-rose-400 flex items-center gap-1 font-medium mt-0.5"
    >
      <svg
        class="w-3.5 h-3.5 shrink-0"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span>{{ error }}</span>
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed, useId } from 'vue'

export type InputSize = 'sm' | 'md' | 'lg'
export type InputVariant = 'default' | 'pixel'

interface Props {
  modelValue?: string | number
  type?: string
  placeholder?: string
  label?: string
  id?: string
  name?: string
  hint?: string
  error?: string
  disabled?: boolean
  readonly?: boolean
  required?: boolean
  autocomplete?: string
  size?: InputSize
  variant?: InputVariant
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  type: 'text',
  placeholder: '',
  label: undefined,
  id: undefined,
  name: undefined,
  hint: undefined,
  error: undefined,
  disabled: false,
  readonly: false,
  required: false,
  autocomplete: 'off',
  size: 'md',
  variant: 'default'
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'blur', event: FocusEvent): void
  (e: 'focus', event: FocusEvent): void
  (e: 'change', event: Event): void
}>()

const generatedId = useId()
const inputId = computed(() => props.id || `input-${generatedId}`)

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}

const inputClasses = computed(() => {
  const base = [
    'w-full bg-zinc-900/90 text-zinc-100 placeholder:text-zinc-500 transition-colors',
    'focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-offset-black',
    props.disabled ? 'cursor-not-allowed bg-zinc-950/70' : 'hover:border-zinc-700'
  ]

  // Sizes
  const sizes: Record<InputSize, string> = {
    sm: 'text-xs py-1.5 px-3 rounded-md',
    md: 'text-sm py-2.5 px-3.5 rounded-lg',
    lg: 'text-base py-3 px-4 rounded-lg'
  }

  // Padding adjustments for icons
  const slotsPadding = []
  if (useSlots().leading) slotsPadding.push('pl-10')
  if (useSlots().trailing) slotsPadding.push('pr-10')

  // Status & Variants
  const variants: Record<InputVariant, string> = {
    default: [
      'border',
      props.error
        ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500/50'
        : 'border-zinc-800 focus:border-brand-purple focus:ring-brand-purple/50'
    ].join(' '),

    pixel: [
      'rounded-none border-2 font-mono',
      props.error
        ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500'
        : 'border-zinc-700 focus:border-brand-yellow focus:ring-brand-yellow/30'
    ].join(' ')
  }

  return [...base, sizes[props.size], variants[props.variant], ...slotsPadding].join(' ')
})
</script>
