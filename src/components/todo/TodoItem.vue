<script setup lang="ts">
import type { Todo } from '@/types/todo';
import BasicToggle from '@/components/common/BasicToggle.vue';
import IconButton from '@/components/common/IconButton.vue';
import { TrashIcon, PencilSquareIcon } from '@heroicons/vue/16/solid';
import BasicChip from '@/components/common/BasicChip.vue';
import { useTodos } from '@/composables/useTodos';
import { useModal } from '@/composables/useModal';

const props = defineProps<Todo>();

const { toggleTodo, deleteTodo } = useTodos();
const { openModal } = useModal<Todo>();

const handleToggle = () => {
  toggleTodo(props.id);
};

const handleDelete = () => {
  deleteTodo(props.id);
};

const handleEdit = () => {
  openModal('edit', props);
};
</script>
<template>
  <div :class="['item-container', { 'item-completed': props.completed }]">
    <BasicToggle :isSelected="props.completed" :action="handleToggle" />
    <div class="item-content-wrapper">
      <div class="global-flex-row global-justify-between">
        <p class="item-title">{{ props.title }}</p>

        <div class="global-flex-row global-gap-2">
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
      </div>
      <div>
        <p class="item-content">{{ props.content }}</p>
      </div>
      <div
        class="global-flex-row global-justify-between global-items-end global-gap-2"
      >
        <div class="global-flex-row item-date-info-wrapper">
          <p class="item-updated">{{ props.updatedAt.toDateString() }}</p>
          <p class="text-divider">|</p>
          <p class="item-created">{{ props.createdAt.toDateString() }}</p>
        </div>
        <div class="global-flex-row global-gap-2">
          <IconButton
            v-if="!props.completed"
            @click="handleEdit"
            class="icon-edit"
          >
            <PencilSquareIcon />
          </IconButton>
          <IconButton @click="handleDelete" class="icon-delete">
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
    display: flex;
    align-items: center;
    background-color: #f5f7f9;
    border-radius: 8px;
    gap: 24px;
    margin-bottom: 12px;
    padding: 18px;
  }
  &-title-wrapper {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  &-title {
    font-size: 18px;
    font-weight: 500;
  }
  &-content {
    margin-top: 8px;
    font-size: 14px;
    color: #4b5563;
  }
  &-completed {
    background-color: #f5f5f5;
    color: #9e9e9e;
    text-decoration: line-through;
  }
  &-id,
  &-date-info-wrapper {
    font-size: 12px;
    font-style: italic;
    font-weight: bold;
    color: lightgray;
  }

  &-ended {
    font-size: 12px;
    font-style: italic;
    font-weight: bold;
    color: rgb(255, 153, 153);
  }
  &-content-wrapper {
    flex: 1;
    justify-content: space-between;

    & .text-divider {
      margin: 0 8px;
    }
  }
}
.icon {
  &-delete,
  &-edit {
    width: 30px;
    height: 30px;
    border-radius: 4px;
    padding: 5px;
    cursor: pointer;

    &:hover {
      background-color: #d6d6d6;
    }
  }

  &-delete {
    color: #ef4444;
  }
  &-edit {
    color: #3b82f6;
  }
}
</style>
