import { expect, test } from "vitest";

import rule from "../src/rules/workspace-unique-project-name.js";
import { createRuleTester } from "./_internal/ruleTester.js";

createRuleTester().run("workspace-unique-project-name", rule, {
    invalid: [
        {
            code: "import { defineWorkspace } from 'vitest/config'; export default defineWorkspace([{ name: 'unit' }, { name: 'unit' }]);",
            errors: [{ messageId: "duplicateProjectName" }],
            filename: "vitest.workspace.ts",
        },
        {
            code: "import { defineProject, defineWorkspace } from 'vitest/config'; export default defineWorkspace([defineProject({ name: 'browser' }), defineProject({ name: 'browser' })]);",
            errors: [{ messageId: "duplicateProjectName" }],
            filename: "vitest.workspace.ts",
        },
    ],
    valid: [
        {
            code: "import { defineWorkspace } from 'vitest/config'; export default defineWorkspace([{ name: 'unit' }, { name: 'browser' }]);",
            filename: "vitest.workspace.ts",
        },
    ],
});

test("exposes rule metadata", () => {
    expect(rule.meta.messages).toBeDefined();
});
