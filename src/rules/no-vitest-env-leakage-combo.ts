import type { TSESTree } from "@typescript-eslint/utils";

import { AST_NODE_TYPES } from "@typescript-eslint/utils";

import { getPropertyPath, propertyPathEndsWith } from "../_internal/ast.js";
import { getConfigFileKind } from "../_internal/config-files.js";
import { constTuple } from "../_internal/const-tuple.js";
import { createTypedRule } from "../_internal/typed-rule.js";

type MessageId = "envLeakageCombo";

interface TestScopeState {
    readonly globalsTrueNode?: Readonly<TSESTree.Node>;
    readonly isolateFalseNode?: Readonly<TSESTree.Node>;
    readonly unstubEnvsFalseNode?: Readonly<TSESTree.Node>;
    readonly unstubGlobalsFalseNode?: Readonly<TSESTree.Node>;
}

const globalsPathSuffix = constTuple("test", "globals");

const isolatePathSuffix = constTuple("test", "isolate");

const unstubGlobalsPathSuffix = constTuple("test", "unstubGlobals");

const unstubEnvsPathSuffix = constTuple("test", "unstubEnvs");

const isBooleanLiteral = (
    node: Readonly<TSESTree.Property["value"]>,
    expected: boolean
): boolean => node.type === AST_NODE_TYPES.Literal && node.value === expected;

/**
 * Disallow risky state-leakage combo: `globals: true` + `isolate: false` +
 * `unstubGlobals: false` or `unstubEnvs: false`.
 */
const noVitestEnvLeakageComboRule: ReturnType<typeof createTypedRule> =
    createTypedRule<[], MessageId>({
        create(context) {
            if (getConfigFileKind(context.filename) === null) {
                return {};
            }

            const perTestObject = new Map<
                Readonly<TSESTree.ObjectExpression>,
                TestScopeState
            >();

            return {
                "Program:exit"() {
                    for (const state of perTestObject.values()) {
                        if (
                            state.globalsTrueNode === undefined ||
                            state.isolateFalseNode === undefined
                        ) {
                            continue;
                        }

                        if (
                            state.unstubEnvsFalseNode === undefined &&
                            state.unstubGlobalsFalseNode === undefined
                        ) {
                            continue;
                        }

                        context.report({
                            messageId: "envLeakageCombo",
                            node: state.isolateFalseNode,
                        });
                    }
                },
                Property(node) {
                    if (node.parent.type !== AST_NODE_TYPES.ObjectExpression) {
                        return;
                    }

                    const propertyPath = getPropertyPath(node);
                    const currentState = perTestObject.get(node.parent) ?? {};

                    if (
                        propertyPathEndsWith(propertyPath, globalsPathSuffix) &&
                        isBooleanLiteral(node.value, true)
                    ) {
                        perTestObject.set(node.parent, {
                            ...currentState,
                            globalsTrueNode: node.value,
                        });

                        return;
                    }

                    if (
                        propertyPathEndsWith(propertyPath, isolatePathSuffix) &&
                        isBooleanLiteral(node.value, false)
                    ) {
                        perTestObject.set(node.parent, {
                            ...currentState,
                            isolateFalseNode: node.value,
                        });

                        return;
                    }

                    if (
                        propertyPathEndsWith(
                            propertyPath,
                            unstubGlobalsPathSuffix
                        ) &&
                        isBooleanLiteral(node.value, false)
                    ) {
                        perTestObject.set(node.parent, {
                            ...currentState,
                            unstubGlobalsFalseNode: node.value,
                        });

                        return;
                    }

                    if (
                        propertyPathEndsWith(
                            propertyPath,
                            unstubEnvsPathSuffix
                        ) &&
                        isBooleanLiteral(node.value, false)
                    ) {
                        perTestObject.set(node.parent, {
                            ...currentState,
                            unstubEnvsFalseNode: node.value,
                        });
                    }
                },
            };
        },
        meta: {
            deprecated: false,
            docs: {
                description:
                    "disallow risky Vitest state-leakage combos that mix `globals: true`, `isolate: false`, and disabled unstub flags.",
                frozen: false,
                recommended: false,
                requiresTypeChecking: false,
                url: "https://nick2bad4u.github.io/eslint-plugin-vite/docs/rules/no-vitest-env-leakage-combo",
                viteConfigs: [
                    "vite.configs.strict",
                    "vite.configs.all",
                    "vite.configs.configs",
                    "vite.configs.vitest",
                ],
            },
            messages: {
                envLeakageCombo:
                    "Avoid combining `test.globals: true` with `test.isolate: false` and disabled unstub flags; this pattern increases global/env state leakage across tests.",
            },
            schema: [],
            type: "problem",
        },
        name: "no-vitest-env-leakage-combo",
    });

export default noVitestEnvLeakageComboRule;
