/**
 * @packageDocumentation
 * Public plugin entrypoint for eslint-plugin-vite exports and preset wiring.
 */
import type { ESLint, Linter } from "eslint";

import typeScriptParser from "@typescript-eslint/parser";
import {
    arrayIncludes,
    isDefined,
    isEmpty,
    objectHasOwn,
    objectKeys,
} from "ts-extras";

// eslint-disable-next-line import-x/extensions -- JSON metadata is an intentional runtime import for package versioning.
import packageJson from "../package.json" with { type: "json" };
import { viteRules } from "./_internal/rules-registry.js";
import {
    type ViteConfigName as InternalViteConfigName,
    isViteConfigReference,
    viteConfigMetadataByName,
    viteConfigNames,
    viteConfigReferenceToName,
} from "./_internal/vite-config-references.js";

/** ESLint severity used by generated preset rule maps. */
const ERROR_SEVERITY = "error" as const;

/** Default file globs targeted by plugin presets when `files` is omitted. */
const DEFAULT_FILES = ["**/*.{js,cjs,mjs,jsx,ts,cts,mts,tsx}"] as const;

/** Canonical flat-config preset keys exposed through `plugin.configs`. */
export type ViteConfigName = InternalViteConfigName;

/** Flat-config preset shape produced by this plugin. */
export type VitePresetConfig = Linter.Config & {
    rules: NonNullable<Linter.Config["rules"]>;
};

type FlatConfig = Linter.Config;
type FlatLanguageOptions = NonNullable<FlatConfig["languageOptions"]>;
type FlatParserOptions = NonNullable<FlatLanguageOptions["parserOptions"]>;
type RulesConfig = VitePresetConfig["rules"];
type ViteConfigsContract = Record<ViteConfigName, VitePresetConfig>;
interface VitePluginContract {
    configs: ViteConfigsContract;
    meta: {
        name: string;
        namespace: string;
        version: string;
    };
    processors: Record<string, never>;
    rules: typeof viteRules;
}

const getPackageVersion = (pkg: unknown): string => {
    if (
        typeof pkg !== "object" ||
        pkg === null ||
        !objectHasOwn(pkg, "version")
    ) {
        return "0.0.0";
    }

    const { version } = pkg;

    return typeof version === "string" ? version : "0.0.0";
};

const typeScriptParserValue: FlatLanguageOptions["parser"] = typeScriptParser;

const defaultParserOptions = {
    ecmaVersion: "latest",
    sourceType: "module",
} satisfies FlatParserOptions;

const normalizeParserOptions = (
    parserOptions: FlatLanguageOptions["parserOptions"]
): FlatParserOptions =>
    parserOptions !== null &&
    typeof parserOptions === "object" &&
    !Array.isArray(parserOptions)
        ? { ...parserOptions }
        : { ...defaultParserOptions };

/** Fully-qualified ESLint rule id used by this plugin. */
export type ViteRuleId = `vite/${ViteRuleName}`;

/** Canonical rule-name union exposed by this plugin. */
export type ViteRuleName = keyof typeof viteRules;

const normalizeViteConfigNames = (
    candidate: unknown
): readonly ViteConfigName[] => {
    const rawValues = Array.isArray(candidate) ? candidate : [candidate];
    const configNames: ViteConfigName[] = [];

    for (const rawValue of rawValues) {
        if (typeof rawValue !== "string") {
            continue;
        }

        const configName = isViteConfigReference(rawValue)
            ? viteConfigReferenceToName[rawValue]
            : viteConfigNames.find((name) => name === rawValue);

        if (isDefined(configName) && !arrayIncludes(configNames, configName)) {
            configNames.push(configName);
        }
    }

    if (isEmpty(configNames)) {
        throw new TypeError(
            "Every rule must declare at least one docs.viteConfigs preset reference."
        );
    }

    return configNames;
};

const createEmptyPresetRuleNamesByConfig = (): Record<
    ViteConfigName,
    ViteRuleName[]
> => ({
    all: [],
    client: [],
    configs: [],
    recommended: [],
    strict: [],
    vitepress: [],
    vitest: [],
    "vitest-bench": [],
});

