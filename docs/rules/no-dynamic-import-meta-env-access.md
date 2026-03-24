# no-dynamic-import-meta-env-access

Disallow dynamic `import.meta.env[key]` access that Vite cannot replace statically.

> **Rule catalog ID:** R003

## Targeted pattern scope

- browser-bound source files
- shared code that executes in Vite-managed environments
- direct reads from `import.meta.env`

## What this rule reports

This rule reports computed property access such as:

```ts
import.meta.env[key];
```

when the key is not a string literal.

## Why this rule exists

Vite replaces env reads through static property analysis.

Dynamic key access breaks that model and makes env access harder to reason about during reviews.

## ❌ Incorrect

```ts
const envKey = "VITE_API_URL";

fetch(import.meta.env[envKey]);
```

## ✅ Correct

```ts
fetch(import.meta.env.VITE_API_URL);
```

```ts
fetch(import.meta.env["VITE_API_URL"]);
```

## Behavior and migration notes

- literal bracket access is allowed
- dynamic access belongs in a normal object that you construct yourself, not in `import.meta.env`

## ESLint flat config example

```ts
import vite from "@typpi/eslint-plugin-vite";

export default [vite.configs.client];
```

## When not to use it

Disable this rule only if your repository never reads from `import.meta.env`.

## Package documentation

- [Vite env variables and modes](https://vite.dev/guide/env-and-mode)

## Further reading

- [no-restricted-import-meta-env](./no-restricted-import-meta-env.md)
- [client preset](./presets/client.md)
