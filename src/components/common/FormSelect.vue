<script setup lang="ts">
import type { FormFieldOption } from '@/types/form';

interface Props {
  id?: string;
  name?: string;
  modelValue: string;
  options: FormFieldOption[];
  required?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  id: undefined,
  name: 'selectInput',
  required: false,
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
  <select
    :id="props.id"
    :value="modelValue"
    :required="required"
    @change="handleChange"
    class="form-select"
    :name="props.name"
  >
    <option v-for="option in options" :key="option.value" :value="option.value">
      {{ option.label }}
    </option>
  </select>
</template>

<style scoped>
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
</style>
