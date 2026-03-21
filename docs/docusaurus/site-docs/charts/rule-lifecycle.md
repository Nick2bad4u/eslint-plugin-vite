---
title: Rule lifecycle and sync flow
sidebar_position: 3
---

# Rule lifecycle and sync flow

This sequence highlights the expected maintainer flow when adding or changing a rule.

```mermaid
sequenceDiagram
    participant Maintainer
    participant Source as src/rules + _internal
    participant Registry as Rule registry / plugin
    participant Docs as docs/rules
    participant Sync as sync scripts
    participant Validation as lint + typecheck + tests + docs checks

    Maintainer->>Source: Implement or update rule logic
    Maintainer->>Registry: Register rule and preset membership
    Maintainer->>Docs: Write or revise hand-authored docs
    Maintainer->>Sync: Regenerate README tables and preset matrices
    Sync-->>Docs: Keep derived navigation/data aligned
    Maintainer->>Validation: Run repository validation gates
    Validation-->>Maintainer: Confirm release-ready baseline
```

## Practical takeaway

A rule is not complete when the source file compiles. It is only complete when runtime wiring, docs, synced derived content, and validation all agree.
