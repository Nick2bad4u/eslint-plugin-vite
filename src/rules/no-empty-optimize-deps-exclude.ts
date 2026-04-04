import type { TSESTree } from "@typescript-eslint/utils";

import { getPropertyPath, propertyPathEndsWith } from "../_internal/ast.js";
import { getConfigFileKind } from "../_internal/config-files.js";
import { createTypedRule } from "../_internal/typed-rule.js";

type MessageId = "emptyOptimizeDepsExclude";

const optimizeDepsExcludePathSuffix = ["optimizeDeps", "exclude"] as const;

const isEmptyStaticArray = (
    node: Readonly<TSESTree.Property["value"]>
): boolean => node.type === "ArrayExpression" && node.elements.length === 0;

/** Disallow `optimizeDeps.exclude: []` in Vite config files. */
const noEmptyOptimizeDepsExcludeRule: ReturnType<typeof createTypedRule> =
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
                            optimizeDepsExcludePathSuffix
                        ) ||
                        !isEmptyStaticArray(node.value)
                    ) {
                        return;
                    }

                    context.report({
                        messageId: "emptyOptimizeDepsExclude",
                        node: node.value,
                    });
                },
            };
        },
        meta: {
            deprecated: false,
            docs: {
                description:
                    "disallow empty `optimizeDeps.exclude` arrays in committed Vite config.",
                frozen: false,
                recommended: false,
                requiresTypeChecking: false,
                url: "https://nick2bad4u.github.io/eslint-plugin-vite/docs/rules/no-empty-optimize-deps-exclude",
                viteConfigs: [
                    "vite.configs.strict",
                    "vite.configs.all",
                    "vite.configs.configs",
                ],
            },
            messages: {
                emptyOptimizeDepsExclude:
                    "`optimizeDeps.exclude` is empty. Remove it or add at least one dependency pattern.",
            },
            schema: [],
            type: "problem",
        },
        name: "no-empty-optimize-deps-exclude",
    });

export default noEmptyOptimizeDepsExcludeRule;
