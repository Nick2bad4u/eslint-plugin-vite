# all

Use `vite.configs.all` when you want every rule from `eslint-plugin-vite` enabled at once.

This preset is useful for template repositories, internal platforms, or teams that prefer to audit every new rule explicitly.

## Flat config

```ts
import vite from "eslint-plugin-vite";

export default [vite.configs.all];
```

## When to use it

- you maintain a platform repo or starter template
- you want the widest possible safety net
- you are comfortable turning off individual rules locally when needed

## Rules in this preset

<!-- begin generated preset rules -->
| Rule                                                                                  | Fix |
| :------------------------------------------------------------------------------------ | :-: |
| [`vite/config-require-define-config`](../config-require-define-config.md)             |  —  |
| [`vite/import-meta-glob-literal`](../import-meta-glob-literal.md)                     |  —  |
| [`vite/no-dynamic-import-meta-env-access`](../no-dynamic-import-meta-env-access.md)   |  —  |
| [`vite/no-empty-env-prefix`](../no-empty-env-prefix.md)                               |  —  |
| [`vite/no-mixed-test-and-bench-apis`](../no-mixed-test-and-bench-apis.md)             |  —  |
| [`vite/no-relative-resolve-alias`](../no-relative-resolve-alias.md)                   |  —  |
| [`vite/no-restricted-import-meta-env`](../no-restricted-import-meta-env.md)           |  —  |
| [`vite/prefer-define-project`](../prefer-define-project.md)                           |  —  |
| [`vite/workspace-unique-project-name`](../workspace-unique-project-name.md)           |  —  |
| [`vite/no-deprecated-config-options`](../no-deprecated-config-options.md)             |  —  |
| [`vite/no-unsafe-server-options`](../no-unsafe-server-options.md)                     |  —  |
| [`vite/no-import-meta-env-in-config`](../no-import-meta-env-in-config.md)             |  —  |
| [`vite/no-implicit-config-flags`](../no-implicit-config-flags.md)                     |  —  |
| [`vite/require-inline-project-name`](../require-inline-project-name.md)               |  —  |
| [`vite/no-unsupported-project-options`](../no-unsupported-project-options.md)         |  —  |
| [`vite/no-disabled-vitest-typecheck`](../no-disabled-vitest-typecheck.md)             |  —  |
| [`vite/no-zero-vitest-timeout`](../no-zero-vitest-timeout.md)                         |  —  |
| [`vite/no-unsafe-vitest-flags`](../no-unsafe-vitest-flags.md)                         |  —  |
| [`vite/require-vitest-typecheck-tsconfig`](../require-vitest-typecheck-tsconfig.md)   |  —  |
| [`vite/no-disabled-vitest-isolation`](../no-disabled-vitest-isolation.md)             |  —  |
| [`vite/no-zero-vitest-slow-test-threshold`](../no-zero-vitest-slow-test-threshold.md) |  —  |
| [`vite/no-pass-with-no-tests`](../no-pass-with-no-tests.md)                           |  —  |
| [`vite/no-vitest-globals`](../no-vitest-globals.md)                                   |  —  |
| [`vite/no-empty-vitest-projects`](../no-empty-vitest-projects.md)                     |  —  |
| [`vite/no-empty-vitest-include`](../no-empty-vitest-include.md)                       |  —  |
| [`vite/no-empty-vitest-project-name`](../no-empty-vitest-project-name.md)             |  —  |
<!-- end generated preset rules -->
