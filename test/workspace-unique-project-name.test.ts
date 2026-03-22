import { describe, expect, it } from "vitest";

import workspaceUniqueProjectNameRule from "../src/rules/workspace-unique-project-name.js";
import { createRuleTester } from "./_internal/ruleTester.js";

describe("workspace-unique-project-name", () => {
    createRuleTester().run(
        "workspace-unique-project-name",
        workspaceUniqueProjectNameRule,
        {
            invalid: [
                {
                    code: "import { defineWorkspace } from 'vitest/config'; export default defineWorkspace([{ test: { name: 'unit' } }, { test: { name: 'unit' } }]);",
                    errors: [{ messageId: "duplicateProjectName" }],
                    filename: "vitest.workspace.ts",
                },
                {
                    code: "import { defineConfig } from 'vitest/config'; export default defineConfig({ test: { projects: [{ test: { name: { label: 'browser', color: 'green' } } }, { test: { name: { label: 'browser', color: 'blue' } } }] } });",
                    errors: [{ messageId: "duplicateProjectName" }],
                    filename: "vitest.config.ts",
                },
            ],
            valid: [
                {
                    code: "import { defineWorkspace } from 'vitest/config'; export default defineWorkspace([{ test: { name: 'unit' } }, { test: { name: 'browser' } }]);",
                    filename: "vitest.workspace.ts",
                },
                {
                    code: "import { defineConfig } from 'vite'; export default defineConfig({ test: { projects: [{ test: { name: 'node' } }, { test: { name: { label: 'browser', color: 'green' } } }] } });",
                    filename: "vite.config.ts",
                },
            ],
        }
    );

    it("exposes rule metadata", () => {
        expect(workspaceUniqueProjectNameRule.meta.messages).toBeDefined();
    });
});
