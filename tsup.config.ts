import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['lib/index.ts'],
  dts: true,
  format: ['esm'],
  tsconfig: 'tsconfig.lib.json',
});
