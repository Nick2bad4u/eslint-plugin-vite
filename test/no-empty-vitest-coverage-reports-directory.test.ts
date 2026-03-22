import { describe, expect, it } from "vitest";

import noEmptyVitestCoverageReportsDirectoryRule from "../src/rules/no-empty-vitest-coverage-reports-directory.js";
import { createRuleTester } from "./_internal/ruleTester.js";

describe("no-empty-vitest-coverage-reports-directory", () => {
    createRuleTester().run(
        "no-empty-vitest-coverage-reports-directory",
        noEmptyVitestCoverageReportsDirectoryRule,
        {
            invalid: [
                {
                    code: "import { defineConfig } from 'vitest/config'; export default defineConfig({ test: { coverage: { reportsDirectory: '' } } });",
                    errors: [{ messageId: "emptyCoverageReportsDirectory" }],
                    filename: "vitest.config.ts",
                },
                {
                    code: "import { defineConfig } from 'vitest/config'; export default defineConfig({ test: { coverage: { reportsDirectory: `   ` } } });",
                    errors: [{ messageId: "emptyCoverageReportsDirectory" }],
                    filename: "vitest.config.ts",
                },
            ],
            valid: [
                {
                    code: "import { defineConfig } from 'vitest/config'; export default defineConfig({ test: { coverage: { reportsDirectory: './coverage' } } });",
                    filename: "vitest.config.ts",
                },
                {
                    code: "export const coverage = { reportsDirectory: '' };",
                    filename: "src/example.ts",
                },
            ],
        }
    );

    it("exposes rule metadata", () => {
        expect(
            noEmptyVitestCoverageReportsDirectoryRule.meta.messages
        ).toBeDefined();
    });
});
