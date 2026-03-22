# vitest

Use `vite.configs.vitest` when your repository uses Vitest configuration files, workspaces, or multi-project setups.

This preset is especially useful in monorepos and browser-plus-node test setups.

## Flat config

```ts
import vite from "eslint-plugin-vite";

export default [vite.configs.recommended, vite.configs.vitest];
```

## When to use it

- you use `vitest.config.*`
- you use `vitest.workspace.*`
- you want guardrails around project naming and helper usage in workspaces

## Rules in this preset

<!-- begin generated preset rules -->
| Rule                                                                                                  | Fix |
| :---------------------------------------------------------------------------------------------------- | :-: |
| [`vite/config-require-define-config`](../config-require-define-config.md)                             |  —  |
| [`vite/no-mixed-test-and-bench-apis`](../no-mixed-test-and-bench-apis.md)                             |  —  |
| [`vite/prefer-define-project`](../prefer-define-project.md)                                           |  —  |
| [`vite/workspace-unique-project-name`](../workspace-unique-project-name.md)                           |  —  |
| [`vite/no-import-meta-env-in-config`](../no-import-meta-env-in-config.md)                             |  —  |
| [`vite/require-inline-project-name`](../require-inline-project-name.md)                               |  —  |
| [`vite/no-unsupported-project-options`](../no-unsupported-project-options.md)                         |  —  |
| [`vite/no-disabled-vitest-typecheck`](../no-disabled-vitest-typecheck.md)                             |  —  |
| [`vite/no-zero-vitest-timeout`](../no-zero-vitest-timeout.md)                                         |  —  |
| [`vite/no-unsafe-vitest-flags`](../no-unsafe-vitest-flags.md)                                         |  —  |
| [`vite/require-vitest-typecheck-tsconfig`](../require-vitest-typecheck-tsconfig.md)                   |  —  |
| [`vite/no-disabled-vitest-isolation`](../no-disabled-vitest-isolation.md)                             |  —  |
| [`vite/no-zero-vitest-slow-test-threshold`](../no-zero-vitest-slow-test-threshold.md)                 |  —  |
| [`vite/no-pass-with-no-tests`](../no-pass-with-no-tests.md)                                           |  —  |
| [`vite/no-vitest-globals`](../no-vitest-globals.md)                                                   |  —  |
| [`vite/no-empty-vitest-projects`](../no-empty-vitest-projects.md)                                     |  —  |
| [`vite/no-empty-vitest-include`](../no-empty-vitest-include.md)                                       |  —  |
| [`vite/no-empty-vitest-project-name`](../no-empty-vitest-project-name.md)                             |  —  |
| [`vite/no-empty-vitest-exclude`](../no-empty-vitest-exclude.md)                                       |  —  |
| [`vite/no-empty-vitest-coverage-include`](../no-empty-vitest-coverage-include.md)                     |  —  |
| [`vite/no-empty-vitest-coverage-reporter`](../no-empty-vitest-coverage-reporter.md)                   |  —  |
| [`vite/no-empty-vitest-coverage-reports-directory`](../no-empty-vitest-coverage-reports-directory.md) |  —  |
| [`vite/no-empty-vitest-project-exclude`](../no-empty-vitest-project-exclude.md)                       |  —  |
| [`vite/no-mixed-defineworkspace-and-test-projects`](../no-mixed-defineworkspace-and-test-projects.md) |  —  |
| [`vite/require-vitest-sequence-seed-when-shuffle`](../require-vitest-sequence-seed-when-shuffle.md)   |  —  |
| [`vite/no-vitest-watch-in-config`](../no-vitest-watch-in-config.md)                                   |  —  |
| [`vite/no-vitest-ui-in-config`](../no-vitest-ui-in-config.md)                                         |  —  |
| [`vite/no-vitest-file-parallelism-disabled`](../no-vitest-file-parallelism-disabled.md)               |  —  |
<!-- end generated preset rules -->
