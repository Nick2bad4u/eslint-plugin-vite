import { describe, expect, it } from "vitest";

import requireVitestExplicitEnvironmentRule from "../src/rules/require-vitest-explicit-environment.js";
import { createRuleTester } from "./_internal/ruleTester.js";

describe("require-vitest-explicit-environment", () => {
    createRuleTester().run(
        "require-vitest-explicit-environment",
        requireVitestExplicitEnvironmentRule,
        {
            invalid: [
                {
                    code: "export default { test: {} };",
                    errors: [{ messageId: "missingEnvironment" }],
                    filename: "vitest.config.ts",
                },
                {
                    code: "export default { test: { include: ['test/**/*.test.ts'] } };",
                    errors: [{ messageId: "missingEnvironment" }],
                    filename: "vite.config.ts",
                },
            ],
            valid: [
                {
                    code: "export default { test: { environment: 'node' } };",
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
        expect(
            requireVitestExplicitEnvironmentRule.meta.messages
        ).toBeDefined();
    });
});
