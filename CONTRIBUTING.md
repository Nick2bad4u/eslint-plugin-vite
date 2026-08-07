# Contributing to eslint-plugin-vite

Thanks for contributing.

`eslint-plugin-vite` focuses on Vite, Vitest, and Vitest bench behavior, with an emphasis on config correctness, client runtime safety, and practical documentation.

## Prerequisites

- A Node.js version allowed by `package.json`; the repository default is pinned
  in `.node-version`.
- npm `12.0.2`, matching the exact `packageManager` version in `package.json`.
- Git.
- The full repository-maintenance suite also expects the official `actionlint`,
  `detect-secrets`, Gitleaks, Grype, Lychee, and yamllint CLIs to be available on
  `PATH`. These non-Node tools are installed by the developer environment, not
  by `npm ci`; similarly named npm packages do not provide the official
  `actionlint` or `detect-secrets` executables.

## Local setup

```bash
npm ci
npm run build
npm run typecheck
npm test
```

## Typical contribution flow

1. Create a branch from `main`.
2. Make a focused change.
3. Add or update tests in `test/`.
4. Update rule docs in `docs/rules/` when rule behavior changes.
5. Run validation commands before opening a pull request.

## Validation commands

- `npm run build`
- `npm run typecheck`
- `npm test`
- `npm run lint:all`
- `npm run release:verify`

## Project layout

```text
.
├── src/                  # Plugin source and rule implementations
├── test/                 # Rule tests and contract checks
├── docs/                 # Rule docs and Docusaurus app
├── scripts/              # Sync and maintenance scripts
└── package.json          # Scripts, dependencies, and publish metadata
```

## Rule contribution guidance

When adding or updating a rule:

- keep the rule focused on Vite, Vitest, or Vitest bench behavior
- prefer low-false-positive checks
- add valid and invalid test cases
- add documentation with incorrect and correct examples
- update generated README and preset matrices if rule membership changes

## Pull request expectations

- Keep pull requests reviewable.
- Include tests for behavior changes.
- Keep docs in sync with implementation changes.
- Avoid unrelated churn.

## Security

Do not open public issues for unpatched vulnerabilities.
Use the process described in [SECURITY.md](./SECURITY.md).

## License

By contributing, you agree your contributions are licensed under the [MIT License](./LICENSE).
