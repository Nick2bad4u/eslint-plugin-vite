# no-vitest-ui-in-config

Disallow committed `test.ui: true` in Vitest config.

> **Rule catalog ID:** R037

## Targeted pattern scope

- `vitest.config.*`
- `vitest.workspace.*`
- `vite.config.*` when Vitest `test.ui` is configured

## What this rule reports

This rule reports explicit `test.ui: true` assignments.

## Why this rule exists

Vitest UI mode is usually intended for local interactive debugging.
Committing it as a default can cause inconsistent behavior across environments and CI.

## ❌ Incorrect

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        ui: true,
    },
});
```

## ✅ Correct

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        ui: false,
    },
});
```

## Behavior and migration notes

- this rule reports only explicit `true`
- local UI workflows should prefer CLI flags or local-only overrides

## ESLint flat config example

```ts
import vite from "eslint-plugin-vite";

export default [vite.configs.strict, vite.configs.vitest];
```

## When not to use it

Disable this rule only if your repository intentionally enables Vitest UI mode in committed shared config.

## Package documentation

- [Vitest config reference](https://vitest.dev/config/)

## Further reading

- [no-vitest-watch-in-config](./no-vitest-watch-in-config.md)
