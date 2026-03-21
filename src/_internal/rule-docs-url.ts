/** Stable docs host/prefix for generated rule docs links. */
export const RULE_DOCS_URL_BASE =
    "https://nick2bad4u.github.io/eslint-plugin-vite/docs/rules/" as const;

/**
 * Build the canonical documentation URL for a rule id.
 *
 * @param ruleName - Unqualified rule id.
 *
 * @returns Canonical docs URL for the rule page.
 */
export const createRuleDocsUrl = (ruleName: string): string =>
    `${RULE_DOCS_URL_BASE}${ruleName}`;
