import type { TSESTree } from "@typescript-eslint/utils";

import { AST_NODE_TYPES } from "@typescript-eslint/utils";

import { getPropertyPath, propertyPathEndsWith } from "../_internal/ast.js";
import { getConfigFileKind } from "../_internal/config-files.js";
import { constTuple } from "../_internal/const-tuple.js";
import { createTypedRule } from "../_internal/typed-rule.js";

type MessageId = "emptyBenchInclude";

const benchIncludePathSuffix = constTuple("test", "benchmark", "include");

const isEmptyArrayExpression = (
    node: Readonly<TSESTree.Property["value"]>
): node is TSESTree.ArrayExpression =>
    node.type === AST_NODE_TYPES.ArrayExpression && node.elements.length === 0;

/** Disallow empty Vitest benchmark include arrays. */
const noEmptyVitestBenchIncludeRule: ReturnType<typeof createTypedRule> =
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
                            benchIncludePathSuffix
                        ) ||
                        !isEmptyArrayExpression(node.value)
                    ) {
                        return;
                    }

                    context.report({
                        messageId: "emptyBenchInclude",
                        node: node.value,
                    });
                },
            };
        },
        meta: {
            deprecated: false,
            docs: {
                description:
                    "disallow empty `test.benchmark.include` arrays that can suppress benchmark discovery.",
                frozen: false,
                recommended: false,
                requiresTypeChecking: false,
                url: "https://nick2bad4u.github.io/eslint-plugin-vite/docs/rules/no-empty-vitest-bench-include",
                viteConfigs: [
                    "vite.configs.strict",
                    "vite.configs.all",
                    "vite.configs.configs",
                    "vite.configs.vitest-bench",
                ],
            },
            messages: {
                emptyBenchInclude:
                    "Avoid `test.benchmark.include: []`; an empty benchmark include list usually means no benchmark files are discovered.",
            },
            schema: [],
            type: "problem",
        },
        name: "no-empty-vitest-bench-include",
    });

export default noEmptyVitestBenchIncludeRule;
