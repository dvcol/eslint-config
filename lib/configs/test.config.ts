import type { OptionsConfig, OptionsOverrides } from '@antfu/eslint-config';

import type { EslintConfig, EslintOptionsConfig, UserConfig } from './base.config';

import { baseConfig, defineBaseConfig } from './base.config';

export const test: OptionsOverrides = {
  overrides: {
    // Remove when vitest rule is implemented @see https://github.com/vitest-dev/eslint-plugin-vitest/issues/591
    'ts/unbound-method': 'off',
  },
};

function mergeTestConfig(opt: OptionsConfig['test'] = true): OptionsConfig['test'] {
  if (opt === false) return false;
  if (opt === true || !opt) return test;
  return {
    ...test,
    ...opt,
    overrides: { ...test.overrides, ...opt.overrides },
  };
}

export function testConfig(options?: EslintOptionsConfig): EslintOptionsConfig {
  const { test: _test, ..._options } = options ?? {};
  return baseConfig({
    test: mergeTestConfig(_test),
    ..._options,
  });
}

export async function defineTestConfig(options?: EslintOptionsConfig, ...userConfigs: UserConfig[]): Promise<EslintConfig> {
  return defineBaseConfig(testConfig(options), ...userConfigs);
}
