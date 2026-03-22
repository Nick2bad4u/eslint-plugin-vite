import { describe, expect, it } from "vitest";

import requireVitestMockResetPolicyRule from "../src/rules/require-vitest-mock-reset-policy.js";
import { createRuleTester } from "./_internal/ruleTester.js";

describe("require-vitest-mock-reset-policy", () => {
    createRuleTester().run(
        "require-vitest-mock-reset-policy",
        requireVitestMockResetPolicyRule,
        {
            invalid: [
                {
                    code: "import { defineConfig } from 'vitest/config'; export default defineConfig({ test: { globals: true } });",
                    errors: [{ messageId: "missingMockResetPolicy" }],
                    filename: "vitest.config.ts",
                },
                {
                    code: "import { defineConfig } from 'vitest/config'; export default defineConfig({ test: { clearMocks: false, resetMocks: false, restoreMocks: false } });",
                    errors: [{ messageId: "missingMockResetPolicy" }],
                    filename: "vitest.config.ts",
                },
            ],
            valid: [
                {
                    code: "import { defineConfig } from 'vitest/config'; export default defineConfig({ test: { clearMocks: true } });",
                    filename: "vitest.config.ts",
                },
                {
                    code: "import { defineConfig } from 'vitest/config'; export default defineConfig({ test: { restoreMocks: true } });",
                    filename: "vitest.config.ts",
                },
                {
                    code: "export const test = { clearMocks: false };",
                    filename: "src/example.ts",
                },
            ],
        }
    );

    it("exposes rule metadata", () => {
        expect(requireVitestMockResetPolicyRule.meta.messages).toBeDefined();
    });
});
