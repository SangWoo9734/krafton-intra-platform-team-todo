<script setup lang="ts"></script>
<template>
  <div class="container">
    <slot></slot>
  </div>
</template>
<style scoped>
.container {
  height: 100vh;
  margin: auto;
  max-width: 800px;
  overflow: hidden;
  padding: 24px;
  width: 100%;
}
</style>
