import type { Linter } from 'eslint';

function toArray<T = string>(value?: T | T[]): T[] {
  if (value === undefined) return [];
  return Array.isArray(value) ? value : [value];
}

function mergeArray<T>(left?: T[], right?: T[]): T[] | undefined {
  if (left === undefined) return right;
  if (right === undefined) return left;
  return [...left, ...right];
}

function mergeObject<T>(left?: T, right?: T): T | undefined {
  if (left === undefined) return right;
  if (right === undefined) return left;
  return { ...left, ...right };
}

export function mergeConfig(left: Linter.Config = {}, right: Linter.Config): Linter.Config {
  const { files, ignores, languageOptions, linterOptions, plugins, rules, settings, ..._config } = left ?? {};
  return {
    ..._config,
    ...right,
    files: [
      ...toArray(files),
      ...toArray(right.files),
    ].filter(Boolean),
    ignores: mergeArray(ignores, right.ignores),
    languageOptions: mergeObject(languageOptions, right.languageOptions),
    linterOptions: mergeObject(linterOptions, right.linterOptions),
    plugins: mergeObject(plugins, right.plugins),
    rules: mergeObject(rules, right.rules),
    settings: mergeObject(settings, right.settings),
  };
}

export function mergeConfigs(config: Linter.Config = {}, ...configs: Linter.Config[]): Linter.Config {
  return configs.reduce((acc, cur) => mergeConfig(acc, cur), config);
}
