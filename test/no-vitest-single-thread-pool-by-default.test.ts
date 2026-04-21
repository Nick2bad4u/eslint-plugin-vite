import { describe, expect, it } from "vitest";

import noVitestSingleThreadPoolByDefaultRule from "../src/rules/no-vitest-single-thread-pool-by-default.js";
import { createRuleTester } from "./_internal/ruleTester.js";

describe("no-vitest-single-thread-pool-by-default", () => {
    createRuleTester().run(
        "no-vitest-single-thread-pool-by-default",
        noVitestSingleThreadPoolByDefaultRule,
        {
            invalid: [
                {
                    code: "import { defineConfig } from 'vitest/config'; export default defineConfig({ test: { poolOptions: { custom: { threads: 1 } } } });",
                    errors: [{ messageId: "singleThreadPool" }],
                    filename: "vitest.config.ts",
                },
                {
                    code: "import { defineConfig } from 'vitest/config'; export default defineConfig({ test: { poolOptions: { threads: { maxThreads: 1 } } } });",
                    errors: [{ messageId: "singleThreadPool" }],
                    filename: "vitest.config.ts",
                },
            ],
            valid: [
                {
                    code: "import { defineConfig } from 'vitest/config'; export default defineConfig({ test: { poolOptions: { threads: { maxThreads: 2 } } } });",
                    filename: "vitest.config.ts",
                },
                {
                    code: "export const poolOptions = { threads: 1 };",
                    filename: "src/example.ts",
                },
            ],
        }
    );

    it("exposes rule metadata", () => {
        expect.hasAssertions();
        expect(
            noVitestSingleThreadPoolByDefaultRule.meta.messages
        ).toBeDefined();
    });
});
