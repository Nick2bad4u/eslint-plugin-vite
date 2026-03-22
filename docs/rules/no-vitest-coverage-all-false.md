# no-vitest-coverage-all-false

Disallow `test.coverage.all: false` in shared Vitest config.

> **Rule catalog ID:** R047

## Targeted pattern scope

- `vitest.config.*`
- `vitest.workspace.*`
- `vite.config.*` when Vitest coverage options are configured
- `test.coverage.all`

## What this rule reports

This rule reports explicit `test.coverage.all: false` assignments in supported config files.

## Why this rule exists

Setting `coverage.all` to `false` can hide untested files from aggregate coverage expectations.
For shared CI-facing config, this often weakens coverage signal unintentionally.

## ❌ Incorrect

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        coverage: {
            all: false,
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
            all: true,
        },
    },
});
```

## Behavior and migration notes

- this rule checks static boolean assignments only
- it targets committed config files, not arbitrary source modules

## ESLint flat config example

```ts
import vite from "eslint-plugin-vite";

export default [vite.configs.strict, vite.configs.vitest];
```

## When not to use it

Disable this rule only if your project intentionally excludes non-imported files from coverage policy by design.

## Package documentation

- [Vitest config reference](https://vitest.dev/config/)

## Further reading

- [require-vitest-coverage-thresholds-when-enabled](./require-vitest-coverage-thresholds-when-enabled.md)
