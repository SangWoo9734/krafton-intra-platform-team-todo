<template>
  <div class="empty-state">
    <div class="icon">📋</div>
    <h3>할 일이 없습니다</h3>
    <p class="description">새로운 Todo를 추가해보세요!</p>
  </div>
</template>

<style scoped lang="scss">
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px 24px;
  gap: 12px;

  .icon {
    font-size: 64px;
    opacity: 0.3;
  }

  h3 {
    font-size: 18px;
    font-weight: 600;
    color: #666;
    margin: 0;
  }

  .description {
    font-size: 14px;
    color: #999;
    text-align: center;
    margin: 0;
  }
}
</style>
