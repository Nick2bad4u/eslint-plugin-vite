# no-disabled-vitest-typecheck

Disallow Vitest `test.typecheck` options that disable or hide static typecheck failures.

> **Rule catalog ID:** R016

## Targeted pattern scope

- `vitest.config.*`
- `vitest.workspace.*`
- `vite.config.*` when a Vitest `test` block is used
- root `test.typecheck` options
- inline project `test.typecheck` options inside `defineWorkspace([...])`
- inline project `test.typecheck` options inside `test.projects: [...]`

## What this rule reports

This rule reports unsafe `test.typecheck` settings:

- `test.typecheck.enabled: false`
- `test.typecheck.ignoreSourceErrors: true`

## Why this rule exists

Vitest exposes `typecheck` as an optional test-time static safety pass.
Disabling it explicitly, or ignoring non-test source errors, can hide regressions that only appear in CI or production builds.

This plugin targets configuration correctness for Vite/Vitest projects, so enforcing safer `typecheck` defaults at config-authoring time fits its scope better than generic JavaScript style rules.

## ❌ Incorrect

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        typecheck: {
            enabled: false,
            ignoreSourceErrors: true,
        },
    },
});
```

## ✅ Correct

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        typecheck: {
            enabled: true,
            ignoreSourceErrors: false,
            tsconfig: "./tsconfig.vitest-typecheck.json",
        },
    },
});
```

## Behavior and migration notes

- this rule does not require enabling typecheck when `test.typecheck` is absent
- it only reports explicit unsafe toggles that disable or suppress errors
- if a repository must temporarily suppress source errors during migrations, scope-disable this rule with a comment and track removal explicitly

## ESLint flat config example

```ts
import vite from "@typpi/eslint-plugin-vite";

export default [vite.configs.strict, vite.configs.vitest];
```

## When not to use it

Disable this rule only if your team intentionally relies on `typecheck.enabled: false` or `typecheck.ignoreSourceErrors: true` for temporary migration workflows and accepts the reduced static safety signal.

## Package documentation

- [Vitest config reference](https://vitest.dev/config/)
- [Vitest typecheck options](https://vitest.dev/config/typecheck)

## Further reading

- [vitest preset](./presets/vitest.md)
- [no-unsupported-project-options](./no-unsupported-project-options.md)
