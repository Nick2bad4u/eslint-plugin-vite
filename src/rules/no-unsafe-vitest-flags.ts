import type { TSESTree } from "@typescript-eslint/utils";

import { AST_NODE_TYPES } from "@typescript-eslint/utils";
import { isDefined } from "ts-extras";

import { getPropertyPath, propertyPathEndsWith } from "../_internal/ast.js";
import { getConfigFileKind } from "../_internal/config-files.js";
import { constTuple } from "../_internal/const-tuple.js";
import { createTypedRule } from "../_internal/typed-rule.js";

type MessageId = "unsafeVitestFlag";
type UnsafeVitestFlag = Readonly<{
    guidance: string;
    optionPath: string;
}>;

const allowOnlyPathSuffix = constTuple("test", "allowOnly");
const ignoreUnhandledErrorsPathSuffix = constTuple(
    "test",
    "dangerouslyIgnoreUnhandledErrors"
);

const isBooleanLiteral = (
    node: Readonly<TSESTree.Property["value"]>,
    isExpectedValue: boolean
): boolean => node.type === AST_NODE_TYPES.Literal && node.value === isExpectedValue;

const getUnsafeVitestFlag = (
    node: Readonly<TSESTree.Property>
): undefined | UnsafeVitestFlag => {
    const propertyPath = getPropertyPath(node);

    if (
        propertyPathEndsWith(propertyPath, allowOnlyPathSuffix) &&
        isBooleanLiteral(node.value, true)
    ) {
        return {
            guidance:
                "Enabling `allowOnly` can let focused tests (`.only`) pass in CI and accidentally skip the rest of your suite.",
            optionPath: "test.allowOnly",
        };
    }

    if (
        propertyPathEndsWith(propertyPath, ignoreUnhandledErrorsPathSuffix) &&
        isBooleanLiteral(node.value, true)
    ) {
        return {
            guidance:
                "Ignoring unhandled errors can hide broken asynchronous failures and produce misleading green runs.",
            optionPath: "test.dangerouslyIgnoreUnhandledErrors",
        };
    }

    return undefined;
};

/** Disallow unsafe Vitest execution flags that can hide real test failures. */
const noUnsafeVitestFlagsRule: ReturnType<typeof createTypedRule> =
    createTypedRule<[], MessageId>({
        create(context) {
            if (getConfigFileKind(context.filename) === null) {
                return {};
            }

            return {
                Property(node) {
                    const unsafeFlag = getUnsafeVitestFlag(node);

                    if (!isDefined(unsafeFlag)) {
                        return;
                    }

                    context.report({
                        data: unsafeFlag,
                        messageId: "unsafeVitestFlag",
                        node: node.value,
                    });
                },
            };
        },
        meta: {
            deprecated: false,
            docs: {
                description:
                    "disallow unsafe Vitest flags such as `allowOnly` and `dangerouslyIgnoreUnhandledErrors` in configuration.",
                frozen: false,
                recommended: false,
                requiresTypeChecking: false,
                url: "https://nick2bad4u.github.io/eslint-plugin-vite/docs/rules/no-unsafe-vitest-flags",
                viteConfigs: [
                    "vite.configs.strict",
                    "vite.configs.all",
                    "vite.configs.configs",
                    "vite.configs.vitest",
                ],
            },
            messages: {
                unsafeVitestFlag:
                    "Avoid unsafe Vitest option `{{ optionPath }}`. {{ guidance }}",
            },
            schema: [],
            type: "problem",
        },
        name: "no-unsafe-vitest-flags",
    });

export default noUnsafeVitestFlagsRule;
