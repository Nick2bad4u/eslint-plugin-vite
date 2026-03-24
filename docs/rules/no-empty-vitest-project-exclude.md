# no-empty-vitest-project-exclude

Disallow empty project-level `test.exclude` arrays in workspace/project entries.

> **Rule catalog ID:** R033

## Targeted pattern scope

- `vitest.workspace.*`
- inline project entries in `test.projects`
- nested project `test.exclude` values only

## What this rule reports

This rule reports empty project-level `test.exclude: []` arrays.

## Why this rule exists

Project-level empty excludes are often leftover placeholders that imply filtering but do nothing.
Keeping these entries explicit and non-empty improves project topology clarity.

## ❌ Incorrect

```ts
import { defineWorkspace } from "vitest/config";

export default defineWorkspace([
    {
        test: {
            name: "unit",
            exclude: [],
        },
    },
]);
```

## ✅ Correct

```ts
import { defineWorkspace } from "vitest/config";

export default defineWorkspace([
    {
        test: {
            name: "unit",
            exclude: ["dist/**"],
        },
    },
]);
```

## Behavior and migration notes

- this rule checks nested project excludes only
- use `no-empty-vitest-exclude` for root-level `test.exclude`

## ESLint flat config example

```ts
import vite from "@typpi/eslint-plugin-vite";

export default [vite.configs.strict, vite.configs.vitest];
```

## When not to use it

Disable this rule only if your project generator intentionally emits empty nested exclude arrays as templates.

## Package documentation

- [Vitest projects/workspaces](https://vitest.dev/guide/projects)

## Further reading

- [no-empty-vitest-exclude](./no-empty-vitest-exclude.md)
- [no-empty-vitest-projects](./no-empty-vitest-projects.md)
