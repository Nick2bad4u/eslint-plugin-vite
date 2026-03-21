import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

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
        mermaid: true,
    },
    url: siteUrl,
    baseUrl,
    organizationName,
    projectName,
    onBrokenLinks: "throw",
    onBrokenMarkdownLinks: "warn",
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
                theme: {
                    customCss: "./src/css/custom.css",
                },
            } satisfies Preset.Options,
        ],
    ],
    themes: ["@docusaurus/theme-mermaid"],
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
                    label: "Docs",
                    to: "/docs/intro",
                },
                {
                    label: "Rules",
                    to: "/docs/rules/overview",
                },
                {
                    label: "Presets",
                    to: "/docs/rules/presets",
                },
                {
                    label: "Blog",
                    to: "/blog",
                },
                {
                    href: "https://github.com/Nick2bad4u/eslint-plugin-vite",
                    label: "GitHub",
                    position: "right",
                },
            ],
        },
        footer: {
            copyright: `Copyright © ${new Date().getFullYear()} ${organizationName}.`,
            links: [
                {
                    title: "Docs",
                    items: [
                        {
                            label: "Getting started",
                            to: "/docs/getting-started",
                        },
                        {
                            label: "Rule overview",
                            to: "/docs/rules/overview",
                        },
                        {
                            label: "Preset reference",
                            to: "/docs/rules/presets",
                        },
                        {
                            label: "Architecture decisions",
                            to: "/docs/adr",
                        },
                    ],
                },
                {
                    title: "Updates",
                    items: [
                        {
                            label: "Maintainer blog",
                            to: "/blog",
                        },
                    ],
                },
                {
                    title: "Project",
                    items: [
                        {
                            label: "npm",
                            href: "https://www.npmjs.com/package/eslint-plugin-vite",
                        },
                        {
                            label: "Repository",
                            href: "https://github.com/Nick2bad4u/eslint-plugin-vite",
                        },
                    ],
                },
            ],
        },
    } satisfies Preset.ThemeConfig,
};

export default config;
