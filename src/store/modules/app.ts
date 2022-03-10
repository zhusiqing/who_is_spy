import { defineStore } from 'pinia';
import type { RouteRecordRaw } from 'vue-router';

export const AppStore = defineStore('app', {
  state: () => ({
    isLoading: true,
    authRoutes: [] as RouteRecordRaw[],
    isLogin: useLocalStorage('login', false)
  }),
  actions: {
    updateLoading(isLoading = false) {
      this.isLoading = isLoading;
    },
    updateAuthRoutes(routes: RouteRecordRaw[]) {
      this.authRoutes = routes;
    },
    updateIsLogin(isLogin = false) {
      this.isLogin = isLogin;
    }
  }
});
