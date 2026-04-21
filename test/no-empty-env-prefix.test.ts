import { describe, expect, it } from "vitest";

import noEmptyEnvPrefixRule from "../src/rules/no-empty-env-prefix.js";
import { createRuleTester } from "./_internal/ruleTester.js";

describe("no-empty-env-prefix", () => {
    createRuleTester().run("no-empty-env-prefix", noEmptyEnvPrefixRule, {
        invalid: [
            {
                code: "import { defineConfig } from 'vite'; export default defineConfig({ envPrefix: '' });",
                errors: [{ messageId: "emptyEnvPrefix" }],
                filename: "vite.config.ts",
            },
            {
                code: "import { defineConfig } from 'vite'; export default defineConfig({ envPrefix: ['VITE_', ''] });",
                errors: [{ messageId: "emptyEnvPrefix" }],
                filename: "vite.config.ts",
            },
            {
                code: "import { defineConfig } from 'vitepress'; export default defineConfig({ vite: { envPrefix: '' } });",
                errors: [{ messageId: "emptyEnvPrefix" }],
                filename: ".vitepress/config.ts",
            },
        ],
        valid: [
            {
                code: "import { defineConfig } from 'vite'; export default defineConfig({ envPrefix: 'VITE_' });",
                filename: "vite.config.ts",
            },
        ],
    });

    it("exposes rule metadata", () => {
        expect.hasAssertions();
        expect(noEmptyEnvPrefixRule.meta.messages).toBeDefined();
    });
});
