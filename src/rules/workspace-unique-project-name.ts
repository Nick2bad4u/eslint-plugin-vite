import type { TSESTree } from "@typescript-eslint/utils";

import { findPropertyByName, getStaticStringValue } from "../_internal/ast.js";
import { createTypedRule } from "../_internal/typed-rule.js";

const getWorkspaceProjectObject = (
    element: Readonly<TSESTree.ArrayExpression["elements"][number]>
): TSESTree.ObjectExpression | undefined => {
    if (element === null) {
        return undefined;
    }

    if (element.type === "ObjectExpression") {
        return element;
    }

    if (
        element.type === "CallExpression" &&
        element.arguments[0]?.type === "ObjectExpression"
    ) {
        return element.arguments[0];
    }

    return undefined;
};

/** Require each literal Vitest workspace project name to be unique. */
const workspaceUniqueProjectNameRule: ReturnType<typeof createTypedRule> =
    createTypedRule<[], "duplicateProjectName">({
        create(context) {
            return {
                CallExpression(node) {
                    if (
                        node.callee.type !== "Identifier" ||
                        node.callee.name !== "defineWorkspace" ||
                        node.arguments[0]?.type !== "ArrayExpression"
                    ) {
                        return;
                    }

                    const seenProjectNames = new Map<string, TSESTree.Node>();

                    for (const element of node.arguments[0].elements) {
                        const projectObject =
                            getWorkspaceProjectObject(element);

                        if (projectObject === undefined) {
                            continue;
                        }

                        const nameProperty = findPropertyByName(
                            projectObject,
                            "name"
                        );

                        if (nameProperty?.value.type === undefined) {
                            continue;
                        }

                        if (
                            nameProperty.value.type !== "Literal" &&
                            nameProperty.value.type !== "TemplateLiteral"
                        ) {
                            continue;
                        }

                        const name = getStaticStringValue(nameProperty.value);

                        if (name === undefined) {
                            continue;
                        }

                        const existingNode = seenProjectNames.get(name);

                        if (existingNode !== undefined) {
                            context.report({
                                data: {
                                    name,
                                },
                                messageId: "duplicateProjectName",
                                node: nameProperty.value,
                            });
                            continue;
                        }

                        seenProjectNames.set(name, nameProperty.value);
                    }
                },
            };
        },
        defaultOptions: [],
        meta: {
            deprecated: false,
            docs: {
                description:
                    "require every literal Vitest workspace project name to be unique.",
                frozen: false,
                recommended: true,
                requiresTypeChecking: false,
                url: "https://nick2bad4u.github.io/eslint-plugin-vite/docs/rules/workspace-unique-project-name",
                viteConfigs: [
                    "vite.configs.recommended",
                    "vite.configs.strict",
                    "vite.configs.all",
                    "vite.configs.vitest",
                ],
            },
            messages: {
                duplicateProjectName:
                    "Vitest workspace project name '{{ name }}' is duplicated; workspace project names must be unique.",
            },
            schema: [],
            type: "problem",
        },
        name: "workspace-unique-project-name",
    });

export default workspaceUniqueProjectNameRule;
