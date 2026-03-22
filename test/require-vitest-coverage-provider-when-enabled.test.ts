import { describe, expect, it } from "vitest";

import requireVitestCoverageProviderWhenEnabledRule from "../src/rules/require-vitest-coverage-provider-when-enabled.js";
import { createRuleTester } from "./_internal/ruleTester.js";

describe("require-vitest-coverage-provider-when-enabled", () => {
    createRuleTester().run(
        "require-vitest-coverage-provider-when-enabled",
        requireVitestCoverageProviderWhenEnabledRule,
        {
            invalid: [
                {
                    code: "import { defineConfig } from 'vitest/config'; export default defineConfig({ test: { coverage: { enabled: true } } });",
                    errors: [{ messageId: "missingCoverageProvider" }],
                    filename: "vitest.config.ts",
                },
            ],
            valid: [
                {
                    code: "import { defineConfig } from 'vitest/config'; export default defineConfig({ test: { coverage: { enabled: true, provider: 'v8' } } });",
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
            requireVitestCoverageProviderWhenEnabledRule.meta.messages
        ).toBeDefined();
    });
});
