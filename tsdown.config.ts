import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: ['lib/index.ts'],
  dts: true,
  exports: true,
  format: ['esm'],
  tsconfig: 'tsconfig.lib.json',
});
