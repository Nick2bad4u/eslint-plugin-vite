# 🟡 Recommended

Use `vite.configs.recommended` when you want a practical default for most Vite repositories.

This preset focuses on low-false-positive mistakes that often become build errors, client runtime errors, or confusing Vitest workspace failures.

## Flat config

```ts
import vite from "@typpi/eslint-plugin-vite";

export default [vite.configs.recommended];
```

## When to use it

- your repo has one or more `vite.config.*` files
- your repo uses Vitest but does not need especially strict env-policy enforcement yet
- you want a sane baseline before adopting more focused presets

## Rules in this preset

<!-- begin generated preset rules -->
| Rule                                                                                | Fix |
| :---------------------------------------------------------------------------------- | :-: |
| [`vite/config-require-define-config`](../config-require-define-config.md)           |  —  |
| [`vite/import-meta-glob-literal`](../import-meta-glob-literal.md)                   |  —  |
| [`vite/no-dynamic-import-meta-env-access`](../no-dynamic-import-meta-env-access.md) |  —  |
| [`vite/no-empty-env-prefix`](../no-empty-env-prefix.md)                             |  —  |
| [`vite/no-mixed-test-and-bench-apis`](../no-mixed-test-and-bench-apis.md)           |  —  |
| [`vite/no-relative-resolve-alias`](../no-relative-resolve-alias.md)                 |  —  |
| [`vite/workspace-unique-project-name`](../workspace-unique-project-name.md)         |  —  |
| [`vite/no-import-meta-env-in-config`](../no-import-meta-env-in-config.md)           |  —  |
| [`vite/require-inline-project-name`](../require-inline-project-name.md)             |  —  |
| [`vite/no-unsupported-project-options`](../no-unsupported-project-options.md)       |  —  |
<!-- end generated preset rules -->
