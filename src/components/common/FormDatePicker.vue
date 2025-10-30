<script setup lang="ts">
interface Props {
  modelValue: string;
  required?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  required: false,
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
  <input
    type="date"
    :value="modelValue"
    :required="required"
    @change="handleChange"
    class="form-date-picker"
  />
</template>

<style scoped>
.form-date-picker {
  width: 100%;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  padding: 0.625rem;
  font-size: 0.875rem;
  transition: border-color 0.2s;
  outline: none;
  background-color: white;
}

.form-date-picker:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}
</style>
