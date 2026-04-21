import type { TSESTree } from "@typescript-eslint/utils";

import { arrayAt, arrayIncludes, isDefined } from "ts-extras";

import { getPropertyPath } from "../_internal/ast.js";
import { getConfigFileKind } from "../_internal/config-files.js";
import { createTypedRule } from "../_internal/typed-rule.js";

type MessageId = "zeroTimeout";
type TimeoutOptionName = "hookTimeout" | "teardownTimeout" | "testTimeout";

const timeoutOptionNames = [
    "hookTimeout",
    "teardownTimeout",
    "testTimeout",
] as const;

const isTimeoutOptionName = (value: string): value is TimeoutOptionName =>
    arrayIncludes(timeoutOptionNames, value as TimeoutOptionName);

const isNumberLiteral = (
    node: Readonly<TSESTree.Property["value"]>,
    expected: number
): boolean => node.type === "Literal" && node.value === expected;

const getZeroTimeoutOptionName = (
    node: Readonly<TSESTree.Property>
): null | TimeoutOptionName => {
    const propertyPath = getPropertyPath(node);
    const optionName = arrayAt(propertyPath, -1);
    const parentSegment = arrayAt(propertyPath, -2);

    if (
        !isDefined(optionName) ||
        parentSegment !== "test" ||
        !isTimeoutOptionName(optionName)
    ) {
        return null;
    }

    return isNumberLiteral(node.value, 0) ? optionName : null;
};

/** Disallow disabling Vitest timeouts with `0` in config and project scopes. */
const noZeroVitestTimeoutRule: ReturnType<typeof createTypedRule> =
    createTypedRule<[], MessageId>({
        create(context) {
            if (getConfigFileKind(context.filename) === null) {
                return {};
            }

            return {
                Property(node) {
                    const timeoutOptionName = getZeroTimeoutOptionName(node);

                    if (timeoutOptionName === null) {
                        return;
                    }

                    context.report({
                        data: {
                            optionPath: `test.${timeoutOptionName}`,
                        },
                        messageId: "zeroTimeout",
                        node: node.value,
                    });
                },
            };
        },
        meta: {
            deprecated: false,
            docs: {
                description:
                    "disallow zero-valued Vitest timeout options that disable suite timeout safeguards.",
                frozen: false,
                recommended: false,
                requiresTypeChecking: false,
                url: "https://nick2bad4u.github.io/eslint-plugin-vite/docs/rules/no-zero-vitest-timeout",
                viteConfigs: [
                    "vite.configs.strict",
                    "vite.configs.all",
                    "vite.configs.configs",
                    "vite.configs.vitest",
                ],
            },
            messages: {
                zeroTimeout:
                    "Avoid setting `{{ optionPath }}` to `0`; disabling timeouts can mask hangs and stall CI feedback loops.",
            },
            schema: [],
            type: "problem",
        },
        name: "no-zero-vitest-timeout",
    });

export default noZeroVitestTimeoutRule;
