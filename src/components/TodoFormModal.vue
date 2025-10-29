<script setup lang="ts">
import type { ImportantLabelVarients, Todo } from '@/types/todo';
import { computed, ref, watch } from 'vue';
import BasicButton from './BasicButton.vue';
import { useModal } from '@/composables/useModal';
import { useTodos } from '@/composables/useTodos';
import { useToast } from '@/composables/useToast';

const { isOpen, modalData, closeModal } = useModal<Todo>();
const { addTodo, updateTodo } = useTodos();
const { showToast } = useToast();

const title = ref<string>('');
const importantLabel = ref<ImportantLabelVarients>('medium');
const deadlineString = ref<string>('');

watch(modalData, (data) => {
  if (data) {
    title.value = data.title;
    importantLabel.value = data.importantLabel || 'medium';

    const deadlineDate = data.deadline ? new Date(data.deadline) : null;

    deadlineString.value = deadlineDate
      ? (deadlineDate.toISOString().split('T')[0] ?? '')
      : '';
  } else {
    // 새로 추가 모드 - 초기화
    title.value = '';
    importantLabel.value = 'medium';
    deadlineString.value = '';
  }
});

const isEditMode = computed(() => !!modalData.value);

const formValidation = (): boolean => {
  if (title.value.trim() === '') {
    alert('Title is required');
    return false;
  }
  return true;
};

const handleSubmitTodo = async () => {
  if (!formValidation()) return;

  const todoInput = {
    title: title.value,
    importantLabel: importantLabel.value,
    deadline: deadlineString.value ? new Date(deadlineString.value) : null,
  };

  try {
    if (modalData.value) {
      // 수정 모드
      await updateTodo(modalData.value.id, todoInput);
      showToast({ message: 'Todo 수정완료!', variant: 'success' });
    } else {
      // 추가 모드
      await addTodo(todoInput);
      showToast({ message: 'Todo 추가완료!', variant: 'success' });
    }
    closeModal();
  } catch {
    showToast({
      message: modalData.value ? 'Todo 수정실패!' : 'Todo 추가실패!',
      variant: 'error',
    });
  }
};
</script>

<template>
  <Teleport to="body">
    <div v-if="isOpen" class="form-modal-background" @click.self="closeModal">
      <div class="form-modal">
        <label>Todo</label>
        <input v-model="title" type="text" placeholder="Todo Title" />
        <label>중요도</label>
        <select v-model="importantLabel">
          <option value="high">높음</option>
          <option value="medium">보통</option>
          <option value="low">낮음</option>
        </select>
        <label>마감기한</label>
        <input v-model="deadlineString" type="date" />
        <BasicButton @click="handleSubmitTodo">{{
          isEditMode ? '수정하기' : '추가하기'
        }}</BasicButton>
      </div>
    </div>
  </Teleport>
</template>
<style scoped lang="scss">
.form-modal-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}
.form-modal {
  max-width: 400px;
  width: 80%;
  background-color: #ffffff;
  padding: 24px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
