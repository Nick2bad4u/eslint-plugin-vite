import type { TSESTree } from "@typescript-eslint/utils";

import { getPropertyPath, propertyPathEndsWith } from "../_internal/ast.js";
import { getConfigFileKind } from "../_internal/config-files.js";
import { createTypedRule } from "../_internal/typed-rule.js";

type MessageId = "zeroSlowTestThreshold";

const slowTestThresholdPathSuffix = ["test", "slowTestThreshold"] as const;

const isNumberLiteral = (
    node: Readonly<TSESTree.Property["value"]>,
    expected: number
): boolean => node.type === "Literal" && node.value === expected;

/** Disallow disabling Vitest slow-test reporting by setting threshold to `0`. */
const noZeroVitestSlowTestThresholdRule: ReturnType<typeof createTypedRule> =
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
                            slowTestThresholdPathSuffix
                        ) ||
                        !isNumberLiteral(node.value, 0)
                    ) {
                        return;
                    }

                    context.report({
                        messageId: "zeroSlowTestThreshold",
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
                    "disallow `test.slowTestThreshold: 0` in Vitest configuration so slow-test signal remains visible.",
                frozen: false,
                recommended: false,
                requiresTypeChecking: false,
                url: "https://nick2bad4u.github.io/eslint-plugin-vite/docs/rules/no-zero-vitest-slow-test-threshold",
                viteConfigs: [
                    "vite.configs.strict",
                    "vite.configs.all",
                    "vite.configs.configs",
                    "vite.configs.vitest",
                ],
            },
            messages: {
                zeroSlowTestThreshold:
                    "Avoid `test.slowTestThreshold: 0`; disabling slow-test reporting can hide performance regressions in the suite.",
            },
            schema: [],
            type: "problem",
        },
        name: "no-zero-vitest-slow-test-threshold",
    });

export default noZeroVitestSlowTestThresholdRule;
