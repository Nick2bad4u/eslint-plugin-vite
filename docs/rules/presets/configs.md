# configs

Use `vite.configs.configs` when you only want rules that target Vite and Vitest configuration files.

This preset intentionally ignores client-runtime patterns and benchmark organization.

It is the smallest preset that still covers Vite-specific config migrations and unsafe server defaults.

## Flat config

```ts
import vite from "eslint-plugin-vite";

export default [vite.configs.configs];
```

## When to use it

- you mainly want config-file guardrails
- you want to catch deprecated Vite config paths before they spread across packages
- you want review pressure around dev-server host, CORS, and filesystem safety
- your project has generated client files that should stay out of scope
- you want a smaller entry point before enabling broader presets

## Rules in this preset

<!-- begin generated preset rules -->
| Rule                                                                                  | Fix |
| :------------------------------------------------------------------------------------ | :-: |
| [`vite/config-require-define-config`](../config-require-define-config.md)             |  —  |
| [`vite/no-empty-env-prefix`](../no-empty-env-prefix.md)                               |  —  |
| [`vite/no-relative-resolve-alias`](../no-relative-resolve-alias.md)                   |  —  |
| [`vite/no-deprecated-config-options`](../no-deprecated-config-options.md)             |  —  |
| [`vite/no-unsafe-server-options`](../no-unsafe-server-options.md)                     |  —  |
| [`vite/no-import-meta-env-in-config`](../no-import-meta-env-in-config.md)             |  —  |
| [`vite/no-implicit-config-flags`](../no-implicit-config-flags.md)                     |  —  |
| [`vite/no-disabled-vitest-typecheck`](../no-disabled-vitest-typecheck.md)             |  —  |
| [`vite/no-zero-vitest-timeout`](../no-zero-vitest-timeout.md)                         |  —  |
| [`vite/no-unsafe-vitest-flags`](../no-unsafe-vitest-flags.md)                         |  —  |
| [`vite/require-vitest-typecheck-tsconfig`](../require-vitest-typecheck-tsconfig.md)   |  —  |
| [`vite/no-disabled-vitest-isolation`](../no-disabled-vitest-isolation.md)             |  —  |
| [`vite/no-zero-vitest-slow-test-threshold`](../no-zero-vitest-slow-test-threshold.md) |  —  |
| [`vite/no-pass-with-no-tests`](../no-pass-with-no-tests.md)                           |  —  |
| [`vite/no-vitest-globals`](../no-vitest-globals.md)                                   |  —  |
<!-- end generated preset rules -->
