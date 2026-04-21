import { describe, expect, it } from "vitest";

import noVitestTimeoutTripletMismatchRule from "../src/rules/no-vitest-timeout-triplet-mismatch.js";
import { createRuleTester } from "./_internal/ruleTester.js";

describe("no-vitest-timeout-triplet-mismatch", () => {
    createRuleTester().run(
        "no-vitest-timeout-triplet-mismatch",
        noVitestTimeoutTripletMismatchRule,
        {
            invalid: [
                {
                    code: "export default { test: { testTimeout: 20_000, hookTimeout: 10_000, teardownTimeout: 5_000 } };",
                    errors: [{ messageId: "timeoutTripletMismatch" }],
                    filename: "vitest.config.ts",
                },
            ],
            valid: [
                {
                    code: "export default { test: { testTimeout: 20_000, hookTimeout: 10_000, teardownTimeout: 10_000 } };",
                    filename: "vitest.config.ts",
                },
                {
                    code: "export default { test: { hookTimeout: 10_000, teardownTimeout: 5_000 } };",
                    filename: "vitest.config.ts",
                },
                {
                    code: "export default { test: { testTimeout: Infinity, hookTimeout: 10_000, teardownTimeout: 5_000 } };",
                    filename: "vitest.config.ts",
                },
            ],
        }
    );

    it("exposes rule metadata", () => {
        expect.hasAssertions();
        expect(noVitestTimeoutTripletMismatchRule.meta.messages).toBeDefined();
    });
});
