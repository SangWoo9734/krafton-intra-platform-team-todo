import { ref } from 'vue';
import type { Toast, ToastInput } from '@/types/toast';

const toasts = ref<Toast[]>([]);
let toastIdCounter = 0;

export function useToast() {
  const generateId = (): string => {
    return `toast-${Date.now()}-${toastIdCounter++}`;
  };

  const showToast = (input: ToastInput) => {
    const toast: Toast = {
      id: generateId(),
      message: input.message,
      variant: input.variant || 'success',
      duration: input.duration || 3000,
    };

    toasts.value.push(toast);

    if (toast.duration && toast.duration > 0) {
      setTimeout(() => {
        removeToast(toast.id);
      }, toast.duration);
    }

    return toast.id;
  };

  const removeToast = (id: string) => {
    toasts.value = toasts.value.filter((toast) => toast.id !== id);
  };

  return {
    toasts,
    showToast,
    removeToast,
  };
}
