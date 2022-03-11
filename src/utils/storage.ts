import { SESSION_KEY } from './constant';
interface InterfaceInitSession {
  player: number;
  spy: number;
  white: number;
  currentStatus?: number;
  selectKey?: number;
  spyKeys?: number[];
  whiteKeys?: number[];
  civilianWord?: string;
  spyWord?: string;
}
export const initSession: InterfaceInitSession = {
  player: 0,
  spy: 0,
  white: 0
};
export const session = useSessionStorage(SESSION_KEY, initSession);
