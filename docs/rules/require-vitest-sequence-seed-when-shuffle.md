# require-vitest-sequence-seed-when-shuffle

Require `test.sequence.seed` whenever `test.sequence.shuffle` is enabled.

> **Rule catalog ID:** R035

## Targeted pattern scope

- `vitest.config.*`
- `vitest.workspace.*`
- `vite.config.*` when Vitest `test.sequence` options are used

## What this rule reports

This rule reports `test.sequence.shuffle: true` when no explicit static `test.sequence.seed` is configured.

## Why this rule exists

Shuffled test order can expose order-dependent failures, but reproducing those failures requires a deterministic seed.
This rule enforces that reproducibility guardrail.

## ❌ Incorrect

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        sequence: {
            shuffle: true,
        },
    },
});
```

## ✅ Correct

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        sequence: {
            shuffle: true,
            seed: 42,
        },
    },
});
```

## Behavior and migration notes

- the rule checks static seed values only
- it reports once when shuffle is enabled without a seed

## ESLint flat config example

```ts
import vite from "eslint-plugin-vite";

export default [vite.configs.strict, vite.configs.vitest];
```

## When not to use it

Disable this rule only if you intentionally use non-deterministic shuffled execution in committed config and accept reduced reproducibility.

## Package documentation

- [Vitest config reference](https://vitest.dev/config/)

## Further reading

- [no-vitest-file-parallelism-disabled](./no-vitest-file-parallelism-disabled.md)
