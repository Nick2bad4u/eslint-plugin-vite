# no-empty-optimize-deps-exclude

Disallow empty `optimizeDeps.exclude` arrays in committed Vite config.

> **Rule catalog ID:** R060

## Targeted pattern scope

- `vite.config.*`
- `optimizeDeps.exclude`

## What this rule reports

This rule reports explicit `optimizeDeps.exclude: []` assignments in supported config files.

## Why this rule exists

An empty exclude list has no effect and often indicates unfinished or stale configuration.
Removing no-op config reduces maintenance noise.

## ❌ Incorrect

```ts
import { defineConfig } from "vite";

export default defineConfig({
    optimizeDeps: {
        exclude: [],
    },
});
```

## ✅ Correct

```ts
import { defineConfig } from "vite";

export default defineConfig({
    optimizeDeps: {
        exclude: ["some-dep"],
    },
});
```

## Behavior and migration notes

- this rule checks static array literals only
- remove the option entirely when no exclude entries are required

## ESLint flat config example

```ts
import vite from "eslint-plugin-vite";

export default [vite.configs.configs];
```

## When not to use it

Disable this rule only if explicit empty arrays are an intentional style requirement in your project.

## Package documentation

- [Vite dep optimization options](https://vite.dev/config/dep-optimization-options)

## Further reading

- [no-empty-optimize-deps-include](./no-empty-optimize-deps-include.md)
