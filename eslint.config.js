import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import google from 'eslint-config-google';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}']},
  {languageOptions: {globals: globals.browser}},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  google,
  {
    rules: {
      'no-multiple-empty-lines': ['error', {'max': 1, 'maxEOF': 0}],
      'no-unused-vars': 'off',
      'require-jsdoc': 'warn',
      'max-len': ['error', {'code': 120}],
    },
  },
  {
    'settings': {
      'react': {
        'version': 'detect',
      },
    },
  },
];
