import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";

import styles from "../components/HomePage.module.css";

type Badge = Readonly<{
    alt: string;
    href: string;
    src: string;
}>;

type Card = Readonly<{
    description: string;
    icon: string;
    title: string;
    to: string;
}>;

const heroBadges = [
    {
        description:
            "Guard Vite config files against deprecated and unsafe options before they ship across workspaces.",
        icon: "⚡",
        title: "Config safety",
    },
    {
        description:
            "Keep `import.meta.env` and `import.meta.glob()` usage compatible with Vite's static analysis model.",
        icon: "🧪",
        title: "Client correctness",
    },
    {
        description:
            "Keep Vitest workspaces, benchmarks, and test projects organized as your monorepo grows.",
        icon: "🏎️",
        title: "Vitest discipline",
    },
] as const;

const liveBadges = [
    {
        alt: "npm license",
        href: "https://github.com/Nick2bad4u/eslint-plugin-vite/blob/main/LICENSE",
        src: "https://flat.badgen.net/npm/license/eslint-plugin-vite?color=purple",
    },
    {
        alt: "npm total downloads",
        href: "https://www.npmjs.com/package/@typpi/eslint-plugin-vite",
        src: "https://flat.badgen.net/npm/dt/%40typpi%2Feslint-plugin-vite?color=pink",
    },
    {
        alt: "latest GitHub release",
        href: "https://github.com/Nick2bad4u/eslint-plugin-vite/releases",
        src: "https://flat.badgen.net/github/release/Nick2bad4u/eslint-plugin-vite?color=cyan",
    },
    {
        alt: "GitHub stars",
        href: "https://github.com/Nick2bad4u/eslint-plugin-vite/stargazers",
        src: "https://flat.badgen.net/github/stars/Nick2bad4u/eslint-plugin-vite?color=yellow",
    },
    {
        alt: "GitHub forks",
        href: "https://github.com/Nick2bad4u/eslint-plugin-vite/forks",
        src: "https://flat.badgen.net/github/forks/Nick2bad4u/eslint-plugin-vite?color=green",
    },
    {
        alt: "GitHub open issues",
        href: "https://github.com/Nick2bad4u/eslint-plugin-vite/issues",
        src: "https://flat.badgen.net/github/open-issues/Nick2bad4u/eslint-plugin-vite?color=red",
    },
    {
        alt: "codecov",
        href: "https://codecov.io/gh/Nick2bad4u/eslint-plugin-vite",
        src: "https://codecov.io/gh/Nick2bad4u/eslint-plugin-vite/branch/main/graph/badge.svg",
    },
    {
        alt: "CI status",
        href: "https://github.com/Nick2bad4u/eslint-plugin-vite/actions/workflows/ci.yml",
        src: "https://img.shields.io/github/actions/workflow/status/Nick2bad4u/eslint-plugin-vite/ci.yml?branch=main&label=ci",
    },
] as const satisfies readonly Badge[];

const heroMetrics = [
    {
        description:
            "Covers config safety, client runtime correctness, and Vitest workflows.",
        title: " 70+ Rules",
    },
    {
        description:
            "Start with recommended, then grow into strict, client, configs, and Vitest-focused bundles.",
        title: " 8 Presets",
    },
    {
        description:
            "Report-first guidance with safe fixes and suggestions where the transformation stays reviewable.",
        title: "󰁨 DX-first Autofix & Suggestions",
    },
] as const;

const cards = [
    {
        description:
            "Install the plugin, enable a preset, and get a clean flat-config starting point fast.",
        icon: "",
        title: "Get Started",
        to: "/docs/rules/getting-started",
    },
    {
        description:
            "Choose the right preset for config files, client env usage, VitePress, Vitest, and benchmarks.",
        icon: "",
        title: "Presets",
        to: "/docs/rules/presets",
    },
    {
        description:
            "Browse every rule with concrete incorrect/correct examples, migration notes, and flat-config snippets.",
        icon: "",
        title: "Rule Reference",
        to: "/docs/rules/overview",
    },
] as const satisfies readonly Card[];

