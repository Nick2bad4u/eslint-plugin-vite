import nickTwoBadFourU from "eslint-config-nick2bad4u";

import vitePlugin from "./plugin.mjs";

/** @type {import("eslint").Linter.Config[]} */
const config = [
    ...nickTwoBadFourU.configs.withoutVite,

    {
        ignores: [
            "knip.config.ts",
            "plugin.d.cts",
            "vitest.stryker.config.ts",
        ],
        name: "Generated and Tooling TypeScript",
    },

    {
        name: "Repository TypeScript Import Style",
        rules: {
            "no-duplicate-imports": [
                "error",
                {
                    allowSeparateTypeImports: true,
                    includeExports: true,
                },
            ],
        },
    },

    {
        files: ["package.json", "docs/docusaurus/package.json"],
        name: "Deterministic package metadata lint",
        rules: {
            // This rule performs npm registry lookups during lint. Keep release
            // verification deterministic; dependency freshness is handled by
            // the explicit update flow.
            "node-dependencies/no-deprecated": "off",
        },
    },

    {
        files: ["src/**/*.{ts,mts,tsx}", "test/**/*.{ts,mts,tsx}"],
        name: "Repository Boolean Naming",
        rules: {
            "unicorn/consistent-boolean-name": [
                "error",
                {
                    checkProperties: false,
                    prefixes: {
                        allow: true,
                        allows: true,
                        are: true,
                        disable: true,
                        disallow: true,
                        enable: true,
                        exclude: true,
                        hide: true,
                        ignore: true,
                        include: true,
                        matches: true,
                        property: true,
                        require: true,
                        requires: true,
                        resolves: true,
                        show: true,
                        skip: true,
                        supports: true,
                        use: true,
                        validate: true,
                        without: true,
                    },
                },
            ],
        },
    },

    // Local Plugin Config
    // This lets us use the plugin's rules in this repository without needing to publish the plugin first.
    {
        files: ["src/**/*.{js,mjs,cjs,ts,mts,cts,tsx,jsx}"],
        name: "Local Vite",
        plugins: {
            vite: vitePlugin,
        },
        rules: {
            ...vitePlugin.configs.all.rules,
        },
    },

    {
        files: ["src/_internal/rules-registry.ts"],
        name: "Generated Rule Registry",
        rules: {
            "import-x/max-dependencies": "off",
        },
    },

    {
        files: ["test/**/*.test.ts", "test/**/*.test-d.ts"],
        name: "RuleTester Smoke Tests",
        rules: {
            "test-signal/no-duplicate-assertions": "off",
            "test-signal/no-weak-existence-assertions": "off",
            "test-signal/require-negative-path": "off",
        },
    },

    {
        files: ["stryker.config.mjs"],
        name: "Root JavaScript Tooling",
        rules: {
            "@typescript-eslint/no-unsafe-assignment": "off",
            "@typescript-eslint/no-unsafe-call": "off",
            "@typescript-eslint/no-unsafe-member-access": "off",
        },
    },

    {
        files: [
            ".github/pull_request_template.md",
            "docs/docusaurus/src/**/*.css",
        ],
        name: "Documentation Assets",
        rules: {
            "remark/remark": "off",
            "stylelint-2/stylelint": "off",
        },
    },

    {
        files: [
            "docs/docusaurus/blog/**/*.md",
            "docs/docusaurus/site-docs/**/*.md",
            "docs/rules/**/*.md",
        ],
        name: "Docusaurus Markdown frontmatter titles",
        rules: {
            "markdown/no-multiple-h1": "off",
        },
    },

    {
        files: ["docs/docusaurus/**/*.{ts,tsx}"],
        name: "Docusaurus Application",
        rules: {
            "canonical/filename-no-index": "off",
            "listeners/no-missing-remove-event-listener": "off",
            "n/no-process-env": "off",
            "n/no-sync": "off",
            "regexp/require-unicode-sets-regexp": "off",
            "runtime-cleanup/no-floating-timers": "off",
            "runtime-cleanup/no-unmanaged-event-listeners": "off",
            "unicorn/filename-case": "off",
            "unicorn/no-non-function-verb-prefix": "off",
            "unicorn/no-unnecessary-global-this": "off",
            "unicorn/no-unreadable-new-expression": "off",
            "unicorn/prefer-temporal": "off",
        },
    },
    {
        files: ["docs/docusaurus/src/js/modernEnhancements.ts"],
        name: "Docusaurus browser enhancement script",
        rules: {
            // This file is loaded as a browser enhancement script by Docusaurus.
            "@typescript-eslint/no-unnecessary-condition": "off",
            "import-x/unambiguous": "off",
        },
    },
    {
        files: [
            "docs/docusaurus/src/plugins/suppressKnownWebpackWarningsPlugin.ts",
        ],
        name: "Docusaurus webpack warning suppression",
        rules: {
            // This Docusaurus plugin resolves package entrypoints from installed
            // package metadata during the local docs build.
            "@typescript-eslint/prefer-readonly-parameter-types": "off",
            "security/detect-non-literal-fs-filename": "off",
        },
    },
    {
        files: ["docs/docusaurus/static/manifest.json"],
        name: "Docusaurus web app manifest",
        rules: {
            // This is a web app manifest, not a browser extension manifest.
            "json-schema-validator-2/no-invalid": "off",
        },
    },
    {
        files: ["docs/docusaurus/sidebars.rules.ts"],
        name: "Docusaurus dynamic sidebar generation",
        rules: {
            // The sidebar validates rule ids against this package's source
            // catalog, but the docs workspace resolver cannot resolve the
            // package self-reference until the package is built/installed.
            "@typescript-eslint/no-unsafe-call": "off",
            "import-x/no-relative-packages": "off",
            "import-x/no-unresolved": "off",
        },
    },
    {
        files: ["docs/docusaurus/typedoc.config.json"],
        name: "TypeDoc config schema availability",
        rules: {
            // Json-schema-validator-2 fetches the remote TypeDoc schema during
            // lint. TypeDoc validates this config during docs verification.
            "json-schema-validator-2/no-invalid": "off",
        },
    },
    {
        files: ["**/*.{yaml,yml}"],
        name: "Dedicated Yamllint Boundary",
        rules: {
            "yamllint/yamllint": "off",
        },
    },
    {
        files: ["src/_internal/ast.ts", "src/rules/**/*.{ts,mts,cts,tsx}"],
        name: "Rule Domain Naming Compatibility",
        rules: {
            "unicorn/consistent-boolean-name": "off",
        },
    },
    // Add repository-specific config entries below as needed.
];

export default config;
