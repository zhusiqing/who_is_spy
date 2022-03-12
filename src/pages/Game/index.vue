<template>
  <div class="game">
    <div class="top">
      <!-- <home-outlined class="back" /> -->
      <reload-outlined class="restart" @click="restart" />
    </div>
    <div class="tip">{{
      isPlaying ? '请选中的玩家描述所见的词' : '请玩家依次传手机查看自己的词'
    }}</div>
    <template v-if="!isPlaying">
      <ReadWordsComponent :read-words="readWords"></ReadWordsComponent>
      <!-- <div class="content">
        <div class="cards">
          <template v-for="(word, key) in readWords" :key="`${key}-${word.num}`">
            <Card
              v-model:status="word.status"
              :num="key + 1"
              :text="word.text"
              @remember="rememberClick"
              :style="{ left: `${key * 3}px`, top: `${key * 10}px` }"
            ></Card>
          </template>
        </div>
      </div> -->
    </template>
    <template v-else>
      <PlayComponent :players="players" @over="init"></PlayComponent>
      <!-- <div ref="gaming" class="gaming">
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
      </div> -->
    </template>
  </div>
</template>
<script lang="ts" setup>
  import { Modal } from 'ant-design-vue/es';
  import { useGetSession, useWords, usePlayer } from './composables';
  import { randomPlayer } from '@/utils/tools';
  import ReadWordsComponent from './components/ReadWords.vue';
  import PlayComponent from './components/Playing.vue';
  enum EnumGameStatus {
    word = 1,
    game = 2
  }
  const router = useRouter();
  let {
    civilianWord: cacheCivilianWord,
    spyWord: cacheSpyWord,
    playerNum,
    spyNum,
    whiteNum,
    spyKeys,
    whiteKeys,
    selectKey,
    currentStatus: cacheCurrentStatus,
    setInitSession,
    setSession
  } = useGetSession();
  const { civilianWord, spyWord, isSetWordStorage } = useWords(cacheCivilianWord, cacheSpyWord);
  // 更新缓存词组
  if (isSetWordStorage) {
    setSession('civilianWord', civilianWord);
    setSession('spyWord', spyWord);
  }
  // 玩家获取异常处理
  if (!playerNum) {
    playerNum = 4;
    router.replace('login');
  }
  // 生成随机key
  if (!spyKeys) {
    const keys = randomPlayer(playerNum, spyNum);
    spyKeys = keys;
    setSession('spyKeys', keys);
  }
  // 生成随机key
  if (!whiteKeys) {
    const keys = randomPlayer(playerNum, whiteNum, spyKeys);
    whiteKeys = keys;
    setSession('whiteKeys', keys);
  }
  // 选中玩家的key
  if (selectKey === undefined) {
    selectKey = Math.floor(Math.random() * playerNum);
    setSession('selectKey', selectKey);
  }
  const { readWords, players } = usePlayer({
    playerNum,
    civilianWord,
    spyWord,
    spyKeys,
    whiteKeys,
    selectKey
  });

  // 当前环节
  const currentStatus = ref(cacheCurrentStatus);
  const isPlaying = computed(() => currentStatus.value === EnumGameStatus.game);

  // 玩家查看词的情况
  watch(readWords, p => {
    if (!p.length) {
      const status = EnumGameStatus.game;
      currentStatus.value = status;
      setSession('currentStatus', status);
    }
  });
  // 初始化
  function init() {
    setInitSession();
    router.replace('/login');
  }
  // 重新开始
  const restart = () => {
    Modal.confirm({
      title: '重新开始',
      content: '确认要重新开始游戏？',
      okText: '确认',
      cancelText: '取消',
      onOk() {
        init();
      }
    });
  };
</script>
<style lang="less" scoped>
  @blue: var(--color-blue);
  @text: var(--color-text);
  .game {
    height: 100%;
    background-color: @blue;
    .top {
      display: flex;
      justify-content: space-between;
      padding: 20px 40px;
      font-size: 30px;
      color: @text;
    }
    .tip {
      font-size: 20px;
      text-align: center;
      color: @text;
      padding-top: 30px;
    }
  }
</style>
