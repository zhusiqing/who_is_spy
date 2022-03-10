<template>
  <div class="error">
    error page
    <div>
      <a-button type="primary" @click="toBackHandle"> 返回 </a-button>
    </div>
  </div>
</template>
<script lang="ts" setup>
  const route = useRoute();
  const router = useRouter();
  const text = ref('error page');
  const { redirectedFrom } = route;
  if (redirectedFrom?.name === 'NotFound') {
    text.value = '404 page';
  }
  const toBackHandle = () => {
    // 这里判断大于2是因为window.open跳转的是长度是1，新开标签页再输入地址是长度是2
    if (history.length > 2) {
      router.back();
    } else {
      window.location.href = '/';
    }
  };
</script>
<style scoped></style>
