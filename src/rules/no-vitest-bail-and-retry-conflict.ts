import type { TSESTree } from "@typescript-eslint/utils";

import {
    getPropertyPath,
    getStaticStringValue,
    propertyPathEndsWith,
} from "../_internal/ast.js";
import { getConfigFileKind } from "../_internal/config-files.js";
import { createTypedRule } from "../_internal/typed-rule.js";

type MessageId = "bailRetryConflict";

type PairState = {
    readonly bailNode?: Readonly<TSESTree.Node>;
    readonly hasBail: boolean;
    readonly hasRetry: boolean;
    readonly retryNode?: Readonly<TSESTree.Node>;
};

const bailPathSuffix = ["test", "bail"] as const;

const retryPathSuffix = ["test", "retry"] as const;

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

const isEnabledBail = (node: Readonly<TSESTree.Property["value"]>): boolean => {
    if (node.type === "Literal" && typeof node.value === "boolean") {
        return node.value;
    }

    const staticNumeric = getStaticNumericValue(node);

    return staticNumeric !== undefined && staticNumeric > 0;
};

const isEnabledRetry = (
    node: Readonly<TSESTree.Property["value"]>
): boolean => {
    const staticNumeric = getStaticNumericValue(node);

    return staticNumeric !== undefined && staticNumeric > 0;
};

/** Disallow enabling both strict bailout and retry in same Vitest test scope. */
const noVitestBailAndRetryConflictRule: ReturnType<typeof createTypedRule> =
    createTypedRule<[], MessageId>({
        create(context) {
            if (getConfigFileKind(context.filename) === null) {
                return {};
            }

            const perObject = new Map<
                Readonly<TSESTree.ObjectExpression>,
                PairState
            >();

            return {
                "Program:exit"() {
                    for (const state of perObject.values()) {
                        if (!state.hasBail || !state.hasRetry) {
                            continue;
                        }

                        const reportNode = state.retryNode ?? state.bailNode;

                        if (reportNode === undefined) {
                            continue;
                        }

                        context.report({
                            messageId: "bailRetryConflict",
                            node: reportNode,
                        });
                    }
                },
                Property(node) {
                    if (node.parent.type !== "ObjectExpression") {
                        return;
                    }

                    const propertyPath = getPropertyPath(node);
                    const currentState =
                        perObject.get(node.parent) ??
                        ({
                            hasBail: false,
                            hasRetry: false,
                        } as const);

                    if (
                        propertyPathEndsWith(propertyPath, bailPathSuffix) &&
                        isEnabledBail(node.value)
                    ) {
                        perObject.set(node.parent, {
                            ...currentState,
                            bailNode: node.value,
                            hasBail: true,
                        });

                        return;
                    }

                    if (
                        propertyPathEndsWith(propertyPath, retryPathSuffix) &&
                        isEnabledRetry(node.value)
                    ) {
                        perObject.set(node.parent, {
                            ...currentState,
                            hasRetry: true,
                            retryNode: node.value,
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
                    "disallow enabling both `test.bail` and `test.retry` in the same Vitest test scope.",
                frozen: false,
                recommended: false,
                requiresTypeChecking: false,
                url: "https://nick2bad4u.github.io/eslint-plugin-vite/docs/rules/no-vitest-bail-and-retry-conflict",
                viteConfigs: [
                    "vite.configs.strict",
                    "vite.configs.all",
                    "vite.configs.configs",
                    "vite.configs.vitest",
                ],
            },
            messages: {
                bailRetryConflict:
                    "Avoid combining enabled `test.bail` with enabled `test.retry`; these failure strategies conflict and reduce diagnostics clarity.",
            },
            schema: [],
            type: "problem",
        },
        name: "no-vitest-bail-and-retry-conflict",
    });

export default noVitestBailAndRetryConflictRule;
