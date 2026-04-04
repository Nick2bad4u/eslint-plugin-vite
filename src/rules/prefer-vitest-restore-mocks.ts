import type { TSESTree } from "@typescript-eslint/utils";

import { getPropertyPath, propertyPathEndsWith } from "../_internal/ast.js";
import { getConfigFileKind } from "../_internal/config-files.js";
import { createTypedRule } from "../_internal/typed-rule.js";

type MessageId = "preferRestoreMocks";

const clearMocksPathSuffix = ["test", "clearMocks"] as const;

const resetMocksPathSuffix = ["test", "resetMocks"] as const;

const restoreMocksPathSuffix = ["test", "restoreMocks"] as const;

const isBooleanLiteralTrue = (
    node: Readonly<TSESTree.Property["value"]>
): boolean => node.type === "Literal" && node.value === true;

/** Prefer `test.restoreMocks: true` over relying only on clear/reset mocks. */
const preferVitestRestoreMocksRule: ReturnType<typeof createTypedRule> =
    createTypedRule<[], MessageId>({
        create(context) {
            if (getConfigFileKind(context.filename) === null) {
                return {};
            }

            let firstClearOrResetNode: null | TSESTree.Node = null;
            let hasRestoreMocksTrue = false;

            return {
                "Program:exit"() {
                    if (firstClearOrResetNode === null || hasRestoreMocksTrue) {
                        return;
                    }

                    context.report({
                        messageId: "preferRestoreMocks",
                        node: firstClearOrResetNode,
                    });
                },
                Property(node) {
                    const propertyPath = getPropertyPath(node);

                    if (
                        propertyPathEndsWith(
                            propertyPath,
                            restoreMocksPathSuffix
                        ) &&
                        isBooleanLiteralTrue(node.value)
                    ) {
                        hasRestoreMocksTrue = true;

                        return;
                    }

                    if (
                        (propertyPathEndsWith(
                            propertyPath,
                            clearMocksPathSuffix
                        ) ||
                            propertyPathEndsWith(
                                propertyPath,
                                resetMocksPathSuffix
                            )) &&
                        isBooleanLiteralTrue(node.value)
                    ) {
                        firstClearOrResetNode ??= node.value;
                    }
                },
            };
        },
        meta: {
            deprecated: false,
            docs: {
                description:
                    "require `test.restoreMocks: true` when shared config enables `test.clearMocks` or `test.resetMocks`.",
                frozen: false,
                recommended: false,
                requiresTypeChecking: false,
                url: "https://nick2bad4u.github.io/eslint-plugin-vite/docs/rules/prefer-vitest-restore-mocks",
                viteConfigs: [
                    "vite.configs.strict",
                    "vite.configs.all",
                    "vite.configs.configs",
                    "vite.configs.vitest",
                ],
            },
            messages: {
                preferRestoreMocks:
                    "Prefer `test.restoreMocks: true` so mocks are fully restored between tests, not just cleared/reset.",
            },
            schema: [],
            type: "suggestion",
        },
        name: "prefer-vitest-restore-mocks",
    });

export default preferVitestRestoreMocksRule;
