import { UserConfig, ConfigEnv, loadEnv } from 'vite';
import { resolve } from 'path';
import { createVitePlugins } from './vite/plugin';
import { generateModifyVars } from './vite/themeConfig';
import { createProxy } from './vite/proxy';
const root = process.cwd();
// https://vitejs.dev/config/

export default ({ command, mode }: ConfigEnv): UserConfig => {
  const env = loadEnv(mode, root);
  console.log('vite >>>', command, mode, env);
  const isBuild = command === 'build';
  const isDropConsole = env.VITE_BUILD_DROP_CONSOLE === 'on';
  return {
    root,
    resolve: {
      alias: [
        {
          find: /^@\//,
          replacement: resolve(root, './src') + '/'
        }
      ]
    },
    css: {
      preprocessorOptions: {
        less: {
          // 解决antd less loader版本高的问题
          javascriptEnabled: true,
          modifyVars: generateModifyVars()
        }
      }
    },
    build: {
      target: 'es2015',
      terserOptions: {
        compress: {
          // 防止infinity被压缩成1/0，防止chrome出现性能问题
          keep_infinity: true,
          // 自动删除console
          drop_console: isDropConsole,
          // 自动删除debugger
          drop_debugger: isDropConsole
        }
      },
      // bortli压缩大小报告，压缩大型输出文件可能会慢，禁用提高大型项目的构建性能
      brotliSize: false,
      // 块大小警告的限制（单位 kbs），默认500
      chunkSizeWarningLimit: 1000
    },
    plugins: createVitePlugins(isBuild, env),
    server: {
      hmr: {
        // 禁用服务器错误的遮罩层
        overlay: false
      },
      open: true,
      proxy: createProxy(env),
      port: 3001
    }
  };
};
