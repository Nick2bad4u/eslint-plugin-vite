# no-vitest-bail-and-retry-conflict

Disallow conflicting `test.bail` + `test.retry` combinations in the same Vitest test scope.

> **Rule catalog ID:** R040

## Targeted pattern scope

- `vitest.config.*`
- `vitest.workspace.*`
- `vite.config.*` when Vitest options are configured
- same `test` object containing enabled `bail` and enabled `retry`

## What this rule reports

This rule reports when both are enabled in the same scope:

- `test.bail` (`true` or `> 0`)
- `test.retry` (`> 0`)

## Why this rule exists

Bail and retry represent opposing failure strategies.
Combining both often creates noisy, hard-to-interpret failure behavior.

## ❌ Incorrect

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        bail: 1,
        retry: 2,
    },
});
```

## ✅ Correct

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        bail: 0,
        retry: 2,
    },
});
```

## Behavior and migration notes

- this rule checks static values only
- it reports once per conflicting test scope

## ESLint flat config example

```ts
import vite from "@typpi/eslint-plugin-vite";

export default [vite.configs.strict, vite.configs.vitest];
```

## When not to use it

Disable this rule only if your project intentionally combines bail and retry semantics and the behavior is explicitly documented.

## Package documentation

- [Vitest config reference](https://vitest.dev/config/)

## Further reading

- [require-vitest-sequence-seed-when-shuffle](./require-vitest-sequence-seed-when-shuffle.md)
