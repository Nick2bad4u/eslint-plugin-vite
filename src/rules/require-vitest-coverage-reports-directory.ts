import type { TSESTree } from "@typescript-eslint/utils";

import { isDefined } from "ts-extras";

import {
    getPropertyPath,
    getStaticStringValue,
    propertyPathEndsWith,
} from "../_internal/ast.js";
import { getConfigFileKind } from "../_internal/config-files.js";
import { createTypedRule } from "../_internal/typed-rule.js";

type CoverageState = {
    readonly enabledNode?: Readonly<TSESTree.Node>;
    readonly hasReportsDirectory: boolean;
};

type MessageId = "missingReportsDirectory";

const enabledPathSuffix = [
    "test",
    "coverage",
    "enabled",
] as const;

const reportsDirectoryPathSuffix = [
    "test",
    "coverage",
    "reportsDirectory",
] as const;

const hasNonEmptyStaticString = (
    node: Readonly<TSESTree.Property["value"]>
): boolean => {
    if (node.type === "Literal" && typeof node.value === "string") {
        return node.value.trim().length > 0;
    }

    if (node.type === "TemplateLiteral") {
        const staticValue = getStaticStringValue(node);

        return isDefined(staticValue) && staticValue.trim().length > 0;
    }

    return false;
};

/**
 * Require explicit non-empty `test.coverage.reportsDirectory` when coverage is
 * enabled.
 */
const requireVitestCoverageReportsDirectoryRule: ReturnType<
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
                        state.hasReportsDirectory
                    ) {
                        continue;
                    }

                    context.report({
                        messageId: "missingReportsDirectory",
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
                    hasReportsDirectory: false,
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
                    propertyPathEndsWith(
                        propertyPath,
                        reportsDirectoryPathSuffix
                    ) &&
                    hasNonEmptyStaticString(node.value)
                ) {
                    perCoverageObject.set(node.parent, {
                        ...currentState,
                        hasReportsDirectory: true,
                    });
                }
            },
        };
    },
    meta: {
        deprecated: false,
        docs: {
            description:
                "require explicit non-empty `test.coverage.reportsDirectory` when `test.coverage.enabled` is true.",
            frozen: false,
            recommended: false,
            requiresTypeChecking: false,
            url: "https://nick2bad4u.github.io/eslint-plugin-vite/docs/rules/require-vitest-coverage-reports-directory",
            viteConfigs: [
                "vite.configs.strict",
                "vite.configs.all",
                "vite.configs.configs",
                "vite.configs.vitest",
            ],
        },
        messages: {
            missingReportsDirectory:
                "When `test.coverage.enabled` is true, configure a stable `test.coverage.reportsDirectory` for predictable CI artifact paths.",
        },
        schema: [],
        type: "problem",
    },
    name: "require-vitest-coverage-reports-directory",
});

export default requireVitestCoverageReportsDirectoryRule;
