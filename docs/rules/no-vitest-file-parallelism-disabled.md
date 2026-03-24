# no-vitest-file-parallelism-disabled

Disallow `test.fileParallelism: false` in committed Vitest config.

> **Rule catalog ID:** R038

## Targeted pattern scope

- `vitest.config.*`
- `vitest.workspace.*`
- `vite.config.*` when Vitest `test.fileParallelism` is configured

## What this rule reports

This rule reports explicit `test.fileParallelism: false` assignments.

## Why this rule exists

Disabling file-level parallelism can reduce test throughput and hide order-dependent issues.
In shared config, this is usually an accidental or temporary setting that should not persist.

## ❌ Incorrect

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        fileParallelism: false,
    },
});
```

## ✅ Correct

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        fileParallelism: true,
    },
});
```

## Behavior and migration notes

- this rule reports only explicit `false`
- use local overrides if single-threaded debugging is needed temporarily

## ESLint flat config example

```ts
import vite from "@typpi/eslint-plugin-vite";

export default [vite.configs.strict, vite.configs.vitest];
```

## When not to use it

Disable this rule only if your project intentionally runs tests without file parallelism in committed shared config.

## Package documentation

- [Vitest config reference](https://vitest.dev/config/)

## Further reading

- [require-vitest-sequence-seed-when-shuffle](./require-vitest-sequence-seed-when-shuffle.md)
