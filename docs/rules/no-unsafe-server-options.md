# no-unsafe-server-options

Disallow Vite server and preview options that weaken host, origin, or filesystem protections.

> **Rule catalog ID:** R011

## Targeted pattern scope

- `vite.config.*`
- `vitest.config.*` when Vite server options are shared there
- `server.*` and `preview.*` config branches

## What this rule reports

This rule reports high-risk boolean shortcuts such as:

- `server.allowedHosts: true`
- `preview.allowedHosts: true`
- `server.cors: true`
- `preview.cors: true`
- `server.fs.strict: false`

## Why this rule exists

Vite's server settings include security-sensitive shortcuts that are convenient during local experiments but risky when they become committed defaults.

Wildcard hosts, fully open CORS, and a disabled filesystem sandbox make it easier to expose source code or unexpected files during development and preview.

## ❌ Incorrect

```ts
import { defineConfig } from "vite";

export default defineConfig({
    preview: {
        allowedHosts: true,
        cors: true,
    },
    server: {
        allowedHosts: true,
        cors: true,
        fs: {
            strict: false,
        },
    },
});
```

## ✅ Correct

```ts
import { defineConfig } from "vite";

export default defineConfig({
    preview: {
        allowedHosts: ["preview.internal.example.com"],
        cors: {
            origin: ["https://preview.internal.example.com"],
        },
    },
    server: {
        allowedHosts: ["app.internal.example.com"],
        cors: {
            origin: /^https?:\/\/(localhost|127\.0\.0\.1)(?::\d+)?$/,
        },
        fs: {
            allow: [".."],
            strict: true,
        },
    },
});
```

## Behavior and migration notes

- prefer explicit allowlists over `true` for both hosts and CORS
- keep `server.fs.strict` enabled and expand `server.fs.allow` deliberately when a monorepo or sibling package needs access
- this rule focuses on documented Vite safeguards, not every possible networking preference

## ESLint flat config example

```ts
import vite from "eslint-plugin-vite";

export default [vite.configs.configs, vite.configs.strict];
```

## When not to use it

Disable this rule only if your project intentionally accepts these broader attack surfaces in committed config and your team has reviewed that tradeoff.

## Package documentation

- [Vite server options](https://vite.dev/config/server-options)
- [Vite preview options](https://vite.dev/config/preview-options)

## Further reading

- [configs preset](./presets/configs.md)
- [strict preset](./presets/strict.md)
