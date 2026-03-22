import { describe, expect, it } from "vitest";

import noEmptyVitestBenchIncludeRule from "../src/rules/no-empty-vitest-bench-include.js";
import { createRuleTester } from "./_internal/ruleTester.js";

describe("no-empty-vitest-bench-include", () => {
    createRuleTester().run(
        "no-empty-vitest-bench-include",
        noEmptyVitestBenchIncludeRule,
        {
            invalid: [
                {
                    code: "import { defineConfig } from 'vitest/config'; export default defineConfig({ test: { benchmark: { include: [] } } });",
                    errors: [{ messageId: "emptyBenchInclude" }],
                    filename: "vitest.config.ts",
                },
            ],
            valid: [
                {
                    code: "import { defineConfig } from 'vitest/config'; export default defineConfig({ test: { benchmark: { include: ['bench/**/*.bench.ts'] } } });",
                    filename: "vitest.config.ts",
                },
                {
                    code: "export const benchmark = { include: [] };",
                    filename: "src/example.ts",
                },
            ],
        }
    );

    it("exposes rule metadata", () => {
        expect(noEmptyVitestBenchIncludeRule.meta.messages).toBeDefined();
    });
});
