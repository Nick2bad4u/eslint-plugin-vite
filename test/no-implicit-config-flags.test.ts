import { describe, expect, it } from "vitest";

import noImplicitConfigFlagsRule from "../src/rules/no-implicit-config-flags.js";
import { createRuleTester } from "./_internal/ruleTester.js";

describe("no-implicit-config-flags", () => {
    createRuleTester().run(
        "no-implicit-config-flags",
        noImplicitConfigFlagsRule,
        {
            invalid: [
                {
                    code: "import { defineConfig } from 'vite'; export default defineConfig(({ isPreview }) => { if (isPreview) { return { preview: { open: true } }; } return {}; });",
                    errors: [{ messageId: "implicitConfigFlag" }],
                    filename: "vite.config.ts",
                },
                {
                    code: "export default ({ isSsrBuild }) => (!isSsrBuild ? { build: { sourcemap: true } } : { build: { ssr: 'src/entry-server.ts' } });",
                    errors: [{ messageId: "implicitConfigFlag" }],
                    filename: "vite.config.ts",
                },
                {
                    code: "import { defineConfig } from 'vite'; export default defineConfig(({ isPreview: previewMode }) => previewMode ? { preview: { open: true } } : {});",
                    errors: [
                        {
                            data: {
                                flagName: "isPreview",
                                localName: "previewMode",
                            },
                            messageId: "implicitConfigFlag",
                        },
                    ],
                    filename: "vite.config.ts",
                },
                {
                    code: "import { defineConfig } from 'vite'; export default defineConfig(({ isPreview }) => { if (process.env.CI === 'true' || isPreview) { return { preview: { open: false } }; } return {}; });",
                    errors: [{ messageId: "implicitConfigFlag" }],
                    filename: "vite.config.ts",
                },
            ],
            valid: [
                {
                    code: "import { defineConfig } from 'vite'; export default defineConfig(({ isPreview }) => isPreview === true ? { preview: { open: true } } : {});",
                    filename: "vite.config.ts",
                },
                {
                    code: "export default ({ isSsrBuild }) => isSsrBuild === false ? { build: { sourcemap: true } } : { build: { ssr: 'src/entry-server.ts' } };",
                    filename: "vite.config.ts",
                },
                {
                    code: "import { defineConfig } from 'vite'; export default defineConfig(({ isPreview }) => { function choosePreviewState(isPreview: boolean) { return isPreview ? 'on' : 'off'; } return { define: { __PREVIEW__: JSON.stringify(choosePreviewState(false)) } }; });",
                    filename: "vite.config.ts",
                },
                {
                    code: "import { defineConfig } from 'vitest/config'; export default defineConfig(({ mode }) => ({ test: { name: mode } }));",
                    filename: "vitest.config.ts",
                },
            ],
        }
    );

    it("exposes rule metadata", () => {
        expect(noImplicitConfigFlagsRule.meta.messages).toBeDefined();
    });
});
