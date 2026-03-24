# require-vitest-coverage-reporter-when-enabled

Require explicit `test.coverage.reporter` when coverage is enabled.

> **Rule catalog ID:** R044

## Targeted pattern scope

- `vitest.config.*`
- `vitest.workspace.*`
- `vite.config.*` when Vitest coverage is configured
- `test.coverage.enabled: true`

## What this rule reports

This rule reports enabled coverage blocks that do not provide a non-empty `test.coverage.reporter` setting.

## Why this rule exists

Reporter output drives CI artifacts and local diagnostics.
Explicit reporter configuration keeps coverage reporting stable and intentional.

## ❌ Incorrect

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        coverage: {
            enabled: true,
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
            reporter: ["text", "html"],
        },
    },
});
```

## Behavior and migration notes

- this rule treats non-empty static strings/arrays as configured reporters
- empty reporter arrays are reported as missing reporter configuration

## ESLint flat config example

```ts
import vite from "@typpi/eslint-plugin-vite";

export default [vite.configs.strict, vite.configs.vitest];
```

## When not to use it

Disable this rule only if reporter selection is intentionally controlled outside committed config.

## Package documentation

- [Vitest config reference](https://vitest.dev/config/)

## Further reading

- [require-vitest-coverage-provider-when-enabled](./require-vitest-coverage-provider-when-enabled.md)
- [require-vitest-coverage-thresholds-when-enabled](./require-vitest-coverage-thresholds-when-enabled.md)
