import type { TSESTree } from "@typescript-eslint/utils";

import { getStaticPropertyName } from "../_internal/ast.js";
import { getConfigFileKind } from "../_internal/config-files.js";
import { createTypedRule } from "../_internal/typed-rule.js";

type MessageId = "mixedWorkspaceAndProjects";

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

/**
 * Disallow combining `defineWorkspace(...)` with `test.projects` in the same
 * file.
 */
const noMixedDefineWorkspaceAndTestProjectsRule: ReturnType<
    typeof createTypedRule
> = createTypedRule<[], MessageId>({
    create(context) {
        if (getConfigFileKind(context.filename) === null) {
            return {};
        }

        let hasDefineWorkspace = false;
        let hasTestProjects = false;
        let reported = false;

        const reportMixedUsage = (node: Readonly<TSESTree.Node>): void => {
            if (reported) {
                return;
            }

            reported = true;

            context.report({
                messageId: "mixedWorkspaceAndProjects",
                node,
            });
        };

        return {
            CallExpression(node) {
                if (
                    node.callee.type !== "Identifier" ||
                    node.callee.name !== "defineWorkspace"
                ) {
                    return;
                }

                hasDefineWorkspace = true;

                if (hasTestProjects) {
                    reportMixedUsage(node.callee);
                }
            },
            Property(node) {
                if (
                    getStaticPropertyName(node) !== "projects" ||
                    !hasAncestorPropertyName(node, "test")
                ) {
                    return;
                }

                hasTestProjects = true;

                if (hasDefineWorkspace) {
                    reportMixedUsage(node.key);
                }
            },
        };
    },
    defaultOptions: [],
    meta: {
        deprecated: false,
        docs: {
            description:
                "disallow mixing `defineWorkspace(...)` and `test.projects` in the same config file.",
            frozen: false,
            recommended: false,
            requiresTypeChecking: false,
            url: "https://nick2bad4u.github.io/eslint-plugin-vite/docs/rules/no-mixed-defineworkspace-and-test-projects",
            viteConfigs: [
                "vite.configs.strict",
                "vite.configs.all",
                "vite.configs.configs",
                "vite.configs.vitest",
            ],
        },
        messages: {
            mixedWorkspaceAndProjects:
                "Avoid combining `defineWorkspace(...)` with `test.projects` in one file; pick a single project-topology approach.",
        },
        schema: [],
        type: "problem",
    },
    name: "no-mixed-defineworkspace-and-test-projects",
});

export default noMixedDefineWorkspaceAndTestProjectsRule;
