import { describe, expect, it } from "vitest";

import requireVitestCoverageReportsDirectoryRule from "../src/rules/require-vitest-coverage-reports-directory.js";
import { createRuleTester } from "./_internal/ruleTester.js";

describe("require-vitest-coverage-reports-directory", () => {
    createRuleTester().run(
        "require-vitest-coverage-reports-directory",
        requireVitestCoverageReportsDirectoryRule,
        {
            invalid: [
                {
                    code: "import { defineConfig } from 'vitest/config'; export default defineConfig({ test: { coverage: { enabled: true } } });",
                    errors: [{ messageId: "missingReportsDirectory" }],
                    filename: "vitest.config.ts",
                },
            ],
            valid: [
                {
                    code: "import { defineConfig } from 'vitest/config'; export default defineConfig({ test: { coverage: { enabled: true, reportsDirectory: 'coverage' } } });",
                    filename: "vitest.config.ts",
                },
                {
                    code: "import { defineConfig } from 'vitest/config'; export default defineConfig({ test: { coverage: { enabled: false } } });",
                    filename: "vitest.config.ts",
                },
            ],
        }
    );

    it("exposes rule metadata", () => {
        expect(
            requireVitestCoverageReportsDirectoryRule.meta.messages
        ).toBeDefined();
    });
});
