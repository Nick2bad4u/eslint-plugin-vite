import type { TSESTree } from "@typescript-eslint/utils";
import type { ArrayValues } from "type-fest";

import { AST_NODE_TYPES } from "@typescript-eslint/utils";
import { arrayAt, arrayFirst, arrayIncludes, isDefined } from "ts-extras";

import { getStaticPropertyName } from "../_internal/ast.js";
import { getConfigFileKind } from "../_internal/config-files.js";
import { constTuple } from "../_internal/const-tuple.js";
import { createTypedRule } from "../_internal/typed-rule.js";

type ConfigFlagName = "isPreview" | "isSsrBuild";
type FunctionBoundaryNode =
    FunctionNode | Readonly<TSESTree.FunctionDeclaration>;
type FunctionNode =
    | Readonly<TSESTree.ArrowFunctionExpression>
    | Readonly<TSESTree.FunctionExpression>;
type ImplicitFlagUsage = Readonly<{
    flagName: ConfigFlagName;
    localName: string;
    node: Readonly<TSESTree.Node>;
}>;
type MessageId = "implicitConfigFlag";
type TargetFunctionScope = Readonly<{
    bindings: ReadonlyMap<string, ConfigFlagName>;
    node: FunctionNode;
}>;

const explicitBooleanComparisonOperators = constTuple("!=", "!==", "==", "===");
const isConfigFlagName = (value: string): value is ConfigFlagName =>
    value === "isPreview" || value === "isSsrBuild";

const isExplicitBooleanComparisonOperator = (
    operator: TSESTree.BinaryExpression["operator"]
): operator is ArrayValues<typeof explicitBooleanComparisonOperators> =>
    arrayIncludes(explicitBooleanComparisonOperators, operator);

const toExpressionOrNull = (
    node: Readonly<TSESTree.Expression | TSESTree.PrivateIdentifier>
): null | Readonly<TSESTree.Expression> =>
    node.type === AST_NODE_TYPES.PrivateIdentifier ? null : node;

const isFunctionBoundaryNode = (
    node: Readonly<TSESTree.Node>
): node is FunctionBoundaryNode => {
    // eslint-disable-next-line @typescript-eslint/switch-exhaustiveness-check -- This guard intentionally recognizes only function boundary node kinds.
    switch (node.type) {
        case AST_NODE_TYPES.ArrowFunctionExpression:
        case AST_NODE_TYPES.FunctionDeclaration:
        case AST_NODE_TYPES.FunctionExpression: {
            return true;
        }
        default: {
            return false;
        }
    }
};

const unwrapExpression = (
    expression: Readonly<TSESTree.Expression>
): Readonly<TSESTree.Expression> => {
    if (expression.type === AST_NODE_TYPES.ChainExpression) {
        return unwrapExpression(expression.expression);
    }

    // eslint-disable-next-line @typescript-eslint/switch-exhaustiveness-check -- This switch unwraps only expression wrapper nodes and returns all other expressions unchanged.
    switch (expression.type) {
        case AST_NODE_TYPES.TSAsExpression:
        case AST_NODE_TYPES.TSNonNullExpression:
        case AST_NODE_TYPES.TSSatisfiesExpression:
        case AST_NODE_TYPES.TSTypeAssertion: {
            return unwrapExpression(expression.expression);
        }
        default: {
            return expression;
        }
    }
};

const isBooleanLiteral = (node: Readonly<TSESTree.Node>): boolean =>
    node.type === AST_NODE_TYPES.Literal && typeof node.value === "boolean";

const isViteConfigFactoryFunction = (node: FunctionNode): boolean => {
    const parentNode = node.parent;

    if (
        parentNode.type === AST_NODE_TYPES.CallExpression &&
        arrayFirst(parentNode.arguments) === node &&
        parentNode.callee.type === AST_NODE_TYPES.Identifier
    ) {
        return parentNode.callee.name === "defineConfig";
    }

    return parentNode.type === AST_NODE_TYPES.ExportDefaultDeclaration;
};

const getBindingIdentifier = (
    node: Readonly<TSESTree.Node>
): Readonly<TSESTree.Identifier> | undefined => {
    if (node.type === AST_NODE_TYPES.Identifier) {
        return node;
    }

    if (
        node.type === AST_NODE_TYPES.AssignmentPattern &&
        node.left.type === AST_NODE_TYPES.Identifier
    ) {
        return node.left;
    }

    return undefined;
};

const getConfigFlagBindings = (
    node: FunctionNode
): ReadonlyMap<string, ConfigFlagName> => {
    const firstParameter = arrayFirst(node.params);

    if (firstParameter?.type !== AST_NODE_TYPES.ObjectPattern) {
        return new Map();
    }

    const bindings = new Map<string, ConfigFlagName>();

    for (const property of firstParameter.properties) {
        if (property.type !== AST_NODE_TYPES.Property) {
            continue;
        }

        const flagName = getStaticPropertyName(property);

        if (!isDefined(flagName) || !isConfigFlagName(flagName)) {
            continue;
        }

        const localIdentifier = getBindingIdentifier(property.value);

        if (localIdentifier === undefined) {
            continue;
        }

        bindings.set(localIdentifier.name, flagName);
    }

    return bindings;
};

