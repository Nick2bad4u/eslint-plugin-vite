# no-vitest-timeout-triplet-mismatch

Disallow inconsistent Vitest timeout triplet ordering.

> **Rule catalog ID:** R069

## Targeted pattern scope

- `test.testTimeout`
- `test.hookTimeout`
- `test.teardownTimeout`

## What this rule reports

This rule reports when all three timeout values are static numbers and `teardownTimeout` is lower than `hookTimeout`.

## Why this rule exists

If teardown has less time than hooks, shutdown and cleanup can fail under load and produce misleading flakes.

## ❌ Incorrect

```ts
export default {
    test: {
        testTimeout: 20_000,
        hookTimeout: 10_000,
        teardownTimeout: 5_000,
    },
};
```

## ✅ Correct

```ts
export default {
    test: {
        testTimeout: 20_000,
        hookTimeout: 10_000,
        teardownTimeout: 10_000,
    },
};
```

## Behavior and migration notes

- Only checks static numeric literals.
- Only reports when all three timeout keys are present.

## ESLint flat config example

```ts
import vite from "eslint-plugin-vite";

export default [vite.configs.vitest];
```

## When not to use it

Disable if your workflow intentionally sets teardown lower than hook timeout.

## Package documentation

- [Vitest config reference](https://vitest.dev/config/)

## Further reading

- [require-vitest-timeout-triplet](./require-vitest-timeout-triplet.md)
- [no-zero-vitest-timeout](./no-zero-vitest-timeout.md)
