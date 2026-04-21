import { describe, expect, it } from "vitest";

import noDeprecatedConfigOptionsRule from "../src/rules/no-deprecated-config-options.js";
import { createRuleTester } from "./_internal/ruleTester.js";

describe("no-deprecated-config-options", () => {
    createRuleTester().run(
        "no-deprecated-config-options",
        noDeprecatedConfigOptionsRule,
        {
            invalid: [
                {
                    code: "import { defineConfig } from 'vite'; export default defineConfig({ esbuild: { jsx: { runtime: 'classic' } } });",
                    errors: [{ messageId: "deprecatedConfigOption" }],
                    filename: "vite.config.ts",
                },
                {
                    code: "import { defineConfig } from 'vite'; export default defineConfig({ build: { polyfillModulePreload: false } });",
                    errors: [{ messageId: "deprecatedConfigOption" }],
                    filename: "vite.config.ts",
                },
                {
                    code: "import { defineConfig } from 'vite'; export default defineConfig({ build: { rollupOptions: { input: 'index.html' } } });",
                    errors: [{ messageId: "deprecatedConfigOption" }],
                    filename: "vite.config.ts",
                },
                {
                    code: "import { defineConfig } from 'vite'; export default defineConfig({ build: { minify: 'esbuild' } });",
                    errors: [{ messageId: "deprecatedConfigOption" }],
                    filename: "vite.config.ts",
                },
                {
                    code: "import { defineConfig } from 'vite'; export default defineConfig({ optimizeDeps: { disabled: true, esbuildOptions: { target: 'es2020' } } });",
                    errors: [
                        { messageId: "deprecatedConfigOption" },
                        { messageId: "deprecatedConfigOption" },
                    ],
                    filename: "vite.config.ts",
                },
                {
                    code: "import { defineConfig } from 'vite'; export default defineConfig({ worker: { rollupOptions: { output: { sourcemap: true } } } });",
                    errors: [{ messageId: "deprecatedConfigOption" }],
                    filename: "vite.config.ts",
                },
            ],
            valid: [
                {
                    code: "import { defineConfig } from 'vite'; export default defineConfig({ oxc: { jsx: { runtime: 'classic' } }, build: { modulePreload: { polyfill: false }, rolldownOptions: { input: 'index.html' }, minify: 'oxc' }, optimizeDeps: { noDiscovery: true, include: ['cjs-only-dep'], rolldownOptions: { platform: 'browser' } }, worker: { rolldownOptions: { output: { sourcemap: true } } } });",
                    filename: "vite.config.ts",
                },
                {
                    code: "export const example = { build: { minify: 'esbuild' } };",
                    filename: "src/example.ts",
                },
            ],
        }
    );

    it("exposes rule metadata", () => {
        expect.hasAssertions();
        expect(noDeprecatedConfigOptionsRule.meta.messages).toBeDefined();
    });
});
