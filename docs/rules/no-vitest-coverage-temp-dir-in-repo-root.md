# no-vitest-coverage-temp-dir-in-repo-root

Disallow root-like `test.coverage.reportsDirectory` paths (for example `.` or `./`).

> **Rule catalog ID:** R052

## Targeted pattern scope

- `vitest.config.*`
- `vitest.workspace.*`
- `vite.config.*` when Vitest coverage options are configured
- `test.coverage.reportsDirectory`

## What this rule reports

This rule reports root-like reports directory values such as:

- `"."`
- `"./"`
- `"\\"`
- `"/"`

## Why this rule exists

Writing coverage output into the repository root pollutes the workspace and increases accidental churn.
A dedicated coverage subdirectory keeps artifacts isolated and predictable.

## ❌ Incorrect

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        coverage: {
            reportsDirectory: "./",
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
            reportsDirectory: "coverage",
        },
    },
});
```

## Behavior and migration notes

- this rule checks static string values only
- empty strings are handled by `no-empty-vitest-coverage-reports-directory`

## ESLint flat config example

```ts
import vite from "@typpi/eslint-plugin-vite";

export default [vite.configs.strict, vite.configs.vitest];
```

## When not to use it

Disable this rule only if your repository intentionally writes coverage artifacts directly to its root directory.

## Package documentation

- [Vitest config reference](https://vitest.dev/config/)

## Further reading

- [require-vitest-coverage-reports-directory](./require-vitest-coverage-reports-directory.md)
