import type { TSESLint, TSESTree } from "@typescript-eslint/utils";

import {
    getStaticPropertyName,
    getStaticStringValue,
} from "../_internal/ast.js";
import { isConfigFile } from "../_internal/config-files.js";
import { createTypedRule } from "../_internal/typed-rule.js";

const isRelativeReplacementString = (
    node: Readonly<TSESTree.Property["value"]>
): boolean => {
    if (node.type !== "Literal" && node.type !== "TemplateLiteral") {
        return false;
    }

    const value = getStaticStringValue(node);

    return value !== undefined && /^\.{1,2}(?:\/|\\|$)/u.test(value);
};

const reportIfRelativeReplacement = (
    context: Readonly<TSESLint.RuleContext<"relativeAliasReplacement", []>>,
    valueNode: Readonly<TSESTree.Property["value"]>
): void => {
    if (!isRelativeReplacementString(valueNode)) {
        return;
    }

    context.report({
        messageId: "relativeAliasReplacement",
        node: valueNode,
    });
};

const isResolveAliasProperty = (node: Readonly<TSESTree.Property>): boolean =>
    getStaticPropertyName(node) === "alias" &&
    node.parent.type === "ObjectExpression" &&
    node.parent.parent?.type === "Property" &&
    getStaticPropertyName(node.parent.parent) === "resolve";

const reportObjectAliasReplacements = (
    context: Readonly<TSESLint.RuleContext<"relativeAliasReplacement", []>>,
    aliasObject: Readonly<TSESTree.ObjectExpression>
): void => {
    for (const property of aliasObject.properties) {
        if (property.type === "Property") {
            reportIfRelativeReplacement(context, property.value);
        }
    }
};

const reportArrayAliasReplacements = (
    context: Readonly<TSESLint.RuleContext<"relativeAliasReplacement", []>>,
    aliasArray: Readonly<TSESTree.ArrayExpression>
): void => {
    for (const element of aliasArray.elements) {
        if (element?.type !== "ObjectExpression") {
            continue;
        }

        for (const property of element.properties) {
            if (
                property.type !== "Property" ||
                getStaticPropertyName(property) !== "replacement"
            ) {
                continue;
            }

            reportIfRelativeReplacement(context, property.value);
        }
    }
};

/** Disallow relative filesystem replacements inside `resolve.alias`. */
const noRelativeResolveAliasRule: ReturnType<typeof createTypedRule> =
    createTypedRule<[], "relativeAliasReplacement">({
        create(context) {
            if (!isConfigFile(context.filename)) {
                return {};
            }

            return {
                Property(node) {
                    if (!isResolveAliasProperty(node)) {
                        return;
                    }

                    if (node.value.type === "ObjectExpression") {
                        reportObjectAliasReplacements(context, node.value);

                        return;
                    }

                    if (node.value.type !== "ArrayExpression") {
                        return;
                    }

                    reportArrayAliasReplacements(context, node.value);
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
