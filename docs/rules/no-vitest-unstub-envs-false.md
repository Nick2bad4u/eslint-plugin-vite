# no-vitest-unstub-envs-false

Disallow `test.unstubEnvs: false` in shared Vitest config.

> **Rule catalog ID:** R056

## Targeted pattern scope

- `vitest.config.*`
- `vitest.workspace.*`
- `vite.config.*` when Vitest test options are configured
- `test.unstubEnvs`

## What this rule reports

This rule reports explicit `test.unstubEnvs: false` assignments in supported config files.

## Why this rule exists

Stubbed environment variables should be restored between tests to avoid state leakage across suites.
Disabling env unstubbing can create order-dependent behavior.

## ❌ Incorrect

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        unstubEnvs: false,
    },
});
```

## ✅ Correct

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        unstubEnvs: true,
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

Disable this rule only if env stubbing lifecycle is handled externally and this flag is intentionally false.

## Package documentation

- [Vitest config reference](https://vitest.dev/config/)

## Further reading

- [no-vitest-unstub-globals-false](./no-vitest-unstub-globals-false.md)
