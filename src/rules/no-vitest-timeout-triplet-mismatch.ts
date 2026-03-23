import type { TSESTree } from "@typescript-eslint/utils";

import { getPropertyPath, propertyPathEndsWith } from "../_internal/ast.js";
import { getConfigFileKind } from "../_internal/config-files.js";
import { createTypedRule } from "../_internal/typed-rule.js";

type MessageId = "timeoutTripletMismatch";

const testTimeoutPathSuffix = ["test", "testTimeout"] as const;
const hookTimeoutPathSuffix = ["test", "hookTimeout"] as const;
const teardownTimeoutPathSuffix = ["test", "teardownTimeout"] as const;

const getStaticNumber = (
    node: Readonly<TSESTree.Property["value"]>
): null | number => {
    if (node.type === "Literal" && typeof node.value === "number") {
        return node.value;
    }

    return null;
};

/**
 * Disallow mismatched Vitest timeout triplet ordering where teardown timeout is
 * lower than hook timeout.
 */
const noVitestTimeoutTripletMismatchRule: ReturnType<typeof createTypedRule> =
    createTypedRule<[], MessageId>({
        create(context) {
            if (getConfigFileKind(context.filename) === null) {
                return {};
            }

            let testTimeout: null | number = null;
            let hookTimeout: null | number = null;
            let teardownTimeout: null | number = null;
            let hookTimeoutNode: null | TSESTree.Property = null;
            let teardownTimeoutNode: null | TSESTree.Property = null;

            return {
                "Program:exit"(programNode) {
                    if (
                        testTimeout === null ||
                        hookTimeout === null ||
                        teardownTimeout === null ||
                        teardownTimeout >= hookTimeout
                    ) {
                        return;
                    }

                    context.report({
                        data: {
                            hookTimeout: String(hookTimeout),
                            teardownTimeout: String(teardownTimeout),
                        },
                        messageId: "timeoutTripletMismatch",
                        node:
                            teardownTimeoutNode ??
                            hookTimeoutNode ??
                            programNode,
                    });
                },
                Property(node) {
                    const propertyPath = getPropertyPath(node);
                    const value = getStaticNumber(node.value);

                    if (value === null) {
                        return;
                    }

                    if (
                        propertyPathEndsWith(
                            propertyPath,
                            testTimeoutPathSuffix
                        )
                    ) {
                        testTimeout = value;
                    }

                    if (
                        propertyPathEndsWith(
                            propertyPath,
                            hookTimeoutPathSuffix
                        )
                    ) {
                        hookTimeout = value;
                        hookTimeoutNode = node;
                    }

                    if (
                        propertyPathEndsWith(
                            propertyPath,
                            teardownTimeoutPathSuffix
                        )
                    ) {
                        teardownTimeout = value;
                        teardownTimeoutNode = node;
                    }
                },
            };
        },
        defaultOptions: [],
        meta: {
            deprecated: false,
            docs: {
                description:
                    "disallow inconsistent timeout triplet ordering in Vitest config.",
                frozen: false,
                recommended: false,
                requiresTypeChecking: false,
                url: "https://nick2bad4u.github.io/eslint-plugin-vite/docs/rules/no-vitest-timeout-triplet-mismatch",
                viteConfigs: [
                    "vite.configs.strict",
                    "vite.configs.all",
                    "vite.configs.vitest",
                    "vite.configs.vitest-bench",
                ],
            },
            messages: {
                timeoutTripletMismatch:
                    "`test.teardownTimeout` ({{teardownTimeout}}) should be greater than or equal to `test.hookTimeout` ({{hookTimeout}}) for consistent teardown behavior.",
            },
            schema: [],
            type: "problem",
        },
        name: "no-vitest-timeout-triplet-mismatch",
    });

export default noVitestTimeoutTripletMismatchRule;
