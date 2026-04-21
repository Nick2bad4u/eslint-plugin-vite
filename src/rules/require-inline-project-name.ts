import { arrayFirst } from "ts-extras";

import { getConfigFileKind } from "../_internal/config-files.js";
import { createTypedRule } from "../_internal/typed-rule.js";
import {
    getInlineVitestProjectEntries,
    hasVitestProjectName,
    isVitestProjectsProperty,
} from "../_internal/vitest-projects.js";

type MessageId = "requireInlineProjectName";

/**
 * Require inline Vitest workspace and project entries to declare a project
 * name.
 */
const requireInlineProjectNameRule: ReturnType<typeof createTypedRule> =
    createTypedRule<[], MessageId>({
        create(context) {
            if (getConfigFileKind(context.filename) === null) {
                return {};
            }

            const reportUnnamedProjects = (
                projectEntries: ReturnType<typeof getInlineVitestProjectEntries>
            ): void => {
                for (const projectEntry of projectEntries) {
                    if (hasVitestProjectName(projectEntry.projectObject)) {
                        continue;
                    }

                    context.report({
                        messageId: "requireInlineProjectName",
                        node: projectEntry.projectObject,
                    });
                }
            };

            return {
                CallExpression(node) {
                    const firstArgument = arrayFirst(node.arguments);

                    if (
                        node.callee.type !== "Identifier" ||
                        node.callee.name !== "defineWorkspace" ||
                        firstArgument?.type !== "ArrayExpression"
                    ) {
                        return;
                    }

                    reportUnnamedProjects(
                        getInlineVitestProjectEntries(
                            firstArgument,
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

                    reportUnnamedProjects(
                        getInlineVitestProjectEntries(node.value, "projects")
                    );
                },
            };
        },
        meta: {
            deprecated: false,
            docs: {
                description:
                    "require inline Vitest project definitions to declare a project name so project labels and `--project` targeting stay stable.",
                frozen: false,
                recommended: true,
                requiresTypeChecking: false,
                url: "https://nick2bad4u.github.io/eslint-plugin-vite/docs/rules/require-inline-project-name",
                viteConfigs: [
                    "vite.configs.recommended",
                    "vite.configs.strict",
                    "vite.configs.all",
                    "vite.configs.vitest",
                ],
            },
            messages: {
                requireInlineProjectName:
                    "Inline Vitest project definitions should declare a project name, usually under `test.name`, so project output and `--project` filtering stay stable.",
            },
            schema: [],
            type: "suggestion",
        },
        name: "require-inline-project-name",
    });

export default requireInlineProjectNameRule;
