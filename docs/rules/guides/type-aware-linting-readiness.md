# Type-aware linting readiness

The current `eslint-plugin-vite` rule set does **not** require TypeScript type information.

That means:

- no preset currently needs `parserOptions.projectService: true`
- the plugin can lint JavaScript and TypeScript config files without a typed Program
- you can adopt the rules early without changing your TypeScript project graph

## Why keep this guide?

The template behind this repository supports type-aware rules, and future Vite ecosystem rules may eventually need type services for higher-confidence checks.

For now, this guide answers one question:

> Do I need type-aware ESLint setup to use eslint-plugin-vite today?

No.

## What to watch for later

If future versions add type-aware rules, the rule pages and preset pages will document that requirement.

## Further reading

- [Getting started](../getting-started.md)
- [Vitest config reference](https://vitest.dev/config/)
