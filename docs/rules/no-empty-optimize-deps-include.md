# no-empty-optimize-deps-include

Disallow empty `optimizeDeps.include` arrays in committed Vite config.

> **Rule catalog ID:** R059

## Targeted pattern scope

- `vite.config.*`
- `optimizeDeps.include`

## What this rule reports

This rule reports explicit `optimizeDeps.include: []` assignments in supported config files.

## Why this rule exists

An empty include list is a no-op and usually represents stale or accidental config.
Keeping optimize-deps settings explicit improves readability and intent.

## ❌ Incorrect

```ts
import { defineConfig } from "vite";

export default defineConfig({
    optimizeDeps: {
        include: [],
    },
});
```

## ✅ Correct

```ts
import { defineConfig } from "vite";

export default defineConfig({
    optimizeDeps: {
        include: ["react"],
    },
});
```

## Behavior and migration notes

- this rule checks static array literals only
- remove the option entirely when you have no entries

## ESLint flat config example

```ts
import vite from "eslint-plugin-vite";

export default [vite.configs.configs];
```

## When not to use it

Disable this rule only if your team intentionally uses explicit empty arrays as placeholders.

## Package documentation

- [Vite dep optimization options](https://vite.dev/config/dep-optimization-options)

## Further reading

- [no-empty-optimize-deps-exclude](./no-empty-optimize-deps-exclude.md)
