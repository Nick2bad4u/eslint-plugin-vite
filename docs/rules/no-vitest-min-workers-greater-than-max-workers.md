# no-vitest-min-workers-greater-than-max-workers

Disallow worker bounds where `test.minWorkers` is greater than `test.maxWorkers`.

> **Rule catalog ID:** R042

## Targeted pattern scope

- `vitest.config.*`
- `vitest.workspace.*`
- `vite.config.*` when Vitest options are configured
- `test.minWorkers` and `test.maxWorkers` within the same test scope

## What this rule reports

This rule reports static bounds where:

- `test.minWorkers > test.maxWorkers`

## Why this rule exists

Worker bounds must be internally consistent.
Invalid bounds can produce confusing runtime behavior and hard-to-debug parallelism issues.

## ❌ Incorrect

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        minWorkers: 4,
        maxWorkers: 2,
    },
});
```

## ✅ Correct

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        minWorkers: 2,
        maxWorkers: 4,
    },
});
```

## Behavior and migration notes

- this rule checks static literal/template numeric values only
- it compares values within the same test object scope

## ESLint flat config example

```ts
import vite from "eslint-plugin-vite";

export default [vite.configs.strict, vite.configs.vitest];
```

## When not to use it

Disable this rule only if your `minWorkers`/`maxWorkers` relationship is intentionally resolved dynamically at runtime and static placeholders are expected to violate bounds.

## Package documentation

- [Vitest config reference](https://vitest.dev/config/)

## Further reading

- [no-vitest-max-workers-zero](./no-vitest-max-workers-zero.md)
