<script setup lang="ts">
  // This starter template is using Vue 3 <script setup> SFCs
  // Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
  import { AppStore } from '@/store/modules/app';
  const store = AppStore();
  store.updateLoading(false);
</script>

<template>
  <init-loading>
    <RouterView />
  </init-loading>
</template>

<style>
  @import './style/index.css';
  @import './style/global.css';
</style>
