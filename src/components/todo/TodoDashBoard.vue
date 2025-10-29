<script setup lang="ts">
const dashBoardData = [
  { label: '진행중', value: 15 },
  { label: '완료', value: 27 },
  { label: '전체', value: 42 },
];
</script>

<template lang="">
  <div class="dashboard-container">
    <div
      v-for="boardData in dashBoardData"
      v-bind:key="boardData.label"
      class="dashboard-info"
    >
      {{ boardData.label }} : {{ boardData.value }}
    </div>
  </div>
</template>
<style scoped lang="scss">
.dashboard {
  &-container {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-bottom: 12px;
    background-color: #f5f7f9;
  }

  &-info {
    padding: 8px 0;
    border-radius: 8px;
    font-weight: bold;
  }
}
</style>
