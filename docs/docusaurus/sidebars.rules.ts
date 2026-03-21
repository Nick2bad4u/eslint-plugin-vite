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
                "no-dynamic-import-meta-env-access",
                "no-empty-env-prefix",
                "no-mixed-test-and-bench-apis",
                "no-relative-resolve-alias",
                "no-restricted-import-meta-env",
                "no-unsafe-server-options",
                "prefer-define-project",
                "workspace-unique-project-name",
            ],
        },
    ],
};

export default sidebars;
