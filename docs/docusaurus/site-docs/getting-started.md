---
sidebar_position: 2
---

# Getting started

Install the plugin:

```bash
npm install --save-dev eslint-plugin-vite eslint
```

Then enable a preset in your flat config:

```ts
import vite from "eslint-plugin-vite";

export default [vite.configs.recommended];
```

## Recommended rollout

- Start with `vite.configs.recommended`.
- Add `vite.configs.client` for browser-heavy `import.meta.*` usage.
- Add `vite.configs.vitest` for Vitest config and workspace checks.
- Add `vite.configs["vitest-bench"]` for benchmark-file hygiene.
- Move to `vite.configs.strict` when the baseline is stable.

## More docs

- `Rule overview`
- `Preset reference`
- `Adoption checklist`
