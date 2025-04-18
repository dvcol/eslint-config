import type { ESLint } from 'eslint';

import { version } from '../../package.json';
import progress from './progress';

const plugin = {
  meta: {
    name: 'dvcol',
    version,
  },
  // @keep-sorted
  rules: {
    [progress.name]: progress.rule,
  },
} satisfies ESLint.Plugin;

export default plugin;
