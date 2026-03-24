# config-require-define-config

Require Vite config files to export `defineConfig(...)`, `mergeConfig(...)`, or `defineWorkspace(...)` instead of raw objects.

> **Rule catalog ID:** R001

## Targeted pattern scope

- `vite.config.*`
- `vitest.config.*`
- `vitest.workspace.*`

## What this rule reports

This rule reports default exports in recognized config files when they are raw objects, arrays, or other expressions instead of the helper APIs Vite and Vitest document for config authoring.

## Why this rule exists

The helper wrappers make intent explicit and keep config authoring aligned with the documented APIs.

That matters for:

- editor inference
- ecosystem examples and copy-pasteability
- composing configs with `mergeConfig(...)`
- using the dedicated workspace helper in `vitest.workspace.*`

## ❌ Incorrect

```ts
export default {
    resolve: {
        alias: {
            "@": "/src",
        },
    },
};
```

```ts
export default [{
    test: {
        name: "unit",
    },
}];
```

## ✅ Correct

```ts
import { defineConfig } from "vite";

export default defineConfig({
    resolve: {
        alias: {
            "@": "/src",
        },
    },
});
```

```ts
import { defineWorkspace } from "vitest/config";

export default defineWorkspace([
    {
        test: {
            name: "unit",
        },
    },
]);
```

## Behavior and migration notes

- `vite.config.*` and `vitest.config.*` accept either `defineConfig(...)` or `mergeConfig(...)`.
- `vitest.workspace.*` should use `defineWorkspace(...)`.
- This rule does not rewrite imports automatically because the correct helper depends on the file type.

## ESLint flat config example

```ts
import vite from "@typpi/eslint-plugin-vite";

export default [vite.configs.configs];
```

## When not to use it

Disable this rule only if your repository intentionally uses a non-standard config-export pattern and your team documents that deviation.

## Package documentation

- [Vite config reference](https://vite.dev/config/)
- [Vitest config reference](https://vitest.dev/config/)
- [Vitest projects and workspaces](https://vitest.dev/guide/projects)

## Further reading

- [Overview](./overview.md)
- [configs preset](./presets/configs.md)
- [vitest preset](./presets/vitest.md)
