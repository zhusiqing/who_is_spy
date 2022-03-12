import { wordsList } from '@/utils/words';

export const useWords = (civilianWord = '', spyWord = '') => {
  // 是否要存入session
  let isSetWordStorage = false;
  // 生成随机组词并放入缓存
  if (!civilianWord || !spyWord) {
    const wordsListNum = wordsList.length;
    const selectWordKey = Math.floor(Math.random() * wordsListNum);
    const selectWord = wordsList[selectWordKey];
    [civilianWord, spyWord] = selectWord.split(',');
    isSetWordStorage = true;
  }
  return { civilianWord, spyWord, isSetWordStorage };
};
