import { describe, expect, it } from "vitest";

import noVitePressEmptyThemeConfigRule from "../src/rules/no-vitepress-empty-theme-config.js";
import { createRuleTester } from "./_internal/ruleTester.js";

describe("no-vitepress-empty-theme-config", () => {
    createRuleTester().run(
        "no-vitepress-empty-theme-config",
        noVitePressEmptyThemeConfigRule,
        {
            invalid: [
                {
                    code: "import { defineConfig } from 'vitepress'; export default defineConfig({ themeConfig: {} });",
                    errors: [{ messageId: "emptyThemeConfig" }],
                    filename: ".vitepress/config.ts",
                },
            ],
            valid: [
                {
                    code: "import { defineConfig } from 'vitepress'; export default defineConfig({ themeConfig: { nav: [] } });",
                    filename: ".vitepress/config.ts",
                },
                {
                    code: "export default { themeConfig: {} };",
                    filename: "vite.config.ts",
                },
            ],
        }
    );

    it("exposes rule metadata", () => {
        expect.hasAssertions();
        expect(noVitePressEmptyThemeConfigRule.meta.messages).toBeDefined();
    });
});
