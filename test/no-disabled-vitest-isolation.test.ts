import { describe, expect, it } from "vitest";

import noDisabledVitestIsolationRule from "../src/rules/no-disabled-vitest-isolation.js";
import { createRuleTester } from "./_internal/ruleTester.js";

describe("no-disabled-vitest-isolation", () => {
    createRuleTester().run(
        "no-disabled-vitest-isolation",
        noDisabledVitestIsolationRule,
        {
            invalid: [
                {
                    code: "import { defineConfig } from 'vitest/config'; export default defineConfig({ test: { isolate: false } });",
                    errors: [{ messageId: "disabledIsolation" }],
                    filename: "vitest.config.ts",
                },
                {
                    code: "import { defineWorkspace } from 'vitest/config'; export default defineWorkspace([{ test: { name: 'unit', isolate: false } }]);",
                    errors: [{ messageId: "disabledIsolation" }],
                    filename: "vitest.workspace.ts",
                },
                {
                    code: "import { defineConfig } from 'vite'; export default defineConfig({ test: { projects: [{ test: { name: 'browser', isolate: false } }] } });",
                    errors: [{ messageId: "disabledIsolation" }],
                    filename: "vite.config.ts",
                },
            ],
            valid: [
                {
                    code: "import { defineConfig } from 'vitest/config'; export default defineConfig({ test: { isolate: true } });",
                    filename: "vitest.config.ts",
                },
                {
                    code: "import { defineConfig } from 'vite'; export default defineConfig({ test: {} });",
                    filename: "vite.config.ts",
                },
                {
                    code: "export const options = { test: { isolate: false } };",
                    filename: "src/example.ts",
                },
            ],
        }
    );

    it("exposes rule metadata", () => {
        expect.hasAssertions();
        expect(noDisabledVitestIsolationRule.meta.messages).toBeDefined();
    });
});
