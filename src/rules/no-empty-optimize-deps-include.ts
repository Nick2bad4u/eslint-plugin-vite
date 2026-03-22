import type { TSESTree } from "@typescript-eslint/utils";

import { getPropertyPath, propertyPathEndsWith } from "../_internal/ast.js";
import { getConfigFileKind } from "../_internal/config-files.js";
import { createTypedRule } from "../_internal/typed-rule.js";

type MessageId = "emptyOptimizeDepsInclude";

const optimizeDepsIncludePathSuffix = ["optimizeDeps", "include"] as const;

const isEmptyStaticArray = (
    node: Readonly<TSESTree.Property["value"]>
): boolean => node.type === "ArrayExpression" && node.elements.length === 0;

/** Disallow `optimizeDeps.include: []` in Vite config files. */
const noEmptyOptimizeDepsIncludeRule: ReturnType<typeof createTypedRule> =
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
                            optimizeDepsIncludePathSuffix
                        ) ||
                        !isEmptyStaticArray(node.value)
                    ) {
                        return;
                    }

                    context.report({
                        messageId: "emptyOptimizeDepsInclude",
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
                    "disallow empty `optimizeDeps.include` arrays in committed Vite config.",
                frozen: false,
                recommended: false,
                requiresTypeChecking: false,
                url: "https://nick2bad4u.github.io/eslint-plugin-vite/docs/rules/no-empty-optimize-deps-include",
                viteConfigs: [
                    "vite.configs.strict",
                    "vite.configs.all",
                    "vite.configs.configs",
                ],
            },
            messages: {
                emptyOptimizeDepsInclude:
                    "`optimizeDeps.include` is empty. Remove it or add at least one dependency pattern.",
            },
            schema: [],
            type: "problem",
        },
        name: "no-empty-optimize-deps-include",
    });

export default noEmptyOptimizeDepsIncludeRule;
