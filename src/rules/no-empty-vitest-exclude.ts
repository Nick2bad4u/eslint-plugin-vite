import type { TSESTree } from "@typescript-eslint/utils";

import { getStaticPropertyName } from "../_internal/ast.js";
import { getConfigFileKind } from "../_internal/config-files.js";
import { createTypedRule } from "../_internal/typed-rule.js";

type MessageId = "emptyExclude";

const isEmptyArrayExpression = (
    node: Readonly<TSESTree.Property["value"]>
): node is TSESTree.ArrayExpression =>
    node.type === "ArrayExpression" && node.elements.length === 0;

const hasAncestorProjectsProperty = (
    node: Readonly<TSESTree.Node>
): boolean => {
    let current = node.parent;

    while (current !== undefined && current !== null) {
        if (
            current.type === "Property" &&
            getStaticPropertyName(current) === "projects"
        ) {
            return true;
        }

        current = current.parent;
    }

    return false;
};

const hasAncestorPropertyName = (
    node: Readonly<TSESTree.Node>,
    propertyName: string
): boolean => {
    let current = node.parent;

    while (current !== undefined && current !== null) {
        if (
            current.type === "Property" &&
            getStaticPropertyName(current) === propertyName
        ) {
            return true;
        }

        current = current.parent;
    }

    return false;
};

const hasAncestorDefineWorkspaceCall = (
    node: Readonly<TSESTree.Node>
): boolean => {
    let current = node.parent;

    while (current !== undefined && current !== null) {
        if (
            current.type === "CallExpression" &&
            current.callee.type === "Identifier" &&
            current.callee.name === "defineWorkspace"
        ) {
            return true;
        }

        current = current.parent;
    }

    return false;
};

/** Disallow empty root-level Vitest `test.exclude` arrays. */
const noEmptyVitestExcludeRule: ReturnType<typeof createTypedRule> =
    createTypedRule<[], MessageId>({
        create(context) {
            if (getConfigFileKind(context.filename) === null) {
                return {};
            }

            return {
                Property(node) {
                    if (
                        getStaticPropertyName(node) !== "exclude" ||
                        !hasAncestorPropertyName(node, "test") ||
                        hasAncestorPropertyName(node, "benchmark") ||
                        hasAncestorProjectsProperty(node) ||
                        hasAncestorDefineWorkspaceCall(node) ||
                        !isEmptyArrayExpression(node.value)
                    ) {
                        return;
                    }

                    context.report({
                        messageId: "emptyExclude",
                        node: node.value,
                    });
                },
            };
        },
        meta: {
            deprecated: false,
            docs: {
                description:
                    "disallow empty root-level Vitest `test.exclude` arrays that provide no filtering value.",
                frozen: false,
                recommended: false,
                requiresTypeChecking: false,
                url: "https://nick2bad4u.github.io/eslint-plugin-vite/docs/rules/no-empty-vitest-exclude",
                viteConfigs: [
                    "vite.configs.strict",
                    "vite.configs.all",
                    "vite.configs.configs",
                    "vite.configs.vitest",
                ],
            },
            messages: {
                emptyExclude:
                    "Avoid `test.exclude: []`; an empty exclude list is usually a no-op configuration artifact.",
            },
            schema: [],
            type: "problem",
        },
        name: "no-empty-vitest-exclude",
    });

export default noEmptyVitestExcludeRule;
