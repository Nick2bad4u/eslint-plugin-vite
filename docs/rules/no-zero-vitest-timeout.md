# no-zero-vitest-timeout

Disallow zero-valued Vitest timeout options that disable timeout safety guards.

> **Rule catalog ID:** R017

## Targeted pattern scope

- `vitest.config.*`
- `vitest.workspace.*`
- `vite.config.*` when a Vitest `test` block is used
- root `test.testTimeout`, `test.hookTimeout`, and `test.teardownTimeout`
- inline project timeout options inside `defineWorkspace([...])`
- inline project timeout options inside `test.projects: [...]`

## What this rule reports

This rule reports timeout options set to `0`:

- `test.testTimeout: 0`
- `test.hookTimeout: 0`
- `test.teardownTimeout: 0`

## Why this rule exists

Vitest documents `0` as disabling timeout enforcement.
Disabling timeout safeguards globally can hide hanging tests and stall feedback in local runs and CI.

This repository focuses on safe Vite/Vitest configuration patterns, so catching unsafe timeout disables in config files is a high-signal plugin-specific safeguard.

## ❌ Incorrect

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        testTimeout: 0,
        hookTimeout: 0,
    },
});
```

## ✅ Correct

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        testTimeout: 5_000,
        hookTimeout: 10_000,
        teardownTimeout: 10_000,
        slowTestThreshold: 300,
    },
});
```

## Behavior and migration notes

- this rule only reports explicit `0` timeout values in recognized Vitest config scopes
- it does not force custom timeout values when timeout options are omitted
- for debug-specific long timeouts, prefer separate debug config files or CLI overrides instead of committing disabled timeout safeguards

## ESLint flat config example

```ts
import vite from "eslint-plugin-vite";

export default [vite.configs.strict, vite.configs.vitest];
```

## When not to use it

Disable this rule only if your project intentionally commits globally unbounded timeout behavior and accepts the risk of indefinitely hanging test runs.

## Package documentation

- [Vitest config reference](https://vitest.dev/config/)
- [Vitest `testTimeout` option](https://vitest.dev/config/testtimeout)

## Further reading

- [vitest preset](./presets/vitest.md)
- [no-mixed-test-and-bench-apis](./no-mixed-test-and-bench-apis.md)
