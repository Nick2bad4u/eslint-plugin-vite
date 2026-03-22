import { describe, expect, it } from "vitest";

import preferVitestRestoreMocksRule from "../src/rules/prefer-vitest-restore-mocks.js";
import { createRuleTester } from "./_internal/ruleTester.js";

describe("prefer-vitest-restore-mocks", () => {
    createRuleTester().run(
        "prefer-vitest-restore-mocks",
        preferVitestRestoreMocksRule,
        {
            invalid: [
                {
                    code: "import { defineConfig } from 'vitest/config'; export default defineConfig({ test: { clearMocks: true } });",
                    errors: [{ messageId: "preferRestoreMocks" }],
                    filename: "vitest.config.ts",
                },
                {
                    code: "import { defineConfig } from 'vitest/config'; export default defineConfig({ test: { resetMocks: true } });",
                    errors: [{ messageId: "preferRestoreMocks" }],
                    filename: "vitest.config.ts",
                },
            ],
            valid: [
                {
                    code: "import { defineConfig } from 'vitest/config'; export default defineConfig({ test: { clearMocks: true, restoreMocks: true } });",
                    filename: "vitest.config.ts",
                },
                {
                    code: "import { defineConfig } from 'vitest/config'; export default defineConfig({ test: { restoreMocks: true } });",
                    filename: "vitest.config.ts",
                },
                {
                    code: "export const test = { clearMocks: true };",
                    filename: "src/example.ts",
                },
            ],
        }
    );

    it("exposes rule metadata", () => {
        expect(preferVitestRestoreMocksRule.meta.messages).toBeDefined();
    });
});
