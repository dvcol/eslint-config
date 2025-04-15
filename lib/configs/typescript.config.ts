import type { OptionsConfig, OptionsOverrides, OptionsTypeScriptParserOptions, OptionsTypeScriptWithTypes } from '@antfu/eslint-config';

import type { EslintConfig, EslintOptionsConfig, UserConfig } from './base.config';
import { baseConfig, defineBaseConfig } from './base.config';

export type OptionsTypeAware = OptionsTypeScriptWithTypes & OptionsOverrides;
export type OptionsTypescriptParser = OptionsTypeScriptParserOptions & OptionsOverrides;
export const typescript: OptionsTypeAware = {
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
};

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
  return baseConfig(
    {
      typescript: mergeTypescriptConfig(_typescript),
      ..._options,
    },
  );
}

export async function defineTypescriptConfig(options?: EslintOptionsConfig, ...userConfigs: UserConfig[]): Promise<EslintConfig> {
  return defineBaseConfig(typescriptConfig(options), ...userConfigs);
}
