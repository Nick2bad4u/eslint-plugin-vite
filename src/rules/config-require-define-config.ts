import { AST_NODE_TYPES, type TSESTree } from "@typescript-eslint/utils";

import { getConfigFileKind } from "../_internal/config-files.js";
import { createTypedRule } from "../_internal/typed-rule.js";

type MessageId = "requireDefineConfig" | "requireDefineWorkspace";

const acceptedCallNamesByKind = {
    vite: new Set(["defineConfig", "mergeConfig"]),
    vitest: new Set(["defineConfig", "mergeConfig"]),
    workspace: new Set(["defineWorkspace"]),
} as const;

const unwrapExpression = (
    expression: Readonly<TSESTree.Expression>
): Readonly<TSESTree.Expression> => {
    if (expression.type === AST_NODE_TYPES.ChainExpression) {
        return unwrapExpression(expression.expression);
    }

    if (
        expression.type === AST_NODE_TYPES.TSAsExpression ||
        expression.type === AST_NODE_TYPES.TSInstantiationExpression ||
        expression.type === AST_NODE_TYPES.TSNonNullExpression ||
        expression.type === AST_NODE_TYPES.TSSatisfiesExpression ||
        expression.type === AST_NODE_TYPES.TSTypeAssertion
    ) {
        return unwrapExpression(expression.expression);
    }

    return expression;
};

const expressionNodeTypes = new Set<TSESTree.Expression["type"]>([
    AST_NODE_TYPES.ArrayExpression,
    AST_NODE_TYPES.ArrowFunctionExpression,
    AST_NODE_TYPES.AssignmentExpression,
    AST_NODE_TYPES.AwaitExpression,
    AST_NODE_TYPES.BinaryExpression,
    AST_NODE_TYPES.CallExpression,
    AST_NODE_TYPES.ChainExpression,
    AST_NODE_TYPES.ClassExpression,
    AST_NODE_TYPES.ConditionalExpression,
    AST_NODE_TYPES.FunctionExpression,
    AST_NODE_TYPES.Identifier,
    AST_NODE_TYPES.ImportExpression,
    AST_NODE_TYPES.JSXElement,
    AST_NODE_TYPES.JSXFragment,
    AST_NODE_TYPES.Literal,
    AST_NODE_TYPES.LogicalExpression,
    AST_NODE_TYPES.MemberExpression,
    AST_NODE_TYPES.MetaProperty,
    AST_NODE_TYPES.NewExpression,
    AST_NODE_TYPES.ObjectExpression,
    AST_NODE_TYPES.SequenceExpression,
    AST_NODE_TYPES.Super,
    AST_NODE_TYPES.TaggedTemplateExpression,
    AST_NODE_TYPES.TemplateLiteral,
    AST_NODE_TYPES.ThisExpression,
    AST_NODE_TYPES.TSAsExpression,
    AST_NODE_TYPES.TSInstantiationExpression,
    AST_NODE_TYPES.TSNonNullExpression,
    AST_NODE_TYPES.TSSatisfiesExpression,
    AST_NODE_TYPES.TSTypeAssertion,
    AST_NODE_TYPES.UnaryExpression,
    AST_NODE_TYPES.UpdateExpression,
    AST_NODE_TYPES.YieldExpression,
] as const);

const getExportedExpression = (
    declaration: Readonly<TSESTree.ExportDefaultDeclaration["declaration"]>
): null | TSESTree.Expression =>
    expressionNodeTypes.has(declaration.type as TSESTree.Expression["type"])
        ? (declaration as TSESTree.Expression)
        : null;

const isAcceptedExportExpression = (
    expression: Readonly<TSESTree.Expression>,
    fileKind: keyof typeof acceptedCallNamesByKind
): boolean =>
    expression.type === "CallExpression" &&
    expression.callee.type === "Identifier" &&
    acceptedCallNamesByKind[fileKind].has(expression.callee.name);

