# no-vitepress-empty-head

Disallow empty `head` arrays in committed VitePress config.

> **Rule catalog ID:** R065

## Targeted pattern scope

- `.vitepress/config.*`
- `head`

## What this rule reports

This rule reports static empty-array assignments like `head: []` in VitePress config files.

## Why this rule exists

An explicit empty `head` array is usually placeholder noise and can hide intended metadata setup.
Keeping `head` either populated or omitted improves config clarity.

## ❌ Incorrect

```ts
import { defineConfig } from "vitepress";

export default defineConfig({
    head: [],
});
```

## ✅ Correct

```ts
import { defineConfig } from "vitepress";

export default defineConfig({
    head: [["meta", { name: "description", content: "Docs" }]],
});
```

## Behavior and migration notes

- this rule only applies to `.vitepress/config.*`
- it checks static array literals only

## ESLint flat config example

```ts
import vite from "eslint-plugin-vite";

export default [vite.configs.vitepress];
```

## When not to use it

Disable this rule only if explicit empty `head` arrays are intentional in your project templates.

## Package documentation

- [VitePress config reference](https://vitepress.dev/reference/site-config)

## Further reading

- [no-vitepress-empty-theme-config](./no-vitepress-empty-theme-config.md)
