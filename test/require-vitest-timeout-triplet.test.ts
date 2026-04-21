import { describe, expect, it } from "vitest";

import requireVitestTimeoutTripletRule from "../src/rules/require-vitest-timeout-triplet.js";
import { createRuleTester } from "./_internal/ruleTester.js";

describe("require-vitest-timeout-triplet", () => {
    createRuleTester().run(
        "require-vitest-timeout-triplet",
        requireVitestTimeoutTripletRule,
        {
            invalid: [
                {
                    code: "export default { test: { testTimeout: 10_000 } };",
                    errors: [{ messageId: "missingTimeoutTriplet" }],
                    filename: "vitest.config.ts",
                },
                {
                    code: "export default { test: { hookTimeout: 10_000, teardownTimeout: 15_000 } };",
                    errors: [{ messageId: "missingTimeoutTriplet" }],
                    filename: "vitest.config.ts",
                },
                {
                    code: "export default { test: {} };",
                    errors: [{ messageId: "missingTimeoutTriplet" }],
                    filename: "vitest.config.ts",
                    options: [{ mode: "always" }],
                },
            ],
            valid: [
                {
                    code: "export default { test: { testTimeout: 8_000, hookTimeout: 5_000, teardownTimeout: 5_000 } };",
                    filename: "vitest.config.ts",
                },
                {
                    code: "export default {};",
                    filename: "vite.config.ts",
                },
                {
                    code: "export default { test: {} };",
                    filename: "vitest.config.ts",
                },
                {
                    code: "export default ['packages/*/vitest.config.ts'];",
                    filename: "vitest.workspace.ts",
                },
            ],
        }
    );

    it("exposes rule metadata", () => {
        expect.hasAssertions();
        expect(requireVitestTimeoutTripletRule.meta.messages).toBeDefined();
    });
});
