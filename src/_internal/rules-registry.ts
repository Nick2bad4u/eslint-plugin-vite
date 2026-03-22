/* eslint-disable canonical/no-re-export -- The plugin rule registry intentionally exposes imported rule modules as runtime plugin metadata. */
import type { TSESLint } from "@typescript-eslint/utils";

import configRequireDefineConfigRule from "../rules/config-require-define-config.js";
import importMetaGlobLiteralRule from "../rules/import-meta-glob-literal.js";
import noDeprecatedConfigOptionsRule from "../rules/no-deprecated-config-options.js";
import noDisabledVitestIsolationRule from "../rules/no-disabled-vitest-isolation.js";
import noDisabledVitestTypecheckRule from "../rules/no-disabled-vitest-typecheck.js";
import noDynamicImportMetaEnvAccessRule from "../rules/no-dynamic-import-meta-env-access.js";
import noEmptyEnvPrefixRule from "../rules/no-empty-env-prefix.js";
import noImplicitConfigFlagsRule from "../rules/no-implicit-config-flags.js";
import noImportMetaEnvInConfigRule from "../rules/no-import-meta-env-in-config.js";
import noMixedTestAndBenchApisRule from "../rules/no-mixed-test-and-bench-apis.js";
import noPassWithNoTestsRule from "../rules/no-pass-with-no-tests.js";
import noRelativeResolveAliasRule from "../rules/no-relative-resolve-alias.js";
import noRestrictedImportMetaEnvRule from "../rules/no-restricted-import-meta-env.js";
import noUnsafeServerOptionsRule from "../rules/no-unsafe-server-options.js";
import noUnsafeVitestFlagsRule from "../rules/no-unsafe-vitest-flags.js";
import noUnsupportedProjectOptionsRule from "../rules/no-unsupported-project-options.js";
import noVitestGlobalsRule from "../rules/no-vitest-globals.js";
import noZeroVitestSlowTestThresholdRule from "../rules/no-zero-vitest-slow-test-threshold.js";
import noZeroVitestTimeoutRule from "../rules/no-zero-vitest-timeout.js";
import preferDefineProjectRule from "../rules/prefer-define-project.js";
import requireInlineProjectNameRule from "../rules/require-inline-project-name.js";
import requireVitestTypecheckTsconfigRule from "../rules/require-vitest-typecheck-tsconfig.js";
import workspaceUniqueProjectNameRule from "../rules/workspace-unique-project-name.js";

/** Runtime rule module shape used by registry and preset builders. */
export type RuleWithDocs = TSESLint.RuleModule<string, readonly unknown[]>;

/** Runtime map of all rule modules keyed by unqualified rule name. */
export type ViteRuleModules = Readonly<{
    "config-require-define-config": RuleWithDocs;
    "import-meta-glob-literal": RuleWithDocs;
    "no-deprecated-config-options": RuleWithDocs;
    "no-disabled-vitest-isolation": RuleWithDocs;
    "no-disabled-vitest-typecheck": RuleWithDocs;
    "no-dynamic-import-meta-env-access": RuleWithDocs;
    "no-empty-env-prefix": RuleWithDocs;
    "no-implicit-config-flags": RuleWithDocs;
    "no-import-meta-env-in-config": RuleWithDocs;
    "no-mixed-test-and-bench-apis": RuleWithDocs;
    "no-pass-with-no-tests": RuleWithDocs;
    "no-relative-resolve-alias": RuleWithDocs;
    "no-restricted-import-meta-env": RuleWithDocs;
    "no-unsafe-server-options": RuleWithDocs;
    "no-unsafe-vitest-flags": RuleWithDocs;
    "no-unsupported-project-options": RuleWithDocs;
    "no-vitest-globals": RuleWithDocs;
    "no-zero-vitest-slow-test-threshold": RuleWithDocs;
    "no-zero-vitest-timeout": RuleWithDocs;
    "prefer-define-project": RuleWithDocs;
    "require-inline-project-name": RuleWithDocs;
    "require-vitest-typecheck-tsconfig": RuleWithDocs;
    "workspace-unique-project-name": RuleWithDocs;
}>;

/** Runtime map of all rule modules keyed by unqualified rule name. */
export const viteRules: ViteRuleModules = {
    "config-require-define-config": configRequireDefineConfigRule,
    "import-meta-glob-literal": importMetaGlobLiteralRule,
    "no-deprecated-config-options": noDeprecatedConfigOptionsRule,
    "no-disabled-vitest-isolation": noDisabledVitestIsolationRule,
    "no-disabled-vitest-typecheck": noDisabledVitestTypecheckRule,
    "no-dynamic-import-meta-env-access": noDynamicImportMetaEnvAccessRule,
    "no-empty-env-prefix": noEmptyEnvPrefixRule,
    "no-implicit-config-flags": noImplicitConfigFlagsRule,
    "no-import-meta-env-in-config": noImportMetaEnvInConfigRule,
    "no-mixed-test-and-bench-apis": noMixedTestAndBenchApisRule,
    "no-pass-with-no-tests": noPassWithNoTestsRule,
    "no-relative-resolve-alias": noRelativeResolveAliasRule,
    "no-restricted-import-meta-env": noRestrictedImportMetaEnvRule,
    "no-unsafe-server-options": noUnsafeServerOptionsRule,
    "no-unsafe-vitest-flags": noUnsafeVitestFlagsRule,
    "no-unsupported-project-options": noUnsupportedProjectOptionsRule,
    "no-vitest-globals": noVitestGlobalsRule,
    "no-zero-vitest-slow-test-threshold": noZeroVitestSlowTestThresholdRule,
    "no-zero-vitest-timeout": noZeroVitestTimeoutRule,
    "prefer-define-project": preferDefineProjectRule,
    "require-inline-project-name": requireInlineProjectNameRule,
    "require-vitest-typecheck-tsconfig": requireVitestTypecheckTsconfigRule,
    "workspace-unique-project-name": workspaceUniqueProjectNameRule,
};

/** Unqualified rule name supported by eslint-plugin-vite. */
export type ViteRuleName = keyof typeof viteRules;

export default viteRules;

/* eslint-enable canonical/no-re-export -- Re-enable after the intentional rule-registry object literal. */
