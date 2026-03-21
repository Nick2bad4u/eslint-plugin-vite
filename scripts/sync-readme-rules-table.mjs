// @ts-check

import process from "node:process";
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

import vitePlugin from "../dist/plugin.js";
import {
    detectLineEnding,
    renderMarkdownTable,
} from "./_internal/markdown-table.mjs";
import {
    viteConfigMetadataByName,
    viteConfigNamesByReadmeOrder,
    viteConfigReferenceToName,
} from "../dist/_internal/vite-config-references.js";

/** @typedef {import("../src/plugin.js").ViteConfigName} ViteConfigName */
/** @typedef {import("../src/plugin.js").VitePlugin} VitePlugin */

const README_PATH = new URL("../README.md", import.meta.url);

export const README_RULES_START = "<!-- begin generated rules table -->";
export const README_RULES_END = "<!-- end generated rules table -->";

const presetDocsPathByName = {
    all: "./docs/rules/presets/all.md",
    client: "./docs/rules/presets/client.md",
    configs: "./docs/rules/presets/configs.md",
    recommended: "./docs/rules/presets/recommended.md",
    strict: "./docs/rules/presets/strict.md",
    vitest: "./docs/rules/presets/vitest.md",
    "vitest-bench": "./docs/rules/presets/vitest-bench.md",
};

/**
 * @typedef {Readonly<{
 *     meta: Readonly<{
 *         docs: Readonly<{
 *             description?: string;
 *             ruleNumber?: number;
 *             viteConfigs?: readonly string[] | string;
 *         }>;
 *         fixable?: "code" | undefined;
 *         hasSuggestions?: boolean | undefined;
 *     }>;
 * }>} RuleModule
 */

/**
 * @typedef {Readonly<{
 *     configNames: ViteConfigName[];
 *     description: string;
 *     fixLabel: "—" | "💡" | "🔧";
 *     ruleId: string;
 *     ruleNumber: number;
 * }>} RuleDocs
 */

/**
 * @param {unknown} value
 *
 * @returns {null | ViteConfigName}
 */
const toViteConfigName = (value) => {
    if (typeof value !== "string") {
        return null;
    }

    if (Object.hasOwn(viteConfigReferenceToName, value)) {
        return viteConfigReferenceToName[
            /** @type {keyof typeof viteConfigReferenceToName} */ (value)
        ];
    }

    return Object.hasOwn(presetDocsPathByName, value)
        ? /** @type {ViteConfigName} */ (value)
        : null;
};

/**
 * @param {string} ruleName
 * @param {RuleModule} ruleModule
 *
 * @returns {RuleDocs}
 */
const getRuleDocs = (ruleName, ruleModule) => {
    const docs = ruleModule.meta.docs;
    const viteConfigs = Array.isArray(docs.viteConfigs)
        ? docs.viteConfigs
        : [docs.viteConfigs];

    /** @type {ViteConfigName[]} */
    const configNames = [];

    for (const value of viteConfigs) {
        const configName = toViteConfigName(value);

        if (configName !== null) {
            configNames.push(configName);
        }
    }

    return {
        configNames,
        description: docs.description ?? "",
        fixLabel:
            ruleModule.meta.fixable === "code"
                ? "🔧"
                : ruleModule.meta.hasSuggestions === true
                  ? "💡"
                  : "—",
        ruleId: `vite/${ruleName}`,
        ruleNumber: docs.ruleNumber ?? Number.POSITIVE_INFINITY,
    };
};

export const renderPresetLegend = () =>
    [
        "- `Preset key` legend:",
        ...viteConfigNamesByReadmeOrder.map((configName) => {
            const metadata = viteConfigMetadataByName[configName];
            const docsPath = presetDocsPathByName[configName];
            const configAccessor =
                configName === "vitest-bench"
                    ? 'vite.configs["vitest-bench"]'
                    : `vite.configs.${configName}`;

            return `  - [${metadata.icon}](${docsPath}) — [\`${configAccessor}\`](${docsPath})`;
        }),
    ].join("\n");

/**
 * @param {VitePlugin} [plugin]
 */
export const renderReadmeRulesTable = (plugin = vitePlugin) => {
    const rows = Object.entries(plugin.rules)
        .map(([ruleName, ruleModule]) =>
            getRuleDocs(ruleName, /** @type {RuleModule} */ (ruleModule))
        )
        .sort((left, right) => left.ruleNumber - right.ruleNumber)
        .map((docs) => {
            const presetIcons = [...docs.configNames]
                .sort(
                    /**
                     * @param {ViteConfigName} left
                     * @param {ViteConfigName} right
                     */
                    (left, right) =>
                        viteConfigNamesByReadmeOrder.indexOf(left) -
                        viteConfigNamesByReadmeOrder.indexOf(right)
                )
                .map((configName) => {
                    const metadata = viteConfigMetadataByName[configName];
                    const docsPath = presetDocsPathByName[configName];

                    return `[${metadata.icon}](${docsPath})`;
                })
                .join(" ");

            return [
                ` [\`${docs.ruleId}\`](./docs/rules/${docs.ruleId.slice("vite/".length)}.md)`,
                docs.fixLabel,
                presetIcons,
            ];
        });

    return [
        "- `Fix` legend:",
        "  - `🔧` = autofixable",
        "  - `💡` = suggestions available",
        "  - `—` = report only",
        renderPresetLegend(),
        "",
        renderMarkdownTable(
            [
                [
                    "Rule",
                    "Fix",
                    "Preset key",
                ],
                ...rows,
            ],
            [
                "left",
                "center",
                "left",
            ]
        ),
    ].join("\n");
};

/**
 * @param {string} markdown
 */
export const replaceReadmeRulesTable = (markdown) => {
    const lineEnding = detectLineEnding(markdown);
    const generatedTable = renderReadmeRulesTable().replaceAll(
        "\n",
        lineEnding
    );
    const pattern = new RegExp(
        `${README_RULES_START}[\\s\\S]*?${README_RULES_END}`,
        "u"
    );

    return markdown.replace(
        pattern,
        `${README_RULES_START}${lineEnding}${generatedTable}${lineEnding}${README_RULES_END}`
    );
};

const shouldWrite = process.argv.includes("--write");

if (
    process.argv[1] !== undefined &&
    fileURLToPath(import.meta.url) === process.argv[1]
) {
    const readme = await readFile(README_PATH, "utf8");
    const nextReadme = replaceReadmeRulesTable(readme);

    if (shouldWrite) {
        await writeFile(README_PATH, nextReadme);
    } else {
        process.stdout.write(nextReadme);
    }
}
