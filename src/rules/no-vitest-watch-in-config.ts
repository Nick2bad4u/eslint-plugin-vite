import type { TSESTree } from "@typescript-eslint/utils";

import { getPropertyPath, propertyPathEndsWith } from "../_internal/ast.js";
import { getConfigFileKind } from "../_internal/config-files.js";
import { createTypedRule } from "../_internal/typed-rule.js";

type MessageId = "watchInConfig";

const watchPathSuffix = ["test", "watch"] as const;

const isBooleanLiteral = (
    node: Readonly<TSESTree.Property["value"]>,
    expected: boolean
): boolean => node.type === "Literal" && node.value === expected;

/** Disallow committed `test.watch: true` in shared config files. */
const noVitestWatchInConfigRule: ReturnType<typeof createTypedRule> =
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
                            watchPathSuffix
                        ) ||
                        !isBooleanLiteral(node.value, true)
                    ) {
                        return;
                    }

                    context.report({
                        messageId: "watchInConfig",
                        node: node.value,
                    });
                },
            };
        },
        meta: {
            deprecated: false,
            docs: {
                description:
                    "disallow `test.watch: true` in committed Vitest config.",
                frozen: false,
                recommended: false,
                requiresTypeChecking: false,
                url: "https://nick2bad4u.github.io/eslint-plugin-vite/docs/rules/no-vitest-watch-in-config",
                viteConfigs: [
                    "vite.configs.strict",
                    "vite.configs.all",
                    "vite.configs.configs",
                    "vite.configs.vitest",
                ],
            },
            messages: {
                watchInConfig:
                    "Avoid `test.watch: true` in committed config; watch mode is a local-dev concern and can cause CI mismatch.",
            },
            schema: [],
            type: "problem",
        },
        name: "no-vitest-watch-in-config",
    });

export default noVitestWatchInConfigRule;
