<template>
  <div ref="playing" class="playing">
    <template v-for="(player, key) in players" :key="key">
      <div
        class="player"
        :class="{
          select: player.status === 1,
          disabled: isDisabled && currentFocus !== key,
          out: player.status === 2
        }"
        @click="() => focusClick(key)"
        >{{ player.num }}</div
      >
    </template>
  </div>
  <div v-if="isVote" class="operate">
    <a-button class="btn forget" type="primary" @click="forget">忘词</a-button>
    <a-button class="btn vote" type="primary" @click="vote">投票</a-button>
  </div>
  <div v-if="isForget && currentPlayer" class="mask" @click="closeForget">
    <div class="forget-cards">
      <div class="number">{{ currentPlayer.num }}</div>
      <div class="word">{{ currentPlayer.text }}</div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import type { PropType } from 'vue';
  import { EnumIdentity } from '@/utils/enum';

  const propsPlaying = defineProps({
    players: {
      type: Array as PropType<InterfacePlayer[]>,
      default: () => []
    }
  });
  const { players } = toRefs(propsPlaying);
  const emitPlaying = defineEmits(['over']);
  const playing = ref(null);
  // 当前哪个玩家被选中
  const currentFocus = ref(-1);
  const isDisabled = ref(false);
  // 是否要进行看词或者投票
  const isVote = computed(() => currentFocus.value !== -1);
  // 当前操作的玩家
  const currentPlayer = ref<InterfacePlayer | null>(null);
  // 查看词
  const isForget = ref(false);
  // 选中状态切换
  onClickOutside(playing, () => {
    if (currentFocus.value !== -1) {
      currentFocus.value = -1;
      isDisabled.value = false;
    }
  });
  // 选中玩家
  const focusClick = (key: number) => {
    const player = propsPlaying.players[key];
    // 踢出了，就没有操作了
    if (player.status === 2) {
      return;
    }
    isDisabled.value = true;
    currentFocus.value = key;
    currentPlayer.value = player;
  };
  // 忘词
  const forget = () => {
    isForget.value = true;
  };
  // 关闭忘词
  const closeForget = () => {
    isForget.value = false;
    currentPlayer.value = null;
  };
  // 投票/结算
  const vote = () => {
    const status = currentPlayer.value?.status;
    // 出局
    if (currentPlayer.value) {
      currentPlayer.value.status = 2;
    }
    const filterPlayer = players.value.filter(el => el.status !== 2);
    const filterPlayerNum = filterPlayer.length;
    const filterSpy = filterPlayer.filter(el => el.identity === EnumIdentity.spy);
    const filterSpyNum = filterSpy.length;
    if (!filterSpyNum) {
      alert('游戏结束，平民胜利');
      emitPlaying('over');
      return;
    }
    const filterCivilian = filterPlayer.filter(el => el.identity === EnumIdentity.civilian);
    const filterCivilianNum = filterCivilian.length;
    if (filterSpyNum >= filterCivilianNum) {
      alert('游戏结束，卧底胜利');
      emitPlaying('over');
      return;
    }
    // 如果当前是选中的第一个玩家，则自动延伸到下一个玩家
    if (status === 1) {
      const findIndex = players.value.findIndex(el => el.num === currentPlayer.value?.num);
      let index = -1;
      if (findIndex === players.value.length - 1) {
        index = 0;
      } else {
        index = findIndex + 1;
      }
      players.value[index].status = 1;
    }
  };
</script>
<style lang="less" scoped>
  @yellow: var(--color-yellow);
  @blue: var(--color-blue);
  @red: var(--color-red);
  @text: var(--color-text);
  .playing {
    display: flex;
    text-align: center;
    justify-content: center;
    flex-wrap: wrap;
    padding-top: 40px;
    .player {
      width: 60px;
      height: 60px;
      border: 1px solid @yellow;
      border-radius: 50%;
      margin: 20px 10px;
      line-height: 60px;
      font-size: 30px;
      color: @yellow;
      font-weight: 600;
      &.select {
        background-color: @yellow;
        color: @blue;
      }
      &.disabled {
        border-color: rgba(255, 255, 255, 0.2);
        color: rgba(255, 255, 255, 0.2);
        background-color: transparent;
      }
      &.out {
        position: relative;
        &::before {
          content: ' ';
          position: absolute;
          width: 8px;
          height: 100%;
          background-color: @red;
          transform-origin: 50% 58%;
          transform: rotateZ(45deg);
        }
        &::after {
          content: ' ';
          position: absolute;
          width: 8px;
          height: 100%;
          background-color: @red;
          transform-origin: 0 70%;
          transform: rotateZ(-45deg);
        }
      }
    }
  }
  .operate {
    display: flex;
    justify-content: space-around;
    padding-top: 40px;
    .btn {
      width: 140px;
      height: 50px;
      font-size: 26px;
      border-radius: 6px;
      border: none;
    }
    .forget {
      color: @text;
      background-color: @yellow;
    }
    .vote {
      color: @text;
      background-color: @red;
    }
  }
  .mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.6);
    .forget-cards {
      width: 200px;
      height: 300px;
      background-color: @yellow;
      text-align: center;
      .number {
        font-size: 32px;
        padding-top: 50px;
      }
      .word {
        font-size: 36px;
        padding-top: 40px;
      }
    }
  }
</style>
