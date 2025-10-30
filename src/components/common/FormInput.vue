<script setup lang="ts">
interface Props {
  id?: string;
  name?: string;
  modelValue: string;
  type?: 'text' | 'textarea';
  placeholder?: string;
  required?: boolean;
  invalid?: boolean;
  message?: string;
}

const props = withDefaults(defineProps<Props>(), {
  id: undefined,
  name: 'textInput',
  type: 'text',
  placeholder: '',
  required: false,
  invalid: false,
  message: '',
});

const emit = defineEmits<{
  'update:modelValue': [value: string];
}>();

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement | HTMLTextAreaElement;
  emit('update:modelValue', target.value);
};
</script>

<template>
  <div class="form-input-wrapper">
    <textarea
      v-if="type === 'textarea'"
      :id="props.id"
      :value="modelValue"
      :placeholder="placeholder"
      :required="required"
      @input="handleInput"
      :class="['form-textarea', { 'form-error': props.invalid }]"
      :name="props.name"
      :aria-invalid="props.invalid"
      :aria-describedby="props.invalid ? `${props.id}-error` : undefined"
      rows="3"
    />
    <input
      v-else
      :id="props.id"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :required="required"
      @input="handleInput"
      :class="['form-input', { 'form-error': props.invalid }]"
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
.form-input-wrapper {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.form-input,
.form-textarea {
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  outline: none;
  padding: 0.625rem;
  transition: border-color 0.2s;
  width: 100%;
}

.form-input:focus,
.form-textarea:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgb(59 130 246 / 10%);
}

.form-input.form-error,
.form-textarea.form-error {
  border-color: #ef4444;
}

.form-input.form-error:focus,
.form-textarea.form-error:focus {
  border-color: #ef4444;
  box-shadow: 0 0 0 3px rgb(239 68 68 / 10%);
}

.form-textarea {
  min-height: 80px;
  resize: vertical;
}

.error-message {
  color: #ef4444;
  font-size: 0.75rem;
  margin: 0;
}
</style>
