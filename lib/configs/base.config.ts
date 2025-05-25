import type { Awaitable, OptionsConfig, TypedFlatConfigItem } from '@antfu/eslint-config';
import type { Linter } from 'eslint';

import defineConfig from '@antfu/eslint-config';

import internal from '../rules';
import { styleConfig } from './stylistic.config';

export const base = {
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
    },
  ],
  'no-console': [
    'error',
    {
      allow: ['info', 'warn', 'error'],
    },
  ],
} satisfies Linter.RulesRecord;

export function getBaseConfig(
  typescript: boolean = true,
  tsconfigRootDir = process.cwd(),
): Linter.RulesRecord {
  if (!typescript) return base;
  return {
    ...base,
    'perfectionist/sort-imports': [
      'error',
      {
        ...base['perfectionist/sort-imports'][1],
        tsconfigRootDir,
      },
    ],
  };
}

export type EslintOptionsConfig = OptionsConfig & Omit<TypedFlatConfigItem, 'files'> & { test?: Linter.Config; progress?: boolean };
export function baseConfig(options?: EslintOptionsConfig): EslintOptionsConfig {
  const { rules, ..._options } = options ?? {};
  return styleConfig({
    rules: {
      ...getBaseConfig(!!options?.typescript),
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
