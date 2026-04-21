import { describe, expect, it } from "vitest";

import requireVitestTypecheckTsconfigRule from "../src/rules/require-vitest-typecheck-tsconfig.js";
import { createRuleTester } from "./_internal/ruleTester.js";

describe("require-vitest-typecheck-tsconfig", () => {
    createRuleTester().run(
        "require-vitest-typecheck-tsconfig",
        requireVitestTypecheckTsconfigRule,
        {
            invalid: [
                {
                    code: "import { defineConfig } from 'vitest/config'; export default defineConfig({ test: { typecheck: { enabled: true } } });",
                    errors: [{ messageId: "missingTypecheckTsconfig" }],
                    filename: "vitest.config.ts",
                },
                {
                    code: "import { defineConfig } from 'vitest/config'; export default defineConfig({ test: { typecheck: { only: true } } });",
                    errors: [{ messageId: "missingTypecheckTsconfig" }],
                    filename: "vitest.config.ts",
                },
                {
                    code: "import { defineConfig } from 'vite'; const pathValue = './tsconfig.json'; export default defineConfig({ test: { typecheck: { enabled: true, tsconfig: pathValue } } });",
                    errors: [{ messageId: "invalidTypecheckTsconfig" }],
                    filename: "vite.config.ts",
                },
                {
                    code: "import { defineWorkspace } from 'vitest/config'; export default defineWorkspace([{ test: { name: 'unit', typecheck: { enabled: true, tsconfig: '' } } }]);",
                    errors: [{ messageId: "invalidTypecheckTsconfig" }],
                    filename: "vitest.workspace.ts",
                },
            ],
            valid: [
                {
                    code: "import { defineConfig } from 'vitest/config'; export default defineConfig({ test: { typecheck: { enabled: true, tsconfig: './tsconfig.vitest-typecheck.json' } } });",
                    filename: "vitest.config.ts",
                },
                {
                    code: "import { defineConfig } from 'vitest/config'; export default defineConfig({ test: { typecheck: { only: true, tsconfig: `./tsconfig.vitest-typecheck.json` } } });",
                    filename: "vitest.config.ts",
                },
                {
                    code: "import { defineConfig } from 'vite'; export default defineConfig({ test: { typecheck: { enabled: false } } });",
                    filename: "vite.config.ts",
                },
                {
                    code: "export const test = { typecheck: { enabled: true } };",
                    filename: "src/example.ts",
                },
            ],
        }
    );

    it("exposes rule metadata", () => {
        expect.hasAssertions();
        expect(requireVitestTypecheckTsconfigRule.meta.messages).toBeDefined();
    });
});
