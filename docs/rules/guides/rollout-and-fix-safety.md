# Rollout and fix safety

`eslint-plugin-vite` currently focuses on report-only rules.

That is intentional.

Most Vite and Vitest mistakes involve configuration intent, not just syntax. A blanket autofix can easily replace one broken setup with a different broken setup.

## Safe rollout order

1. Fix config exports.
2. Fix `envPrefix` and `resolve.alias` issues.
3. Fix `import.meta.glob()` calls.
4. Fix `import.meta.env` access patterns.
5. Split mixed test and benchmark files only after the rest of the suite is stable.

## Why these rules are mostly report-only

- `defineConfig(...)` fixes often require import changes.
- env-prefix fixes depend on your deployment and secret-management model.
- alias fixes depend on ESM path helpers, `path.resolve`, or `fileURLToPath(new URL(...))`.
- Vitest workspace fixes require naming decisions that only the maintainer can make.

## Review guidance

When a rule fires, prefer fixing the underlying setup pattern instead of only silencing the lint warning.

Examples:

- If `resolve.alias` uses `"./src"`, switch to an absolute replacement and keep the pattern consistent across the repo.
- If `import.meta.env.SECRET_TOKEN` appears in client code, move that read to server-only code or expose a deliberate public value.
- If a file mixes `bench()` and `test()`, split correctness assertions and benchmarks into separate files.

## Further reading

- [Vite guide](https://vite.dev/guide/)
- [Vitest benchmarking guide](https://vitest.dev/guide/features#benchmarking)