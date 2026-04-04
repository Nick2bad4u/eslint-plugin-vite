import type { TSESTree } from "@typescript-eslint/utils";

import { getPropertyPath, getStaticStringValue } from "../_internal/ast.js";
import { getConfigFileKind } from "../_internal/config-files.js";
import { createTypedRule } from "../_internal/typed-rule.js";

type BoundsState = {
    readonly maxWorkersNode?: Readonly<TSESTree.Node>;
    readonly maxWorkersValue?: number;
    readonly minWorkersNode?: Readonly<TSESTree.Node>;
    readonly minWorkersValue?: number;
};

type MessageId = "minWorkersGreaterThanMaxWorkers";

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

/** Disallow Vitest worker bounds where `minWorkers > maxWorkers`. */
const noVitestMinWorkersGreaterThanMaxWorkersRule: ReturnType<
    typeof createTypedRule
> = createTypedRule<[], MessageId>({
    create(context) {
        if (getConfigFileKind(context.filename) === null) {
            return {};
        }

        const perObject = new Map<
            Readonly<TSESTree.ObjectExpression>,
            BoundsState
        >();

        return {
            "Program:exit"() {
                for (const state of perObject.values()) {
                    if (
                        state.maxWorkersValue === undefined ||
                        state.minWorkersValue === undefined ||
                        state.minWorkersValue <= state.maxWorkersValue
                    ) {
                        continue;
                    }

                    const reportNode =
                        state.minWorkersNode ?? state.maxWorkersNode;

                    if (reportNode === undefined) {
                        continue;
                    }

                    context.report({
                        messageId: "minWorkersGreaterThanMaxWorkers",
                        node: reportNode,
                    });
                }
            },
            Property(node) {
                if (node.parent.type !== "ObjectExpression") {
                    return;
                }

                const propertyPath = getPropertyPath(node);
                const lastSegment = propertyPath.at(-1);

                if (
                    !propertyPath.includes("test") ||
                    (lastSegment !== "minWorkers" &&
                        lastSegment !== "maxWorkers")
                ) {
                    return;
                }

                const staticNumeric = getStaticNumericValue(node.value);

                if (staticNumeric === undefined) {
                    return;
                }

                const currentState = perObject.get(node.parent) ?? {};

                if (lastSegment === "minWorkers") {
                    perObject.set(node.parent, {
                        ...currentState,
                        minWorkersNode: node.value,
                        minWorkersValue: staticNumeric,
                    });

                    return;
                }

                perObject.set(node.parent, {
                    ...currentState,
                    maxWorkersNode: node.value,
                    maxWorkersValue: staticNumeric,
                });
            },
        };
    },
    meta: {
        deprecated: false,
        docs: {
            description:
                "disallow worker bounds where `test.minWorkers` exceeds `test.maxWorkers`.",
            frozen: false,
            recommended: false,
            requiresTypeChecking: false,
            url: "https://nick2bad4u.github.io/eslint-plugin-vite/docs/rules/no-vitest-min-workers-greater-than-max-workers",
            viteConfigs: [
                "vite.configs.strict",
                "vite.configs.all",
                "vite.configs.configs",
                "vite.configs.vitest",
            ],
        },
        messages: {
            minWorkersGreaterThanMaxWorkers:
                "`test.minWorkers` should not be greater than `test.maxWorkers`.",
        },
        schema: [],
        type: "problem",
    },
    name: "no-vitest-min-workers-greater-than-max-workers",
});

export default noVitestMinWorkersGreaterThanMaxWorkersRule;
