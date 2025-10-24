import type { OptionsConfig, OptionsOverrides } from '@antfu/eslint-config';

import type { EslintConfig, EslintOptionsConfig, UserConfig } from './base.config';

import { defineTypescriptConfig, typescriptConfig } from './typescript.config';

export const react = {
  overrides: {},
} satisfies OptionsOverrides;

function mergeReactConfig(opt: OptionsConfig['react']) {
  if (opt === false) return false;
  if (opt === true || !opt) return react;
  return { ...react, ...opt, overrides: { ...react.overrides, ...opt.overrides } };
}

export function reactConfig(options?: EslintOptionsConfig): EslintOptionsConfig {
  const { react: _react, ..._options } = options ?? {};
  return typescriptConfig(
    {
      svelte: false,
      vue: false,
      react: mergeReactConfig(_react),
      solid: false,
      ..._options,
    },
  );
}

export async function defineReactConfig(options?: EslintOptionsConfig, ...userConfigs: UserConfig[]): Promise<EslintConfig> {
  return defineTypescriptConfig(reactConfig(options), ...userConfigs);
}
