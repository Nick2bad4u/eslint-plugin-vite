import type { TSESTree } from "@typescript-eslint/utils";

import { getPropertyPath, propertyPathEndsWith } from "../_internal/ast.js";
import { getConfigFileKind } from "../_internal/config-files.js";
import { createTypedRule } from "../_internal/typed-rule.js";

type MessageId = "emptyProjects";

const projectsPathSuffix = ["test", "projects"] as const;

const isEmptyArrayExpression = (
    node: Readonly<TSESTree.Property["value"]>
): node is TSESTree.ArrayExpression =>
    node.type === "ArrayExpression" && node.elements.length === 0;

/**
 * Disallow empty Vitest project arrays in `test.projects` and
 * `defineWorkspace([...])`.
 */
const noEmptyVitestProjectsRule: ReturnType<typeof createTypedRule> =
    createTypedRule<[], MessageId>({
        create(context) {
            if (getConfigFileKind(context.filename) === null) {
                return {};
            }

            return {
                CallExpression(node) {
                    if (
                        node.callee.type !== "Identifier" ||
                        node.callee.name !== "defineWorkspace"
                    ) {
                        return;
                    }

                    const [firstArgument] = node.arguments;

                    if (
                        firstArgument?.type !== "ArrayExpression" ||
                        firstArgument.elements.length > 0
                    ) {
                        return;
                    }

                    context.report({
                        messageId: "emptyProjects",
                        node: firstArgument,
                    });
                },
                Property(node) {
                    if (
                        !propertyPathEndsWith(
                            getPropertyPath(node),
                            projectsPathSuffix
                        ) ||
                        !isEmptyArrayExpression(node.value)
                    ) {
                        return;
                    }

                    context.report({
                        messageId: "emptyProjects",
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
                    "disallow empty Vitest project lists in `test.projects` and `defineWorkspace`.",
                frozen: false,
                recommended: false,
                requiresTypeChecking: false,
                url: "https://nick2bad4u.github.io/eslint-plugin-vite/docs/rules/no-empty-vitest-projects",
                viteConfigs: [
                    "vite.configs.strict",
                    "vite.configs.all",
                    "vite.configs.configs",
                    "vite.configs.vitest",
                ],
            },
            messages: {
                emptyProjects:
                    "Avoid empty Vitest project lists; an empty project/workspace array usually means no tests will run.",
            },
            schema: [],
            type: "problem",
        },
        name: "no-empty-vitest-projects",
    });

export default noEmptyVitestProjectsRule;
