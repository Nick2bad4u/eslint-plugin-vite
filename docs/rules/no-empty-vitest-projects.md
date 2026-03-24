# no-empty-vitest-projects

Disallow empty Vitest project lists.

> **Rule catalog ID:** R024

## Targeted pattern scope

- `vitest.workspace.*` `defineWorkspace([...])`
- `test.projects` in `vitest.config.*`
- `test.projects` in `vite.config.*` when Vitest options are present

## What this rule reports

This rule reports:

- `defineWorkspace([])`
- `test.projects: []`

## Why this rule exists

Empty project lists are usually an accidental misconfiguration that results in no projects/tests being executed.
This is a concrete config mistake with strong signal and low false-positive risk.

## ❌ Incorrect

```ts
import { defineWorkspace } from "vitest/config";

export default defineWorkspace([]);
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

- this rule only reports statically empty arrays
- dynamically computed project arrays are not evaluated

## ESLint flat config example

```ts
import vite from "@typpi/eslint-plugin-vite";

export default [vite.configs.strict, vite.configs.vitest];
```

## When not to use it

Disable this rule only if your workflow intentionally generates project arrays dynamically and you rely on empty arrays as a transient placeholder in committed config.

## Package documentation

- [Vitest projects/workspaces](https://vitest.dev/guide/projects)
- [Vitest config reference](https://vitest.dev/config/)

## Further reading

- [workspace-unique-project-name](./workspace-unique-project-name.md)
- [require-inline-project-name](./require-inline-project-name.md)
