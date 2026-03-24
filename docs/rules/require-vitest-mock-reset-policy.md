# require-vitest-mock-reset-policy

Require at least one enabled Vitest mock reset policy (`clearMocks`, `resetMocks`, or `restoreMocks`).

> **Rule catalog ID:** R053

## Targeted pattern scope

- `vitest.config.*`
- `vitest.workspace.*`
- `vite.config.*` when Vitest test options are configured
- `test.clearMocks`
- `test.resetMocks`
- `test.restoreMocks`

## What this rule reports

This rule reports `test` configurations that do not enable any of these policies as `true`:

- `clearMocks`
- `resetMocks`
- `restoreMocks`

## Why this rule exists

Mock state can leak between tests when no reset/restore strategy is configured.
A shared policy reduces nondeterminism and cross-suite interference.

## ❌ Incorrect

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        globals: true,
    },
});
```

## ✅ Correct

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        restoreMocks: true,
    },
});
```

## Behavior and migration notes

- this rule checks static boolean values only
- it reports once per test scope missing a mock reset policy

## ESLint flat config example

```ts
import vite from "@typpi/eslint-plugin-vite";

export default [vite.configs.strict, vite.configs.vitest];
```

## When not to use it

Disable this rule only if mock lifecycle is fully controlled elsewhere and this config intentionally omits those flags.

## Package documentation

- [Vitest config reference](https://vitest.dev/config/)

## Further reading

- [prefer-vitest-restore-mocks](./prefer-vitest-restore-mocks.md)
