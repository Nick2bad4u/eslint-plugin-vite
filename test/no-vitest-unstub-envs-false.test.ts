import { describe, expect, it } from "vitest";

import noVitestUnstubEnvsFalseRule from "../src/rules/no-vitest-unstub-envs-false.js";
import { createRuleTester } from "./_internal/ruleTester.js";

describe("no-vitest-unstub-envs-false", () => {
    createRuleTester().run(
        "no-vitest-unstub-envs-false",
        noVitestUnstubEnvsFalseRule,
        {
            invalid: [
                {
                    code: "import { defineConfig } from 'vitest/config'; export default defineConfig({ test: { unstubEnvs: false } });",
                    errors: [{ messageId: "unstubEnvsFalse" }],
                    filename: "vitest.config.ts",
                },
            ],
            valid: [
                {
                    code: "import { defineConfig } from 'vitest/config'; export default defineConfig({ test: { unstubEnvs: true } });",
                    filename: "vitest.config.ts",
                },
                {
                    code: "export const test = { unstubEnvs: false };",
                    filename: "src/example.ts",
                },
            ],
        }
    );

    it("exposes rule metadata", () => {
        expect.hasAssertions();
        expect(noVitestUnstubEnvsFalseRule.meta.messages).toBeDefined();
    });
});
