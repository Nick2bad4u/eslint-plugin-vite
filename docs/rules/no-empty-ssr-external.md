# no-empty-ssr-external

Disallow empty `ssr.external` arrays in committed Vite config.

> **Rule catalog ID:** R062

## Targeted pattern scope

- `vite.config.*`
- `ssr.external`

## What this rule reports

This rule reports explicit `ssr.external: []` assignments in supported config files.

## Why this rule exists

An empty `ssr.external` array does not change Vite behavior and usually reflects stale config scaffolding.
Removing no-op settings keeps SSR config easier to audit.

## ❌ Incorrect

```ts
import { defineConfig } from "vite";

export default defineConfig({
    ssr: {
        external: [],
    },
});
```

## ✅ Correct

```ts
import { defineConfig } from "vite";

export default defineConfig({
    ssr: {
        external: ["react"],
    },
});
```

## Behavior and migration notes

- this rule checks static array literals only
- remove `ssr.external` entirely when unused

## ESLint flat config example

```ts
import vite from "eslint-plugin-vite";

export default [vite.configs.configs];
```

## When not to use it

Disable this rule only if your team intentionally keeps explicit empty placeholders in SSR config.

## Package documentation

- [Vite SSR options](https://vite.dev/config/ssr-options)

## Further reading

- [no-empty-ssr-noexternal](./no-empty-ssr-noexternal.md)
