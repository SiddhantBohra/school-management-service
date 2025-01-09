const globals = require('globals');
const pluginJest = require('eslint-plugin-jest');
const eslintConfigPrettier = require('eslint-config-prettier');
const pluginJs = require('@eslint/js');

module.exports = [
  {
    languageOptions: {
      sourceType: 'commonjs',
      ecmaVersion: 2022,
      globals: {
        ...globals.node,
        ...globals.jest,
      },
    },
  },
  {
    plugins: {
      jest: pluginJest,
    },
  },
  {
    files: ['**/*.js'],
  },
  {
    rules: {
      ...pluginJs.configs.recommended.rules,
    },
  },
  {
    ignores: ['node_modules'],
  },
  eslintConfigPrettier,
];
