# no-vitest-coverage-clean-false

Disallow `test.coverage.clean: false` in shared Vitest config.

> **Rule catalog ID:** R048

## Targeted pattern scope

- `vitest.config.*`
- `vitest.workspace.*`
- `vite.config.*` when Vitest coverage options are configured
- `test.coverage.clean`

## What this rule reports

This rule reports explicit `test.coverage.clean: false` assignments in supported config files.

## Why this rule exists

Disabling coverage cleanup can leave stale artifacts from previous runs.
In CI or shared repo workflows, stale output can mislead diagnostics and artifact consumers.

## ❌ Incorrect

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        coverage: {
            clean: false,
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
            clean: true,
        },
    },
});
```

## Behavior and migration notes

- this rule checks static boolean assignments only
- it targets committed config files, not arbitrary source modules

## ESLint flat config example

```ts
import vite from "@typpi/eslint-plugin-vite";

export default [vite.configs.strict, vite.configs.vitest];
```

## When not to use it

Disable this rule only if your pipeline intentionally preserves coverage output between runs and you manage stale artifacts elsewhere.

## Package documentation

- [Vitest config reference](https://vitest.dev/config/)

## Further reading

- [require-vitest-coverage-reports-directory](./require-vitest-coverage-reports-directory.md)
