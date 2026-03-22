import { describe, expect, it } from "vitest";

import noVitestMaxWorkersZeroRule from "../src/rules/no-vitest-max-workers-zero.js";
import { createRuleTester } from "./_internal/ruleTester.js";

describe("no-vitest-max-workers-zero", () => {
    createRuleTester().run(
        "no-vitest-max-workers-zero",
        noVitestMaxWorkersZeroRule,
        {
            invalid: [
                {
                    code: "import { defineConfig } from 'vitest/config'; export default defineConfig({ test: { maxWorkers: 0 } });",
                    errors: [{ messageId: "invalidMaxWorkers" }],
                    filename: "vitest.config.ts",
                },
                {
                    code: "import { defineConfig } from 'vitest/config'; export default defineConfig({ test: { maxWorkers: '' } });",
                    errors: [{ messageId: "invalidMaxWorkers" }],
                    filename: "vitest.config.ts",
                },
            ],
            valid: [
                {
                    code: "import { defineConfig } from 'vitest/config'; export default defineConfig({ test: { maxWorkers: 2 } });",
                    filename: "vitest.config.ts",
                },
                {
                    code: "import { defineConfig } from 'vitest/config'; export default defineConfig({ test: { maxWorkers: '50%' } });",
                    filename: "vitest.config.ts",
                },
            ],
        }
    );

    it("exposes rule metadata", () => {
        expect(noVitestMaxWorkersZeroRule.meta.messages).toBeDefined();
    });
});
