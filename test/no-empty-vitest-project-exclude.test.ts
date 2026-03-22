import { describe, expect, it } from "vitest";

import noEmptyVitestProjectExcludeRule from "../src/rules/no-empty-vitest-project-exclude.js";
import { createRuleTester } from "./_internal/ruleTester.js";

describe("no-empty-vitest-project-exclude", () => {
    createRuleTester().run(
        "no-empty-vitest-project-exclude",
        noEmptyVitestProjectExcludeRule,
        {
            invalid: [
                {
                    code: "import { defineWorkspace } from 'vitest/config'; export default defineWorkspace([{ test: { name: 'unit', exclude: [] } }]);",
                    errors: [{ messageId: "emptyProjectExclude" }],
                    filename: "vitest.workspace.ts",
                },
                {
                    code: "import { defineConfig } from 'vite'; export default defineConfig({ test: { projects: [{ test: { name: 'browser', exclude: [] } }] } });",
                    errors: [{ messageId: "emptyProjectExclude" }],
                    filename: "vite.config.ts",
                },
            ],
            valid: [
                {
                    code: "import { defineWorkspace } from 'vitest/config'; export default defineWorkspace([{ test: { name: 'unit', exclude: ['dist/**'] } }]);",
                    filename: "vitest.workspace.ts",
                },
                {
                    code: "import { defineConfig } from 'vitest/config'; export default defineConfig({ test: { exclude: [] } });",
                    filename: "vitest.config.ts",
                },
            ],
        }
    );

    it("exposes rule metadata", () => {
        expect(noEmptyVitestProjectExcludeRule.meta.messages).toBeDefined();
    });
});
