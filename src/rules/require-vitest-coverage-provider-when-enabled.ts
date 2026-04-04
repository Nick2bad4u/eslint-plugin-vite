import type { TSESTree } from "@typescript-eslint/utils";

import {
    getPropertyPath,
    getStaticStringValue,
    propertyPathEndsWith,
} from "../_internal/ast.js";
import { getConfigFileKind } from "../_internal/config-files.js";
import { createTypedRule } from "../_internal/typed-rule.js";

type CoverageState = {
    readonly enabledNode?: Readonly<TSESTree.Node>;
    readonly hasProvider: boolean;
};

type MessageId = "missingCoverageProvider";

const enabledPathSuffix = [
    "test",
    "coverage",
    "enabled",
] as const;

const providerPathSuffix = [
    "test",
    "coverage",
    "provider",
] as const;

const hasNonEmptyStaticString = (
    node: Readonly<TSESTree.Property["value"]>
): boolean => {
    if (node.type === "Literal" && typeof node.value === "string") {
        return node.value.trim().length > 0;
    }

    if (node.type === "TemplateLiteral") {
        const staticValue = getStaticStringValue(node);

        return staticValue !== undefined && staticValue.trim().length > 0;
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
                if (node.parent.type !== "ObjectExpression") {
                    return;
                }

                const propertyPath = getPropertyPath(node);
                const currentState = perCoverageObject.get(node.parent) ?? {
                    hasProvider: false,
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
