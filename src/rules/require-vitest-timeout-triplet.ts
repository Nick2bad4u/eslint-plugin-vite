import type { TSESTree } from "@typescript-eslint/utils";

import { getPropertyPath, propertyPathEndsWith } from "../_internal/ast.js";
import {
    type ConfigFileKind,
    getConfigFileKind,
} from "../_internal/config-files.js";
import { createTypedRule } from "../_internal/typed-rule.js";

type MessageId = "missingTimeoutTriplet";

const testTimeoutPathSuffix = ["test", "testTimeout"] as const;
const hookTimeoutPathSuffix = ["test", "hookTimeout"] as const;
const teardownTimeoutPathSuffix = ["test", "teardownTimeout"] as const;

const shouldRequireTimeoutTriplet = (
    configFileKind: ConfigFileKind,
    hasAnyTestConfig: boolean
): boolean => configFileKind === "vitest" || hasAnyTestConfig;

/**
 * Require `testTimeout`, `hookTimeout`, and `teardownTimeout` together in
 * Vitest-oriented config.
 */
const requireVitestTimeoutTripletRule: ReturnType<typeof createTypedRule> =
    createTypedRule<[], MessageId>({
        create(context) {
            const configFileKind = getConfigFileKind(context.filename);

            if (configFileKind === null) {
                return {};
            }

            let hasAnyTestConfig = false;
            let hasTestTimeout = false;
            let hasHookTimeout = false;
            let hasTeardownTimeout = false;
            let firstTestPropertyNode: null | TSESTree.Property = null;

            return {
                "Program:exit"(programNode) {
                    if (
                        !shouldRequireTimeoutTriplet(
                            configFileKind,
                            hasAnyTestConfig
                        )
                    ) {
                        return;
                    }

                    if (
                        hasTestTimeout &&
                        hasHookTimeout &&
                        hasTeardownTimeout
                    ) {
                        return;
                    }

                    context.report({
                        messageId: "missingTimeoutTriplet",
                        node: firstTestPropertyNode ?? programNode,
                    });
                },
                Property(node) {
                    const propertyPath = getPropertyPath(node);

                    if (propertyPath[0] === "test") {
                        hasAnyTestConfig = true;

                        if (firstTestPropertyNode === null) {
                            firstTestPropertyNode = node;
                        }
                    }

                    if (
                        propertyPathEndsWith(
                            propertyPath,
                            testTimeoutPathSuffix
                        )
                    ) {
                        hasTestTimeout = true;
                    }

                    if (
                        propertyPathEndsWith(
                            propertyPath,
                            hookTimeoutPathSuffix
                        )
                    ) {
                        hasHookTimeout = true;
                    }

                    if (
                        propertyPathEndsWith(
                            propertyPath,
                            teardownTimeoutPathSuffix
                        )
                    ) {
                        hasTeardownTimeout = true;
                    }
                },
            };
        },
        defaultOptions: [],
        meta: {
            deprecated: false,
            docs: {
                description:
                    "require `testTimeout`, `hookTimeout`, and `teardownTimeout` to be configured together.",
                frozen: false,
                recommended: false,
                requiresTypeChecking: false,
                url: "https://nick2bad4u.github.io/eslint-plugin-vite/docs/rules/require-vitest-timeout-triplet",
                viteConfigs: [
                    "vite.configs.strict",
                    "vite.configs.all",
                    "vite.configs.vitest",
                    "vite.configs.vitest-bench",
                ],
            },
            messages: {
                missingTimeoutTriplet:
                    "Configure `test.testTimeout`, `test.hookTimeout`, and `test.teardownTimeout` together for consistent timeout behavior.",
            },
            schema: [],
            type: "suggestion",
        },
        name: "require-vitest-timeout-triplet",
    });

export default requireVitestTimeoutTripletRule;
