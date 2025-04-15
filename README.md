# Eslint Config

Shared ESLint configuration for JavaScript and TypeScript projects.

## Installation

```bash
pnpm install --save-dev @dvcol/eslint-config
```

## Usage

Create a `eslint.config.js` file in the root of your project and extend the configuration:

```javascript
import { defineConfig } from '@dvcol/eslint-config';

export default defineConfig({
  // Your custom configuration
});
```
