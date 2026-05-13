import type { TSESTree } from "@typescript-eslint/utils";

import { AST_NODE_TYPES } from "@typescript-eslint/utils";
import { isDefined } from "ts-extras";

import {
    getPropertyPath,
    getStaticStringValue,
    propertyPathEndsWith,
} from "../_internal/ast.js";
import { getConfigFileKind } from "../_internal/config-files.js";
import { constTuple } from "../_internal/const-tuple.js";
import { createTypedRule } from "../_internal/typed-rule.js";

interface CoverageState {
    readonly enabledNode?: Readonly<TSESTree.Node>;
    readonly hasProvider: boolean;
}

type MessageId = "missingCoverageProvider";

const enabledPathSuffix = constTuple("test", "coverage", "enabled");

const providerPathSuffix = constTuple("test", "coverage", "provider");

const hasNonEmptyStaticString = (
    node: Readonly<TSESTree.Property["value"]>
): boolean => {
    if (
        node.type === AST_NODE_TYPES.Literal &&
        typeof node.value === "string"
    ) {
        return node.value.trim().length > 0;
    }

    if (node.type === AST_NODE_TYPES.TemplateLiteral) {
        const staticValue = getStaticStringValue(node);

        return isDefined(staticValue) && staticValue.trim().length > 0;
    }

    return false;
};

/** Require explicit `test.coverage.provider` when coverage is enabled. */
const requireVitestCoverageProviderWhenEnabledRule: ReturnType<
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
                    if (state.enabledNode === undefined || state.hasProvider) {
                        continue;
                    }

                    context.report({
                        messageId: "missingCoverageProvider",
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
                    hasProvider: false,
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
                    propertyPathEndsWith(propertyPath, providerPathSuffix) &&
                    hasNonEmptyStaticString(node.value)
                ) {
                    perCoverageObject.set(node.parent, {
                        ...currentState,
                        hasProvider: true,
                    });
                }
            },
        };
    },
    meta: {
        deprecated: false,
        docs: {
            description:
                "require explicit `test.coverage.provider` when `test.coverage.enabled` is true.",
            frozen: false,
            recommended: false,
            requiresTypeChecking: false,
            url: "https://nick2bad4u.github.io/eslint-plugin-vite/docs/rules/require-vitest-coverage-provider-when-enabled",
            viteConfigs: [
                "vite.configs.strict",
                "vite.configs.all",
                "vite.configs.configs",
                "vite.configs.vitest",
            ],
        },
        messages: {
            missingCoverageProvider:
                "When `test.coverage.enabled` is true, configure an explicit `test.coverage.provider` (for example `v8` or `istanbul`).",
        },
        schema: [],
        type: "problem",
    },
    name: "require-vitest-coverage-provider-when-enabled",
});

export default requireVitestCoverageProviderWhenEnabledRule;
