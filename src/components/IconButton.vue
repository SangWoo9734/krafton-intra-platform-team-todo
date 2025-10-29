<script setup lang="ts">
export interface IconButtonProps {
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  variant?: 'default' | 'ghost' | 'danger'
  class?: string
}

const props = withDefaults(defineProps<IconButtonProps>(), {
  disabled: false,
  type: 'button',
  variant: 'default',
  class: '',
})
</script>

<template>
  <button
    :type="type"
    :disabled="disabled"
    :class="['icon-button', `variant-${variant}`, props.class]"
  >
    <!-- �o<\ DtXD ��� -->
    <slot />
  </button>
</template>

<style scoped>
.icon-button {
  align-items: center;
  background: none;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  display: inline-flex;
  justify-content: center;
  padding: 0.5rem;
  transition: background-color 0.2s;
}

.icon-button:hover:not(:disabled) {
  background-color: #f3f4f6;
}

.icon-button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

/* Variants */
.variant-default:hover:not(:disabled) {
  background-color: #f3f4f6;
}

.variant-ghost {
  background-color: transparent;
}

.variant-ghost:hover:not(:disabled) {
  background-color: #f3f4f6;
}

.variant-danger:hover:not(:disabled) {
  background-color: #fee2e2;
  color: #dc2626;
}

/* DtX l0 p */
.icon-button :deep(svg) {
  height: 1.25rem;
  width: 1.25rem;
}
</style>
