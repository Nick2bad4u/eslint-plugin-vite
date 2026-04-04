import type { TSESTree } from "@typescript-eslint/utils";

import { getPropertyPath, propertyPathEndsWith } from "../_internal/ast.js";
import { getConfigFileKind } from "../_internal/config-files.js";
import { createTypedRule } from "../_internal/typed-rule.js";

type MessageId = "disabledIsolation";

const isolatePathSuffix = ["test", "isolate"] as const;

const isBooleanLiteral = (
    node: Readonly<TSESTree.Property["value"]>,
    expected: boolean
): boolean => node.type === "Literal" && node.value === expected;

/** Disallow disabling Vitest per-file isolation in committed configuration. */
const noDisabledVitestIsolationRule: ReturnType<typeof createTypedRule> =
    createTypedRule<[], MessageId>({
        create(context) {
            if (getConfigFileKind(context.filename) === null) {
                return {};
            }

            return {
                Property(node) {
                    const propertyPath = getPropertyPath(node);

                    if (
                        !propertyPathEndsWith(
                            propertyPath,
                            isolatePathSuffix
                        ) ||
                        !isBooleanLiteral(node.value, false)
                    ) {
                        return;
                    }

                    context.report({
                        messageId: "disabledIsolation",
                        node: node.value,
                    });
                },
            };
        },
        meta: {
            deprecated: false,
            docs: {
                description:
                    "disallow `test.isolate: false` in Vitest configuration to avoid cross-file state leakage.",
                frozen: false,
                recommended: false,
                requiresTypeChecking: false,
                url: "https://nick2bad4u.github.io/eslint-plugin-vite/docs/rules/no-disabled-vitest-isolation",
                viteConfigs: [
                    "vite.configs.strict",
                    "vite.configs.all",
                    "vite.configs.configs",
                    "vite.configs.vitest",
                ],
            },
            messages: {
                disabledIsolation:
                    "Avoid `test.isolate: false`; disabled isolation can leak runtime state across files and make failures order-dependent.",
            },
            schema: [],
            type: "problem",
        },
        name: "no-disabled-vitest-isolation",
    });

export default noDisabledVitestIsolationRule;
