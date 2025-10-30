<script setup lang="ts">
interface Props {
  id?: string;
  name?: string;
  modelValue: string;
  required?: boolean;
  invalid?: boolean;
  message?: string;
}

const props = withDefaults(defineProps<Props>(), {
  id: undefined,
  name: 'datepickerInput',
  required: false,
  invalid: false,
  message: '',
});

const emit = defineEmits<{
  'update:modelValue': [value: string];
}>();

const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value);
};
</script>

<template>
  <div class="form-date-picker-wrapper">
    <input
      type="date"
      :id="props.id"
      :value="modelValue"
      :required="required"
      @change="handleChange"
      :class="['form-date-picker', { 'form-error': props.invalid }]"
      :name="props.name"
      :aria-invalid="props.invalid"
      :aria-describedby="props.invalid ? `${props.id}-error` : undefined"
    />
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
.form-date-picker-wrapper {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.form-date-picker {
  background-color: white;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  outline: none;
  padding: 0.625rem;
  transition: border-color 0.2s;
  width: 100%;
}

.form-date-picker:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgb(59 130 246 / 10%);
}

.form-date-picker.form-error {
  border-color: #ef4444;
}

.form-date-picker.form-error:focus {
  border-color: #ef4444;
  box-shadow: 0 0 0 3px rgb(239 68 68 / 10%);
}

.error-message {
  color: #ef4444;
  font-size: 0.75rem;
  margin: 0;
}
</style>
