<script setup lang="ts">
import BasicLayout from '@/components/BasicLayout.vue';
import ToastContainer from './components/ToastContainer.vue';
import ModalContainer from './components/ModalContainer.vue';
import TodoPage from './components/TodoPage.vue';
</script>

<template>
  <BasicLayout>
    <!-- Pages -->
    <TodoPage />

    <!-- Teleport Components -->
    <ModalContainer />
    <ToastContainer />
  </BasicLayout>
</template>

<style scoped></style>
