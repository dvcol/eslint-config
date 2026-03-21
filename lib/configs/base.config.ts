import type { Awaitable, OptionsConfig, TypedFlatConfigItem } from '@antfu/eslint-config';
import type { Linter } from 'eslint';

import defineConfig, { GLOB_MARKDOWN } from '@antfu/eslint-config';

import internal from '../rules';
import { styleConfig } from './stylistic.config';

export const perfectionist = {
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
        'type-import',
        ['type-builtin', 'type-external'],
        ['type-parent', 'type-sibling', 'type-internal'],
        'type-index',
        'ts-equals-import',

        'builtin',
        'external',
        'internal',
        ['parent', 'sibling'],

        'index',
        'side-effect',

        'style',
        'side-effect-style',

        'unknown',
      ],
      newlinesBetween: 1,
      order: 'asc',
      type: 'natural',
    },
  ],
} satisfies Linter.RulesRecord;

export const base = {
  'antfu/curly': 'off',
  'antfu/if-newline': 'off',
  'node/prefer-global/process': ['error', 'always'],
  ...perfectionist,
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
        tsconfig: { rootDir: tsconfigRootDir },
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
      files: [GLOB_MARKDOWN],
      rules: Object.fromEntries(Object.keys(perfectionist).map(key => [key, 'off'])),
    },
    {
      plugins: { dvcol: internal },
      rules: {
        'dvcol/lint-progress': progress === false ? 'off' : 'warn',
      },
    },
    ...userConfigs,
  );
}
