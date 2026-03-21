# Adoption checklist

Use this checklist when introducing `eslint-plugin-vite` to an existing codebase.

## Baseline rollout

1. Start with `vite.configs.recommended`.
2. Fix any config-file errors first.
3. Add `vite.configs.client` only after client bundles are already using `import.meta.env` and `import.meta.glob` consistently.
4. Add `vite.configs.vitest` only if your repository actually uses Vitest configs or workspaces.
5. Add `vite.configs.vitest-bench` only if benchmark files live next to test files and contributors could accidentally mix them.

## Config-file review

- Check `vite.config.*` exports.
- Check `vitest.config.*` exports.
- Check `vitest.workspace.*` project names.
- Check `resolve.alias` values for relative replacement strings.
- Check `envPrefix` for accidental empty strings.

## Client code review

- Search for `import.meta.env[...]`.
- Search for `import.meta.glob(` with variables or interpolated template strings.
- Review any env keys that do not use your public prefix.

## Team process review

- Decide whether benchmark files should be linted with `vite.configs.vitest-bench`.
- Decide whether `vite.configs.strict` should be opt-in or the default.
- Document any custom public env prefixes so the env rule can be configured explicitly.

## Further reading

- [Preset selection strategy](./preset-selection-strategy.md)
- [Rollout and fix safety](./rollout-and-fix-safety.md)
