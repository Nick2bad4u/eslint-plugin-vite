---
id: 0001-vite-first-rule-scope
title: ADR 0001 — Focus rules on Vite and Vitest runtime contracts
sidebar_position: 2
---

# ADR 0001 — Focus rules on Vite and Vitest runtime contracts

- Status: Accepted
- Date: 2026-03-21

## Context

This repository started from a general ESLint plugin template. Without a clear boundary, it would be easy for the project to drift into broad TypeScript style rules that overlap with existing ecosystems and dilute the value of a Vite-specific plugin.

## Decision

`eslint-plugin-vite` will prioritize rules that enforce real Vite, Vitest, and Vitest bench contracts, such as:

- config-file structure and migration safety
- `import.meta.env` and `import.meta.glob()` correctness
- Vitest workspace composition and benchmark/test separation
- configuration hardening for server, preview, and related runtime surfaces

## Consequences

### Positive

- The plugin stays easy to explain: it exists to catch mistakes that matter specifically in Vite-based projects.
- Rule docs can link directly to Vite and Vitest concepts instead of generic JavaScript style guidance.
- Presets can be organized around practical Vite workflows: config files, client runtime, test projects, and benchmarks.

### Negative

- Some potentially useful generic rules are intentionally out of scope.
- Maintainers need to verify behavior against evolving Vite and Vitest documentation instead of relying only on generic ESLint conventions.

## Rejected alternatives

### Become a broad frontend-style plugin

Rejected because it would compete with established lint stacks while making the package identity less clear.

### Only ship config-file rules

Rejected because Vite-specific mistakes also happen in client runtime code and Vitest workspace organization, not just in `vite.config.*` files.
