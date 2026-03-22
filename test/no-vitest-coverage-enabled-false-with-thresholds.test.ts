import { describe, expect, it } from "vitest";

import noVitestCoverageEnabledFalseWithThresholdsRule from "../src/rules/no-vitest-coverage-enabled-false-with-thresholds.js";
import { createRuleTester } from "./_internal/ruleTester.js";

describe("no-vitest-coverage-enabled-false-with-thresholds", () => {
    createRuleTester().run(
        "no-vitest-coverage-enabled-false-with-thresholds",
        noVitestCoverageEnabledFalseWithThresholdsRule,
        {
            invalid: [
                {
                    code: "import { defineConfig } from 'vitest/config'; export default defineConfig({ test: { coverage: { enabled: false, thresholds: { lines: 90 } } } });",
                    errors: [{ messageId: "enabledFalseWithThresholds" }],
                    filename: "vitest.config.ts",
                },
            ],
            valid: [
                {
                    code: "import { defineConfig } from 'vitest/config'; export default defineConfig({ test: { coverage: { enabled: true, thresholds: { lines: 90 } } } });",
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
            noVitestCoverageEnabledFalseWithThresholdsRule.meta.messages
        ).toBeDefined();
    });
});
