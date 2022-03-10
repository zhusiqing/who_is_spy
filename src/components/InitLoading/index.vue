<template>
  <template v-if="isLoading">
    <div class="init-loading">
      <a-spin tip="请稍等，加载中..." size="large" />
    </div>
  </template>
  <template v-else>
    <slot />
  </template>
</template>
<script lang="ts" setup>
  import { AppStore } from '@/store/modules/app';
  const store = AppStore();
  const isLoading = computed(() => {
    return store.isLoading;
  });
</script>
<style lang="less" scoped>
  .init-loading {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
