<script setup lang="ts">
import BasicButton from '@/components/common/basic/BasicButton.vue';
import DynamicForm from '@/components/common/form/DynamicForm.vue';
import { useToast } from '@/composables/useToast';
import { DEFAULT_IMPORTANCE, TODO_FORM_FIELDS } from '@/constants/todo';
import type { FormField } from '@/types/form';
import type { ImportantLabelVarients } from '@/types/todo';
import { reactive, watch } from 'vue';

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

const formFields = reactive<FormField[]>(
  TODO_FORM_FIELDS.map((field) => ({ ...field })),
);

const formData = reactive<{
  title: string;
  content: string;
  importantLabel: ImportantLabelVarients;
  deadlineString: string;
}>({
  title: '',
  content: '',
  importantLabel: DEFAULT_IMPORTANCE as ImportantLabelVarients,
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

    formFields.forEach((field) => {
      field.invalid = false;
      field.message = '';
    });
  },
  { immediate: true },
);

watch(
  () => formData,
  () => {
    formFields.forEach((field) => {
      const value = formData[field.name as keyof typeof formData];
      if (value && String(value).trim() !== '') {
        field.invalid = false;
        field.message = '';
      }
    });
  },
  { deep: true },
);

const formValidation = (): boolean => {
  let isValid = true;

  formFields.forEach((field) => {
    field.invalid = false;
    field.message = '';
  });

  for (const field of formFields) {
    if (field.required) {
      const value = formData[field.name as keyof typeof formData];
      if (!value || String(value).trim() === '') {
        field.invalid = true;
        field.message = `${field.label}을(를) 입력해주세요.`;
        isValid = false;
      }
    }
  }

  if (!isValid) {
    showToast({
      message: '필수 항목을 입력해주세요.',
      variant: 'error',
    });
  }

  return isValid;
};

const handleSubmit = () => {
  if (!formValidation()) return;

  const submitData: TodoFormData = {
    title: formData.title,
    content: formData.content,
    importantLabel: formData.importantLabel as ImportantLabelVarients,
    deadline: formData.deadlineString
      ? new Date(formData.deadlineString)
      : null,
  };

  emit('submit', submitData);
};

const handleClose = () => {
  emit('close');
};

const handleFieldUpdate = (fieldName: string, value: unknown) => {
  const key = fieldName as keyof typeof formData;
  (formData[key] as typeof value) = value;
};
</script>

<template>
  <Teleport to="body">
    <div
      v-if="isOpen"
      class="form-modal-background"
      @click.self="handleClose"
      role="dialog"
      :aria-modal="isOpen"
      aria-labelledby="modal-title"
    >
      <div class="form-modal">
        <h3 id="modal-title">{{ modalTitle }}</h3>

        <DynamicForm
          :fields="formFields"
          :model-value="formData"
          @update:field="handleFieldUpdate"
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
