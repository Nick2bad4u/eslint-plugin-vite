# require-vitest-coverage-provider-when-enabled

Require explicit `test.coverage.provider` when coverage is enabled.

> **Rule catalog ID:** R043

## Targeted pattern scope

- `vitest.config.*`
- `vitest.workspace.*`
- `vite.config.*` when Vitest coverage is configured
- `test.coverage.enabled: true`

## What this rule reports

This rule reports enabled coverage blocks that omit `test.coverage.provider`.

## Why this rule exists

Coverage provider selection impacts instrumentation behavior and output consistency.
Making it explicit in shared config avoids hidden defaults and cross-environment drift.

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
            provider: "v8",
        },
    },
});
```

## Behavior and migration notes

- this rule checks static enabled/provider values only
- it reports once per coverage scope missing a provider

## ESLint flat config example

```ts
import vite from "eslint-plugin-vite";

export default [vite.configs.strict, vite.configs.vitest];
```

## When not to use it

Disable this rule only if provider configuration is intentionally delegated to runtime-only flags.

## Package documentation

- [Vitest config reference](https://vitest.dev/config/)

## Further reading

- [require-vitest-coverage-reporter-when-enabled](./require-vitest-coverage-reporter-when-enabled.md)
