import type { TSESTree } from "@typescript-eslint/utils";

import { getPropertyPath, propertyPathEndsWith } from "../_internal/ast.js";
import { getConfigFileKind } from "../_internal/config-files.js";
import { createTypedRule } from "../_internal/typed-rule.js";

type MessageId = "skipFullFalse";

const skipFullPathSuffix = [
    "test",
    "coverage",
    "skipFull",
] as const;

const isBooleanLiteral = (
    node: Readonly<TSESTree.Property["value"]>,
    expected: boolean
): boolean => node.type === "Literal" && node.value === expected;

/**
 * Disallow `test.coverage.skipFull: false` in strict-style shared Vitest
 * config.
 */
const noVitestCoverageSkipFullFalseInStrictRule: ReturnType<
    typeof createTypedRule
> = createTypedRule<[], MessageId>({
    create(context) {
        if (getConfigFileKind(context.filename) === null) {
            return {};
        }

        return {
            Property(node) {
                if (
                    !propertyPathEndsWith(
                        getPropertyPath(node),
                        skipFullPathSuffix
                    ) ||
                    !isBooleanLiteral(node.value, false)
                ) {
                    return;
                }

                context.report({
                    messageId: "skipFullFalse",
                    node: node.value,
                });
            },
        };
    },
    meta: {
        deprecated: false,
        docs: {
            description:
                "disallow `test.coverage.skipFull: false` in committed strict-profile Vitest config.",
            frozen: false,
            recommended: false,
            requiresTypeChecking: false,
            url: "https://nick2bad4u.github.io/eslint-plugin-vite/docs/rules/no-vitest-coverage-skip-full-false-in-strict",
            viteConfigs: [
                "vite.configs.strict",
                "vite.configs.all",
                "vite.configs.configs",
                "vite.configs.vitest",
            ],
        },
        messages: {
            skipFullFalse:
                "Avoid `test.coverage.skipFull: false` in strict shared config; this can add noisy zero-delta report output that obscures useful failures.",
        },
        schema: [],
        type: "problem",
    },
    name: "no-vitest-coverage-skip-full-false-in-strict",
});

export default noVitestCoverageSkipFullFalseInStrictRule;
