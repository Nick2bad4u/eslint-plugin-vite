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
    viteConfigNames,
    viteConfigNamesByReadmeOrder,
    viteConfigReferenceToName,
    viteConfigMetadataByName,
} from "../dist/_internal/vite-config-references.js";

/** @typedef {import("../src/_internal/vite-config-references.js").ViteConfigName} ViteConfigName */
/** @typedef {import("../src/plugin.js").VitePlugin} VitePlugin */

const PRESETS_INDEX_PATH = new URL(
    "../docs/rules/presets/index.md",
    import.meta.url
);
/** @type {Readonly<Record<ViteConfigName, URL>>} */
const PRESET_PAGE_PATHS = {
    all: new URL("../docs/rules/presets/all.md", import.meta.url),
    client: new URL("../docs/rules/presets/client.md", import.meta.url),
    configs: new URL("../docs/rules/presets/configs.md", import.meta.url),
    recommended: new URL(
        "../docs/rules/presets/recommended.md",
        import.meta.url
    ),
    strict: new URL("../docs/rules/presets/strict.md", import.meta.url),
    vitepress: new URL("../docs/rules/presets/vitepress.md", import.meta.url),
    vitest: new URL("../docs/rules/presets/vitest.md", import.meta.url),
    "vitest-bench": new URL(
        "../docs/rules/presets/vitest-bench.md",
        import.meta.url
    ),
};

/** @type {Readonly<Record<ViteConfigName, string>>} */
const PRESET_PAGE_LINKS = {
    all: "./all.md",
    client: "./client.md",
    configs: "./configs.md",
    recommended: "./recommended.md",
    strict: "./strict.md",
    vitepress: "./vitepress.md",
    vitest: "./vitest.md",
    "vitest-bench": "./vitest-bench.md",
};

export const PRESET_MATRIX_START = "<!-- begin generated preset matrix -->";
export const PRESET_MATRIX_END = "<!-- end generated preset matrix -->";
export const PRESET_RULES_START = "<!-- begin generated preset rules -->";
export const PRESET_RULES_END = "<!-- end generated preset rules -->";

/**
 * @typedef {Readonly<{
 *     meta: Readonly<{
 *         docs: Readonly<{
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
 *     fixLabel: "—" | "💡" | "🔧";
 *     ruleName: string;
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

    return Object.hasOwn(PRESET_PAGE_PATHS, value)
        ? /** @type {ViteConfigName} */ (value)
        : null;
};

/**
 * @param {RuleModule} ruleModule
 *
 * @returns {RuleDocs["fixLabel"]}
 */
const getFixLabel = (ruleModule) => {
    if (ruleModule.meta.fixable === "code") {
        return "🔧";
    }

    if (ruleModule.meta.hasSuggestions === true) {
        return "💡";
    }

    return "—";
};

/**
 * @param {ViteConfigName} configName
 *
 * @returns {string}
 */
const getConfigAccessor = (configName) => {
    if (configName === "vitest-bench") {
        return 'vite.configs["vitest-bench"]';
    }

    return `vite.configs.${configName}`;
};

/**
 * @param {string} ruleName
 * @param {RuleModule} ruleModule
 *
 * @returns {RuleDocs}
 */
const normalizeRuleDocs = (ruleName, ruleModule) => {
    const docs = ruleModule.meta.docs;
    const rawConfigReferences = Array.isArray(docs.viteConfigs)
        ? docs.viteConfigs
        : [docs.viteConfigs];

    /** @type {ViteConfigName[]} */
    const configNames = [];

    for (const value of rawConfigReferences) {
        const configName = toViteConfigName(value);

        if (configName !== null) {
            configNames.push(configName);
        }
    }

    return {
        configNames,
        fixLabel: getFixLabel(ruleModule),
        ruleName,
        ruleNumber: docs.ruleNumber ?? Number.POSITIVE_INFINITY,
    };
};

/**
 * @param {VitePlugin} [plugin]
 */
const getOrderedRules = (plugin = vitePlugin) =>
    Object.entries(plugin.rules)
        .map(([ruleName, ruleModule]) =>
            normalizeRuleDocs(ruleName, /** @type {RuleModule} */ (ruleModule))
        )
        .toSorted((left, right) => left.ruleNumber - right.ruleNumber);

export const renderPresetLegend = () =>
    [
        "- `Preset key` legend:",
        ...viteConfigNamesByReadmeOrder.map((configName) => {
            const metadata = viteConfigMetadataByName[configName];
            const docsPath = PRESET_PAGE_LINKS[configName];
            const configAccessor = getConfigAccessor(configName);

            return `  - [${metadata.icon}](${docsPath}) — [\`${configAccessor}\`](${docsPath})`;
        }),
    ].join("\n");

