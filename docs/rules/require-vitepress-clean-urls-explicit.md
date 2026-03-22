# require-vitepress-clean-urls-explicit

Require explicit `cleanUrls` in committed VitePress config.

> **Rule catalog ID:** R067

## Targeted pattern scope

- `.vitepress/config.*`
- `cleanUrls`

## What this rule reports

This rule reports VitePress config files that do not define `cleanUrls`.

## Why this rule exists

Setting `cleanUrls` explicitly makes routing/deployment behavior intentional across environments.
Implicit defaults can lead to surprises when hosting docs on different platforms.

## ❌ Incorrect

```ts
import { defineConfig } from "vitepress";

export default defineConfig({
    title: "Project Docs",
});
```

## ✅ Correct

```ts
import { defineConfig } from "vitepress";

export default defineConfig({
    title: "Project Docs",
    cleanUrls: true,
});
```

## Behavior and migration notes

- this rule only applies to `.vitepress/config.*`
- either `true` or `false` satisfies explicitness

## ESLint flat config example

```ts
import vite from "eslint-plugin-vite";

export default [vite.configs.vitepress];
```

## When not to use it

Disable this rule only if your deployment pipeline controls URL cleanliness independently and you intentionally avoid this key.

## Package documentation

- [VitePress config reference](https://vitepress.dev/reference/site-config)

## Further reading

- [require-vitepress-title-or-titletemplate](./require-vitepress-title-or-titletemplate.md)
