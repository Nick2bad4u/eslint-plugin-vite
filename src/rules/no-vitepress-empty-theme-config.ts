import type { TSESTree } from "@typescript-eslint/utils";

import { AST_NODE_TYPES } from "@typescript-eslint/utils";

import { getPropertyPath, propertyPathEndsWith } from "../_internal/ast.js";
import {
    getConfigFileKind,
    normalizeFilename,
} from "../_internal/config-files.js";
import { constTuple } from "../_internal/const-tuple.js";
import { createTypedRule } from "../_internal/typed-rule.js";

type MessageId = "emptyThemeConfig";

const themeConfigPathSuffix = constTuple("themeConfig");

const isVitePressConfigFile = (filename: string): boolean => {
    const normalized = normalizeFilename(filename).toLowerCase();

    return /(?:^|\/)\.vitepress\/config\./v.test(normalized);
};

const isEmptyObjectExpression = (
    node: Readonly<TSESTree.Property["value"]>
): boolean =>
    node.type === AST_NODE_TYPES.ObjectExpression &&
    node.properties.length === 0;

/** Disallow empty `themeConfig` objects in `.vitepress/config.*`. */
const noVitePressEmptyThemeConfigRule: ReturnType<typeof createTypedRule> =
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
                            themeConfigPathSuffix
                        ) ||
                        !isEmptyObjectExpression(node.value)
                    ) {
                        return;
                    }

                    context.report({
                        messageId: "emptyThemeConfig",
                        node: node.value,
                    });
                },
            };
        },
        meta: {
            deprecated: false,
            docs: {
                description:
                    "disallow empty `themeConfig` objects in committed VitePress config.",
                frozen: false,
                recommended: false,
                requiresTypeChecking: false,
                url: "https://nick2bad4u.github.io/eslint-plugin-vite/docs/rules/no-vitepress-empty-theme-config",
                viteConfigs: [
                    "vite.configs.strict",
                    "vite.configs.all",
                    "vite.configs.vitepress",
                ],
            },
            messages: {
                emptyThemeConfig:
                    "`themeConfig` is empty. Remove it or configure concrete theme options.",
            },
            schema: [],
            type: "problem",
        },
        name: "no-vitepress-empty-theme-config",
    });

export default noVitePressEmptyThemeConfigRule;
