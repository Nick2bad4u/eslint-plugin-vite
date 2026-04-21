import { describe, expect, it } from "vitest";

import noVitestBailAndRetryConflictRule from "../src/rules/no-vitest-bail-and-retry-conflict.js";
import { createRuleTester } from "./_internal/ruleTester.js";

describe("no-vitest-bail-and-retry-conflict", () => {
    createRuleTester().run(
        "no-vitest-bail-and-retry-conflict",
        noVitestBailAndRetryConflictRule,
        {
            invalid: [
                {
                    code: "import { defineConfig } from 'vitest/config'; export default defineConfig({ test: { bail: 1, retry: 2 } });",
                    errors: [{ messageId: "bailRetryConflict" }],
                    filename: "vitest.config.ts",
                },
                {
                    code: "import { defineConfig } from 'vitest/config'; export default defineConfig({ test: { bail: true, retry: 1 } });",
                    errors: [{ messageId: "bailRetryConflict" }],
                    filename: "vitest.config.ts",
                },
            ],
            valid: [
                {
                    code: "import { defineConfig } from 'vitest/config'; export default defineConfig({ test: { bail: 0, retry: 2 } });",
                    filename: "vitest.config.ts",
                },
                {
                    code: "import { defineConfig } from 'vitest/config'; export default defineConfig({ test: { bail: 1, retry: 0 } });",
                    filename: "vitest.config.ts",
                },
            ],
        }
    );

    it("exposes rule metadata", () => {
        expect.hasAssertions();
        expect(noVitestBailAndRetryConflictRule.meta.messages).toBeDefined();
    });
});
