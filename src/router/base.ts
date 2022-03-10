import type { RouteRecordRaw } from 'vue-router';
import ErrorPage from '@/pages/Error/index.vue';

export enum EnumPage {
  Login = '/login',
  Game = '/game',
  Error = '/error'
}
export const RootRoute: RouteRecordRaw = {
  path: '/',
  name: 'Root',
  redirect: EnumPage.Login
};

export const LoginRoute: RouteRecordRaw = {
  path: EnumPage.Login,
  name: 'Login',
  component: () => import('@/pages/Login/index.vue'),
  meta: {
    title: '登录页'
  }
};
export const GameRoute: RouteRecordRaw = {
  path: EnumPage.Game,
  name: 'Game',
  component: () => import('@/pages/Game/index.vue'),
  meta: {
    title: '游戏页'
  }
};

export const ErrorRoute: RouteRecordRaw = {
  path: EnumPage.Error,
  name: 'Error',
  component: ErrorPage,
  meta: {
    title: '异常页'
  }
};

export const NotFoundRoute: RouteRecordRaw = {
  path: '/:notFound(.*)*',
  name: 'NotFound',
  redirect: '/error'
};

export const baseRoutes: RouteRecordRaw[] = [RootRoute, LoginRoute, GameRoute, ErrorRoute];
