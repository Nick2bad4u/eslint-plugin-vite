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
                {
                    code: "export default { title: 'Docs' };",
                    errors: [{ messageId: "requireDefineConfig" }],
                    filename: ".vitepress/config.ts",
                },
                {
                    code: "const config = { server: { port: 5173 } }; export default config;",
                    errors: [{ messageId: "requireDefineConfig" }],
                    filename: "vite.config.ts",
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
                {
                    code: "import { defineConfig } from 'vitepress'; export default defineConfig({ title: 'Docs' });",
                    filename: ".vitepress/config.ts",
                },
                {
                    code: "import { defineConfig } from 'vitest/config'; const vitestConfig: ReturnType<typeof defineConfig> = defineConfig({}); export default vitestConfig;",
                    filename: "vite.config.ts",
                },
                {
                    code: "import { mergeConfig } from 'vitest/config'; const base = mergeConfig({}, {}); export default base;",
                    filename: "vitest.config.ts",
                },
                {
                    code: "import { defineWorkspace } from 'vitest/config'; const workspace = defineWorkspace([]); export default workspace;",
                    filename: "vitest.workspace.ts",
                },
            ],
        }
    );

    it("exposes rule metadata", () => {
        expect.hasAssertions();
        expect(configRequireDefineConfigRule.meta.messages).toBeDefined();
    });
});
