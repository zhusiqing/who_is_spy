<template>
  <div class="game">
    <div class="top">
      <!-- <home-outlined class="back" /> -->
      <reload-outlined class="restart" @click="restart" />
    </div>
    <div class="tip">{{
      isGaming ? '请选中的玩家描述所见的词' : '请玩家依次传手机查看自己的词'
    }}</div>
    <template v-if="!isGaming">
      <div class="content">
        <div class="cards">
          <template v-for="(word, key) in readWords" :key="`${key}-${word.num}`">
            <div
              class="card"
              :class="{ reverse: word.status === 1 }"
              :style="{ left: `${key * 3}px`, top: `${key * 10}px` }"
              @click="() => cardClick(key)"
            >
              <div class="front">
                {{ key + 1 }}
              </div>
              <div class="back">
                <div class="number">{{ key + 1 }}</div>
                <div class="word">{{ word.text }}</div>
                <div class="confirm">
                  <a-button class="btn" type="primary" @click.stop="rememberClick"
                    >我记住啦</a-button
                  >
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </template>
    <template v-else>
      <div ref="gaming" class="gaming">
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
  </div>
</template>
<script lang="ts" setup>
  import { session, initSession } from '@/utils/storage';
  import { Modal } from 'ant-design-vue/es';
  import 'ant-design-vue/es/modal/style';
  import { wordsList } from '@/utils/words';
  interface InterfacePlayer {
    num: number;
    text: string;
    status: number;
    identity: number;
  }
  enum EnumStatus {
    init = 0,
    finish = 1
  }
  enum EnumIdentity {
    civilian = 1,
    spy = 2,
    white = 3
  }
  // 取缓存词组
  let civilianWord = session.value.civilianWord || '';
  let spyWord = session.value.spyWord || '';
  // 生成随机组词并放入缓存
  if (!civilianWord || !spyWord) {
    const wordsListNum = wordsList.length;
    const selectWordKey = Math.floor(Math.random() * wordsListNum);
    const selectWord = wordsList[selectWordKey];
    [civilianWord, spyWord] = selectWord.split(',');
    session.value.civilianWord = civilianWord;
    session.value.spyWord = spyWord;
  }

  const router = useRouter();
  let playerNums = session.value.player;
  if (!playerNums) {
    playerNums = 4;
    router.replace('/login');
  }
  const list = new Array(playerNums).fill(1).map((el, i) => {
    return {
      num: ++i,
      text: civilianWord,
      status: 0,
      identity: EnumIdentity.civilian
    };
  });
  // 生成随机数组
  const randomPlayer = (sum: number, num: number, exist: number[] = []): number[] => {
    const arr: number[] = [];
    for (let i = 0; i < num; i++) {
      const r = Math.floor(Math.random() * sum);
      if (arr.includes(r) || exist.includes(r)) {
        i--;
      } else {
        arr.push(r);
      }
    }
    return arr;
  };
  // 对应的key组
  let spyKeys = session.value.spyKeys;
  let whiteKeys = session.value.whiteKeys;
  if (!spyKeys) {
    spyKeys = randomPlayer(playerNums, session.value.spy);
    session.value.spyKeys = spyKeys;
  }
  if (!whiteKeys) {
    whiteKeys = randomPlayer(playerNums, session.value.white, spyKeys);
    session.value.whiteKeys = whiteKeys;
  }
  // 设置
  spyKeys.forEach(key => {
    list[key].identity = EnumIdentity.spy;
    list[key].text = spyWord;
  });
  whiteKeys.forEach(key => {
    list[key].identity = EnumIdentity.white;
    list[key].text = '';
  });
  const readWords = reactive(list.map(el => ({ ...el })));
  const players = reactive(list.map(el => ({ ...el })));
  // 选中玩家的key
  const selectKey =
    session.value.selectKey === undefined
      ? Math.floor(Math.random() * playerNums)
      : session.value.selectKey;
  players[selectKey].status = 1;
  session.value.selectKey = selectKey;
  // 当前环节
  const currentStatus = ref(session.value.currentStatus);
  // 当前哪个玩家被选中
  const currentFocus = ref(-1);
  const gaming = ref(null);
  const isDisabled = ref(false);
  // 是否是游戏进行环节
  const isGaming = computed(() => currentStatus.value === EnumStatus.finish);
  // 是否要进行看词或者投票
  const isVote = computed(() => currentFocus.value !== -1);
  // 当前操作的玩家
  const currentPlayer = ref<InterfacePlayer | null>(null);
  // 查看词
  const isForget = ref(false);
  // 选中状态切换
  onClickOutside(gaming, () => {
    if (currentFocus.value !== -1) {
      currentFocus.value = -1;
      isDisabled.value = false;
    }
  });
  // 玩家查看词的情况
  watch(readWords, p => {
    if (!p.length) {
      const status = EnumStatus.finish;
      currentStatus.value = status;
      session.value.currentStatus = status;
    }
  });

  // 卡片点击查看
  const cardClick = (key: number) => {
    readWords[key].status = 1;
  };
  // 我记住啦
  const rememberClick = () => {
    readWords.pop();
  };
  // 选中玩家
  const focusClick = (key: number) => {
    const player = players[key];
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
    const filterPlayer = players.filter(el => el.status !== 2);
    const filterPlayerNum = filterPlayer.length;
    const filterSpy = filterPlayer.filter(el => el.identity === EnumIdentity.spy);
    const filterSpyNum = filterSpy.length;
    if (!filterSpyNum) {
      alert('游戏结束，平民胜利');
      init();
      return;
    }
    const filterCivilian = filterPlayer.filter(el => el.identity === EnumIdentity.civilian);
    const filterCivilianNum = filterCivilian.length;
    if (filterSpyNum >= filterCivilianNum) {
      alert('游戏结束，卧底胜利');
      init();
      return;
    }
    // 如果当前是选中的第一个玩家，则自动延伸到下一个玩家
    if (status === 1) {
      const findIndex = players.findIndex(el => el.num === currentPlayer.value?.num);
      let index = -1;
      if (findIndex === players.length - 1) {
        index = 0;
      } else {
        index = findIndex + 1;
      }
      players[index].status = 1;
    }
  };
  // 初始化
  function init() {
    session.value = initSession;
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
  @yellow: var(--color-yellow);
  @blue: var(--color-blue);
  @text: var(--color-text);
  @red: var(--color-red);
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
    .content {
      padding-top: 40px;
      .cards {
        position: relative;
        margin-left: 70px;
        .card {
          position: absolute;
          display: flex;
          align-items: center;
          flex-direction: column;
          width: 200px;
          height: 300px;
          top: 0;
          left: 0;
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
      }
    }
    .gaming {
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
  }
</style>
