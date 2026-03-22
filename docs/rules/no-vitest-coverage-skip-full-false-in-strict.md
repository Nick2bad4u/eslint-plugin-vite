# no-vitest-coverage-skip-full-false-in-strict

Disallow `test.coverage.skipFull: false` in strict-profile shared Vitest config.

> **Rule catalog ID:** R049

## Targeted pattern scope

- `vitest.config.*`
- `vitest.workspace.*`
- `vite.config.*` when Vitest coverage options are configured
- `test.coverage.skipFull`

## What this rule reports

This rule reports explicit `test.coverage.skipFull: false` assignments in supported config files.

## Why this rule exists

For stricter shared configs, including fully covered files can create noisy reports that obscure useful deltas.
This rule helps keep coverage output focused on actionable gaps.

## ❌ Incorrect

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        coverage: {
            skipFull: false,
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
            skipFull: true,
        },
    },
});
```

## Behavior and migration notes

- this rule checks static boolean assignments only
- it targets committed config files, not arbitrary source modules

## ESLint flat config example

```ts
import vite from "eslint-plugin-vite";

export default [vite.configs.strict, vite.configs.vitest];
```

## When not to use it

Disable this rule only if full-file coverage verbosity is intentionally required in your reporting workflow.

## Package documentation

- [Vitest config reference](https://vitest.dev/config/)

## Further reading

- [no-vitest-coverage-reporter-text-only](./no-vitest-coverage-reporter-text-only.md)
