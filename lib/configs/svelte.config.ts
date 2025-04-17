import type { OptionsConfig, OptionsOverrides } from '@antfu/eslint-config';

import type { EslintConfig, EslintOptionsConfig, UserConfig } from './base.config';

import { defineTypescriptConfig, typescriptConfig } from './typescript.config';

export const svelte: OptionsOverrides = {
  overrides: {
    'svelte/html-quotes': [
      'error',
      {
        prefer: 'double',
      },
    ],
  },
};

function mergeSvelteConfig(opt: OptionsConfig['svelte']) {
  if (opt === false) return false;
  if (opt === true || !opt) return svelte;
  return { ...svelte, ...opt, overrides: { ...svelte.overrides, ...opt.overrides } };
}

export function svelteConfig(options?: EslintOptionsConfig): EslintOptionsConfig {
  const { svelte: _svelte, ..._options } = options ?? {};
  return typescriptConfig(
    {
      svelte: mergeSvelteConfig(_svelte),
      ..._options,
    },
  );
}

export async function defineSvelteConfig(options?: EslintOptionsConfig, ...userConfigs: UserConfig[]): Promise<EslintConfig> {
  return defineTypescriptConfig(svelteConfig(options), ...userConfigs);
}
