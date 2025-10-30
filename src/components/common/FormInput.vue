<script setup lang="ts">
interface Props {
  modelValue: string;
  type?: 'text' | 'textarea';
  placeholder?: string;
  required?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  placeholder: '',
  required: false,
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
  <textarea
    v-if="type === 'textarea'"
    :value="modelValue"
    :placeholder="placeholder"
    :required="required"
    @input="handleInput"
    class="form-textarea"
    rows="3"
  />
  <input
    v-else
    :type="type"
    :value="modelValue"
    :placeholder="placeholder"
    :required="required"
    @input="handleInput"
    class="form-input"
  />
</template>

<style scoped>
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

.form-textarea {
  min-height: 80px;
  resize: vertical;
}
</style>
