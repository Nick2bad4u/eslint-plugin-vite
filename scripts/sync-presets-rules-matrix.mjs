// @ts-check

import process from "node:process";
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

import vitePlugin from "../dist/plugin.js";
import {
    viteConfigNames,
    viteConfigNamesByReadmeOrder,
    viteConfigReferenceToName,
    viteConfigMetadataByName,
} from "../dist/_internal/vite-config-references.js";

/** @typedef {import("../src/plugin.js").ViteConfigName} ViteConfigName */
/** @typedef {import("../src/plugin.js").VitePlugin} VitePlugin */

const PRESETS_INDEX_PATH = new URL(
    "../docs/rules/presets/index.md",
    import.meta.url
);
const PRESET_PAGE_PATHS = {
    all: new URL("../docs/rules/presets/all.md", import.meta.url),
    client: new URL("../docs/rules/presets/client.md", import.meta.url),
    configs: new URL("../docs/rules/presets/configs.md", import.meta.url),
    recommended: new URL(
        "../docs/rules/presets/recommended.md",
        import.meta.url
    ),
    strict: new URL("../docs/rules/presets/strict.md", import.meta.url),
    vitest: new URL("../docs/rules/presets/vitest.md", import.meta.url),
    "vitest-bench": new URL(
        "../docs/rules/presets/vitest-bench.md",
        import.meta.url
    ),
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
        fixLabel:
            ruleModule.meta.fixable === "code"
                ? "🔧"
                : ruleModule.meta.hasSuggestions === true
                  ? "💡"
                  : "—",
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
        .sort((left, right) => left.ruleNumber - right.ruleNumber);

/**
 * @param {VitePlugin} [plugin]
 */
export const renderPresetMatrix = (plugin = vitePlugin) => {
    const header = ["| Rule | Fix | Preset key |", "| --- | :-: | :-- |"];

    const rows = getOrderedRules(plugin).map((rule) => {
        const presetIcons = rule.configNames
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
                const docsPath = `./${configName}.md`;

                return `[${metadata.icon}](${docsPath})`;
            })
            .join(" ");

        return `| [\`vite/${rule.ruleName}\`](../${rule.ruleName}.md) | ${rule.fixLabel} | ${presetIcons} |`;
    });

    return [...header, ...rows].join("\n");
};

/**
 * @param {ViteConfigName} configName
 * @param {VitePlugin} [plugin]
 */
export const renderPresetRulesTable = (configName, plugin = vitePlugin) => {
    const rows = getOrderedRules(plugin)
        .filter((rule) => rule.configNames.includes(configName))
        .map(
            (rule) =>
                `| [\`vite/${rule.ruleName}\`](../${rule.ruleName}.md) | ${rule.fixLabel} |`
        );

    return [
        "| Rule | Fix |",
        "| --- | :-: |",
        ...rows,
    ].join("\n");
};

/**
 * @param {string} markdown
 */
export const replacePresetMatrix = (markdown) => {
    const matrix = renderPresetMatrix();
    const pattern = new RegExp(
        `${PRESET_MATRIX_START}[\\s\\S]*?${PRESET_MATRIX_END}`,
        "u"
    );

    return markdown.replace(
        pattern,
        `${PRESET_MATRIX_START}\n${matrix}\n${PRESET_MATRIX_END}`
    );
};

/**
 * @param {string} markdown
 * @param {ViteConfigName} configName
 */
export const replacePresetRulesTable = (markdown, configName) => {
    const table = renderPresetRulesTable(configName);
    const pattern = new RegExp(
        `${PRESET_RULES_START}[\\s\\S]*?${PRESET_RULES_END}`,
        "u"
    );

    return markdown.replace(
        pattern,
        `${PRESET_RULES_START}\n${table}\n${PRESET_RULES_END}`
    );
};

const shouldWrite = process.argv.includes("--write");

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
    } else {
        process.stdout.write(nextPresetsIndex);
    }
}
