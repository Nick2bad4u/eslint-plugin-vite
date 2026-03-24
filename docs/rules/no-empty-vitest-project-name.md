# no-empty-vitest-project-name

Disallow empty `test.name` values in Vitest config and workspace project entries.

> **Rule catalog ID:** R026

## Targeted pattern scope

- `vitest.config.*`
- `vitest.workspace.*`
- `vite.config.*` when a Vitest `test` block is used
- root and inline project `test.name`

## What this rule reports

This rule reports `test.name` values that are empty or whitespace-only static strings.

## Why this rule exists

Project names appear in Vitest output, filtering, and workspace-level workflows.
Empty names make project reporting ambiguous and often indicate an unfinished config edit.

## ❌ Incorrect

```ts
import { defineWorkspace } from "vitest/config";

export default defineWorkspace([
    {
        test: {
            name: "",
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
        },
    },
]);
```

## Behavior and migration notes

- this rule checks static strings only
- computed names are not evaluated

## ESLint flat config example

```ts
import vite from "@typpi/eslint-plugin-vite";

export default [vite.configs.strict, vite.configs.vitest];
```

## When not to use it

Disable this rule only if your project intentionally derives names dynamically at runtime and committed static placeholders may be empty during generation.

## Package documentation

- [Vitest projects/workspaces](https://vitest.dev/guide/projects)
- [Vitest config reference](https://vitest.dev/config/)

## Further reading

- [workspace-unique-project-name](./workspace-unique-project-name.md)
- [require-inline-project-name](./require-inline-project-name.md)
