import { describe, expect, it } from "vitest";

import noVitestCoverageCleanFalseRule from "../src/rules/no-vitest-coverage-clean-false.js";
import { createRuleTester } from "./_internal/ruleTester.js";

describe("no-vitest-coverage-clean-false", () => {
    createRuleTester().run(
        "no-vitest-coverage-clean-false",
        noVitestCoverageCleanFalseRule,
        {
            invalid: [
                {
                    code: "import { defineConfig } from 'vitest/config'; export default defineConfig({ test: { coverage: { clean: false } } });",
                    errors: [{ messageId: "coverageCleanFalse" }],
                    filename: "vitest.config.ts",
                },
            ],
            valid: [
                {
                    code: "import { defineConfig } from 'vitest/config'; export default defineConfig({ test: { coverage: { clean: true } } });",
                    filename: "vitest.config.ts",
                },
                {
                    code: "export const coverage = { clean: false };",
                    filename: "src/example.ts",
                },
            ],
        }
    );

    it("exposes rule metadata", () => {
        expect(noVitestCoverageCleanFalseRule.meta.messages).toBeDefined();
    });
});
