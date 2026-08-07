/**
 * Repository-specific configuration for Knip dependency analysis.
 *
 * @packageDocumentation
 */
import type { KnipConfig } from "knip";

/**
 * Knip configuration that scopes entry points and dependency heuristics to the
 * repository layout.
 */
const knipConfig: KnipConfig = {
    $schema: "https://unpkg.com/knip@6/schema.json",
    entry: [],
    ignore: [],
    ignoreBinaries: [
        // These security/repository linters are intentionally supplied by the
        // developer image and GitHub runners rather than npm packages.
        "actionlint",
        "detect-secrets",
        "gitleaks",
        "grype",
        "lychee",
        // False-positve Knip thinks knip.config.ts is a binary entry point, but it's actually just a config file.
        "knip.config.ts",
    ],
    ignoreDependencies: [
        // Docusaurus derives this virtual theme name from the declared
        // @easyops-cn/docusaurus-search-local package.
        "@easyops-cn/docusaurus-search-local",
        "@easyops-cn/docusaurus-theme-docusaurus-search-local",
        // Stryker resolves these plugin families dynamically from its config.
        "@stryker-ignorer/*",
        "@stryker-mutator/*",
        // The shared Stylelint preset owns these plugins and exposes their
        // module names as strings in the composed runtime configuration.
        "@double-great/stylelint-a11y",
        "@stylistic/stylelint-plugin",
        "postcss.*",
        "stylelint.*",
        // TypeScript resolves React within the Docusaurus workspace and tslib
        // through the compiler/toolchain; the root config is not a consumer.
        "react",
        "tslib",
        // These packages are consumed through executable or configuration file
        // paths that Knip cannot infer from package scripts and config loaders.
        "git-cliff",
        "gitcliff-config-nick2bad4u",
        "gitleaks-config-nick2bad4u",
        "jscpd-config-nick2bad4u",
        "lychee-config-nick2bad4u",
        "ncu-config-nick2bad4u",
        "@microsoft/tsdoc-config",
        "secretlint-config-nick2bad4u",
        "tsdoc-config-nick2bad4u",
        "typed-css-modules",
        "typedoc",
        "typedoc-config-nick2bad4u",
        "yamllint-config-nick2bad4u",
    ],
    ignoreExportsUsedInFile: {
        interface: true,
        type: true,
    },
    project: [],
    tags: ["-@internal"],
    rules: {
        binaries: "error",
        catalog: "error",
        dependencies: "error",
        devDependencies: "error",
        duplicates: "error",
        enumMembers: "warn",
        exports: "warn",
        files: "error",
        namespaceMembers: "warn",
        nsExports: "warn",
        nsTypes: "warn",
        optionalPeerDependencies: "error",
        types: "warn",
        unlisted: "error",
        unresolved: "error",
    },
    workspaces: {
        ".": {
            entry: [
                "scripts/**/*.{js,mjs,cjs,ts,mts,cts}",
                "src/plugin.ts",
                "test/**/*.test.{js,ts,mts}",
            ],
            project: [
                "scripts/**/*.{js,ts,tsx,jsx,mts,cjs,cts,mjs}",
                "!src/**/*.spec.{js,ts,tsx,jsx,mts,cjs,cts,mjs}",
                "!src/**/*.test.{js,ts,tsx,jsx,mts,cjs,cts,mjs}",
                "src/**/*.{js,ts,tsx,jsx,mts,cjs,cts,mjs}",
                "test/**/*.{js,ts,tsx,jsx,mts,cjs,cts,mjs}",
            ],
        },
    },
};

export default knipConfig;
