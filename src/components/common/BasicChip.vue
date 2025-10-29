<script setup lang="ts">
import type { ImportantLabelVarients } from '@/types/todo';

interface Props {
  text: string;
  variant?: ImportantLabelVarients;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'medium',
  class: '',
});

const chipVariantStyle: Record<ImportantLabelVarients, string> = {
  high: 'bg-red',
  medium: 'bg-gray',
  low: 'bg-blue',
};
</script>

<template>
  <div :class="[chipVariantStyle[props.variant], 'chip', props.class]">
    {{ props.text.toUpperCase() }}
  </div>
</template>
<style scoped>
.chip {
  border-radius: 10000px;
  color: white;
  font-size: 10px;
  padding: 3px 8px;
  width: fit-content;
  height: fit-content;
  font-weight: bold;
}

.bg-blue {
  background-color: #4e83da;
}

.bg-red {
  background-color: #ff5656;
}

.bg-gray {
  background-color: #8a8a8a;
}
</style>
