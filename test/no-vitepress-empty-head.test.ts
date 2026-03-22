import { describe, expect, it } from "vitest";

import noVitePressEmptyHeadRule from "../src/rules/no-vitepress-empty-head.js";
import { createRuleTester } from "./_internal/ruleTester.js";

describe("no-vitepress-empty-head", () => {
    createRuleTester().run(
        "no-vitepress-empty-head",
        noVitePressEmptyHeadRule,
        {
            invalid: [
                {
                    code: "import { defineConfig } from 'vitepress'; export default defineConfig({ head: [] });",
                    errors: [{ messageId: "emptyHead" }],
                    filename: ".vitepress/config.ts",
                },
            ],
            valid: [
                {
                    code: "import { defineConfig } from 'vitepress'; export default defineConfig({ head: [['meta', { name: 'description', content: 'site' }]] });",
                    filename: ".vitepress/config.ts",
                },
                {
                    code: "export default { head: [] };",
                    filename: "vite.config.ts",
                },
            ],
        }
    );

    it("exposes rule metadata", () => {
        expect(noVitePressEmptyHeadRule.meta.messages).toBeDefined();
    });
});
