import type { TSESTree } from "@typescript-eslint/utils";

import { getPropertyPath, propertyPathEndsWith } from "../_internal/ast.js";
import { getConfigFileKind } from "../_internal/config-files.js";
import { createTypedRule } from "../_internal/typed-rule.js";

type MessageId = "emptyBenchExclude";

const benchExcludePathSuffix = [
    "test",
    "benchmark",
    "exclude",
] as const;

const isEmptyArrayExpression = (
    node: Readonly<TSESTree.Property["value"]>
): node is TSESTree.ArrayExpression =>
    node.type === "ArrayExpression" && node.elements.length === 0;

/** Disallow empty Vitest benchmark exclude arrays. */
const noEmptyVitestBenchExcludeRule: ReturnType<typeof createTypedRule> =
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
                            benchExcludePathSuffix
                        ) ||
                        !isEmptyArrayExpression(node.value)
                    ) {
                        return;
                    }

                    context.report({
                        messageId: "emptyBenchExclude",
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
                    "disallow empty `test.benchmark.exclude` arrays that provide no filtering effect.",
                frozen: false,
                recommended: false,
                requiresTypeChecking: false,
                url: "https://nick2bad4u.github.io/eslint-plugin-vite/docs/rules/no-empty-vitest-bench-exclude",
                viteConfigs: [
                    "vite.configs.strict",
                    "vite.configs.all",
                    "vite.configs.configs",
                    "vite.configs.vitest-bench",
                ],
            },
            messages: {
                emptyBenchExclude:
                    "Avoid `test.benchmark.exclude: []`; an empty benchmark exclude list is usually redundant config noise.",
            },
            schema: [],
            type: "problem",
        },
        name: "no-empty-vitest-bench-exclude",
    });

export default noEmptyVitestBenchExcludeRule;
