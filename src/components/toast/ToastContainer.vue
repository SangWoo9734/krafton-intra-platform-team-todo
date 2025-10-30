<script setup lang="ts">
import ToastItem from '@/components/toast/ToastItem.vue';
import { useToast } from '@/composables/useToast';

const { toasts, removeToast } = useToast();
</script>

<template>
  <Teleport to="body">
    <div class="toast-container" role="region" aria-label="toast-message">
      <ToastItem
        v-for="toast in toasts"
        :key="toast.id"
        :toast="toast"
        :on-close="removeToast"
      />
    </div>
  </Teleport>
</template>

<style scoped lang="scss">
.toast-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
