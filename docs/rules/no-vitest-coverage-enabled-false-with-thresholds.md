# no-vitest-coverage-enabled-false-with-thresholds

Disallow configuring non-empty `test.coverage.thresholds` while `test.coverage.enabled` is set to `false`.

> **Rule catalog ID:** R046

## Targeted pattern scope

- `vitest.config.*`
- `vitest.workspace.*`
- `vite.config.*` when Vitest coverage is configured
- same coverage scope containing `enabled: false` and non-empty `thresholds`

## What this rule reports

This rule reports contradictory coverage settings where thresholds are configured but coverage is explicitly disabled.

## Why this rule exists

Thresholds represent coverage quality gates and are meaningful only when coverage runs.
Keeping contradictory settings out of shared config avoids confusion and dead configuration.

## ❌ Incorrect

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        coverage: {
            enabled: false,
            thresholds: {
                lines: 90,
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
        coverage: {
            enabled: true,
            thresholds: {
                lines: 90,
            },
        },
    },
});
```

## Behavior and migration notes

- this rule checks static enabled/threshold object values only
- it reports once per contradictory coverage scope

## ESLint flat config example

```ts
import vite from "@typpi/eslint-plugin-vite";

export default [vite.configs.strict, vite.configs.vitest];
```

## When not to use it

Disable this rule only if your project intentionally keeps disabled coverage plus threshold placeholders in committed config.

## Package documentation

- [Vitest config reference](https://vitest.dev/config/)

## Further reading

- [require-vitest-coverage-thresholds-when-enabled](./require-vitest-coverage-thresholds-when-enabled.md)
