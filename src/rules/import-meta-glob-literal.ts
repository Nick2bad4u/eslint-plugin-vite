import type { TSESTree } from "@typescript-eslint/utils";

import {
    getStaticStringValue,
    isImportMetaGlobMemberExpression,
} from "../_internal/ast.js";
import { createTypedRule } from "../_internal/typed-rule.js";

const isStaticPatternNode = (
    node: Readonly<TSESTree.CallExpression["arguments"][number]>
): boolean => {
    if (node.type === "Literal" || node.type === "TemplateLiteral") {
        return getStaticStringValue(node) !== undefined;
    }

    return false;
};

const isStaticGlobPatternArgument = (
    node: Readonly<TSESTree.CallExpression["arguments"][number]> | undefined
): boolean => {
    if (node === undefined) {
        return false;
    }

    if (node.type === "ArrayExpression") {
        return node.elements.every(
            (element) => element !== null && isStaticPatternNode(element)
        );
    }

    return isStaticPatternNode(node);
};

/** Require `import.meta.glob()` patterns to stay statically analyzable. */
const importMetaGlobLiteralRule: ReturnType<typeof createTypedRule> =
    createTypedRule<[], "literalPattern">({
        create(context) {
            return {
                CallExpression(node) {
                    if (!isImportMetaGlobMemberExpression(node.callee)) {
                        return;
                    }

                    if (isStaticGlobPatternArgument(node.arguments[0])) {
                        return;
                    }

                    context.report({
                        messageId: "literalPattern",
                        node: node.arguments[0] ?? node,
                    });
                },
            };
        },
        defaultOptions: [],
        meta: {
            deprecated: false,
            docs: {
                description:
                    "require `import.meta.glob()` to use string literals or arrays of string literals for its glob patterns.",
                frozen: false,
                recommended: true,
                requiresTypeChecking: false,
                url: "https://nick2bad4u.github.io/eslint-plugin-vite/docs/rules/import-meta-glob-literal",
                viteConfigs: [
                    "vite.configs.recommended",
                    "vite.configs.strict",
                    "vite.configs.all",
                    "vite.configs.client",
                    "vite.configs.vitepress",
                ],
            },
            messages: {
                literalPattern:
                    "`import.meta.glob()` only accepts static string patterns or arrays of static string patterns.",
            },
            schema: [],
            type: "problem",
        },
        name: "import-meta-glob-literal",
    });

export default importMetaGlobLiteralRule;
