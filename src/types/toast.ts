export type ToastVariant = 'success' | 'error';

export interface Toast {
  id: string;
  message: string;
  variant: ToastVariant;
  duration?: number;
}

export interface ToastInput {
  message: string;
  variant?: ToastVariant;
  duration?: number;
}
