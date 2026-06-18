import nickTwoBadFourU from "eslint-config-nick2bad4u";

import vitePlugin from "./plugin.mjs";

/** @type {import("eslint").Linter.Config[]} */
const config = [
    ...nickTwoBadFourU.configs.withoutVite,

    {
        ignores: ["knip.config.ts", "plugin.d.cts", "vitest.stryker.config.ts"],
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
    // Add repository-specific config entries below as needed.
];

export default config;
