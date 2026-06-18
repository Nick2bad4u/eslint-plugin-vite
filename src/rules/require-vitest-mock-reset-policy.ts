import type { TSESTree } from "@typescript-eslint/utils";

import { AST_NODE_TYPES } from "@typescript-eslint/utils";

import { getPropertyPath, propertyPathEndsWith } from "../_internal/ast.js";
import { getConfigFileKind } from "../_internal/config-files.js";
import { constTuple } from "../_internal/const-tuple.js";
import { createTypedRule } from "../_internal/typed-rule.js";

type MessageId = "missingMockResetPolicy";

const clearMocksPathSuffix = constTuple("test", "clearMocks");

const resetMocksPathSuffix = constTuple("test", "resetMocks");

const restoreMocksPathSuffix = constTuple("test", "restoreMocks");

const testPathSuffix = constTuple("test");

const isBooleanLiteral = (
    node: Readonly<TSESTree.Property["value"]>,
    isExpectedValue: boolean
): boolean => node.type === AST_NODE_TYPES.Literal && node.value === isExpectedValue;

/**
 * Require at least one Vitest mock reset policy (`clearMocks`, `resetMocks`, or
 * `restoreMocks`) to be explicitly enabled.
 */
const requireVitestMockResetPolicyRule: ReturnType<typeof createTypedRule> =
    createTypedRule<[], MessageId>({
        create(context) {
            if (getConfigFileKind(context.filename) === null) {
                return {};
            }

            let firstTestObjectNode: null | TSESTree.Node = null;
            let hasEnabledMockPolicy = false;

            return {
                "Program:exit"() {
                    if (firstTestObjectNode === null || hasEnabledMockPolicy) {
                        return;
                    }

                    context.report({
                        messageId: "missingMockResetPolicy",
                        node: firstTestObjectNode,
                    });
                },
                Property(node) {
                    const propertyPath = getPropertyPath(node);

                    if (
                        propertyPathEndsWith(propertyPath, testPathSuffix) &&
                        node.value.type === AST_NODE_TYPES.ObjectExpression
                    ) {
                        firstTestObjectNode ??= node.value;
                    }

                    if (
                        (propertyPathEndsWith(
                            propertyPath,
                            clearMocksPathSuffix
                        ) ||
                            propertyPathEndsWith(
                                propertyPath,
                                resetMocksPathSuffix
                            ) ||
                            propertyPathEndsWith(
                                propertyPath,
                                restoreMocksPathSuffix
                            )) &&
                        isBooleanLiteral(node.value, true)
                    ) {
                        hasEnabledMockPolicy = true;
                    }
                },
            };
        },
        meta: {
            deprecated: false,
            docs: {
                description:
                    "require at least one enabled Vitest mock reset policy (`clearMocks`, `resetMocks`, or `restoreMocks`).",
                frozen: false,
                recommended: false,
                requiresTypeChecking: false,
                url: "https://nick2bad4u.github.io/eslint-plugin-vite/docs/rules/require-vitest-mock-reset-policy",
                viteConfigs: [
                    "vite.configs.strict",
                    "vite.configs.all",
                    "vite.configs.configs",
                    "vite.configs.vitest",
                ],
            },
            messages: {
                missingMockResetPolicy:
                    "Configure at least one of `test.clearMocks`, `test.resetMocks`, or `test.restoreMocks` as `true` to reduce test-state leakage between runs.",
            },
            schema: [],
            type: "problem",
        },
        name: "require-vitest-mock-reset-policy",
    });

export default requireVitestMockResetPolicyRule;
