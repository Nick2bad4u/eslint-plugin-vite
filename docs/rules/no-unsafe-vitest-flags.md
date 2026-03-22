# no-unsafe-vitest-flags

Disallow unsafe Vitest execution flags that can hide failing tests or runtime errors.

> **Rule catalog ID:** R018

## Targeted pattern scope

- `vitest.config.*`
- `vitest.workspace.*`
- `vite.config.*` when a Vitest `test` block is used
- root and inline project `test` option objects

## What this rule reports

This rule reports:

- `test.allowOnly: true`
- `test.dangerouslyIgnoreUnhandledErrors: true`

## Why this rule exists

These flags weaken core test safety guarantees:

- `allowOnly: true` can allow focused tests (`.only`) to pass while silently skipping the rest of the suite
- `dangerouslyIgnoreUnhandledErrors: true` can hide asynchronous failures and produce misleading green runs

This plugin is focused on robust Vite/Vitest configuration quality, so catching these config-level hazards is a repository-specific, high-signal check.

## ❌ Incorrect

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        allowOnly: true,
        dangerouslyIgnoreUnhandledErrors: true,
    },
});
```

## ✅ Correct

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        allowOnly: false,
        dangerouslyIgnoreUnhandledErrors: false,
    },
});
```

## Behavior and migration notes

- this rule only reports explicit `true` toggles for unsafe flags
- if these options are omitted, Vitest defaults still apply
- if you need temporary local overrides, prefer ephemeral CLI/dev-only config branching rather than committed repository config

## ESLint flat config example

```ts
import vite from "eslint-plugin-vite";

export default [vite.configs.strict, vite.configs.vitest];
```

## When not to use it

Disable this rule only if your test strategy intentionally allows focused test execution or ignored unhandled errors in committed config and you accept that risk.

## Package documentation

- [Vitest config reference](https://vitest.dev/config/)
- [Vitest `allowOnly` option](https://vitest.dev/config/)

## Further reading

- [vitest preset](./presets/vitest.md)
- [no-zero-vitest-timeout](./no-zero-vitest-timeout.md)
