import { themes as prismThemes } from "prism-react-renderer";

import type { Config } from "@docusaurus/types";
import type { Options as DocsPluginOptions } from "@docusaurus/plugin-content-docs";
import type * as Preset from "@docusaurus/preset-classic";
import { fileURLToPath } from "node:url";

import { suppressKnownWebpackWarningsPlugin } from "./src/plugins/suppressKnownWebpackWarningsPlugin";

const baseUrl = process.env["DOCUSAURUS_BASE_URL"] ?? "/eslint-plugin-vite/";
const enableExperimentalFaster =
    process.env["DOCUSAURUS_ENABLE_EXPERIMENTAL"] === "true";

const organizationName = "Nick2bad4u";
const projectName = "eslint-plugin-vite";
const siteOrigin = "https://nick2bad4u.github.io";
const siteUrl = `${siteOrigin}${baseUrl}`;
const siteDescription =
    "ESLint rules for Vite, Vitest, and Vitest bench with type-safe configuration guidance.";
const socialCardImagePath = "img/logo.png";
const socialCardImageUrl = new URL(socialCardImagePath, siteUrl).toString();
const modernEnhancementsClientModule = fileURLToPath(
    new URL("src/js/modernEnhancements.ts", import.meta.url)
);

const pwaThemeColor = "#101010";
const footerCopyright =
    `© ${new Date().getFullYear()} ` +
    '<a href="https://github.com/Nick2bad4u/" target="_blank" rel="noopener noreferrer">Nick2bad4u</a> 💻 Built with ' +
    '<a href="https://docusaurus.io/" target="_blank" rel="noopener noreferrer">🦖 Docusaurus</a>.';

const removeHeadAttrFlagKey = [
    "remove",
    "Le",
    "gacyPostBuildHeadAttribute",
].join("");

const futureConfig = {
    ...(enableExperimentalFaster
        ? {
              faster: {
                  mdxCrossCompilerCache: true,
                  rspackBundler: true,
                  rspackPersistentCache: true,
                  ssgWorkerThreads: true,
              },
          }
        : {}),
    v4: {
        [removeHeadAttrFlagKey]: true,
        // NOTE: Enabling cascade layers currently breaks our production CSS output
        // (CssMinimizer parsing errors -> large chunks of CSS dropped), which
        // makes many Infima (--ifm-*) variables undefined across the site.
        // Re-enable only after verifying the build output CSS is valid.
        siteStorageNamespacing: true,
        fasterByDefault: true,
        removeLegacyPostBuildHeadAttribute: true,
        mdx1CompatDisabledByDefault: true,
        useCssCascadeLayers: false,
    },
} satisfies Config["future"];

