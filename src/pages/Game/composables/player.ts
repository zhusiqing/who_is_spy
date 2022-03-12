import { session, initSession } from '@/utils/storage';
import { EnumIdentity } from '@/utils/enum';
interface InterfacePlayerOptions {
  playerNum: number;
  civilianWord: string;
  spyWord: string;
  spyKeys: number[];
  whiteKeys: number[];
  selectKey: number;
}

export const usePlayer = (options: InterfacePlayerOptions) => {
  const { playerNum, civilianWord, spyWord, spyKeys, whiteKeys, selectKey } = options;
  // 初始化的底层数组
  const list = new Array(playerNum).fill(1).map((el, i) => {
    return {
      num: ++i,
      text: civilianWord,
      status: 0,
      identity: EnumIdentity.civilian
    };
  });

  // 设置
  spyKeys.forEach(key => {
    list[key].identity = EnumIdentity.spy;
    list[key].text = spyWord;
  });
  whiteKeys.forEach(key => {
    list[key].identity = EnumIdentity.white;
    list[key].text = '你是个白板';
  });
  const readWords = reactive(list.map(el => ({ ...el })));
  const players = reactive(list.map(el => ({ ...el })));
  players[selectKey].status = 1;
  return {
    readWords,
    players
  };
};
