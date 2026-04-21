import { describe, expect, it } from "vitest";

import requireVitePressCleanUrlsExplicitRule from "../src/rules/require-vitepress-clean-urls-explicit.js";
import { createRuleTester } from "./_internal/ruleTester.js";

describe("require-vitepress-clean-urls-explicit", () => {
    createRuleTester().run(
        "require-vitepress-clean-urls-explicit",
        requireVitePressCleanUrlsExplicitRule,
        {
            invalid: [
                {
                    code: "import { defineConfig } from 'vitepress'; export default defineConfig({ title: 'Docs' });",
                    errors: [{ messageId: "missingCleanUrls" }],
                    filename: ".vitepress/config.ts",
                },
            ],
            valid: [
                {
                    code: "import { defineConfig } from 'vitepress'; export default defineConfig({ cleanUrls: true });",
                    filename: ".vitepress/config.ts",
                },
                {
                    code: "import { defineConfig } from 'vitepress'; export default defineConfig({ cleanUrls: false });",
                    filename: ".vitepress/config.ts",
                },
                {
                    code: "export default { title: 'x' };",
                    filename: "vite.config.ts",
                },
            ],
        }
    );

    it("exposes rule metadata", () => {
        expect.hasAssertions();
        expect(
            requireVitePressCleanUrlsExplicitRule.meta.messages
        ).toBeDefined();
    });
});
