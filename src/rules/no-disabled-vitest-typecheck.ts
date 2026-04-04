import type { TSESTree } from "@typescript-eslint/utils";

import { getPropertyPath, propertyPathEndsWith } from "../_internal/ast.js";
import { getConfigFileKind } from "../_internal/config-files.js";
import { createTypedRule } from "../_internal/typed-rule.js";

type MessageId = "unsafeTypecheckOption";
type UnsafeTypecheckOption = Readonly<{
    guidance: string;
    optionPath: string;
}>;

const enabledPathSuffix = [
    "test",
    "typecheck",
    "enabled",
] as const;
const ignoreSourceErrorsPathSuffix = [
    "test",
    "typecheck",
    "ignoreSourceErrors",
] as const;

const isBooleanLiteral = (
    node: Readonly<TSESTree.Property["value"]>,
    expected: boolean
): boolean => node.type === "Literal" && node.value === expected;

const getUnsafeTypecheckOption = (
    node: Readonly<TSESTree.Property>
): undefined | UnsafeTypecheckOption => {
    const propertyPath = getPropertyPath(node);

    if (
        propertyPathEndsWith(propertyPath, enabledPathSuffix) &&
        isBooleanLiteral(node.value, false)
    ) {
        return {
            guidance:
                "Disabling Vitest typechecking removes a fast static safety net; prefer enabling typecheck or removing this override.",
            optionPath: "test.typecheck.enabled",
        };
    }

    if (
        propertyPathEndsWith(propertyPath, ignoreSourceErrorsPathSuffix) &&
        isBooleanLiteral(node.value, true)
    ) {
        return {
            guidance:
                "Ignoring source errors can hide TypeScript regressions outside test files; keep this option disabled for reliable CI feedback.",
            optionPath: "test.typecheck.ignoreSourceErrors",
        };
    }

    return undefined;
};

/**
 * Disallow Vitest typecheck options that hide or disable static test safety
 * signals.
 */
const noDisabledVitestTypecheckRule: ReturnType<typeof createTypedRule> =
    createTypedRule<[], MessageId>({
        create(context) {
            if (getConfigFileKind(context.filename) === null) {
                return {};
            }

            return {
                Property(node) {
                    const unsafeOption = getUnsafeTypecheckOption(node);

                    if (unsafeOption === undefined) {
                        return;
                    }

                    context.report({
                        data: unsafeOption,
                        messageId: "unsafeTypecheckOption",
                        node: node.value,
                    });
                },
            };
        },
        meta: {
            deprecated: false,
            docs: {
                description:
                    "disallow Vitest typecheck options that disable typecheck execution or hide source errors.",
                frozen: false,
                recommended: false,
                requiresTypeChecking: false,
                url: "https://nick2bad4u.github.io/eslint-plugin-vite/docs/rules/no-disabled-vitest-typecheck",
                viteConfigs: [
                    "vite.configs.strict",
                    "vite.configs.all",
                    "vite.configs.configs",
                    "vite.configs.vitest",
                ],
            },
            messages: {
                unsafeTypecheckOption:
                    "Avoid unsafe Vitest option `{{ optionPath }}`. {{ guidance }}",
            },
            schema: [],
            type: "problem",
        },
        name: "no-disabled-vitest-typecheck",
    });

export default noDisabledVitestTypecheckRule;
