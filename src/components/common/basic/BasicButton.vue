<script setup lang="ts">
export interface BasicButtonProps {
  disabled?: boolean;
  fullsize?: boolean;
  type?: 'button' | 'submit' | 'reset';
  class?: string;
}

const props = withDefaults(defineProps<BasicButtonProps>(), {
  disabled: false,
  type: 'button',
  fullsize: false,
  class: '',
});
</script>

<template>
  <button :type="type" :disabled="disabled" :class="['button', { fullsize }, props.class]">
    <slot />
  </button>
</template>

<style scoped>
.button {
  background-color: #3b82f6;
  border: none;
  border-radius: 0.25rem;
  color: white;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  padding: 0.5rem 1rem;
  transition: background-color 0.2s;
}

.button:hover:not(:disabled) {
  background-color: #2563eb;
}

.button:disabled {
  background-color: #9ca3af;
  cursor: not-allowed;
  opacity: 0.6;
}

.button.fullsize {
  width: 100%;
}
</style>
