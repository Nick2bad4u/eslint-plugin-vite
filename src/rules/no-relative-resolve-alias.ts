import type { TSESLint, TSESTree } from "@typescript-eslint/utils";

import {
    getStaticPropertyName,
    getStaticStringValue,
} from "../_internal/ast.js";
import { isConfigFile } from "../_internal/config-files.js";
import { createTypedRule } from "../_internal/typed-rule.js";

const isRelativeReplacementString = (
    node: TSESTree.Property["value"]
): boolean => {
    if (node.type !== "Literal" && node.type !== "TemplateLiteral") {
        return false;
    }

    const value = getStaticStringValue(node);

    return value !== undefined && /^\.{1,2}(?:\/|\\|$)/u.test(value);
};

const reportIfRelativeReplacement = (
    context: Readonly<TSESLint.RuleContext<"relativeAliasReplacement", []>>,
    valueNode: TSESTree.Property["value"]
): void => {
    if (!isRelativeReplacementString(valueNode)) {
        return;
    }

    context.report({
        messageId: "relativeAliasReplacement",
        node: valueNode,
    });
};

const noRelativeResolveAliasRule: ReturnType<typeof createTypedRule> =
    createTypedRule<[], "relativeAliasReplacement">({
        create(context) {
            if (!isConfigFile(context.filename)) {
                return {};
            }

            return {
                Property(node) {
                    if (getStaticPropertyName(node) !== "alias") {
                        return;
                    }

                    if (
                        node.parent.type !== "ObjectExpression" ||
                        node.parent.parent?.type !== "Property" ||
                        getStaticPropertyName(node.parent.parent) !== "resolve"
                    ) {
                        return;
                    }

                    if (node.value.type === "ObjectExpression") {
                        for (const property of node.value.properties) {
                            if (property.type === "Property") {
                                reportIfRelativeReplacement(
                                    context,
                                    property.value
                                );
                            }
                        }

                        return;
                    }

                    if (node.value.type !== "ArrayExpression") {
                        return;
                    }

                    for (const element of node.value.elements) {
                        if (element?.type !== "ObjectExpression") {
                            continue;
                        }

                        for (const property of element.properties) {
                            if (
                                property.type !== "Property" ||
                                getStaticPropertyName(property) !==
                                    "replacement"
                            ) {
                                continue;
                            }

                            reportIfRelativeReplacement(
                                context,
                                property.value
                            );
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
                    "disallow relative string replacements in `resolve.alias` because Vite expects filesystem aliases to use absolute paths.",
                frozen: false,
                recommended: true,
                requiresTypeChecking: false,
                url: "https://nick2bad4u.github.io/eslint-plugin-vite/docs/rules/no-relative-resolve-alias",
                viteConfigs: [
                    "vite.configs.recommended",
                    "vite.configs.strict",
                    "vite.configs.all",
                    "vite.configs.configs",
                ],
            },
            messages: {
                relativeAliasReplacement:
                    "Use an absolute replacement path in `resolve.alias`; Vite does not resolve relative filesystem aliases the way Node import specifiers do.",
            },
            schema: [],
            type: "problem",
        },
        name: "no-relative-resolve-alias",
    });

export default noRelativeResolveAliasRule;
