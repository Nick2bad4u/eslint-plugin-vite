# no-empty-vitest-coverage-include

Disallow empty `test.coverage.include` arrays in Vitest config.

> **Rule catalog ID:** R030

## Targeted pattern scope

- `vitest.config.*`
- `vitest.workspace.*`
- `vite.config.*` when Vitest coverage options are used
- `test.coverage.include`

## What this rule reports

This rule reports `test.coverage.include: []`.

## Why this rule exists

An empty coverage include list usually means intended targeting is effectively disabled.
Catching this helps keep coverage settings intentional and useful.

## ❌ Incorrect

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        coverage: {
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
        coverage: {
            include: ["src/**/*.ts"],
        },
    },
});
```

## Behavior and migration notes

- this rule checks static empty arrays only
- it does not validate include glob quality

## ESLint flat config example

```ts
import vite from "eslint-plugin-vite";

export default [vite.configs.strict, vite.configs.vitest];
```

## When not to use it

Disable this rule only if coverage include patterns are generated dynamically and empty committed arrays are intentional placeholders.

## Package documentation

- [Vitest config reference](https://vitest.dev/config/)

## Further reading

- [no-empty-vitest-coverage-reporter](./no-empty-vitest-coverage-reporter.md)
