import { describe, expect, it } from "vitest";

import requireVitestCoverageThresholdsWhenEnabledRule from "../src/rules/require-vitest-coverage-thresholds-when-enabled.js";
import { createRuleTester } from "./_internal/ruleTester.js";

describe("require-vitest-coverage-thresholds-when-enabled", () => {
    createRuleTester().run(
        "require-vitest-coverage-thresholds-when-enabled",
        requireVitestCoverageThresholdsWhenEnabledRule,
        {
            invalid: [
                {
                    code: "import { defineConfig } from 'vitest/config'; export default defineConfig({ test: { coverage: { enabled: true } } });",
                    errors: [{ messageId: "missingCoverageThresholds" }],
                    filename: "vitest.config.ts",
                },
                {
                    code: "import { defineConfig } from 'vitest/config'; export default defineConfig({ test: { coverage: { enabled: true, thresholds: {} } } });",
                    errors: [{ messageId: "missingCoverageThresholds" }],
                    filename: "vitest.config.ts",
                },
            ],
            valid: [
                {
                    code: "import { defineConfig } from 'vitest/config'; export default defineConfig({ test: { coverage: { enabled: true, thresholds: { lines: 80 } } } });",
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
        expect(
            requireVitestCoverageThresholdsWhenEnabledRule.meta.messages
        ).toBeDefined();
    });
});
