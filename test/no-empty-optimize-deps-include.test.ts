import { describe, expect, it } from "vitest";

import noEmptyOptimizeDepsIncludeRule from "../src/rules/no-empty-optimize-deps-include.js";
import { createRuleTester } from "./_internal/ruleTester.js";

describe("no-empty-optimize-deps-include", () => {
    createRuleTester().run(
        "no-empty-optimize-deps-include",
        noEmptyOptimizeDepsIncludeRule,
        {
            invalid: [
                {
                    code: "import { defineConfig } from 'vite'; export default defineConfig({ optimizeDeps: { include: [] } });",
                    errors: [{ messageId: "emptyOptimizeDepsInclude" }],
                    filename: "vite.config.ts",
                },
            ],
            valid: [
                {
                    code: "import { defineConfig } from 'vite'; export default defineConfig({ optimizeDeps: { include: ['react'] } });",
                    filename: "vite.config.ts",
                },
                {
                    code: "export const optimizeDeps = { include: [] };",
                    filename: "src/example.ts",
                },
            ],
        }
    );

    it("exposes rule metadata", () => {
        expect(noEmptyOptimizeDepsIncludeRule.meta.messages).toBeDefined();
    });
});
