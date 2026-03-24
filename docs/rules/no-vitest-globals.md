# no-vitest-globals

Disallow `test.globals: true` in Vitest configuration.

> **Rule catalog ID:** R023

## Targeted pattern scope

- `vitest.config.*`
- `vitest.workspace.*`
- `vite.config.*` when a Vitest `test` block is used
- root and inline project `test.globals`

## What this rule reports

This rule reports explicit `test.globals: true` assignments.

## Why this rule exists

Enabling Vitest globals injects test APIs into global scope (`describe`, `it`, `expect`, ...).
While convenient, this can make test dependencies less explicit, complicate editor/tooling assumptions, and increase accidental coupling to ambient globals.

This plugin focuses on predictable config defaults and explicitness in Vite/Vitest projects, so flagging committed global API mode is a useful project-level guardrail.

## ❌ Incorrect

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        globals: true,
    },
});
```

## ✅ Correct

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        globals: false,
    },
});
```

## Behavior and migration notes

- this rule only reports explicit `true` assignments
- it does not require setting `globals` when omitted
- if you disable globals, import APIs explicitly in test files:

  ```ts
  import { describe, expect, it } from "vitest";
  ```

## ESLint flat config example

```ts
import vite from "@typpi/eslint-plugin-vite";

export default [vite.configs.strict, vite.configs.vitest];
```

## When not to use it

Disable this rule if your team intentionally prefers global Vitest APIs and accepts the associated implicitness trade-offs.

## Package documentation

- [Vitest config reference](https://vitest.dev/config/)
- [Vitest `globals` option](https://vitest.dev/config/#globals)

## Further reading

- [no-pass-with-no-tests](./no-pass-with-no-tests.md)
- [no-unsafe-vitest-flags](./no-unsafe-vitest-flags.md)
