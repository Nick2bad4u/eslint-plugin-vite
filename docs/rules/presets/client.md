# 🌐 Client

Use `vite.configs.client` when your app relies on `import.meta.env` and `import.meta.glob` in browser-bound code.

This preset is useful alongside `recommended`, especially in front-end application codebases.

## Flat config

```ts
import vite from "@typpi/eslint-plugin-vite";

export default [vite.configs.recommended, vite.configs.client];
```

## When to use it

- your browser code reads public env variables
- your app uses file-based routing, content loading, or module discovery through `import.meta.glob`
- you want to enforce a clean public env-key policy

## Rules in this preset

{/*begin-generated-preset-rules*/}
| Rule                                                                                | Fix |
| :---------------------------------------------------------------------------------- | :-: |
| [`vite/import-meta-glob-literal`](../import-meta-glob-literal.md)                   |  —  |
| [`vite/no-dynamic-import-meta-env-access`](../no-dynamic-import-meta-env-access.md) |  —  |
| [`vite/no-restricted-import-meta-env`](../no-restricted-import-meta-env.md)         |  —  |
{/*end-generated-preset-rules*/}
