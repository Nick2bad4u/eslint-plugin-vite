import type { TSESTree } from "@typescript-eslint/utils";

import { getPropertyPath, propertyPathEndsWith } from "../_internal/ast.js";
import { getConfigFileKind } from "../_internal/config-files.js";
import { createTypedRule } from "../_internal/typed-rule.js";

type MessageId = "emptySsrNoExternal";

const ssrNoExternalPathSuffix = ["ssr", "noExternal"] as const;

const isEmptyStaticArray = (
    node: Readonly<TSESTree.Property["value"]>
): boolean => node.type === "ArrayExpression" && node.elements.length === 0;

/** Disallow `ssr.noExternal: []` in Vite config files. */
const noEmptySsrNoExternalRule: ReturnType<typeof createTypedRule> =
    createTypedRule<[], MessageId>({
        create(context) {
            if (getConfigFileKind(context.filename) === null) {
                return {};
            }

            return {
                Property(node) {
                    if (
                        !propertyPathEndsWith(
                            getPropertyPath(node),
                            ssrNoExternalPathSuffix
                        ) ||
                        !isEmptyStaticArray(node.value)
                    ) {
                        return;
                    }

                    context.report({
                        messageId: "emptySsrNoExternal",
                        node: node.value,
                    });
                },
            };
        },
        meta: {
            deprecated: false,
            docs: {
                description:
                    "disallow empty `ssr.noExternal` arrays in committed Vite config.",
                frozen: false,
                recommended: false,
                requiresTypeChecking: false,
                url: "https://nick2bad4u.github.io/eslint-plugin-vite/docs/rules/no-empty-ssr-noexternal",
                viteConfigs: [
                    "vite.configs.strict",
                    "vite.configs.all",
                    "vite.configs.configs",
                ],
            },
            messages: {
                emptySsrNoExternal:
                    "`ssr.noExternal` is empty. Remove it or provide explicit package names/patterns.",
            },
            schema: [],
            type: "problem",
        },
        name: "no-empty-ssr-noexternal",
    });

export default noEmptySsrNoExternalRule;
