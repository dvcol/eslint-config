import defineConfig from '@antfu/eslint-config';
import prettierOptions from './prettier.config.js';

export default defineConfig(
  {
    typescript: {
      tsconfigPath: 'tsconfig.json',
    },
    stylistic: {
      semi: true,
    },
    rules: {
      'antfu/curly': 'off',
      'antfu/if-newline': 'off',
      'node/prefer-global/process': ['error', 'always'],
    },
    overrides: {
      stylistic: {
        'style/quotes': [
          'error',
          'single',
          {
            avoidEscape: true,
            allowTemplateLiterals: 'avoidEscape',
          },
        ],
        'style/brace-style': ['error', '1tbs'],
      },
      typescript: {
        'ts/no-misused-promises': [
          'error',
          {
            checksVoidReturn: false,
          },
        ],
      },
    },
    formatters: {
      html: 'prettier',
      markdown: 'prettier',
      svg: 'prettier',
      xml: 'prettier',
      prettierOptions,
    },
  },
  {
    ignores: [
      '.idea',
    ],
  },
);
