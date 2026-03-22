# no-empty-vitest-include

Disallow empty `test.include` arrays in Vitest configuration.

> **Rule catalog ID:** R025

## Targeted pattern scope

- `vitest.config.*`
- `vitest.workspace.*`
- `vite.config.*` when a Vitest `test` block is used
- root and inline project `test.include`

## What this rule reports

This rule reports explicit `test.include: []` assignments.

## Why this rule exists

An empty include list often means no tests are discovered at runtime.
Because this setting controls discovery directly, reporting an empty static array helps catch broken suites before CI runs.

## ❌ Incorrect

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        include: [],
    },
});
```

## ✅ Correct

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        include: ["test/**/*.test.ts"],
    },
});
```

## Behavior and migration notes

- this rule only reports statically empty arrays
- it does not validate glob quality or coverage completeness

## ESLint flat config example

```ts
import vite from "eslint-plugin-vite";

export default [vite.configs.strict, vite.configs.vitest];
```

## When not to use it

Disable this rule only if your setup intentionally keeps `test.include` empty in committed config and supplies include patterns exclusively through CLI/runtime overrides.

## Package documentation

- [Vitest `include` option](https://vitest.dev/config/#include)
- [Vitest config reference](https://vitest.dev/config/)

## Further reading

- [no-pass-with-no-tests](./no-pass-with-no-tests.md)
- [no-empty-vitest-projects](./no-empty-vitest-projects.md)
