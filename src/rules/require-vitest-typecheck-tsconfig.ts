import {
    findPropertyByName,
    getPropertyPath,
    getStaticStringValue,
    propertyPathEndsWith,
} from "../_internal/ast.js";
import { getConfigFileKind } from "../_internal/config-files.js";
import { createTypedRule } from "../_internal/typed-rule.js";

type MessageId = "invalidTypecheckTsconfig" | "missingTypecheckTsconfig";

const typecheckPathSuffix = ["test", "typecheck"] as const;

const isBooleanLiteral = (value: unknown, expected: boolean): boolean =>
    typeof value === "object" &&
    value !== null &&
    "type" in value &&
    value.type === "Literal" &&
    "value" in value &&
    value.value === expected;

const isTypecheckEnabled = (
    typecheckObject: Parameters<typeof findPropertyByName>[0]
): boolean => {
    const enabledProperty = findPropertyByName(typecheckObject, "enabled");
    const onlyProperty = findPropertyByName(typecheckObject, "only");

    return (
        (enabledProperty !== undefined &&
            isBooleanLiteral(enabledProperty.value, true)) ||
        (onlyProperty !== undefined &&
            isBooleanLiteral(onlyProperty.value, true))
    );
};

/**
 * Require explicit Vitest `test.typecheck.tsconfig` when typecheck execution is
 * enabled.
 */
const requireVitestTypecheckTsconfigRule: ReturnType<typeof createTypedRule> =
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
                            typecheckPathSuffix
                        ) ||
                        node.value.type !== "ObjectExpression"
                    ) {
                        return;
                    }

                    if (!isTypecheckEnabled(node.value)) {
                        return;
                    }

                    const tsconfigProperty = findPropertyByName(
                        node.value,
                        "tsconfig"
                    );

                    if (tsconfigProperty === undefined) {
                        context.report({
                            messageId: "missingTypecheckTsconfig",
                            node: node.value,
                        });

                        return;
                    }

                    const staticTsconfigValue = getStaticStringValue(
                        tsconfigProperty.value.type === "Literal" ||
                            tsconfigProperty.value.type === "TemplateLiteral"
                            ? tsconfigProperty.value
                            : null
                    );

                    if (
                        staticTsconfigValue === undefined ||
                        staticTsconfigValue.trim().length === 0
                    ) {
                        context.report({
                            messageId: "invalidTypecheckTsconfig",
                            node: tsconfigProperty.value,
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
                    "require explicit `test.typecheck.tsconfig` when Vitest typecheck execution is enabled.",
                frozen: false,
                recommended: false,
                requiresTypeChecking: false,
                url: "https://nick2bad4u.github.io/eslint-plugin-vite/docs/rules/require-vitest-typecheck-tsconfig",
                viteConfigs: [
                    "vite.configs.strict",
                    "vite.configs.all",
                    "vite.configs.configs",
                    "vite.configs.vitest",
                ],
            },
            messages: {
                invalidTypecheckTsconfig:
                    "`test.typecheck.tsconfig` should be a non-empty static string path.",
                missingTypecheckTsconfig:
                    "When Vitest typecheck is enabled (`test.typecheck.enabled` or `test.typecheck.only`), define `test.typecheck.tsconfig` explicitly to keep project resolution stable.",
            },
            schema: [],
            type: "suggestion",
        },
        name: "require-vitest-typecheck-tsconfig",
    });

export default requireVitestTypecheckTsconfigRule;
