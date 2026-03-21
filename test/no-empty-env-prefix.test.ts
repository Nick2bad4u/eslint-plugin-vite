import { expect, test } from "vitest";

import rule from "../src/rules/no-empty-env-prefix.js";
import { createRuleTester } from "./_internal/ruleTester.js";

createRuleTester().run("no-empty-env-prefix", rule, {
    invalid: [
        {
            code: "import { defineConfig } from 'vite'; export default defineConfig({ envPrefix: '' });",
            errors: [{ messageId: "emptyEnvPrefix" }],
            filename: "vite.config.ts",
        },
        {
            code: "import { defineConfig } from 'vite'; export default defineConfig({ envPrefix: ['VITE_', ''] });",
            errors: [{ messageId: "emptyEnvPrefix" }],
            filename: "vite.config.ts",
        },
    ],
    valid: [
        {
            code: "import { defineConfig } from 'vite'; export default defineConfig({ envPrefix: 'VITE_' });",
            filename: "vite.config.ts",
        },
    ],
});

test("exposes rule metadata", () => {
    expect(rule.meta.messages).toBeDefined();
});
