import { describe, expect, it } from "vitest";

import noVitestGlobalsRule from "../src/rules/no-vitest-globals.js";
import { createRuleTester } from "./_internal/ruleTester.js";

describe("no-vitest-globals", () => {
    createRuleTester().run("no-vitest-globals", noVitestGlobalsRule, {
        invalid: [
            {
                code: "import { defineConfig } from 'vitest/config'; export default defineConfig({ test: { globals: true } });",
                errors: [{ messageId: "vitestGlobals" }],
                filename: "vitest.config.ts",
            },
            {
                code: "import { defineWorkspace } from 'vitest/config'; export default defineWorkspace([{ test: { name: 'unit', globals: true } }]);",
                errors: [{ messageId: "vitestGlobals" }],
                filename: "vitest.workspace.ts",
            },
            {
                code: "import { defineConfig } from 'vite'; export default defineConfig({ test: { projects: [{ test: { name: 'browser', globals: true } }] } });",
                errors: [{ messageId: "vitestGlobals" }],
                filename: "vite.config.ts",
            },
        ],
        valid: [
            {
                code: "import { defineConfig } from 'vitest/config'; export default defineConfig({ test: { globals: false } });",
                filename: "vitest.config.ts",
            },
            {
                code: "import { defineConfig } from 'vite'; export default defineConfig({ test: {} });",
                filename: "vite.config.ts",
            },
            {
                code: "export const test = { globals: true };",
                filename: "src/example.ts",
            },
        ],
    });

    it("exposes rule metadata", () => {
        expect(noVitestGlobalsRule.meta.messages).toBeDefined();
    });
});
