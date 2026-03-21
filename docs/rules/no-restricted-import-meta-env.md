# no-restricted-import-meta-env

Disallow client-side `import.meta.env` keys that are not Vite built-ins and do not match an allowed public prefix.

> **Rule catalog ID:** R007

## Targeted pattern scope

- browser-bound source files
- code that reads public env values from `import.meta.env`

## What this rule reports

This rule reports `import.meta.env` property reads whose keys are:

- not built-in Vite keys such as `MODE` or `DEV`
- not prefixed by an allowed public prefix such as `VITE_`

## Why this rule exists

Client bundles should read only values that you intentionally expose.

This rule helps reviewers spot accidental reads from server-only or internal env names.

## ❌ Incorrect

```ts
const secret = import.meta.env.SECRET_TOKEN;
```

## ✅ Correct

```ts
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
```

```ts
const mode = import.meta.env.MODE;
```

## Behavior and migration notes

- built-in keys such as `MODE`, `DEV`, `PROD`, `SSR`, and `BASE_URL` are allowed
- the default allowed public prefix is `VITE_`
- configure additional prefixes if your repository uses another explicit public prefix

## ESLint flat config example

```ts
import vite from "eslint-plugin-vite";

export default [
    vite.configs.client,
    {
        rules: {
            "vite/no-restricted-import-meta-env": [
                "error",
                {
                    allowPrefixes: ["VITE_", "PUBLIC_"],
                },
            ],
        },
    },
];
```

## When not to use it

Disable this rule if your repository does not read env values from browser code or if another policy layer already enforces public env naming.

## Package documentation

- [Vite env variables and modes](https://vite.dev/guide/env-and-mode)

## Further reading

- [client preset](./presets/client.md)
- [no-dynamic-import-meta-env-access](./no-dynamic-import-meta-env-access.md)
