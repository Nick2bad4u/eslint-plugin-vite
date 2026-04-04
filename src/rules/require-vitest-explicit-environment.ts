import type { TSESTree } from "@typescript-eslint/utils";

import { getPropertyPath, propertyPathEndsWith } from "../_internal/ast.js";
import {
    type ConfigFileKind,
    getConfigFileKind,
} from "../_internal/config-files.js";
import { createTypedRule } from "../_internal/typed-rule.js";

type MessageId = "missingEnvironment";

const environmentPathSuffix = ["test", "environment"] as const;

const shouldRequireEnvironment = (
    configFileKind: ConfigFileKind,
    hasAnyTestConfig: boolean
): boolean => configFileKind === "vitest" || hasAnyTestConfig;

/** Require explicit `test.environment` in Vitest-oriented config. */
const requireVitestExplicitEnvironmentRule: ReturnType<typeof createTypedRule> =
    createTypedRule<[], MessageId>({
        create(context) {
            const configFileKind = getConfigFileKind(context.filename);

            if (configFileKind === null) {
                return {};
            }

            let hasAnyTestConfig = false;
            let hasExplicitEnvironment = false;
            let firstTestPropertyNode: null | TSESTree.Property = null;

            return {
                "Program:exit"(programNode) {
                    if (
                        hasExplicitEnvironment ||
                        !shouldRequireEnvironment(
                            configFileKind,
                            hasAnyTestConfig
                        )
                    ) {
                        return;
                    }

                    context.report({
                        messageId: "missingEnvironment",
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
                            environmentPathSuffix
                        )
                    ) {
                        hasExplicitEnvironment = true;
                    }
                },
            };
        },
        meta: {
            deprecated: false,
            docs: {
                description:
                    "require explicit `test.environment` in committed Vitest config.",
                frozen: false,
                recommended: false,
                requiresTypeChecking: false,
                url: "https://nick2bad4u.github.io/eslint-plugin-vite/docs/rules/require-vitest-explicit-environment",
                viteConfigs: [
                    "vite.configs.strict",
                    "vite.configs.all",
                    "vite.configs.vitest",
                    "vite.configs.vitest-bench",
                ],
            },
            messages: {
                missingEnvironment:
                    "Set `test.environment` explicitly to avoid implicit environment drift across projects.",
            },
            schema: [],
            type: "suggestion",
        },
        name: "require-vitest-explicit-environment",
    });

export default requireVitestExplicitEnvironmentRule;
