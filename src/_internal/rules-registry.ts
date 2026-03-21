/* eslint-disable canonical/no-re-export -- The plugin rule registry intentionally exposes imported rule modules as runtime plugin metadata. */
import type { TSESLint } from "@typescript-eslint/utils";

import configRequireDefineConfigRule from "../rules/config-require-define-config.js";
import importMetaGlobLiteralRule from "../rules/import-meta-glob-literal.js";
import noDeprecatedConfigOptionsRule from "../rules/no-deprecated-config-options.js";
import noDynamicImportMetaEnvAccessRule from "../rules/no-dynamic-import-meta-env-access.js";
import noEmptyEnvPrefixRule from "../rules/no-empty-env-prefix.js";
import noMixedTestAndBenchApisRule from "../rules/no-mixed-test-and-bench-apis.js";
import noRelativeResolveAliasRule from "../rules/no-relative-resolve-alias.js";
import noRestrictedImportMetaEnvRule from "../rules/no-restricted-import-meta-env.js";
import noUnsafeServerOptionsRule from "../rules/no-unsafe-server-options.js";
import preferDefineProjectRule from "../rules/prefer-define-project.js";
import workspaceUniqueProjectNameRule from "../rules/workspace-unique-project-name.js";

/** Runtime rule module shape used by registry and preset builders. */
export type RuleWithDocs = TSESLint.RuleModule<string, readonly unknown[]>;

/** Runtime map of all rule modules keyed by unqualified rule name. */
export type ViteRuleModules = Readonly<{
    "config-require-define-config": RuleWithDocs;
    "import-meta-glob-literal": RuleWithDocs;
    "no-deprecated-config-options": RuleWithDocs;
    "no-dynamic-import-meta-env-access": RuleWithDocs;
    "no-empty-env-prefix": RuleWithDocs;
    "no-mixed-test-and-bench-apis": RuleWithDocs;
    "no-relative-resolve-alias": RuleWithDocs;
    "no-restricted-import-meta-env": RuleWithDocs;
    "no-unsafe-server-options": RuleWithDocs;
    "prefer-define-project": RuleWithDocs;
    "workspace-unique-project-name": RuleWithDocs;
}>;

/** Runtime map of all rule modules keyed by unqualified rule name. */
export const viteRules: ViteRuleModules = {
    "config-require-define-config": configRequireDefineConfigRule,
    "import-meta-glob-literal": importMetaGlobLiteralRule,
    "no-deprecated-config-options": noDeprecatedConfigOptionsRule,
    "no-dynamic-import-meta-env-access": noDynamicImportMetaEnvAccessRule,
    "no-empty-env-prefix": noEmptyEnvPrefixRule,
    "no-mixed-test-and-bench-apis": noMixedTestAndBenchApisRule,
    "no-relative-resolve-alias": noRelativeResolveAliasRule,
    "no-restricted-import-meta-env": noRestrictedImportMetaEnvRule,
    "no-unsafe-server-options": noUnsafeServerOptionsRule,
    "prefer-define-project": preferDefineProjectRule,
    "workspace-unique-project-name": workspaceUniqueProjectNameRule,
};

/** Unqualified rule name supported by eslint-plugin-vite. */
export type ViteRuleName = keyof typeof viteRules;

export default viteRules;

/* eslint-enable canonical/no-re-export -- Re-enable after the intentional rule-registry object literal. */
