<script setup lang="ts">
import FormDatePicker from '@/components/common/form/FormDatePicker.vue';
import FormInput from '@/components/common/form/FormInput.vue';
import FormSelect from '@/components/common/form/FormSelect.vue';
import type { FormField } from '@/types/form';

interface Props {
  fields: FormField[];
  modelValue: Record<string, unknown>;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  'update:field': [fieldName: string, value: unknown];
}>();

const updateField = (fieldName: string, value: unknown) => {
  emit('update:field', fieldName, value);
};

const getFieldValue = (fieldName: string): string => {
  const value = props.modelValue[fieldName];
  return value !== null && value !== undefined ? String(value) : '';
};
</script>

<template>
  <div class="dynamic-form">
    <div v-for="field in fields" :key="field.name" class="form-field">
      <label class="form-label" :for="field.name">
        {{ field.label }}
        <span v-if="field.required" class="required-mark">*</span>
      </label>

      <FormInput
        v-if="field.type === 'text' || field.type === 'textarea'"
        :id="field.name"
        :invalid="field.invalid"
        :error-message="field.message"
        :model-value="getFieldValue(field.name)"
        :type="field.type"
        :placeholder="field.placeholder"
        :required="field.required"
        @update:model-value="(value) => updateField(field.name, value)"
        :name="field.name"
      />

      <FormSelect
        v-else-if="field.type === 'select'"
        :id="field.name"
        :invalid="field.invalid"
        :error-message="field.message"
        :model-value="getFieldValue(field.name)"
        :options="field.options || []"
        :required="field.required"
        @update:model-value="(value) => updateField(field.name, value)"
        :name="field.name"
      />

      <FormDatePicker
        v-else-if="field.type === 'date'"
        :id="field.name"
        :invalid="field.invalid"
        :error-message="field.message"
        :model-value="getFieldValue(field.name)"
        :required="field.required"
        @update:model-value="(value) => updateField(field.name, value)"
        :name="field.name"
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
