import { describe, expect, it } from "vitest";

import preferDefineProjectRule from "../src/rules/prefer-define-project.js";
import { createRuleTester } from "./_internal/ruleTester.js";

describe("prefer-define-project", () => {
    createRuleTester().run("prefer-define-project", preferDefineProjectRule, {
        invalid: [
            {
                code: "import { defineConfig, defineWorkspace } from 'vitest/config'; export default defineWorkspace([defineConfig({ test: { name: 'browser' } })]);",
                errors: [{ messageId: "preferDefineProject" }],
                filename: "vitest.workspace.ts",
            },
            {
                code: "import { defineConfig } from 'vitest/config'; export default defineConfig({ test: { projects: [defineConfig({ test: { name: 'browser' } })] } });",
                errors: [{ messageId: "preferDefineProject" }],
                filename: "vitest.config.ts",
            },
        ],
        valid: [
            {
                code: "import { defineProject, defineWorkspace } from 'vitest/config'; export default defineWorkspace([defineProject({ test: { name: 'browser' } })]);",
                filename: "vitest.workspace.ts",
            },
            {
                code: "import { defineConfig, defineProject } from 'vitest/config'; export default defineConfig({ test: { projects: [defineProject({ test: { name: 'browser' } })] } });",
                filename: "vitest.config.ts",
            },
        ],
    });

    it("exposes rule metadata", () => {
        expect(preferDefineProjectRule.meta.messages).toBeDefined();
    });
});
