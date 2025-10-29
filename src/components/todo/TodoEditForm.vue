<script setup lang="ts">
import TodoForm from '@/components/todo/TodoForm.vue';
import { useModal } from '@/composables/useModal';
import { useTodos } from '@/composables/useTodos';
import { useToast } from '@/composables/useToast';
import type { Todo, ImportantLabelVarients } from '@/types/todo';
import { computed } from 'vue';

const { isOpen, modalType, modalData, closeModal } = useModal<Todo>();
const { updateTodo } = useTodos();
const { showToast } = useToast();

const isEditFormOpen = computed(() => isOpen.value && modalType.value === 'edit');

const initialData = computed(() => {
  if (!modalData.value) {
    return {
      title: '',
      importantLabel: 'medium' as ImportantLabelVarients,
      deadline: null,
    };
  }

  return {
    title: modalData.value.title,
    importantLabel: modalData.value.importantLabel || ('medium' as ImportantLabelVarients),
    deadline: modalData.value.deadline,
  };
});

const handleSubmit = async (data: { title: string; importantLabel: ImportantLabelVarients; deadline: Date | null }) => {
  if (!modalData.value) return;

  try {
    await updateTodo(modalData.value.id, data);
    showToast({ message: 'Todo 수정완료!', variant: 'success' });
    closeModal();
  } catch {
    showToast({
      message: 'Todo 수정실패!',
      variant: 'error',
    });
  }
};
</script>

<template>
  <TodoForm
    :isOpen="isEditFormOpen"
    :initialData="initialData"
    modalTitle="Todo 수정"
    submitLabel="수정하기"
    @close="closeModal"
    @submit="handleSubmit"
  />
</template>
