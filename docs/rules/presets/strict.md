# strict

Use `vite.configs.strict` when the recommended baseline is already clean and you want tighter policy enforcement.

This preset adds stricter guidance for config migrations, server hardening, client env access, and inline Vitest workspace project definitions.

## Flat config

```ts
import vite from "eslint-plugin-vite";

export default [vite.configs.strict];
```

## When to use it

- your team already understands Vite env-prefix policy
- you want deprecated Vite config aliases caught during review instead of during upgrades
- you want stronger defaults around `server.allowedHosts`, CORS, and filesystem exposure
- you want stronger review pressure around inline Vitest workspace setup
- you prefer one preset that includes the common baseline and stricter add-ons

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
<!-- end generated preset rules -->
