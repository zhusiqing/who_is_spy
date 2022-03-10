import type { Plugin } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import AutoImport from 'unplugin-auto-import/vite';
import legacy from '@vitejs/plugin-legacy';
import compression from 'vite-plugin-compression';

export function createVitePlugins(isBuild: boolean, env: Record<string, string>): Plugin[] {
  const plugins = [
    vue(),
    vueJsx(),
    Components({
      dirs: ['src/components'],
      extensions: ['vue'],
      deep: true,
      resolvers: [
        AntDesignVueResolver({
          // 用于less变更主题用
          importStyle: 'less',
          /**
           * resolve `ant-design-vue' icons
           * requires package `@ant-design/icons-vue`
           */
          resolveIcons: true
        })
      ],
      dts: 'src/components.d.ts'
    }),
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        {
          '@vueuse/core': ['useLocalStorage', 'onClickOutside', 'useSessionStorage']
        }
      ],
      dts: 'src/auto-imports.d.ts'
    })
  ];
  if (isBuild) {
    if (env.VITE_BUILD_LEAGCY === 'on') {
      plugins.push(
        legacy({
          targets: ['ie >= 11'],
          additionalLegacyPolyfills: ['regenerator-runtime/runtime']
        })
      );
    }
    if (env.VITE_BUILD_GZIP === 'on') {
      plugins.push(
        compression({
          // 生成压缩包后缀
          ext: '.gz',
          // 是否在控制台输出压缩结果
          verbose: true,
          // 压缩后是否删除源文件
          deleteOriginFile: false,
          // 超过的进行压缩，单位为b
          threshold: 5 * 1024 + 1 // 5KB
        })
      );
    }
  }
  return plugins;
}