const getRuleDocsViteConfigs = (ruleName: ViteRuleName): unknown => {
    const docs = viteRules[ruleName].meta.docs;

    return objectHasOwn(docs, "viteConfigs") ? docs.viteConfigs : undefined;
};

const derivePresetRuleNamesByConfig = (): Readonly<
    Record<ViteConfigName, readonly ViteRuleName[]>
> => {
    const presetRuleNamesByConfig = createEmptyPresetRuleNamesByConfig();

    for (const ruleName of objectKeys(viteRules)) {
        const configNames = normalizeViteConfigNames(
            getRuleDocsViteConfigs(ruleName)
        );

        for (const configName of configNames) {
            presetRuleNamesByConfig[configName].push(ruleName);
        }
    }

    return presetRuleNamesByConfig;
};

function errorRulesFor(ruleNames: readonly ViteRuleName[]): RulesConfig {
    const rules: RulesConfig = {};

    for (const ruleName of ruleNames) {
        rules[`vite/${ruleName}`] = ERROR_SEVERITY;
    }

    return rules;
}

const withVitePlugin = (
    config: Readonly<VitePresetConfig>,
    plugin: Readonly<ESLint.Plugin>,
    options: Readonly<{ requiresTypeChecking: boolean }>
): VitePresetConfig => {
    const existingLanguageOptions = config.languageOptions ?? {};
    const existingParserOptions = existingLanguageOptions["parserOptions"];
    const parserOptions = normalizeParserOptions(existingParserOptions);

    if (options.requiresTypeChecking) {
        Reflect.set(parserOptions, "projectService", true);
    }

    const languageOptions: FlatLanguageOptions = {
        ...existingLanguageOptions,
        parser: existingLanguageOptions["parser"] ?? typeScriptParserValue,
        parserOptions,
    };

    return {
        ...config,
        files: config.files ?? [...DEFAULT_FILES],
        languageOptions,
        plugins: {
            ...config.plugins,
            vite: plugin,
        },
    };
};

const pluginForConfigs: ESLint.Plugin = {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- eslint-plugin-vite rule modules are compatible at runtime; this bridges readonly option typing differences between packages.
    rules: viteRules as unknown as ESLint.Plugin["rules"],
};

const presetRuleNamesByConfig: Readonly<
    Record<ViteConfigName, readonly ViteRuleName[]>
> = derivePresetRuleNamesByConfig();

const createPreset = (
    configName: ViteConfigName,
    presetRuleNamesByConfigMap: Readonly<
        Record<ViteConfigName, readonly ViteRuleName[]>
    >
): VitePresetConfig =>
    withVitePlugin(
        {
            name: viteConfigMetadataByName[configName].presetName,
            rules: errorRulesFor(presetRuleNamesByConfigMap[configName]),
        },
        pluginForConfigs,
        {
            requiresTypeChecking:
                viteConfigMetadataByName[configName].requiresTypeChecking,
        }
    );

const createViteConfigsDefinition = (): ViteConfigsContract => ({
    all: createPreset("all", presetRuleNamesByConfig),
    client: createPreset("client", presetRuleNamesByConfig),
    configs: createPreset("configs", presetRuleNamesByConfig),
    recommended: createPreset("recommended", presetRuleNamesByConfig),
    strict: createPreset("strict", presetRuleNamesByConfig),
    vitepress: createPreset("vitepress", presetRuleNamesByConfig),
    vitest: createPreset("vitest", presetRuleNamesByConfig),
    "vitest-bench": createPreset("vitest-bench", presetRuleNamesByConfig),
});

const viteConfigs: ViteConfigsContract = createViteConfigsDefinition();

/** Runtime type for the plugin's generated config presets. */
export type ViteConfigs = typeof viteConfigs;

/** Main plugin object exported for ESLint consumption. */
const vitePlugin: VitePluginContract = {
    configs: viteConfigs,
    meta: {
        name: "@typpi/eslint-plugin-vite",
        namespace: "vite",
        version: getPackageVersion(packageJson),
    },
    processors: {},
    rules: viteRules,
};

/** Runtime type for the plugin object exported as default. */
export type VitePlugin = typeof vitePlugin;

export default vitePlugin;
