import { describe, expect, it } from "vitest";

import requireVitestEnvironmentMatchGlobsRule from "../src/rules/require-vitest-environment-match-globs.js";
import { createRuleTester } from "./_internal/ruleTester.js";

describe("require-vitest-environment-match-globs", () => {
    createRuleTester().run(
        "require-vitest-environment-match-globs",
        requireVitestEnvironmentMatchGlobsRule,
        {
            invalid: [
                {
                    code: "import { defineConfig, defineProject } from 'vitest/config'; export default defineConfig({ test: { projects: [defineProject({ test: { environment: 'node' } }), defineProject({ test: { environment: 'jsdom' } })] } });",
                    errors: [{ messageId: "missingEnvironmentMatchGlobs" }],
                    filename: "vitest.config.ts",
                },
            ],
            valid: [
                {
                    code: "import { defineConfig, defineProject } from 'vitest/config'; export default defineConfig({ test: { projects: [defineProject({ test: { environment: 'node' } }), defineProject({ test: { environment: 'jsdom' } })], environmentMatchGlobs: [['**/*.dom.test.ts', 'jsdom']] } });",
                    filename: "vitest.config.ts",
                },
                {
                    code: "import { defineConfig } from 'vitest/config'; export default defineConfig({ test: { environment: 'node' } });",
                    filename: "vitest.config.ts",
                },
                {
                    code: "export const test = { environment: 'node' };",
                    filename: "src/example.ts",
                },
            ],
        }
    );

    it("exposes rule metadata", () => {
        expect.hasAssertions();
        expect(
            requireVitestEnvironmentMatchGlobsRule.meta.messages
        ).toBeDefined();
    });
});
