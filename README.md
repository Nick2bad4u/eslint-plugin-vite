# eslint-plugin-vite

ESLint rules for Vite, Vitest, and Vitest bench configuration and runtime patterns.

[![npm version.](https://img.shields.io/npm/v/eslint-plugin-vite?logo=npm&label=npm)](https://www.npmjs.com/package/eslint-plugin-vite)
[![CI status.](https://img.shields.io/github/actions/workflow/status/Nick2bad4u/eslint-plugin-vite/ci.yml?branch=main&label=ci)](https://github.com/Nick2bad4u/eslint-plugin-vite/actions/workflows/ci.yml)

## Why this plugin exists

Vite and Vitest both rely on static conventions that are easy to violate accidentally:

- config helpers such as `defineConfig(...)` and `defineWorkspace(...)`
- client-safe env access through `import.meta.env`
- static glob imports through `import.meta.glob(...)`
- workspace and benchmark structure in Vitest

`eslint-plugin-vite` turns those conventions into reviewable lint rules.

## Installation

```sh
npm install --save-dev eslint-plugin-vite eslint
```

## Quick start

```ts
import vite from "eslint-plugin-vite";

export default [vite.configs.recommended];
```

## Available presets

- `vite.configs.recommended`
- `vite.configs.strict`
- `vite.configs.all`
- `vite.configs.configs`
- `vite.configs.client`
- `vite.configs.vitest`
- `vite.configs["vitest-bench"]`

## Common compositions

### App code that uses `import.meta.env` and `import.meta.glob`

```ts
import vite from "eslint-plugin-vite";

export default [vite.configs.recommended, vite.configs.client];
```

### Vitest workspaces in a monorepo

```ts
import vite from "eslint-plugin-vite";

export default [vite.configs.recommended, vite.configs.vitest];
```

### Dedicated benchmark suites

```ts
import vite from "eslint-plugin-vite";

export default [vite.configs.recommended, vite.configs["vitest-bench"]];
```

## Documentation

- [Rule overview](./docs/rules/overview.md)
- [Getting started](./docs/rules/getting-started.md)
- [Preset reference](./docs/rules/presets/index.md)
- [Adoption checklist](./docs/rules/guides/adoption-checklist.md)

## Rules

<!-- begin generated rules table -->
- `Fix` legend:
  - `🔧` = autofixable
  - `💡` = suggestions available
  - `—` = report only
- `Preset key` legend:
  - [🟡](./docs/rules/presets/recommended.md) — [`vite.configs.recommended`](./docs/rules/presets/recommended.md)
  - [🔴](./docs/rules/presets/strict.md) — [`vite.configs.strict`](./docs/rules/presets/strict.md)
  - [🟣](./docs/rules/presets/all.md) — [`vite.configs.all`](./docs/rules/presets/all.md)
  - [⚙️](./docs/rules/presets/configs.md) — [`vite.configs.configs`](./docs/rules/presets/configs.md)
  - [🌐](./docs/rules/presets/client.md) — [`vite.configs.client`](./docs/rules/presets/client.md)
  - [🧪](./docs/rules/presets/vitest.md) — [`vite.configs.vitest`](./docs/rules/presets/vitest.md)
  - [🏎️](./docs/rules/presets/vitest-bench.md) — [`vite.configs["vitest-bench"]`](./docs/rules/presets/vitest-bench.md)

| Rule | Fix | Preset key |
| --- | :-: | :-- |
| [`vite/config-require-define-config`](./docs/rules/config-require-define-config.md) | — | [🟡](./docs/rules/presets/recommended.md) [🔴](./docs/rules/presets/strict.md) [🟣](./docs/rules/presets/all.md) [⚙️](./docs/rules/presets/configs.md) [🧪](./docs/rules/presets/vitest.md) |
| [`vite/import-meta-glob-literal`](./docs/rules/import-meta-glob-literal.md) | — | [🟡](./docs/rules/presets/recommended.md) [🔴](./docs/rules/presets/strict.md) [🟣](./docs/rules/presets/all.md) [🌐](./docs/rules/presets/client.md) |
| [`vite/no-dynamic-import-meta-env-access`](./docs/rules/no-dynamic-import-meta-env-access.md) | — | [🟡](./docs/rules/presets/recommended.md) [🔴](./docs/rules/presets/strict.md) [🟣](./docs/rules/presets/all.md) [🌐](./docs/rules/presets/client.md) |
| [`vite/no-empty-env-prefix`](./docs/rules/no-empty-env-prefix.md) | — | [🟡](./docs/rules/presets/recommended.md) [🔴](./docs/rules/presets/strict.md) [🟣](./docs/rules/presets/all.md) [⚙️](./docs/rules/presets/configs.md) |
| [`vite/no-mixed-test-and-bench-apis`](./docs/rules/no-mixed-test-and-bench-apis.md) | — | [🟡](./docs/rules/presets/recommended.md) [🔴](./docs/rules/presets/strict.md) [🟣](./docs/rules/presets/all.md) [🧪](./docs/rules/presets/vitest.md) [🏎️](./docs/rules/presets/vitest-bench.md) |
| [`vite/no-relative-resolve-alias`](./docs/rules/no-relative-resolve-alias.md) | — | [🟡](./docs/rules/presets/recommended.md) [🔴](./docs/rules/presets/strict.md) [🟣](./docs/rules/presets/all.md) [⚙️](./docs/rules/presets/configs.md) |
| [`vite/no-restricted-import-meta-env`](./docs/rules/no-restricted-import-meta-env.md) | — | [🔴](./docs/rules/presets/strict.md) [🟣](./docs/rules/presets/all.md) [🌐](./docs/rules/presets/client.md) |
| [`vite/prefer-define-project`](./docs/rules/prefer-define-project.md) | — | [🔴](./docs/rules/presets/strict.md) [🟣](./docs/rules/presets/all.md) [🧪](./docs/rules/presets/vitest.md) |
| [`vite/workspace-unique-project-name`](./docs/rules/workspace-unique-project-name.md) | — | [🟡](./docs/rules/presets/recommended.md) [🔴](./docs/rules/presets/strict.md) [🟣](./docs/rules/presets/all.md) [🧪](./docs/rules/presets/vitest.md) |
| [`vite/no-deprecated-config-options`](./docs/rules/no-deprecated-config-options.md) | — | [🔴](./docs/rules/presets/strict.md) [🟣](./docs/rules/presets/all.md) [⚙️](./docs/rules/presets/configs.md) |
| [`vite/no-unsafe-server-options`](./docs/rules/no-unsafe-server-options.md) | — | [🔴](./docs/rules/presets/strict.md) [🟣](./docs/rules/presets/all.md) [⚙️](./docs/rules/presets/configs.md) |
<!-- end generated rules table -->

## Scope notes

- This plugin is flat-config-first.
- Current rules do not require type-aware ESLint setup.
- The focus is Vite and Vitest behavior, not framework-specific UI rules.

## License

MIT

