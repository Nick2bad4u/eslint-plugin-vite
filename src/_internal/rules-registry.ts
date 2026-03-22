/* eslint-disable canonical/no-re-export -- The plugin rule registry intentionally exposes imported rule modules as runtime plugin metadata. */
import type { TSESLint } from "@typescript-eslint/utils";

import configRequireDefineConfigRule from "../rules/config-require-define-config.js";
import importMetaGlobLiteralRule from "../rules/import-meta-glob-literal.js";
import noDeprecatedConfigOptionsRule from "../rules/no-deprecated-config-options.js";
import noDisabledVitestIsolationRule from "../rules/no-disabled-vitest-isolation.js";
import noDisabledVitestTypecheckRule from "../rules/no-disabled-vitest-typecheck.js";
import noDynamicImportMetaEnvAccessRule from "../rules/no-dynamic-import-meta-env-access.js";
import noEmptyEnvPrefixRule from "../rules/no-empty-env-prefix.js";
import noEmptyVitestBenchExcludeRule from "../rules/no-empty-vitest-bench-exclude.js";
import noEmptyVitestBenchIncludeRule from "../rules/no-empty-vitest-bench-include.js";
import noEmptyVitestCoverageIncludeRule from "../rules/no-empty-vitest-coverage-include.js";
import noEmptyVitestCoverageReporterRule from "../rules/no-empty-vitest-coverage-reporter.js";
import noEmptyVitestCoverageReportsDirectoryRule from "../rules/no-empty-vitest-coverage-reports-directory.js";
import noEmptyVitestExcludeRule from "../rules/no-empty-vitest-exclude.js";
import noEmptyVitestIncludeRule from "../rules/no-empty-vitest-include.js";
import noEmptyVitestProjectExcludeRule from "../rules/no-empty-vitest-project-exclude.js";
import noEmptyVitestProjectNameRule from "../rules/no-empty-vitest-project-name.js";
import noEmptyVitestProjectsRule from "../rules/no-empty-vitest-projects.js";
import noImplicitConfigFlagsRule from "../rules/no-implicit-config-flags.js";
import noImportMetaEnvInConfigRule from "../rules/no-import-meta-env-in-config.js";
import noMixedDefineWorkspaceAndTestProjectsRule from "../rules/no-mixed-defineworkspace-and-test-projects.js";
import noMixedTestAndBenchApisRule from "../rules/no-mixed-test-and-bench-apis.js";
import noPassWithNoTestsRule from "../rules/no-pass-with-no-tests.js";
import noRelativeResolveAliasRule from "../rules/no-relative-resolve-alias.js";
import noRestrictedImportMetaEnvRule from "../rules/no-restricted-import-meta-env.js";
import noUnsafeServerOptionsRule from "../rules/no-unsafe-server-options.js";
import noUnsafeVitestFlagsRule from "../rules/no-unsafe-vitest-flags.js";
import noUnsupportedProjectOptionsRule from "../rules/no-unsupported-project-options.js";
import noVitestFileParallelismDisabledRule from "../rules/no-vitest-file-parallelism-disabled.js";
import noVitestGlobalsRule from "../rules/no-vitest-globals.js";
import noVitestUiInConfigRule from "../rules/no-vitest-ui-in-config.js";
import noVitestWatchInConfigRule from "../rules/no-vitest-watch-in-config.js";
import noZeroVitestSlowTestThresholdRule from "../rules/no-zero-vitest-slow-test-threshold.js";
import noZeroVitestTimeoutRule from "../rules/no-zero-vitest-timeout.js";
import preferDefineProjectRule from "../rules/prefer-define-project.js";
import requireInlineProjectNameRule from "../rules/require-inline-project-name.js";
import requireVitestSequenceSeedWhenShuffleRule from "../rules/require-vitest-sequence-seed-when-shuffle.js";
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
    "no-empty-vitest-bench-exclude": RuleWithDocs;
    "no-empty-vitest-bench-include": RuleWithDocs;
    "no-empty-vitest-coverage-include": RuleWithDocs;
    "no-empty-vitest-coverage-reporter": RuleWithDocs;
    "no-empty-vitest-coverage-reports-directory": RuleWithDocs;
    "no-empty-vitest-exclude": RuleWithDocs;
    "no-empty-vitest-include": RuleWithDocs;
    "no-empty-vitest-project-exclude": RuleWithDocs;
    "no-empty-vitest-project-name": RuleWithDocs;
    "no-empty-vitest-projects": RuleWithDocs;
    "no-implicit-config-flags": RuleWithDocs;
    "no-import-meta-env-in-config": RuleWithDocs;
    "no-mixed-defineworkspace-and-test-projects": RuleWithDocs;
    "no-mixed-test-and-bench-apis": RuleWithDocs;
    "no-pass-with-no-tests": RuleWithDocs;
    "no-relative-resolve-alias": RuleWithDocs;
    "no-restricted-import-meta-env": RuleWithDocs;
    "no-unsafe-server-options": RuleWithDocs;
    "no-unsafe-vitest-flags": RuleWithDocs;
    "no-unsupported-project-options": RuleWithDocs;
    "no-vitest-file-parallelism-disabled": RuleWithDocs;
    "no-vitest-globals": RuleWithDocs;
    "no-vitest-ui-in-config": RuleWithDocs;
    "no-vitest-watch-in-config": RuleWithDocs;
    "no-zero-vitest-slow-test-threshold": RuleWithDocs;
    "no-zero-vitest-timeout": RuleWithDocs;
    "prefer-define-project": RuleWithDocs;
    "require-inline-project-name": RuleWithDocs;
    "require-vitest-sequence-seed-when-shuffle": RuleWithDocs;
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
    "no-empty-vitest-bench-exclude": noEmptyVitestBenchExcludeRule,
    "no-empty-vitest-bench-include": noEmptyVitestBenchIncludeRule,
    "no-empty-vitest-coverage-include": noEmptyVitestCoverageIncludeRule,
    "no-empty-vitest-coverage-reporter": noEmptyVitestCoverageReporterRule,
    "no-empty-vitest-coverage-reports-directory":
        noEmptyVitestCoverageReportsDirectoryRule,
    "no-empty-vitest-exclude": noEmptyVitestExcludeRule,
    "no-empty-vitest-include": noEmptyVitestIncludeRule,
    "no-empty-vitest-project-exclude": noEmptyVitestProjectExcludeRule,
    "no-empty-vitest-project-name": noEmptyVitestProjectNameRule,
    "no-empty-vitest-projects": noEmptyVitestProjectsRule,
    "no-implicit-config-flags": noImplicitConfigFlagsRule,
    "no-import-meta-env-in-config": noImportMetaEnvInConfigRule,
    "no-mixed-defineworkspace-and-test-projects":
        noMixedDefineWorkspaceAndTestProjectsRule,
    "no-mixed-test-and-bench-apis": noMixedTestAndBenchApisRule,
    "no-pass-with-no-tests": noPassWithNoTestsRule,
    "no-relative-resolve-alias": noRelativeResolveAliasRule,
    "no-restricted-import-meta-env": noRestrictedImportMetaEnvRule,
    "no-unsafe-server-options": noUnsafeServerOptionsRule,
    "no-unsafe-vitest-flags": noUnsafeVitestFlagsRule,
    "no-unsupported-project-options": noUnsupportedProjectOptionsRule,
    "no-vitest-file-parallelism-disabled": noVitestFileParallelismDisabledRule,
    "no-vitest-globals": noVitestGlobalsRule,
    "no-vitest-ui-in-config": noVitestUiInConfigRule,
    "no-vitest-watch-in-config": noVitestWatchInConfigRule,
    "no-zero-vitest-slow-test-threshold": noZeroVitestSlowTestThresholdRule,
    "no-zero-vitest-timeout": noZeroVitestTimeoutRule,
    "prefer-define-project": preferDefineProjectRule,
    "require-inline-project-name": requireInlineProjectNameRule,
    "require-vitest-sequence-seed-when-shuffle":
        requireVitestSequenceSeedWhenShuffleRule,
    "require-vitest-typecheck-tsconfig": requireVitestTypecheckTsconfigRule,
    "workspace-unique-project-name": workspaceUniqueProjectNameRule,
};

/** Unqualified rule name supported by eslint-plugin-vite. */
export type ViteRuleName = keyof typeof viteRules;

export default viteRules;

/* eslint-enable canonical/no-re-export -- Re-enable after the intentional rule-registry object literal. */
