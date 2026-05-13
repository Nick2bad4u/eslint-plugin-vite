import type { TSESTree } from "@typescript-eslint/utils";

import { AST_NODE_TYPES } from "@typescript-eslint/utils";

import { getPropertyPath, propertyPathEndsWith } from "../_internal/ast.js";
import { getConfigFileKind } from "../_internal/config-files.js";
import { constTuple } from "../_internal/const-tuple.js";
import { createTypedRule } from "../_internal/typed-rule.js";

interface CoverageState {
    readonly enabledNode?: Readonly<TSESTree.Node>;
    readonly hasThresholds: boolean;
}

type MessageId = "missingCoverageThresholds";

const enabledPathSuffix = constTuple("test", "coverage", "enabled");

const thresholdsPathSuffix = constTuple("test", "coverage", "thresholds");

const hasNonEmptyThresholds = (
    node: Readonly<TSESTree.Property["value"]>
): boolean =>
    node.type === AST_NODE_TYPES.ObjectExpression && node.properties.length > 0;

/**
 * Require explicit non-empty `test.coverage.thresholds` when coverage is
 * enabled.
 */
const requireVitestCoverageThresholdsWhenEnabledRule: ReturnType<
    typeof createTypedRule
> = createTypedRule<[], MessageId>({
    create(context) {
        if (getConfigFileKind(context.filename) === null) {
            return {};
        }

        const perCoverageObject = new Map<
            Readonly<TSESTree.ObjectExpression>,
            CoverageState
        >();

        return {
            "Program:exit"() {
                for (const state of perCoverageObject.values()) {
                    if (
                        state.enabledNode === undefined ||
                        state.hasThresholds
                    ) {
                        continue;
                    }

                    context.report({
                        messageId: "missingCoverageThresholds",
                        node: state.enabledNode,
                    });
                }
            },
            Property(node) {
                if (node.parent.type !== AST_NODE_TYPES.ObjectExpression) {
                    return;
                }

                const propertyPath = getPropertyPath(node);
                const currentState = perCoverageObject.get(node.parent) ?? {
                    hasThresholds: false,
                };

                if (
                    propertyPathEndsWith(propertyPath, enabledPathSuffix) &&
                    node.value.type === AST_NODE_TYPES.Literal &&
                    node.value.value === true
                ) {
                    perCoverageObject.set(node.parent, {
                        ...currentState,
                        enabledNode: node.value,
                    });

                    return;
                }

                if (
                    propertyPathEndsWith(propertyPath, thresholdsPathSuffix) &&
                    hasNonEmptyThresholds(node.value)
                ) {
                    perCoverageObject.set(node.parent, {
                        ...currentState,
                        hasThresholds: true,
                    });
                }
            },
        };
    },
    meta: {
        deprecated: false,
        docs: {
            description:
                "require explicit non-empty `test.coverage.thresholds` when `test.coverage.enabled` is true.",
            frozen: false,
            recommended: false,
            requiresTypeChecking: false,
            url: "https://nick2bad4u.github.io/eslint-plugin-vite/docs/rules/require-vitest-coverage-thresholds-when-enabled",
            viteConfigs: [
                "vite.configs.strict",
                "vite.configs.all",
                "vite.configs.configs",
                "vite.configs.vitest",
            ],
        },
        messages: {
            missingCoverageThresholds:
                "When `test.coverage.enabled` is true, configure non-empty `test.coverage.thresholds` to enforce meaningful quality gates.",
        },
        schema: [],
        type: "problem",
    },
    name: "require-vitest-coverage-thresholds-when-enabled",
});

export default requireVitestCoverageThresholdsWhenEnabledRule;
