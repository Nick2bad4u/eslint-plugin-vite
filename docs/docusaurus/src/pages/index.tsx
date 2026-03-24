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

type ExternalCard = Readonly<{
    description: string;
    href: string;
    icon: string;
    title: string;
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
        alt: "npm version",
        href: "https://www.npmjs.com/package/@typpi/eslint-plugin-vite",
        src: "https://img.shields.io/npm/v/%40typpi%2Feslint-plugin-vite?logo=npm&label=npm",
    },
    {
        alt: "npm total downloads",
        href: "https://www.npmjs.com/package/@typpi/eslint-plugin-vite",
        src: "https://img.shields.io/npm/dt/%40typpi%2Feslint-plugin-vite?logo=npm&label=downloads",
    },
    {
        alt: "latest GitHub release",
        href: "https://github.com/Nick2bad4u/eslint-plugin-vite/releases",
        src: "https://img.shields.io/github/v/release/Nick2bad4u/eslint-plugin-vite?label=release",
    },
    {
        alt: "CI status",
        href: "https://github.com/Nick2bad4u/eslint-plugin-vite/actions/workflows/ci.yml",
        src: "https://img.shields.io/github/actions/workflow/status/Nick2bad4u/eslint-plugin-vite/ci.yml?branch=main&label=ci",
    },
    {
        alt: "GitHub stars",
        href: "https://github.com/Nick2bad4u/eslint-plugin-vite/stargazers",
        src: "https://img.shields.io/github/stars/Nick2bad4u/eslint-plugin-vite?label=stars",
    },
    {
        alt: "GitHub open issues",
        href: "https://github.com/Nick2bad4u/eslint-plugin-vite/issues",
        src: "https://img.shields.io/github/issues/Nick2bad4u/eslint-plugin-vite?label=issues",
    },
    {
        alt: "mutation testing badge",
        href: "https://dashboard.stryker-mutator.io/reports/github.com/Nick2bad4u/eslint-plugin-vite/main",
        src: "https://img.shields.io/badge/mutation%20testing-stryker-informational",
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

const developerLinks = [
    {
        description:
            "Architecture notes, maintainer workflow, and project rationale.",
        to: "/docs/developer",
        title: "Developer guide",
    },
    {
        description:
            "Decision records and charts that explain how the plugin and docs pipeline fit together.",
        to: "/docs/adr",
        title: "ADRs & charts",
    },
    {
        description:
            "Generated runtime API documentation for internals and public plugin wiring.",
        to: "/docs/developer/api",
        title: "API docs",
    },
] as const;

const resourceCards = [
    {
        description:
            "Browse release notes and published tags for the latest shipped changes.",
        href: "https://github.com/Nick2bad4u/eslint-plugin-vite/releases",
        icon: "",
        title: "Releases",
    },
    {
        description:
            "Inspect the resolved flat config visually to understand how the plugin composes with your stack.",
        href: "/eslint-plugin-vite/eslint-inspector/",
        icon: "",
        title: "ESLint Inspector",
    },
    {
        description:
            "Review stylelint configuration output for the docs app and site assets.",
        href: "/eslint-plugin-vite/stylelint-inspector/",
        icon: "",
        title: "Stylelint Inspector",
    },
    {
        description:
            "Open the scoped npm package page users install from and verify the current published metadata.",
        href: "https://www.npmjs.com/package/@typpi/eslint-plugin-vite",
        icon: "",
        title: "NPM package",
    },
    {
        description:
            "Report bugs, request rules, and track open work directly in GitHub issues.",
        href: "https://github.com/Nick2bad4u/eslint-plugin-vite/issues",
        icon: "",
        title: "Report issues",
    },
    {
        description:
            "Review the repository and contribution surfaces that back the published package and docs site.",
        href: "https://github.com/Nick2bad4u/eslint-plugin-vite",
        icon: "",
        title: "GitHub repository",
    },
] as const satisfies readonly ExternalCard[];

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
                            <div className={styles.heroPanelBody}>
                                <img
                                    alt="The Vite lightning-bolt mark used as the eslint-plugin-vite site logo."
                                    className={styles.heroPanelLogo}
                                    src={logoUrl}
                                />
                                <div className={styles.heroPanelSections}>
                                    <section
                                        className={styles.heroPanelSection}
                                    >
                                        <p className={styles.heroPanelTitle}>
                                            📚 Explore
                                        </p>
                                        <ul className={styles.heroPanelList}>
                                            <li>
                                                <Link
                                                    className={
                                                        styles.heroPanelLink
                                                    }
                                                    to="/docs/rules/overview"
                                                >
                                                    🏁 Overview
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    className={
                                                        styles.heroPanelLink
                                                    }
                                                    to="/docs/rules/getting-started"
                                                >
                                                    📖 Getting Started
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    className={
                                                        styles.heroPanelLink
                                                    }
                                                    to="/docs/rules/presets"
                                                >
                                                    🛠️ Presets
                                                </Link>
                                            </li>
                                        </ul>
                                    </section>
                                    <section
                                        className={styles.heroPanelSection}
                                    >
                                        <p className={styles.heroPanelTitle}>
                                            🧭 Developer
                                        </p>
                                        <ul className={styles.heroPanelList}>
                                            {developerLinks.map((link) => (
                                                <li key={link.title}>
                                                    <Link
                                                        className={
                                                            styles.heroPanelLink
                                                        }
                                                        to={link.to}
                                                    >
                                                        {link.title}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </section>
                                </div>
                            </div>
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
                    <section className={styles.liveStatsSection}>
                        <div className={styles.liveStatsHeader}>
                            <p className={styles.liveStatsKicker}>
                                Live badges
                            </p>
                            <Heading as="h2" className={styles.sectionTitle}>
                                Keep the project surface visible
                            </Heading>
                            <p className={styles.liveStatsDescription}>
                                Version, release, CI, popularity, and maintainer
                                signals should be easy to spot from the first
                                screen.
                            </p>
                            <Link
                                className={styles.liveStatsLink}
                                to="/docs/rules/getting-started"
                            >
                                Open getting started →
                            </Link>
                        </div>
                        <ul className={styles.liveBadgeList}>
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
                                            className={styles.liveBadgeImage}
                                            src={badge.src}
                                        />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section>
                        <Heading as="h2" className={styles.sectionTitle}>
                            Core docs paths
                        </Heading>
                        <p className={styles.sectionSubtitle}>
                            Keep the primary docs surfaces clear: overview
                            first, presets second, detailed rule reference close
                            behind.
                        </p>
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

                    <section>
                        <Heading as="h2" className={styles.sectionTitle}>
                            Developer and project resources
                        </Heading>
                        <p className={styles.sectionSubtitle}>
                            Put maintainer-facing material on the right side of
                            the experience and keep operational links easy to
                            discover.
                        </p>
                        <div className={styles.cardGrid}>
                            {resourceCards.map((card) => (
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
                                        rel="noreferrer"
                                        target="_blank"
                                        to={card.href}
                                    >
                                        Open resource →
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
