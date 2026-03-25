import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

import { getRuleCatalogEntryForRuleName } from "../../src/_internal/rule-catalog";

const ruleDocIds = [
    "config-require-define-config",
    "import-meta-glob-literal",
    "no-deprecated-config-options",
    "no-disabled-vitest-isolation",
    "no-disabled-vitest-typecheck",
    "no-dynamic-import-meta-env-access",
    "no-empty-env-prefix",
    "no-empty-optimize-deps-exclude",
    "no-empty-optimize-deps-include",
    "no-empty-ssr-external",
    "no-empty-ssr-noexternal",
    "no-empty-vitest-bench-exclude",
    "no-empty-vitest-bench-include",
    "no-empty-vitest-coverage-include",
    "no-empty-vitest-coverage-reporter",
    "no-empty-vitest-coverage-reports-directory",
    "no-empty-vitest-exclude",
    "no-empty-vitest-include",
    "no-empty-vitest-project-exclude",
    "no-empty-vitest-project-name",
    "no-empty-vitest-projects",
    "no-empty-worker-plugins",
    "no-implicit-config-flags",
    "no-import-meta-env-in-config",
    "no-mixed-defineworkspace-and-test-projects",
    "no-mixed-test-and-bench-apis",
    "no-pass-with-no-tests",
    "no-relative-resolve-alias",
    "no-restricted-import-meta-env",
    "no-unsupported-project-options",
    "no-unsafe-server-options",
    "no-unsafe-vitest-flags",
    "no-vitest-bail-and-retry-conflict",
    "no-vitest-coverage-all-false",
    "no-vitest-coverage-clean-false",
    "no-vitest-coverage-enabled-false-with-thresholds",
    "no-vitest-coverage-reporter-text-only",
    "no-vitest-coverage-skip-full-false-in-strict",
    "no-vitest-coverage-temp-dir-in-repo-root",
    "no-vitest-default-cache-dir-in-monorepo",
    "no-vitest-env-leakage-combo",
    "no-vitest-file-parallelism-disabled",
    "no-vitest-globals",
    "no-vitest-max-workers-zero",
    "no-vitest-min-workers-greater-than-max-workers",
    "no-vitest-single-thread-pool-by-default",
    "no-vitest-timeout-triplet-mismatch",
    "no-vitest-unstub-envs-false",
    "no-vitest-unstub-globals-false",
    "no-vitest-ui-in-config",
    "no-vitest-watch-in-config",
    "no-vitepress-empty-head",
    "no-vitepress-empty-theme-config",
    "no-zero-vitest-slow-test-threshold",
    "no-zero-vitest-timeout",
    "prefer-define-project",
    "prefer-vitest-restore-mocks",
    "require-inline-project-name",
    "require-vitest-coverage-provider-when-enabled",
    "require-vitest-coverage-reporter-when-enabled",
    "require-vitest-coverage-reports-directory",
    "require-vitest-coverage-thresholds-when-enabled",
    "require-vitest-environment-match-globs",
    "require-vitest-explicit-environment",
    "require-vitest-mock-reset-policy",
    "require-vitest-sequence-seed-when-shuffle",
    "require-vitest-slow-test-threshold",
    "require-vitest-timeout-triplet",
    "require-vitest-typecheck-tsconfig",
    "require-vitepress-clean-urls-explicit",
    "require-vitepress-title-or-titletemplate",
    "workspace-unique-project-name",
] as const;

const numberedRuleSidebarItems = ruleDocIds.map((ruleDocId) => {
    getRuleCatalogEntryForRuleName(ruleDocId);

    const colorClassName = (() => {
        if (
            ruleDocId.startsWith("config-") ||
            ruleDocId.startsWith("import-meta-")
        ) {
            return "sb-rule-config";
        }

        if (
            ruleDocId.startsWith("no-empty-") ||
            ruleDocId.startsWith("no-relative-") ||
            ruleDocId.startsWith("no-import-meta-") ||
            ruleDocId.startsWith("no-restricted-") ||
            ruleDocId.startsWith("no-deprecated-") ||
            ruleDocId.startsWith("no-unsafe-server-") ||
            ruleDocId.startsWith("no-unsupported-") ||
            ruleDocId.startsWith("no-implicit-")
        ) {
            return "sb-rule-safety";
        }

        if (
            ruleDocId.startsWith("no-vitepress-") ||
            ruleDocId.startsWith("require-vitepress-")
        ) {
            return "sb-rule-vitepress";
        }

        if (
            ruleDocId.includes("vitest") ||
            ruleDocId.startsWith("prefer-vitest-") ||
            ruleDocId.startsWith("prefer-define-project") ||
            ruleDocId.startsWith("workspace-") ||
            ruleDocId.startsWith("require-inline-project-name")
        ) {
            return "sb-rule-vitest";
        }

        return "sb-rule-general";
    })();

    return {
        className: `sb-rule-doc ${colorClassName}`,
        id: ruleDocId,
        label: ruleDocId,
        type: "doc",
    } as const;
});

const sidebars: SidebarsConfig = {
    rules: [
        {
            className: "sb-doc-overview",
            id: "overview",
            type: "doc",
        },
        {
            className: "sb-doc-getting-started",
            id: "getting-started",
            type: "doc",
        },
        {
            className: "sb-cat-guides",
            type: "category",
            label: "📘 Guides",
            items: [
                "guides/adoption-checklist",
                "guides/rollout-and-fix-safety",
                "guides/preset-selection-strategy",
                "guides/type-aware-linting-readiness",
            ],
        },
        {
            className: "sb-cat-presets",
            type: "category",
            label: "🛠️ Presets",
            link: {
                type: "doc",
                id: "presets/index",
            },
            items: [
                {
                    className: "sb-preset-recommended",
                    id: "presets/recommended",
                    type: "doc",
                },
                {
                    className: "sb-preset-strict",
                    id: "presets/strict",
                    type: "doc",
                },
                {
                    className: "sb-preset-all",
                    id: "presets/all",
                    type: "doc",
                },
                {
                    className: "sb-preset-configs",
                    id: "presets/configs",
                    type: "doc",
                },
                {
                    className: "sb-preset-client",
                    id: "presets/client",
                    type: "doc",
                },
                {
                    className: "sb-preset-vitepress",
                    id: "presets/vitepress",
                    type: "doc",
                },
                {
                    className: "sb-preset-vitest",
                    id: "presets/vitest",
                    type: "doc",
                },
                {
                    className: "sb-preset-vitest-bench",
                    id: "presets/vitest-bench",
                    type: "doc",
                },
            ],
        },
        {
            className: "sb-cat-rules",
            type: "category",
            label: "📏 Rules",
            items: numberedRuleSidebarItems,
        },
    ],
};

export default sidebars;
