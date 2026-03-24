# require-vitest-timeout-triplet

Require `test.testTimeout`, `test.hookTimeout`, and `test.teardownTimeout` to be configured together.

> **Rule catalog ID:** R072

## Targeted pattern scope

- `test.testTimeout`
- `test.hookTimeout`
- `test.teardownTimeout`

## What this rule reports

This rule reports when timeout settings are partially configured instead of provided as a complete triplet.

By default, it only reports once any of the timeout keys is configured.

## Why this rule exists

Partial timeout config often creates inconsistent behavior between test bodies, hooks, and teardown logic.

## ❌ Incorrect

```ts
export default {
    test: {
        testTimeout: 10_000,
    },
};
```

## ✅ Correct

```ts
export default {
    test: {
        testTimeout: 10_000,
        hookTimeout: 10_000,
        teardownTimeout: 10_000,
    },
};
```

## Behavior and migration notes

- Applies to Vitest config files and Vite config files that define a `test` block.
- Requires all three keys together; values are not compared by this rule.
- Default mode: `[{ mode: "whenAnyConfigured" }]`
  - only requires the triplet after at least one timeout key is configured
- Optional stricter mode: `[{ mode: "always" }]`
  - requires the triplet in Vitest-oriented config even when no timeout key is present yet

## ESLint flat config example

```ts
import vite from "@typpi/eslint-plugin-vite";

export default [vite.configs.vitest];
```

## When not to use it

Disable if your team intentionally configures only one or two timeout knobs.

## Package documentation

- [Vitest config reference](https://vitest.dev/config/)

## Further reading

- [require-vitest-slow-test-threshold](./require-vitest-slow-test-threshold.md)
- [no-vitest-timeout-triplet-mismatch](./no-vitest-timeout-triplet-mismatch.md)
