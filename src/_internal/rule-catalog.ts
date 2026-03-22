/** Stable rule names used for docs numbering and rule catalog ids. */
const orderedRuleNames = [
    "config-require-define-config",
    "import-meta-glob-literal",
    "no-dynamic-import-meta-env-access",
    "no-empty-env-prefix",
    "no-mixed-test-and-bench-apis",
    "no-relative-resolve-alias",
    "no-restricted-import-meta-env",
    "prefer-define-project",
    "workspace-unique-project-name",
    "no-deprecated-config-options",
    "no-unsafe-server-options",
    "no-import-meta-env-in-config",
    "no-implicit-config-flags",
    "require-inline-project-name",
    "no-unsupported-project-options",
    "no-disabled-vitest-typecheck",
    "no-zero-vitest-timeout",
    "no-unsafe-vitest-flags",
    "require-vitest-typecheck-tsconfig",
    "no-disabled-vitest-isolation",
    "no-zero-vitest-slow-test-threshold",
    "no-pass-with-no-tests",
    "no-vitest-globals",
    "no-empty-vitest-projects",
    "no-empty-vitest-include",
    "no-empty-vitest-project-name",
    "no-empty-vitest-exclude",
    "no-empty-vitest-bench-include",
    "no-empty-vitest-bench-exclude",
    "no-empty-vitest-coverage-include",
    "no-empty-vitest-coverage-reporter",
    "no-empty-vitest-coverage-reports-directory",
    "no-empty-vitest-project-exclude",
    "no-mixed-defineworkspace-and-test-projects",
    "require-vitest-sequence-seed-when-shuffle",
    "no-vitest-watch-in-config",
    "no-vitest-ui-in-config",
    "no-vitest-file-parallelism-disabled",
] as const;

/** Canonical rule catalog entry shape. */
export type ViteRuleCatalogEntry = Readonly<{
    ruleId: ViteRuleCatalogId;
    ruleName: ViteRuleCatalogName;
    ruleNumber: number;
}>;

/** Stable rule catalog identifier format. */
export type ViteRuleCatalogId = `R${string}`;

/** Unqualified rule names supported by eslint-plugin-vite. */
export type ViteRuleCatalogName = (typeof orderedRuleNames)[number];

const toRuleCatalogId = (ruleNumber: number): ViteRuleCatalogId =>
    `R${String(ruleNumber).padStart(3, "0")}`;

/** Canonical catalog metadata entries in stable display/order form. */
export const viteRuleCatalogEntries: readonly ViteRuleCatalogEntry[] =
    orderedRuleNames.map((ruleName, index) => ({
        ruleId: toRuleCatalogId(index + 1),
        ruleName,
        ruleNumber: index + 1,
    }));

/** Fast lookup map for rule catalog metadata by rule name. */
export const viteRuleCatalogByRuleName: Readonly<
    Partial<Record<ViteRuleCatalogName, ViteRuleCatalogEntry>>
> = Object.fromEntries(
    viteRuleCatalogEntries.map((entry) => [entry.ruleName, entry])
) as Readonly<Partial<Record<ViteRuleCatalogName, ViteRuleCatalogEntry>>>;

/** Resolve stable catalog metadata for a rule name when available. */
export const getRuleCatalogEntryForRuleNameOrNull = (
    ruleName: string
): null | ViteRuleCatalogEntry =>
    viteRuleCatalogByRuleName[ruleName as ViteRuleCatalogName] ?? null;

/** Resolve stable catalog metadata for a rule name. */
export const getRuleCatalogEntryForRuleName = (
    ruleName: string
): ViteRuleCatalogEntry => {
    const catalogEntry = getRuleCatalogEntryForRuleNameOrNull(ruleName);

    if (catalogEntry === null) {
        throw new TypeError(
            `Rule '${ruleName}' is missing from the stable rule catalog.`
        );
    }

    return catalogEntry;
};

/** Resolve stable catalog metadata by rule id. */
export const viteRuleCatalogByRuleId: ReadonlyMap<
    ViteRuleCatalogId,
    ViteRuleCatalogEntry
> = new Map(viteRuleCatalogEntries.map((entry) => [entry.ruleId, entry]));

/** Resolve stable catalog metadata for a catalog id. */
export const getRuleCatalogEntryForRuleId = (
    ruleId: ViteRuleCatalogId
): undefined | ViteRuleCatalogEntry => viteRuleCatalogByRuleId.get(ruleId);

/** Validate that catalog ids are unique and sequential. */
export const validateRuleCatalogIntegrity = (): boolean => {
    const entries = viteRuleCatalogEntries;
    const seenRuleIds = new Set<ViteRuleCatalogId>();

    for (const [index, entry] of entries.entries()) {
        if (seenRuleIds.has(entry.ruleId)) {
            return false;
        }

        seenRuleIds.add(entry.ruleId);

        const expectedRuleNumber = index + 1;

        if (entry.ruleNumber !== expectedRuleNumber) {
            return false;
        }

        if (entry.ruleId !== toRuleCatalogId(expectedRuleNumber)) {
            return false;
        }
    }

    return true;
};
