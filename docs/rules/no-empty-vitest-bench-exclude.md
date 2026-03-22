# no-empty-vitest-bench-exclude

Disallow empty `test.benchmark.exclude` arrays in Vitest config.

> **Rule catalog ID:** R029

## Targeted pattern scope

- `vitest.config.*`
- `vitest.workspace.*`
- `vite.config.*` when benchmark options are used
- `test.benchmark.exclude`

## What this rule reports

This rule reports `test.benchmark.exclude: []`.

## Why this rule exists

An empty benchmark exclude list is usually redundant config noise.
Removing ineffective settings keeps benchmark topology easier to reason about.

## ❌ Incorrect

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        benchmark: {
            exclude: [],
        },
    },
});
```

## ✅ Correct

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        benchmark: {
            exclude: ["dist/**"],
        },
    },
});
```

## Behavior and migration notes

- this rule checks static empty arrays only
- it does not enforce that an exclude list must exist

## ESLint flat config example

```ts
import vite from "eslint-plugin-vite";

export default [vite.configs.strict, vite.configs["vitest-bench"]];
```

## When not to use it

Disable this rule only if your workflow intentionally keeps empty benchmark excludes as placeholders.

## Package documentation

- [Vitest config reference](https://vitest.dev/config/)

## Further reading

- [no-empty-vitest-bench-include](./no-empty-vitest-bench-include.md)
