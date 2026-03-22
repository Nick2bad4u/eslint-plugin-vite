import { describe, expect, it } from "vitest";

import noEmptyWorkerPluginsRule from "../src/rules/no-empty-worker-plugins.js";
import { createRuleTester } from "./_internal/ruleTester.js";

describe("no-empty-worker-plugins", () => {
    createRuleTester().run(
        "no-empty-worker-plugins",
        noEmptyWorkerPluginsRule,
        {
            invalid: [
                {
                    code: "import { defineConfig } from 'vite'; export default defineConfig({ worker: { plugins: [] } });",
                    errors: [{ messageId: "emptyWorkerPlugins" }],
                    filename: "vite.config.ts",
                },
            ],
            valid: [
                {
                    code: "import { defineConfig } from 'vite'; export default defineConfig({ worker: { plugins: [() => ({ name: 'worker-plugin' })] } });",
                    filename: "vite.config.ts",
                },
                {
                    code: "export const worker = { plugins: [] };",
                    filename: "src/example.ts",
                },
            ],
        }
    );

    it("exposes rule metadata", () => {
        expect(noEmptyWorkerPluginsRule.meta.messages).toBeDefined();
    });
});
