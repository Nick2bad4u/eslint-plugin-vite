# no-empty-vitest-coverage-reporter

Disallow empty `test.coverage.reporter` arrays in Vitest config.

> **Rule catalog ID:** R031

## Targeted pattern scope

- `vitest.config.*`
- `vitest.workspace.*`
- `vite.config.*` when Vitest coverage options are used
- `test.coverage.reporter`

## What this rule reports

This rule reports `test.coverage.reporter: []`.

## Why this rule exists

An empty reporter list usually means no meaningful coverage report output is produced.
This rule catches a high-impact but easy-to-miss coverage misconfiguration.

## ❌ Incorrect

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        coverage: {
            reporter: [],
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
            reporter: ["text", "html"],
        },
    },
});
```

## Behavior and migration notes

- this rule checks static empty arrays only
- it does not enforce any specific reporter choice

## ESLint flat config example

```ts
import vite from "@typpi/eslint-plugin-vite";

export default [vite.configs.strict, vite.configs.vitest];
```

## When not to use it

Disable this rule only if your coverage reporting is fully delegated to runtime CLI flags and committed reporter arrays are intentionally empty placeholders.

## Package documentation

- [Vitest config reference](https://vitest.dev/config/)

## Further reading

- [no-empty-vitest-coverage-reports-directory](./no-empty-vitest-coverage-reports-directory.md)
