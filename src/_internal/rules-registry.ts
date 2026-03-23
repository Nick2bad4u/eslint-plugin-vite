/* eslint-disable canonical/no-re-export -- The plugin rule registry intentionally exposes imported rule modules as runtime plugin metadata. */
import type { TSESLint } from "@typescript-eslint/utils";

import configRequireDefineConfigRule from "../rules/config-require-define-config.js";
import importMetaGlobLiteralRule from "../rules/import-meta-glob-literal.js";
import noDeprecatedConfigOptionsRule from "../rules/no-deprecated-config-options.js";
import noDisabledVitestIsolationRule from "../rules/no-disabled-vitest-isolation.js";
import noDisabledVitestTypecheckRule from "../rules/no-disabled-vitest-typecheck.js";
import noDynamicImportMetaEnvAccessRule from "../rules/no-dynamic-import-meta-env-access.js";
import noEmptyEnvPrefixRule from "../rules/no-empty-env-prefix.js";
import noEmptyOptimizeDepsExcludeRule from "../rules/no-empty-optimize-deps-exclude.js";
import noEmptyOptimizeDepsIncludeRule from "../rules/no-empty-optimize-deps-include.js";
import noEmptySsrExternalRule from "../rules/no-empty-ssr-external.js";
import noEmptySsrNoExternalRule from "../rules/no-empty-ssr-noexternal.js";
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
import noEmptyWorkerPluginsRule from "../rules/no-empty-worker-plugins.js";
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
import noVitePressEmptyHeadRule from "../rules/no-vitepress-empty-head.js";
import noVitePressEmptyThemeConfigRule from "../rules/no-vitepress-empty-theme-config.js";
import noVitestBailAndRetryConflictRule from "../rules/no-vitest-bail-and-retry-conflict.js";
import noVitestCoverageAllFalseRule from "../rules/no-vitest-coverage-all-false.js";
import noVitestCoverageCleanFalseRule from "../rules/no-vitest-coverage-clean-false.js";
import noVitestCoverageEnabledFalseWithThresholdsRule from "../rules/no-vitest-coverage-enabled-false-with-thresholds.js";
import noVitestCoverageReporterTextOnlyRule from "../rules/no-vitest-coverage-reporter-text-only.js";
import noVitestCoverageSkipFullFalseInStrictRule from "../rules/no-vitest-coverage-skip-full-false-in-strict.js";
import noVitestCoverageTempDirInRepoRootRule from "../rules/no-vitest-coverage-temp-dir-in-repo-root.js";
import noVitestDefaultCacheDirInMonorepoRule from "../rules/no-vitest-default-cache-dir-in-monorepo.js";
import noVitestEnvLeakageComboRule from "../rules/no-vitest-env-leakage-combo.js";
import noVitestFileParallelismDisabledRule from "../rules/no-vitest-file-parallelism-disabled.js";
import noVitestGlobalsRule from "../rules/no-vitest-globals.js";
import noVitestMaxWorkersZeroRule from "../rules/no-vitest-max-workers-zero.js";
import noVitestMinWorkersGreaterThanMaxWorkersRule from "../rules/no-vitest-min-workers-greater-than-max-workers.js";
import noVitestSingleThreadPoolByDefaultRule from "../rules/no-vitest-single-thread-pool-by-default.js";
import noVitestTimeoutTripletMismatchRule from "../rules/no-vitest-timeout-triplet-mismatch.js";
import noVitestUiInConfigRule from "../rules/no-vitest-ui-in-config.js";
import noVitestUnstubEnvsFalseRule from "../rules/no-vitest-unstub-envs-false.js";
import noVitestUnstubGlobalsFalseRule from "../rules/no-vitest-unstub-globals-false.js";
import noVitestWatchInConfigRule from "../rules/no-vitest-watch-in-config.js";
import noZeroVitestSlowTestThresholdRule from "../rules/no-zero-vitest-slow-test-threshold.js";
import noZeroVitestTimeoutRule from "../rules/no-zero-vitest-timeout.js";
import preferDefineProjectRule from "../rules/prefer-define-project.js";
import preferVitestRestoreMocksRule from "../rules/prefer-vitest-restore-mocks.js";
import requireInlineProjectNameRule from "../rules/require-inline-project-name.js";
import requireVitePressCleanUrlsExplicitRule from "../rules/require-vitepress-clean-urls-explicit.js";
import requireVitePressTitleOrTitleTemplateRule from "../rules/require-vitepress-title-or-titletemplate.js";
import requireVitestCoverageProviderWhenEnabledRule from "../rules/require-vitest-coverage-provider-when-enabled.js";
import requireVitestCoverageReporterWhenEnabledRule from "../rules/require-vitest-coverage-reporter-when-enabled.js";
import requireVitestCoverageReportsDirectoryRule from "../rules/require-vitest-coverage-reports-directory.js";
import requireVitestCoverageThresholdsWhenEnabledRule from "../rules/require-vitest-coverage-thresholds-when-enabled.js";
import requireVitestEnvironmentMatchGlobsRule from "../rules/require-vitest-environment-match-globs.js";
import requireVitestExplicitEnvironmentRule from "../rules/require-vitest-explicit-environment.js";
import requireVitestMockResetPolicyRule from "../rules/require-vitest-mock-reset-policy.js";
import requireVitestSequenceSeedWhenShuffleRule from "../rules/require-vitest-sequence-seed-when-shuffle.js";
import requireVitestSlowTestThresholdRule from "../rules/require-vitest-slow-test-threshold.js";
import requireVitestTimeoutTripletRule from "../rules/require-vitest-timeout-triplet.js";
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
    "no-empty-optimize-deps-exclude": RuleWithDocs;
    "no-empty-optimize-deps-include": RuleWithDocs;
    "no-empty-ssr-external": RuleWithDocs;
    "no-empty-ssr-noexternal": RuleWithDocs;
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
    "no-empty-worker-plugins": RuleWithDocs;
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
    "no-vitepress-empty-head": RuleWithDocs;
    "no-vitepress-empty-theme-config": RuleWithDocs;
    "no-vitest-bail-and-retry-conflict": RuleWithDocs;
    "no-vitest-coverage-all-false": RuleWithDocs;
    "no-vitest-coverage-clean-false": RuleWithDocs;
    "no-vitest-coverage-enabled-false-with-thresholds": RuleWithDocs;
    "no-vitest-coverage-reporter-text-only": RuleWithDocs;
    "no-vitest-coverage-skip-full-false-in-strict": RuleWithDocs;
    "no-vitest-coverage-temp-dir-in-repo-root": RuleWithDocs;
    "no-vitest-default-cache-dir-in-monorepo": RuleWithDocs;
    "no-vitest-env-leakage-combo": RuleWithDocs;
    "no-vitest-file-parallelism-disabled": RuleWithDocs;
    "no-vitest-globals": RuleWithDocs;
    "no-vitest-max-workers-zero": RuleWithDocs;
    "no-vitest-min-workers-greater-than-max-workers": RuleWithDocs;
    "no-vitest-single-thread-pool-by-default": RuleWithDocs;
    "no-vitest-timeout-triplet-mismatch": RuleWithDocs;
    "no-vitest-ui-in-config": RuleWithDocs;
    "no-vitest-unstub-envs-false": RuleWithDocs;
    "no-vitest-unstub-globals-false": RuleWithDocs;
    "no-vitest-watch-in-config": RuleWithDocs;
    "no-zero-vitest-slow-test-threshold": RuleWithDocs;
    "no-zero-vitest-timeout": RuleWithDocs;
    "prefer-define-project": RuleWithDocs;
    "prefer-vitest-restore-mocks": RuleWithDocs;
    "require-inline-project-name": RuleWithDocs;
    "require-vitepress-clean-urls-explicit": RuleWithDocs;
    "require-vitepress-title-or-titletemplate": RuleWithDocs;
    "require-vitest-coverage-provider-when-enabled": RuleWithDocs;
    "require-vitest-coverage-reporter-when-enabled": RuleWithDocs;
    "require-vitest-coverage-reports-directory": RuleWithDocs;
    "require-vitest-coverage-thresholds-when-enabled": RuleWithDocs;
    "require-vitest-environment-match-globs": RuleWithDocs;
    "require-vitest-explicit-environment": RuleWithDocs;
    "require-vitest-mock-reset-policy": RuleWithDocs;
    "require-vitest-sequence-seed-when-shuffle": RuleWithDocs;
    "require-vitest-slow-test-threshold": RuleWithDocs;
    "require-vitest-timeout-triplet": RuleWithDocs;
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
    "no-empty-optimize-deps-exclude": noEmptyOptimizeDepsExcludeRule,
    "no-empty-optimize-deps-include": noEmptyOptimizeDepsIncludeRule,
    "no-empty-ssr-external": noEmptySsrExternalRule,
    "no-empty-ssr-noexternal": noEmptySsrNoExternalRule,
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
    "no-empty-worker-plugins": noEmptyWorkerPluginsRule,
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
    "no-vitepress-empty-head": noVitePressEmptyHeadRule,
    "no-vitepress-empty-theme-config": noVitePressEmptyThemeConfigRule,
    "no-vitest-bail-and-retry-conflict": noVitestBailAndRetryConflictRule,
    "no-vitest-coverage-all-false": noVitestCoverageAllFalseRule,
    "no-vitest-coverage-clean-false": noVitestCoverageCleanFalseRule,
    "no-vitest-coverage-enabled-false-with-thresholds":
        noVitestCoverageEnabledFalseWithThresholdsRule,
    "no-vitest-coverage-reporter-text-only":
        noVitestCoverageReporterTextOnlyRule,
    "no-vitest-coverage-skip-full-false-in-strict":
        noVitestCoverageSkipFullFalseInStrictRule,
    "no-vitest-coverage-temp-dir-in-repo-root":
        noVitestCoverageTempDirInRepoRootRule,
    "no-vitest-default-cache-dir-in-monorepo":
        noVitestDefaultCacheDirInMonorepoRule,
    "no-vitest-env-leakage-combo": noVitestEnvLeakageComboRule,
    "no-vitest-file-parallelism-disabled": noVitestFileParallelismDisabledRule,
    "no-vitest-globals": noVitestGlobalsRule,
    "no-vitest-max-workers-zero": noVitestMaxWorkersZeroRule,
    "no-vitest-min-workers-greater-than-max-workers":
        noVitestMinWorkersGreaterThanMaxWorkersRule,
    "no-vitest-single-thread-pool-by-default":
        noVitestSingleThreadPoolByDefaultRule,
    "no-vitest-timeout-triplet-mismatch": noVitestTimeoutTripletMismatchRule,
    "no-vitest-ui-in-config": noVitestUiInConfigRule,
    "no-vitest-unstub-envs-false": noVitestUnstubEnvsFalseRule,
    "no-vitest-unstub-globals-false": noVitestUnstubGlobalsFalseRule,
    "no-vitest-watch-in-config": noVitestWatchInConfigRule,
    "no-zero-vitest-slow-test-threshold": noZeroVitestSlowTestThresholdRule,
    "no-zero-vitest-timeout": noZeroVitestTimeoutRule,
    "prefer-define-project": preferDefineProjectRule,
    "prefer-vitest-restore-mocks": preferVitestRestoreMocksRule,
    "require-inline-project-name": requireInlineProjectNameRule,
    "require-vitepress-clean-urls-explicit":
        requireVitePressCleanUrlsExplicitRule,
    "require-vitepress-title-or-titletemplate":
        requireVitePressTitleOrTitleTemplateRule,
    "require-vitest-coverage-provider-when-enabled":
        requireVitestCoverageProviderWhenEnabledRule,
    "require-vitest-coverage-reporter-when-enabled":
        requireVitestCoverageReporterWhenEnabledRule,
    "require-vitest-coverage-reports-directory":
        requireVitestCoverageReportsDirectoryRule,
    "require-vitest-coverage-thresholds-when-enabled":
        requireVitestCoverageThresholdsWhenEnabledRule,
    "require-vitest-environment-match-globs":
        requireVitestEnvironmentMatchGlobsRule,
    "require-vitest-explicit-environment": requireVitestExplicitEnvironmentRule,
    "require-vitest-mock-reset-policy": requireVitestMockResetPolicyRule,
    "require-vitest-sequence-seed-when-shuffle":
        requireVitestSequenceSeedWhenShuffleRule,
    "require-vitest-slow-test-threshold": requireVitestSlowTestThresholdRule,
    "require-vitest-timeout-triplet": requireVitestTimeoutTripletRule,
    "require-vitest-typecheck-tsconfig": requireVitestTypecheckTsconfigRule,
    "workspace-unique-project-name": workspaceUniqueProjectNameRule,
};

/** Unqualified rule name supported by eslint-plugin-vite. */
export type ViteRuleName = keyof typeof viteRules;

export default viteRules;

/* eslint-enable canonical/no-re-export -- Re-enable after the intentional rule-registry object literal. */
