# no-disabled-vitest-isolation

Disallow `test.isolate: false` in Vitest configuration.

> **Rule catalog ID:** R020

## Targeted pattern scope

- `vitest.config.*`
- `vitest.workspace.*`
- `vite.config.*` when a Vitest `test` block is used
- root and inline project `test.isolate`

## What this rule reports

This rule reports explicit `test.isolate: false` assignments.

## Why this rule exists

Vitest defaults `isolate` to `true` to keep test files separated.
Turning isolation off can leak runtime state between files and make failures order-dependent.

This plugin targets robust Vite/Vitest configuration guardrails, so flagging committed disabled-isolation config is a high-signal safety check.

## ❌ Incorrect

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        isolate: false,
    },
});
```

## ✅ Correct

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        isolate: true,
    },
});
```

## Behavior and migration notes

- this rule only reports explicit `false` assignments
- it does not require setting `isolate` when omitted
- if you intentionally disable isolation for a specific local workflow, prefer temporary CLI or local-only overrides instead of committing the setting globally

## ESLint flat config example

```ts
import vite from "eslint-plugin-vite";

export default [vite.configs.strict, vite.configs.vitest];
```

## When not to use it

Disable this rule only if your suite intentionally relies on shared global state between files and you accept increased flake risk.

## Package documentation

- [Vitest config reference](https://vitest.dev/config/)
- [Vitest `isolate` option](https://vitest.dev/config/#isolate)

## Further reading

- [no-unsafe-vitest-flags](./no-unsafe-vitest-flags.md)
- [no-zero-vitest-timeout](./no-zero-vitest-timeout.md)
