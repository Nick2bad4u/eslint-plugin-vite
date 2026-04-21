import { describe, expect, it } from "vitest";

import noEmptyVitestIncludeRule from "../src/rules/no-empty-vitest-include.js";
import { createRuleTester } from "./_internal/ruleTester.js";

describe("no-empty-vitest-include", () => {
    createRuleTester().run(
        "no-empty-vitest-include",
        noEmptyVitestIncludeRule,
        {
            invalid: [
                {
                    code: "import { defineConfig } from 'vitest/config'; export default defineConfig({ test: { include: [] } });",
                    errors: [{ messageId: "emptyInclude" }],
                    filename: "vitest.config.ts",
                },
                {
                    code: "import { defineWorkspace } from 'vitest/config'; export default defineWorkspace([{ test: { name: 'unit', include: [] } }]);",
                    errors: [{ messageId: "emptyInclude" }],
                    filename: "vitest.workspace.ts",
                },
            ],
            valid: [
                {
                    code: "import { defineConfig } from 'vitest/config'; export default defineConfig({ test: { include: ['test/**/*.test.ts'] } });",
                    filename: "vitest.config.ts",
                },
                {
                    code: "import { defineConfig } from 'vite'; export default defineConfig({ test: {} });",
                    filename: "vite.config.ts",
                },
                {
                    code: "export const include = [];",
                    filename: "src/example.ts",
                },
            ],
        }
    );

    it("exposes rule metadata", () => {
        expect.hasAssertions();
        expect(noEmptyVitestIncludeRule.meta.messages).toBeDefined();
    });
});
