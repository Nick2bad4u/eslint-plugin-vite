# Preset selection strategy

Choose presets by **where the risk lives** in your repository.

## Start here

If you are unsure, start with:

```ts
import vite from "@typpi/eslint-plugin-vite";

export default [vite.configs.recommended];
```

## Add focused presets by repository shape

### App code uses `import.meta.env` or `import.meta.glob`

Add `vite.configs.client`.

### Vitest configs or workspaces are central to the repo

Add `vite.configs.vitest`.

### Benchmarks live alongside tests

Add `vite.configs.vitest-bench`.

### You want the broadest safety net

Move to `vite.configs.strict` or `vite.configs.all`.

## Preset intent

- `recommended`: common pitfalls with low false-positive risk
- `strict`: stricter client-env and workspace guidance
- `all`: every rule
- `configs`: only config-file safety rules
- `client`: only runtime/client rules
- `vitest`: only Vitest-focused rules
- `vitest-bench`: only benchmark-focused rules

## Further reading

- [Presets index](../presets/index.md)
- [Adoption checklist](./adoption-checklist.md)