export default function Home() {
    const logoUrl = useBaseUrl("/img/logo.svg");

    return (
        <Layout
            title="eslint-plugin-vite"
            description="ESLint rules for Vite, Vitest, and Vitest bench."
        >
            <main className={styles.heroBanner}>
                <div className={`container ${styles.heroContent}`}>
                    <div className={styles.heroGrid}>
                        <div>
                            <p className={styles.heroKicker}>
                                 ESLint plugin for Vite configs, client
                                runtime, and Vitest teams 
                            </p>
                            <Heading as="h1" className={styles.heroTitle}>
                                eslint-plugin-vite
                            </Heading>
                            <p className={styles.heroSubtitle}>
                                ESLint rules for Vite config files, client-side{" "}
                                <code>import.meta.*</code> patterns, Vitest
                                workspaces, and benchmark hygiene.
                            </p>
                            <div className={styles.heroActions}>
                                <Link
                                    className={`button button--lg ${styles.heroActionButton} ${styles.heroActionPrimary}`}
                                    to="/docs/rules/overview"
                                >
                                    󰜝 Start with Overview
                                </Link>
                                <Link
                                    className={`button button--lg ${styles.heroActionButton} ${styles.heroActionSecondary}`}
                                    to="/docs/rules/presets"
                                >
                                    󱒒 Compare Presets
                                </Link>
                            </div>
                            <ul className={styles.heroLiveBadges}>
                                {liveBadges.map((badge) => (
                                    <li
                                        key={badge.alt}
                                        className={styles.liveBadgeListItem}
                                    >
                                        <Link
                                            className={styles.liveBadgeAnchor}
                                            to={badge.href}
                                            rel="noreferrer"
                                            target="_blank"
                                        >
                                            <img
                                                alt={badge.alt}
                                                className={
                                                    styles.liveBadgeImage
                                                }
                                                src={badge.src}
                                            />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                            <div className={styles.heroBadgeRow}>
                                {heroBadges.map((badge) => (
                                    <article
                                        key={badge.title}
                                        className={styles.heroBadge}
                                    >
                                        <p className={styles.heroBadgeLabel}>
                                            <span
                                                aria-hidden="true"
                                                className={styles.heroBadgeIcon}
                                            >
                                                {badge.icon}
                                            </span>
                                            {badge.title}
                                        </p>
                                        <p
                                            className={
                                                styles.heroBadgeDescription
                                            }
                                        >
                                            {badge.description}
                                        </p>
                                    </article>
                                ))}
                            </div>
                        </div>
                        <aside className={styles.heroPanel}>
                            <img
                                alt="The Vite lightning-bolt mark used as the eslint-plugin-vite site logo."
                                className={styles.heroPanelLogo}
                                src={logoUrl}
                            />
                        </aside>
                    </div>
                    <div className={styles.heroStats}>
                        {heroMetrics.map((metric) => (
                            <article
                                key={metric.title}
                                className={styles.heroStatCard}
                            >
                                <Heading
                                    as="h2"
                                    className={styles.heroStatHeading}
                                >
                                    {metric.title}
                                </Heading>
                                <p className={styles.heroStatDescription}>
                                    {metric.description}
                                </p>
                            </article>
                        ))}
                    </div>
                </div>
            </main>
            <main className={styles.mainContent}>
                <div className="container">
                    <section className={styles.cardSection}>
                        <div className={styles.cardGrid}>
                            {cards.map((card) => (
                                <article
                                    key={card.title}
                                    className={styles.card}
                                >
                                    <div className={styles.cardHeader}>
                                        <p className={styles.cardIcon}>
                                            {card.icon}
                                        </p>
                                        <Heading
                                            as="h3"
                                            className={styles.cardTitle}
                                        >
                                            {card.title}
                                        </Heading>
                                    </div>
                                    <p className={styles.cardDescription}>
                                        {card.description}
                                    </p>
                                    <Link
                                        className={styles.cardLink}
                                        to={card.to}
                                    >
                                        Open section →
                                    </Link>
                                </article>
                            ))}
                        </div>
                    </section>
                </div>
            </main>
        </Layout>
    );
}
