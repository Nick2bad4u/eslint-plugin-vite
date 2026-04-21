import { describe, expect, it } from "vitest";

import noMixedTestAndBenchApisRule from "../src/rules/no-mixed-test-and-bench-apis.js";
import { createRuleTester } from "./_internal/ruleTester.js";

describe("no-mixed-test-and-bench-apis", () => {
    createRuleTester().run(
        "no-mixed-test-and-bench-apis",
        noMixedTestAndBenchApisRule,
        {
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
        }
    );

    it("exposes rule metadata", () => {
        expect.hasAssertions();
        expect(noMixedTestAndBenchApisRule.meta.messages).toBeDefined();
    });
});
