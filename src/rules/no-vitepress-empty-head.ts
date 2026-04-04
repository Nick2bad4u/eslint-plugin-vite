import type { TSESTree } from "@typescript-eslint/utils";

import { getPropertyPath, propertyPathEndsWith } from "../_internal/ast.js";
import {
    getConfigFileKind,
    normalizeFilename,
} from "../_internal/config-files.js";
import { createTypedRule } from "../_internal/typed-rule.js";

type MessageId = "emptyHead";

const headPathSuffix = ["head"] as const;

const isVitePressConfigFile = (filename: string): boolean => {
    const normalized = normalizeFilename(filename).toLowerCase();

    return /(?:^|\/)\.vitepress\/config\./u.test(normalized);
};

const isEmptyArrayExpression = (
    node: Readonly<TSESTree.Property["value"]>
): boolean => node.type === "ArrayExpression" && node.elements.length === 0;

/** Disallow empty `head` arrays in `.vitepress/config.*`. */
const noVitePressEmptyHeadRule: ReturnType<typeof createTypedRule> =
    createTypedRule<[], MessageId>({
        create(context) {
            if (
                getConfigFileKind(context.filename) === null ||
                !isVitePressConfigFile(context.filename)
            ) {
                return {};
            }

            return {
                Property(node) {
                    if (
                        !propertyPathEndsWith(
                            getPropertyPath(node),
                            headPathSuffix
                        ) ||
                        !isEmptyArrayExpression(node.value)
                    ) {
                        return;
                    }

                    context.report({
                        messageId: "emptyHead",
                        node: node.value,
                    });
                },
            };
        },
        meta: {
            deprecated: false,
            docs: {
                description:
                    "disallow empty `head` arrays in committed VitePress config.",
                frozen: false,
                recommended: false,
                requiresTypeChecking: false,
                url: "https://nick2bad4u.github.io/eslint-plugin-vite/docs/rules/no-vitepress-empty-head",
                viteConfigs: [
                    "vite.configs.strict",
                    "vite.configs.all",
                    "vite.configs.vitepress",
                ],
            },
            messages: {
                emptyHead:
                    "`head` is empty. Remove it or add concrete head entries.",
            },
            schema: [],
            type: "problem",
        },
        name: "no-vitepress-empty-head",
    });

export default noVitePressEmptyHeadRule;
