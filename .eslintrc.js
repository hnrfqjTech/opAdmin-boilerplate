module.exports = {
  root: true,

  env: {
    browser: true,
  },

  extends: [
    'plugin:vue/essential', // eslint-plugin-vue
    '@vue/airbnb',
  ],

  parserOptions: {
    parser: 'babel-eslint',
  },

  rules: {
    'array-bracket-spacing': 'off',
    radix: 'off',
    'no-lonely-if': 'off',
    'no-underscore-dangle': [ 'error', { allowAfterThis: true }],
    'guard-for-in': 'off',
    'no-restricted-syntax': 'off',
    'prefer-destructuring': 'off',
    'comma-dangle': ['error', 'always-multiline'],
    'object-curly-newline': 'off',
    'no-console': 'off',
    'no-debugger': 'off',
    'max-len': 'off',
    'no-restricted-properties': 'off',
    'prefer-template': 'off',
    'vue/no-parsing-error': 'off',
    'no-plusplus': 'off',
    'consistent-return': 'off',
    'no-unused-vars': 'off',
    'no-param-reassign': 'off',
    'global-require': 'off',
    'dot-notation': 'off',
    'space-before-function-paren': 'off',
    'prefer - destructuring': 'off',
    'import/extensions': [
      'off',
    ],
    'import/no-dynamic-require': 'off',
    'linebreak-style': ['off', 'windows'],
  },

  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
};
