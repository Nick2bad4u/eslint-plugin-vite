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
    | "vitepress"
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
    | "no-deprecated-config-options"
    | "no-disabled-vitest-isolation"
    | "no-disabled-vitest-typecheck"
    | "no-dynamic-import-meta-env-access"
    | "no-empty-env-prefix"
    | "no-empty-vitest-bench-exclude"
    | "no-empty-vitest-bench-include"
    | "no-empty-vitest-coverage-include"
    | "no-empty-vitest-coverage-reporter"
    | "no-empty-vitest-coverage-reports-directory"
    | "no-empty-vitest-exclude"
    | "no-empty-vitest-include"
    | "no-empty-vitest-project-exclude"
    | "no-empty-vitest-project-name"
    | "no-empty-vitest-projects"
    | "no-implicit-config-flags"
    | "no-import-meta-env-in-config"
    | "no-mixed-defineworkspace-and-test-projects"
    | "no-mixed-test-and-bench-apis"
    | "no-pass-with-no-tests"
    | "no-relative-resolve-alias"
    | "no-restricted-import-meta-env"
    | "no-unsafe-server-options"
    | "no-unsafe-vitest-flags"
    | "no-unsupported-project-options"
    | "no-vitest-file-parallelism-disabled"
    | "no-vitest-globals"
    | "no-vitest-ui-in-config"
    | "no-vitest-watch-in-config"
    | "no-zero-vitest-slow-test-threshold"
    | "no-zero-vitest-timeout"
    | "prefer-define-project"
    | "require-inline-project-name"
    | "require-vitest-sequence-seed-when-shuffle"
    | "require-vitest-typecheck-tsconfig"
    | "workspace-unique-project-name";

declare const vitePlugin: VitePlugin;

export default vitePlugin;
