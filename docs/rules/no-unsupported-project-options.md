# no-unsupported-project-options

Disallow documented root-only Vitest options inside project configs.

> **Rule catalog ID:** R015

## Targeted pattern scope

- `vitest.config.*`
- `vitest.workspace.*`
- `vite.config.*` when Vitest project arrays are defined there
- `defineProject({...})`
- inline project entries inside `defineWorkspace([...])`
- inline project entries inside `test.projects: [...]`

## What this rule reports

This rule reports documented root-only project options when they appear inside a project config:

- `test.coverage`
- `test.reporters`
- `test.resolveSnapshotPath`

## Why this rule exists

Vitest project configs do not support every root-level option.
The upstream docs call out `coverage`, `reporters`, and `resolveSnapshotPath` as important examples that only work at the root config level.

TypeScript users often catch this through `defineProject(...)` types, but JavaScript configs and mixed config setups benefit from a dedicated lint rule that fails earlier and more explicitly.

## ❌ Incorrect

```ts
import { defineProject } from "vitest/config";

export default defineProject({
    test: {
        coverage: {
            provider: "v8",
        },
        name: "unit",
    },
});
```

## ✅ Correct

```ts
import { defineConfig, defineProject } from "vitest/config";

export default defineConfig({
    test: {
        coverage: {
            provider: "v8",
        },
        projects: [
            defineProject({
                test: {
                    environment: "node",
                    name: "unit",
                },
            }),
        ],
    },
});
```

## Behavior and migration notes

- move root-only options to the root Vitest config, not the individual project entry
- this rule intentionally focuses on the documented root-only options with the clearest static behavior
- top-level Vite options such as `resolve.alias` remain valid outside the nested `test` project config object

## ESLint flat config example

```ts
import vite from "eslint-plugin-vite";

export default [vite.configs.recommended, vite.configs.vitest];
```

## When not to use it

Disable this rule only if your repository deliberately keeps these unsupported settings in project configs for compatibility experiments and you accept that Vitest only respects them at the root level.

## Package documentation

- [Vitest projects guide](https://vitest.dev/guide/projects)
- [Vitest config reference](https://vitest.dev/config/)

## Further reading

- [vitest preset](./presets/vitest.md)
- [prefer-define-project](./prefer-define-project.md)
