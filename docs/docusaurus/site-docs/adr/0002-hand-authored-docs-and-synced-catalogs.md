---
id: 0002-hand-authored-docs-and-synced-catalogs
title: ADR 0002 — Keep docs hand-authored and sync only derived catalogs
sidebar_position: 3
---

# ADR 0002 — Keep docs hand-authored and sync only derived catalogs

- Status: Accepted
- Date: 2026-03-21

## Context

Rule catalogs, README tables, and preset matrices are repetitive enough to justify automation. Rule explanations, migration guidance, and adoption notes are not. Template repositories often over-generate documentation, which makes a copied project look complete while hiding thin or inaccurate prose.

## Decision

The repository will use sync scripts only for derived material such as:

- README rules tables
- preset membership matrices
- sidebar and catalog consistency checks where appropriate

Hand-authored pages remain the source of truth for:

- individual rule documentation
- maintainer guides
- ADRs and architecture notes
- blog posts and rollout commentary

## Consequences

### Positive

- Rule documentation stays specific to real Vite and Vitest behavior.
- Generated navigation data can still stay accurate without hand-editing the same tables repeatedly.
- Reviewers can audit prose quality separately from mechanical catalog updates.

### Negative

- Maintainers must update both authored docs and derived tables when adding rules.
- Sync tooling must produce deterministic output so formatting tools and tests do not fight the generated content.

## Follow-up expectations

When a rule changes:

1. update the rule source
2. update or add the authored docs page
3. run the repository sync scripts
4. re-run validation before release
