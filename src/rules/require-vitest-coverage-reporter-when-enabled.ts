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
    readonly hasReporter: boolean;
};

type MessageId = "missingCoverageReporter";

const enabledPathSuffix = [
    "test",
    "coverage",
    "enabled",
] as const;

const reporterPathSuffix = [
    "test",
    "coverage",
    "reporter",
] as const;

const hasNonEmptyReporter = (
    node: Readonly<TSESTree.Property["value"]>
): boolean => {
    if (node.type === "ArrayExpression") {
        return node.elements.length > 0;
    }

    if (node.type === "Literal" && typeof node.value === "string") {
        return node.value.trim().length > 0;
    }

    if (node.type === "TemplateLiteral") {
        const staticValue = getStaticStringValue(node);

        return staticValue !== undefined && staticValue.trim().length > 0;
    }

    return false;
};

/** Require explicit `test.coverage.reporter` when coverage is enabled. */
const requireVitestCoverageReporterWhenEnabledRule: ReturnType<
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
                    if (state.enabledNode === undefined || state.hasReporter) {
                        continue;
                    }

                    context.report({
                        messageId: "missingCoverageReporter",
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
                    hasReporter: false,
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
                    propertyPathEndsWith(propertyPath, reporterPathSuffix) &&
                    hasNonEmptyReporter(node.value)
                ) {
                    perCoverageObject.set(node.parent, {
                        ...currentState,
                        hasReporter: true,
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
                "require explicit `test.coverage.reporter` when `test.coverage.enabled` is true.",
            frozen: false,
            recommended: false,
            requiresTypeChecking: false,
            url: "https://nick2bad4u.github.io/eslint-plugin-vite/docs/rules/require-vitest-coverage-reporter-when-enabled",
            viteConfigs: [
                "vite.configs.strict",
                "vite.configs.all",
                "vite.configs.configs",
                "vite.configs.vitest",
            ],
        },
        messages: {
            missingCoverageReporter:
                "When `test.coverage.enabled` is true, configure `test.coverage.reporter` explicitly so coverage output remains predictable.",
        },
        schema: [],
        type: "problem",
    },
    name: "require-vitest-coverage-reporter-when-enabled",
});

export default requireVitestCoverageReporterWhenEnabledRule;
