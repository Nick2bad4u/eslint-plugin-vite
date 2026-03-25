# 📚 VitePress

Use `vite.configs.vitepress` when your docs site is powered by VitePress and uses Vite client APIs such as `import.meta.env` and `import.meta.glob`.

This preset combines client-side env/glob safeguards with config checks that are also relevant in `.vitepress/config.*`.

## Flat config

```ts
import vite from "@typpi/eslint-plugin-vite";

export default [vite.configs.recommended, vite.configs.vitepress];
```

## When to use it

- your repository has a `.vitepress/config.*` file
- your VitePress theme/client code accesses `import.meta.env`
- your docs site loads modules or content with `import.meta.glob`

## Rules in this preset

<!-- begin generated preset rules -->
| Rule                                                                                              | Fix |
| :------------------------------------------------------------------------------------------------ | :-: |
| [`vite/config-require-define-config`](../config-require-define-config.md)                         |  —  |
| [`vite/import-meta-glob-literal`](../import-meta-glob-literal.md)                                 |  —  |
| [`vite/no-dynamic-import-meta-env-access`](../no-dynamic-import-meta-env-access.md)               |  —  |
| [`vite/no-empty-env-prefix`](../no-empty-env-prefix.md)                                           |  —  |
| [`vite/no-restricted-import-meta-env`](../no-restricted-import-meta-env.md)                       |  —  |
| [`vite/no-import-meta-env-in-config`](../no-import-meta-env-in-config.md)                         |  —  |
| [`vite/no-vitepress-empty-theme-config`](../no-vitepress-empty-theme-config.md)                   |  —  |
| [`vite/no-vitepress-empty-head`](../no-vitepress-empty-head.md)                                   |  —  |
| [`vite/require-vitepress-title-or-titletemplate`](../require-vitepress-title-or-titletemplate.md) |  —  |
| [`vite/require-vitepress-clean-urls-explicit`](../require-vitepress-clean-urls-explicit.md)       |  —  |
<!-- end generated preset rules -->
