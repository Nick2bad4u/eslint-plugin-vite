import { describe, expect, it } from "vitest";

import configRequireDefineConfigRule from "../src/rules/config-require-define-config.js";
import { createRuleTester } from "./_internal/ruleTester.js";

describe("config-require-define-config", () => {
    createRuleTester().run(
        "config-require-define-config",
        configRequireDefineConfigRule,
        {
            invalid: [
                {
                    code: "export default { server: { port: 5173 } };",
                    errors: [{ messageId: "requireDefineConfig" }],
                    filename: "vite.config.ts",
                },
                {
                    code: "export default [{ test: { name: 'unit' } }];",
                    errors: [{ messageId: "requireDefineWorkspace" }],
                    filename: "vitest.workspace.ts",
                },
            ],
            valid: [
                {
                    code: "import { defineConfig } from 'vite'; export default defineConfig({});",
                    filename: "vite.config.ts",
                },
                {
                    code: "import { mergeConfig } from 'vitest/config'; export default mergeConfig({}, {});",
                    filename: "vitest.config.ts",
                },
                {
                    code: "import { defineWorkspace } from 'vitest/config'; export default defineWorkspace([]);",
                    filename: "vitest.workspace.ts",
                },
            ],
        }
    );

    it("exposes rule metadata", () => {
        expect(configRequireDefineConfigRule.meta.messages).toBeDefined();
    });
});
