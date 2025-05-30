import type { OptionsConfig, OptionsOverrides, OptionsTypeScriptParserOptions, OptionsTypeScriptWithTypes } from '@antfu/eslint-config';

import type { EslintConfig, EslintOptionsConfig, UserConfig } from './base.config';

import { defineTestConfig, testConfig } from './test.config';

export type OptionsTypeAware = OptionsTypeScriptWithTypes & OptionsOverrides;
export type OptionsTypescriptParser = OptionsTypeScriptParserOptions & OptionsOverrides;
export const typescript = {
  tsconfigPath: 'tsconfig.json',
  overridesTypeAware: {
    'ts/strict-boolean-expressions': [
      'off',
      {
        allowNullableBoolean: true,
        allowNullableEnum: true,
        allowNullableNumber: true,
        allowNullableObject: true,
        allowNullableString: true,
        allowNumber: true,
        allowString: true,
      },
    ],
    'ts/no-misused-promises': [
      'error',
      {
        checksVoidReturn: false,
      },
    ],
  },
  overrides: {},
} satisfies OptionsTypeAware;

function isParserOptions(opt: OptionsConfig['typescript']): opt is OptionsTypescriptParser {
  if (typeof opt !== 'object') return false;
  return 'parserOptions' in opt || 'filesTypeAware' in opt || 'ignoresTypeAware' in opt;
}

function mergeTypescriptConfigParser(opt: OptionsTypescriptParser): OptionsTypescriptParser {
  return {
    ...opt,
    overrides: {
      ...typescript.overrides,
      ...opt.overrides,
    },
  };
}

function mergeTypescriptConfig(opt: OptionsConfig['typescript']): OptionsConfig['typescript'] {
  if (opt === false) return false;
  if (opt === true || !opt) return typescript;
  if (isParserOptions(opt)) mergeTypescriptConfigParser(opt);
  return {
    ...typescript,
    ...opt,
    overrides: { ...typescript.overrides, ...opt.overrides },
    overridesTypeAware: { ...typescript.overridesTypeAware, ...('overridesTypeAware' in opt ? opt.overridesTypeAware : {}) },
  };
}

export function typescriptConfig(options?: EslintOptionsConfig): EslintOptionsConfig {
  const { typescript: _typescript, ..._options } = options ?? {};
  return testConfig({
    typescript: mergeTypescriptConfig(_typescript),
    ..._options,
  });
}

export async function defineTypescriptConfig(options?: EslintOptionsConfig, ...userConfigs: UserConfig[]): Promise<EslintConfig> {
  return defineTestConfig(typescriptConfig(options), ...userConfigs);
}
