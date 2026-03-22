import {
    getStaticPropertyName,
    getStaticStringValue,
} from "../_internal/ast.js";
import { isConfigFile } from "../_internal/config-files.js";
import { createTypedRule } from "../_internal/typed-rule.js";

/** Disallow empty `envPrefix` values that expose every environment variable. */
const noEmptyEnvPrefixRule: ReturnType<typeof createTypedRule> =
    createTypedRule<[], "emptyEnvPrefix">({
        create(context) {
            if (!isConfigFile(context.filename)) {
                return {};
            }

            return {
                Property(node) {
                    if (getStaticPropertyName(node) !== "envPrefix") {
                        return;
                    }

                    if (
                        (node.value.type === "Literal" ||
                            node.value.type === "TemplateLiteral") &&
                        getStaticStringValue(node.value) === ""
                    ) {
                        context.report({
                            messageId: "emptyEnvPrefix",
                            node: node.value,
                        });
                        return;
                    }

                    if (node.value.type !== "ArrayExpression") {
                        return;
                    }

                    for (const element of node.value.elements) {
                        if (
                            element !== null &&
                            (element.type === "Literal" ||
                                element.type === "TemplateLiteral") &&
                            getStaticStringValue(element) === ""
                        ) {
                            context.report({
                                messageId: "emptyEnvPrefix",
                                node: element,
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
                    "disallow empty `envPrefix` values that would expose every environment variable to `import.meta.env`.",
                frozen: false,
                recommended: true,
                requiresTypeChecking: false,
                url: "https://nick2bad4u.github.io/eslint-plugin-vite/docs/rules/no-empty-env-prefix",
                viteConfigs: [
                    "vite.configs.recommended",
                    "vite.configs.strict",
                    "vite.configs.all",
                    "vite.configs.configs",
                    "vite.configs.vitepress",
                ],
            },
            messages: {
                emptyEnvPrefix:
                    "Do not use an empty `envPrefix`; it exposes every environment variable to client-side code.",
            },
            schema: [],
            type: "problem",
        },
        name: "no-empty-env-prefix",
    });

export default noEmptyEnvPrefixRule;
