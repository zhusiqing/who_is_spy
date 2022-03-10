import { http } from '@/utils/request';

const { VITE_API_PREFIX } = import.meta.env;
interface InterfaceUrl {
  [key: string]: string;
}
const url: InterfaceUrl = {
  getUserInfo: '/getUserInfo'
};
Object.keys(url).map(key => {
  url[key] = `${VITE_API_PREFIX}${url[key]}`;
});

export const getUserInfo = () => http.get<InterFaceUserInfo>(url.getUserInfo);
