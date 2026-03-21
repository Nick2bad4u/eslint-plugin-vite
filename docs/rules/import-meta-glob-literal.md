# import-meta-glob-literal

Require `import.meta.glob()` to receive static string literals or arrays of static string literals.

> **Rule catalog ID:** R002

## Targeted pattern scope

- browser-bound Vite source
- route discovery and content-loading utilities
- code that uses `import.meta.glob(...)`

## What this rule reports

This rule reports `import.meta.glob()` calls whose first argument is not:

- a string literal
- a template literal without expressions
- an array made only from those literal forms

## Why this rule exists

Vite expands `import.meta.glob()` statically.

If the pattern is dynamic, Vite cannot precompute the module set correctly.

## ❌ Incorrect

```ts
const pagesPattern = "./pages/**/*.md";

const pages = import.meta.glob(pagesPattern);
```

```ts
const section = "blog";

const modules = import.meta.glob(`./content/${section}/*.md`);
```

## ✅ Correct

```ts
const pages = import.meta.glob("./pages/**/*.md");
```

```ts
const modules = import.meta.glob([
    "./content/blog/*.md",
    "./content/docs/*.md",
]);
```

## Behavior and migration notes

- move dynamic selection logic after the glob import instead of inside the glob pattern
- keep the glob itself static and filter the returned module map in normal JavaScript

## ESLint flat config example

```ts
import vite from "eslint-plugin-vite";

export default [vite.configs.client];
```

## When not to use it

Disable this rule only if your codebase never uses `import.meta.glob()`.

## Package documentation

- [Vite glob import feature](https://vite.dev/guide/features#glob-import)

## Further reading

- [client preset](./presets/client.md)
- [Overview](./overview.md)
