---
slug: vite-baseline
title: Establishing the eslint-plugin-vite baseline
authors:
  - nick
tags:
  - announcement
  - docs
  - branding
---

# Establishing the eslint-plugin-vite baseline

`eslint-plugin-vite` now has a clearer baseline for the things maintainers and users touch first: branding assets, docs navigation, ADRs, charts, and repository-wide validation.

That baseline work matters because the project is no longer a generic plugin template. The site, manifest, and docs structure need to communicate that this package is about Vite config safety, client-runtime correctness, and Vitest workspace discipline.

## What changed in the baseline pass

- Vite-branded icons and favicon assets were generated for the docs site.
- Docusaurus navigation now has dedicated maintainer-facing sections for ADRs and charts.
- Mermaid support is enabled so architectural notes can stay visual and close to the codebase.
- Template leftovers were trimmed so the public docs no longer read like a renamed scaffold.

## Why this matters before adding more rules

A wider rule catalog is only helpful when the surrounding repo stays understandable and trustworthy. Maintaining a clean baseline keeps future rule work easier to explain, easier to review, and easier to release.
