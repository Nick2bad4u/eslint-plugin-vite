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
| Rule                                                                                                              | Fix |
| :---------------------------------------------------------------------------------------------------------------- | :-: |
| [`vite/config-require-define-config`](../config-require-define-config.md)                                         |  —  |
| [`vite/no-mixed-test-and-bench-apis`](../no-mixed-test-and-bench-apis.md)                                         |  —  |
| [`vite/prefer-define-project`](../prefer-define-project.md)                                                       |  —  |
| [`vite/workspace-unique-project-name`](../workspace-unique-project-name.md)                                       |  —  |
| [`vite/no-import-meta-env-in-config`](../no-import-meta-env-in-config.md)                                         |  —  |
| [`vite/require-inline-project-name`](../require-inline-project-name.md)                                           |  —  |
| [`vite/no-unsupported-project-options`](../no-unsupported-project-options.md)                                     |  —  |
| [`vite/no-disabled-vitest-typecheck`](../no-disabled-vitest-typecheck.md)                                         |  —  |
| [`vite/no-zero-vitest-timeout`](../no-zero-vitest-timeout.md)                                                     |  —  |
| [`vite/no-unsafe-vitest-flags`](../no-unsafe-vitest-flags.md)                                                     |  —  |
| [`vite/require-vitest-typecheck-tsconfig`](../require-vitest-typecheck-tsconfig.md)                               |  —  |
| [`vite/no-disabled-vitest-isolation`](../no-disabled-vitest-isolation.md)                                         |  —  |
| [`vite/no-zero-vitest-slow-test-threshold`](../no-zero-vitest-slow-test-threshold.md)                             |  —  |
| [`vite/no-pass-with-no-tests`](../no-pass-with-no-tests.md)                                                       |  —  |
| [`vite/no-vitest-globals`](../no-vitest-globals.md)                                                               |  —  |
| [`vite/no-empty-vitest-projects`](../no-empty-vitest-projects.md)                                                 |  —  |
| [`vite/no-empty-vitest-include`](../no-empty-vitest-include.md)                                                   |  —  |
| [`vite/no-empty-vitest-project-name`](../no-empty-vitest-project-name.md)                                         |  —  |
| [`vite/no-empty-vitest-exclude`](../no-empty-vitest-exclude.md)                                                   |  —  |
| [`vite/no-empty-vitest-coverage-include`](../no-empty-vitest-coverage-include.md)                                 |  —  |
| [`vite/no-empty-vitest-coverage-reporter`](../no-empty-vitest-coverage-reporter.md)                               |  —  |
| [`vite/no-empty-vitest-coverage-reports-directory`](../no-empty-vitest-coverage-reports-directory.md)             |  —  |
| [`vite/no-empty-vitest-project-exclude`](../no-empty-vitest-project-exclude.md)                                   |  —  |
| [`vite/no-mixed-defineworkspace-and-test-projects`](../no-mixed-defineworkspace-and-test-projects.md)             |  —  |
| [`vite/require-vitest-sequence-seed-when-shuffle`](../require-vitest-sequence-seed-when-shuffle.md)               |  —  |
| [`vite/no-vitest-watch-in-config`](../no-vitest-watch-in-config.md)                                               |  —  |
| [`vite/no-vitest-ui-in-config`](../no-vitest-ui-in-config.md)                                                     |  —  |
| [`vite/no-vitest-file-parallelism-disabled`](../no-vitest-file-parallelism-disabled.md)                           |  —  |
| [`vite/no-vitest-single-thread-pool-by-default`](../no-vitest-single-thread-pool-by-default.md)                   |  —  |
| [`vite/no-vitest-bail-and-retry-conflict`](../no-vitest-bail-and-retry-conflict.md)                               |  —  |
| [`vite/no-vitest-max-workers-zero`](../no-vitest-max-workers-zero.md)                                             |  —  |
| [`vite/no-vitest-min-workers-greater-than-max-workers`](../no-vitest-min-workers-greater-than-max-workers.md)     |  —  |
| [`vite/require-vitest-coverage-provider-when-enabled`](../require-vitest-coverage-provider-when-enabled.md)       |  —  |
| [`vite/require-vitest-coverage-reporter-when-enabled`](../require-vitest-coverage-reporter-when-enabled.md)       |  —  |
| [`vite/require-vitest-coverage-thresholds-when-enabled`](../require-vitest-coverage-thresholds-when-enabled.md)   |  —  |
| [`vite/no-vitest-coverage-enabled-false-with-thresholds`](../no-vitest-coverage-enabled-false-with-thresholds.md) |  —  |
| [`vite/no-vitest-coverage-all-false`](../no-vitest-coverage-all-false.md)                                         |  —  |
| [`vite/no-vitest-coverage-clean-false`](../no-vitest-coverage-clean-false.md)                                     |  —  |
| [`vite/no-vitest-coverage-skip-full-false-in-strict`](../no-vitest-coverage-skip-full-false-in-strict.md)         |  —  |
| [`vite/require-vitest-coverage-reports-directory`](../require-vitest-coverage-reports-directory.md)               |  —  |
| [`vite/no-vitest-coverage-reporter-text-only`](../no-vitest-coverage-reporter-text-only.md)                       |  —  |
| [`vite/no-vitest-coverage-temp-dir-in-repo-root`](../no-vitest-coverage-temp-dir-in-repo-root.md)                 |  —  |
| [`vite/require-vitest-mock-reset-policy`](../require-vitest-mock-reset-policy.md)                                 |  —  |
| [`vite/prefer-vitest-restore-mocks`](../prefer-vitest-restore-mocks.md)                                           |  —  |
| [`vite/no-vitest-unstub-globals-false`](../no-vitest-unstub-globals-false.md)                                     |  —  |
| [`vite/no-vitest-unstub-envs-false`](../no-vitest-unstub-envs-false.md)                                           |  —  |
| [`vite/no-vitest-env-leakage-combo`](../no-vitest-env-leakage-combo.md)                                           |  —  |
| [`vite/require-vitest-environment-match-globs`](../require-vitest-environment-match-globs.md)                     |  —  |
| [`vite/no-vitest-default-cache-dir-in-monorepo`](../no-vitest-default-cache-dir-in-monorepo.md)                   |  —  |
| [`vite/no-vitest-timeout-triplet-mismatch`](../no-vitest-timeout-triplet-mismatch.md)                             |  —  |
| [`vite/require-vitest-explicit-environment`](../require-vitest-explicit-environment.md)                           |  —  |
| [`vite/require-vitest-slow-test-threshold`](../require-vitest-slow-test-threshold.md)                             |  —  |
| [`vite/require-vitest-timeout-triplet`](../require-vitest-timeout-triplet.md)                                     |  —  |
<!-- end generated preset rules -->