/**
 * @param {VitePlugin} [plugin]
 */
export const renderPresetMatrix = (plugin = vitePlugin) => {
    const rows = getOrderedRules(plugin).map((rule) => {
        const presetIcons = rule.configNames
            .toSorted(
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
                const docsPath = `./${configName}.md`;

                return `[${metadata.icon}](${docsPath})`;
            })
            .join(" ");

        return [
            `[\`vite/${rule.ruleName}\`](../${rule.ruleName}.md)`,
            rule.fixLabel,
            presetIcons,
        ];
    });

    return [
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
 * @param {keyof typeof PRESET_PAGE_PATHS} configName
 * @param {VitePlugin} [plugin]
 */
export const renderPresetRulesTable = (configName, plugin = vitePlugin) => {
    const rows = getOrderedRules(plugin)
        .filter((rule) => rule.configNames.includes(configName))
        .map((rule) => [
            `[\`vite/${rule.ruleName}\`](../${rule.ruleName}.md)`,
            rule.fixLabel,
        ]);

    return renderMarkdownTable([["Rule", "Fix"], ...rows], ["left", "center"]);
};

/**
 * @param {string} markdown
 */
export const replacePresetMatrix = (markdown) => {
    const lineEnding = detectLineEnding(markdown);
    const matrix = renderPresetMatrix().replaceAll("\n", lineEnding);
    const pattern = new RegExp(
        String.raw`${PRESET_MATRIX_START}[\s\S]*?${PRESET_MATRIX_END}`,
        "u"
    );

    return markdown.replace(
        pattern,
        `${PRESET_MATRIX_START}${lineEnding}${matrix}${lineEnding}${PRESET_MATRIX_END}`
    );
};

/**
 * @param {string} markdown
 * @param {keyof typeof PRESET_PAGE_PATHS} configName
 */
export const replacePresetRulesTable = (markdown, configName) => {
    const lineEnding = detectLineEnding(markdown);
    const table = renderPresetRulesTable(configName).replaceAll(
        "\n",
        lineEnding
    );
    const pattern = new RegExp(
        String.raw`${PRESET_RULES_START}[\s\S]*?${PRESET_RULES_END}`,
        "u"
    );

    return markdown.replace(
        pattern,
        `${PRESET_RULES_START}${lineEnding}${table}${lineEnding}${PRESET_RULES_END}`
    );
};

const shouldWrite = process.argv.includes("--write");
const shouldPrint = process.argv.includes("--print");
const shouldCheck = !shouldWrite && !shouldPrint;

if (
    process.argv[1] !== undefined &&
    fileURLToPath(import.meta.url) === process.argv[1]
) {
    const presetsIndex = await readFile(PRESETS_INDEX_PATH, "utf8");
    const nextPresetsIndex = replacePresetMatrix(presetsIndex);

    if (shouldWrite) {
        await writeFile(PRESETS_INDEX_PATH, nextPresetsIndex);

        for (const configName of viteConfigNames) {
            const presetPath = PRESET_PAGE_PATHS[configName];
            const presetMarkdown = await readFile(presetPath, "utf8");
            const nextPresetMarkdown = replacePresetRulesTable(
                presetMarkdown,
                configName
            );

            await writeFile(presetPath, nextPresetMarkdown);
        }

        process.stdout.write("Preset docs matrix synced.\n");
    } else if (shouldPrint) {
        process.stdout.write(nextPresetsIndex);
    } else {
        /** @type {string[]} */
        const outOfSyncFiles = [];

        if (presetsIndex !== nextPresetsIndex) {
            outOfSyncFiles.push("docs/rules/presets/index.md");
        }

        for (const configName of viteConfigNames) {
            const presetPath = PRESET_PAGE_PATHS[configName];
            const presetMarkdown = await readFile(presetPath, "utf8");
            const nextPresetMarkdown = replacePresetRulesTable(
                presetMarkdown,
                configName
            );

            if (presetMarkdown !== nextPresetMarkdown) {
                outOfSyncFiles.push(fileURLToPath(presetPath));
            }
        }

        if (shouldCheck && outOfSyncFiles.length > 0) {
            process.stderr.write(
                [
                    "Generated preset docs are out of sync.",
                    ...outOfSyncFiles.map((filePath) => `- ${filePath}`),
                    "Run: npm run sync:presets-rules-matrix:write",
                ].join("\n") + "\n"
            );
            process.exitCode = 1;
        }
    }
}
