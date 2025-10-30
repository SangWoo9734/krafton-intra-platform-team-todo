<script setup lang="ts">
import BasicLayout from '@/components/common/basic/BasicLayout.vue';
import ToastContainer from '@/components/toast/ToastContainer.vue';
import TodoPage from '@/components/todo/TodoPage.vue';
</script>

<template>
  <BasicLayout>
    <!-- Pages -->
    <TodoPage />

    <!-- Teleport Components -->
    <ToastContainer />
  </BasicLayout>
</template>

<style scoped></style>
