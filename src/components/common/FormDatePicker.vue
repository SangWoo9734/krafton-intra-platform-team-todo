<script setup lang="ts">
interface Props {
  id?: string;
  name?: string;
  modelValue: string;
  required?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  id: undefined,
  name: 'datepickerInput',
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
    :id="props.id"
    :value="modelValue"
    :required="required"
    @change="handleChange"
    class="form-date-picker"
    :name="props.name"
  />
</template>

<style scoped>
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
</style>
