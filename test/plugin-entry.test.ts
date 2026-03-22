import { describe, expect, it } from "vitest";

import vitePlugin from "../src/plugin.js";

describe("plugin entry", () => {
    it("exposes stable plugin metadata", () => {
        expect(vitePlugin.meta.name).toBe("eslint-plugin-vite");
        expect(vitePlugin.meta.namespace).toBe("vite");
        expect(vitePlugin.meta.version).toMatch(/^\d+\.\d+\.\d+/v);
    });

    it("exposes the expected rule ids", () => {
        expect(
            Object.keys(vitePlugin.rules).toSorted((left, right) =>
                left.localeCompare(right)
            )
        ).toEqual([
            "config-require-define-config",
            "import-meta-glob-literal",
            "no-deprecated-config-options",
            "no-disabled-vitest-isolation",
            "no-disabled-vitest-typecheck",
            "no-dynamic-import-meta-env-access",
            "no-empty-env-prefix",
            "no-empty-vitest-include",
            "no-empty-vitest-project-name",
            "no-empty-vitest-projects",
            "no-implicit-config-flags",
            "no-import-meta-env-in-config",
            "no-mixed-test-and-bench-apis",
            "no-pass-with-no-tests",
            "no-relative-resolve-alias",
            "no-restricted-import-meta-env",
            "no-unsafe-server-options",
            "no-unsafe-vitest-flags",
            "no-unsupported-project-options",
            "no-vitest-globals",
            "no-zero-vitest-slow-test-threshold",
            "no-zero-vitest-timeout",
            "prefer-define-project",
            "require-inline-project-name",
            "require-vitest-typecheck-tsconfig",
            "workspace-unique-project-name",
        ]);
    });
});
