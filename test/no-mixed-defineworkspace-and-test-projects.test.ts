import { describe, expect, it } from "vitest";

import noMixedDefineWorkspaceAndTestProjectsRule from "../src/rules/no-mixed-defineworkspace-and-test-projects.js";
import { createRuleTester } from "./_internal/ruleTester.js";

describe("no-mixed-defineworkspace-and-test-projects", () => {
    createRuleTester().run(
        "no-mixed-defineworkspace-and-test-projects",
        noMixedDefineWorkspaceAndTestProjectsRule,
        {
            invalid: [
                {
                    code: "import { defineWorkspace } from 'vitest/config'; export default defineWorkspace([{ test: { name: 'unit' } }]); export const extra = { test: { projects: [{ test: { name: 'browser' } }] } };",
                    errors: [{ messageId: "mixedWorkspaceAndProjects" }],
                    filename: "vitest.workspace.ts",
                },
                {
                    code: "import { defineWorkspace } from 'vitest/config'; const shared = { test: { projects: [{ test: { name: 'unit' } }] } }; export default defineWorkspace([shared]);",
                    errors: [{ messageId: "mixedWorkspaceAndProjects" }],
                    filename: "vitest.workspace.ts",
                },
            ],
            valid: [
                {
                    code: "import { defineWorkspace } from 'vitest/config'; export default defineWorkspace([{ test: { name: 'unit' } }]);",
                    filename: "vitest.workspace.ts",
                },
                {
                    code: "import { defineConfig } from 'vitest/config'; export default defineConfig({ test: { projects: [{ test: { name: 'unit' } }] } });",
                    filename: "vitest.config.ts",
                },
            ],
        }
    );

    it("exposes rule metadata", () => {
        expect(
            noMixedDefineWorkspaceAndTestProjectsRule.meta.messages
        ).toBeDefined();
    });
});
