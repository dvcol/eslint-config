import type { OptionsFormatters } from '@antfu/eslint-config';

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
