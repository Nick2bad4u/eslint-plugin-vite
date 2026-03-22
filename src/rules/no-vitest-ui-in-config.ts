import type { TSESTree } from "@typescript-eslint/utils";

import { getPropertyPath, propertyPathEndsWith } from "../_internal/ast.js";
import { getConfigFileKind } from "../_internal/config-files.js";
import { createTypedRule } from "../_internal/typed-rule.js";

type MessageId = "uiInConfig";

const uiPathSuffix = ["test", "ui"] as const;

const isBooleanLiteral = (
    node: Readonly<TSESTree.Property["value"]>,
    expected: boolean
): boolean => node.type === "Literal" && node.value === expected;

/** Disallow committed `test.ui: true` in shared config files. */
const noVitestUiInConfigRule: ReturnType<typeof createTypedRule> =
    createTypedRule<[], MessageId>({
        create(context) {
            if (getConfigFileKind(context.filename) === null) {
                return {};
            }

            return {
                Property(node) {
                    if (
                        !propertyPathEndsWith(
                            getPropertyPath(node),
                            uiPathSuffix
                        ) ||
                        !isBooleanLiteral(node.value, true)
                    ) {
                        return;
                    }

                    context.report({
                        messageId: "uiInConfig",
                        node: node.value,
                    });
                },
            };
        },
        defaultOptions: [],
        meta: {
            deprecated: false,
            docs: {
                description:
                    "disallow `test.ui: true` in committed Vitest config.",
                frozen: false,
                recommended: false,
                requiresTypeChecking: false,
                url: "https://nick2bad4u.github.io/eslint-plugin-vite/docs/rules/no-vitest-ui-in-config",
                viteConfigs: [
                    "vite.configs.strict",
                    "vite.configs.all",
                    "vite.configs.configs",
                    "vite.configs.vitest",
                ],
            },
            messages: {
                uiInConfig:
                    "Avoid `test.ui: true` in committed config; UI mode is typically local-only and can create environment-specific behavior.",
            },
            schema: [],
            type: "problem",
        },
        name: "no-vitest-ui-in-config",
    });

export default noVitestUiInConfigRule;
