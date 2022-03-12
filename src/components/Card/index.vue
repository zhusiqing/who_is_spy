<template>
  <div class="card" :class="{ reverse: isReverse }" @click="click">
    <div class="front">
      {{ props.num }}
    </div>
    <div class="back">
      <div class="number">{{ props.num }}</div>
      <div class="word">{{ props.text }}</div>
      <div class="confirm">
        <a-button class="btn" type="primary" @click.stop="rememberClick">我记住啦</a-button>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  const props = defineProps({
    status: Number,
    num: Number,
    text: String
  });
  const emit = defineEmits(['remember', 'update:status']);
  const _status = computed({
    get() {
      return props.status;
    },
    set(val) {
      emit('update:status', val);
    }
  });
  const isReverse = computed(() => _status.value === 1);
  // 卡片点击查看
  const click = () => {
    _status.value = 1;
  };
  // 我记住啦
  const rememberClick = () => {
    emit('remember');
  };
</script>
<style lang="less" scoped>
  @yellow: var(--color-yellow);
  .card {
    position: absolute;
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 200px;
    height: 300px;
    text-align: center;
    &.reverse {
      z-index: 10;
      .front {
        transform: rotateY(180deg);
      }
      .back {
        transform: rotateY(360deg);
      }
    }
    .front,
    .back {
      position: absolute;
      width: 100%;
      height: 100%;
      transition: transform 1s ease;
      backface-visibility: hidden;
      -webkit-backface-visibility: hidden;
      background-color: @yellow;
      box-shadow: 2px 2px 10px 1px rgba(0, 0, 0, 0.2);
    }
    .front {
      transform: rotateY(0);
      z-index: 2;
      line-height: 300px;
      font-size: 46px;
    }
    .back {
      transform: rotateY(180deg);
      z-index: 1;
    }
    .number {
      text-align: center;
      font-size: 30px;
      padding-top: 30px;
    }
    .word {
      padding-top: 30px;
      font-size: 36px;
    }
    .confirm {
      padding-top: 20px;
      .btn {
        background-color: #141e30;
        border: none;
        color: @yellow;
        width: 160px;
        height: 40px;
      }
    }
  }
</style>
