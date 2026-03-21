import { describe, expect, it } from "vitest";

import noUnsafeServerOptionsRule from "../src/rules/no-unsafe-server-options.js";
import { createRuleTester } from "./_internal/ruleTester.js";

describe("no-unsafe-server-options", () => {
    createRuleTester().run(
        "no-unsafe-server-options",
        noUnsafeServerOptionsRule,
        {
            invalid: [
                {
                    code: "import { defineConfig } from 'vite'; export default defineConfig({ server: { allowedHosts: true } });",
                    errors: [{ messageId: "unsafeServerOption" }],
                    filename: "vite.config.ts",
                },
                {
                    code: "import { defineConfig } from 'vite'; export default defineConfig({ preview: { allowedHosts: true } });",
                    errors: [{ messageId: "unsafeServerOption" }],
                    filename: "vite.config.ts",
                },
                {
                    code: "import { defineConfig } from 'vite'; export default defineConfig({ server: { cors: true } });",
                    errors: [{ messageId: "unsafeServerOption" }],
                    filename: "vite.config.ts",
                },
                {
                    code: "import { defineConfig } from 'vite'; export default defineConfig({ preview: { cors: true } });",
                    errors: [{ messageId: "unsafeServerOption" }],
                    filename: "vite.config.ts",
                },
                {
                    code: "import { defineConfig } from 'vite'; export default defineConfig({ server: { fs: { strict: false } } });",
                    errors: [{ messageId: "unsafeServerOption" }],
                    filename: "vite.config.ts",
                },
            ],
            valid: [
                {
                    code: String.raw`import { defineConfig } from 'vite'; export default defineConfig({ server: { allowedHosts: ['app.internal.example.com'], cors: { origin: /^https?:\/\/(localhost|127\.0\.0\.1)(?::\d+)?$/ }, fs: { strict: true, allow: ['..'] } }, preview: { allowedHosts: ['preview.internal.example.com'], cors: { origin: ['https://preview.internal.example.com'] } } });`,
                    filename: "vite.config.ts",
                },
                {
                    code: "export const preview = { allowedHosts: true, cors: true };",
                    filename: "src/example.ts",
                },
            ],
        }
    );

    it("exposes rule metadata", () => {
        expect(noUnsafeServerOptionsRule.meta.messages).toBeDefined();
    });
});
