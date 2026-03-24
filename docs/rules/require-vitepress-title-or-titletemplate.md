# require-vitepress-title-or-titletemplate

Require at least one of `title` or `titleTemplate` in committed VitePress config.

> **Rule catalog ID:** R066

## Targeted pattern scope

- `.vitepress/config.*`
- `title`
- `titleTemplate`

## What this rule reports

This rule reports VitePress config files that define neither `title` nor `titleTemplate`.

## Why this rule exists

Explicit title metadata improves predictable branding and social preview behavior.
Requiring one of these fields helps avoid accidental anonymous site headers.

## ❌ Incorrect

```ts
import { defineConfig } from "vitepress";

export default defineConfig({
    description: "Project docs",
});
```

## ✅ Correct

```ts
import { defineConfig } from "vitepress";

export default defineConfig({
    title: "Project Docs",
});
```

## Behavior and migration notes

- this rule only applies to `.vitepress/config.*`
- either key satisfies the rule

## ESLint flat config example

```ts
import vite from "@typpi/eslint-plugin-vite";

export default [vite.configs.vitepress];
```

## When not to use it

Disable this rule only if title metadata is intentionally injected elsewhere and omitted from VitePress config.

## Package documentation

- [VitePress config reference](https://vitepress.dev/reference/site-config)

## Further reading

- [require-vitepress-clean-urls-explicit](./require-vitepress-clean-urls-explicit.md)
