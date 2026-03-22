# no-vitest-single-thread-pool-by-default

Disallow single-thread pool defaults in committed Vitest config.

> **Rule catalog ID:** R039

## Targeted pattern scope

- `vitest.config.*`
- `vitest.workspace.*`
- `vite.config.*` when Vitest pool options are configured
- `test.poolOptions.*.(threads|maxThreads|maxWorkers)` static values set to `1`

## What this rule reports

This rule reports single-thread pool defaults such as:

- `threads: 1`
- `maxThreads: 1`
- `maxWorkers: 1`

when they are configured under `test.poolOptions`.

## Why this rule exists

Single-thread pool defaults reduce test throughput and can hide concurrency issues.
In shared configuration, these values are often temporary debugging settings that should not be committed.

## ❌ Incorrect

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        poolOptions: {
            threads: {
                maxThreads: 1,
            },
        },
    },
});
```

## ✅ Correct

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        poolOptions: {
            threads: {
                maxThreads: 2,
            },
        },
    },
});
```

## Behavior and migration notes

- this rule checks static numeric/string values only
- it targets shared config files, not arbitrary source modules

## ESLint flat config example

```ts
import vite from "eslint-plugin-vite";

export default [vite.configs.strict, vite.configs.vitest];
```

## When not to use it

Disable this rule only if your project intentionally enforces single-thread pool execution in committed shared config.

## Package documentation

- [Vitest config reference](https://vitest.dev/config/)

## Further reading

- [no-vitest-file-parallelism-disabled](./no-vitest-file-parallelism-disabled.md)
