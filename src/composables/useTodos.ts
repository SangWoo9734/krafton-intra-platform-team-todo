import { ref, computed } from 'vue';
import type { Todo, TodoInput, TodoUpdate } from '@/types/todo';
import { createTodo, editTodo, getTodos, removeTodo } from '@/apis/todo';

const todos = ref<Todo[]>([]);
const loading = ref(false);
const error = ref<Error | null>(null);
let isInitialized = false;

export function useTodos() {

  const completedTodos = computed(() =>
    todos.value.filter((todo) => todo.completed),
  );

  const incompleteTodos = computed(() =>
    todos.value.filter((todo) => !todo.completed),
  );

  const completedCount = computed(() => completedTodos.value.length);

  const totalCount = computed(() => todos.value.length);

  // Load all todos
  const loadTodos = async () => {
    loading.value = true;
    error.value = null;
    try {
      todos.value = await getTodos();
    } catch (e) {
      error.value = e as Error;
      console.error('Failed to load todos:', e);
    } finally {
      loading.value = false;
    }
  };

  // create new todo
  const addTodo = async (input: TodoInput) => {
    loading.value = true;
    error.value = null;
    try {
      const newTodo = await createTodo(input);
      todos.value.push(newTodo);
      return newTodo;
    } catch (e) {
      error.value = e as Error;
      console.error('Failed to create todo:', e);
      throw e;
    } finally {
      loading.value = false;
    }
  };

  // Update existing todo
  const updateTodo = async (id: string, update: TodoUpdate) => {
    loading.value = true;
    error.value = null;
    try {
      const updatedTodo = await editTodo(id, update);
      const index = todos.value.findIndex((todo) => todo.id === id);
      if (index !== -1) {
        todos.value[index] = updatedTodo;
      }
      return updatedTodo;
    } catch (e) {
      error.value = e as Error;
      console.error('Failed to update todo:', e);
      throw e;
    } finally {
      loading.value = false;
    }
  };

  // Toggle todo completion
  const toggleTodo = async (id: string) => {
    const todo = todos.value.find((t) => t.id === id);
    if (!todo) return;

    return updateTodo(id, {
      completed: !todo.completed,
    });
  };

  // Delete todo
  const deleteTodo = async (id: string) => {
    loading.value = true;
    error.value = null;
    try {
      await removeTodo(id);
      todos.value = todos.value.filter((todo) => todo.id !== id);
    } catch (e) {
      error.value = e as Error;
      console.error('Failed to delete todo:', e);
      throw e;
    } finally {
      loading.value = false;
    }
  };

  // Initialize todos on first call
  if (!isInitialized) {
    isInitialized = true;
    loadTodos();
  }

  return {
    todos,
    loading,
    error,

    completedTodos,
    incompleteTodos,
    completedCount,
    totalCount,

    loadTodos,
    addTodo,
    updateTodo,
    toggleTodo,
    deleteTodo,
  };
}
