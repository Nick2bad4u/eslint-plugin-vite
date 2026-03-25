import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";
import type { PluginOptions as SearchLocalPluginOptions } from "@easyops-cn/docusaurus-search-local";

import { suppressKnownWebpackWarningsPlugin } from "./src/plugins/suppressKnownWebpackWarningsPlugin";

const organizationName = "Nick2bad4u";
const projectName = "eslint-plugin-vite";
const siteUrl = "https://nick2bad4u.github.io";
const baseUrl = process.env["DOCUSAURUS_BASE_URL"] ?? "/eslint-plugin-vite/";

const config: Config = {
    title: "eslint-plugin-vite",
    tagline: "ESLint rules for Vite, Vitest, and Vitest bench.",
    favicon: "img/favicon.ico",
    headTags: [
        {
            attributes: {
                href: `${baseUrl}img/apple-touch-icon.png`,
                rel: "apple-touch-icon",
                sizes: "180x180",
            },
            tagName: "link",
        },
        {
            attributes: {
                href: `${baseUrl}img/favicon-32x32.png`,
                rel: "icon",
                sizes: "32x32",
                type: "image/png",
            },
            tagName: "link",
        },
        {
            attributes: {
                href: `${baseUrl}img/favicon-16x16.png`,
                rel: "icon",
                sizes: "16x16",
                type: "image/png",
            },
            tagName: "link",
        },
        {
            attributes: {
                href: `${baseUrl}manifest.json`,
                rel: "manifest",
            },
            tagName: "link",
        },
        {
            attributes: {
                content: "#101010",
                name: "theme-color",
            },
            tagName: "meta",
        },
    ],
    markdown: {
        hooks: {
            onBrokenMarkdownLinks: "warn",
        },
        mermaid: true,
    },
    url: siteUrl,
    baseUrl,
    organizationName,
    projectName,
    onBrokenLinks: "throw",
    i18n: {
        defaultLocale: "en",
        locales: ["en"],
    },
    presets: [
        [
            "classic",
            {
                blog: {
                    showReadingTime: true,
                },
                docs: {
                    path: "site-docs",
                    routeBasePath: "docs",
                    sidebarPath: "./sidebars.ts",
                },
                googleTagManager: {
                    containerId: "GTM-T8J6HPLF",
                },
                gtag: {
                    trackingID: "G-18DR1S6R1T",
                },
                theme: {
                    customCss: "./src/css/custom.css",
                },
            } satisfies Preset.Options,
        ],
    ],
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
            } satisfies SearchLocalPluginOptions,
        ],
    ],
    plugins: [
        [
            "@docusaurus/plugin-content-docs",
            {
                id: "rules",
                path: "../rules",
                routeBasePath: "docs/rules",
                sidebarPath: "./sidebars.rules.ts",
            },
        ],
        suppressKnownWebpackWarningsPlugin,
    ],
    themeConfig: {
        image: "img/logo.png",
        mermaid: {
            theme: {
                dark: "dark",
                light: "neutral",
            },
        },
        navbar: {
            title: "eslint-plugin-vite",
            logo: {
                alt: "eslint-plugin-vite logo.",
                src: "img/logo.svg",
            },
            items: [
                {
                    label: "📚 Docs",
                    to: "/docs/rules/overview",
                },
                {
                    label: "📜 Rules",
                    to: "/docs/rules/overview",
                },
                {
                    label: "🛠️ Presets",
                    items: [
                        {
                            label: "🛠️ Overview",
                            to: "/docs/rules/presets",
                        },
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
                            label: "📚 VitePress",
                            to: "/docs/rules/presets/vitepress",
                        },
                        {
                            label: "🧪 Vitest",
                            to: "/docs/rules/presets/vitest",
                        },
                        {
                            label: "👟 Vitest Bench",
                            to: "/docs/rules/presets/vitest-bench",
                        },
                    ],
                },
                {
                    label: "📰 Blog",
                    to: "/blog",
                    position: "right",
                },
                {
                    label: "🧭 Dev",
                    position: "right",
                    items: [
                        {
                            label: "🛠️ Developer Guide",
                            to: "/docs/developer",
                        },
                        {
                            label: "📝 ADRs",
                            to: "/docs/adr",
                        },
                        {
                            label: "📊 Charts",
                            to: "/docs/charts",
                        },
                        {
                            label: "🧩 API docs",
                            to: "/docs/developer/api",
                        },
                    ],
                },
                {
                    href: "https://github.com/Nick2bad4u/eslint-plugin-vite",
                    label: " GitHub",
                    position: "right",
                },
                {
                    position: "right",
                    type: "search",
                },
            ],
        },
        footer: {
            copyright: `<a class="footer__brand" href="${baseUrl}"><img alt="eslint-plugin-vite logo" src="${baseUrl}img/logo.svg" /></a><span>© ${new Date().getFullYear()} <a href="https://github.com/${organizationName}/">${organizationName}</a> 💻 Built with <a href="https://docusaurus.io/">🦖 Docusaurus</a>.</span>`,
            links: [
                {
                    title: "📚 Explore",
                    items: [
                        {
                            label: "🏁 Overview",
                            to: "/docs/rules/overview",
                        },
                        {
                            label: "📖 Getting started",
                            to: "/docs/getting-started",
                        },
                        {
                            label: "🛠️ Presets",
                            to: "/docs/rules/presets",
                        },
                        {
                            label: "📏 Rule reference",
                            to: "/docs/rules/overview",
                        },
                    ],
                },
                {
                    title: "📁 Project",
                    items: [
                        {
                            label: " Releases",
                            href: "https://github.com/Nick2bad4u/eslint-plugin-vite/releases",
                        },
                        {
                            label: " ESLint Inspector",
                            href: `${siteUrl}${baseUrl}eslint-inspector/`,
                        },
                        {
                            label: " Stylelint Inspector",
                            href: `${siteUrl}${baseUrl}stylelint-inspector/`,
                        },
                        {
                            label: "⚡ Vite",
                            href: "https://vite.dev/",
                        },
                    ],
                },
                {
                    title: "⚙️ Support",
                    items: [
                        {
                            label: " GitHub Repository",
                            href: "https://github.com/Nick2bad4u/eslint-plugin-vite",
                        },
                        {
                            label: " Report Issues",
                            href: "https://github.com/Nick2bad4u/eslint-plugin-vite/issues",
                        },
                        {
                            label: "🛡️ Security Policy",
                            href: "https://github.com/Nick2bad4u/eslint-plugin-vite/security/policy",
                        },
                        {
                            label: " NPM",
                            href: "https://www.npmjs.com/package/@typpi/eslint-plugin-vite",
                        },
                    ],
                },
            ],
        },
    } satisfies Preset.ThemeConfig,
};

export default config;
