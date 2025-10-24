import type { OptionsConfig, OptionsVue } from '@antfu/eslint-config';

import type { EslintConfig, EslintOptionsConfig, UserConfig } from './base.config';

import { defineTypescriptConfig, typescriptConfig } from './typescript.config';

export const vue = {
  sfcBlocks: true,
  vueVersion: 3,
  a11y: true,
  overrides: {},
} satisfies OptionsVue;

function mergeBlocks(blocks: OptionsVue['sfcBlocks']): OptionsVue['sfcBlocks'] {
  if (blocks === false) return false;
  if (blocks === true || !blocks) return vue.sfcBlocks ?? true;
  return { ...(typeof vue.sfcBlocks === 'boolean' ? {} : vue.sfcBlocks), ...blocks };
}

function mergeVueConfig(opt: OptionsConfig['vue']) {
  if (opt === false) return false;
  if (opt === true || !opt) return vue;
  return { ...vue, ...opt, sfcBlocks: mergeBlocks(opt.sfcBlocks), overrides: { ...vue.overrides, ...opt.overrides } };
}

export function vueConfig(options?: EslintOptionsConfig): EslintOptionsConfig {
  const { vue: _vue, ..._options } = options ?? {};
  return typescriptConfig(
    {
      svelte: false,
      vue: mergeVueConfig(_vue),
      react: false,
      solid: false,
      ..._options,
    },
  );
}

export async function defineVueConfig(options?: EslintOptionsConfig, ...userConfigs: UserConfig[]): Promise<EslintConfig> {
  return defineTypescriptConfig(vueConfig(options), ...userConfigs);
}
