import { describe, expect, it } from "vitest";

import requireInlineProjectNameRule from "../src/rules/require-inline-project-name.js";
import { createRuleTester } from "./_internal/ruleTester.js";

describe("require-inline-project-name", () => {
    createRuleTester().run(
        "require-inline-project-name",
        requireInlineProjectNameRule,
        {
            invalid: [
                {
                    code: "import { defineWorkspace } from 'vitest/config'; export default defineWorkspace([{ test: { environment: 'node' } }]);",
                    errors: [{ messageId: "requireInlineProjectName" }],
                    filename: "vitest.workspace.ts",
                },
                {
                    code: "import { defineConfig, defineProject } from 'vitest/config'; export default defineConfig({ test: { projects: [defineProject({ test: { include: ['tests/**/*.unit.test.ts'] } })] } });",
                    errors: [{ messageId: "requireInlineProjectName" }],
                    filename: "vitest.config.ts",
                },
                {
                    code: "import { defineConfig } from 'vite'; export default defineConfig({ test: { projects: [{ test: { environment: 'happy-dom' } }] } });",
                    errors: [{ messageId: "requireInlineProjectName" }],
                    filename: "vite.config.ts",
                },
            ],
            valid: [
                {
                    code: "import { defineWorkspace } from 'vitest/config'; export default defineWorkspace([{ test: { environment: 'node', name: 'unit' } }]);",
                    filename: "vitest.workspace.ts",
                },
                {
                    code: "import { defineConfig } from 'vitest/config'; export default defineConfig({ test: { projects: [{ test: { include: ['tests/**/*.browser.test.ts'], name: { label: 'browser', color: 'green' } } }, 'packages/*'] } });",
                    filename: "vitest.config.ts",
                },
                {
                    code: "import { defineProject, defineWorkspace } from 'vitest/config'; export default defineWorkspace([defineProject({ test: { name: 'browser' } })]);",
                    filename: "vitest.workspace.ts",
                },
            ],
        }
    );

    it("exposes rule metadata", () => {
        expect.hasAssertions();
        expect(requireInlineProjectNameRule.meta.messages).toBeDefined();
    });
});
