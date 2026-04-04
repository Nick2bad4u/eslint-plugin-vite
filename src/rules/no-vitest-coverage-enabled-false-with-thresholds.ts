import type { TSESTree } from "@typescript-eslint/utils";

import { getPropertyPath, propertyPathEndsWith } from "../_internal/ast.js";
import { getConfigFileKind } from "../_internal/config-files.js";
import { createTypedRule } from "../_internal/typed-rule.js";

type CoverageState = {
    readonly enabledFalseNode?: Readonly<TSESTree.Node>;
    readonly thresholdsNode?: Readonly<TSESTree.Node>;
};

type MessageId = "enabledFalseWithThresholds";

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
 * Disallow `test.coverage.enabled: false` together with non-empty
 * `test.coverage.thresholds`.
 */
const noVitestCoverageEnabledFalseWithThresholdsRule: ReturnType<
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
                        state.enabledFalseNode === undefined ||
                        state.thresholdsNode === undefined
                    ) {
                        continue;
                    }

                    context.report({
                        messageId: "enabledFalseWithThresholds",
                        node: state.thresholdsNode,
                    });
                }
            },
            Property(node) {
                if (node.parent.type !== "ObjectExpression") {
                    return;
                }

                const propertyPath = getPropertyPath(node);
                const currentState = perCoverageObject.get(node.parent) ?? {};

                if (
                    propertyPathEndsWith(propertyPath, enabledPathSuffix) &&
                    node.value.type === "Literal" &&
                    node.value.value === false
                ) {
                    perCoverageObject.set(node.parent, {
                        ...currentState,
                        enabledFalseNode: node.value,
                    });

                    return;
                }

                if (
                    propertyPathEndsWith(propertyPath, thresholdsPathSuffix) &&
                    hasNonEmptyThresholds(node.value)
                ) {
                    perCoverageObject.set(node.parent, {
                        ...currentState,
                        thresholdsNode: node.value,
                    });
                }
            },
        };
    },
    meta: {
        deprecated: false,
        docs: {
            description:
                "disallow contradictory coverage config where `test.coverage.enabled` is false but thresholds are configured.",
            frozen: false,
            recommended: false,
            requiresTypeChecking: false,
            url: "https://nick2bad4u.github.io/eslint-plugin-vite/docs/rules/no-vitest-coverage-enabled-false-with-thresholds",
            viteConfigs: [
                "vite.configs.strict",
                "vite.configs.all",
                "vite.configs.configs",
                "vite.configs.vitest",
            ],
        },
        messages: {
            enabledFalseWithThresholds:
                "`test.coverage.enabled` is false while `test.coverage.thresholds` is configured; either enable coverage or remove threshold gates.",
        },
        schema: [],
        type: "problem",
    },
    name: "no-vitest-coverage-enabled-false-with-thresholds",
});

export default noVitestCoverageEnabledFalseWithThresholdsRule;
