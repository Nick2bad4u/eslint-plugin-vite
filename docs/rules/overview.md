---
title: Rule overview
description: Overview of the eslint-plugin-vite rule catalog and the kinds of Vite and Vitest problems it targets.
---

# Overview

`eslint-plugin-vite` focuses on configuration and runtime patterns that are specific to Vite, Vitest, and Vitest bench.

The current rule set is intentionally biased toward:

- **static build correctness**
- **config-file safety**
- **client-side `import.meta.*` behavior**
- **Vitest workspace and benchmark hygiene**

## What this plugin covers

The plugin currently ships rules in four practical buckets:

1. **Config rules**
   - exporting config files with the right helper APIs
   - migrating away from deprecated Vite config keys and values
   - avoiding unsafe `envPrefix` values
   - keeping dev-server host, CORS, and filesystem settings explicit
   - keeping `resolve.alias` replacements Vite-compatible
2. **Client runtime rules**
   - catching invalid `import.meta.glob()` arguments
   - catching dynamic `import.meta.env[...]` access
   - preventing accidental reads from non-public env keys in browser code
3. **Vitest rules**
   - enforcing unique workspace project names
   - nudging inline workspace projects toward `defineProject(...)`
4. **Vitest bench rules**
   - preventing mixed correctness tests and benchmark code in the same file

## What this plugin does **not** try to do

This plugin does not try to replace:

- ESLint core best-practice rules
- general TypeScript correctness rules
- testing-style rules that are not specific to Vitest or Vite
- framework-specific rules for React, Vue, Svelte, or Solid

Instead, it focuses on things that are easy to get wrong specifically because of how Vite and Vitest work.

## Recommended adoption path

- Start with `vite.configs.recommended`.
- Add `vite.configs.client` if your app uses `import.meta.env` or `import.meta.glob` heavily.
- Add `vite.configs.vitest` if you use Vitest workspaces or multi-project setups.
- Add `vite.configs["vitest-bench"]` if you keep benchmark files in the same repository.
- Move up to `vite.configs.strict` once the recommended baseline is stable.

## Rule docs

Each rule page includes:

- the exact pattern it targets
- why the pattern is risky in Vite or Vitest
- incorrect and correct examples
- a flat-config snippet
- links back to the relevant Vite or Vitest documentation

## Further reading

- [Vite guide](https://vite.dev/guide/)
- [Vite config reference](https://vite.dev/config/)
- [Vitest guide](https://vitest.dev/guide/)
- [Vitest projects guide](https://vitest.dev/guide/projects)