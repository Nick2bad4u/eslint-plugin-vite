import { describe, expect, it } from "vitest";

import requireVitestCoverageReporterWhenEnabledRule from "../src/rules/require-vitest-coverage-reporter-when-enabled.js";
import { createRuleTester } from "./_internal/ruleTester.js";

describe("require-vitest-coverage-reporter-when-enabled", () => {
    createRuleTester().run(
        "require-vitest-coverage-reporter-when-enabled",
        requireVitestCoverageReporterWhenEnabledRule,
        {
            invalid: [
                {
                    code: "import { defineConfig } from 'vitest/config'; export default defineConfig({ test: { coverage: { enabled: true } } });",
                    errors: [{ messageId: "missingCoverageReporter" }],
                    filename: "vitest.config.ts",
                },
                {
                    code: "import { defineConfig } from 'vitest/config'; export default defineConfig({ test: { coverage: { enabled: true, reporter: [] } } });",
                    errors: [{ messageId: "missingCoverageReporter" }],
                    filename: "vitest.config.ts",
                },
            ],
            valid: [
                {
                    code: "import { defineConfig } from 'vitest/config'; export default defineConfig({ test: { coverage: { enabled: true, reporter: ['text', 'html'] } } });",
                    filename: "vitest.config.ts",
                },
                {
                    code: "import { defineConfig } from 'vitest/config'; export default defineConfig({ test: { coverage: { enabled: false } } });",
                    filename: "vitest.config.ts",
                },
            ],
        }
    );

    it("exposes rule metadata", () => {
        expect.hasAssertions();
        expect(
            requireVitestCoverageReporterWhenEnabledRule.meta.messages
        ).toBeDefined();
    });
});
