import type { TSESTree } from "@typescript-eslint/utils";

import { getStaticPropertyName } from "../_internal/ast.js";
import { getConfigFileKind } from "../_internal/config-files.js";
import { createTypedRule } from "../_internal/typed-rule.js";

type ConfigFlagName = "isPreview" | "isSsrBuild";
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

const explicitBooleanComparisonOperators = [
    "===",
    "!==",
    "==",
    "!=",
] as const;

const isConfigFlagName = (value: string): value is ConfigFlagName =>
    value === "isPreview" || value === "isSsrBuild";

const isExplicitBooleanComparisonOperator = (
    operator: TSESTree.BinaryExpression["operator"]
): operator is (typeof explicitBooleanComparisonOperators)[number] =>
    explicitBooleanComparisonOperators.includes(
        operator as (typeof explicitBooleanComparisonOperators)[number]
    );

const toExpressionOrNull = (
    node: Readonly<TSESTree.Expression | TSESTree.PrivateIdentifier>
): null | Readonly<TSESTree.Expression> =>
    node.type === "PrivateIdentifier" ? null : node;

const unwrapExpression = (
    expression: Readonly<TSESTree.Expression>
): Readonly<TSESTree.Expression> => {
    if (expression.type === "ChainExpression") {
        return unwrapExpression(expression.expression);
    }

    if (
        expression.type === "TSAsExpression" ||
        expression.type === "TSSatisfiesExpression" ||
        expression.type === "TSTypeAssertion" ||
        expression.type === "TSNonNullExpression"
    ) {
        return unwrapExpression(expression.expression);
    }

    return expression;
};

const isBooleanLiteral = (node: Readonly<TSESTree.Node>): boolean =>
    node.type === "Literal" && typeof node.value === "boolean";

const isViteConfigFactoryFunction = (node: FunctionNode): boolean => {
    const parentNode = node.parent;

    if (
        parentNode.type === "CallExpression" &&
        parentNode.arguments[0] === node &&
        parentNode.callee.type === "Identifier"
    ) {
        return parentNode.callee.name === "defineConfig";
    }

    return parentNode.type === "ExportDefaultDeclaration";
};

const getBindingIdentifier = (
    node: Readonly<TSESTree.Node>
): Readonly<TSESTree.Identifier> | undefined => {
    if (node.type === "Identifier") {
        return node;
    }

    if (node.type === "AssignmentPattern" && node.left.type === "Identifier") {
        return node.left;
    }

    return undefined;
};

const getConfigFlagBindings = (
    node: FunctionNode
): ReadonlyMap<string, ConfigFlagName> => {
    const firstParameter = node.params[0];

    if (firstParameter?.type !== "ObjectPattern") {
        return new Map();
    }

    const bindings = new Map<string, ConfigFlagName>();

    for (const property of firstParameter.properties) {
        if (property.type !== "Property") {
            continue;
        }

        const flagName = getStaticPropertyName(property);

        if (flagName === undefined || !isConfigFlagName(flagName)) {
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
):
    | Readonly<
          | TSESTree.ArrowFunctionExpression
          | TSESTree.FunctionDeclaration
          | TSESTree.FunctionExpression
      >
    | undefined => {
    let currentNode = node.parent;

    while (currentNode !== undefined) {
        if (
            currentNode.type === "FunctionDeclaration" ||
            currentNode.type === "ArrowFunctionExpression" ||
            currentNode.type === "FunctionExpression"
        ) {
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

    if (unwrappedExpression.type !== "Identifier") {
        return null;
    }

    const flagName = bindings.get(unwrappedExpression.name);

    if (flagName === undefined) {
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
        expression.callee.type !== "Identifier" ||
        expression.callee.name !== "Boolean"
    ) {
        return null;
    }

    const [argument] = expression.arguments;

    if (argument === undefined || argument.type === "SpreadElement") {
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

    if (unwrappedExpression.type === "BinaryExpression") {
        return findImplicitFlagUsageInBinaryExpression(
            unwrappedExpression,
            bindings,
            findImplicitFlagUsage
        );
    }

    if (unwrappedExpression.type === "CallExpression") {
        return findImplicitFlagUsageInCallExpression(
            unwrappedExpression,
            bindings,
            findImplicitFlagUsage
        );
    }

    if (unwrappedExpression.type === "ConditionalExpression") {
        return findImplicitFlagUsage(unwrappedExpression.test, bindings);
    }

    if (unwrappedExpression.type === "LogicalExpression") {
        return (
            findImplicitFlagUsage(unwrappedExpression.left, bindings) ??
            findImplicitFlagUsage(unwrappedExpression.right, bindings)
        );
    }

    if (unwrappedExpression.type === "SequenceExpression") {
        return findImplicitFlagUsageInSequenceExpression(
            unwrappedExpression,
            bindings,
            findImplicitFlagUsage
        );
    }

    if (unwrappedExpression.type === "UnaryExpression") {
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
                const activeScope = targetFunctionScopes.at(-1);

                if (activeScope?.node !== node) {
                    return;
                }

                targetFunctionScopes.pop();
            };

            const reportImplicitUsage = (
                node: Readonly<TSESTree.Node>,
                testExpression: null | Readonly<TSESTree.Expression>
            ): void => {
                const activeScope = targetFunctionScopes.at(-1);

                if (activeScope === undefined || testExpression === null) {
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
