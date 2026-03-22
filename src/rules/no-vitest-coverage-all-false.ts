import type { TSESTree } from "@typescript-eslint/utils";

import { getPropertyPath, propertyPathEndsWith } from "../_internal/ast.js";
import { getConfigFileKind } from "../_internal/config-files.js";
import { createTypedRule } from "../_internal/typed-rule.js";

type MessageId = "coverageAllFalse";

const coverageAllPathSuffix = [
    "test",
    "coverage",
    "all",
] as const;

const isBooleanLiteral = (
    node: Readonly<TSESTree.Property["value"]>,
    expected: boolean
): boolean => node.type === "Literal" && node.value === expected;

/** Disallow `test.coverage.all: false` in committed Vitest config. */
const noVitestCoverageAllFalseRule: ReturnType<typeof createTypedRule> =
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
                            coverageAllPathSuffix
                        ) ||
                        !isBooleanLiteral(node.value, false)
                    ) {
                        return;
                    }

                    context.report({
                        messageId: "coverageAllFalse",
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
                    "disallow `test.coverage.all: false` in committed Vitest config.",
                frozen: false,
                recommended: false,
                requiresTypeChecking: false,
                url: "https://nick2bad4u.github.io/eslint-plugin-vite/docs/rules/no-vitest-coverage-all-false",
                viteConfigs: [
                    "vite.configs.strict",
                    "vite.configs.all",
                    "vite.configs.configs",
                    "vite.configs.vitest",
                ],
            },
            messages: {
                coverageAllFalse:
                    "Avoid `test.coverage.all: false` in shared config; it can weaken coverage gate expectations and hide untested files.",
            },
            schema: [],
            type: "problem",
        },
        name: "no-vitest-coverage-all-false",
    });

export default noVitestCoverageAllFalseRule;
