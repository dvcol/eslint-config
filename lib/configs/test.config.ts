import type { Linter } from 'eslint';

import { GLOB_TESTS } from '@antfu/eslint-config';

export const test: Linter.Config = {
  files: GLOB_TESTS,
  rules: {
    'ts/unbound-method': 'off', // Remove when vitest rule is implemented @see https://github.com/vitest-dev/eslint-plugin-vitest/issues/591
  },
};

function toArray<T = string>(value?: T | T[]): T[] {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

export function testConfig(config?: Linter.Config): Linter.Config {
  const { files, rules, ..._config } = config ?? {};
  return {
    files: [
      ...toArray(test.files),
      ...toArray(files),
    ].filter(Boolean),
    rules: {
      ...test.rules,
      ...rules,
    },
    ..._config,
  };
}
