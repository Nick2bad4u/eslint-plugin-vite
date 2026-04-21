import { describe, expect, it } from "vitest";

import requireVitestSlowTestThresholdRule from "../src/rules/require-vitest-slow-test-threshold.js";
import { createRuleTester } from "./_internal/ruleTester.js";

describe("require-vitest-slow-test-threshold", () => {
    createRuleTester().run(
        "require-vitest-slow-test-threshold",
        requireVitestSlowTestThresholdRule,
        {
            invalid: [
                {
                    code: "export default { test: {} };",
                    errors: [{ messageId: "missingSlowTestThreshold" }],
                    filename: "vitest.config.ts",
                },
                {
                    code: "export default {};",
                    errors: [{ messageId: "missingSlowTestThreshold" }],
                    filename: "vitest.config.ts",
                },
                {
                    code: "export default { test: { include: ['test/**/*.test.ts'] } };",
                    errors: [{ messageId: "missingSlowTestThreshold" }],
                    filename: "vite.config.ts",
                },
            ],
            valid: [
                {
                    code: "export default { test: { slowTestThreshold: 250 } };",
                    filename: "vitest.config.ts",
                },
                {
                    code: "export default {};",
                    filename: "vite.config.ts",
                },
            ],
        }
    );

    it("exposes rule metadata", () => {
        expect.hasAssertions();
        expect(requireVitestSlowTestThresholdRule.meta.messages).toBeDefined();
    });
});
