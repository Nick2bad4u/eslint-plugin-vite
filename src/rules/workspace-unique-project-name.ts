import type { TSESTree } from "@typescript-eslint/utils";

import { getConfigFileKind } from "../_internal/config-files.js";
import { createTypedRule } from "../_internal/typed-rule.js";
import {
    getInlineVitestProjectEntries,
    getStaticVitestProjectName,
    getVitestProjectNameProperty,
    isVitestProjectsProperty,
} from "../_internal/vitest-projects.js";

/** Require each literal Vitest workspace project name to be unique. */
const workspaceUniqueProjectNameRule: ReturnType<typeof createTypedRule> =
    createTypedRule<[], "duplicateProjectName">({
        create(context) {
            if (getConfigFileKind(context.filename) === null) {
                return {};
            }

            const reportDuplicateNames = (
                projectEntries: ReturnType<typeof getInlineVitestProjectEntries>
            ): void => {
                const seenProjectNames = new Map<string, TSESTree.Node>();

                for (const projectEntry of projectEntries) {
                    const name = getStaticVitestProjectName(
                        projectEntry.projectObject
                    );

                    if (name === undefined) {
                        continue;
                    }

                    const existingNode = seenProjectNames.get(name);
                    const nameProperty = getVitestProjectNameProperty(
                        projectEntry.projectObject
                    );

                    if (nameProperty === undefined) {
                        continue;
                    }

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
            };

            return {
                CallExpression(node) {
                    if (
                        node.callee.type !== "Identifier" ||
                        node.callee.name !== "defineWorkspace" ||
                        node.arguments[0]?.type !== "ArrayExpression"
                    ) {
                        return;
                    }

                    reportDuplicateNames(
                        getInlineVitestProjectEntries(
                            node.arguments[0],
                            "workspace"
                        )
                    );
                },
                Property(node) {
                    if (
                        !isVitestProjectsProperty(node) ||
                        node.value.type !== "ArrayExpression"
                    ) {
                        return;
                    }

                    reportDuplicateNames(
                        getInlineVitestProjectEntries(node.value, "projects")
                    );
                },
            };
        },
        meta: {
            deprecated: false,
            docs: {
                description:
                    "require every statically readable inline Vitest project name to be unique.",
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
