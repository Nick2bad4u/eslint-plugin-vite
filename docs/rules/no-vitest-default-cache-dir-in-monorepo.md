# no-vitest-default-cache-dir-in-monorepo

Disallow default or missing Vitest cache directories in likely monorepos.

> **Rule catalog ID:** R068

## Targeted pattern scope

- `cacheDir`
- `test.cacheDir`
- `test.cache.dir`

## What this rule reports

This rule reports likely monorepo config when cache dir is missing or set to a default-style path like `node_modules/.vitest`.

## Why this rule exists

Shared default cache locations in monorepos can cause cross-package cache collisions and hard-to-reproduce failures.

## ❌ Incorrect

```ts
export default {
    test: {
        cacheDir: "node_modules/.vitest",
    },
};
```

## ✅ Correct

```ts
export default {
    test: {
        cacheDir: ".cache/vitest/app",
    },
};
```

## Behavior and migration notes

- Detects likely monorepo contexts via workspace config kind or common monorepo path segments.
- Accepts dynamic non-literal cache-dir expressions as explicit configuration.

## ESLint flat config example

```ts
import vite from "eslint-plugin-vite";

export default [vite.configs.vitest];
```

## When not to use it

Disable if you intentionally standardize on default cache location and accept cross-project sharing.

## Package documentation

- [Vitest config reference](https://vitest.dev/config/)

## Further reading

- [no-vitest-coverage-temp-dir-in-repo-root](./no-vitest-coverage-temp-dir-in-repo-root.md)
- [require-vitest-explicit-environment](./require-vitest-explicit-environment.md)
