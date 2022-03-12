import { session, initSession } from '@/utils/storage';

export const useGetSession = () => {
  // 词组
  const civilianWord = session.value.civilianWord || '';
  const spyWord = session.value.spyWord || '';
  // 玩家数
  const playerNum = session.value.player;
  // 卧底数
  const spyNum = session.value.spy;
  // 白板数
  const whiteNum = session.value.white;
  // 对应角色的key组
  const spyKeys = session.value.spyKeys;
  const whiteKeys = session.value.whiteKeys;
  // 选中玩家key
  const selectKey = session.value.selectKey;
  // 当前环节状态
  const currentStatus = session.value.currentStatus;
  // 初始化
  const setInitSession = () => (session.value = initSession);
  const setSession = (
    key:
      | 'player'
      | 'spy'
      | 'white'
      | 'currentStatus'
      | 'selectKey'
      | 'spyKeys'
      | 'whiteKeys'
      | 'civilianWord'
      | 'spyWord',
    value: string | number | number[]
  ) => {
    switch (key) {
      case 'spyKeys':
      case 'whiteKeys':
        session.value[key] = value as number[];
        break;
      case 'civilianWord':
      case 'spyWord':
        session.value[key] = value as string;
        break;
      default:
        session.value[key] = value as number;
        break;
    }
  };
  return {
    civilianWord,
    spyWord,
    playerNum,
    spyNum,
    whiteNum,
    spyKeys,
    whiteKeys,
    selectKey,
    currentStatus,
    setInitSession,
    setSession
  };
};
