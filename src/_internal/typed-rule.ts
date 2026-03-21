import type { TSESLint } from "@typescript-eslint/utils";

import { ESLintUtils } from "@typescript-eslint/utils";

import type { ViteConfigReference } from "./vite-config-references.js";

import { getRuleCatalogEntryForRuleNameOrNull } from "./rule-catalog.js";
import { createRuleDocsUrl } from "./rule-docs-url.js";

/** Current rule-catalog revision identifier stamped into `meta.docs`. */
const RULE_CATALOG_ID = "R001" as const;

type ViteRuleCreator = ReturnType<
    typeof ESLintUtils.RuleCreator<ViteRuleInputDocs>
>;

/** Plugin-specific metadata extensions for `meta.docs`. */
type ViteRuleDocs = {
    description?: string;
    frozen?: boolean;
    recommended?: boolean;
    requiresTypeChecking?: boolean;
    ruleCatalogId: string;
    ruleId?: string;
    ruleNumber?: number;
    viteConfigs?: readonly ViteConfigReference[] | ViteConfigReference;
};

/** Rule authoring metadata contract accepted by `RuleCreator`. */
type ViteRuleInputDocs = Omit<
    ViteRuleDocs,
    "ruleCatalogId" | "ruleId" | "ruleNumber"
> & {
    ruleCatalogId?: string;
    ruleId?: string;
    ruleNumber?: number;
};

/** Shared rule-creator wrapper used by all plugin rules. */
export const createTypedRule: ViteRuleCreator = (ruleDefinition) => {
    const catalogEntry = getRuleCatalogEntryForRuleNameOrNull(
        ruleDefinition.name
    );
    const createdRule = ESLintUtils.RuleCreator.withoutDocs(ruleDefinition);
    const ruleDocs = createdRule.meta.docs;

    if (ruleDocs === undefined) {
        throw new TypeError(
            `Rule '${ruleDefinition.name}' must declare meta.docs.`
        );
    }

    const canonicalDocsUrl = createRuleDocsUrl(ruleDefinition.name);

    if (typeof ruleDocs.url === "string" && ruleDocs.url !== canonicalDocsUrl) {
        throw new TypeError(
            `Rule '${ruleDefinition.name}' has non-canonical docs.url '${ruleDocs.url}'. Expected '${canonicalDocsUrl}'.`
        );
    }

    if (catalogEntry === null) {
        throw new TypeError(
            `Rule '${ruleDefinition.name}' is missing from the stable rule catalog.`
        );
    }

    const docsWithCatalog: TSESLint.RuleMetaDataDocs & ViteRuleDocs = {
        ...ruleDocs,
        ruleCatalogId: RULE_CATALOG_ID,
        ruleId: catalogEntry.ruleId,
        ruleNumber: catalogEntry.ruleNumber,
        url: canonicalDocsUrl,
    };

    const metaDefaultOptions = createdRule.meta.defaultOptions;

    return {
        ...createdRule,
        meta: {
            ...createdRule.meta,
            ...(metaDefaultOptions === undefined
                ? {}
                : { defaultOptions: metaDefaultOptions }),
            docs: docsWithCatalog,
        },
        name: ruleDefinition.name,
    };
};
