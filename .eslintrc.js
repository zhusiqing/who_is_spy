const {
  defineConfig
} = require('eslint-define-config')
module.exports = defineConfig({
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true
  },
  plugins: [
    'vue',
    'prettier'
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: '2020',
    sourceType: 'module',
    jsxPragma: 'React',
    ecmaFeatures: {
      jsx: true
    },
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:prettier/recommended'
  ],
  rules: {
    "prettier/prettier": "error",
    'vue/multi-word-component-names': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'vue/v-on-event-hyphenation': "off"
  },
})
