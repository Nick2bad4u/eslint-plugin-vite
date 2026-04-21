import { describe, expect, it } from "vitest";

import noVitestCoverageSkipFullFalseInStrictRule from "../src/rules/no-vitest-coverage-skip-full-false-in-strict.js";
import { createRuleTester } from "./_internal/ruleTester.js";

describe("no-vitest-coverage-skip-full-false-in-strict", () => {
    createRuleTester().run(
        "no-vitest-coverage-skip-full-false-in-strict",
        noVitestCoverageSkipFullFalseInStrictRule,
        {
            invalid: [
                {
                    code: "import { defineConfig } from 'vitest/config'; export default defineConfig({ test: { coverage: { skipFull: false } } });",
                    errors: [{ messageId: "skipFullFalse" }],
                    filename: "vitest.config.ts",
                },
            ],
            valid: [
                {
                    code: "import { defineConfig } from 'vitest/config'; export default defineConfig({ test: { coverage: { skipFull: true } } });",
                    filename: "vitest.config.ts",
                },
                {
                    code: "export const coverage = { skipFull: false };",
                    filename: "src/example.ts",
                },
            ],
        }
    );

    it("exposes rule metadata", () => {
        expect.hasAssertions();
        expect(
            noVitestCoverageSkipFullFalseInStrictRule.meta.messages
        ).toBeDefined();
    });
});
