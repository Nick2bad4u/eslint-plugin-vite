# workspace-unique-project-name

Require literal Vitest workspace project names to be unique.

> **Rule catalog ID:** R009

## Targeted pattern scope

- `vitest.workspace.*`
- inline workspace project definitions

## What this rule reports

This rule reports duplicate literal `name` values inside `defineWorkspace([...])` project entries.

## Why this rule exists

Duplicate project names make workspace output harder to understand and make it easier to run or debug the wrong project.

## ❌ Incorrect

```ts
import { defineWorkspace } from "vitest/config";

export default defineWorkspace([
    {
        test: {
            name: "unit",
        },
    },
    {
        test: {
            name: "unit",
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
    {
        test: {
            name: "browser",
        },
    },
]);
```

## Behavior and migration notes

- this rule only checks literal names it can read statically
- dynamic names are ignored because they are harder to validate safely in linting

## ESLint flat config example

```ts
import vite from "eslint-plugin-vite";

export default [vite.configs.vitest];
```

## When not to use it

Disable this rule only if your workspace generator produces duplicate names intentionally and another tool resolves that ambiguity.

## Package documentation

- [Vitest projects guide](https://vitest.dev/guide/projects)

## Further reading

- [vitest preset](./presets/vitest.md)
- [prefer-define-project](./prefer-define-project.md)
