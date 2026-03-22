# no-pass-with-no-tests

Disallow `test.passWithNoTests: true` in Vitest configuration.

> **Rule catalog ID:** R022

## Targeted pattern scope

- `vitest.config.*`
- `vitest.workspace.*`
- `vite.config.*` when a Vitest `test` block is used
- root and inline project `test.passWithNoTests`

## What this rule reports

This rule reports explicit `test.passWithNoTests: true` assignments.

## Why this rule exists

`passWithNoTests` can be useful for one-off local workflows, but committing it to shared config can mask accidental test-discovery regressions.
When files are moved, globs change, or projects are misconfigured, CI can appear green while running zero tests.

This plugin focuses on safe Vite/Vitest configuration defaults, so preventing this failure-masking toggle in committed config is a high-signal check.

## ❌ Incorrect

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        passWithNoTests: true,
    },
});
```

## ✅ Correct

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        passWithNoTests: false,
    },
});
```

## Behavior and migration notes

- this rule only reports explicit `true` assignments
- it does not require setting `passWithNoTests` when omitted
- if you need local-only behavior, prefer CLI flags or local config overrides instead of committing this toggle

## ESLint flat config example

```ts
import vite from "eslint-plugin-vite";

export default [vite.configs.strict, vite.configs.vitest];
```

## When not to use it

Disable this rule only if your team intentionally accepts “green with no discovered tests” as a committed behavior.

## Package documentation

- [Vitest config reference](https://vitest.dev/config/)
- [Vitest `passWithNoTests` option](https://vitest.dev/config/#passwithnotests)

## Further reading

- [no-unsafe-vitest-flags](./no-unsafe-vitest-flags.md)
- [no-disabled-vitest-isolation](./no-disabled-vitest-isolation.md)
