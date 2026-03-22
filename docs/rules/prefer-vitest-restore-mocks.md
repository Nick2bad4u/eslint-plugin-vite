# prefer-vitest-restore-mocks

Prefer `test.restoreMocks: true` in shared Vitest config.

> **Rule catalog ID:** R054

## Targeted pattern scope

- `vitest.config.*`
- `vitest.workspace.*`
- `vite.config.*` when Vitest test options are configured
- `test.clearMocks`
- `test.resetMocks`
- `test.restoreMocks`

## What this rule reports

This rule reports configurations that enable `clearMocks` or `resetMocks` without also enabling `restoreMocks`.

## Why this rule exists

`restoreMocks` provides stronger isolation by restoring spy/mock implementations, not just resetting call state.
In shared config, this tends to reduce subtle cross-test behavior leaks.

## ❌ Incorrect

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        clearMocks: true,
    },
});
```

## ✅ Correct

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        clearMocks: true,
        restoreMocks: true,
    },
});
```

## Behavior and migration notes

- this rule checks static boolean values only
- it reports once per test scope where clear/reset is enabled without restore

## ESLint flat config example

```ts
import vite from "eslint-plugin-vite";

export default [vite.configs.strict, vite.configs.vitest];
```

## When not to use it

Disable this rule only if your project deliberately avoids restore semantics for performance or compatibility reasons.

## Package documentation

- [Vitest config reference](https://vitest.dev/config/)

## Further reading

- [require-vitest-mock-reset-policy](./require-vitest-mock-reset-policy.md)
