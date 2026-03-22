import { describe, expect, it } from "vitest";

import noVitestCoverageReporterTextOnlyRule from "../src/rules/no-vitest-coverage-reporter-text-only.js";
import { createRuleTester } from "./_internal/ruleTester.js";

describe("no-vitest-coverage-reporter-text-only", () => {
    createRuleTester().run(
        "no-vitest-coverage-reporter-text-only",
        noVitestCoverageReporterTextOnlyRule,
        {
            invalid: [
                {
                    code: "import { defineConfig } from 'vitest/config'; export default defineConfig({ test: { coverage: { reporter: 'text' } } });",
                    errors: [{ messageId: "textOnlyReporter" }],
                    filename: "vitest.config.ts",
                },
                {
                    code: "import { defineConfig } from 'vitest/config'; export default defineConfig({ test: { coverage: { reporter: ['text'] } } });",
                    errors: [{ messageId: "textOnlyReporter" }],
                    filename: "vitest.config.ts",
                },
            ],
            valid: [
                {
                    code: "import { defineConfig } from 'vitest/config'; export default defineConfig({ test: { coverage: { reporter: ['text', 'json'] } } });",
                    filename: "vitest.config.ts",
                },
                {
                    code: "import { defineConfig } from 'vitest/config'; export default defineConfig({ test: { coverage: { reporter: 'html' } } });",
                    filename: "vitest.config.ts",
                },
            ],
        }
    );

    it("exposes rule metadata", () => {
        expect(
            noVitestCoverageReporterTextOnlyRule.meta.messages
        ).toBeDefined();
    });
});
