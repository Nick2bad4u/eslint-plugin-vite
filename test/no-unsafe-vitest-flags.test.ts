import { describe, expect, it } from "vitest";

import noUnsafeVitestFlagsRule from "../src/rules/no-unsafe-vitest-flags.js";
import { createRuleTester } from "./_internal/ruleTester.js";

describe("no-unsafe-vitest-flags", () => {
    createRuleTester().run("no-unsafe-vitest-flags", noUnsafeVitestFlagsRule, {
        invalid: [
            {
                code: "import { defineConfig } from 'vitest/config'; export default defineConfig({ test: { allowOnly: true } });",
                errors: [{ messageId: "unsafeVitestFlag" }],
                filename: "vitest.config.ts",
            },
            {
                code: "import { defineConfig } from 'vite'; export default defineConfig({ test: { dangerouslyIgnoreUnhandledErrors: true } });",
                errors: [{ messageId: "unsafeVitestFlag" }],
                filename: "vite.config.ts",
            },
            {
                code: "import { defineWorkspace } from 'vitest/config'; export default defineWorkspace([{ test: { name: 'browser', allowOnly: true } }]);",
                errors: [{ messageId: "unsafeVitestFlag" }],
                filename: "vitest.workspace.ts",
            },
        ],
        valid: [
            {
                code: "import { defineConfig } from 'vitest/config'; export default defineConfig({ test: { allowOnly: false, dangerouslyIgnoreUnhandledErrors: false } });",
                filename: "vitest.config.ts",
            },
            {
                code: "export const vitestSettings = { test: { allowOnly: true } };",
                filename: "src/example.ts",
            },
        ],
    });

    it("exposes rule metadata", () => {
        expect(noUnsafeVitestFlagsRule.meta.messages).toBeDefined();
    });
});
