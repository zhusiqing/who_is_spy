## 0.9.2(2022-02-17)

### Features

- 增加 env 变量，修改为 vite 部分参数配置从 env 文件读取
- 增加 vscode 默认插件列表

## 0.9.1(2022-02-16)

### Features

- 新增 vite-plugin-compression 包，构建时生成对应的 gzip 压缩文件，降低服务器的压力

## 0.9.0(2022-01-27)

### Features

- 增加 LICENSE 证书
- 新增@vitejs/plugin-legacy，对 ie11 以上浏览器的兼容打包处理
- 更新 npm 包

## 0.8.0(2022-01-21)

### Features

- 新年新气象，更新 npm 包，更改底部年份为 2022
- 引入 env 环境变量
- 增加一些常用的构建脚本命令
- 格式化全局代码

## 0.7.1(2022-01-20)

### Features

- 引入 prettier 格式化代码
- 格式化全局代码

## 0.7.0(2022-01-17)

### Features

- 引入 unplugin-auto-import，实现自动导入 vue,vue-router,@vueuse/core(部分使用)
- 优化 unplugin-vue-components 的使用
- 引入@vitejs/plugin-vue-jsx 支持 jsx 写法
- 优化 vite.config.ts，抽离配置，修复 ant-design-vue 主题色未变更问题，增加代理服务器用于开发跨域请求
- 优化并删减多余的代码

## 0.6.0(2021-12-22)

### Features

- 更新 npm 包
- 登录页完成
- 登录态相关逻辑的简化版完成

## 0.5.0(2021-12-21)

### Features

- 实现根据动态路由加载边侧栏列表，涉及权限和无需权限页面
- 增加一些权限路由测试页面
- 边侧栏大体完成

## 0.4.0(2021-12-20)

### Features

- ant-design-vue 改为按需加载
- 动态导入 ant-design-vue 和@ant-design/icons-vue 相关组件
- 顶部导航栏布局大体完成
- 实现动态权限路由加载
- 边侧栏的一级权限路由完成
- 增加项目初始化等待页面
- 增加 404 页面的重定向
- 增加测试权限相关的页面

## 0.3.0(2021-12-17)

### Features

- 添加 ant-design-vue 并配置相关按需加载
- 添加@ant-design/icons-vue 实现 icon 组件
- 初步完成布局组件

## 0.2.0(2021-12-16)

### Features

- 添加 eslint 及相关插件并配置
- 添加 commitizen，cz-conventional-changelog，husky，lint-staged 优化 git 提交格式
- 全局安装 pnpm，用其安装依赖
- 增加@vueuse/core 简化部分操作
- 增加全局接口定义文件

## 0.1.0(2021-12-15)

### Features

- 基于 vite + vue3 + ts 初始化项目
- 项目结构添加并优化
- 增加@的 alias 别名
- 添加并封装 vue-router，axios，pinia
- 添加 nprogress 实现进度条
