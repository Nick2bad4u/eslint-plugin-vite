# all

Use `vite.configs.all` when you want every rule from `eslint-plugin-vite` enabled at once.

This preset is useful for template repositories, internal platforms, or teams that prefer to audit every new rule explicitly.

## Flat config

```ts
import vite from "eslint-plugin-vite";

export default [vite.configs.all];
```

## When to use it

- you maintain a platform repo or starter template
- you want the widest possible safety net
- you are comfortable turning off individual rules locally when needed

## Rules in this preset

<!-- begin generated preset rules -->
| Rule                                                                                | Fix |
| :---------------------------------------------------------------------------------- | :-: |
| [`vite/config-require-define-config`](../config-require-define-config.md)           |  —  |
| [`vite/import-meta-glob-literal`](../import-meta-glob-literal.md)                   |  —  |
| [`vite/no-dynamic-import-meta-env-access`](../no-dynamic-import-meta-env-access.md) |  —  |
| [`vite/no-empty-env-prefix`](../no-empty-env-prefix.md)                             |  —  |
| [`vite/no-mixed-test-and-bench-apis`](../no-mixed-test-and-bench-apis.md)           |  —  |
| [`vite/no-relative-resolve-alias`](../no-relative-resolve-alias.md)                 |  —  |
| [`vite/no-restricted-import-meta-env`](../no-restricted-import-meta-env.md)         |  —  |
| [`vite/prefer-define-project`](../prefer-define-project.md)                         |  —  |
| [`vite/workspace-unique-project-name`](../workspace-unique-project-name.md)         |  —  |
| [`vite/no-deprecated-config-options`](../no-deprecated-config-options.md)           |  —  |
| [`vite/no-unsafe-server-options`](../no-unsafe-server-options.md)                   |  —  |
| [`vite/no-import-meta-env-in-config`](../no-import-meta-env-in-config.md)           |  —  |
| [`vite/no-implicit-config-flags`](../no-implicit-config-flags.md)                   |  —  |
| [`vite/require-inline-project-name`](../require-inline-project-name.md)             |  —  |
| [`vite/no-unsupported-project-options`](../no-unsupported-project-options.md)       |  —  |
<!-- end generated preset rules -->
