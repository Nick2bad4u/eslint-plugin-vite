import type { TSESTree } from "@typescript-eslint/utils";

import { getPropertyPath, propertyPathEndsWith } from "../_internal/ast.js";
import { getConfigFileKind } from "../_internal/config-files.js";
import { createTypedRule } from "../_internal/typed-rule.js";

type MessageId = "coverageCleanFalse";

const coverageCleanPathSuffix = [
    "test",
    "coverage",
    "clean",
] as const;

const isBooleanLiteral = (
    node: Readonly<TSESTree.Property["value"]>,
    expected: boolean
): boolean => node.type === "Literal" && node.value === expected;

/** Disallow `test.coverage.clean: false` in committed Vitest config. */
const noVitestCoverageCleanFalseRule: ReturnType<typeof createTypedRule> =
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
                            coverageCleanPathSuffix
                        ) ||
                        !isBooleanLiteral(node.value, false)
                    ) {
                        return;
                    }

                    context.report({
                        messageId: "coverageCleanFalse",
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
                    "disallow `test.coverage.clean: false` in committed Vitest config.",
                frozen: false,
                recommended: false,
                requiresTypeChecking: false,
                url: "https://nick2bad4u.github.io/eslint-plugin-vite/docs/rules/no-vitest-coverage-clean-false",
                viteConfigs: [
                    "vite.configs.strict",
                    "vite.configs.all",
                    "vite.configs.configs",
                    "vite.configs.vitest",
                ],
            },
            messages: {
                coverageCleanFalse:
                    "Avoid `test.coverage.clean: false`; stale coverage artifacts can make CI and local reports misleading.",
            },
            schema: [],
            type: "problem",
        },
        name: "no-vitest-coverage-clean-false",
    });

export default noVitestCoverageCleanFalseRule;
