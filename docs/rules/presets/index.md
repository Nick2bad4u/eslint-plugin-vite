---
title: Presets
description: Preset reference and selection guide for eslint-plugin-vite.
---

# Presets

Use one of these presets based on where Vite or Vitest mistakes are most likely to happen in your repository.

- `Preset key` legend:
  - [🟡](https://nick2bad4u.github.io/eslint-plugin-vite/docs/rules/presets/recommended) — [`vite.configs.recommended`](https://nick2bad4u.github.io/eslint-plugin-vite/docs/rules/presets/recommended)
  - [🔴](https://nick2bad4u.github.io/eslint-plugin-vite/docs/rules/presets/strict) — [`vite.configs.strict`](https://nick2bad4u.github.io/eslint-plugin-vite/docs/rules/presets/strict)
  - [🟣](https://nick2bad4u.github.io/eslint-plugin-vite/docs/rules/presets/all) — [`vite.configs.all`](https://nick2bad4u.github.io/eslint-plugin-vite/docs/rules/presets/all)
  - [⚙️](https://nick2bad4u.github.io/eslint-plugin-vite/docs/rules/presets/configs) — [`vite.configs.configs`](https://nick2bad4u.github.io/eslint-plugin-vite/docs/rules/presets/configs)
  - [🌐](https://nick2bad4u.github.io/eslint-plugin-vite/docs/rules/presets/client) — [`vite.configs.client`](https://nick2bad4u.github.io/eslint-plugin-vite/docs/rules/presets/client)
  - [🧪](https://nick2bad4u.github.io/eslint-plugin-vite/docs/rules/presets/vitest) — [`vite.configs.vitest`](https://nick2bad4u.github.io/eslint-plugin-vite/docs/rules/presets/vitest)
  - [🏎️](https://nick2bad4u.github.io/eslint-plugin-vite/docs/rules/presets/vitest-bench) — [`vite.configs["vitest-bench"]`](https://nick2bad4u.github.io/eslint-plugin-vite/docs/rules/presets/vitest-bench)

Each preset page in this section includes:

- when to use it
- the exact flat-config key
- a copy/paste configuration example
- the exact rules wired by the preset

Related guides:

- [Preset selection strategy](../guides/preset-selection-strategy.md)
- [Adoption checklist](../guides/adoption-checklist.md)
- [Rollout and fix safety](../guides/rollout-and-fix-safety.md)

## Rule matrix

<!-- begin generated preset matrix -->
| Rule                                                                                | Fix | Preset key                                                                                         |
| :---------------------------------------------------------------------------------- | :-: | :------------------------------------------------------------------------------------------------- |
| [`vite/config-require-define-config`](../config-require-define-config.md)           |  —  | [🟡](./recommended.md) [🔴](./strict.md) [🟣](./all.md) [⚙️](./configs.md) [🧪](./vitest.md)       |
| [`vite/import-meta-glob-literal`](../import-meta-glob-literal.md)                   |  —  | [🟡](./recommended.md) [🔴](./strict.md) [🟣](./all.md) [🌐](./client.md)                          |
| [`vite/no-dynamic-import-meta-env-access`](../no-dynamic-import-meta-env-access.md) |  —  | [🟡](./recommended.md) [🔴](./strict.md) [🟣](./all.md) [🌐](./client.md)                          |
| [`vite/no-empty-env-prefix`](../no-empty-env-prefix.md)                             |  —  | [🟡](./recommended.md) [🔴](./strict.md) [🟣](./all.md) [⚙️](./configs.md)                         |
| [`vite/no-mixed-test-and-bench-apis`](../no-mixed-test-and-bench-apis.md)           |  —  | [🟡](./recommended.md) [🔴](./strict.md) [🟣](./all.md) [🧪](./vitest.md) [🏎️](./vitest-bench.md) |
| [`vite/no-relative-resolve-alias`](../no-relative-resolve-alias.md)                 |  —  | [🟡](./recommended.md) [🔴](./strict.md) [🟣](./all.md) [⚙️](./configs.md)                         |
| [`vite/no-restricted-import-meta-env`](../no-restricted-import-meta-env.md)         |  —  | [🔴](./strict.md) [🟣](./all.md) [🌐](./client.md)                                                 |
| [`vite/prefer-define-project`](../prefer-define-project.md)                         |  —  | [🔴](./strict.md) [🟣](./all.md) [🧪](./vitest.md)                                                 |
| [`vite/workspace-unique-project-name`](../workspace-unique-project-name.md)         |  —  | [🟡](./recommended.md) [🔴](./strict.md) [🟣](./all.md) [🧪](./vitest.md)                          |
| [`vite/no-deprecated-config-options`](../no-deprecated-config-options.md)           |  —  | [🔴](./strict.md) [🟣](./all.md) [⚙️](./configs.md)                                                |
| [`vite/no-unsafe-server-options`](../no-unsafe-server-options.md)                   |  —  | [🔴](./strict.md) [🟣](./all.md) [⚙️](./configs.md)                                                |
| [`vite/no-import-meta-env-in-config`](../no-import-meta-env-in-config.md)           |  —  | [🟡](./recommended.md) [🔴](./strict.md) [🟣](./all.md) [⚙️](./configs.md) [🧪](./vitest.md)       |
| [`vite/no-implicit-config-flags`](../no-implicit-config-flags.md)                   |  —  | [🔴](./strict.md) [🟣](./all.md) [⚙️](./configs.md)                                                |
| [`vite/require-inline-project-name`](../require-inline-project-name.md)             |  —  | [🟡](./recommended.md) [🔴](./strict.md) [🟣](./all.md) [🧪](./vitest.md)                          |
| [`vite/no-unsupported-project-options`](../no-unsupported-project-options.md)       |  —  | [🟡](./recommended.md) [🔴](./strict.md) [🟣](./all.md) [🧪](./vitest.md)                          |
<!-- end generated preset matrix -->
