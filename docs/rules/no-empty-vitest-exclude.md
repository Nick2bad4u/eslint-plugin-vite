# no-empty-vitest-exclude

Disallow empty root-level `test.exclude` arrays in Vitest config.

> **Rule catalog ID:** R027

## Targeted pattern scope

- `vitest.config.*`
- `vite.config.*` when a root Vitest `test` block is used
- root-level `test.exclude` only

## What this rule reports

This rule reports explicit root-level `test.exclude: []` assignments.

## Why this rule exists

An empty root exclude list is usually a no-op artifact left from config refactors.
Flagging it keeps shared config intentional and avoids misleading “configured but ineffective” filtering.

## ❌ Incorrect

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        exclude: [],
    },
});
```

## ✅ Correct

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        exclude: ["dist/**"],
    },
});
```

## Behavior and migration notes

- this rule checks only static empty arrays
- it intentionally targets root `test.exclude`; use `no-empty-vitest-project-exclude` for project-level entries

## ESLint flat config example

```ts
import vite from "@typpi/eslint-plugin-vite";

export default [vite.configs.strict, vite.configs.vitest];
```

## When not to use it

Disable this rule only if you intentionally keep a root empty exclude array in committed config as a style placeholder.

## Package documentation

- [Vitest config reference](https://vitest.dev/config/)

## Further reading

- [no-empty-vitest-project-exclude](./no-empty-vitest-project-exclude.md)
- [no-empty-vitest-include](./no-empty-vitest-include.md)
