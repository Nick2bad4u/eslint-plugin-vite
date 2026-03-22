# no-vitepress-empty-theme-config

Disallow empty `themeConfig` objects in committed VitePress config.

> **Rule catalog ID:** R064

## Targeted pattern scope

- `.vitepress/config.*`
- `themeConfig`

## What this rule reports

This rule reports static empty-object assignments like `themeConfig: {}` in VitePress config files.

## Why this rule exists

An empty `themeConfig` object is usually leftover scaffolding and adds configuration noise.
Removing it keeps intent clear and avoids misleading placeholders.

## ❌ Incorrect

```ts
import { defineConfig } from "vitepress";

export default defineConfig({
    themeConfig: {},
});
```

## ✅ Correct

```ts
import { defineConfig } from "vitepress";

export default defineConfig({
    themeConfig: {
        nav: [],
    },
});
```

## Behavior and migration notes

- this rule only applies to `.vitepress/config.*`
- it checks static object literals only

## ESLint flat config example

```ts
import vite from "eslint-plugin-vite";

export default [vite.configs.vitepress];
```

## When not to use it

Disable this rule only if your team intentionally uses empty `themeConfig` placeholders in committed templates.

## Package documentation

- [VitePress config reference](https://vitepress.dev/reference/site-config)

## Further reading

- [no-vitepress-empty-head](./no-vitepress-empty-head.md)
