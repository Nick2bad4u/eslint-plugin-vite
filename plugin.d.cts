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
    export type ViteConfigName = PublishedViteConfigName;
    export type ViteConfigs = PublishedViteConfigs;
    export type VitePlugin = PublishedVitePlugin;
    export type VitePresetConfig = PublishedVitePresetConfig;
    export type ViteRuleId = PublishedViteRuleId;
    export type ViteRuleName = PublishedViteRuleName;
}

export = vitePlugin;
