import { describe, expect, it } from "vitest";

import noEmptyVitestCoverageIncludeRule from "../src/rules/no-empty-vitest-coverage-include.js";
import { createRuleTester } from "./_internal/ruleTester.js";

describe("no-empty-vitest-coverage-include", () => {
    createRuleTester().run(
        "no-empty-vitest-coverage-include",
        noEmptyVitestCoverageIncludeRule,
        {
            invalid: [
                {
                    code: "import { defineConfig } from 'vitest/config'; export default defineConfig({ test: { coverage: { include: [] } } });",
                    errors: [{ messageId: "emptyCoverageInclude" }],
                    filename: "vitest.config.ts",
                },
            ],
            valid: [
                {
                    code: "import { defineConfig } from 'vitest/config'; export default defineConfig({ test: { coverage: { include: ['src/**/*.ts'] } } });",
                    filename: "vitest.config.ts",
                },
                {
                    code: "export const coverage = { include: [] };",
                    filename: "src/example.ts",
                },
            ],
        }
    );

    it("exposes rule metadata", () => {
        expect.hasAssertions();
        expect(noEmptyVitestCoverageIncludeRule.meta.messages).toBeDefined();
    });
});
