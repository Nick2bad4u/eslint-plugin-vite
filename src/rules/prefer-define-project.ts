import { createTypedRule } from "../_internal/typed-rule.js";

const preferDefineProjectRule: ReturnType<typeof createTypedRule> =
    createTypedRule<[], "preferDefineProject">({
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

                    for (const element of node.arguments[0].elements) {
                        if (
                            element?.type === "CallExpression" &&
                            element.callee.type === "Identifier" &&
                            element.callee.name === "defineConfig"
                        ) {
                            context.report({
                                messageId: "preferDefineProject",
                                node: element.callee,
                            });
                        }
                    }
                },
            };
        },
        defaultOptions: [],
        meta: {
            deprecated: false,
            docs: {
                description:
                    "prefer `defineProject(...)` over `defineConfig(...)` for inline Vitest workspace projects.",
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
