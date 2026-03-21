/**
 * @packageDocumentation
 * Type declaration entrypoint for the published `plugin.mjs` default export.
 */

import type { ESLint, Linter } from "eslint";

export type ViteConfigName =
    | "all"
    | "client"
    | "configs"
    | "recommended"
    | "strict"
    | "vitest"
    | "vitest-bench";

export type ViteConfigs = Record<ViteConfigName, VitePresetConfig>;

export interface VitePlugin extends ESLint.Plugin {
    configs: ViteConfigs;
    meta: {
        name: string;
        namespace: string;
        version: string;
    };
    processors: Record<string, never>;
    rules: Record<ViteRuleName, NonNullable<ESLint.Plugin["rules"]>[string]>;
}

export type VitePresetConfig = Linter.Config & {
    rules: NonNullable<Linter.Config["rules"]>;
};

export type ViteRuleId = `vite/${ViteRuleName}`;

export type ViteRuleName =
    | "config-require-define-config"
    | "import-meta-glob-literal"
    | "no-dynamic-import-meta-env-access"
    | "no-empty-env-prefix"
    | "no-mixed-test-and-bench-apis"
    | "no-relative-resolve-alias"
    | "no-restricted-import-meta-env"
    | "prefer-define-project"
    | "workspace-unique-project-name";

declare const vitePlugin: VitePlugin;

export default vitePlugin;
