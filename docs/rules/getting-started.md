---
title: Getting started
description: Install and configure eslint-plugin-vite with modern flat config.
---

# Getting started

`eslint-plugin-vite` is a flat-config-first ESLint plugin for catching Vite and Vitest configuration mistakes before they become runtime or build failures.

## Installation

```sh
npm install --save-dev eslint-plugin-vite eslint
```

If your repository already uses Vite or Vitest, you do not need to change how those tools run just to adopt this plugin.

## Quick start

```ts
import vite from "eslint-plugin-vite";

export default [vite.configs.recommended];
```

That preset already configures `@typescript-eslint/parser` for the files it targets.

## Common compositions

### Vite app with client-side env and glob usage

```ts
import vite from "eslint-plugin-vite";

export default [vite.configs.recommended, vite.configs.client];
```

### Vitest monorepo with workspaces

```ts
import vite from "eslint-plugin-vite";

export default [vite.configs.recommended, vite.configs.vitest];
```

### Repository with dedicated benchmark files

```ts
import vite from "eslint-plugin-vite";

export default [vite.configs.recommended, vite.configs.vitest-bench];
```

### Stricter rollout after the baseline is clean

```ts
import vite from "eslint-plugin-vite";

export default [vite.configs.strict];
```

## Choosing a preset

- [`recommended`](./presets/recommended.md): best default starting point
- [`strict`](./presets/strict.md): adds stricter env and workspace guidance
- [`configs`](./presets/configs.md): focused only on config files
- [`client`](./presets/client.md): focused on `import.meta.env` and `import.meta.glob`
- [`vitest`](./presets/vitest.md): focused on Vitest config and workspaces
- [`vitest-bench`](./presets/vitest-bench.md): focused on benchmark file hygiene

## Next steps

- Read the [overview](./overview.md).
- Review the [preset selection strategy](./guides/preset-selection-strategy.md).
- Open the individual rule docs for the parts of Vite or Vitest your repository uses most.

## Further reading

- [Vite config reference](https://vite.dev/config/)
- [Vite shared options](https://vite.dev/config/shared-options)
- [Vitest config reference](https://vitest.dev/config/)