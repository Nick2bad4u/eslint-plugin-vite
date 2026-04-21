import { describe, expect, it } from "vitest";

import noEmptyOptimizeDepsExcludeRule from "../src/rules/no-empty-optimize-deps-exclude.js";
import { createRuleTester } from "./_internal/ruleTester.js";

describe("no-empty-optimize-deps-exclude", () => {
    createRuleTester().run(
        "no-empty-optimize-deps-exclude",
        noEmptyOptimizeDepsExcludeRule,
        {
            invalid: [
                {
                    code: "import { defineConfig } from 'vite'; export default defineConfig({ optimizeDeps: { exclude: [] } });",
                    errors: [{ messageId: "emptyOptimizeDepsExclude" }],
                    filename: "vite.config.ts",
                },
            ],
            valid: [
                {
                    code: "import { defineConfig } from 'vite'; export default defineConfig({ optimizeDeps: { exclude: ['react'] } });",
                    filename: "vite.config.ts",
                },
                {
                    code: "export const optimizeDeps = { exclude: [] };",
                    filename: "src/example.ts",
                },
            ],
        }
    );

    it("exposes rule metadata", () => {
        expect.hasAssertions();
        expect(noEmptyOptimizeDepsExcludeRule.meta.messages).toBeDefined();
    });
});
