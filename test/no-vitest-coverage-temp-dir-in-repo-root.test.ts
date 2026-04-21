import { describe, expect, it } from "vitest";

import noVitestCoverageTempDirInRepoRootRule from "../src/rules/no-vitest-coverage-temp-dir-in-repo-root.js";
import { createRuleTester } from "./_internal/ruleTester.js";

describe("no-vitest-coverage-temp-dir-in-repo-root", () => {
    createRuleTester().run(
        "no-vitest-coverage-temp-dir-in-repo-root",
        noVitestCoverageTempDirInRepoRootRule,
        {
            invalid: [
                {
                    code: "import { defineConfig } from 'vitest/config'; export default defineConfig({ test: { coverage: { reportsDirectory: '.' } } });",
                    errors: [{ messageId: "rootReportsDirectory" }],
                    filename: "vitest.config.ts",
                },
                {
                    code: "import { defineConfig } from 'vitest/config'; export default defineConfig({ test: { coverage: { reportsDirectory: './' } } });",
                    errors: [{ messageId: "rootReportsDirectory" }],
                    filename: "vitest.config.ts",
                },
            ],
            valid: [
                {
                    code: "import { defineConfig } from 'vitest/config'; export default defineConfig({ test: { coverage: { reportsDirectory: 'coverage' } } });",
                    filename: "vitest.config.ts",
                },
                {
                    code: "import { defineConfig } from 'vitest/config'; export default defineConfig({ test: { coverage: { reportsDirectory: './coverage' } } });",
                    filename: "vitest.config.ts",
                },
            ],
        }
    );

    it("exposes rule metadata", () => {
        expect.hasAssertions();
        expect(
            noVitestCoverageTempDirInRepoRootRule.meta.messages
        ).toBeDefined();
    });
});
