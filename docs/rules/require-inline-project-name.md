# require-inline-project-name

Require inline Vitest project definitions to declare a project name.

> **Rule catalog ID:** R014

## Targeted pattern scope

- `vitest.workspace.*`
- `vitest.config.*`
- `vite.config.*` when Vitest uses `test.projects`
- inline project entries inside `defineWorkspace([...])`
- inline project entries inside `test.projects: [...]`

## What this rule reports

This rule reports inline project definitions that do not declare a project name, usually under `test.name`.

It covers both plain object entries and wrapped entries such as `defineProject({...})`.

## Why this rule exists

Vitest recommends defining a name for inline project configs.
When a project name is omitted, Vitest falls back to generated numbering for inline entries, which makes CLI targeting and test output harder to read.

A stable explicit name improves:

- `vitest --project <name>` filtering
- reporter output and debugging
- multi-project maintenance in monorepos and mixed browser/node setups

## ❌ Incorrect

```ts
import { defineConfig } from "vite";

export default defineConfig({
    test: {
        projects: [
            {
                test: {
                    environment: "happy-dom",
                    include: ["tests/**/*.browser.test.ts"],
                },
            },
        ],
    },
});
```

## ✅ Correct

```ts
import { defineConfig } from "vite";

export default defineConfig({
    test: {
        projects: [
            {
                test: {
                    environment: "happy-dom",
                    include: ["tests/**/*.browser.test.ts"],
                    name: {
                        label: "browser",
                        color: "green",
                    },
                },
            },
        ],
    },
});
```

## Behavior and migration notes

- `test.name: "unit"` and `test.name: { label: "unit", color: "green" }` are both accepted
- this rule only checks inline project objects, not project names inferred from glob patterns or package names
- the rule accepts legacy top-level `name` properties when they are already present, but current Vitest examples typically place the name under `test.name`

## ESLint flat config example

```ts
import vite from "@typpi/eslint-plugin-vite";

export default [vite.configs.recommended, vite.configs.vitest];
```

## When not to use it

Disable this rule only if your team intentionally accepts Vitest's generated numeric names for inline project entries and does not rely on stable project labels.

## Package documentation

- [Vitest projects guide](https://vitest.dev/guide/projects)

## Further reading

- [vitest preset](./presets/vitest.md)
- [workspace-unique-project-name](./workspace-unique-project-name.md)
- [prefer-define-project](./prefer-define-project.md)
