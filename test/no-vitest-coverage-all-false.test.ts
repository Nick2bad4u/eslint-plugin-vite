import { describe, expect, it } from "vitest";

import noVitestCoverageAllFalseRule from "../src/rules/no-vitest-coverage-all-false.js";
import { createRuleTester } from "./_internal/ruleTester.js";

describe("no-vitest-coverage-all-false", () => {
    createRuleTester().run(
        "no-vitest-coverage-all-false",
        noVitestCoverageAllFalseRule,
        {
            invalid: [
                {
                    code: "import { defineConfig } from 'vitest/config'; export default defineConfig({ test: { coverage: { all: false } } });",
                    errors: [{ messageId: "coverageAllFalse" }],
                    filename: "vitest.config.ts",
                },
            ],
            valid: [
                {
                    code: "import { defineConfig } from 'vitest/config'; export default defineConfig({ test: { coverage: { all: true } } });",
                    filename: "vitest.config.ts",
                },
                {
                    code: "export const coverage = { all: false };",
                    filename: "src/example.ts",
                },
            ],
        }
    );

    it("exposes rule metadata", () => {
        expect.hasAssertions();
        expect(noVitestCoverageAllFalseRule.meta.messages).toBeDefined();
    });
});
