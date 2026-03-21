import { expect, test } from "vitest";

import rule from "../src/rules/no-dynamic-import-meta-env-access.js";
import { createRuleTester } from "./_internal/ruleTester.js";

createRuleTester().run("no-dynamic-import-meta-env-access", rule, {
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
});

test("exposes rule metadata", () => {
    expect(rule.meta.messages).toBeDefined();
});
