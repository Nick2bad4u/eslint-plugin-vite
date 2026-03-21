import { expect, test } from "vitest";

import rule from "../src/rules/prefer-define-project.js";
import { createRuleTester } from "./_internal/ruleTester.js";

createRuleTester().run("prefer-define-project", rule, {
    invalid: [
        {
            code: "import { defineConfig, defineWorkspace } from 'vitest/config'; export default defineWorkspace([defineConfig({ test: { name: 'browser' } })]);",
            errors: [{ messageId: "preferDefineProject" }],
            filename: "vitest.workspace.ts",
        },
    ],
    valid: [
        {
            code: "import { defineProject, defineWorkspace } from 'vitest/config'; export default defineWorkspace([defineProject({ test: { name: 'browser' } })]);",
            filename: "vitest.workspace.ts",
        },
    ],
});

test("exposes rule metadata", () => {
    expect(rule.meta.messages).toBeDefined();
});
