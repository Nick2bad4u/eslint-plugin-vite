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
            "no-dynamic-import-meta-env-access",
            "no-empty-env-prefix",
            "no-implicit-config-flags",
            "no-import-meta-env-in-config",
            "no-mixed-test-and-bench-apis",
            "no-relative-resolve-alias",
            "no-restricted-import-meta-env",
            "no-unsafe-server-options",
            "no-unsupported-project-options",
            "prefer-define-project",
            "require-inline-project-name",
            "workspace-unique-project-name",
        ]);
    });
});
