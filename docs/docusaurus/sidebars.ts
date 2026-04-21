import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebars = {
    docs: [
        {
            className: "sb-doc-overview",
            id: "intro",
            type: "doc",
        },
        {
            className: "sb-doc-getting-started",
            id: "getting-started",
            type: "doc",
        },
        {
            className: "sb-cat-developer",
            items: [
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
                    items: [
                        "charts/plugin-architecture",
                        "charts/rule-lifecycle",
                    ],
                    label: "📊 Charts",
                    link: {
                        id: "charts/index",
                        type: "doc",
                    },
                    type: "category",
                },
            ],
            label: "🧭 Developer",
            link: {
                id: "developer/index",
                type: "doc",
            },
            type: "category",
        },
    ],
} satisfies SidebarsConfig;

export default sidebars;
