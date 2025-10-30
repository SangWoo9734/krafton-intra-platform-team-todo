<script setup lang="ts">
import BasicChip from '@/components/common/BasicChip.vue';
import BasicToggle from '@/components/common/BasicToggle.vue';
import IconButton from '@/components/common/IconButton.vue';
import { useModal } from '@/composables/useModal';
import { useTodos } from '@/composables/useTodos';
import type { Todo } from '@/types/todo';
import {
  ChevronDownIcon,
  ChevronUpIcon,
  PencilSquareIcon,
  TrashIcon,
} from '@heroicons/vue/16/solid';
import { ref } from 'vue';

const props = defineProps<Todo>();

const { toggleTodo, deleteTodo } = useTodos();
const { openModal } = useModal<Todo>();
const isExpanded = ref(false);

const handleToggle = () => {
  toggleTodo(props.id);
};

const handleDelete = () => {
  deleteTodo(props.id);
};

const handleEdit = () => {
  openModal('edit', props);
};

const toggleExpand = () => {
  isExpanded.value = !isExpanded.value;
};
</script>
<template>
  <div :class="['item-container', { 'item-completed': props.completed }]">
    <div class="item-header">
      <BasicToggle :isSelected="props.completed" :action="handleToggle" />
      <p class="item-title">{{ props.title }}</p>

      <div class="item-chips">
        <BasicChip
          v-if="props.deadline"
          :text="`~ ${props.deadline.toDateString()}`"
        />
        <BasicChip
          v-if="props.importantLabel"
          :text="props.importantLabel"
          :variant="props.importantLabel"
        />
      </div>

      <IconButton
        @click="toggleExpand"
        variant="default"
        class="expand-button"
        :aria-label="isExpanded ? 'todo-close' : 'todo-open'"
        :aria-expanded="isExpanded"
      >
        <ChevronDownIcon v-if="!isExpanded" />
        <ChevronUpIcon v-else />
      </IconButton>
    </div>

    <div v-if="isExpanded" class="item-details">
      <div class="item-content-section">
        <p class="item-content-label">내용</p>
        <p class="item-content">{{ props.content }}</p>
      </div>
      <div class="item-footer">
        <div class="item-date-info">
          <p class="global-text-xs">
            수정: {{ props.updatedAt.toDateString() }}
          </p>
          <p class="global-text-xs">
            생성: {{ props.createdAt.toDateString() }}
          </p>
        </div>
        <div class="item-actions">
          <IconButton
            v-if="!props.completed"
            @click="handleEdit"
            variant="blue"
            aria-label="todo-edit"
          >
            <PencilSquareIcon />
          </IconButton>
          <IconButton
            @click="handleDelete"
            variant="red"
            aria-label="todo-remove"
          >
            <TrashIcon />
          </IconButton>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.item {
  &-container {
    background-color: #f5f7f9;
    border-radius: 8px;
    margin-bottom: 12px;
    padding: 16px;
    transition: all 0.2s ease;

    @media (min-width: 768px) {
      padding: 18px;
    }
  }

  &-completed {
    background-color: #f5f5f5;
    color: #9e9e9e;

    .item-title {
      text-decoration: line-through;
    }
  }

  &-header {
    flex: 1;
    display: flex;
    align-items: center;
    min-width: 0;
    gap: 8px;
    gap: 12px;

    @media (min-width: 768px) {
      gap: 16px;
    }
  }

  &-title {
    flex: 1;
    font-size: 16px;
    font-weight: 500;
    line-height: 1.4;
    word-break: break-word;

    @media (min-width: 768px) {
      font-size: 18px;
    }
  }

  &-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }

  &-details {
    margin-top: 16px;
    padding-top: 16px;
    border-top: 1px solid #e5e7eb;
    animation: slideDown 0.2s ease;
  }

  &-content-section {
    min-height: 100px;
    margin-bottom: 16px;
  }

  &-content-label {
    width: 100%;
    font-size: 14px;
    font-weight: 800;
    color: #6b7280;
    margin-bottom: 15px;
  }

  &-content {
    font-size: 14px;
    color: #4b5563;
    line-height: 1.5;
    word-break: break-word;
  }

  &-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
  }

  &-date-info {
    display: flex;
    flex-direction: column;
    gap: 4px;
    color: #9ca3af;
    font-style: italic;

    @media (min-width: 768px) {
      flex-direction: row;
      gap: 12px;
    }
  }

  &-actions {
    display: flex;
    gap: 8px;
  }
}

.expand-button {
  flex-shrink: 0;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
