# no-vitest-env-leakage-combo

Disallow risky Vitest state-leakage combos that mix `globals: true`, `isolate: false`, and disabled unstub flags.

> **Rule catalog ID:** R057

## Targeted pattern scope

- `vitest.config.*`
- `vitest.workspace.*`
- `vite.config.*` when Vitest test options are configured
- `test.globals`
- `test.isolate`
- `test.unstubGlobals`
- `test.unstubEnvs`

## What this rule reports

This rule reports test scopes that statically configure:

- `test.globals: true`
- `test.isolate: false`
- and at least one of:
  - `test.unstubGlobals: false`
  - `test.unstubEnvs: false`

## Why this rule exists

That combination makes global/environment state carry-over more likely across tests.
In shared config, this often increases flakiness and order dependence.

## ❌ Incorrect

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        globals: true,
        isolate: false,
        unstubGlobals: false,
    },
});
```

## ✅ Correct

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        globals: true,
        isolate: true,
        unstubGlobals: false,
    },
});
```

## Behavior and migration notes

- this rule checks static boolean assignments only
- it reports once per affected test scope

## ESLint flat config example

```ts
import vite from "eslint-plugin-vite";

export default [vite.configs.strict, vite.configs.vitest];
```

## When not to use it

Disable this rule only if your harness intentionally relies on cross-test global/env state behavior.

## Package documentation

- [Vitest config reference](https://vitest.dev/config/)

## Further reading

- [no-vitest-unstub-globals-false](./no-vitest-unstub-globals-false.md)
- [no-vitest-unstub-envs-false](./no-vitest-unstub-envs-false.md)
