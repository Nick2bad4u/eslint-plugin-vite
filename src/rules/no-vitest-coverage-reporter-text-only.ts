import type { TSESTree } from "@typescript-eslint/utils";

import {
    getPropertyPath,
    getStaticStringValue,
    propertyPathEndsWith,
} from "../_internal/ast.js";
import { getConfigFileKind } from "../_internal/config-files.js";
import { createTypedRule } from "../_internal/typed-rule.js";

type MessageId = "textOnlyReporter";

const reporterPathSuffix = [
    "test",
    "coverage",
    "reporter",
] as const;

const getStaticLowercaseString = (
    node: Readonly<TSESTree.Node>
): string | undefined => {
    if (node.type === "Literal" && typeof node.value === "string") {
        return node.value.trim().toLowerCase();
    }

    if (node.type === "TemplateLiteral") {
        const staticValue = getStaticStringValue(node);

        return staticValue?.trim().toLowerCase();
    }

    return undefined;
};

const isTextOnlyReporter = (
    node: Readonly<TSESTree.Property["value"]>
): boolean => {
    const staticString = getStaticLowercaseString(node);

    if (staticString !== undefined) {
        return staticString === "text";
    }

    if (node.type !== "ArrayExpression") {
        return false;
    }

    if (node.elements.length !== 1) {
        return false;
    }

    const firstElement = node.elements.at(0);

    if (
        firstElement === undefined ||
        firstElement === null ||
        firstElement.type === "SpreadElement"
    ) {
        return false;
    }

    return getStaticLowercaseString(firstElement) === "text";
};

/** Disallow coverage reporter configuration that only emits plain `text` output. */
const noVitestCoverageReporterTextOnlyRule: ReturnType<typeof createTypedRule> =
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
                            reporterPathSuffix
                        ) ||
                        !isTextOnlyReporter(node.value)
                    ) {
                        return;
                    }

                    context.report({
                        messageId: "textOnlyReporter",
                        node: node.value,
                    });
                },
            };
        },
        meta: {
            deprecated: false,
            docs: {
                description:
                    "disallow `test.coverage.reporter` configurations that only use `text` output.",
                frozen: false,
                recommended: false,
                requiresTypeChecking: false,
                url: "https://nick2bad4u.github.io/eslint-plugin-vite/docs/rules/no-vitest-coverage-reporter-text-only",
                viteConfigs: [
                    "vite.configs.strict",
                    "vite.configs.all",
                    "vite.configs.configs",
                    "vite.configs.vitest",
                ],
            },
            messages: {
                textOnlyReporter:
                    "Avoid text-only coverage output in shared config; include a machine-friendly reporter (for example `json`, `lcov`, or `html`) for CI and tooling integrations.",
            },
            schema: [],
            type: "problem",
        },
        name: "no-vitest-coverage-reporter-text-only",
    });

export default noVitestCoverageReporterTextOnlyRule;
