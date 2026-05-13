import type { TSESTree } from "@typescript-eslint/utils";

import { AST_NODE_TYPES } from "@typescript-eslint/utils";

import { getPropertyPath, propertyPathEndsWith } from "../_internal/ast.js";
import { getConfigFileKind } from "../_internal/config-files.js";
import { constTuple } from "../_internal/const-tuple.js";
import { createTypedRule } from "../_internal/typed-rule.js";

type MessageId = "emptyInclude";

const includePathSuffix = constTuple("test", "include");

const isEmptyArrayExpression = (
    node: Readonly<TSESTree.Property["value"]>
): node is TSESTree.ArrayExpression =>
    node.type === AST_NODE_TYPES.ArrayExpression && node.elements.length === 0;

/** Disallow empty Vitest `test.include` arrays that suppress test discovery. */
const noEmptyVitestIncludeRule: ReturnType<typeof createTypedRule> =
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
                            includePathSuffix
                        ) ||
                        !isEmptyArrayExpression(node.value)
                    ) {
                        return;
                    }

                    context.report({
                        messageId: "emptyInclude",
                        node: node.value,
                    });
                },
            };
        },
        meta: {
            deprecated: false,
            docs: {
                description:
                    "disallow empty Vitest `test.include` arrays that can prevent test file discovery.",
                frozen: false,
                recommended: false,
                requiresTypeChecking: false,
                url: "https://nick2bad4u.github.io/eslint-plugin-vite/docs/rules/no-empty-vitest-include",
                viteConfigs: [
                    "vite.configs.strict",
                    "vite.configs.all",
                    "vite.configs.configs",
                    "vite.configs.vitest",
                ],
            },
            messages: {
                emptyInclude:
                    "Avoid `test.include: []`; an empty include list usually means Vitest will discover no test files.",
            },
            schema: [],
            type: "problem",
        },
        name: "no-empty-vitest-include",
    });

export default noEmptyVitestIncludeRule;
