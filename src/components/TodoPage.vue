<script setup lang="ts">
import { useTodos } from '@/composables/useTodos';
import TodoHeader from './TodoHeader.vue';
import TodoAddButton from './TodoAddButton.vue';
import TodoItem from './TodoItem.vue';

const { todos, loading, addTodo } = useTodos();
</script>

<template>
  <div class="todo-page-container">
    <TodoHeader />
    <TodoAddButton class="todo-add-button" @onSubmit="addTodo" />
    <div v-if="loading">Loading...</div>
    <div v-else class="todo-list">
      <TodoItem v-for="todo in todos" :key="todo.id" v-bind="todo" />
    </div>
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
