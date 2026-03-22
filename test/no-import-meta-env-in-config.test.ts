import { describe, expect, it } from "vitest";

import noImportMetaEnvInConfigRule from "../src/rules/no-import-meta-env-in-config.js";
import { createRuleTester } from "./_internal/ruleTester.js";

describe("no-import-meta-env-in-config", () => {
    createRuleTester().run(
        "no-import-meta-env-in-config",
        noImportMetaEnvInConfigRule,
        {
            invalid: [
                {
                    code: "import { defineConfig } from 'vite'; export default defineConfig(() => ({ define: { __MODE__: JSON.stringify(import.meta.env.MODE) } }));",
                    errors: [{ messageId: "noImportMetaEnvInConfig" }],
                    filename: "vite.config.ts",
                },
                {
                    code: "import { defineConfig } from 'vitest/config'; export default defineConfig({ test: { name: import.meta.env.VITE_PROJECT_NAME } });",
                    errors: [{ messageId: "noImportMetaEnvInConfig" }],
                    filename: "vitest.config.ts",
                },
                {
                    code: "const env = import.meta.env; export default env;",
                    errors: [{ messageId: "noImportMetaEnvInConfig" }],
                    filename: "vitest.workspace.ts",
                },
            ],
            valid: [
                {
                    code: "import { defineConfig, loadEnv } from 'vite'; export default defineConfig(({ mode }) => { const env = loadEnv(mode, process.cwd(), ''); return { define: { __APP_ENV__: JSON.stringify(env.APP_ENV) } }; });",
                    filename: "vite.config.ts",
                },
                {
                    code: "import { defineConfig } from 'vitest/config'; export default defineConfig({ test: { name: process.env.VITEST_PROJECT_NAME ?? 'unit' } });",
                    filename: "vitest.config.ts",
                },
                {
                    code: "console.log(import.meta.env.MODE);",
                    filename: "src/main.ts",
                },
            ],
        }
    );

    it("exposes rule metadata", () => {
        expect(noImportMetaEnvInConfigRule.meta.messages).toBeDefined();
    });
});
