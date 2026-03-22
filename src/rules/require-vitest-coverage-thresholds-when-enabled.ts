import type { TSESTree } from "@typescript-eslint/utils";

import { getPropertyPath, propertyPathEndsWith } from "../_internal/ast.js";
import { getConfigFileKind } from "../_internal/config-files.js";
import { createTypedRule } from "../_internal/typed-rule.js";

type CoverageState = {
    readonly enabledNode?: Readonly<TSESTree.Node>;
    readonly hasThresholds: boolean;
};

type MessageId = "missingCoverageThresholds";

const enabledPathSuffix = [
    "test",
    "coverage",
    "enabled",
] as const;

const thresholdsPathSuffix = [
    "test",
    "coverage",
    "thresholds",
] as const;

const hasNonEmptyThresholds = (
    node: Readonly<TSESTree.Property["value"]>
): boolean => node.type === "ObjectExpression" && node.properties.length > 0;

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
                if (node.parent.type !== "ObjectExpression") {
                    return;
                }

                const propertyPath = getPropertyPath(node);
                const currentState = perCoverageObject.get(node.parent) ?? {
                    hasThresholds: false,
                };

                if (
                    propertyPathEndsWith(propertyPath, enabledPathSuffix) &&
                    node.value.type === "Literal" &&
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
    defaultOptions: [],
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
