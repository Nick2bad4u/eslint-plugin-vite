import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";

import styles from "../components/HomePage.module.css";

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

const cards = [
    {
        description:
            "Start with a balanced baseline for Vite, Vitest, and workspace pitfalls.",
        title: "Use the recommended preset",
        to: "/docs/rules/presets/recommended",
    },
    {
        description:
            "Review config-file, client-runtime, and Vitest-specific rules by category.",
        title: "Browse the rule catalog",
        to: "/docs/rules/overview",
    },
    {
        description:
            "Choose focused presets for client env access, config files, or benchmarks.",
        title: "Compare presets",
        to: "/docs/rules/presets",
    },
] as const;

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
                                Vite-first linting for configs, client runtime,
                                and Vitest workspaces
                            </p>
                            <Heading as="h1" className={styles.heroTitle}>
                                eslint-plugin-vite
                            </Heading>
                            <p className={styles.heroSubtitle}>
                                ESLint rules for Vite config files, client-side{" "}
                                <code>import.meta.*</code> patterns, Vitest
                                workspaces, and Vitest benchmarks.
                            </p>
                            <div className={styles.heroActions}>
                                <Link
                                    className={`button button--lg ${styles.heroActionButton} ${styles.heroActionPrimary}`}
                                    to="/docs/getting-started"
                                >
                                    Get started
                                </Link>
                                <Link
                                    className={`button button--lg ${styles.heroActionButton} ${styles.heroActionSecondary}`}
                                    to="/docs/rules/overview"
                                >
                                    Explore rules
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
                            <img
                                alt="The Vite lightning-bolt mark used as the eslint-plugin-vite site logo."
                                className={styles.heroPanelLogo}
                                src={logoUrl}
                            />
                        </aside>
                    </div>
                    <div className={styles.heroStats}>
                        {cards.map((card) => (
                            <article
                                key={card.title}
                                className={styles.heroStatCard}
                            >
                                <Heading
                                    as="h2"
                                    className={styles.heroStatHeading}
                                >
                                    {card.title}
                                </Heading>
                                <p className={styles.heroStatDescription}>
                                    {card.description}
                                </p>
                                <Link to={card.to}>Open page</Link>
                            </article>
                        ))}
                    </div>
                </div>
            </main>
        </Layout>
    );
}
