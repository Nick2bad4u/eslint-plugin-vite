---
slug: config-safety-and-workspaces
title: Why eslint-plugin-vite centers config safety and Vitest workspaces
authors:
  - nick
tags:
  - architecture
  - vite
  - vitest
---

# Why eslint-plugin-vite centers config safety and Vitest workspaces

When Vite projects go wrong, the problem is often not a generic syntax issue. It is usually a mismatch with one of Vite's runtime contracts:

- a config file exports the wrong shape
- a client bundle relies on dynamic `import.meta.env` access
- a workspace mixes test and benchmark APIs in ways that make results harder to trust
- a server option disables a protection that Vite enables by default

That is why `eslint-plugin-vite` is intentionally centered on config safety and workspace correctness.

## A focused scope keeps the plugin useful

General-purpose ESLint stacks already cover broad style and correctness concerns. This plugin earns its place by catching issues that those broader stacks typically do not model.

## That scope also shapes the presets

The current presets are organized around practical Vite workflows rather than generic severity tiers alone:

- config-file hardening
- client runtime constraints
- Vitest workspace correctness
- benchmark/test separation

As the rule set grows, keeping that workflow-oriented focus is more important than chasing raw rule count.
