import { createApp } from 'vue';
import App from './App.vue';
import { setupRouter } from './router';
import { setupStore } from './store';
import 'ant-design-vue/es/message/style';
import 'ant-design-vue/es/modal/style';
import 'nprogress/nprogress.css';

function initApp() {
  const app = createApp(App);
  setupStore(app);
  setupRouter(app);
  app.mount('#app');
}

initApp();
