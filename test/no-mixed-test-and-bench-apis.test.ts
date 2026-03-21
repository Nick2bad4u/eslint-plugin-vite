import { expect, test } from "vitest";

import rule from "../src/rules/no-mixed-test-and-bench-apis.js";
import { createRuleTester } from "./_internal/ruleTester.js";

createRuleTester().run("no-mixed-test-and-bench-apis", rule, {
    invalid: [
        {
            code: "import { bench, test } from 'vitest'; test('works', () => {}); bench('speed', () => {});",
            errors: [{ messageId: "mixedApis" }],
            filename: "math.bench.ts",
        },
    ],
    valid: [
        {
            code: "import { test } from 'vitest'; test('works', () => {});",
            filename: "math.test.ts",
        },
        {
            code: "import { bench } from 'vitest'; bench('speed', () => {});",
            filename: "math.bench.ts",
        },
    ],
});

test("exposes rule metadata", () => {
    expect(rule.meta.messages).toBeDefined();
});
