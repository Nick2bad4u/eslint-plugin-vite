import type { TSESTree } from "@typescript-eslint/utils";

import { getPropertyPath, propertyPathEndsWith } from "../_internal/ast.js";
import { getConfigFileKind } from "../_internal/config-files.js";
import { createTypedRule } from "../_internal/typed-rule.js";

type MessageId = "missingMockResetPolicy";

const clearMocksPathSuffix = ["test", "clearMocks"] as const;

const resetMocksPathSuffix = ["test", "resetMocks"] as const;

const restoreMocksPathSuffix = ["test", "restoreMocks"] as const;

const testPathSuffix = ["test"] as const;

const isBooleanLiteral = (
    node: Readonly<TSESTree.Property["value"]>,
    expected: boolean
): boolean => node.type === "Literal" && node.value === expected;

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
                        node.value.type === "ObjectExpression"
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
        defaultOptions: [],
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
