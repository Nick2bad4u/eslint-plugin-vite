import type { TSESTree } from "@typescript-eslint/utils";

import { getPropertyPath, propertyPathEndsWith } from "../_internal/ast.js";
import { getConfigFileKind } from "../_internal/config-files.js";
import { createTypedRule } from "../_internal/typed-rule.js";

type MessageId = "emptySsrExternal";

const ssrExternalPathSuffix = ["ssr", "external"] as const;

const isEmptyStaticArray = (
    node: Readonly<TSESTree.Property["value"]>
): boolean => node.type === "ArrayExpression" && node.elements.length === 0;

/** Disallow `ssr.external: []` in Vite config files. */
const noEmptySsrExternalRule: ReturnType<typeof createTypedRule> =
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
                            ssrExternalPathSuffix
                        ) ||
                        !isEmptyStaticArray(node.value)
                    ) {
                        return;
                    }

                    context.report({
                        messageId: "emptySsrExternal",
                        node: node.value,
                    });
                },
            };
        },
        defaultOptions: [],
        meta: {
            deprecated: false,
            docs: {
                description:
                    "disallow empty `ssr.external` arrays in committed Vite config.",
                frozen: false,
                recommended: false,
                requiresTypeChecking: false,
                url: "https://nick2bad4u.github.io/eslint-plugin-vite/docs/rules/no-empty-ssr-external",
                viteConfigs: [
                    "vite.configs.strict",
                    "vite.configs.all",
                    "vite.configs.configs",
                ],
            },
            messages: {
                emptySsrExternal:
                    "`ssr.external` is empty. Remove it or provide explicit package names/patterns.",
            },
            schema: [],
            type: "problem",
        },
        name: "no-empty-ssr-external",
    });

export default noEmptySsrExternalRule;
