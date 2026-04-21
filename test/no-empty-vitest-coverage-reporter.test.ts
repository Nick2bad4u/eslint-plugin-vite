import { describe, expect, it } from "vitest";

import noEmptyVitestCoverageReporterRule from "../src/rules/no-empty-vitest-coverage-reporter.js";
import { createRuleTester } from "./_internal/ruleTester.js";

describe("no-empty-vitest-coverage-reporter", () => {
    createRuleTester().run(
        "no-empty-vitest-coverage-reporter",
        noEmptyVitestCoverageReporterRule,
        {
            invalid: [
                {
                    code: "import { defineConfig } from 'vitest/config'; export default defineConfig({ test: { coverage: { reporter: [] } } });",
                    errors: [{ messageId: "emptyCoverageReporter" }],
                    filename: "vitest.config.ts",
                },
            ],
            valid: [
                {
                    code: "import { defineConfig } from 'vitest/config'; export default defineConfig({ test: { coverage: { reporter: ['text', 'html'] } } });",
                    filename: "vitest.config.ts",
                },
                {
                    code: "export const coverage = { reporter: [] };",
                    filename: "src/example.ts",
                },
            ],
        }
    );

    it("exposes rule metadata", () => {
        expect.hasAssertions();
        expect(noEmptyVitestCoverageReporterRule.meta.messages).toBeDefined();
    });
});
