import { describe, expect, it } from "vitest";

import noEmptySsrNoExternalRule from "../src/rules/no-empty-ssr-noexternal.js";
import { createRuleTester } from "./_internal/ruleTester.js";

describe("no-empty-ssr-noexternal", () => {
    createRuleTester().run(
        "no-empty-ssr-noexternal",
        noEmptySsrNoExternalRule,
        {
            invalid: [
                {
                    code: "import { defineConfig } from 'vite'; export default defineConfig({ ssr: { noExternal: [] } });",
                    errors: [{ messageId: "emptySsrNoExternal" }],
                    filename: "vite.config.ts",
                },
            ],
            valid: [
                {
                    code: "import { defineConfig } from 'vite'; export default defineConfig({ ssr: { noExternal: ['react'] } });",
                    filename: "vite.config.ts",
                },
                {
                    code: "export const ssr = { noExternal: [] };",
                    filename: "src/example.ts",
                },
            ],
        }
    );

    it("exposes rule metadata", () => {
        expect(noEmptySsrNoExternalRule.meta.messages).toBeDefined();
    });
});
