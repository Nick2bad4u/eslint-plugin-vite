import { describe, expect, it } from "vitest";

import noEmptyVitestProjectsRule from "../src/rules/no-empty-vitest-projects.js";
import { createRuleTester } from "./_internal/ruleTester.js";

describe("no-empty-vitest-projects", () => {
    createRuleTester().run(
        "no-empty-vitest-projects",
        noEmptyVitestProjectsRule,
        {
            invalid: [
                {
                    code: "import { defineWorkspace } from 'vitest/config'; export default defineWorkspace([]);",
                    errors: [{ messageId: "emptyProjects" }],
                    filename: "vitest.workspace.ts",
                },
                {
                    code: "import { defineConfig } from 'vitest/config'; export default defineConfig({ test: { projects: [] } });",
                    errors: [{ messageId: "emptyProjects" }],
                    filename: "vitest.config.ts",
                },
            ],
            valid: [
                {
                    code: "import { defineWorkspace } from 'vitest/config'; export default defineWorkspace([{ test: { name: 'unit' } }]);",
                    filename: "vitest.workspace.ts",
                },
                {
                    code: "import { defineConfig } from 'vitest/config'; export default defineConfig({ test: { projects: [{ test: { name: 'browser' } }] } });",
                    filename: "vitest.config.ts",
                },
                {
                    code: "export const projects = [];",
                    filename: "src/example.ts",
                },
            ],
        }
    );

    it("exposes rule metadata", () => {
        expect(noEmptyVitestProjectsRule.meta.messages).toBeDefined();
    });
});
