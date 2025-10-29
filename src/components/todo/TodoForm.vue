<script setup lang="ts">
import type { ImportantLabelVarients } from '@/types/todo';
import { ref, watch } from 'vue';
import BasicButton from '@/components/common/BasicButton.vue';
import { useToast } from '@/composables/useToast';

interface TodoFormData {
  title: string;
  content: string;
  importantLabel: ImportantLabelVarients;
  deadline: Date | null;
}

interface Props {
  isOpen: boolean;
  initialData: TodoFormData;
  submitLabel: string;
  modalTitle: string;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  close: [];
  submit: [data: TodoFormData];
}>();

const { showToast } = useToast();

const title = ref<string>('');
const content = ref<string>('');
const importantLabel = ref<ImportantLabelVarients>('medium');
const deadlineString = ref<string>('');

watch(
  () => props.initialData,
  (data) => {
    title.value = data.title;
    content.value = data.content;
    importantLabel.value = data.importantLabel;
    deadlineString.value = data.deadline
      ? (new Date(data.deadline).toISOString().split('T')[0] ?? '')
      : '';
  },
  { immediate: true },
);

const formValidation = (): boolean => {
  if (title.value.trim() === '') {
    showToast({ message: 'Title을 입력해주세요.', variant: 'error' });
    return false;
  }
  if (content.value.trim() === '') {
    showToast({ message: 'Content을 입력해주세요.', variant: 'error' });
    return false;
  }
  return true;
};

const handleSubmit = () => {
  if (!formValidation()) return;

  const formData: TodoFormData = {
    title: title.value,
    content: content.value,
    importantLabel: importantLabel.value,
    deadline: deadlineString.value ? new Date(deadlineString.value) : null,
  };

  emit('submit', formData);
};

const handleClose = () => {
  emit('close');
};
</script>

<template>
  <Teleport to="body">
    <div v-if="isOpen" class="form-modal-background" @click.self="handleClose">
      <div class="form-modal">
        <h3>{{ modalTitle }}</h3>

        <label>제목</label>
        <input v-model="title" type="text" placeholder="Todo Title" />
        <label>내용</label>
        <input v-model="content" type="text" placeholder="Todo Content" />
        <label>중요도</label>
        <select v-model="importantLabel">
          <option value="high">높음</option>
          <option value="medium">보통</option>
          <option value="low">낮음</option>
        </select>
        <label>마감기한</label>
        <input v-model="deadlineString" type="date" />
        <BasicButton @click="handleSubmit">{{ submitLabel }}</BasicButton>
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
