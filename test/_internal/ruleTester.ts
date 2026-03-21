/* eslint-disable vitest/no-hooks, vitest/require-top-level-describe, vitest/valid-describe-callback, vitest/expect-expect -- This file adapts Vitest primitives into RuleTester infrastructure instead of declaring repository test suites directly. */
import typescriptParser from "@typescript-eslint/parser";
import { RuleTester } from "@typescript-eslint/rule-tester";
import { afterAll, describe, test } from "vitest";

RuleTester.afterAll = (callback): void => {
    afterAll(callback);
};

RuleTester.describe = (text, callback): void => {
    describe(text, callback);
};

RuleTester.it = (text, callback): void => {
    test(text, callback);
};

/** Create a preconfigured RuleTester for Vite rule tests. */
export const createRuleTester = (): RuleTester =>
    new RuleTester({
        languageOptions: {
            ecmaVersion: "latest",
            parser: typescriptParser,
            sourceType: "module",
        },
    });

/* eslint-enable vitest/no-hooks, vitest/require-top-level-describe, vitest/valid-describe-callback, vitest/expect-expect -- Re-enable suite-only rules after the RuleTester adapter setup. */
