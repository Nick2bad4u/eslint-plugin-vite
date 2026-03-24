# no-vitest-max-workers-zero

Disallow invalid `test.maxWorkers` values (`0` or empty strings).

> **Rule catalog ID:** R041

## Targeted pattern scope

- `vitest.config.*`
- `vitest.workspace.*`
- `vite.config.*` when Vitest options are configured
- `test.maxWorkers`

## What this rule reports

This rule reports `test.maxWorkers` values that are:

- `0`
- empty strings (`""`, whitespace-only template/literal strings)

## Why this rule exists

Invalid worker values can break parallel scheduling and create ambiguous runtime behavior.
This is a high-signal static config mistake that is cheap to catch early.

## ❌ Incorrect

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        maxWorkers: 0,
    },
});
```

## ✅ Correct

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        maxWorkers: 2,
    },
});
```

## Behavior and migration notes

- this rule checks static literal/template values only
- valid percentage-style strings (for example `"50%"`) are not reported

## ESLint flat config example

```ts
import vite from "@typpi/eslint-plugin-vite";

export default [vite.configs.strict, vite.configs.vitest];
```

## When not to use it

Disable this rule only if your tooling intentionally injects `maxWorkers` dynamically and committed placeholders use empty or zero values.

## Package documentation

- [Vitest config reference](https://vitest.dev/config/)

## Further reading

- [no-vitest-min-workers-greater-than-max-workers](./no-vitest-min-workers-greater-than-max-workers.md)
