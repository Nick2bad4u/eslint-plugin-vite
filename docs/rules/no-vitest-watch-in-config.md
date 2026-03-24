# no-vitest-watch-in-config

Disallow committed `test.watch: true` in Vitest config.

> **Rule catalog ID:** R036

## Targeted pattern scope

- `vitest.config.*`
- `vitest.workspace.*`
- `vite.config.*` when Vitest `test.watch` is configured

## What this rule reports

This rule reports explicit `test.watch: true` assignments.

## Why this rule exists

Watch mode is typically a local-development behavior.
Committing it into shared config can create CI/developer-environment drift and surprising execution behavior.

## ❌ Incorrect

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        watch: true,
    },
});
```

## ✅ Correct

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        watch: false,
    },
});
```

## Behavior and migration notes

- this rule reports only explicit `true`
- local watch workflows should prefer CLI flags or local-only overrides

## ESLint flat config example

```ts
import vite from "@typpi/eslint-plugin-vite";

export default [vite.configs.strict, vite.configs.vitest];
```

## When not to use it

Disable this rule only if your team intentionally commits watch mode in shared config and accepts environment-specific behavior.

## Package documentation

- [Vitest config reference](https://vitest.dev/config/)

## Further reading

- [no-vitest-ui-in-config](./no-vitest-ui-in-config.md)
