import type { Awaitable, OptionsConfig, TypedFlatConfigItem } from '@antfu/eslint-config';
import type { Linter } from 'eslint';

import defineConfig from '@antfu/eslint-config';

import internal from '../rules';
import { styleConfig } from './stylistic.config';

export const base: Linter.RulesRecord = {
  'antfu/curly': 'off',
  'antfu/if-newline': 'off',
  'node/prefer-global/process': ['error', 'always'],
  'perfectionist/sort-exports': [
    'error',
    {
      order: 'asc',
      type: 'natural',
      partitionByNewLine: true,
    },
  ],
  'perfectionist/sort-named-exports': [
    'error',
    {
      order: 'asc',
      type: 'natural',
      partitionByNewLine: true,
    },
  ],
  'perfectionist/sort-imports': [
    'error',
    {
      groups: [
        'type',
        'internal-type',
        ['parent-type', 'sibling-type'],
        'index-type',

        'builtin',
        'external',
        'internal',
        ['parent', 'sibling'],

        'index',
        'side-effect',
        'object',

        'style',
        'side-effect-style',

        'unknown',
      ],
      newlinesBetween: 'always',
      order: 'asc',
      type: 'natural',
      tsconfigRootDir: process.cwd(),
    },
  ],
  'no-console': [
    'error',
    {
      allow: ['info', 'warn', 'error'],
    },
  ],
};

export type EslintOptionsConfig = OptionsConfig & Omit<TypedFlatConfigItem, 'files'> & { test?: Linter.Config; progress?: boolean };
export function baseConfig(options?: EslintOptionsConfig): EslintOptionsConfig {
  const { rules, ..._options } = options ?? {};
  return styleConfig({
    rules: {
      ...base,
      ...rules,
    },
    ..._options,
  });
}

export type UserConfig = Awaitable<TypedFlatConfigItem | TypedFlatConfigItem[] | Linter.Config[]>;
export type EslintConfig = TypedFlatConfigItem[];
export async function defineBaseConfig(options?: EslintOptionsConfig, ...userConfigs: UserConfig[]): Promise<EslintConfig> {
  const { progress, ..._options } = options ?? {};
  return defineConfig(
    baseConfig(_options),
    {
      plugins: { dvcol: internal },
      rules: {
        'dvcol/lint-progress': progress === false ? 'off' : 'warn',
      },
    },
    ...userConfigs,
  );
}
