import { describe, expect, it } from "vitest";

import noVitestFileParallelismDisabledRule from "../src/rules/no-vitest-file-parallelism-disabled.js";
import { createRuleTester } from "./_internal/ruleTester.js";

describe("no-vitest-file-parallelism-disabled", () => {
    createRuleTester().run(
        "no-vitest-file-parallelism-disabled",
        noVitestFileParallelismDisabledRule,
        {
            invalid: [
                {
                    code: "import { defineConfig } from 'vitest/config'; export default defineConfig({ test: { fileParallelism: false } });",
                    errors: [{ messageId: "disabledFileParallelism" }],
                    filename: "vitest.config.ts",
                },
            ],
            valid: [
                {
                    code: "import { defineConfig } from 'vitest/config'; export default defineConfig({ test: { fileParallelism: true } });",
                    filename: "vitest.config.ts",
                },
                {
                    code: "export const test = { fileParallelism: false };",
                    filename: "src/example.ts",
                },
            ],
        }
    );

    it("exposes rule metadata", () => {
        expect(noVitestFileParallelismDisabledRule.meta.messages).toBeDefined();
    });
});
