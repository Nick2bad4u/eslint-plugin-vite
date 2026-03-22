import { describe, expect, it } from "vitest";

import noVitestWatchInConfigRule from "../src/rules/no-vitest-watch-in-config.js";
import { createRuleTester } from "./_internal/ruleTester.js";

describe("no-vitest-watch-in-config", () => {
    createRuleTester().run(
        "no-vitest-watch-in-config",
        noVitestWatchInConfigRule,
        {
            invalid: [
                {
                    code: "import { defineConfig } from 'vitest/config'; export default defineConfig({ test: { watch: true } });",
                    errors: [{ messageId: "watchInConfig" }],
                    filename: "vitest.config.ts",
                },
            ],
            valid: [
                {
                    code: "import { defineConfig } from 'vitest/config'; export default defineConfig({ test: { watch: false } });",
                    filename: "vitest.config.ts",
                },
                {
                    code: "export const test = { watch: true };",
                    filename: "src/example.ts",
                },
            ],
        }
    );

    it("exposes rule metadata", () => {
        expect(noVitestWatchInConfigRule.meta.messages).toBeDefined();
    });
});
