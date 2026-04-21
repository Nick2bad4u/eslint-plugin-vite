import { describe, expect, it } from "vitest";

import noVitestUiInConfigRule from "../src/rules/no-vitest-ui-in-config.js";
import { createRuleTester } from "./_internal/ruleTester.js";

describe("no-vitest-ui-in-config", () => {
    createRuleTester().run("no-vitest-ui-in-config", noVitestUiInConfigRule, {
        invalid: [
            {
                code: "import { defineConfig } from 'vitest/config'; export default defineConfig({ test: { ui: true } });",
                errors: [{ messageId: "uiInConfig" }],
                filename: "vitest.config.ts",
            },
        ],
        valid: [
            {
                code: "import { defineConfig } from 'vitest/config'; export default defineConfig({ test: { ui: false } });",
                filename: "vitest.config.ts",
            },
            {
                code: "export const test = { ui: true };",
                filename: "src/example.ts",
            },
        ],
    });

    it("exposes rule metadata", () => {
        expect.hasAssertions();
        expect(noVitestUiInConfigRule.meta.messages).toBeDefined();
    });
});
