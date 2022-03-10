<template>
  <div class="login">
    <div class="form-box">
      <h1 class="title">
        <img src="@/assets/logo.svg" alt="" />
        <p>谁是卧底</p>
      </h1>
      <div class="form">
        <div class="line">
          <div class="label">玩家</div>
          <div class="result">{{ player }}</div>
          <div class="operate">
            <div class="add" @click="addPlayer"><plus-outlined /></div>
            <div class="sub" @click="subPlayer"><minus-outlined /></div>
          </div>
        </div>
        <div class="line">
          <div class="label">卧底</div>
          <div class="result">{{ spy }}</div>
          <div class="operate">
            <div class="add" @click="addSpy"><plus-outlined /></div>
            <div class="sub" @click="subSpy"><minus-outlined /></div>
          </div>
        </div>
        <div class="line">
          <div class="label">白板</div>
          <div class="result">{{ white }}</div>
          <div class="operate">
            <div class="add" @click="addWhite"><plus-outlined /></div>
            <div class="sub" @click="subWhite"><minus-outlined /></div>
          </div>
        </div>
        <div class="line">
          <a-button class="submit" type="primary" @click="submit">开始游戏</a-button>
        </div>
        <p class="tip">玩家4-16人，白板0-2</p>
        <p class="tip">卧底不超过玩家数的一半</p>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { message } from 'ant-design-vue';
  import type { Ref } from 'vue';
  import { session } from '@/utils/storage';
  const router = useRouter();
  const useFormItem = (
    val: number,
    min: number,
    max: number
  ): [Ref<number>, () => void, () => void] => {
    const num = ref(val);
    const add = () => {
      if (num.value < max) {
        num.value++;
      } else {
        message.warning('根据规则，无法继续添加');
      }
    };
    const sub = () => {
      if (num.value > min) {
        num.value--;
      }
    };
    return [num, add, sub];
  };
  const [player, addPlayer, subPlayer] = useFormItem(4, 4, 16);
  const [spy, addSpyHandle, subSpy] = useFormItem(1, 1, 8);
  const [white, addWhiteHandle, subWhite] = useFormItem(0, 0, 2);
  const addSpy = () => {
    if (spy.value < player.value / 2 - 1) {
      addSpyHandle();
    } else {
      message.warning('根据规则，无法继续添加');
    }
  };
  const addWhite = () => {
    if (spy.value + white.value < player.value / 2) {
      addWhiteHandle();
    } else {
      message.warning('根据规则，无法继续添加');
    }
  };
  const submit = () => {
    session.value = {
      player: unref(player),
      spy: unref(spy),
      white: unref(white)
    };
    router.replace('/game');
  };
</script>
<style lang="less" scoped>
  @yellow: var(--color-yellow);
  @blue: var(--color-blue);
  @text: var(--color-text);
  .login {
    height: 100%;
    background-color: @blue;
    display: flex;
    justify-content: center;
    align-items: center;
    .form-box {
      // background-color: rgba(255, 255, 255, 0.8);
      width: 100%;
      // border-radius: 12px;
      padding: 60px 40px;
      .title {
        text-align: center;
        font-size: 28px;
        font-weight: 500;
        color: @yellow;
        > p {
          margin-bottom: 0;
        }
        > img {
          width: 120px;
        }
      }
      .form {
        font-size: 24px;
        color: @text;
        .line {
          display: flex;
          justify-content: center;
          margin-bottom: 24px;
          &:last-child {
            margin-bottom: 0;
          }
          .label {
            margin-right: 10px;
          }
          .result {
            width: 30px;
            margin-right: 10px;
            color: @yellow;
            text-align: center;
          }
          .operate {
            display: flex;
            align-items: center;
            background-color: rgba(255, 255, 255, 0.2);
            color: #ffffff;
            padding: 0 10px;
            border-radius: 50px;
            > div {
              padding: 0 10px;
              font-size: 20px;
              line-height: 20px;
              &.disabled {
                color: rgba(255, 255, 255, 0.1);
              }
            }
          }
          .submit {
            background-color: rgba(255, 255, 255, 0.2);
            border-color: transparent;
            width: 200px;
            height: 40px;
            border-radius: 6px;
            font-size: 20px;
          }
        }
        .tip {
          margin-bottom: 0;
          font-size: 20px;
          text-align: center;
        }
      }
    }
  }
</style>
