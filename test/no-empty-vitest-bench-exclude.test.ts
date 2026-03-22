import { describe, expect, it } from "vitest";

import noEmptyVitestBenchExcludeRule from "../src/rules/no-empty-vitest-bench-exclude.js";
import { createRuleTester } from "./_internal/ruleTester.js";

describe("no-empty-vitest-bench-exclude", () => {
    createRuleTester().run(
        "no-empty-vitest-bench-exclude",
        noEmptyVitestBenchExcludeRule,
        {
            invalid: [
                {
                    code: "import { defineConfig } from 'vitest/config'; export default defineConfig({ test: { benchmark: { exclude: [] } } });",
                    errors: [{ messageId: "emptyBenchExclude" }],
                    filename: "vitest.config.ts",
                },
            ],
            valid: [
                {
                    code: "import { defineConfig } from 'vitest/config'; export default defineConfig({ test: { benchmark: { exclude: ['dist/**'] } } });",
                    filename: "vitest.config.ts",
                },
                {
                    code: "export const benchmark = { exclude: [] };",
                    filename: "src/example.ts",
                },
            ],
        }
    );

    it("exposes rule metadata", () => {
        expect(noEmptyVitestBenchExcludeRule.meta.messages).toBeDefined();
    });
});
