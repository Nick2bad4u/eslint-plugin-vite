import type {
    ViteConfigName,
    ViteConfigs,
    VitePlugin,
    VitePresetConfig,
    ViteRuleId,
    ViteRuleName,
} from "@typpi/eslint-plugin-vite";

import vitePlugin from "@typpi/eslint-plugin-vite";

declare const plugin: VitePlugin;
declare const configName: ViteConfigName;
declare const ruleName: ViteRuleName;
declare const ruleId: ViteRuleId;
declare const configs: ViteConfigs;

plugin satisfies VitePlugin;
vitePlugin satisfies VitePlugin;
configs.recommended satisfies VitePresetConfig;
configName satisfies ViteConfigName;
ruleName satisfies ViteRuleName;
ruleId satisfies `vite/${ViteRuleName}`;
