# no-implicit-config-flags

Disallow implicit truthy or falsy checks for Vite config callback flags such as `isPreview` and `isSsrBuild`.

> **Rule catalog ID:** R013

## Targeted pattern scope

- `vite.config.*`
- conditional config factory functions that receive `isPreview` or `isSsrBuild`
- `if`, ternary, loop, and similar conditional tests inside the config callback

## What this rule reports

This rule reports config callback conditions such as:

- `if (isPreview) { ... }`
- `!isSsrBuild ? clientConfig : serverConfig`
- `if (process.env.CI === "true" || isPreview) { ... }`

## Why this rule exists

Vite's config callback receives `isPreview` and `isSsrBuild` as optional flags.
The Vite docs note that some tools loading a config can pass `undefined` for these values instead of a strict boolean.

That makes generic truthy or falsy checks easy to misread:

- `if (isPreview)` treats `undefined` the same as `false`
- `if (!isPreview)` treats `undefined` the same as `false`

An explicit comparison communicates intent better and prevents `undefined` from silently joining one branch.

## ❌ Incorrect

```ts
import { defineConfig } from "vite";

export default defineConfig(({ isPreview, isSsrBuild }) => {
    if (isPreview) {
        return {
            preview: {
                open: true,
            },
        };
    }

    return !isSsrBuild
        ? {
              build: {
                  sourcemap: true,
              },
          }
        : {
              build: {
                  ssr: "src/entry-server.ts",
              },
          };
});
```

## ✅ Correct

```ts
import { defineConfig } from "vite";

export default defineConfig(({ isPreview, isSsrBuild }) => {
    if (isPreview === true) {
        return {
            preview: {
                open: true,
            },
        };
    }

    return isSsrBuild === false
        ? {
              build: {
                  sourcemap: true,
              },
          }
        : {
              build: {
                  ssr: "src/entry-server.ts",
              },
          };
});
```

## Behavior and migration notes

- compare `isPreview` with `=== true` when a branch should run only during preview
- compare `isSsrBuild` with `=== true` or `=== false` when SSR and client branches must stay distinct
- this rule is intentionally scoped to Vite config callback flags, not arbitrary boolean values in the file

## ESLint flat config example

```ts
import vite from "@typpi/eslint-plugin-vite";

export default [vite.configs.configs, vite.configs.strict];
```

## When not to use it

Disable this rule only if your team intentionally treats `undefined` the same as one branch and prefers that looser conditional style.

## Package documentation

- [Vite conditional config](https://vite.dev/config/#conditional-config)

## Further reading

- [configs preset](./presets/configs.md)
- [strict preset](./presets/strict.md)
