import type { Awaitable, OptionsConfig, OptionsOverrides, StylisticConfig, TypedFlatConfigItem } from '@antfu/eslint-config';
import type { Linter } from 'eslint';

import defineConfig from '@antfu/eslint-config';
import { formatters } from './prettier.config';

export const stylistic: StylisticConfig & OptionsOverrides = {
  semi: true,
  overrides: {
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
};

export const base: Linter.RulesRecord = {
  'antfu/curly': 'off',
  'antfu/if-newline': 'off',
  'node/prefer-global/process': ['error', 'always'],
  'perfectionist/sort-exports': ['error', {
    order: 'asc',
    type: 'natural',
    partitionByNewLine: true,
  }],
  'perfectionist/sort-named-exports': ['error', {
    order: 'asc',
    type: 'natural',
    partitionByNewLine: true,
  }],
  'perfectionist/sort-imports': ['error', {
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
  }],
};

function mergeStylisticConfig(opt: OptionsConfig['stylistic']) {
  if (opt === false) return false;
  if (opt === true || !opt) return stylistic;
  return { ...stylistic, ...opt, overrides: { ...stylistic.overrides, ...opt.overrides } };
}

function mergeFormattersConfig(opt: OptionsConfig['formatters']) {
  if (opt === false) return false;
  if (opt === true || !opt) return formatters;
  return {
    ...formatters,
    ...opt,
    prettierOptions: { ...formatters.prettierOptions, ...opt.prettierOptions },
  };
}

export type EslintOptionsConfig = OptionsConfig & Omit<TypedFlatConfigItem, 'files'>;
export function baseConfig(options?: EslintOptionsConfig): EslintOptionsConfig {
  const { stylistic: _stylistic, formatters: _formatters, rules, ..._options } = options ?? {};
  return {
    stylistic: mergeStylisticConfig(_stylistic),
    formatters: mergeFormattersConfig(_formatters),
    rules: {
      ...base,
      ...rules,
    },
    ..._options,
  };
}

export type UserConfig = Awaitable<TypedFlatConfigItem | TypedFlatConfigItem[] | Linter.Config[]>;
export type EslintConfig = TypedFlatConfigItem[];
export async function defineBaseConfig(options?: EslintOptionsConfig, ...userConfigs: UserConfig[]): Promise<EslintConfig> {
  return defineConfig(baseConfig(options), ...userConfigs);
}
