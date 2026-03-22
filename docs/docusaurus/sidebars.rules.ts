import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

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
            label: "Guides",
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
            label: "Presets",
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
            label: "Rules",
            items: [
                "config-require-define-config",
                "import-meta-glob-literal",
                "no-deprecated-config-options",
                "no-disabled-vitest-isolation",
                "no-disabled-vitest-typecheck",
                "no-dynamic-import-meta-env-access",
                "no-empty-env-prefix",
                "no-empty-vitest-include",
                "no-empty-vitest-project-name",
                "no-empty-vitest-projects",
                "no-implicit-config-flags",
                "no-import-meta-env-in-config",
                "no-mixed-test-and-bench-apis",
                "no-pass-with-no-tests",
                "no-relative-resolve-alias",
                "no-restricted-import-meta-env",
                "no-unsupported-project-options",
                "no-unsafe-server-options",
                "no-unsafe-vitest-flags",
                "no-vitest-globals",
                "no-zero-vitest-slow-test-threshold",
                "no-zero-vitest-timeout",
                "prefer-define-project",
                "require-inline-project-name",
                "require-vitest-typecheck-tsconfig",
                "workspace-unique-project-name",
            ],
        },
    ],
};

export default sidebars;