const getNearestFunctionAncestor = (
    node: Readonly<TSESTree.Node>
): FunctionBoundaryNode | undefined => {
    let currentNode = node.parent;

    while (currentNode !== undefined) {
        if (isFunctionBoundaryNode(currentNode)) {
            return currentNode;
        }

        currentNode = currentNode.parent;
    }

    return undefined;
};

const getFlagUsageForIdentifier = (
    expression: Readonly<TSESTree.Expression>,
    bindings: ReadonlyMap<string, ConfigFlagName>
): ImplicitFlagUsage | null => {
    const unwrappedExpression = unwrapExpression(expression);

    if (unwrappedExpression.type !== AST_NODE_TYPES.Identifier) {
        return null;
    }

    const flagName = bindings.get(unwrappedExpression.name);

    if (!isDefined(flagName)) {
        return null;
    }

    return {
        flagName,
        localName: unwrappedExpression.name,
        node: unwrappedExpression,
    };
};

const isExplicitBooleanComparison = (
    expression: Readonly<TSESTree.BinaryExpression>,
    bindings: ReadonlyMap<string, ConfigFlagName>
): boolean => {
    if (!isExplicitBooleanComparisonOperator(expression.operator)) {
        return false;
    }

    const left = toExpressionOrNull(expression.left);
    const right = toExpressionOrNull(expression.right);

    if (left === null || right === null) {
        return false;
    }

    return (
        (getFlagUsageForIdentifier(unwrapExpression(left), bindings) !== null &&
            isBooleanLiteral(right)) ||
        (getFlagUsageForIdentifier(unwrapExpression(right), bindings) !==
            null &&
            isBooleanLiteral(left))
    );
};

function findImplicitFlagUsageInBinaryExpression(
    expression: Readonly<TSESTree.BinaryExpression>,
    bindings: ReadonlyMap<string, ConfigFlagName>,
    recurse: (
        expression: Readonly<TSESTree.Expression>,
        bindings: ReadonlyMap<string, ConfigFlagName>
    ) => ImplicitFlagUsage | null
): ImplicitFlagUsage | null {
    if (isExplicitBooleanComparison(expression, bindings)) {
        return null;
    }

    const left = toExpressionOrNull(expression.left);
    const right = toExpressionOrNull(expression.right);

    if (left === null || right === null) {
        return null;
    }

    return recurse(left, bindings) ?? recurse(right, bindings);
}

function findImplicitFlagUsageInCallExpression(
    expression: Readonly<TSESTree.CallExpression>,
    bindings: ReadonlyMap<string, ConfigFlagName>,
    recurse: (
        expression: Readonly<TSESTree.Expression>,
        bindings: ReadonlyMap<string, ConfigFlagName>
    ) => ImplicitFlagUsage | null
): ImplicitFlagUsage | null {
    if (
        expression.callee.type !== AST_NODE_TYPES.Identifier ||
        expression.callee.name !== "Boolean"
    ) {
        return null;
    }

    const [argument] = expression.arguments;

    if (
        argument === undefined ||
        argument.type === AST_NODE_TYPES.SpreadElement
    ) {
        return null;
    }

    return recurse(argument, bindings);
}

function findImplicitFlagUsageInSequenceExpression(
    expression: Readonly<TSESTree.SequenceExpression>,
    bindings: ReadonlyMap<string, ConfigFlagName>,
    recurse: (
        expression: Readonly<TSESTree.Expression>,
        bindings: ReadonlyMap<string, ConfigFlagName>
    ) => ImplicitFlagUsage | null
): ImplicitFlagUsage | null {
    for (const nestedExpression of expression.expressions) {
        const usage = recurse(nestedExpression, bindings);

        if (usage !== null) {
            return usage;
        }
    }

    return null;
}

function findImplicitFlagUsageInUnaryExpression(
    expression: Readonly<TSESTree.UnaryExpression>,
    bindings: ReadonlyMap<string, ConfigFlagName>,
    recurse: (
        expression: Readonly<TSESTree.Expression>,
        bindings: ReadonlyMap<string, ConfigFlagName>
    ) => ImplicitFlagUsage | null
): ImplicitFlagUsage | null {
    return expression.operator === "!"
        ? recurse(expression.argument, bindings)
        : null;
}

