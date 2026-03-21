import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";

import styles from "./index.module.css";

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
    return (
        <Layout
            title="eslint-plugin-vite"
            description="ESLint rules for Vite, Vitest, and Vitest bench."
        >
            <main className={styles.heroBanner}>
                <div className={`container ${styles.heroContent}`}>
                    <Heading as="h1" className={styles.heroTitle}>
                        eslint-plugin-vite
                    </Heading>
                    <p className={styles.heroSubtitle}>
                        ESLint rules for Vite config files, client-side
                        <code> import.meta.* </code>
                        patterns, Vitest workspaces, and Vitest benchmarks.
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
