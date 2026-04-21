import { describe, expect, it } from "vitest";

import noDisabledVitestTypecheckRule from "../src/rules/no-disabled-vitest-typecheck.js";
import { createRuleTester } from "./_internal/ruleTester.js";

describe("no-disabled-vitest-typecheck", () => {
    createRuleTester().run(
        "no-disabled-vitest-typecheck",
        noDisabledVitestTypecheckRule,
        {
            invalid: [
                {
                    code: "import { defineConfig } from 'vitest/config'; export default defineConfig({ test: { typecheck: { enabled: false } } });",
                    errors: [{ messageId: "unsafeTypecheckOption" }],
                    filename: "vitest.config.ts",
                },
                {
                    code: "import { defineConfig } from 'vitest/config'; export default defineConfig({ test: { typecheck: { ignoreSourceErrors: true } } });",
                    errors: [{ messageId: "unsafeTypecheckOption" }],
                    filename: "vitest.config.ts",
                },
                {
                    code: "import { defineConfig } from 'vite'; export default defineConfig({ test: { projects: [{ test: { name: 'browser', typecheck: { enabled: false } } }] } });",
                    errors: [{ messageId: "unsafeTypecheckOption" }],
                    filename: "vite.config.ts",
                },
                {
                    code: "import { defineWorkspace } from 'vitest/config'; export default defineWorkspace([{ test: { name: 'node', typecheck: { ignoreSourceErrors: true } } }]);",
                    errors: [{ messageId: "unsafeTypecheckOption" }],
                    filename: "vitest.workspace.ts",
                },
            ],
            valid: [
                {
                    code: "import { defineConfig } from 'vitest/config'; export default defineConfig({ test: { typecheck: { enabled: true, ignoreSourceErrors: false } } });",
                    filename: "vitest.config.ts",
                },
                {
                    code: "import { defineConfig } from 'vite'; export default defineConfig({ test: { projects: [{ test: { name: 'unit' } }] } });",
                    filename: "vite.config.ts",
                },
                {
                    code: "export const test = { typecheck: { enabled: false, ignoreSourceErrors: true } };",
                    filename: "src/example.ts",
                },
            ],
        }
    );

    it("exposes rule metadata", () => {
        expect.hasAssertions();
        expect(noDisabledVitestTypecheckRule.meta.messages).toBeDefined();
    });
});
