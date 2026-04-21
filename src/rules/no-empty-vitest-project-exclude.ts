import type { TSESTree } from "@typescript-eslint/utils";

import { isPresent } from "ts-extras";

import { getStaticPropertyName } from "../_internal/ast.js";
import { getConfigFileKind } from "../_internal/config-files.js";
import { createTypedRule } from "../_internal/typed-rule.js";

type MessageId = "emptyProjectExclude";

const isEmptyArrayExpression = (
    node: Readonly<TSESTree.Property["value"]>
): node is TSESTree.ArrayExpression =>
    node.type === "ArrayExpression" && node.elements.length === 0;

const hasAncestorPropertyName = (
    node: Readonly<TSESTree.Node>,
    propertyName: string
): boolean => {
    let current = node.parent;

    while (isPresent(current)) {
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

    while (isPresent(current)) {
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

/**
 * Disallow empty project-level Vitest `test.exclude` arrays in workspace and
 * project entries.
 */
const noEmptyVitestProjectExcludeRule: ReturnType<typeof createTypedRule> =
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
                        (!hasAncestorPropertyName(node, "projects") &&
                            !hasAncestorDefineWorkspaceCall(node)) ||
                        !isEmptyArrayExpression(node.value)
                    ) {
                        return;
                    }

                    context.report({
                        messageId: "emptyProjectExclude",
                        node: node.value,
                    });
                },
            };
        },
        meta: {
            deprecated: false,
            docs: {
                description:
                    "disallow empty project-level Vitest `test.exclude` arrays in workspace/project entries.",
                frozen: false,
                recommended: false,
                requiresTypeChecking: false,
                url: "https://nick2bad4u.github.io/eslint-plugin-vite/docs/rules/no-empty-vitest-project-exclude",
                viteConfigs: [
                    "vite.configs.strict",
                    "vite.configs.all",
                    "vite.configs.configs",
                    "vite.configs.vitest",
                ],
            },
            messages: {
                emptyProjectExclude:
                    "Avoid empty project `test.exclude` arrays; they are typically redundant and suggest incomplete project filtering setup.",
            },
            schema: [],
            type: "problem",
        },
        name: "no-empty-vitest-project-exclude",
    });

export default noEmptyVitestProjectExcludeRule;
