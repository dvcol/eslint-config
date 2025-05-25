import type { OptionsConfig, OptionsOverrides } from '@antfu/eslint-config';

import type { EslintConfig, EslintOptionsConfig, UserConfig } from './base.config';

import { defineTypescriptConfig, typescriptConfig } from './typescript.config';

export const svelte = {
  overrides: {
    'svelte/html-quotes': [
      'error',
      {
        prefer: 'double',
      },
    ],

    // eslint-plugin-svelte recommended rules
    'svelte/infinite-reactive-loop': 'error',
    'svelte/no-dom-manipulating': 'error',
    'svelte/no-dupe-on-directives': 'error',
    'svelte/no-immutable-reactive-statements': 'error',
    'svelte/no-inspect': 'warn',
    'svelte/no-raw-special-elements': 'error',
    'svelte/no-reactive-reassign': 'error',
    'svelte/no-store-async': 'error',
    'svelte/no-svelte-internal': 'error',
    'svelte/no-unnecessary-state-wrap': 'error',
    'svelte/no-unused-props': 'error',
    'svelte/no-useless-children-snippet': 'error',
    'svelte/require-each-key': 'warn',
    'svelte/require-event-dispatcher-types': 'error',
    'svelte/require-store-reactive-access': 'error',
    'svelte/valid-prop-names-in-kit-pages': 'error',

    // Stylistic
    'svelte/shorthand-attribute': 'error',
    'svelte/shorthand-directive': 'error',
    'svelte/first-attribute-linebreak': 'error',
    'svelte/html-closing-bracket-new-line': 'error',
    'svelte/html-self-closing': 'error',
  },
} satisfies OptionsOverrides;

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
      vue: false,
      react: false,
      solid: false,
      ..._options,
    },
  );
}

export async function defineSvelteConfig(options?: EslintOptionsConfig, ...userConfigs: UserConfig[]): Promise<EslintConfig> {
  return defineTypescriptConfig(svelteConfig(options), ...userConfigs);
}
