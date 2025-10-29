<script setup lang="ts">
import BasicLayout from '@/components/common/BasicLayout.vue';
import ToastContainer from '@/components/toast/ToastContainer.vue';
import ModalContainer from '@/components/modal/ModalContainer.vue';
import TodoPage from '@/components/todo/TodoPage.vue';
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
