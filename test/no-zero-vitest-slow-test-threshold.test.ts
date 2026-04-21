import { describe, expect, it } from "vitest";

import noZeroVitestSlowTestThresholdRule from "../src/rules/no-zero-vitest-slow-test-threshold.js";
import { createRuleTester } from "./_internal/ruleTester.js";

describe("no-zero-vitest-slow-test-threshold", () => {
    createRuleTester().run(
        "no-zero-vitest-slow-test-threshold",
        noZeroVitestSlowTestThresholdRule,
        {
            invalid: [
                {
                    code: "import { defineConfig } from 'vitest/config'; export default defineConfig({ test: { slowTestThreshold: 0 } });",
                    errors: [{ messageId: "zeroSlowTestThreshold" }],
                    filename: "vitest.config.ts",
                },
                {
                    code: "import { defineWorkspace } from 'vitest/config'; export default defineWorkspace([{ test: { name: 'unit', slowTestThreshold: 0 } }]);",
                    errors: [{ messageId: "zeroSlowTestThreshold" }],
                    filename: "vitest.workspace.ts",
                },
                {
                    code: "import { defineConfig } from 'vite'; export default defineConfig({ test: { projects: [{ test: { name: 'browser', slowTestThreshold: 0 } }] } });",
                    errors: [{ messageId: "zeroSlowTestThreshold" }],
                    filename: "vite.config.ts",
                },
            ],
            valid: [
                {
                    code: "import { defineConfig } from 'vitest/config'; export default defineConfig({ test: { slowTestThreshold: 300 } });",
                    filename: "vitest.config.ts",
                },
                {
                    code: "import { defineConfig } from 'vite'; export default defineConfig({ test: {} });",
                    filename: "vite.config.ts",
                },
                {
                    code: "export const options = { test: { slowTestThreshold: 0 } };",
                    filename: "src/example.ts",
                },
            ],
        }
    );

    it("exposes rule metadata", () => {
        expect.hasAssertions();
        expect(noZeroVitestSlowTestThresholdRule.meta.messages).toBeDefined();
    });
});
