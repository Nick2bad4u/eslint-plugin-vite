# require-vitest-coverage-thresholds-when-enabled

Require explicit non-empty `test.coverage.thresholds` when coverage is enabled.

> **Rule catalog ID:** R045

## Targeted pattern scope

- `vitest.config.*`
- `vitest.workspace.*`
- `vite.config.*` when Vitest coverage is configured
- `test.coverage.enabled: true`

## What this rule reports

This rule reports enabled coverage blocks that omit thresholds or provide empty thresholds objects.

## Why this rule exists

Coverage without thresholds measures but does not enforce quality gates.
Explicit thresholds make CI quality expectations clear and enforceable.

## ❌ Incorrect

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        coverage: {
            enabled: true,
            thresholds: {},
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
            enabled: true,
            thresholds: {
                lines: 80,
                functions: 80,
                branches: 75,
                statements: 80,
            },
        },
    },
});
```

## Behavior and migration notes

- this rule requires a non-empty static thresholds object
- threshold values themselves are not range-validated by this rule

## ESLint flat config example

```ts
import vite from "@typpi/eslint-plugin-vite";

export default [vite.configs.strict, vite.configs.vitest];
```

## When not to use it

Disable this rule only if coverage quality gates are enforced entirely outside Vitest config.

## Package documentation

- [Vitest config reference](https://vitest.dev/config/)

## Further reading

- [no-vitest-coverage-enabled-false-with-thresholds](./no-vitest-coverage-enabled-false-with-thresholds.md)
