# no-empty-ssr-noexternal

Disallow empty `ssr.noExternal` arrays in committed Vite config.

> **Rule catalog ID:** R061

## Targeted pattern scope

- `vite.config.*`
- `ssr.noExternal`

## What this rule reports

This rule reports explicit `ssr.noExternal: []` assignments in supported config files.

## Why this rule exists

An empty `ssr.noExternal` list is effectively a no-op and often indicates unfinished tuning.
Removing no-op config improves signal and keeps intent clear.

## ❌ Incorrect

```ts
import { defineConfig } from "vite";

export default defineConfig({
    ssr: {
        noExternal: [],
    },
});
```

## ✅ Correct

```ts
import { defineConfig } from "vite";

export default defineConfig({
    ssr: {
        noExternal: ["some-dep"],
    },
});
```

## Behavior and migration notes

- this rule checks static array literals only
- remove `ssr.noExternal` entirely when unused

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

- [no-empty-ssr-external](./no-empty-ssr-external.md)
