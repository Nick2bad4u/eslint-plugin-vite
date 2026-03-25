---
sidebar_position: 1
title: ✨ Introduction
description: Learn about eslint-plugin-vite's focus on Vite and Vitest runtime contracts, hand-authored docs strategy, and how to get started with the plugin.
keywords:
    - introduction
    - overview
    - getting started
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
