import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

/**
 * Developer sidebar — served by the classic-preset docs plugin (site-docs/ →
 * /docs/).
 *
 * The main rules / intro / getting-started sidebar lives in sidebars.rules.ts
 * and is served by the rules plugin (docs/rules/ → /docs/rules/).
 */
const sidebars = {
    docs: [
        {
            className: "sb-doc-developer-overview",
            id: "developer/index",
            label: "🧭 Developer Overview",
            type: "doc",
        },
        {
            className: "sb-cat-developer-adr",
            items: [
                "adr/0001-vite-first-rule-scope",
                "adr/0002-hand-authored-docs-and-synced-catalogs",
            ],
            label: "🗺️ ADRs",
            link: {
                id: "adr/index",
                type: "doc",
            },
            type: "category",
        },
        {
            className: "sb-cat-dev-charts",
            items: ["charts/plugin-architecture", "charts/rule-lifecycle"],
            label: "📊 Charts",
            link: {
                id: "charts/index",
                type: "doc",
            },
            type: "category",
        },
    ],
} satisfies SidebarsConfig;

export default sidebars;
