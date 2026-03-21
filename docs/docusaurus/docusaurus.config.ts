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
                blog: false,
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
        image: "img/logo.svg",
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
