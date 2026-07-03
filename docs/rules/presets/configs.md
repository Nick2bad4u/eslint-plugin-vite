# ⚙️ Configs

Use `vite.configs.configs` when you only want rules that target Vite and Vitest configuration files.

This preset intentionally ignores client-runtime patterns and benchmark organization.

It is the smallest preset that still covers Vite-specific config migrations and unsafe server defaults.

## Flat config

```ts
import vite from "@typpi/eslint-plugin-vite";

export default [vite.configs.configs];
```

## When to use it

- you mainly want config-file guardrails
- you want to catch deprecated Vite config paths before they spread across packages
- you want review pressure around dev-server host, CORS, and filesystem safety
- your project has generated client files that should stay out of scope
- you want a smaller entry point before enabling broader presets

## Rules in this preset

{/_begin-generated-preset-rules_/}

| Rule                                                                                                              | Fix |
| :---------------------------------------------------------------------------------------------------------------- | :-: |
| [`vite/config-require-define-config`](../config-require-define-config.md)                                         |  —  |
| [`vite/no-deprecated-config-options`](../no-deprecated-config-options.md)                                         |  —  |
| [`vite/no-disabled-vitest-isolation`](../no-disabled-vitest-isolation.md)                                         |  —  |
| [`vite/no-disabled-vitest-typecheck`](../no-disabled-vitest-typecheck.md)                                         |  —  |
| [`vite/no-empty-env-prefix`](../no-empty-env-prefix.md)                                                           |  —  |
| [`vite/no-empty-optimize-deps-exclude`](../no-empty-optimize-deps-exclude.md)                                     |  —  |
| [`vite/no-empty-optimize-deps-include`](../no-empty-optimize-deps-include.md)                                     |  —  |
| [`vite/no-empty-ssr-external`](../no-empty-ssr-external.md)                                                       |  —  |
| [`vite/no-empty-ssr-noexternal`](../no-empty-ssr-noexternal.md)                                                   |  —  |
| [`vite/no-empty-vitest-bench-exclude`](../no-empty-vitest-bench-exclude.md)                                       |  —  |
| [`vite/no-empty-vitest-bench-include`](../no-empty-vitest-bench-include.md)                                       |  —  |
| [`vite/no-empty-vitest-coverage-include`](../no-empty-vitest-coverage-include.md)                                 |  —  |
| [`vite/no-empty-vitest-coverage-reporter`](../no-empty-vitest-coverage-reporter.md)                               |  —  |
| [`vite/no-empty-vitest-coverage-reports-directory`](../no-empty-vitest-coverage-reports-directory.md)             |  —  |
| [`vite/no-empty-vitest-exclude`](../no-empty-vitest-exclude.md)                                                   |  —  |
| [`vite/no-empty-vitest-include`](../no-empty-vitest-include.md)                                                   |  —  |
| [`vite/no-empty-vitest-project-exclude`](../no-empty-vitest-project-exclude.md)                                   |  —  |
| [`vite/no-empty-vitest-project-name`](../no-empty-vitest-project-name.md)                                         |  —  |
| [`vite/no-empty-vitest-projects`](../no-empty-vitest-projects.md)                                                 |  —  |
| [`vite/no-empty-worker-plugins`](../no-empty-worker-plugins.md)                                                   |  —  |
| [`vite/no-implicit-config-flags`](../no-implicit-config-flags.md)                                                 |  —  |
| [`vite/no-import-meta-env-in-config`](../no-import-meta-env-in-config.md)                                         |  —  |
| [`vite/no-mixed-defineworkspace-and-test-projects`](../no-mixed-defineworkspace-and-test-projects.md)             |  —  |
| [`vite/no-pass-with-no-tests`](../no-pass-with-no-tests.md)                                                       |  —  |
| [`vite/no-relative-resolve-alias`](../no-relative-resolve-alias.md)                                               |  —  |
| [`vite/no-unsafe-server-options`](../no-unsafe-server-options.md)                                                 |  —  |
| [`vite/no-unsafe-vitest-flags`](../no-unsafe-vitest-flags.md)                                                     |  —  |
| [`vite/no-vitest-bail-and-retry-conflict`](../no-vitest-bail-and-retry-conflict.md)                               |  —  |
| [`vite/no-vitest-coverage-all-false`](../no-vitest-coverage-all-false.md)                                         |  —  |
| [`vite/no-vitest-coverage-clean-false`](../no-vitest-coverage-clean-false.md)                                     |  —  |
| [`vite/no-vitest-coverage-enabled-false-with-thresholds`](../no-vitest-coverage-enabled-false-with-thresholds.md) |  —  |
| [`vite/no-vitest-coverage-reporter-text-only`](../no-vitest-coverage-reporter-text-only.md)                       |  —  |
| [`vite/no-vitest-coverage-skip-full-false-in-strict`](../no-vitest-coverage-skip-full-false-in-strict.md)         |  —  |
| [`vite/no-vitest-coverage-temp-dir-in-repo-root`](../no-vitest-coverage-temp-dir-in-repo-root.md)                 |  —  |
| [`vite/no-vitest-env-leakage-combo`](../no-vitest-env-leakage-combo.md)                                           |  —  |
| [`vite/no-vitest-file-parallelism-disabled`](../no-vitest-file-parallelism-disabled.md)                           |  —  |
| [`vite/no-vitest-globals`](../no-vitest-globals.md)                                                               |  —  |
| [`vite/no-vitest-max-workers-zero`](../no-vitest-max-workers-zero.md)                                             |  —  |
| [`vite/no-vitest-min-workers-greater-than-max-workers`](../no-vitest-min-workers-greater-than-max-workers.md)     |  —  |
| [`vite/no-vitest-single-thread-pool-by-default`](../no-vitest-single-thread-pool-by-default.md)                   |  —  |
| [`vite/no-vitest-ui-in-config`](../no-vitest-ui-in-config.md)                                                     |  —  |
| [`vite/no-vitest-unstub-envs-false`](../no-vitest-unstub-envs-false.md)                                           |  —  |
| [`vite/no-vitest-unstub-globals-false`](../no-vitest-unstub-globals-false.md)                                     |  —  |
| [`vite/no-vitest-watch-in-config`](../no-vitest-watch-in-config.md)                                               |  —  |
| [`vite/no-zero-vitest-slow-test-threshold`](../no-zero-vitest-slow-test-threshold.md)                             |  —  |
| [`vite/no-zero-vitest-timeout`](../no-zero-vitest-timeout.md)                                                     |  —  |
| [`vite/prefer-vitest-restore-mocks`](../prefer-vitest-restore-mocks.md)                                           |  —  |
| [`vite/require-vitest-coverage-provider-when-enabled`](../require-vitest-coverage-provider-when-enabled.md)       |  —  |
| [`vite/require-vitest-coverage-reporter-when-enabled`](../require-vitest-coverage-reporter-when-enabled.md)       |  —  |
| [`vite/require-vitest-coverage-reports-directory`](../require-vitest-coverage-reports-directory.md)               |  —  |
| [`vite/require-vitest-coverage-thresholds-when-enabled`](../require-vitest-coverage-thresholds-when-enabled.md)   |  —  |
| [`vite/require-vitest-environment-match-globs`](../require-vitest-environment-match-globs.md)                     |  —  |
| [`vite/require-vitest-mock-reset-policy`](../require-vitest-mock-reset-policy.md)                                 |  —  |
| [`vite/require-vitest-sequence-seed-when-shuffle`](../require-vitest-sequence-seed-when-shuffle.md)               |  —  |
| [`vite/require-vitest-typecheck-tsconfig`](../require-vitest-typecheck-tsconfig.md)                               |  —  |
| {/_end-generated-preset-rules_/}                                                                                  |
