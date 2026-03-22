# no-empty-worker-plugins

Disallow empty `worker.plugins` arrays in committed Vite config.

> **Rule catalog ID:** R063

## Targeted pattern scope

- `vite.config.*`
- `worker.plugins`

## What this rule reports

This rule reports explicit `worker.plugins: []` assignments in supported config files.

## Why this rule exists

An empty worker plugins list is usually accidental placeholder config.
Removing no-op arrays keeps worker-specific behavior explicit.

## ❌ Incorrect

```ts
import { defineConfig } from "vite";

export default defineConfig({
    worker: {
        plugins: [],
    },
});
```

## ✅ Correct

```ts
import { defineConfig } from "vite";

export default defineConfig({
    worker: {
        plugins: [() => ({ name: "worker-plugin" })],
    },
});
```

## Behavior and migration notes

- this rule checks static array literals only
- remove `worker.plugins` when no worker plugins are needed

## ESLint flat config example

```ts
import vite from "eslint-plugin-vite";

export default [vite.configs.configs];
```

## When not to use it

Disable this rule only if explicit empty plugin arrays are intentionally required in your configuration style.

## Package documentation

- [Vite worker options](https://vite.dev/config/worker-options)

## Further reading

- [no-empty-optimize-deps-include](./no-empty-optimize-deps-include.md)
