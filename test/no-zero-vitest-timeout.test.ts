import { describe, expect, it } from "vitest";

import noZeroVitestTimeoutRule from "../src/rules/no-zero-vitest-timeout.js";
import { createRuleTester } from "./_internal/ruleTester.js";

describe("no-zero-vitest-timeout", () => {
    createRuleTester().run("no-zero-vitest-timeout", noZeroVitestTimeoutRule, {
        invalid: [
            {
                code: "import { defineConfig } from 'vitest/config'; export default defineConfig({ test: { testTimeout: 0 } });",
                errors: [{ messageId: "zeroTimeout" }],
                filename: "vitest.config.ts",
            },
            {
                code: "import { defineConfig } from 'vite'; export default defineConfig({ test: { hookTimeout: 0 } });",
                errors: [{ messageId: "zeroTimeout" }],
                filename: "vite.config.ts",
            },
            {
                code: "import { defineWorkspace } from 'vitest/config'; export default defineWorkspace([{ test: { name: 'unit', teardownTimeout: 0 } }]);",
                errors: [{ messageId: "zeroTimeout" }],
                filename: "vitest.workspace.ts",
            },
            {
                code: "import { defineConfig } from 'vitest/config'; export default defineConfig({ test: { projects: [{ test: { name: 'browser', testTimeout: 0 } }] } });",
                errors: [{ messageId: "zeroTimeout" }],
                filename: "vitest.config.ts",
            },
        ],
        valid: [
            {
                code: "import { defineConfig } from 'vitest/config'; export default defineConfig({ test: { testTimeout: 5_000, hookTimeout: 10_000, teardownTimeout: 10_000 } });",
                filename: "vitest.config.ts",
            },
            {
                code: "import { defineConfig } from 'vite'; export default defineConfig({ test: { projects: [{ test: { name: 'unit' } }] } });",
                filename: "vite.config.ts",
            },
            {
                code: "export const test = { testTimeout: 0, hookTimeout: 0 };",
                filename: "src/test-options.ts",
            },
        ],
    });

    it("exposes rule metadata", () => {
        expect.hasAssertions();
        expect(noZeroVitestTimeoutRule.meta.messages).toBeDefined();
    });
});