const getTopLevelVariableInitializers = (
    programBody: readonly Readonly<TSESTree.ProgramStatement>[]
): ReadonlyMap<string, Readonly<TSESTree.Expression>> => {
    const initializers = new Map<string, Readonly<TSESTree.Expression>>();

    for (const statement of programBody) {
        if (statement.type !== AST_NODE_TYPES.VariableDeclaration) {
            continue;
        }

        for (const declarator of statement.declarations) {
            if (
                declarator.id.type !== AST_NODE_TYPES.Identifier ||
                declarator.init === null
            ) {
                continue;
            }

            initializers.set(
                declarator.id.name,
                unwrapExpression(declarator.init)
            );
        }
    }

    return initializers;
};

const resolvesToAcceptedExportExpression = (
    expression: Readonly<TSESTree.Expression>,
    fileKind: keyof typeof acceptedCallNamesByKind,
    variableInitializers: ReadonlyMap<string, Readonly<TSESTree.Expression>>,
    visitedIdentifiers: ReadonlySet<string> = new Set<string>()
): boolean => {
    const unwrappedExpression = unwrapExpression(expression);

    if (isAcceptedExportExpression(unwrappedExpression, fileKind)) {
        return true;
    }

    if (unwrappedExpression.type !== AST_NODE_TYPES.Identifier) {
        return false;
    }

    if (visitedIdentifiers.has(unwrappedExpression.name)) {
        return false;
    }

    const nextVisitedIdentifiers = new Set(visitedIdentifiers);

    nextVisitedIdentifiers.add(unwrappedExpression.name);

    const initializer = variableInitializers.get(unwrappedExpression.name);

    return (
        initializer !== undefined &&
        resolvesToAcceptedExportExpression(
            initializer,
            fileKind,
            variableInitializers,
            nextVisitedIdentifiers
        )
    );
};

/** Require Vite and Vitest config files to export the canonical helper wrappers. */
const configRequireDefineConfigRule: ReturnType<typeof createTypedRule> =
    createTypedRule<[], MessageId>({
        create(context) {
            const fileKind = getConfigFileKind(context.filename);

            if (fileKind === null) {
                return {};
            }

            const variableInitializers = getTopLevelVariableInitializers(
                context.sourceCode.ast.body
            );

            return {
                ExportDefaultDeclaration(node) {
                    const exportedExpression = getExportedExpression(
                        node.declaration
                    );

                    if (exportedExpression === null) {
                        return;
                    }

                    if (
                        resolvesToAcceptedExportExpression(
                            exportedExpression,
                            fileKind,
                            variableInitializers
                        )
                    ) {
                        return;
                    }

                    context.report({
                        messageId:
                            fileKind === "workspace"
                                ? "requireDefineWorkspace"
                                : "requireDefineConfig",
                        node: exportedExpression,
                    });
                },
            };
        },
        meta: {
            deprecated: false,
            docs: {
                description:
                    "require Vite and Vitest config files to export `defineConfig(...)`, `mergeConfig(...)`, or `defineWorkspace(...)` instead of raw objects.",
                frozen: false,
                recommended: true,
                requiresTypeChecking: false,
                url: "https://nick2bad4u.github.io/eslint-plugin-vite/docs/rules/config-require-define-config",
                viteConfigs: [
                    "vite.configs.recommended",
                    "vite.configs.strict",
                    "vite.configs.all",
                    "vite.configs.configs",
                    "vite.configs.vitepress",
                    "vite.configs.vitest",
                ],
            },
            messages: {
                requireDefineConfig:
                    "Export the config with `defineConfig(...)` or `mergeConfig(...)` so Vite or Vitest can validate the config shape consistently.",
                requireDefineWorkspace:
                    "Export Vitest workspace files with `defineWorkspace(...)` instead of a raw array or object.",
            },
            schema: [],
            type: "suggestion",
        },
        name: "config-require-define-config",
    });

export default configRequireDefineConfigRule;
