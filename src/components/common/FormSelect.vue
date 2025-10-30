<script setup lang="ts">
import type { FormFieldOption } from '@/types/form';

interface Props {
  id?: string;
  name?: string;
  modelValue: string;
  options: FormFieldOption[];
  required?: boolean;
  invalid?: boolean;
  message?: string;
}

const props = withDefaults(defineProps<Props>(), {
  id: undefined,
  name: 'selectInput',
  required: false,
  invalid: false,
  message: '',
});

const emit = defineEmits<{
  'update:modelValue': [value: string];
}>();

const handleChange = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  emit('update:modelValue', target.value);
};
</script>

<template>
  <div class="form-select-wrapper">
    <select
      :id="props.id"
      :value="modelValue"
      :required="required"
      @change="handleChange"
      :class="['form-select', { 'form-error': props.invalid }]"
      :name="props.name"
      :aria-invalid="props.invalid"
      :aria-describedby="props.invalid ? `${props.id}-error` : undefined"
    >
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
    <p
      v-if="props.invalid && props.message"
      :id="`${props.id}-error`"
      class="error-message"
    >
      {{ props.message }}
    </p>
  </div>
</template>

<style scoped>
.form-select-wrapper {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.form-select {
  background-color: white;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  cursor: pointer;
  font-size: 0.875rem;
  outline: none;
  padding: 0.625rem;
  transition: border-color 0.2s;
  width: 100%;
}

.form-select:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgb(59 130 246 / 10%);
}

.form-select.form-error {
  border-color: #ef4444;
}

.form-select.form-error:focus {
  border-color: #ef4444;
  box-shadow: 0 0 0 3px rgb(239 68 68 / 10%);
}

.error-message {
  color: #ef4444;
  font-size: 0.75rem;
  margin: 0;
}
</style>
