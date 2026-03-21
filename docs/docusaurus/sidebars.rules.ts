import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebars: SidebarsConfig = {
    rules: [
        "overview",
        "getting-started",
        {
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
            type: "category",
            label: "Presets",
            link: {
                type: "doc",
                id: "presets/index",
            },
            items: [
                "presets/recommended",
                "presets/strict",
                "presets/all",
                "presets/configs",
                "presets/client",
                "presets/vitest",
                "presets/vitest-bench",
            ],
        },
        {
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
