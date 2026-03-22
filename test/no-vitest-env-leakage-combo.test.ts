import { describe, expect, it } from "vitest";

import noVitestEnvLeakageComboRule from "../src/rules/no-vitest-env-leakage-combo.js";
import { createRuleTester } from "./_internal/ruleTester.js";

describe("no-vitest-env-leakage-combo", () => {
    createRuleTester().run(
        "no-vitest-env-leakage-combo",
        noVitestEnvLeakageComboRule,
        {
            invalid: [
                {
                    code: "import { defineConfig } from 'vitest/config'; export default defineConfig({ test: { globals: true, isolate: false, unstubGlobals: false } });",
                    errors: [{ messageId: "envLeakageCombo" }],
                    filename: "vitest.config.ts",
                },
                {
                    code: "import { defineConfig } from 'vitest/config'; export default defineConfig({ test: { globals: true, isolate: false, unstubEnvs: false } });",
                    errors: [{ messageId: "envLeakageCombo" }],
                    filename: "vitest.config.ts",
                },
            ],
            valid: [
                {
                    code: "import { defineConfig } from 'vitest/config'; export default defineConfig({ test: { globals: true, isolate: true, unstubGlobals: false } });",
                    filename: "vitest.config.ts",
                },
                {
                    code: "import { defineConfig } from 'vitest/config'; export default defineConfig({ test: { globals: true, isolate: false, unstubGlobals: true } });",
                    filename: "vitest.config.ts",
                },
                {
                    code: "export const test = { globals: true, isolate: false, unstubGlobals: false };",
                    filename: "src/example.ts",
                },
            ],
        }
    );

    it("exposes rule metadata", () => {
        expect(noVitestEnvLeakageComboRule.meta.messages).toBeDefined();
    });
});
