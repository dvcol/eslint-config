import type { OptionsConfig, OptionsFormatters, OptionsOverrides, StylisticConfig } from '@antfu/eslint-config';

import type { EslintOptionsConfig } from './base.config';

export const prettierOptions: OptionsFormatters['prettierOptions'] = {
  printWidth: 150,
  singleQuote: true,
  trailingComma: 'all',
  arrowParens: 'always',
  bracketSpacing: true,
};

export const formatters: OptionsFormatters = {
  html: 'prettier',
  markdown: 'prettier',
  svg: 'prettier',
  xml: 'prettier',
  prettierOptions,
};

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

export function styleConfig(options?: EslintOptionsConfig): EslintOptionsConfig {
  const { stylistic: _stylistic, formatters: _formatters, ..._options } = options ?? {};
  return {
    stylistic: mergeStylisticConfig(_stylistic),
    formatters: mergeFormattersConfig(_formatters),
    ..._options,
  };
}
