import { expect, test } from "vitest";

import rule from "../src/rules/no-restricted-import-meta-env.js";
import { createRuleTester } from "./_internal/ruleTester.js";

createRuleTester().run("no-restricted-import-meta-env", rule, {
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
});

test("exposes rule metadata", () => {
    expect(rule.meta.messages).toBeDefined();
});
