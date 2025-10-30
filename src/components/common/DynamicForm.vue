<script setup lang="ts">
import type { FormField } from '@/types/form';
import FormInput from '@/components/common/FormInput.vue';
import FormSelect from '@/components/common/FormSelect.vue';
import FormDatePicker from '@/components/common/FormDatePicker.vue';
import { computed } from 'vue';

interface Props {
  fields: FormField[];
  modelValue: Record<string, unknown>;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  'update:modelValue': [value: Record<string, unknown>];
}>();

const updateField = (fieldName: string, value: unknown) => {
  emit('update:modelValue', {
    ...props.modelValue,
    [fieldName]: value,
  });
};

const getFieldValue = (fieldName: string): string => {
  const value = props.modelValue[fieldName];
  return value !== null && value !== undefined ? String(value) : '';
};
</script>

<template>
  <div class="dynamic-form">
    <div v-for="field in fields" :key="field.name" class="form-field">
      <label class="form-label">
        {{ field.label }}
        <span v-if="field.required" class="required-mark">*</span>
      </label>

      <FormInput
        v-if="field.type === 'text' || field.type === 'textarea'"
        :model-value="getFieldValue(field.name)"
        :type="field.type"
        :placeholder="field.placeholder"
        :required="field.required"
        @update:model-value="(value) => updateField(field.name, value)"
      />

      <FormSelect
        v-else-if="field.type === 'select'"
        :model-value="getFieldValue(field.name)"
        :options="field.options || []"
        :required="field.required"
        @update:model-value="(value) => updateField(field.name, value)"
      />

      <FormDatePicker
        v-else-if="field.type === 'date'"
        :model-value="getFieldValue(field.name)"
        :required="field.required"
        @update:model-value="(value) => updateField(field.name, value)"
      />
    </div>
  </div>
</template>

<style scoped>
.dynamic-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-label {
  color: #374151;
  font-size: 0.875rem;
  font-weight: 500;
}

.required-mark {
  color: #ef4444;
  margin-left: 2px;
}
</style>
