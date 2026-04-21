import { describe, expect, it } from "vitest";

import noUnsupportedProjectOptionsRule from "../src/rules/no-unsupported-project-options.js";
import { createRuleTester } from "./_internal/ruleTester.js";

describe("no-unsupported-project-options", () => {
    createRuleTester().run(
        "no-unsupported-project-options",
        noUnsupportedProjectOptionsRule,
        {
            invalid: [
                {
                    code: "import { defineProject } from 'vitest/config'; export default defineProject({ test: { coverage: { provider: 'v8' }, name: 'unit' } });",
                    errors: [{ messageId: "unsupportedProjectOption" }],
                    filename: "vitest.config.ts",
                },
                {
                    code: "import { defineConfig } from 'vite'; export default defineConfig({ test: { projects: [{ test: { name: 'browser', reporters: ['json'] } }] } });",
                    errors: [{ messageId: "unsupportedProjectOption" }],
                    filename: "vite.config.ts",
                },
                {
                    code: "import { defineConfig, defineWorkspace } from 'vitest/config'; export default defineWorkspace([defineConfig({ test: { name: 'snapshots', resolveSnapshotPath: (testPath) => testPath + '.snap' } })]);",
                    errors: [{ messageId: "unsupportedProjectOption" }],
                    filename: "vitest.workspace.ts",
                },
                {
                    code: "import { defineWorkspace } from 'vitest/config'; export default defineWorkspace([{ test: { name: 'browser', reporters: ['json'] } }]);",
                    errors: [{ messageId: "unsupportedProjectOption" }],
                    filename: "vitest.workspace.ts",
                },
            ],
            valid: [
                {
                    code: "import { defineProject } from 'vitest/config'; export default defineProject({ test: { environment: 'node', name: 'unit' } });",
                    filename: "vitest.config.ts",
                },
                {
                    code: "import { defineConfig } from 'vitest/config'; export default defineConfig({ test: { coverage: { provider: 'v8' }, projects: [{ test: { name: 'browser', environment: 'happy-dom' } }] } });",
                    filename: "vitest.config.ts",
                },
                {
                    code: "import { defineProject } from 'vitest/config'; export default defineProject({ resolve: { alias: { '@': '/src' } }, test: { name: 'browser' } });",
                    filename: "vitest.config.ts",
                },
            ],
        }
    );

    it("exposes rule metadata", () => {
        expect.hasAssertions();
        expect(noUnsupportedProjectOptionsRule.meta.messages).toBeDefined();
    });
});
