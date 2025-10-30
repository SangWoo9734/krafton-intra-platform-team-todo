<script setup lang="ts">
import type { Toast } from '@/types/toast';
import { XMarkIcon } from '@heroicons/vue/24/outline';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/vue/24/solid';

export interface ToastItemProps {
  toast: Toast;
  onClose: (id: string) => void;
}

const props = defineProps<ToastItemProps>();

const variantIcons = {
  success: CheckCircleIcon,
  error: XCircleIcon,
};

const handleClose = () => {
  props.onClose(props.toast.id);
};
</script>

<template>
  <div :class="['toast-item', `toast-${props.toast.variant}`]">
    <component :is="variantIcons[props.toast.variant]" class="toast-icon" />
    <p class="toast-message">{{ props.toast.message }}</p>
    <button
      @click="handleClose"
      class="toast-close-button"
      aria-label="toast-close"
    >
      <XMarkIcon class="toast-close-icon" />
    </button>
  </div>
</template>

<style scoped lang="scss">
.toast-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  min-width: 300px;
  max-width: 500px;
  animation: slideIn 0.3s ease-out;

  &.toast-success {
    border-left: 4px solid #10b981;
    .toast-icon {
      color: #10b981;
    }
  }

  &.toast-error {
    border-left: 4px solid #ef4444;
    .toast-icon {
      color: #ef4444;
    }
  }
}

.toast-icon {
  width: 24px;
  height: 24px;
  flex-shrink: 0;
}

.toast-message {
  flex: 1;
  font-size: 14px;
  color: #1f2937;
}

.toast-close-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #f3f4f6;
    border-radius: 4px;
  }
}

.toast-close-icon {
  width: 18px;
  height: 18px;
  color: #6b7280;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
</style>
