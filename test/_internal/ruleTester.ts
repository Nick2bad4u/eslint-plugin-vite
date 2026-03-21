import typescriptParser from "@typescript-eslint/parser";
import { RuleTester } from "@typescript-eslint/rule-tester";
import { afterAll, describe, it } from "vitest";

RuleTester.afterAll = afterAll;
RuleTester.describe = describe;
RuleTester.it = it;

/** Create a preconfigured RuleTester for Vite rule tests. */
export const createRuleTester = (): RuleTester =>
    new RuleTester({
        languageOptions: {
            ecmaVersion: "latest",
            parser: typescriptParser,
            sourceType: "module",
        },
    });
