import { describe, expect, it } from "vitest";

import noDynamicImportMetaEnvAccessRule from "../src/rules/no-dynamic-import-meta-env-access.js";
import { createRuleTester } from "./_internal/ruleTester.js";

describe("no-dynamic-import-meta-env-access", () => {
    createRuleTester().run(
        "no-dynamic-import-meta-env-access",
        noDynamicImportMetaEnvAccessRule,
        {
            invalid: [
                {
                    code: "const key = 'VITE_API_URL'; const value = import.meta.env[key];",
                    errors: [{ messageId: "dynamicAccess" }],
                },
            ],
            valid: [
                {
                    code: "const value = import.meta.env.VITE_API_URL;",
                },
                {
                    code: "const value = import.meta.env['VITE_API_URL'];",
                },
            ],
        }
    );

    it("exposes rule metadata", () => {
        expect(noDynamicImportMetaEnvAccessRule.meta.messages).toBeDefined();
    });
});
