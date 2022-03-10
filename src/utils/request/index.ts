import { AppAxios } from './Axios';

const { VITE_API_BASE_URL } = import.meta.env;
const isBuild = process.env.NODE_ENV === 'production';

export const http = new AppAxios({
  baseURL: isBuild ? '' : VITE_API_BASE_URL,
  timeout: 60e3
});
