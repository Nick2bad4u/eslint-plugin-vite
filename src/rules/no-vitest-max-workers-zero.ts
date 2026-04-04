import type { TSESTree } from "@typescript-eslint/utils";

import { getPropertyPath, getStaticStringValue } from "../_internal/ast.js";
import { getConfigFileKind } from "../_internal/config-files.js";
import { createTypedRule } from "../_internal/typed-rule.js";

type MessageId = "invalidMaxWorkers";

const getStaticNumericValue = (
    node: Readonly<TSESTree.Property["value"]>
): number | undefined => {
    if (node.type === "Literal" && typeof node.value === "number") {
        return node.value;
    }

    if (
        node.type === "Literal" &&
        typeof node.value === "string" &&
        node.value.trim().length > 0
    ) {
        const parsed = Number(node.value);

        return Number.isFinite(parsed) ? parsed : undefined;
    }

    if (node.type === "TemplateLiteral") {
        const staticValue = getStaticStringValue(node);

        if (staticValue === undefined || staticValue.trim().length === 0) {
            return undefined;
        }

        const parsed = Number(staticValue);

        return Number.isFinite(parsed) ? parsed : undefined;
    }

    return undefined;
};

const isEmptyStaticString = (
    node: Readonly<TSESTree.Property["value"]>
): boolean => {
    if (node.type === "Literal" && typeof node.value === "string") {
        return node.value.trim().length === 0;
    }

    if (node.type === "TemplateLiteral") {
        const staticValue = getStaticStringValue(node);

        return staticValue?.trim().length === 0;
    }

    return false;
};

/** Disallow invalid `test.maxWorkers` values (`0` or empty strings). */
const noVitestMaxWorkersZeroRule: ReturnType<typeof createTypedRule> =
    createTypedRule<[], MessageId>({
        create(context) {
            if (getConfigFileKind(context.filename) === null) {
                return {};
            }

            return {
                Property(node) {
                    const propertyPath = getPropertyPath(node);

                    if (
                        !propertyPath.includes("test") ||
                        propertyPath.at(-1) !== "maxWorkers"
                    ) {
                        return;
                    }

                    if (
                        getStaticNumericValue(node.value) !== 0 &&
                        !isEmptyStaticString(node.value)
                    ) {
                        return;
                    }

                    context.report({
                        messageId: "invalidMaxWorkers",
                        node: node.value,
                    });
                },
            };
        },
        meta: {
            deprecated: false,
            docs: {
                description:
                    "disallow invalid `test.maxWorkers` values (`0` or empty strings).",
                frozen: false,
                recommended: false,
                requiresTypeChecking: false,
                url: "https://nick2bad4u.github.io/eslint-plugin-vite/docs/rules/no-vitest-max-workers-zero",
                viteConfigs: [
                    "vite.configs.strict",
                    "vite.configs.all",
                    "vite.configs.configs",
                    "vite.configs.vitest",
                ],
            },
            messages: {
                invalidMaxWorkers:
                    "`test.maxWorkers` should be a positive worker count (or valid percentage string), not `0` or an empty value.",
            },
            schema: [],
            type: "problem",
        },
        name: "no-vitest-max-workers-zero",
    });

export default noVitestMaxWorkersZeroRule;
