<script setup lang="ts">
import { PlusCircleIcon } from '@heroicons/vue/20/solid';
import { useModal } from '@/composables/useModal';

const props = withDefaults(
  defineProps<{
    class?: string;
  }>(),
  {
    class: '',
  },
);

const { openModal } = useModal();

const handleAddTodo = () => {
  openModal();
};
</script>

<template>
  <button
    type="button"
    @click="handleAddTodo"
    :class="['todo-add-button', props.class]"
  >
    <p>Add a new TODO</p>
    <PlusCircleIcon class="icon" />
  </button>
</template>
<style scoped lang="scss">
.todo-add-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  width: 100%;
  background-color: #4e83da;
  padding: 8px 0;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  color: #ffffff;
  font-weight: bold;

  &:hover {
    background-color: #4e84dacb;
  }

  .icon {
    width: 1.5rem;
    height: 1.5rem;
  }
}
</style>
