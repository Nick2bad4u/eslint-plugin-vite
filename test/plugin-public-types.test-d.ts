import type {
    ViteConfigName,
    ViteConfigs,
    VitePlugin,
    VitePresetConfig,
    ViteRuleId,
    ViteRuleName,
} from "eslint-plugin-vite";

import vitePlugin from "eslint-plugin-vite";

declare const plugin: VitePlugin;
declare const configName: ViteConfigName;
declare const ruleName: ViteRuleName;
declare const ruleId: ViteRuleId;
declare const configs: ViteConfigs;

plugin satisfies VitePlugin;
vitePlugin satisfies VitePlugin;
configs.recommended satisfies VitePresetConfig;
configName satisfies
    | "all"
    | "client"
    | "configs"
    | "recommended"
    | "strict"
    | "vitest"
    | "vitest-bench";
ruleName satisfies
    | "config-require-define-config"
    | "import-meta-glob-literal"
    | "no-dynamic-import-meta-env-access"
    | "no-empty-env-prefix"
    | "no-mixed-test-and-bench-apis"
    | "no-relative-resolve-alias"
    | "no-restricted-import-meta-env"
    | "prefer-define-project"
    | "workspace-unique-project-name";
ruleId satisfies `vite/${ViteRuleName}`;
