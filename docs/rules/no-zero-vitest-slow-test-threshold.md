# no-zero-vitest-slow-test-threshold

Disallow `test.slowTestThreshold: 0` in Vitest configuration.

> **Rule catalog ID:** R021

## Targeted pattern scope

- `vitest.config.*`
- `vitest.workspace.*`
- `vite.config.*` when a Vitest `test` block is used
- root and inline project `test.slowTestThreshold`

## What this rule reports

This rule reports explicit `test.slowTestThreshold: 0` assignments.

## Why this rule exists

`slowTestThreshold` controls when Vitest reports slow tests.
Setting it to `0` disables practical slow-test signal and makes it harder to detect performance regressions in the suite.

This repository focuses on configuration quality, so preventing disabled slow-test reporting is a useful Vitest-specific guardrail.

## ❌ Incorrect

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        slowTestThreshold: 0,
    },
});
```

## ✅ Correct

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        slowTestThreshold: 300,
    },
});
```

## Behavior and migration notes

- this rule only reports explicit zero-valued thresholds
- it does not require setting `slowTestThreshold` when omitted
- tune the threshold to fit your environment (e.g. 300–1000 ms) rather than disabling the signal entirely

## ESLint flat config example

```ts
import vite from "eslint-plugin-vite";

export default [vite.configs.strict, vite.configs.vitest];
```

## When not to use it

Disable this rule only if your project intentionally removes slow-test reporting from committed Vitest configuration.

## Package documentation

- [Vitest config reference](https://vitest.dev/config/)
- [Vitest `slowTestThreshold` option](https://vitest.dev/config/#slowtestthreshold)

## Further reading

- [no-zero-vitest-timeout](./no-zero-vitest-timeout.md)
- [no-disabled-vitest-isolation](./no-disabled-vitest-isolation.md)
