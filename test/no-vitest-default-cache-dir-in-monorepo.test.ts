import { describe, expect, it } from "vitest";

import noVitestDefaultCacheDirInMonorepoRule from "../src/rules/no-vitest-default-cache-dir-in-monorepo.js";
import { createRuleTester } from "./_internal/ruleTester.js";

describe("no-vitest-default-cache-dir-in-monorepo", () => {
    createRuleTester().run(
        "no-vitest-default-cache-dir-in-monorepo",
        noVitestDefaultCacheDirInMonorepoRule,
        {
            invalid: [
                {
                    code: "export default { test: { environment: 'node' } };",
                    errors: [{ messageId: "missingCacheDirInMonorepo" }],
                    filename: "packages/app/vitest.config.ts",
                },
                {
                    code: "export default { test: { cacheDir: 'node_modules/.vitest' } };",
                    errors: [{ messageId: "defaultCacheDirInMonorepo" }],
                    filename: "packages/app/vitest.config.ts",
                },
                {
                    code: "export default ['packages/*/vitest.config.ts'];",
                    errors: [{ messageId: "missingCacheDirInMonorepo" }],
                    filename: "vitest.workspace.ts",
                },
            ],
            valid: [
                {
                    code: "export default { test: { cacheDir: '.cache/vitest/app' } };",
                    filename: "packages/app/vitest.config.ts",
                },
                {
                    code: "export default { test: { cacheDir: process.env.VITEST_CACHE_DIR } };",
                    filename: "packages/app/vitest.config.ts",
                },
                {
                    code: "export default { test: { environment: 'node' } };",
                    filename: "vitest.config.ts",
                },
            ],
        }
    );

    it("exposes rule metadata", () => {
        expect.hasAssertions();
        expect(
            noVitestDefaultCacheDirInMonorepoRule.meta.messages
        ).toBeDefined();
    });
});
