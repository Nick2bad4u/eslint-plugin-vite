# vitest

Use `vite.configs.vitest` when your repository uses Vitest configuration files, workspaces, or multi-project setups.

This preset is especially useful in monorepos and browser-plus-node test setups.

## Flat config

```ts
import vite from "eslint-plugin-vite";

export default [vite.configs.recommended, vite.configs.vitest];
```

## When to use it

- you use `vitest.config.*`
- you use `vitest.workspace.*`
- you want guardrails around project naming and helper usage in workspaces

## Rules in this preset

<!-- begin generated preset rules -->
| Rule                                                                        | Fix |
| :-------------------------------------------------------------------------- | :-: |
| [`vite/config-require-define-config`](../config-require-define-config.md)   |  —  |
| [`vite/no-mixed-test-and-bench-apis`](../no-mixed-test-and-bench-apis.md)   |  —  |
| [`vite/prefer-define-project`](../prefer-define-project.md)                 |  —  |
| [`vite/workspace-unique-project-name`](../workspace-unique-project-name.md) |  —  |
<!-- end generated preset rules -->
