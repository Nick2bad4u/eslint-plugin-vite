---
sidebar_position: 1
---

# eslint-plugin-vite

`eslint-plugin-vite` is an ESLint plugin focused on Vite, Vitest, and Vitest bench behavior.

It helps catch problems such as:

- raw Vite or Vitest config exports that should use helper APIs
- unsafe `envPrefix` values
- invalid `import.meta.glob()` arguments
- accidental reads from non-public `import.meta.env` keys
- mixed Vitest benchmark and correctness-test APIs

## Where to go next

- Open the `Getting started` page for installation and flat-config setup.
- Open the `Rule overview` page for the rule families.
- Open the `Preset reference` page to choose the right config bundle.
