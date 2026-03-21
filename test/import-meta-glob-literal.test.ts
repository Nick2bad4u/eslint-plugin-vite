import { expect, test } from "vitest";

import rule from "../src/rules/import-meta-glob-literal.js";
import { createRuleTester } from "./_internal/ruleTester.js";

createRuleTester().run("import-meta-glob-literal", rule, {
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
});

test("exposes rule metadata", () => {
    expect(rule.meta.messages).toBeDefined();
});
