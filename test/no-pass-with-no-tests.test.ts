import { describe, expect, it } from "vitest";

import noPassWithNoTestsRule from "../src/rules/no-pass-with-no-tests.js";
import { createRuleTester } from "./_internal/ruleTester.js";

describe("no-pass-with-no-tests", () => {
    createRuleTester().run("no-pass-with-no-tests", noPassWithNoTestsRule, {
        invalid: [
            {
                code: "import { defineConfig } from 'vitest/config'; export default defineConfig({ test: { passWithNoTests: true } });",
                errors: [{ messageId: "passWithNoTests" }],
                filename: "vitest.config.ts",
            },
            {
                code: "import { defineWorkspace } from 'vitest/config'; export default defineWorkspace([{ test: { name: 'unit', passWithNoTests: true } }]);",
                errors: [{ messageId: "passWithNoTests" }],
                filename: "vitest.workspace.ts",
            },
            {
                code: "import { defineConfig } from 'vite'; export default defineConfig({ test: { projects: [{ test: { name: 'browser', passWithNoTests: true } }] } });",
                errors: [{ messageId: "passWithNoTests" }],
                filename: "vite.config.ts",
            },
        ],
        valid: [
            {
                code: "import { defineConfig } from 'vitest/config'; export default defineConfig({ test: { passWithNoTests: false } });",
                filename: "vitest.config.ts",
            },
            {
                code: "import { defineConfig } from 'vite'; export default defineConfig({ test: {} });",
                filename: "vite.config.ts",
            },
            {
                code: "export const test = { passWithNoTests: true };",
                filename: "src/example.ts",
            },
        ],
    });

    it("exposes rule metadata", () => {
        expect(noPassWithNoTestsRule.meta.messages).toBeDefined();
    });
});
