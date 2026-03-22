# no-vitest-unstub-globals-false

Disallow `test.unstubGlobals: false` in shared Vitest config.

> **Rule catalog ID:** R055

## Targeted pattern scope

- `vitest.config.*`
- `vitest.workspace.*`
- `vite.config.*` when Vitest test options are configured
- `test.unstubGlobals`

## What this rule reports

This rule reports explicit `test.unstubGlobals: false` assignments in supported config files.

## Why this rule exists

Stubbed globals should be restored between tests to avoid hidden state coupling.
Disabling global unstubbing can increase flakiness and order dependence.

## ❌ Incorrect

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        unstubGlobals: false,
    },
});
```

## ✅ Correct

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        unstubGlobals: true,
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

Disable this rule only if global stubbing lifecycle is controlled by external harness behavior and this flag is intentionally false.

## Package documentation

- [Vitest config reference](https://vitest.dev/config/)

## Further reading

- [no-vitest-unstub-envs-false](./no-vitest-unstub-envs-false.md)
