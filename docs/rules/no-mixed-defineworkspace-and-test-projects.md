# no-mixed-defineworkspace-and-test-projects

Disallow mixing `defineWorkspace(...)` and `test.projects` in the same config file.

> **Rule catalog ID:** R034

## Targeted pattern scope

- `vitest.workspace.*`
- `vitest.config.*`
- `vite.config.*` when Vitest project topology is configured

## What this rule reports

This rule reports files that combine both:

- a `defineWorkspace(...)` call
- a `test.projects` configuration path

## Why this rule exists

Vitest project topology should be defined through one primary mechanism per file.
Mixing workspace-style and `test.projects` style in one file is confusing and can produce brittle maintenance behavior.

## ❌ Incorrect

```ts
import { defineWorkspace } from "vitest/config";

const shared = {
    test: {
        projects: [{ test: { name: "browser" } }],
    },
};

export default defineWorkspace([shared]);
```

## ✅ Correct

```ts
import { defineWorkspace } from "vitest/config";

export default defineWorkspace([
    {
        test: { name: "unit" },
    },
]);
```

## Behavior and migration notes

- the rule reports once per file when mixed topology is detected
- choose one approach per file: workspace-driven or `test.projects`-driven

## ESLint flat config example

```ts
import vite from "@typpi/eslint-plugin-vite";

export default [vite.configs.strict, vite.configs.vitest];
```

## When not to use it

Disable this rule only if your repository intentionally combines both topology styles within single files and the pattern is well-documented for contributors.

## Package documentation

- [Vitest projects/workspaces](https://vitest.dev/guide/projects)

## Further reading

- [no-empty-vitest-projects](./no-empty-vitest-projects.md)
- [workspace-unique-project-name](./workspace-unique-project-name.md)
