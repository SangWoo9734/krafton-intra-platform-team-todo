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
  padding: 16px;
  width: 100%;
}

@media (width >= 768px) {
  .container {
    padding: 24px;
  }
}

@media (width >= 1024px) {
  .container {
    padding: 32px;
  }
}
</style>
