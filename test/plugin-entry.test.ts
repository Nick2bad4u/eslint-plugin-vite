import { describe, expect, it } from "vitest";

import vitePlugin from "../src/plugin.js";

describe("plugin entry", () => {
    it("exposes stable plugin metadata", () => {
        expect.hasAssertions();
        expect(vitePlugin.meta.name).toBe("@typpi/eslint-plugin-vite");
        expect(vitePlugin.meta.namespace).toBe("vite");
        expect(vitePlugin.meta.version).toMatch(/^\d+\.\d+\.\d+/v);
    });

    it("exposes the expected rule ids", () => {
        expect.hasAssertions();
        expect(
            Object.keys(vitePlugin.rules).toSorted((left, right) =>
                left.localeCompare(right)
            )
        ).toStrictEqual([
            "config-require-define-config",
            "import-meta-glob-literal",
            "no-deprecated-config-options",
            "no-disabled-vitest-isolation",
            "no-disabled-vitest-typecheck",
            "no-dynamic-import-meta-env-access",
            "no-empty-env-prefix",
            "no-empty-optimize-deps-exclude",
            "no-empty-optimize-deps-include",
            "no-empty-ssr-external",
            "no-empty-ssr-noexternal",
            "no-empty-vitest-bench-exclude",
            "no-empty-vitest-bench-include",
            "no-empty-vitest-coverage-include",
            "no-empty-vitest-coverage-reporter",
            "no-empty-vitest-coverage-reports-directory",
            "no-empty-vitest-exclude",
            "no-empty-vitest-include",
            "no-empty-vitest-project-exclude",
            "no-empty-vitest-project-name",
            "no-empty-vitest-projects",
            "no-empty-worker-plugins",
            "no-implicit-config-flags",
            "no-import-meta-env-in-config",
            "no-mixed-defineworkspace-and-test-projects",
            "no-mixed-test-and-bench-apis",
            "no-pass-with-no-tests",
            "no-relative-resolve-alias",
            "no-restricted-import-meta-env",
            "no-unsafe-server-options",
            "no-unsafe-vitest-flags",
            "no-unsupported-project-options",
            "no-vitepress-empty-head",
            "no-vitepress-empty-theme-config",
            "no-vitest-bail-and-retry-conflict",
            "no-vitest-coverage-all-false",
            "no-vitest-coverage-clean-false",
            "no-vitest-coverage-enabled-false-with-thresholds",
            "no-vitest-coverage-reporter-text-only",
            "no-vitest-coverage-skip-full-false-in-strict",
            "no-vitest-coverage-temp-dir-in-repo-root",
            "no-vitest-default-cache-dir-in-monorepo",
            "no-vitest-env-leakage-combo",
            "no-vitest-file-parallelism-disabled",
            "no-vitest-globals",
            "no-vitest-max-workers-zero",
            "no-vitest-min-workers-greater-than-max-workers",
            "no-vitest-single-thread-pool-by-default",
            "no-vitest-timeout-triplet-mismatch",
            "no-vitest-ui-in-config",
            "no-vitest-unstub-envs-false",
            "no-vitest-unstub-globals-false",
            "no-vitest-watch-in-config",
            "no-zero-vitest-slow-test-threshold",
            "no-zero-vitest-timeout",
            "prefer-define-project",
            "prefer-vitest-restore-mocks",
            "require-inline-project-name",
            "require-vitepress-clean-urls-explicit",
            "require-vitepress-title-or-titletemplate",
            "require-vitest-coverage-provider-when-enabled",
            "require-vitest-coverage-reporter-when-enabled",
            "require-vitest-coverage-reports-directory",
            "require-vitest-coverage-thresholds-when-enabled",
            "require-vitest-environment-match-globs",
            "require-vitest-explicit-environment",
            "require-vitest-mock-reset-policy",
            "require-vitest-sequence-seed-when-shuffle",
            "require-vitest-slow-test-threshold",
            "require-vitest-timeout-triplet",
            "require-vitest-typecheck-tsconfig",
            "workspace-unique-project-name",
        ]);
    });
});
