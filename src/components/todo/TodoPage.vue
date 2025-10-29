<script setup lang="ts">
import { useTodos } from '@/composables/useTodos';
import TodoHeader from '@/components/todo/TodoHeader.vue';
import TodoAddButton from '@/components/todo/TodoAddButton.vue';
import TodoItem from '@/components/todo/TodoItem.vue';
import TodoAddForm from '@/components/todo/TodoAddForm.vue';
import TodoEditForm from '@/components/todo/TodoEditForm.vue';
import LoadingSpinner from '@/components/common/LoadingSpinner.vue';
import EmptyState from '@/components/common/EmptyState.vue';

const { todos, loading } = useTodos();
</script>

<template>
  <div class="todo-page-container">
    <TodoHeader />
    <TodoAddButton class="todo-add-button" />
    <LoadingSpinner v-if="loading" />
    <EmptyState v-else-if="todos.length === 0" />
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
