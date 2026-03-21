import { expect, test } from "vitest";

import rule from "../src/rules/no-relative-resolve-alias.js";
import { createRuleTester } from "./_internal/ruleTester.js";

createRuleTester().run("no-relative-resolve-alias", rule, {
    invalid: [
        {
            code: "import { defineConfig } from 'vite'; export default defineConfig({ resolve: { alias: { '@': './src' } } });",
            errors: [{ messageId: "relativeAliasReplacement" }],
            filename: "vite.config.ts",
        },
        {
            code: "import { defineConfig } from 'vite'; export default defineConfig({ resolve: { alias: [{ find: '@', replacement: '../shared' }] } });",
            errors: [{ messageId: "relativeAliasReplacement" }],
            filename: "vite.config.ts",
        },
    ],
    valid: [
        {
            code: "import path from 'node:path'; import { defineConfig } from 'vite'; export default defineConfig({ resolve: { alias: { '@': path.resolve(import.meta.dirname, 'src') } } });",
            filename: "vite.config.ts",
        },
    ],
});

test("exposes rule metadata", () => {
    expect(rule.meta.messages).toBeDefined();
});
