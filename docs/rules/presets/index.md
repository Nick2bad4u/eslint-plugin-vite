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
| Rule                                                                                                              | Fix | Preset key                                                                                                        |
| :---------------------------------------------------------------------------------------------------------------- | :-: | :---------------------------------------------------------------------------------------------------------------- |
| [`vite/config-require-define-config`](../config-require-define-config.md)                                         |  —  | [🟡](./recommended.md) [🔴](./strict.md) [🟣](./all.md) [⚙️](./configs.md) [📚](./vitepress.md) [🧪](./vitest.md) |
| [`vite/import-meta-glob-literal`](../import-meta-glob-literal.md)                                                 |  —  | [🟡](./recommended.md) [🔴](./strict.md) [🟣](./all.md) [🌐](./client.md) [📚](./vitepress.md)                    |
| [`vite/no-dynamic-import-meta-env-access`](../no-dynamic-import-meta-env-access.md)                               |  —  | [🟡](./recommended.md) [🔴](./strict.md) [🟣](./all.md) [🌐](./client.md) [📚](./vitepress.md)                    |
| [`vite/no-empty-env-prefix`](../no-empty-env-prefix.md)                                                           |  —  | [🟡](./recommended.md) [🔴](./strict.md) [🟣](./all.md) [⚙️](./configs.md) [📚](./vitepress.md)                   |
| [`vite/no-mixed-test-and-bench-apis`](../no-mixed-test-and-bench-apis.md)                                         |  —  | [🟡](./recommended.md) [🔴](./strict.md) [🟣](./all.md) [🧪](./vitest.md) [🏎️](./vitest-bench.md)                |
| [`vite/no-relative-resolve-alias`](../no-relative-resolve-alias.md)                                               |  —  | [🟡](./recommended.md) [🔴](./strict.md) [🟣](./all.md) [⚙️](./configs.md)                                        |
| [`vite/no-restricted-import-meta-env`](../no-restricted-import-meta-env.md)                                       |  —  | [🔴](./strict.md) [🟣](./all.md) [🌐](./client.md) [📚](./vitepress.md)                                           |
| [`vite/prefer-define-project`](../prefer-define-project.md)                                                       |  —  | [🔴](./strict.md) [🟣](./all.md) [🧪](./vitest.md)                                                                |
| [`vite/workspace-unique-project-name`](../workspace-unique-project-name.md)                                       |  —  | [🟡](./recommended.md) [🔴](./strict.md) [🟣](./all.md) [🧪](./vitest.md)                                         |
| [`vite/no-deprecated-config-options`](../no-deprecated-config-options.md)                                         |  —  | [🔴](./strict.md) [🟣](./all.md) [⚙️](./configs.md)                                                               |
| [`vite/no-unsafe-server-options`](../no-unsafe-server-options.md)                                                 |  —  | [🔴](./strict.md) [🟣](./all.md) [⚙️](./configs.md)                                                               |
| [`vite/no-import-meta-env-in-config`](../no-import-meta-env-in-config.md)                                         |  —  | [🟡](./recommended.md) [🔴](./strict.md) [🟣](./all.md) [⚙️](./configs.md) [📚](./vitepress.md) [🧪](./vitest.md) |
| [`vite/no-implicit-config-flags`](../no-implicit-config-flags.md)                                                 |  —  | [🔴](./strict.md) [🟣](./all.md) [⚙️](./configs.md)                                                               |
| [`vite/require-inline-project-name`](../require-inline-project-name.md)                                           |  —  | [🟡](./recommended.md) [🔴](./strict.md) [🟣](./all.md) [🧪](./vitest.md)                                         |
| [`vite/no-unsupported-project-options`](../no-unsupported-project-options.md)                                     |  —  | [🟡](./recommended.md) [🔴](./strict.md) [🟣](./all.md) [🧪](./vitest.md)                                         |
| [`vite/no-disabled-vitest-typecheck`](../no-disabled-vitest-typecheck.md)                                         |  —  | [🔴](./strict.md) [🟣](./all.md) [⚙️](./configs.md) [🧪](./vitest.md)                                             |
| [`vite/no-zero-vitest-timeout`](../no-zero-vitest-timeout.md)                                                     |  —  | [🔴](./strict.md) [🟣](./all.md) [⚙️](./configs.md) [🧪](./vitest.md)                                             |
| [`vite/no-unsafe-vitest-flags`](../no-unsafe-vitest-flags.md)                                                     |  —  | [🔴](./strict.md) [🟣](./all.md) [⚙️](./configs.md) [🧪](./vitest.md)                                             |
| [`vite/require-vitest-typecheck-tsconfig`](../require-vitest-typecheck-tsconfig.md)                               |  —  | [🔴](./strict.md) [🟣](./all.md) [⚙️](./configs.md) [🧪](./vitest.md)                                             |
| [`vite/no-disabled-vitest-isolation`](../no-disabled-vitest-isolation.md)                                         |  —  | [🔴](./strict.md) [🟣](./all.md) [⚙️](./configs.md) [🧪](./vitest.md)                                             |
| [`vite/no-zero-vitest-slow-test-threshold`](../no-zero-vitest-slow-test-threshold.md)                             |  —  | [🔴](./strict.md) [🟣](./all.md) [⚙️](./configs.md) [🧪](./vitest.md)                                             |
| [`vite/no-pass-with-no-tests`](../no-pass-with-no-tests.md)                                                       |  —  | [🔴](./strict.md) [🟣](./all.md) [⚙️](./configs.md) [🧪](./vitest.md)                                             |
| [`vite/no-vitest-globals`](../no-vitest-globals.md)                                                               |  —  | [🔴](./strict.md) [🟣](./all.md) [⚙️](./configs.md) [🧪](./vitest.md)                                             |
| [`vite/no-empty-vitest-projects`](../no-empty-vitest-projects.md)                                                 |  —  | [🔴](./strict.md) [🟣](./all.md) [⚙️](./configs.md) [🧪](./vitest.md)                                             |
| [`vite/no-empty-vitest-include`](../no-empty-vitest-include.md)                                                   |  —  | [🔴](./strict.md) [🟣](./all.md) [⚙️](./configs.md) [🧪](./vitest.md)                                             |
| [`vite/no-empty-vitest-project-name`](../no-empty-vitest-project-name.md)                                         |  —  | [🔴](./strict.md) [🟣](./all.md) [⚙️](./configs.md) [🧪](./vitest.md)                                             |
| [`vite/no-empty-vitest-exclude`](../no-empty-vitest-exclude.md)                                                   |  —  | [🔴](./strict.md) [🟣](./all.md) [⚙️](./configs.md) [🧪](./vitest.md)                                             |
| [`vite/no-empty-vitest-bench-include`](../no-empty-vitest-bench-include.md)                                       |  —  | [🔴](./strict.md) [🟣](./all.md) [⚙️](./configs.md) [🏎️](./vitest-bench.md)                                      |
| [`vite/no-empty-vitest-bench-exclude`](../no-empty-vitest-bench-exclude.md)                                       |  —  | [🔴](./strict.md) [🟣](./all.md) [⚙️](./configs.md) [🏎️](./vitest-bench.md)                                      |
| [`vite/no-empty-vitest-coverage-include`](../no-empty-vitest-coverage-include.md)                                 |  —  | [🔴](./strict.md) [🟣](./all.md) [⚙️](./configs.md) [🧪](./vitest.md)                                             |
| [`vite/no-empty-vitest-coverage-reporter`](../no-empty-vitest-coverage-reporter.md)                               |  —  | [🔴](./strict.md) [🟣](./all.md) [⚙️](./configs.md) [🧪](./vitest.md)                                             |
| [`vite/no-empty-vitest-coverage-reports-directory`](../no-empty-vitest-coverage-reports-directory.md)             |  —  | [🔴](./strict.md) [🟣](./all.md) [⚙️](./configs.md) [🧪](./vitest.md)                                             |
| [`vite/no-empty-vitest-project-exclude`](../no-empty-vitest-project-exclude.md)                                   |  —  | [🔴](./strict.md) [🟣](./all.md) [⚙️](./configs.md) [🧪](./vitest.md)                                             |
| [`vite/no-mixed-defineworkspace-and-test-projects`](../no-mixed-defineworkspace-and-test-projects.md)             |  —  | [🔴](./strict.md) [🟣](./all.md) [⚙️](./configs.md) [🧪](./vitest.md)                                             |
| [`vite/require-vitest-sequence-seed-when-shuffle`](../require-vitest-sequence-seed-when-shuffle.md)               |  —  | [🔴](./strict.md) [🟣](./all.md) [⚙️](./configs.md) [🧪](./vitest.md)                                             |
| [`vite/no-vitest-watch-in-config`](../no-vitest-watch-in-config.md)                                               |  —  | [🔴](./strict.md) [🟣](./all.md) [⚙️](./configs.md) [🧪](./vitest.md)                                             |
| [`vite/no-vitest-ui-in-config`](../no-vitest-ui-in-config.md)                                                     |  —  | [🔴](./strict.md) [🟣](./all.md) [⚙️](./configs.md) [🧪](./vitest.md)                                             |
| [`vite/no-vitest-file-parallelism-disabled`](../no-vitest-file-parallelism-disabled.md)                           |  —  | [🔴](./strict.md) [🟣](./all.md) [⚙️](./configs.md) [🧪](./vitest.md)                                             |
| [`vite/no-vitest-single-thread-pool-by-default`](../no-vitest-single-thread-pool-by-default.md)                   |  —  | [🔴](./strict.md) [🟣](./all.md) [⚙️](./configs.md) [🧪](./vitest.md)                                             |
| [`vite/no-vitest-bail-and-retry-conflict`](../no-vitest-bail-and-retry-conflict.md)                               |  —  | [🔴](./strict.md) [🟣](./all.md) [⚙️](./configs.md) [🧪](./vitest.md)                                             |
| [`vite/no-vitest-max-workers-zero`](../no-vitest-max-workers-zero.md)                                             |  —  | [🔴](./strict.md) [🟣](./all.md) [⚙️](./configs.md) [🧪](./vitest.md)                                             |
| [`vite/no-vitest-min-workers-greater-than-max-workers`](../no-vitest-min-workers-greater-than-max-workers.md)     |  —  | [🔴](./strict.md) [🟣](./all.md) [⚙️](./configs.md) [🧪](./vitest.md)                                             |
| [`vite/require-vitest-coverage-provider-when-enabled`](../require-vitest-coverage-provider-when-enabled.md)       |  —  | [🔴](./strict.md) [🟣](./all.md) [⚙️](./configs.md) [🧪](./vitest.md)                                             |
| [`vite/require-vitest-coverage-reporter-when-enabled`](../require-vitest-coverage-reporter-when-enabled.md)       |  —  | [🔴](./strict.md) [🟣](./all.md) [⚙️](./configs.md) [🧪](./vitest.md)                                             |
| [`vite/require-vitest-coverage-thresholds-when-enabled`](../require-vitest-coverage-thresholds-when-enabled.md)   |  —  | [🔴](./strict.md) [🟣](./all.md) [⚙️](./configs.md) [🧪](./vitest.md)                                             |
| [`vite/no-vitest-coverage-enabled-false-with-thresholds`](../no-vitest-coverage-enabled-false-with-thresholds.md) |  —  | [🔴](./strict.md) [🟣](./all.md) [⚙️](./configs.md) [🧪](./vitest.md)                                             |
| [`vite/no-vitest-coverage-all-false`](../no-vitest-coverage-all-false.md)                                         |  —  | [🔴](./strict.md) [🟣](./all.md) [⚙️](./configs.md) [🧪](./vitest.md)                                             |
| [`vite/no-vitest-coverage-clean-false`](../no-vitest-coverage-clean-false.md)                                     |  —  | [🔴](./strict.md) [🟣](./all.md) [⚙️](./configs.md) [🧪](./vitest.md)                                             |
| [`vite/no-vitest-coverage-skip-full-false-in-strict`](../no-vitest-coverage-skip-full-false-in-strict.md)         |  —  | [🔴](./strict.md) [🟣](./all.md) [⚙️](./configs.md) [🧪](./vitest.md)                                             |
| [`vite/require-vitest-coverage-reports-directory`](../require-vitest-coverage-reports-directory.md)               |  —  | [🔴](./strict.md) [🟣](./all.md) [⚙️](./configs.md) [🧪](./vitest.md)                                             |
| [`vite/no-vitest-coverage-reporter-text-only`](../no-vitest-coverage-reporter-text-only.md)                       |  —  | [🔴](./strict.md) [🟣](./all.md) [⚙️](./configs.md) [🧪](./vitest.md)                                             |
| [`vite/no-vitest-coverage-temp-dir-in-repo-root`](../no-vitest-coverage-temp-dir-in-repo-root.md)                 |  —  | [🔴](./strict.md) [🟣](./all.md) [⚙️](./configs.md) [🧪](./vitest.md)                                             |
| [`vite/require-vitest-mock-reset-policy`](../require-vitest-mock-reset-policy.md)                                 |  —  | [🔴](./strict.md) [🟣](./all.md) [⚙️](./configs.md) [🧪](./vitest.md)                                             |
| [`vite/prefer-vitest-restore-mocks`](../prefer-vitest-restore-mocks.md)                                           |  —  | [🔴](./strict.md) [🟣](./all.md) [⚙️](./configs.md) [🧪](./vitest.md)                                             |
| [`vite/no-vitest-unstub-globals-false`](../no-vitest-unstub-globals-false.md)                                     |  —  | [🔴](./strict.md) [🟣](./all.md) [⚙️](./configs.md) [🧪](./vitest.md)                                             |
| [`vite/no-vitest-unstub-envs-false`](../no-vitest-unstub-envs-false.md)                                           |  —  | [🔴](./strict.md) [🟣](./all.md) [⚙️](./configs.md) [🧪](./vitest.md)                                             |
| [`vite/no-vitest-env-leakage-combo`](../no-vitest-env-leakage-combo.md)                                           |  —  | [🔴](./strict.md) [🟣](./all.md) [⚙️](./configs.md) [🧪](./vitest.md)                                             |
| [`vite/require-vitest-environment-match-globs`](../require-vitest-environment-match-globs.md)                     |  —  | [🔴](./strict.md) [🟣](./all.md) [⚙️](./configs.md) [🧪](./vitest.md)                                             |
| [`vite/no-empty-optimize-deps-include`](../no-empty-optimize-deps-include.md)                                     |  —  | [🔴](./strict.md) [🟣](./all.md) [⚙️](./configs.md)                                                               |
| [`vite/no-empty-optimize-deps-exclude`](../no-empty-optimize-deps-exclude.md)                                     |  —  | [🔴](./strict.md) [🟣](./all.md) [⚙️](./configs.md)                                                               |
| [`vite/no-empty-ssr-noexternal`](../no-empty-ssr-noexternal.md)                                                   |  —  | [🔴](./strict.md) [🟣](./all.md) [⚙️](./configs.md)                                                               |
| [`vite/no-empty-ssr-external`](../no-empty-ssr-external.md)                                                       |  —  | [🔴](./strict.md) [🟣](./all.md) [⚙️](./configs.md)                                                               |
| [`vite/no-empty-worker-plugins`](../no-empty-worker-plugins.md)                                                   |  —  | [🔴](./strict.md) [🟣](./all.md) [⚙️](./configs.md)                                                               |
| [`vite/no-vitepress-empty-theme-config`](../no-vitepress-empty-theme-config.md)                                   |  —  | [🔴](./strict.md) [🟣](./all.md) [📚](./vitepress.md)                                                             |
| [`vite/no-vitepress-empty-head`](../no-vitepress-empty-head.md)                                                   |  —  | [🔴](./strict.md) [🟣](./all.md) [📚](./vitepress.md)                                                             |
| [`vite/require-vitepress-title-or-titletemplate`](../require-vitepress-title-or-titletemplate.md)                 |  —  | [🔴](./strict.md) [🟣](./all.md) [📚](./vitepress.md)                                                             |
| [`vite/require-vitepress-clean-urls-explicit`](../require-vitepress-clean-urls-explicit.md)                       |  —  | [🔴](./strict.md) [🟣](./all.md) [📚](./vitepress.md)                                                             |
<!-- end generated preset matrix -->
