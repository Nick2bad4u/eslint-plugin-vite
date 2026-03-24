# no-empty-vitest-coverage-reports-directory

Disallow empty `test.coverage.reportsDirectory` values in Vitest config.

> **Rule catalog ID:** R032

## Targeted pattern scope

- `vitest.config.*`
- `vitest.workspace.*`
- `vite.config.*` when Vitest coverage options are used
- `test.coverage.reportsDirectory`

## What this rule reports

This rule reports empty or whitespace-only static `test.coverage.reportsDirectory` values.

## Why this rule exists

Coverage directories are usually consumed by CI artifacts and local report tooling.
An empty value is a fragile misconfiguration and often indicates unfinished setup.

## ❌ Incorrect

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        coverage: {
            reportsDirectory: "",
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
            reportsDirectory: "./coverage",
        },
    },
});
```

## Behavior and migration notes

- this rule checks static strings only
- computed values are not evaluated

## ESLint flat config example

```ts
import vite from "@typpi/eslint-plugin-vite";

export default [vite.configs.strict, vite.configs.vitest];
```

## When not to use it

Disable this rule only if report directories are generated dynamically and blank committed placeholders are intentional.

## Package documentation

- [Vitest config reference](https://vitest.dev/config/)

## Further reading

- [no-empty-vitest-coverage-reporter](./no-empty-vitest-coverage-reporter.md)
