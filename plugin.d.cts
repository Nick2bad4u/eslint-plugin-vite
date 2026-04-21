/**
 * @packageDocumentation
 * Type declaration entrypoint for the published `plugin.cjs` CommonJS export.
 */

import type {
    ViteConfigName as PublishedViteConfigName,
    ViteConfigs as PublishedViteConfigs,
    VitePlugin as PublishedVitePlugin,
    VitePresetConfig as PublishedVitePresetConfig,
    ViteRuleId as PublishedViteRuleId,
    ViteRuleName as PublishedViteRuleName,
} from "./plugin.d.mts";

declare const vitePlugin: PublishedVitePlugin;

// eslint-disable-next-line no-redeclare, @typescript-eslint/no-redeclare -- required for CommonJS `export =` namespace merging
declare namespace vitePlugin {
    /** Canonical flat-config preset key names exposed via `plugin.configs`. */
    export type ViteConfigName = PublishedViteConfigName;
    /** Mapping of preset key names to generated flat-config definitions. */
    export type ViteConfigs = PublishedViteConfigs;
    /** Public plugin contract surface for the CommonJS entrypoint. */
    export type VitePlugin = PublishedVitePlugin;
    /** Flat-config preset shape produced by this plugin. */
    export type VitePresetConfig = PublishedVitePresetConfig;
    /** Fully-qualified rule id type (`vite/<rule-name>`). */
    export type ViteRuleId = PublishedViteRuleId;
    /** Canonical unqualified rule-name union exposed by this plugin. */
    export type ViteRuleName = PublishedViteRuleName;
}

export = vitePlugin;
