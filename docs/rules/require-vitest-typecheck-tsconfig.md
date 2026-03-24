# require-vitest-typecheck-tsconfig

Require explicit `test.typecheck.tsconfig` when Vitest typecheck execution is enabled.

> **Rule catalog ID:** R019

## Targeted pattern scope

- `vitest.config.*`
- `vitest.workspace.*`
- `vite.config.*` when a Vitest `test` block is used
- root and inline project `test.typecheck` option objects

## What this rule reports

This rule reports `test.typecheck` blocks when:

- `enabled: true` or `only: true` is set
- and `tsconfig` is missing, empty, or not a static string path

## Why this rule exists

When Vitest typecheck is enabled, relying on implicit nearest-tsconfig discovery can be fragile in monorepos or multi-project setups.
An explicit `test.typecheck.tsconfig` path keeps typecheck scope and project resolution deterministic.

This is a Vitest config-authoring best-practice check that generic ESLint plugins do not typically cover.

## ❌ Incorrect

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        typecheck: {
            enabled: true,
        },
    },
});
```

## ✅ Correct

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        typecheck: {
            enabled: true,
            tsconfig: "./tsconfig.vitest-typecheck.json",
        },
    },
});
```

## Behavior and migration notes

- this rule does not require configuring `test.typecheck` at all
- it only applies once typecheck execution is explicitly enabled (`enabled: true` or `only: true`)
- provide a static, non-empty `tsconfig` string so review tooling can reason about the configured path

## ESLint flat config example

```ts
import vite from "@typpi/eslint-plugin-vite";

export default [vite.configs.strict, vite.configs.vitest];
```

## When not to use it

Disable this rule only if your project intentionally relies on Vitest's implicit tsconfig discovery for enabled typecheck runs and accepts that this may be less deterministic across package/workspace boundaries.

## Package documentation

- [Vitest typecheck options](https://vitest.dev/config/typecheck)
- [Vitest config reference](https://vitest.dev/config/)

## Further reading

- [no-disabled-vitest-typecheck](./no-disabled-vitest-typecheck.md)
- [vitest preset](./presets/vitest.md)
