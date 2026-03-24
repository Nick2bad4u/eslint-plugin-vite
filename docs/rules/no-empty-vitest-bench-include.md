# no-empty-vitest-bench-include

Disallow empty `test.benchmark.include` arrays in Vitest config.

> **Rule catalog ID:** R028

## Targeted pattern scope

- `vitest.config.*`
- `vitest.workspace.*`
- `vite.config.*` when Vitest benchmark options are used
- `test.benchmark.include`

## What this rule reports

This rule reports `test.benchmark.include: []`.

## Why this rule exists

An empty benchmark include list often disables benchmark discovery entirely.
This rule catches that high-impact config mistake early.

## ❌ Incorrect

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        benchmark: {
            include: [],
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
            include: ["bench/**/*.bench.ts"],
        },
    },
});
```

## Behavior and migration notes

- this rule checks static empty arrays only
- it does not validate benchmark glob quality

## ESLint flat config example

```ts
import vite from "@typpi/eslint-plugin-vite";

export default [vite.configs.strict, vite.configs["vitest-bench"]];
```

## When not to use it

Disable this rule only if benchmark include patterns are injected dynamically and empty committed arrays are intentional placeholders.

## Package documentation

- [Vitest config reference](https://vitest.dev/config/)

## Further reading

- [no-empty-vitest-bench-exclude](./no-empty-vitest-bench-exclude.md)
