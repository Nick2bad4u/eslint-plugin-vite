# strict

Use `vite.configs.strict` when the recommended baseline is already clean and you want tighter policy enforcement.

This preset adds stricter guidance for config migrations, server hardening, client env access, and inline Vitest workspace project definitions.

## Flat config

```ts
import vite from "eslint-plugin-vite";

export default [vite.configs.strict];
```

## When to use it

- your team already understands Vite env-prefix policy
- you want deprecated Vite config aliases caught during review instead of during upgrades
- you want stronger defaults around `server.allowedHosts`, CORS, and filesystem exposure
- you want stronger review pressure around inline Vitest workspace setup
- you prefer one preset that includes the common baseline and stricter add-ons

## Rules in this preset

<!-- begin generated preset rules -->
| Rule                                                                                                  | Fix |
| :---------------------------------------------------------------------------------------------------- | :-: |
| [`vite/config-require-define-config`](../config-require-define-config.md)                             |  —  |
| [`vite/import-meta-glob-literal`](../import-meta-glob-literal.md)                                     |  —  |
| [`vite/no-dynamic-import-meta-env-access`](../no-dynamic-import-meta-env-access.md)                   |  —  |
| [`vite/no-empty-env-prefix`](../no-empty-env-prefix.md)                                               |  —  |
| [`vite/no-mixed-test-and-bench-apis`](../no-mixed-test-and-bench-apis.md)                             |  —  |
| [`vite/no-relative-resolve-alias`](../no-relative-resolve-alias.md)                                   |  —  |
| [`vite/no-restricted-import-meta-env`](../no-restricted-import-meta-env.md)                           |  —  |
| [`vite/prefer-define-project`](../prefer-define-project.md)                                           |  —  |
| [`vite/workspace-unique-project-name`](../workspace-unique-project-name.md)                           |  —  |
| [`vite/no-deprecated-config-options`](../no-deprecated-config-options.md)                             |  —  |
| [`vite/no-unsafe-server-options`](../no-unsafe-server-options.md)                                     |  —  |
| [`vite/no-import-meta-env-in-config`](../no-import-meta-env-in-config.md)                             |  —  |
| [`vite/no-implicit-config-flags`](../no-implicit-config-flags.md)                                     |  —  |
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
| [`vite/no-empty-vitest-bench-include`](../no-empty-vitest-bench-include.md)                           |  —  |
| [`vite/no-empty-vitest-bench-exclude`](../no-empty-vitest-bench-exclude.md)                           |  —  |
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
