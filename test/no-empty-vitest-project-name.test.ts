import { describe, expect, it } from "vitest";

import noEmptyVitestProjectNameRule from "../src/rules/no-empty-vitest-project-name.js";
import { createRuleTester } from "./_internal/ruleTester.js";

describe("no-empty-vitest-project-name", () => {
    createRuleTester().run(
        "no-empty-vitest-project-name",
        noEmptyVitestProjectNameRule,
        {
            invalid: [
                {
                    code: "import { defineWorkspace } from 'vitest/config'; export default defineWorkspace([{ test: { name: '' } }]);",
                    errors: [{ messageId: "emptyProjectName" }],
                    filename: "vitest.workspace.ts",
                },
                {
                    code: "import { defineConfig } from 'vitest/config'; export default defineConfig({ test: { name: '   ' } });",
                    errors: [{ messageId: "emptyProjectName" }],
                    filename: "vitest.config.ts",
                },
                {
                    code: "import { defineConfig } from 'vite'; export default defineConfig({ test: { projects: [{ test: { name: `` } }] } });",
                    errors: [{ messageId: "emptyProjectName" }],
                    filename: "vite.config.ts",
                },
            ],
            valid: [
                {
                    code: "import { defineWorkspace } from 'vitest/config'; export default defineWorkspace([{ test: { name: 'unit' } }]);",
                    filename: "vitest.workspace.ts",
                },
                {
                    code: "import { defineConfig } from 'vitest/config'; export default defineConfig({ test: { name: 'browser' } });",
                    filename: "vitest.config.ts",
                },
                {
                    code: "export const test = { name: '' };",
                    filename: "src/example.ts",
                },
            ],
        }
    );

    it("exposes rule metadata", () => {
        expect.hasAssertions();
        expect(noEmptyVitestProjectNameRule.meta.messages).toBeDefined();
    });
});
