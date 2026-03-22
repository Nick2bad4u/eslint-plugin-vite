import { describe, expect, it } from "vitest";

import noEmptySsrExternalRule from "../src/rules/no-empty-ssr-external.js";
import { createRuleTester } from "./_internal/ruleTester.js";

describe("no-empty-ssr-external", () => {
    createRuleTester().run("no-empty-ssr-external", noEmptySsrExternalRule, {
        invalid: [
            {
                code: "import { defineConfig } from 'vite'; export default defineConfig({ ssr: { external: [] } });",
                errors: [{ messageId: "emptySsrExternal" }],
                filename: "vite.config.ts",
            },
        ],
        valid: [
            {
                code: "import { defineConfig } from 'vite'; export default defineConfig({ ssr: { external: ['react'] } });",
                filename: "vite.config.ts",
            },
            {
                code: "export const ssr = { external: [] };",
                filename: "src/example.ts",
            },
        ],
    });

    it("exposes rule metadata", () => {
        expect(noEmptySsrExternalRule.meta.messages).toBeDefined();
    });
});
