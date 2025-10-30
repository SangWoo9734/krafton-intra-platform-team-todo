<script setup lang="ts">
export interface IconButtonProps {
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'default' | 'blue' | 'red';
  class?: string;
}

const props = withDefaults(defineProps<IconButtonProps>(), {
  disabled: false,
  type: 'button',
  variant: 'default',
  class: '',
});
</script>

<template>
  <button
    :type="type"
    :disabled="disabled"
    :class="['icon-button', `variant-${variant}`, props.class]"
  >
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
  transition: all 0.2s;
}

.icon-button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.variant-default {
  background-color: transparent;
  color: #6b7280;
}

.variant-default:hover:not(:disabled) {
  background-color: #f3f4f6;
  color: #374151;
}

.variant-blue {
  background-color: transparent;
  color: #3b82f6;
}

.variant-blue:hover:not(:disabled) {
  background-color: #dbeafe;
  color: #2563eb;
}

.variant-red {
  background-color: transparent;
  color: #ef4444;
}

.variant-red:hover:not(:disabled) {
  background-color: #fee2e2;
  color: #dc2626;
}

.icon-button :deep(svg) {
  height: 1.25rem;
  width: 1.25rem;
}
</style>
