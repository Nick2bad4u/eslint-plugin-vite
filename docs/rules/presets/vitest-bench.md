# 👟 Vitest Bench

Use `vite.configs["vitest-bench"]` when your repository contains benchmark files built on Vitest bench APIs.

This preset helps keep benchmark suites separate from correctness tests.

## Flat config

```ts
import vite from "@typpi/eslint-plugin-vite";

export default [vite.configs.vitest-bench];
```

## When to use it

- your repo contains `.bench.*` files
- contributors occasionally add `bench()` calls next to `test()` calls
- you want dedicated benchmark hygiene without enabling the full Vitest preset

## Rules in this preset

{/*begin-generated-preset-rules*/}
| Rule                                                                                            | Fix |
| :---------------------------------------------------------------------------------------------- | :-: |
| [`vite/no-mixed-test-and-bench-apis`](../no-mixed-test-and-bench-apis.md)                       |  —  |
| [`vite/no-empty-vitest-bench-include`](../no-empty-vitest-bench-include.md)                     |  —  |
| [`vite/no-empty-vitest-bench-exclude`](../no-empty-vitest-bench-exclude.md)                     |  —  |
| [`vite/no-vitest-default-cache-dir-in-monorepo`](../no-vitest-default-cache-dir-in-monorepo.md) |  —  |
| [`vite/no-vitest-timeout-triplet-mismatch`](../no-vitest-timeout-triplet-mismatch.md)           |  —  |
| [`vite/require-vitest-explicit-environment`](../require-vitest-explicit-environment.md)         |  —  |
| [`vite/require-vitest-slow-test-threshold`](../require-vitest-slow-test-threshold.md)           |  —  |
| [`vite/require-vitest-timeout-triplet`](../require-vitest-timeout-triplet.md)                   |  —  |
{/*end-generated-preset-rules*/}
