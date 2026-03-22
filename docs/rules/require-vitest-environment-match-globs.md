# require-vitest-environment-match-globs

Require explicit non-empty `test.environmentMatchGlobs` when multiple static `test.environment` values are used in one config file.

> **Rule catalog ID:** R058

## Targeted pattern scope

- `vitest.config.*`
- `vitest.workspace.*`
- `vite.config.*` when Vitest test options are configured
- `test.environment`
- `test.environmentMatchGlobs`

## What this rule reports

This rule reports files that define multiple static `test.environment` values without also configuring a non-empty `test.environmentMatchGlobs`.

## Why this rule exists

When multiple environments are used, explicit environment-to-file routing helps keep execution deterministic and easier to reason about.
Implicit routing can become ambiguous in larger projects.

## ❌ Incorrect

```ts
import { defineConfig, defineProject } from "vitest/config";

export default defineConfig({
    test: {
        projects: [
            defineProject({ test: { environment: "node" } }),
            defineProject({ test: { environment: "jsdom" } }),
        ],
    },
});
```

## ✅ Correct

```ts
import { defineConfig, defineProject } from "vitest/config";

export default defineConfig({
    test: {
        projects: [
            defineProject({ test: { environment: "node" } }),
            defineProject({ test: { environment: "jsdom" } }),
        ],
        environmentMatchGlobs: [["**/*.dom.test.ts", "jsdom"]],
    },
});
```

## Behavior and migration notes

- this rule checks static environment strings only
- non-empty `environmentMatchGlobs` arrays satisfy the rule

## ESLint flat config example

```ts
import vite from "eslint-plugin-vite";

export default [vite.configs.strict, vite.configs.vitest];
```

## When not to use it

Disable this rule only if environment routing is guaranteed by an external layer and intentionally not expressed in Vitest config.

## Package documentation

- [Vitest config reference](https://vitest.dev/config/)

## Further reading

- [no-mixed-defineworkspace-and-test-projects](./no-mixed-defineworkspace-and-test-projects.md)
