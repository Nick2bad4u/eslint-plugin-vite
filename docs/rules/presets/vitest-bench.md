# vitest-bench

Use `vite.configs["vitest-bench"]` when your repository contains benchmark files built on Vitest bench APIs.

This preset helps keep benchmark suites separate from correctness tests.

## Flat config

```ts
import vite from "eslint-plugin-vite";

export default [vite.configs.vitest-bench];
```

## When to use it

- your repo contains `.bench.*` files
- contributors occasionally add `bench()` calls next to `test()` calls
- you want dedicated benchmark hygiene without enabling the full Vitest preset

## Rules in this preset

<!-- begin generated preset rules -->
| Rule                                                                      | Fix |
| :------------------------------------------------------------------------ | :-: |
| [`vite/no-mixed-test-and-bench-apis`](../no-mixed-test-and-bench-apis.md) |  —  |
<!-- end generated preset rules -->
