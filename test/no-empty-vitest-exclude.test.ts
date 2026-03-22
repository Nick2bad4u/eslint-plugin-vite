import { describe, expect, it } from "vitest";

import noEmptyVitestExcludeRule from "../src/rules/no-empty-vitest-exclude.js";
import { createRuleTester } from "./_internal/ruleTester.js";

describe("no-empty-vitest-exclude", () => {
    createRuleTester().run(
        "no-empty-vitest-exclude",
        noEmptyVitestExcludeRule,
        {
            invalid: [
                {
                    code: "import { defineConfig } from 'vitest/config'; export default defineConfig({ test: { exclude: [] } });",
                    errors: [{ messageId: "emptyExclude" }],
                    filename: "vitest.config.ts",
                },
            ],
            valid: [
                {
                    code: "import { defineConfig } from 'vitest/config'; export default defineConfig({ test: { exclude: ['dist/**'] } });",
                    filename: "vitest.config.ts",
                },
                {
                    code: "import { defineConfig } from 'vite'; export default defineConfig({ test: { projects: [{ test: { exclude: [] } }] } });",
                    filename: "vite.config.ts",
                },
            ],
        }
    );

    it("exposes rule metadata", () => {
        expect(noEmptyVitestExcludeRule.meta.messages).toBeDefined();
    });
});
