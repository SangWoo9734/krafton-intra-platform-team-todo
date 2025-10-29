import type { Todo, TodoInput, TodoUpdate } from '@/types/todo';
import { getItem, setItem } from '@/utils/storage';

const TODO_STORAGE_KEY = 'todos';

function generateId(): string {
  return `td-${Date.now().toString()}`;
}

// TODO: 추후 LocalStorage에서 데이터 저장 방식 변경시 삭제
function loadFromStorage(): Todo[] {
  const todos = getItem<Todo[]>(TODO_STORAGE_KEY);
  if (!todos) return [];

  return todos.map((todo) => ({
    ...todo,
    createdAt: new Date(todo.createdAt),
    updatedAt: new Date(todo.updatedAt),
    deadline: todo.deadline ? new Date(todo.deadline) : null,
  }));
}

function saveToStorage(todos: Todo[]): void {
  setItem(TODO_STORAGE_KEY, todos);
}

export async function getTodos(): Promise<Todo[]> {
  return loadFromStorage();
}

export async function createTodo(input: TodoInput): Promise<Todo> {
  const todos = loadFromStorage();
  const now = new Date();

  const newTodo: Todo = {
    id: generateId(),
    title: input.title,
    completed: false,
    importantLabel: input.importantLabel || null,
    createdAt: now,
    updatedAt: now,
    deadline: null,
  };

  todos.push(newTodo);
  saveToStorage(todos);

  return newTodo;
}

export async function editTodo(id: string, update: TodoUpdate): Promise<Todo> {
  const todos = loadFromStorage();
  const index = todos.findIndex((todo) => todo.id === id);

  if (index === -1) {
    throw new Error(`Todo with id ${id} not found`);
  }

  const existingTodo = todos[index]!;
  const updatedTodo: Todo = {
    id: existingTodo.id,
    title: update.title ?? existingTodo.title,
    completed: update.completed ?? existingTodo.completed,
    importantLabel:
      update.importantLabel !== undefined
        ? update.importantLabel
        : existingTodo.importantLabel,
    createdAt: existingTodo.createdAt,
    updatedAt: new Date(),
    deadline:
      update.deadline !== undefined ? update.deadline : existingTodo.deadline,
  };

  todos[index] = updatedTodo;
  saveToStorage(todos);

  return updatedTodo;
}

export async function removeTodo(id: string): Promise<void> {
  const todos = loadFromStorage();
  const filtered = todos.filter((todo) => todo.id !== id);

  if (filtered.length === todos.length) {
    throw new Error(`Todo with id ${id} not found`);
  }

  saveToStorage(filtered);
}
