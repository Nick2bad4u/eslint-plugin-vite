import { getConfigFileKind } from "../_internal/config-files.js";
import { createTypedRule } from "../_internal/typed-rule.js";
import {
    getInlineVitestProjectEntries,
    getVitestProjectFactoryCallName,
    isVitestProjectsProperty,
} from "../_internal/vitest-projects.js";

/** Require inline Vitest workspace projects to use `defineProject(...)`. */
const preferDefineProjectRule: ReturnType<typeof createTypedRule> =
    createTypedRule<[], "preferDefineProject">({
        create(context) {
            if (getConfigFileKind(context.filename) === null) {
                return {};
            }

            const reportDefineConfigProjects = (
                projectEntries: ReturnType<typeof getInlineVitestProjectEntries>
            ): void => {
                for (const projectEntry of projectEntries) {
                    if (
                        getVitestProjectFactoryCallName(projectEntry) !==
                        "defineConfig"
                    ) {
                        continue;
                    }

                    if (projectEntry.entryNode.type !== "CallExpression") {
                        continue;
                    }

                    context.report({
                        messageId: "preferDefineProject",
                        node: projectEntry.entryNode.callee,
                    });
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

                    reportDefineConfigProjects(
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

                    reportDefineConfigProjects(
                        getInlineVitestProjectEntries(node.value, "projects")
                    );
                },
            };
        },
        meta: {
            deprecated: false,
            docs: {
                description:
                    "require inline Vitest project entries to use `defineProject(...)` instead of `defineConfig(...)`.",
                frozen: false,
                recommended: false,
                requiresTypeChecking: false,
                url: "https://nick2bad4u.github.io/eslint-plugin-vite/docs/rules/prefer-define-project",
                viteConfigs: [
                    "vite.configs.strict",
                    "vite.configs.all",
                    "vite.configs.vitest",
                ],
            },
            messages: {
                preferDefineProject:
                    "Use `defineProject(...)` for inline Vitest workspace projects so the workspace API and supported project options stay explicit.",
            },
            schema: [],
            type: "suggestion",
        },
        name: "prefer-define-project",
    });

export default preferDefineProjectRule;
