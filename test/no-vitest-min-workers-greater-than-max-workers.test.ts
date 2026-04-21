import { describe, expect, it } from "vitest";

import noVitestMinWorkersGreaterThanMaxWorkersRule from "../src/rules/no-vitest-min-workers-greater-than-max-workers.js";
import { createRuleTester } from "./_internal/ruleTester.js";

describe("no-vitest-min-workers-greater-than-max-workers", () => {
    createRuleTester().run(
        "no-vitest-min-workers-greater-than-max-workers",
        noVitestMinWorkersGreaterThanMaxWorkersRule,
        {
            invalid: [
                {
                    code: "import { defineConfig } from 'vitest/config'; export default defineConfig({ test: { minWorkers: 4, maxWorkers: 2 } });",
                    errors: [{ messageId: "minWorkersGreaterThanMaxWorkers" }],
                    filename: "vitest.config.ts",
                },
                {
                    code: "import { defineConfig } from 'vite'; export default defineConfig({ test: { projects: [{ test: { minWorkers: 3, maxWorkers: 1 } }] } });",
                    errors: [{ messageId: "minWorkersGreaterThanMaxWorkers" }],
                    filename: "vite.config.ts",
                },
            ],
            valid: [
                {
                    code: "import { defineConfig } from 'vitest/config'; export default defineConfig({ test: { minWorkers: 2, maxWorkers: 4 } });",
                    filename: "vitest.config.ts",
                },
                {
                    code: "import { defineConfig } from 'vitest/config'; export default defineConfig({ test: { maxWorkers: 2 } });",
                    filename: "vitest.config.ts",
                },
            ],
        }
    );

    it("exposes rule metadata", () => {
        expect.hasAssertions();
        expect(
            noVitestMinWorkersGreaterThanMaxWorkersRule.meta.messages
        ).toBeDefined();
    });
});
