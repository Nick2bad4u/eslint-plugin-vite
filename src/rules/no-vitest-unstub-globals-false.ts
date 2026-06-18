import type { TSESTree } from "@typescript-eslint/utils";

import { AST_NODE_TYPES } from "@typescript-eslint/utils";

import { getPropertyPath, propertyPathEndsWith } from "../_internal/ast.js";
import { getConfigFileKind } from "../_internal/config-files.js";
import { constTuple } from "../_internal/const-tuple.js";
import { createTypedRule } from "../_internal/typed-rule.js";

type MessageId = "unstubGlobalsFalse";

const unstubGlobalsPathSuffix = constTuple("test", "unstubGlobals");

const isBooleanLiteral = (
    node: Readonly<TSESTree.Property["value"]>,
    isExpectedValue: boolean
): boolean => node.type === AST_NODE_TYPES.Literal && node.value === isExpectedValue;

/** Disallow `test.unstubGlobals: false` in committed Vitest config. */
const noVitestUnstubGlobalsFalseRule: ReturnType<typeof createTypedRule> =
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
                            unstubGlobalsPathSuffix
                        ) ||
                        !isBooleanLiteral(node.value, false)
                    ) {
                        return;
                    }

                    context.report({
                        messageId: "unstubGlobalsFalse",
                        node: node.value,
                    });
                },
            };
        },
        meta: {
            deprecated: false,
            docs: {
                description:
                    "disallow `test.unstubGlobals: false` in committed Vitest config.",
                frozen: false,
                recommended: false,
                requiresTypeChecking: false,
                url: "https://nick2bad4u.github.io/eslint-plugin-vite/docs/rules/no-vitest-unstub-globals-false",
                viteConfigs: [
                    "vite.configs.strict",
                    "vite.configs.all",
                    "vite.configs.configs",
                    "vite.configs.vitest",
                ],
            },
            messages: {
                unstubGlobalsFalse:
                    "Avoid `test.unstubGlobals: false`; restoring stubbed globals helps prevent cross-test global-state leakage.",
            },
            schema: [],
            type: "problem",
        },
        name: "no-vitest-unstub-globals-false",
    });

export default noVitestUnstubGlobalsFalseRule;
