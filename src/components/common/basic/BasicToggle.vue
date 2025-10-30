<script setup lang="ts">
import { CheckIcon } from '@heroicons/vue/20/solid';

interface Props {
  isSelected: boolean;
  action: () => void;
}

const props = defineProps<Props>();
</script>

<template>
  <button
    type="button"
    :class="['checkbox-box', { 'selected-box': props.isSelected }]"
    @click="props.action"
    role="checkbox"
    :aria-checked="props.isSelected"
  >
    <CheckIcon
      :class="['checkbox-icon', { 'selected-icon': props.isSelected }]"
    />
  </button>
</template>
<style scoped lang="scss">
.checkbox {
  &-box {
    border-radius: 6px;
    border: 2px solid #c6cfdc;
    width: 24px;
    height: 24px;
    background-color: transparent;
  }
  &-icon {
    width: 20px;
    height: 20px;
    color: #c6cfdc;
  }
}

.selected {
  &-box {
    border-color: #007fff;
    background-color: #007fff;
  }
  &-icon {
    color: white;
  }
}
</style>
