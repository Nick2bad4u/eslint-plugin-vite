# prefer-define-project

Prefer `defineProject(...)` over `defineConfig(...)` for inline Vitest project entries.

> **Rule catalog ID:** R008

## Targeted pattern scope

- `vitest.workspace.*`
- `vitest.config.*`
- `vite.config.*` when Vitest uses `test.projects`
- inline `defineWorkspace([...])` project arrays
- inline `test.projects: [...]` arrays

## What this rule reports

This rule reports `defineConfig(...)` calls used directly inside inline Vitest project arrays.

## Why this rule exists

`defineProject(...)` communicates that the object is a project entry, not a top-level Vitest config export.

That makes workspace intent easier to read in reviews and keeps the project API explicit.

## ❌ Incorrect

```ts
import { defineConfig, defineWorkspace } from "vitest/config";

export default defineWorkspace([
    defineConfig({
        test: {
            name: "browser",
        },
    }),
]);
```

## ✅ Correct

```ts
import { defineProject, defineWorkspace } from "vitest/config";

export default defineWorkspace([
    defineProject({
        test: {
            name: "browser",
        },
    }),
]);
```

## Behavior and migration notes

- this rule only targets inline project entries
- top-level `vitest.config.*` files can still use `defineConfig(...)`

## ESLint flat config example

```ts
import vite from "eslint-plugin-vite";

export default [vite.configs.vitest];
```

## When not to use it

Disable this rule if your repository intentionally treats inline workspace entries and top-level configs as the same abstraction.

## Package documentation

- [Vitest projects guide](https://vitest.dev/guide/projects)

## Further reading

- [vitest preset](./presets/vitest.md)
- [workspace-unique-project-name](./workspace-unique-project-name.md)
