<template>
  <div class="read-words">
    <div class="cards">
      <template v-for="(word, key) in readWords" :key="`${key}-${word.num}`">
        <Card
          v-model:status="word.status"
          class="card"
          :num="key + 1"
          :text="word.text"
          :style="{ left: `${key * 3}px`, top: `${key * 10}px` }"
          @remember="remember"
        ></Card>
      </template>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import type { PropType } from 'vue';

  const propsReadWords = defineProps({
    readWords: {
      type: Array as PropType<InterfacePlayer[]>,
      default: () => []
    }
  });
  const { readWords } = toRefs(propsReadWords);
  const emitpropsReadWords = defineEmits(['update:readWords']);
  // 我记住啦
  const remember = () => {
    readWords.value.pop();
  };
</script>
<style lang="less" scoped>
  .read-words {
    padding-top: 40px;
    .cards {
      position: relative;
      margin-left: 80px;
    }
  }
</style>
