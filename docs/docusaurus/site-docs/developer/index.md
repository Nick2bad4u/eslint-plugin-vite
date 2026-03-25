---
title: 🛠️ Developer guide
description: Explore the maintainer-facing documentation for eslint-plugin-vite, including architecture decision records, charts, and release notes.
keywords:
    - developer guide
    - maintainer documentation
    - architecture decision records
    - architecture charts
sidebar_position: 1
---

# Developer guide

This section collects the maintainer-facing material for `eslint-plugin-vite`.

The project deliberately treats Vite, Vitest, and Vitest bench as first-class linting domains instead of generic TypeScript style checks. That shapes the way rules are authored, documented, tested, and published.

## What lives here

- [Architecture decision records](../adr/) capture decisions that should stay stable over time.
- [Architecture charts](../charts/) explain the plugin and docs pipelines visually.
- Generated API pages under `developer/api/` document the runtime surface, but hand-authored prose stays in tracked Markdown pages like this one.

## Maintainer workflow at a glance

1. Implement or adjust runtime behavior in `src/`.
2. Keep rule docs in `docs/rules/` hand-authored and accurate.
3. Update registry, preset membership, and any stable rule-catalog data together.
4. Run the sync scripts so README and preset matrices stay aligned.
5. Re-run typecheck, tests, lint, docs link checks, and any packaging validation before finishing.

## Why the docs site is structured this way

The Docusaurus app has two jobs:

- publish user-facing rule and preset guidance
- preserve maintainer knowledge such as ADRs, charts, and release/process notes

That split keeps rule reference pages focused on consumers while still giving maintainers a durable place to document architecture choices and repository workflows.
