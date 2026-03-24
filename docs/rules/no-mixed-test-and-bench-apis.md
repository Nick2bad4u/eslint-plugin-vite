# no-mixed-test-and-bench-apis

Disallow mixing Vitest `bench()` calls with `test()` or `it()` in the same file.

> **Rule catalog ID:** R005

## Targeted pattern scope

- Vitest benchmark files
- repositories that keep tests and benchmarks close together

## What this rule reports

This rule reports files that use benchmark APIs and correctness-test APIs together.

## Why this rule exists

Benchmarks answer a different question than tests.

- tests verify correctness
- benchmarks measure performance

Mixing them in the same file makes ownership, review, and execution intent harder to read.

## ❌ Incorrect

```ts
import { bench, test } from "vitest";

test("adds numbers", () => {
    expect(1 + 1).toBe(2);
});

bench("adds numbers", () => {
    1 + 1;
});
```

## ✅ Correct

```ts
import { test } from "vitest";

test("adds numbers", () => {
    expect(1 + 1).toBe(2);
});
```

```ts
import { bench } from "vitest";

bench("adds numbers", () => {
    1 + 1;
});
```

## Behavior and migration notes

- keep correctness assertions in `.test.*` or `.spec.*` files
- keep performance checks in `.bench.*` files or a dedicated benchmark folder

## ESLint flat config example

```ts
import vite from "@typpi/eslint-plugin-vite";

export default [vite.configs.vitest, vite.configs["vitest-bench"]];
```

## When not to use it

Disable this rule only if your repository intentionally treats tests and benchmarks as a single artifact.

## Package documentation

- [Vitest features](https://vitest.dev/guide/features)
- [Vitest benchmarking](https://vitest.dev/guide/features#benchmarking)

## Further reading

- [vitest preset](./presets/vitest.md)
- [vitest-bench preset](./presets/vitest-bench.md)
