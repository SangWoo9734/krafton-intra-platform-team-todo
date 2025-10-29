<script setup lang="ts">
import TodoForm from '@/components/todo/TodoForm.vue';
import { useModal } from '@/composables/useModal';
import { useTodos } from '@/composables/useTodos';
import { useToast } from '@/composables/useToast';
import type { Todo } from '@/types/todo';
import type { ImportantLabelVarients } from '@/types/todo';
import { computed } from 'vue';

const { isOpen, modalType, closeModal } = useModal<Todo>();
const { addTodo } = useTodos();
const { showToast } = useToast();

const isAddFormOpen = computed(() => isOpen.value && modalType.value === 'add');

const emptyTodoData = {
  title: '',
  content: '',
  importantLabel: 'medium' as ImportantLabelVarients,
  deadline: null,
};

const handleSubmit = async (data: {
  title: string;
  content: string;
  importantLabel: ImportantLabelVarients;
  deadline: Date | null;
}) => {
  try {
    await addTodo(data);
    showToast({ message: 'Todo 추가완료!', variant: 'success' });
    closeModal();
  } catch {
    showToast({
      message: 'Todo 추가실패!',
      variant: 'error',
    });
  }
};
</script>

<template>
  <TodoForm
    :isOpen="isAddFormOpen"
    :initialData="emptyTodoData"
    modalTitle="Todo 추가"
    submitLabel="추가하기"
    @close="closeModal"
    @submit="handleSubmit"
  />
</template>
