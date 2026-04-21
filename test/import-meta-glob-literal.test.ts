import { describe, expect, it } from "vitest";

import importMetaGlobLiteralRule from "../src/rules/import-meta-glob-literal.js";
import { createRuleTester } from "./_internal/ruleTester.js";

describe("import-meta-glob-literal", () => {
    createRuleTester().run(
        "import-meta-glob-literal",
        importMetaGlobLiteralRule,
        {
            invalid: [
                {
                    code: "const pattern = './pages/*.md'; const modules = import.meta.glob(pattern);",
                    errors: [{ messageId: "literalPattern" }],
                },
                {
                    code: `const section = 'blog'; import.meta.glob(\`./content/\${section}/*.md\`);`,
                    errors: [{ messageId: "literalPattern" }],
                },
            ],
            valid: [
                {
                    code: "const modules = import.meta.glob('./pages/*.md');",
                },
                {
                    code: "const modules = import.meta.glob(['./pages/*.md', './posts/*.md']);",
                },
            ],
        }
    );

    it("exposes rule metadata", () => {
        expect.hasAssertions();
        expect(importMetaGlobLiteralRule.meta.messages).toBeDefined();
    });
});
