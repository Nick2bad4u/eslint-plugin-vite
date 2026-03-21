# no-empty-env-prefix

Disallow empty `envPrefix` values that would expose every environment variable to `import.meta.env`.

> **Rule catalog ID:** R004

## Targeted pattern scope

- `vite.config.*`
- `vitest.config.*` when Vite config options are reused there

## What this rule reports

This rule reports `envPrefix` values like:

- `""`
- `["VITE_", ""]`

## Why this rule exists

`envPrefix` is a boundary between public browser values and private process environment values.

An empty prefix removes that boundary.

## ❌ Incorrect

```ts
import { defineConfig } from "vite";

export default defineConfig({
    envPrefix: "",
});
```

## ✅ Correct

```ts
import { defineConfig } from "vite";

export default defineConfig({
    envPrefix: "VITE_",
});
```

```ts
import { defineConfig } from "vite";

export default defineConfig({
    envPrefix: ["VITE_", "PUBLIC_"],
});
```

## Behavior and migration notes

- choose explicit public prefixes instead of trying to expose everything
- if you need server-only access, keep that logic outside browser bundles

## ESLint flat config example

```ts
import vite from "eslint-plugin-vite";

export default [vite.configs.configs];
```

## When not to use it

Disable this rule only if your repository intentionally exposes every environment variable to browser code.

## Package documentation

- [Vite env variables and modes](https://vite.dev/guide/env-and-mode)
- [Vite shared config options](https://vite.dev/config/shared-options)

## Further reading

- [configs preset](./presets/configs.md)
- [no-restricted-import-meta-env](./no-restricted-import-meta-env.md)
