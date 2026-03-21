import { describe, expect, it } from "vitest";

import noRestrictedImportMetaEnvRule from "../src/rules/no-restricted-import-meta-env.js";
import { createRuleTester } from "./_internal/ruleTester.js";

describe("no-restricted-import-meta-env", () => {
    createRuleTester().run(
        "no-restricted-import-meta-env",
        noRestrictedImportMetaEnvRule,
        {
            invalid: [
                {
                    code: "const token = import.meta.env.SECRET_TOKEN;",
                    errors: [{ messageId: "restrictedEnvKey" }],
                    filename: "src/app.ts",
                },
            ],
            valid: [
                {
                    code: "const mode = import.meta.env.MODE; const url = import.meta.env.VITE_API_URL;",
                    filename: "src/app.ts",
                },
                {
                    code: "const token = import.meta.env.PUBLIC_TOKEN;",
                    filename: "src/app.ts",
                    options: [{ allowPrefixes: ["VITE_", "PUBLIC_"] }],
                },
                {
                    code: "const secret = import.meta.env.SECRET_TOKEN;",
                    filename: "vite.config.ts",
                },
            ],
        }
    );

    it("exposes rule metadata", () => {
        expect(noRestrictedImportMetaEnvRule.meta.messages).toBeDefined();
    });
});
