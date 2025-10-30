<script setup lang="ts">
import type { ImportantLabelVarients } from '@/types/todo';
import type { FormField } from '@/types/form';
import { reactive, watch } from 'vue';
import BasicButton from '@/components/common/BasicButton.vue';
import DynamicForm from '@/components/common/DynamicForm.vue';
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

const formFields: FormField[] = [
  {
    name: 'title',
    label: '제목',
    type: 'text',
    required: true,
    placeholder: 'Todo 제목을 입력하세요',
  },
  {
    name: 'content',
    label: '내용',
    type: 'textarea',
    required: true,
    placeholder: 'Todo 내용을 입력하세요',
  },
  {
    name: 'importantLabel',
    label: '중요도',
    type: 'select',
    required: false,
    options: [
      { label: '높음', value: 'high' },
      { label: '보통', value: 'medium' },
      { label: '낮음', value: 'low' },
    ],
  },
  {
    name: 'deadlineString',
    label: '마감기한',
    type: 'date',
    required: false,
  },
];

const formData = reactive({
  title: '',
  content: '',
  importantLabel: 'medium',
  deadlineString: '',
});

watch(
  () => props.initialData,
  (data) => {
    formData.title = data.title;
    formData.content = data.content;
    formData.importantLabel = data.importantLabel;
    formData.deadlineString = data.deadline
      ? (new Date(data.deadline).toISOString().split('T')[0] ?? '')
      : '';
  },
  { immediate: true },
);

const formValidation = (): boolean => {
  for (const field of formFields) {
    if (field.required) {
      const value = formData[field.name as keyof typeof formData];
      if (!value || String(value).trim() === '') {
        showToast({
          message: `${field.label}을(를) 입력해주세요.`,
          variant: 'error'
        });
        return false;
      }
    }
  }
  return true;
};

const handleSubmit = () => {
  if (!formValidation()) return;

  const submitData: TodoFormData = {
    title: formData.title,
    content: formData.content,
    importantLabel: formData.importantLabel as ImportantLabelVarients,
    deadline: formData.deadlineString ? new Date(formData.deadlineString) : null,
  };

  emit('submit', submitData);
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

        <DynamicForm
          :fields="formFields"
          v-model="formData"
        />

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
  padding: 16px;
  z-index: 1000;
}

.form-modal {
  max-width: 500px;
  width: 100%;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-height: 90vh;
  overflow-y: auto;

  @media (min-width: 768px) {
    padding: 24px;
    width: 90%;
  }

  h3 {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 600;
    color: #111827;
  }
}
</style>
