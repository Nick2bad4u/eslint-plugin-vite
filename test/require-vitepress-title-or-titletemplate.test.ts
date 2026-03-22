import { describe, expect, it } from "vitest";

import requireVitePressTitleOrTitleTemplateRule from "../src/rules/require-vitepress-title-or-titletemplate.js";
import { createRuleTester } from "./_internal/ruleTester.js";

describe("require-vitepress-title-or-titletemplate", () => {
    createRuleTester().run(
        "require-vitepress-title-or-titletemplate",
        requireVitePressTitleOrTitleTemplateRule,
        {
            invalid: [
                {
                    code: "import { defineConfig } from 'vitepress'; export default defineConfig({ description: 'Docs site' });",
                    errors: [{ messageId: "missingTitleMetadata" }],
                    filename: ".vitepress/config.ts",
                },
            ],
            valid: [
                {
                    code: "import { defineConfig } from 'vitepress'; export default defineConfig({ title: 'My Docs' });",
                    filename: ".vitepress/config.ts",
                },
                {
                    code: "import { defineConfig } from 'vitepress'; export default defineConfig({ titleTemplate: ':title | My Docs' });",
                    filename: ".vitepress/config.ts",
                },
                {
                    code: "export default { description: 'x' };",
                    filename: "vite.config.ts",
                },
            ],
        }
    );

    it("exposes rule metadata", () => {
        expect(
            requireVitePressTitleOrTitleTemplateRule.meta.messages
        ).toBeDefined();
    });
});
