---
title: Plugin architecture
sidebar_position: 2
---

# Plugin architecture

This chart shows the main repository layers that shape the published plugin and the documentation site.

```mermaid
flowchart TD
    A[src/rules/*.ts\nRule implementations] --> B[src/_internal/*\nShared AST + metadata helpers]
    B --> C[src/_internal/rules-registry.ts\nCanonical runtime registry]
    C --> D[src/plugin.ts\nPublic plugin + presets]
    D --> E[build / package exports]

    A --> F[test/*.test.ts\nRule and plugin validation]
    A --> G[docs/rules/*.md\nHand-authored rule docs]
    C --> H[scripts/sync-*.mjs\nDerived tables and matrices]
    H --> I[README.md + preset pages]

    G --> J[docs/docusaurus\nReference website]
    I --> J
    K[site-docs ADRs + charts + blog] --> J
```

## Reading the diagram

- Rule code lives in `src/rules/`.
- Shared helpers and metadata utilities live under `src/_internal/`.
- The runtime registry and public plugin entrypoint are the canonical path into the published package.
- Documentation is intentionally split between hand-authored rule pages and synced summary tables.
