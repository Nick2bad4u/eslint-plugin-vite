# no-deprecated-config-options

Disallow deprecated Vite config options and deprecated config values that now have clearer replacements.

> **Rule catalog ID:** R010

## Targeted pattern scope

- `vite.config.*`
- `vitest.config.*` when it also carries top-level Vite options
- nested config paths such as `build.*`, `optimizeDeps.*`, and `worker.*`

## What this rule reports

This rule reports deprecated Vite config paths and values that still parse today but are documented as migration targets:

- `esbuild`
- `build.polyfillModulePreload`
- `build.rollupOptions`
- `build.minify: "esbuild"`
- `optimizeDeps.disabled`
- `optimizeDeps.esbuildOptions`
- `worker.rollupOptions`

## Why this rule exists

Deprecated config keys keep old behavior alive in the short term, but they also make upgrades noisier and reviews harder.

When Vite introduces a replacement such as `rolldownOptions` or `oxc`, that newer shape becomes the path that receives future fixes, docs updates, and ecosystem examples.

## ❌ Incorrect

```ts
import { defineConfig } from "vite";

export default defineConfig({
    build: {
        rollupOptions: {
            input: "index.html",
        },
        minify: "esbuild",
        polyfillModulePreload: false,
    },
    optimizeDeps: {
        disabled: true,
    },
});
```

## ✅ Correct

```ts
import { defineConfig } from "vite";

export default defineConfig({
    build: {
        modulePreload: {
            polyfill: false,
        },
        minify: "oxc",
        rolldownOptions: {
            input: "index.html",
        },
    },
    optimizeDeps: {
        include: ["legacy-cjs-dep"],
        noDiscovery: true,
    },
    oxc: {
        jsx: {
            runtime: "classic",
        },
    },
    worker: {
        rolldownOptions: {
            output: {
                sourcemap: true,
            },
        },
    },
});
```

## Behavior and migration notes

- some replacements are direct key renames, such as `build.rollupOptions` → `build.rolldownOptions`
- others require a real migration, such as `optimizeDeps.disabled`, which should usually become `optimizeDeps.noDiscovery` plus explicit `include` entries
- this rule only reports deprecated config surfaces that Vite already documents as deprecated today

## ESLint flat config example

```ts
import vite from "@typpi/eslint-plugin-vite";

export default [vite.configs.configs, vite.configs.strict];
```

## When not to use it

Disable this rule temporarily if you are intentionally carrying deprecated config syntax during a staged migration and want to defer the cleanup to a later change.

## Package documentation

- [Vite config reference](https://vite.dev/config/)
- [Vite build options](https://vite.dev/config/build-options)
- [Vite dependency optimization options](https://vite.dev/config/dep-optimization-options)
- [Vite worker options](https://vite.dev/config/worker-options)

## Further reading

- [configs preset](./presets/configs.md)
- [strict preset](./presets/strict.md)
