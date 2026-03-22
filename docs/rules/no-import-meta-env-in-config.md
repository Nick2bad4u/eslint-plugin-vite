# no-import-meta-env-in-config

Disallow `import.meta.env` while Vite and Vitest config files are being evaluated.

> **Rule catalog ID:** R012

## Targeted pattern scope

- `vite.config.*`
- `vitest.config.*`
- `vitest.workspace.*`

## What this rule reports

This rule reports `import.meta.env` inside config files, including patterns such as:

- `import.meta.env.MODE`
- `import.meta.env.VITE_API_URL`
- `const env = import.meta.env`

## Why this rule exists

Vite exposes `import.meta.env` to application code after the config has already been resolved.

While `vite.config.*` or `vitest.config.*` is running, only environment variables that already exist in the current process are available through `process.env`.
If config logic needs values from `.env*` files, Vite recommends calling `loadEnv(...)` explicitly.

Using `import.meta.env` in config files looks natural, but it reads from the wrong phase of Vite's lifecycle and can silently produce undefined values or misleading assumptions.

## ❌ Incorrect

```ts
import { defineConfig } from "vite";

export default defineConfig(() => ({
    define: {
        __MODE__: JSON.stringify(import.meta.env.MODE),
    },
}));
```

## ✅ Correct

```ts
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), "");

    return {
        define: {
            __APP_ENV__: JSON.stringify(env.APP_ENV),
        },
        server: {
            port: env.APP_PORT ? Number(env.APP_PORT) : 5173,
        },
    };
});
```

## Behavior and migration notes

- use `process.env` when the value is already provided by the shell or task runner before Vite starts
- use `loadEnv(mode, process.cwd(), "")` when `.env*` files must influence config decisions
- keep using `import.meta.env` in client and SSR application source where Vite intentionally injects it

## ESLint flat config example

```ts
import vite from "eslint-plugin-vite";

export default [vite.configs.recommended, vite.configs.configs];
```

## When not to use it

Disable this rule only if your config loader intentionally transforms `import.meta.env` before evaluation and your team accepts that non-standard behavior.

## Package documentation

- [Vite config env loading](https://vite.dev/config/#using-environment-variables-in-config)
- [Vite env variables and modes](https://vite.dev/guide/env-and-mode)

## Further reading

- [recommended preset](./presets/recommended.md)
- [configs preset](./presets/configs.md)
- [vitest preset](./presets/vitest.md)
