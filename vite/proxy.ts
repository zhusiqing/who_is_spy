import type { ProxyOptions } from 'vite';

export const createProxy = (env: Record<string, string>): Record<string, ProxyOptions> => {
  const { VITE_API_BASE_URL, VITE_API_TARGET_URL } = env;
  const proxy = {
    [VITE_API_BASE_URL]: {
      target: VITE_API_TARGET_URL,
      changeOrigin: true,
      rewrite: path => path.replace(new RegExp(`^${VITE_API_BASE_URL}`), '')
    }
  };
  return proxy;
};
