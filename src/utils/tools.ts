// 生成随机数组
export const randomPlayer = (sum: number, num: number, exist: number[] = []): number[] => {
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
