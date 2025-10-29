<script setup lang="ts">
import { useTodos } from '@/composables/useTodos';
import TodoHeader from '@/components/todo/TodoHeader.vue';
import TodoAddButton from '@/components/todo/TodoAddButton.vue';
import TodoItem from '@/components/todo/TodoItem.vue';
import TodoAddForm from '@/components/todo/TodoAddForm.vue';
import TodoEditForm from '@/components/todo/TodoEditForm.vue';
import LoadingSpinner from '@/components/common/LoadingSpinner.vue';

const { todos, loading, addTodo } = useTodos();
</script>

<template>
  <div class="todo-page-container">
    <TodoHeader />
    <TodoAddButton class="todo-add-button" @onSubmit="addTodo" />
    <LoadingSpinner v-if="loading" />
    <div v-else class="todo-list">
      <TodoItem v-for="todo in todos" :key="todo.id" v-bind="todo" />
    </div>

    <TodoAddForm />
    <TodoEditForm />
  </div>
</template>

<style scoped>
.todo-page-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.todo-add-button {
  margin-bottom: 16px;
}
.todo-list {
  flex: 1;
  overflow: auto;
}
</style>