const config = {
    baseUrl,
    baseUrlIssueBanner: true,
    clientModules: [modernEnhancementsClientModule],
    deploymentBranch: "gh-pages",
    favicon: "img/favicon.ico",
    future: futureConfig,
    headTags: [
        {
            attributes: {
                href: siteOrigin,
                rel: "preconnect",
            },
            tagName: "link",
        },
        {
            attributes: {
                href: "https://github.com",
                rel: "preconnect",
            },
            tagName: "link",
        },
        {
            attributes: {
                type: "application/ld+json",
            },
            innerHTML: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "WebSite",
                description: siteDescription,
                image: socialCardImageUrl,
                name: projectName,
                publisher: {
                    "@type": "Person",
                    name: "Nick2bad4u",
                    url: "https://github.com/Nick2bad4u",
                },
                url: siteUrl,
            }),
            tagName: "script",
        },
    ],
    i18n: {
        defaultLocale: "en",
        locales: ["en"],
    },
    markdown: {
        anchors: {
            maintainCase: true,
        },
        emoji: true,
        format: "detect",
        hooks: {
            onBrokenMarkdownImages: "warn",
            onBrokenMarkdownLinks: "warn",
        },
        mermaid: true,
    },
    onBrokenAnchors: "warn",
    onBrokenLinks: "throw",
    onDuplicateRoutes: "warn",
    organizationName,
    plugins: [
        suppressKnownWebpackWarningsPlugin,
        "docusaurus-plugin-image-zoom",
        [
            "@docusaurus/plugin-pwa",
            {
                debug: process.env["DOCUSAURUS_PWA_DEBUG"] === "true",
                offlineModeActivationStrategies: [
                    "appInstalled",
                    "standalone",
                    "queryString",
                ],
                pwaHead: [
                    {
                        href: `${baseUrl}manifest.json`,
                        rel: "manifest",
                        tagName: "link",
                    },
                    {
                        content: pwaThemeColor,
                        name: "theme-color",
                        tagName: "meta",
                    },
                ],
            },
        ],
        [
            "@docusaurus/plugin-content-docs",
            {
                editUrl: `https://github.com/${organizationName}/${projectName}/blob/main/docs/`,
                id: "rules",
                path: "../rules",
                routeBasePath: "docs/rules",
                showLastUpdateAuthor: true,
                showLastUpdateTime: true,
                sidebarPath: "./sidebars.rules.ts",
            } satisfies DocsPluginOptions,
        ],
    ],
    presets: [
        [
            "classic",
            {
                blog: {
                    blogDescription:
                        "Updates, architecture notes, and practical guidance for eslint-plugin-vite users.",
                    blogSidebarCount: "ALL",
                    blogSidebarTitle: "All posts",
                    blogTitle: "eslint-plugin-vite Blog",
                    editUrl: `https://github.com/${organizationName}/${projectName}/blob/main/docs/docusaurus/`,
                    feedOptions: {
                        type: ["rss", "atom"],
                        xslt: true,
                        title: "eslint-plugin-vite Blog",
                        copyright: `© ${new Date().getFullYear()} Nick2bad4u`,
                        description:
                            "Updates, architecture notes, and practical guidance for eslint-plugin-vite users.",
                        language: "en",
                    },
                    onInlineAuthors: "warn",
                    onInlineTags: "warn",
                    onUntruncatedBlogPosts: "warn",
                    path: "blog",
                    postsPerPage: 10,
                    routeBasePath: "blog",
                    showReadingTime: true,
                },
                docs: {
                    breadcrumbs: true,
                    editUrl: `https://github.com/${organizationName}/${projectName}/blob/main/docs/docusaurus/`,
                    includeCurrentVersion: true,
                    onInlineTags: "ignore",
                    path: "site-docs",
                    routeBasePath: "docs",
                    showLastUpdateAuthor: true,
                    showLastUpdateTime: true,
                    sidebarCollapsed: true,
                    sidebarCollapsible: true,
                    sidebarPath: "./sidebars.ts",
                },
                googleTagManager: {
                    containerId: "GTM-T8J6HPLF",
                },
                gtag: {
                    trackingID: "G-18DR1S6R1T",
                },
                pages: {
                    editUrl: `https://github.com/${organizationName}/${projectName}/blob/main/docs/docusaurus/`,
                    exclude: [
                        "**/*.d.ts",
                        "**/*.d.tsx",
                        "**/__tests__/**",
                        "**/*.test.{js,jsx,ts,tsx}",
                        "**/*.spec.{js,jsx,ts,tsx}",
                    ],
                    include: ["**/*.{js,jsx,ts,tsx,md,mdx}"],
                    mdxPageComponent: "@theme/MDXPage",
                    path: "src/pages",
                    routeBasePath: "/",
                    showLastUpdateAuthor: true,
                    showLastUpdateTime: true,
                },
                sitemap: {
                    filename: "sitemap.xml",
                    ignorePatterns: ["/tests/**"],
                    lastmod: "datetime",
                },
                theme: {
                    customCss: "./src/css/custom.css",
                },
            } satisfies Preset.Options,
        ],
    ],
    projectName,
    tagline: "ESLint rules for Vite, Vitest, and Vitest bench.",
    themeConfig: {
        colorMode: {
            defaultMode: "dark",
            disableSwitch: false,
            respectPrefersColorScheme: true,
        },
        footer: {
            copyright: footerCopyright,
            links: [
                {
                    items: [
                        {
                            label: "🏁 Overview",
                            to: "/docs/rules/overview",
                        },
                        {
                            label: "📖 Getting Started",
                            to: "/docs/rules/getting-started",
                        },
                        {
                            label: "🛠️ Presets",
                            to: "/docs/rules/presets",
                        },
                        {
                            label: "📏 Rule reference",
                            to: "/docs/rules/config-require-define-config",
                        },
                    ],
                    title: "📚 Explore",
                },
                {
                    items: [
                        {
                            href: `https://github.com/${organizationName}/${projectName}/releases`,
                            label: "Releases",
                        },
                        {
                            href: `${siteUrl}eslint-inspector/`,
                            label: "ESLint Inspector",
                        },
                        {
                            href: `${siteUrl}stylelint-inspector/`,
                            label: "Stylelint Inspector",
                        },
                        {
                            href: `https://www.npmjs.com/package/${projectName}`,
                            label: "NPM",
                        },
                    ],
                    title: "📦 Project",
                },
                {
                    items: [
                        {
                            href: `https://github.com/${organizationName}/${projectName}`,
                            label: "GitHub Repository",
                        },
                        {
                            href: `https://github.com/${organizationName}/${projectName}/issues`,
                            label: "Report Issues",
                        },
                        {
                            href: "https://vite.dev/",
                            label: "Vite",
                        },
                        {
                            href: "https://vitest.dev/",
                            label: "Vitest",
                        },
                    ],
                    title: "⚙️ Support",
                },
            ],
            logo: {
                alt: "eslint-plugin-vite logo",
                href: `https://github.com/${organizationName}/${projectName}`,
                src: "img/logo.svg",
                width: 60,
                height: 60,
            },
            style: "dark",
        },
        image: socialCardImagePath,
        mermaid: {
            theme: {
                dark: "dark",
                light: "neutral",
            },
        },
        navbar: {
            hideOnScroll: true,
            items: [
                {
                    label: "📚 Docs",
                    position: "left",
                    to: "/docs/rules/overview",
                },
                {
                    items: [
                        {
                            label: "🟡 Recommended",
                            to: "/docs/rules/presets/recommended",
                        },
                        {
                            label: "🔴 Strict",
                            to: "/docs/rules/presets/strict",
                        },
                        {
                            label: "🟣 All",
                            to: "/docs/rules/presets/all",
                        },
                        {
                            label: "⚙️ Configs",
                            to: "/docs/rules/presets/configs",
                        },
                        {
                            label: "🌐 Client",
                            to: "/docs/rules/presets/client",
                        },
                        {
                            label: "📖 VitePress",
                            to: "/docs/rules/presets/vitepress",
                        },
                        {
                            label: "🧪 Vitest",
                            to: "/docs/rules/presets/vitest",
                        },
                        {
                            label: "⚡ Vitest Bench",
                            to: "/docs/rules/presets/vitest-bench",
                        },
                    ],
                    label: "🛠️ Presets",
                    position: "left",
                },
                {
                    items: [
                        {
                            label: "Developer guide",
                            to: "/docs/developer",
                        },
                        {
                            label: "API reference",
                            to: "/docs/developer/api",
                        },
                        {
                            label: "ADRs",
                            to: "/docs/adr",
                        },
                        {
                            label: "Charts",
                            to: "/docs/charts",
                        },
                    ],
                    label: "🛠️ Dev",
                    position: "right",
                    to: "/docs/developer",
                },
                {
                    href: `https://github.com/${organizationName}/${projectName}`,
                    label: "GitHub",
                    position: "right",
                },
            ],
            logo: {
                alt: "eslint-plugin-vite logo",
                href: baseUrl,
                src: "img/logo.svg",
            },
            title: "eslint-plugin-vite",
        },
        prism: {
            additionalLanguages: [
                "bash",
                "json",
                "yaml",
                "typescript",
            ],
            darkTheme: prismThemes.dracula,
            defaultLanguage: "typescript",
            theme: prismThemes.github,
        },
        tableOfContents: {
            maxHeadingLevel: 4,
            minHeadingLevel: 2,
        },
        zoom: {
            background: {
                dark: "rgb(50, 50, 50)",
                light: "rgb(255, 255, 255)",
            },
            config: {},
            selector: ".markdown > img",
        },
    } satisfies Preset.ThemeConfig,
    themes: [
        "@docusaurus/theme-mermaid",
        [
            "@easyops-cn/docusaurus-search-local",
            {
                docsRouteBasePath: ["docs", "docs/rules"],
                explicitSearchResultPath: true,
                hashed: true,
                indexBlog: true,
                indexDocs: true,
                indexPages: true,
                searchBarPosition: "right",
                searchBarShortcut: true,
                searchBarShortcutHint: true,
            },
        ],
    ],
    title: "eslint-plugin-vite",
    trailingSlash: true,
    url: siteOrigin,
} satisfies Config;

export default config;
