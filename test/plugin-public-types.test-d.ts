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
    | "vitepress"
    | "vitest"
    | "vitest-bench";
ruleName satisfies
    | "config-require-define-config"
    | "import-meta-glob-literal"
    | "no-deprecated-config-options"
    | "no-disabled-vitest-isolation"
    | "no-disabled-vitest-typecheck"
    | "no-dynamic-import-meta-env-access"
    | "no-empty-env-prefix"
    | "no-implicit-config-flags"
    | "no-import-meta-env-in-config"
    | "no-mixed-test-and-bench-apis"
    | "no-pass-with-no-tests"
    | "no-relative-resolve-alias"
    | "no-restricted-import-meta-env"
    | "no-unsafe-server-options"
    | "no-unsafe-vitest-flags"
    | "no-unsupported-project-options"
    | "no-vitest-globals"
    | "no-zero-vitest-slow-test-threshold"
    | "no-zero-vitest-timeout"
    | "prefer-define-project"
    | "require-inline-project-name"
    | "require-vitest-typecheck-tsconfig"
    | "workspace-unique-project-name";
ruleId satisfies `vite/${ViteRuleName}`;
