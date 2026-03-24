# require-vitest-explicit-environment

Require explicit `test.environment` in committed Vitest config.

> **Rule catalog ID:** R070

## Targeted pattern scope

- `test.environment`

## What this rule reports

This rule reports Vitest-oriented config where `test.environment` is omitted.

## Why this rule exists

Explicit environment declarations reduce ambiguity and prevent accidental behavior changes between Node and browser-like runners.

## ❌ Incorrect

```ts
export default {
    test: {},
};
```

## ✅ Correct

```ts
export default {
    test: {
        environment: "node",
    },
};
```

## Behavior and migration notes

- Applies to Vitest config files and Vite config files that define a `test` block.
- Checks key presence; does not enforce a specific environment value.

## ESLint flat config example

```ts
import vite from "@typpi/eslint-plugin-vite";

export default [vite.configs.vitest];
```

## When not to use it

Disable if your project intentionally depends on implicit Vitest environment defaults.

## Package documentation

- [Vitest config reference](https://vitest.dev/config/)

## Further reading

- [require-vitest-environment-match-globs](./require-vitest-environment-match-globs.md)
- [no-vitest-env-leakage-combo](./no-vitest-env-leakage-combo.md)
