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
    objectEntries,
    objectFromEntries,
    safeCastTo,
} from "ts-extras";

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
type VitePluginContract = {
    configs: ViteConfigsContract;
    meta: {
        name: string;
        namespace: string;
        version: string;
    };
    processors: Record<string, never>;
    rules: typeof viteRules;
};

const getPackageVersion = (pkg: unknown): string => {
    if (typeof pkg !== "object" || pkg === null) {
        return "0.0.0";
    }

    const version = Reflect.get(pkg, "version");

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

const derivePresetRuleNamesByConfig = (): Readonly<
    Record<ViteConfigName, readonly ViteRuleName[]>
> => {
    const presetRuleNamesByConfig = objectFromEntries(
        viteConfigNames.map((configName) => [
            configName,
            safeCastTo<ViteRuleName[]>([]),
        ])
    ) as Record<ViteConfigName, ViteRuleName[]>;

    for (const [ruleName, ruleModule] of safeCastTo<
        readonly [ViteRuleName, (typeof viteRules)[ViteRuleName]][]
    >(objectEntries(viteRules))) {
        const docs = ruleModule.meta.docs;
        const configNames = normalizeViteConfigNames(
            (docs as { viteConfigs?: unknown }).viteConfigs
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
    rules: viteRules as unknown as ESLint.Plugin["rules"],
};

const presetRuleNamesByConfig: Readonly<
    Record<ViteConfigName, readonly ViteRuleName[]>
> = derivePresetRuleNamesByConfig();

const createViteConfigsDefinition = (): ViteConfigsContract => {
    const configs = {} as ViteConfigsContract;

    for (const configName of viteConfigNames) {
        const configMetadata = viteConfigMetadataByName[configName];

        configs[configName] = withVitePlugin(
            {
                name: configMetadata.presetName,
                rules: errorRulesFor(presetRuleNamesByConfig[configName]),
            },
            pluginForConfigs,
            {
                requiresTypeChecking: configMetadata.requiresTypeChecking,
            }
        );
    }

    return configs;
};

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
