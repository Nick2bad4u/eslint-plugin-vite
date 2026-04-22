# 🟣 All

Use `vite.configs.all` when you want every rule from `eslint-plugin-vite` enabled at once.

This preset is useful for template repositories, internal platforms, or teams that prefer to audit every new rule explicitly.

## Flat config

```ts
import vite from "@typpi/eslint-plugin-vite";

export default [vite.configs.all];
```

## When to use it

- you maintain a platform repo or starter template
- you want the widest possible safety net
- you are comfortable turning off individual rules locally when needed

## Rules in this preset

{/*begin-generated-preset-rules*/}
| Rule                                                                                                              | Fix |
| :---------------------------------------------------------------------------------------------------------------- | :-: |
| [`vite/config-require-define-config`](../config-require-define-config.md)                                         |  —  |
| [`vite/import-meta-glob-literal`](../import-meta-glob-literal.md)                                                 |  —  |
| [`vite/no-dynamic-import-meta-env-access`](../no-dynamic-import-meta-env-access.md)                               |  —  |
| [`vite/no-empty-env-prefix`](../no-empty-env-prefix.md)                                                           |  —  |
| [`vite/no-mixed-test-and-bench-apis`](../no-mixed-test-and-bench-apis.md)                                         |  —  |
| [`vite/no-relative-resolve-alias`](../no-relative-resolve-alias.md)                                               |  —  |
| [`vite/no-restricted-import-meta-env`](../no-restricted-import-meta-env.md)                                       |  —  |
| [`vite/prefer-define-project`](../prefer-define-project.md)                                                       |  —  |
| [`vite/workspace-unique-project-name`](../workspace-unique-project-name.md)                                       |  —  |
| [`vite/no-deprecated-config-options`](../no-deprecated-config-options.md)                                         |  —  |
| [`vite/no-unsafe-server-options`](../no-unsafe-server-options.md)                                                 |  —  |
| [`vite/no-import-meta-env-in-config`](../no-import-meta-env-in-config.md)                                         |  —  |
| [`vite/no-implicit-config-flags`](../no-implicit-config-flags.md)                                                 |  —  |
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
| [`vite/no-empty-vitest-bench-include`](../no-empty-vitest-bench-include.md)                                       |  —  |
| [`vite/no-empty-vitest-bench-exclude`](../no-empty-vitest-bench-exclude.md)                                       |  —  |
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
| [`vite/no-empty-optimize-deps-include`](../no-empty-optimize-deps-include.md)                                     |  —  |
| [`vite/no-empty-optimize-deps-exclude`](../no-empty-optimize-deps-exclude.md)                                     |  —  |
| [`vite/no-empty-ssr-noexternal`](../no-empty-ssr-noexternal.md)                                                   |  —  |
| [`vite/no-empty-ssr-external`](../no-empty-ssr-external.md)                                                       |  —  |
| [`vite/no-empty-worker-plugins`](../no-empty-worker-plugins.md)                                                   |  —  |
| [`vite/no-vitepress-empty-theme-config`](../no-vitepress-empty-theme-config.md)                                   |  —  |
| [`vite/no-vitepress-empty-head`](../no-vitepress-empty-head.md)                                                   |  —  |
| [`vite/require-vitepress-title-or-titletemplate`](../require-vitepress-title-or-titletemplate.md)                 |  —  |
| [`vite/require-vitepress-clean-urls-explicit`](../require-vitepress-clean-urls-explicit.md)                       |  —  |
| [`vite/no-vitest-default-cache-dir-in-monorepo`](../no-vitest-default-cache-dir-in-monorepo.md)                   |  —  |
| [`vite/no-vitest-timeout-triplet-mismatch`](../no-vitest-timeout-triplet-mismatch.md)                             |  —  |
| [`vite/require-vitest-explicit-environment`](../require-vitest-explicit-environment.md)                           |  —  |
| [`vite/require-vitest-slow-test-threshold`](../require-vitest-slow-test-threshold.md)                             |  —  |
| [`vite/require-vitest-timeout-triplet`](../require-vitest-timeout-triplet.md)                                     |  —  |
{/*end-generated-preset-rules*/}