// eslint-disable-next-line perfectionist/sort-modules -- The dispatcher stays after the helper declarations so the file avoids no-use-before-define warnings for the recursive helpers.
function findImplicitFlagUsage(
    expression: Readonly<TSESTree.Expression>,
    bindings: ReadonlyMap<string, ConfigFlagName>
): ImplicitFlagUsage | null {
    const unwrappedExpression = unwrapExpression(expression);
    const identifierUsage = getFlagUsageForIdentifier(
        unwrappedExpression,
        bindings
    );

    if (identifierUsage !== null) {
        return identifierUsage;
    }

    if (unwrappedExpression.type === AST_NODE_TYPES.BinaryExpression) {
        return findImplicitFlagUsageInBinaryExpression(
            unwrappedExpression,
            bindings,
            findImplicitFlagUsage
        );
    }

    if (unwrappedExpression.type === AST_NODE_TYPES.CallExpression) {
        return findImplicitFlagUsageInCallExpression(
            unwrappedExpression,
            bindings,
            findImplicitFlagUsage
        );
    }

    if (unwrappedExpression.type === AST_NODE_TYPES.ConditionalExpression) {
        // eslint-disable-next-line unicorn/no-useless-recursion -- AST expressions are recursive by shape, and this branch intentionally descends into the conditional test.
        return findImplicitFlagUsage(unwrappedExpression.test, bindings);
    }

    if (unwrappedExpression.type === AST_NODE_TYPES.LogicalExpression) {
        return (
            findImplicitFlagUsage(unwrappedExpression.left, bindings) ??
            findImplicitFlagUsage(unwrappedExpression.right, bindings)
        );
    }

    if (unwrappedExpression.type === AST_NODE_TYPES.SequenceExpression) {
        return findImplicitFlagUsageInSequenceExpression(
            unwrappedExpression,
            bindings,
            findImplicitFlagUsage
        );
    }

    if (unwrappedExpression.type === AST_NODE_TYPES.UnaryExpression) {
        return findImplicitFlagUsageInUnaryExpression(
            unwrappedExpression,
            bindings,
            findImplicitFlagUsage
        );
    }

    return null;
}

/**
 * Disallow implicit truthy and falsy checks for Vite config callback flags.
 */
const noImplicitConfigFlagsRule: ReturnType<typeof createTypedRule> =
    createTypedRule<[], MessageId>({
        create(context) {
            if (getConfigFileKind(context.filename) !== "vite") {
                return {};
            }

            const targetFunctionScopes: TargetFunctionScope[] = [];

            const enterFunction = (node: FunctionNode): void => {
                if (!isViteConfigFactoryFunction(node)) {
                    return;
                }

                const bindings = getConfigFlagBindings(node);

                if (bindings.size === 0) {
                    return;
                }

                targetFunctionScopes.push({
                    bindings,
                    node,
                });
            };

            const exitFunction = (node: FunctionNode): void => {
                const activeScope = arrayAt(targetFunctionScopes, -1);

                if (activeScope?.node !== node) {
                    return;
                }

                targetFunctionScopes.pop();
            };

            const reportImplicitUsage = (
                node: Readonly<TSESTree.Node>,
                testExpression: null | Readonly<TSESTree.Expression>
            ): void => {
                const activeScope = arrayAt(targetFunctionScopes, -1);

                if (!isDefined(activeScope) || testExpression === null) {
                    return;
                }

                if (getNearestFunctionAncestor(node) !== activeScope.node) {
                    return;
                }

                const usage = findImplicitFlagUsage(
                    testExpression,
                    activeScope.bindings
                );

                if (usage === null) {
                    return;
                }

                context.report({
                    data: usage,
                    messageId: "implicitConfigFlag",
                    node: usage.node,
                });
            };

            return {
                ArrowFunctionExpression: enterFunction,
                "ArrowFunctionExpression:exit": exitFunction,
                ConditionalExpression(node) {
                    reportImplicitUsage(node, node.test);
                },
                DoWhileStatement(node) {
                    reportImplicitUsage(node, node.test);
                },
                ForStatement(node) {
                    reportImplicitUsage(node, node.test);
                },
                FunctionExpression: enterFunction,
                "FunctionExpression:exit": exitFunction,
                IfStatement(node) {
                    reportImplicitUsage(node, node.test);
                },
                WhileStatement(node) {
                    reportImplicitUsage(node, node.test);
                },
            };
        },
        meta: {
            deprecated: false,
            docs: {
                description:
                    "disallow implicit truthy or falsy checks for Vite config callback flags such as `isPreview` and `isSsrBuild`; compare them explicitly against `true` or `false` instead.",
                frozen: false,
                recommended: false,
                requiresTypeChecking: false,
                url: "https://nick2bad4u.github.io/eslint-plugin-vite/docs/rules/no-implicit-config-flags",
                viteConfigs: [
                    "vite.configs.strict",
                    "vite.configs.all",
                    "vite.configs.configs",
                ],
            },
            messages: {
                implicitConfigFlag:
                    "Compare `{{ localName }}` (from Vite's `{{ flagName }}` config callback flag) explicitly against `true` or `false`. Some tools that load Vite configs pass `undefined` for these flags.",
            },
            schema: [],
            type: "suggestion",
        },
        name: "no-implicit-config-flags",
    });

export default noImplicitConfigFlagsRule;
