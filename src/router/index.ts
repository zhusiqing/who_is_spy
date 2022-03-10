import { App } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import nProgress from 'nprogress';
import { baseRoutes } from './base';

export const router = createRouter({
  history: createWebHistory('/'),
  routes: baseRoutes,
  strict: true,
  scrollBehavior: () => ({
    left: 0,
    top: 0
  })
});
export const setupRouter = (app: App) => {
  app.use(router);
  router.beforeEach((to, from, next) => {
    nProgress.start();
    next();
  });
  router.afterEach(() => {
    nProgress.done();
  });
};
