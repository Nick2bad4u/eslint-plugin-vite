# eslint-plugin-vite

ESLint rules for Vite, Vitest, and Vitest bench configuration and runtime patterns.

[![npm license.](https://flat.badgen.net/npm/license/@typpi/eslint-plugin-vite?color=purple)](https://github.com/Nick2bad4u/eslint-plugin-vite/blob/main/LICENSE) [![npm total downloads.](https://flat.badgen.net/npm/dt/@typpi/eslint-plugin-vite?color=pink)](https://www.npmjs.com/package/@typpi/eslint-plugin-vite) [![latest GitHub release.](https://flat.badgen.net/github/release/Nick2bad4u/eslint-plugin-vite?color=cyan)](https://github.com/Nick2bad4u/eslint-plugin-vite/releases) [![GitHub stars.](https://flat.badgen.net/github/stars/Nick2bad4u/eslint-plugin-vite?color=yellow)](https://github.com/Nick2bad4u/eslint-plugin-vite/stargazers) [![GitHub forks.](https://flat.badgen.net/github/forks/Nick2bad4u/eslint-plugin-vite?color=green)](https://github.com/Nick2bad4u/eslint-plugin-vite/forks) [![GitHub open issues.](https://flat.badgen.net/github/open-issues/Nick2bad4u/eslint-plugin-vite?color=red)](https://github.com/Nick2bad4u/eslint-plugin-vite/issues) [![codecov.](https://flat.badgen.net/codecov/github/Nick2bad4u/eslint-plugin-vite?color=blue)](https://codecov.io/gh/Nick2bad4u/eslint-plugin-vite) [![CI status.](https://img.shields.io/github/actions/workflow/status/Nick2bad4u/eslint-plugin-vite/ci.yml?branch=main\&style=flat-square\&label=CI\&color=teal)](https://github.com/Nick2bad4u/eslint-plugin-vite/actions/workflows/ci.yml)

## Why this plugin exists

Vite and Vitest both rely on static conventions that are easy to violate accidentally:

- config helpers such as `defineConfig(...)` and `defineWorkspace(...)`
- client-safe env access through `import.meta.env`
- static glob imports through `import.meta.glob(...)`
- workspace and benchmark structure in Vitest

`eslint-plugin-vite` turns those conventions into reviewable lint rules.

## Installation

```sh
npm install --save-dev @typpi/eslint-plugin-vite eslint
```

## Quick start

```ts
import vite from "@typpi/eslint-plugin-vite";

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
import vite from "@typpi/eslint-plugin-vite";

export default [vite.configs.recommended, vite.configs.client];
```

### Vitest workspaces in a monorepo

```ts
import vite from "@typpi/eslint-plugin-vite";

export default [vite.configs.recommended, vite.configs.vitest];
```

### Dedicated benchmark suites

```ts
import vite from "@typpi/eslint-plugin-vite";

export default [vite.configs.recommended, vite.configs["vitest-bench"]];
```

## Documentation

- [Rule overview](./docs/rules/overview.md)
- [Getting started](./docs/rules/getting-started.md)
- [Preset reference](./docs/rules/presets/index.md)
- [📝 Adoption checklist](./docs/rules/guides/adoption-checklist.md)

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
  - [📚](./docs/rules/presets/vitepress.md) — [`vite.configs.vitepress`](./docs/rules/presets/vitepress.md)
  - [🧪](./docs/rules/presets/vitest.md) — [`vite.configs.vitest`](./docs/rules/presets/vitest.md)
  - [👟](./docs/rules/presets/vitest-bench.md) — [`vite.configs["vitest-bench"]`](./docs/rules/presets/vitest-bench.md)

| Rule                                                                                                                         | Fix | Preset key                                                                                                                                                                                                                          |
| :--------------------------------------------------------------------------------------------------------------------------- | :-: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|  [`vite/config-require-define-config`](./docs/rules/config-require-define-config.md)                                         |  —  | [🟡](./docs/rules/presets/recommended.md) [🔴](./docs/rules/presets/strict.md) [🟣](./docs/rules/presets/all.md) [⚙️](./docs/rules/presets/configs.md) [📚](./docs/rules/presets/vitepress.md) [🧪](./docs/rules/presets/vitest.md) |
|  [`vite/import-meta-glob-literal`](./docs/rules/import-meta-glob-literal.md)                                                 |  —  | [🟡](./docs/rules/presets/recommended.md) [🔴](./docs/rules/presets/strict.md) [🟣](./docs/rules/presets/all.md) [🌐](./docs/rules/presets/client.md) [📚](./docs/rules/presets/vitepress.md)                                       |
|  [`vite/no-dynamic-import-meta-env-access`](./docs/rules/no-dynamic-import-meta-env-access.md)                               |  —  | [🟡](./docs/rules/presets/recommended.md) [🔴](./docs/rules/presets/strict.md) [🟣](./docs/rules/presets/all.md) [🌐](./docs/rules/presets/client.md) [📚](./docs/rules/presets/vitepress.md)                                       |
|  [`vite/no-empty-env-prefix`](./docs/rules/no-empty-env-prefix.md)                                                           |  —  | [🟡](./docs/rules/presets/recommended.md) [🔴](./docs/rules/presets/strict.md) [🟣](./docs/rules/presets/all.md) [⚙️](./docs/rules/presets/configs.md) [📚](./docs/rules/presets/vitepress.md)                                      |
|  [`vite/no-mixed-test-and-bench-apis`](./docs/rules/no-mixed-test-and-bench-apis.md)                                         |  —  | [🟡](./docs/rules/presets/recommended.md) [🔴](./docs/rules/presets/strict.md) [🟣](./docs/rules/presets/all.md) [🧪](./docs/rules/presets/vitest.md) [👟](./docs/rules/presets/vitest-bench.md)                                    |
|  [`vite/no-relative-resolve-alias`](./docs/rules/no-relative-resolve-alias.md)                                               |  —  | [🟡](./docs/rules/presets/recommended.md) [🔴](./docs/rules/presets/strict.md) [🟣](./docs/rules/presets/all.md) [⚙️](./docs/rules/presets/configs.md)                                                                              |
|  [`vite/no-restricted-import-meta-env`](./docs/rules/no-restricted-import-meta-env.md)                                       |  —  | [🔴](./docs/rules/presets/strict.md) [🟣](./docs/rules/presets/all.md) [🌐](./docs/rules/presets/client.md) [📚](./docs/rules/presets/vitepress.md)                                                                                 |
|  [`vite/prefer-define-project`](./docs/rules/prefer-define-project.md)                                                       |  —  | [🔴](./docs/rules/presets/strict.md) [🟣](./docs/rules/presets/all.md) [🧪](./docs/rules/presets/vitest.md)                                                                                                                         |
|  [`vite/workspace-unique-project-name`](./docs/rules/workspace-unique-project-name.md)                                       |  —  | [🟡](./docs/rules/presets/recommended.md) [🔴](./docs/rules/presets/strict.md) [🟣](./docs/rules/presets/all.md) [🧪](./docs/rules/presets/vitest.md)                                                                               |
|  [`vite/no-deprecated-config-options`](./docs/rules/no-deprecated-config-options.md)                                         |  —  | [🔴](./docs/rules/presets/strict.md) [🟣](./docs/rules/presets/all.md) [⚙️](./docs/rules/presets/configs.md)                                                                                                                        |
|  [`vite/no-unsafe-server-options`](./docs/rules/no-unsafe-server-options.md)                                                 |  —  | [🔴](./docs/rules/presets/strict.md) [🟣](./docs/rules/presets/all.md) [⚙️](./docs/rules/presets/configs.md)                                                                                                                        |
|  [`vite/no-import-meta-env-in-config`](./docs/rules/no-import-meta-env-in-config.md)                                         |  —  | [🟡](./docs/rules/presets/recommended.md) [🔴](./docs/rules/presets/strict.md) [🟣](./docs/rules/presets/all.md) [⚙️](./docs/rules/presets/configs.md) [📚](./docs/rules/presets/vitepress.md) [🧪](./docs/rules/presets/vitest.md) |
|  [`vite/no-implicit-config-flags`](./docs/rules/no-implicit-config-flags.md)                                                 |  —  | [🔴](./docs/rules/presets/strict.md) [🟣](./docs/rules/presets/all.md) [⚙️](./docs/rules/presets/configs.md)                                                                                                                        |
|  [`vite/require-inline-project-name`](./docs/rules/require-inline-project-name.md)                                           |  —  | [🟡](./docs/rules/presets/recommended.md) [🔴](./docs/rules/presets/strict.md) [🟣](./docs/rules/presets/all.md) [🧪](./docs/rules/presets/vitest.md)                                                                               |
|  [`vite/no-unsupported-project-options`](./docs/rules/no-unsupported-project-options.md)                                     |  —  | [🟡](./docs/rules/presets/recommended.md) [🔴](./docs/rules/presets/strict.md) [🟣](./docs/rules/presets/all.md) [🧪](./docs/rules/presets/vitest.md)                                                                               |
|  [`vite/no-disabled-vitest-typecheck`](./docs/rules/no-disabled-vitest-typecheck.md)                                         |  —  | [🔴](./docs/rules/presets/strict.md) [🟣](./docs/rules/presets/all.md) [⚙️](./docs/rules/presets/configs.md) [🧪](./docs/rules/presets/vitest.md)                                                                                   |
|  [`vite/no-zero-vitest-timeout`](./docs/rules/no-zero-vitest-timeout.md)                                                     |  —  | [🔴](./docs/rules/presets/strict.md) [🟣](./docs/rules/presets/all.md) [⚙️](./docs/rules/presets/configs.md) [🧪](./docs/rules/presets/vitest.md)                                                                                   |
|  [`vite/no-unsafe-vitest-flags`](./docs/rules/no-unsafe-vitest-flags.md)                                                     |  —  | [🔴](./docs/rules/presets/strict.md) [🟣](./docs/rules/presets/all.md) [⚙️](./docs/rules/presets/configs.md) [🧪](./docs/rules/presets/vitest.md)                                                                                   |
|  [`vite/require-vitest-typecheck-tsconfig`](./docs/rules/require-vitest-typecheck-tsconfig.md)                               |  —  | [🔴](./docs/rules/presets/strict.md) [🟣](./docs/rules/presets/all.md) [⚙️](./docs/rules/presets/configs.md) [🧪](./docs/rules/presets/vitest.md)                                                                                   |
|  [`vite/no-disabled-vitest-isolation`](./docs/rules/no-disabled-vitest-isolation.md)                                         |  —  | [🔴](./docs/rules/presets/strict.md) [🟣](./docs/rules/presets/all.md) [⚙️](./docs/rules/presets/configs.md) [🧪](./docs/rules/presets/vitest.md)                                                                                   |
|  [`vite/no-zero-vitest-slow-test-threshold`](./docs/rules/no-zero-vitest-slow-test-threshold.md)                             |  —  | [🔴](./docs/rules/presets/strict.md) [🟣](./docs/rules/presets/all.md) [⚙️](./docs/rules/presets/configs.md) [🧪](./docs/rules/presets/vitest.md)                                                                                   |
|  [`vite/no-pass-with-no-tests`](./docs/rules/no-pass-with-no-tests.md)                                                       |  —  | [🔴](./docs/rules/presets/strict.md) [🟣](./docs/rules/presets/all.md) [⚙️](./docs/rules/presets/configs.md) [🧪](./docs/rules/presets/vitest.md)                                                                                   |
|  [`vite/no-vitest-globals`](./docs/rules/no-vitest-globals.md)                                                               |  —  | [🔴](./docs/rules/presets/strict.md) [🟣](./docs/rules/presets/all.md) [⚙️](./docs/rules/presets/configs.md) [🧪](./docs/rules/presets/vitest.md)                                                                                   |
|  [`vite/no-empty-vitest-projects`](./docs/rules/no-empty-vitest-projects.md)                                                 |  —  | [🔴](./docs/rules/presets/strict.md) [🟣](./docs/rules/presets/all.md) [⚙️](./docs/rules/presets/configs.md) [🧪](./docs/rules/presets/vitest.md)                                                                                   |
|  [`vite/no-empty-vitest-include`](./docs/rules/no-empty-vitest-include.md)                                                   |  —  | [🔴](./docs/rules/presets/strict.md) [🟣](./docs/rules/presets/all.md) [⚙️](./docs/rules/presets/configs.md) [🧪](./docs/rules/presets/vitest.md)                                                                                   |
|  [`vite/no-empty-vitest-project-name`](./docs/rules/no-empty-vitest-project-name.md)                                         |  —  | [🔴](./docs/rules/presets/strict.md) [🟣](./docs/rules/presets/all.md) [⚙️](./docs/rules/presets/configs.md) [🧪](./docs/rules/presets/vitest.md)                                                                                   |
|  [`vite/no-empty-vitest-exclude`](./docs/rules/no-empty-vitest-exclude.md)                                                   |  —  | [🔴](./docs/rules/presets/strict.md) [🟣](./docs/rules/presets/all.md) [⚙️](./docs/rules/presets/configs.md) [🧪](./docs/rules/presets/vitest.md)                                                                                   |
|  [`vite/no-empty-vitest-bench-include`](./docs/rules/no-empty-vitest-bench-include.md)                                       |  —  | [🔴](./docs/rules/presets/strict.md) [🟣](./docs/rules/presets/all.md) [⚙️](./docs/rules/presets/configs.md) [👟](./docs/rules/presets/vitest-bench.md)                                                                             |
|  [`vite/no-empty-vitest-bench-exclude`](./docs/rules/no-empty-vitest-bench-exclude.md)                                       |  —  | [🔴](./docs/rules/presets/strict.md) [🟣](./docs/rules/presets/all.md) [⚙️](./docs/rules/presets/configs.md) [👟](./docs/rules/presets/vitest-bench.md)                                                                             |
|  [`vite/no-empty-vitest-coverage-include`](./docs/rules/no-empty-vitest-coverage-include.md)                                 |  —  | [🔴](./docs/rules/presets/strict.md) [🟣](./docs/rules/presets/all.md) [⚙️](./docs/rules/presets/configs.md) [🧪](./docs/rules/presets/vitest.md)                                                                                   |
|  [`vite/no-empty-vitest-coverage-reporter`](./docs/rules/no-empty-vitest-coverage-reporter.md)                               |  —  | [🔴](./docs/rules/presets/strict.md) [🟣](./docs/rules/presets/all.md) [⚙️](./docs/rules/presets/configs.md) [🧪](./docs/rules/presets/vitest.md)                                                                                   |
|  [`vite/no-empty-vitest-coverage-reports-directory`](./docs/rules/no-empty-vitest-coverage-reports-directory.md)             |  —  | [🔴](./docs/rules/presets/strict.md) [🟣](./docs/rules/presets/all.md) [⚙️](./docs/rules/presets/configs.md) [🧪](./docs/rules/presets/vitest.md)                                                                                   |
|  [`vite/no-empty-vitest-project-exclude`](./docs/rules/no-empty-vitest-project-exclude.md)                                   |  —  | [🔴](./docs/rules/presets/strict.md) [🟣](./docs/rules/presets/all.md) [⚙️](./docs/rules/presets/configs.md) [🧪](./docs/rules/presets/vitest.md)                                                                                   |
|  [`vite/no-mixed-defineworkspace-and-test-projects`](./docs/rules/no-mixed-defineworkspace-and-test-projects.md)             |  —  | [🔴](./docs/rules/presets/strict.md) [🟣](./docs/rules/presets/all.md) [⚙️](./docs/rules/presets/configs.md) [🧪](./docs/rules/presets/vitest.md)                                                                                   |
|  [`vite/require-vitest-sequence-seed-when-shuffle`](./docs/rules/require-vitest-sequence-seed-when-shuffle.md)               |  —  | [🔴](./docs/rules/presets/strict.md) [🟣](./docs/rules/presets/all.md) [⚙️](./docs/rules/presets/configs.md) [🧪](./docs/rules/presets/vitest.md)                                                                                   |
|  [`vite/no-vitest-watch-in-config`](./docs/rules/no-vitest-watch-in-config.md)                                               |  —  | [🔴](./docs/rules/presets/strict.md) [🟣](./docs/rules/presets/all.md) [⚙️](./docs/rules/presets/configs.md) [🧪](./docs/rules/presets/vitest.md)                                                                                   |
|  [`vite/no-vitest-ui-in-config`](./docs/rules/no-vitest-ui-in-config.md)                                                     |  —  | [🔴](./docs/rules/presets/strict.md) [🟣](./docs/rules/presets/all.md) [⚙️](./docs/rules/presets/configs.md) [🧪](./docs/rules/presets/vitest.md)                                                                                   |
|  [`vite/no-vitest-file-parallelism-disabled`](./docs/rules/no-vitest-file-parallelism-disabled.md)                           |  —  | [🔴](./docs/rules/presets/strict.md) [🟣](./docs/rules/presets/all.md) [⚙️](./docs/rules/presets/configs.md) [🧪](./docs/rules/presets/vitest.md)                                                                                   |
|  [`vite/no-vitest-single-thread-pool-by-default`](./docs/rules/no-vitest-single-thread-pool-by-default.md)                   |  —  | [🔴](./docs/rules/presets/strict.md) [🟣](./docs/rules/presets/all.md) [⚙️](./docs/rules/presets/configs.md) [🧪](./docs/rules/presets/vitest.md)                                                                                   |
|  [`vite/no-vitest-bail-and-retry-conflict`](./docs/rules/no-vitest-bail-and-retry-conflict.md)                               |  —  | [🔴](./docs/rules/presets/strict.md) [🟣](./docs/rules/presets/all.md) [⚙️](./docs/rules/presets/configs.md) [🧪](./docs/rules/presets/vitest.md)                                                                                   |
|  [`vite/no-vitest-max-workers-zero`](./docs/rules/no-vitest-max-workers-zero.md)                                             |  —  | [🔴](./docs/rules/presets/strict.md) [🟣](./docs/rules/presets/all.md) [⚙️](./docs/rules/presets/configs.md) [🧪](./docs/rules/presets/vitest.md)                                                                                   |
|  [`vite/no-vitest-min-workers-greater-than-max-workers`](./docs/rules/no-vitest-min-workers-greater-than-max-workers.md)     |  —  | [🔴](./docs/rules/presets/strict.md) [🟣](./docs/rules/presets/all.md) [⚙️](./docs/rules/presets/configs.md) [🧪](./docs/rules/presets/vitest.md)                                                                                   |
|  [`vite/require-vitest-coverage-provider-when-enabled`](./docs/rules/require-vitest-coverage-provider-when-enabled.md)       |  —  | [🔴](./docs/rules/presets/strict.md) [🟣](./docs/rules/presets/all.md) [⚙️](./docs/rules/presets/configs.md) [🧪](./docs/rules/presets/vitest.md)                                                                                   |
|  [`vite/require-vitest-coverage-reporter-when-enabled`](./docs/rules/require-vitest-coverage-reporter-when-enabled.md)       |  —  | [🔴](./docs/rules/presets/strict.md) [🟣](./docs/rules/presets/all.md) [⚙️](./docs/rules/presets/configs.md) [🧪](./docs/rules/presets/vitest.md)                                                                                   |
|  [`vite/require-vitest-coverage-thresholds-when-enabled`](./docs/rules/require-vitest-coverage-thresholds-when-enabled.md)   |  —  | [🔴](./docs/rules/presets/strict.md) [🟣](./docs/rules/presets/all.md) [⚙️](./docs/rules/presets/configs.md) [🧪](./docs/rules/presets/vitest.md)                                                                                   |
|  [`vite/no-vitest-coverage-enabled-false-with-thresholds`](./docs/rules/no-vitest-coverage-enabled-false-with-thresholds.md) |  —  | [🔴](./docs/rules/presets/strict.md) [🟣](./docs/rules/presets/all.md) [⚙️](./docs/rules/presets/configs.md) [🧪](./docs/rules/presets/vitest.md)                                                                                   |
|  [`vite/no-vitest-coverage-all-false`](./docs/rules/no-vitest-coverage-all-false.md)                                         |  —  | [🔴](./docs/rules/presets/strict.md) [🟣](./docs/rules/presets/all.md) [⚙️](./docs/rules/presets/configs.md) [🧪](./docs/rules/presets/vitest.md)                                                                                   |
|  [`vite/no-vitest-coverage-clean-false`](./docs/rules/no-vitest-coverage-clean-false.md)                                     |  —  | [🔴](./docs/rules/presets/strict.md) [🟣](./docs/rules/presets/all.md) [⚙️](./docs/rules/presets/configs.md) [🧪](./docs/rules/presets/vitest.md)                                                                                   |
|  [`vite/no-vitest-coverage-skip-full-false-in-strict`](./docs/rules/no-vitest-coverage-skip-full-false-in-strict.md)         |  —  | [🔴](./docs/rules/presets/strict.md) [🟣](./docs/rules/presets/all.md) [⚙️](./docs/rules/presets/configs.md) [🧪](./docs/rules/presets/vitest.md)                                                                                   |
|  [`vite/require-vitest-coverage-reports-directory`](./docs/rules/require-vitest-coverage-reports-directory.md)               |  —  | [🔴](./docs/rules/presets/strict.md) [🟣](./docs/rules/presets/all.md) [⚙️](./docs/rules/presets/configs.md) [🧪](./docs/rules/presets/vitest.md)                                                                                   |
|  [`vite/no-vitest-coverage-reporter-text-only`](./docs/rules/no-vitest-coverage-reporter-text-only.md)                       |  —  | [🔴](./docs/rules/presets/strict.md) [🟣](./docs/rules/presets/all.md) [⚙️](./docs/rules/presets/configs.md) [🧪](./docs/rules/presets/vitest.md)                                                                                   |
|  [`vite/no-vitest-coverage-temp-dir-in-repo-root`](./docs/rules/no-vitest-coverage-temp-dir-in-repo-root.md)                 |  —  | [🔴](./docs/rules/presets/strict.md) [🟣](./docs/rules/presets/all.md) [⚙️](./docs/rules/presets/configs.md) [🧪](./docs/rules/presets/vitest.md)                                                                                   |
|  [`vite/require-vitest-mock-reset-policy`](./docs/rules/require-vitest-mock-reset-policy.md)                                 |  —  | [🔴](./docs/rules/presets/strict.md) [🟣](./docs/rules/presets/all.md) [⚙️](./docs/rules/presets/configs.md) [🧪](./docs/rules/presets/vitest.md)                                                                                   |
|  [`vite/prefer-vitest-restore-mocks`](./docs/rules/prefer-vitest-restore-mocks.md)                                           |  —  | [🔴](./docs/rules/presets/strict.md) [🟣](./docs/rules/presets/all.md) [⚙️](./docs/rules/presets/configs.md) [🧪](./docs/rules/presets/vitest.md)                                                                                   |
|  [`vite/no-vitest-unstub-globals-false`](./docs/rules/no-vitest-unstub-globals-false.md)                                     |  —  | [🔴](./docs/rules/presets/strict.md) [🟣](./docs/rules/presets/all.md) [⚙️](./docs/rules/presets/configs.md) [🧪](./docs/rules/presets/vitest.md)                                                                                   |
|  [`vite/no-vitest-unstub-envs-false`](./docs/rules/no-vitest-unstub-envs-false.md)                                           |  —  | [🔴](./docs/rules/presets/strict.md) [🟣](./docs/rules/presets/all.md) [⚙️](./docs/rules/presets/configs.md) [🧪](./docs/rules/presets/vitest.md)                                                                                   |
|  [`vite/no-vitest-env-leakage-combo`](./docs/rules/no-vitest-env-leakage-combo.md)                                           |  —  | [🔴](./docs/rules/presets/strict.md) [🟣](./docs/rules/presets/all.md) [⚙️](./docs/rules/presets/configs.md) [🧪](./docs/rules/presets/vitest.md)                                                                                   |
|  [`vite/require-vitest-environment-match-globs`](./docs/rules/require-vitest-environment-match-globs.md)                     |  —  | [🔴](./docs/rules/presets/strict.md) [🟣](./docs/rules/presets/all.md) [⚙️](./docs/rules/presets/configs.md) [🧪](./docs/rules/presets/vitest.md)                                                                                   |
|  [`vite/no-empty-optimize-deps-include`](./docs/rules/no-empty-optimize-deps-include.md)                                     |  —  | [🔴](./docs/rules/presets/strict.md) [🟣](./docs/rules/presets/all.md) [⚙️](./docs/rules/presets/configs.md)                                                                                                                        |
|  [`vite/no-empty-optimize-deps-exclude`](./docs/rules/no-empty-optimize-deps-exclude.md)                                     |  —  | [🔴](./docs/rules/presets/strict.md) [🟣](./docs/rules/presets/all.md) [⚙️](./docs/rules/presets/configs.md)                                                                                                                        |
|  [`vite/no-empty-ssr-noexternal`](./docs/rules/no-empty-ssr-noexternal.md)                                                   |  —  | [🔴](./docs/rules/presets/strict.md) [🟣](./docs/rules/presets/all.md) [⚙️](./docs/rules/presets/configs.md)                                                                                                                        |
|  [`vite/no-empty-ssr-external`](./docs/rules/no-empty-ssr-external.md)                                                       |  —  | [🔴](./docs/rules/presets/strict.md) [🟣](./docs/rules/presets/all.md) [⚙️](./docs/rules/presets/configs.md)                                                                                                                        |
|  [`vite/no-empty-worker-plugins`](./docs/rules/no-empty-worker-plugins.md)                                                   |  —  | [🔴](./docs/rules/presets/strict.md) [🟣](./docs/rules/presets/all.md) [⚙️](./docs/rules/presets/configs.md)                                                                                                                        |
|  [`vite/no-vitepress-empty-theme-config`](./docs/rules/no-vitepress-empty-theme-config.md)                                   |  —  | [🔴](./docs/rules/presets/strict.md) [🟣](./docs/rules/presets/all.md) [📚](./docs/rules/presets/vitepress.md)                                                                                                                      |
|  [`vite/no-vitepress-empty-head`](./docs/rules/no-vitepress-empty-head.md)                                                   |  —  | [🔴](./docs/rules/presets/strict.md) [🟣](./docs/rules/presets/all.md) [📚](./docs/rules/presets/vitepress.md)                                                                                                                      |
|  [`vite/require-vitepress-title-or-titletemplate`](./docs/rules/require-vitepress-title-or-titletemplate.md)                 |  —  | [🔴](./docs/rules/presets/strict.md) [🟣](./docs/rules/presets/all.md) [📚](./docs/rules/presets/vitepress.md)                                                                                                                      |
|  [`vite/require-vitepress-clean-urls-explicit`](./docs/rules/require-vitepress-clean-urls-explicit.md)                       |  —  | [🔴](./docs/rules/presets/strict.md) [🟣](./docs/rules/presets/all.md) [📚](./docs/rules/presets/vitepress.md)                                                                                                                      |
|  [`vite/no-vitest-default-cache-dir-in-monorepo`](./docs/rules/no-vitest-default-cache-dir-in-monorepo.md)                   |  —  | [🔴](./docs/rules/presets/strict.md) [🟣](./docs/rules/presets/all.md) [🧪](./docs/rules/presets/vitest.md) [👟](./docs/rules/presets/vitest-bench.md)                                                                              |
|  [`vite/no-vitest-timeout-triplet-mismatch`](./docs/rules/no-vitest-timeout-triplet-mismatch.md)                             |  —  | [🔴](./docs/rules/presets/strict.md) [🟣](./docs/rules/presets/all.md) [🧪](./docs/rules/presets/vitest.md) [👟](./docs/rules/presets/vitest-bench.md)                                                                              |
|  [`vite/require-vitest-explicit-environment`](./docs/rules/require-vitest-explicit-environment.md)                           |  —  | [🔴](./docs/rules/presets/strict.md) [🟣](./docs/rules/presets/all.md) [🧪](./docs/rules/presets/vitest.md) [👟](./docs/rules/presets/vitest-bench.md)                                                                              |
|  [`vite/require-vitest-slow-test-threshold`](./docs/rules/require-vitest-slow-test-threshold.md)                             |  —  | [🔴](./docs/rules/presets/strict.md) [🟣](./docs/rules/presets/all.md) [🧪](./docs/rules/presets/vitest.md) [👟](./docs/rules/presets/vitest-bench.md)                                                                              |
|  [`vite/require-vitest-timeout-triplet`](./docs/rules/require-vitest-timeout-triplet.md)                                     |  —  | [🔴](./docs/rules/presets/strict.md) [🟣](./docs/rules/presets/all.md) [🧪](./docs/rules/presets/vitest.md) [👟](./docs/rules/presets/vitest-bench.md)                                                                              |
<!-- end generated rules table -->

## Scope notes

- This plugin is flat-config-first.
- Current rules do not require type-aware ESLint setup.
- The focus is Vite and Vitest behavior, not framework-specific UI rules.

## License

MIT
