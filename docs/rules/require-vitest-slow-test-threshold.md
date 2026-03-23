# require-vitest-slow-test-threshold

Require explicit `test.slowTestThreshold` in committed Vitest config.

> **Rule catalog ID:** R071

## Targeted pattern scope

- `test.slowTestThreshold`

## What this rule reports

This rule reports Vitest-oriented config when `test.slowTestThreshold` is omitted.

## Why this rule exists

An explicit slow-test threshold keeps performance expectations stable and avoids drifting defaults across projects.

## ❌ Incorrect

```ts
export default {
    test: {},
};
```

## ✅ Correct

```ts
export default {
    test: {
        slowTestThreshold: 250,
    },
};
```

## Behavior and migration notes

- Applies to Vitest config files and Vite config files that define a `test` block.
- Static and computed values are both accepted; this rule checks presence, not value range.

## ESLint flat config example

```ts
import vite from "eslint-plugin-vite";

export default [vite.configs.vitest];
```

## When not to use it

Disable if your project intentionally relies on Vitest defaults and does not need explicit slow-test policy.

## Package documentation

- [Vitest config reference](https://vitest.dev/config/)

## Further reading

- [require-vitest-timeout-triplet](./require-vitest-timeout-triplet.md)
- [no-zero-vitest-slow-test-threshold](./no-zero-vitest-slow-test-threshold.md)
