import { describe, expect, it } from "vitest";

import noVitestUnstubGlobalsFalseRule from "../src/rules/no-vitest-unstub-globals-false.js";
import { createRuleTester } from "./_internal/ruleTester.js";

describe("no-vitest-unstub-globals-false", () => {
    createRuleTester().run(
        "no-vitest-unstub-globals-false",
        noVitestUnstubGlobalsFalseRule,
        {
            invalid: [
                {
                    code: "import { defineConfig } from 'vitest/config'; export default defineConfig({ test: { unstubGlobals: false } });",
                    errors: [{ messageId: "unstubGlobalsFalse" }],
                    filename: "vitest.config.ts",
                },
            ],
            valid: [
                {
                    code: "import { defineConfig } from 'vitest/config'; export default defineConfig({ test: { unstubGlobals: true } });",
                    filename: "vitest.config.ts",
                },
                {
                    code: "export const test = { unstubGlobals: false };",
                    filename: "src/example.ts",
                },
            ],
        }
    );

    it("exposes rule metadata", () => {
        expect.hasAssertions();
        expect(noVitestUnstubGlobalsFalseRule.meta.messages).toBeDefined();
    });
});
