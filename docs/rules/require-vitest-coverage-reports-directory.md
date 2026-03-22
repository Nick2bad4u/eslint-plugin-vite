# require-vitest-coverage-reports-directory

Require explicit non-empty `test.coverage.reportsDirectory` when coverage is enabled.

> **Rule catalog ID:** R050

## Targeted pattern scope

- `vitest.config.*`
- `vitest.workspace.*`
- `vite.config.*` when Vitest coverage options are configured
- `test.coverage.enabled: true`

## What this rule reports

This rule reports enabled coverage blocks that omit a non-empty `test.coverage.reportsDirectory`.

## Why this rule exists

A stable reports directory is important for predictable CI artifact collection and tooling integration.
Relying on implicit defaults can cause drift across environments.

## ❌ Incorrect

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        coverage: {
            enabled: true,
        },
    },
});
```

## ✅ Correct

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        coverage: {
            enabled: true,
            reportsDirectory: "coverage",
        },
    },
});
```

## Behavior and migration notes

- this rule checks static values only
- empty strings are not considered valid directories

## ESLint flat config example

```ts
import vite from "eslint-plugin-vite";

export default [vite.configs.strict, vite.configs.vitest];
```

## When not to use it

Disable this rule only if reports directory behavior is fully managed by external runtime flags or wrappers.

## Package documentation

- [Vitest config reference](https://vitest.dev/config/)

## Further reading

- [no-vitest-coverage-temp-dir-in-repo-root](./no-vitest-coverage-temp-dir-in-repo-root.md)
