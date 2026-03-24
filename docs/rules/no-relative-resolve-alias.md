# no-relative-resolve-alias

Disallow relative string replacements inside `resolve.alias` in Vite config files.

> **Rule catalog ID:** R006

## Targeted pattern scope

- `vite.config.*`
- shared Vite config fragments

## What this rule reports

This rule reports alias replacement strings such as `"./src"` or `"../shared"` inside `resolve.alias`.

## Why this rule exists

Vite documents filesystem alias replacements as absolute paths.

Relative replacement strings look convenient, but they are fragile and often misread as import-specifier-like paths.

## ❌ Incorrect

```ts
import { defineConfig } from "vite";

export default defineConfig({
    resolve: {
        alias: {
            "@": "./src",
        },
    },
});
```

## ✅ Correct

```ts
import path from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
    resolve: {
        alias: {
            "@": path.resolve(import.meta.dirname, "src"),
        },
    },
});
```

## Behavior and migration notes

- use `path.resolve(...)` or `fileURLToPath(new URL(..., import.meta.url))`
- keep alias replacement values explicit and absolute

## ESLint flat config example

```ts
import vite from "@typpi/eslint-plugin-vite";

export default [vite.configs.configs];
```

## When not to use it

Disable this rule only if your repository does not use filesystem alias replacements in Vite.

## Package documentation

- [Vite resolve.alias documentation](https://vite.dev/config/shared-options#resolve-alias)

## Further reading

- [configs preset](./presets/configs.md)
- [Adoption checklist](./guides/adoption-checklist.md)
