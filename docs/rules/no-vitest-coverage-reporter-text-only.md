# no-vitest-coverage-reporter-text-only

Disallow `test.coverage.reporter` configurations that only emit `text` output.

> **Rule catalog ID:** R051

## Targeted pattern scope

- `vitest.config.*`
- `vitest.workspace.*`
- `vite.config.*` when Vitest coverage options are configured
- `test.coverage.reporter`

## What this rule reports

This rule reports reporter configurations that resolve to text-only output, such as:

- `reporter: "text"`
- `reporter: ["text"]`

## Why this rule exists

Text-only coverage is useful for quick local feedback but weak for CI/tooling integration.
Shared config usually benefits from at least one structured reporter (`json`, `lcov`, `html`, etc.).

## ❌ Incorrect

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        coverage: {
            reporter: ["text"],
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
            reporter: ["text", "json", "html"],
        },
    },
});
```

## Behavior and migration notes

- this rule checks static reporter values only
- it does not report mixed reporter lists that include non-text outputs

## ESLint flat config example

```ts
import vite from "eslint-plugin-vite";

export default [vite.configs.strict, vite.configs.vitest];
```

## When not to use it

Disable this rule only if your shared workflow intentionally relies on text-only coverage output.

## Package documentation

- [Vitest config reference](https://vitest.dev/config/)

## Further reading

- [require-vitest-coverage-reporter-when-enabled](./require-vitest-coverage-reporter-when-enabled.md)
