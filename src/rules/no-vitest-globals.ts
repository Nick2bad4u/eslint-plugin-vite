import type { TSESTree } from "@typescript-eslint/utils";

import { getPropertyPath, propertyPathEndsWith } from "../_internal/ast.js";
import { getConfigFileKind } from "../_internal/config-files.js";
import { createTypedRule } from "../_internal/typed-rule.js";

type MessageId = "vitestGlobals";

const globalsPathSuffix = ["test", "globals"] as const;

const isBooleanLiteral = (
    node: Readonly<TSESTree.Property["value"]>,
    expected: boolean
): boolean => node.type === "Literal" && node.value === expected;

/**
 * Disallow `test.globals: true` so Vitest APIs stay explicit and local to
 * imports.
 */
const noVitestGlobalsRule: ReturnType<typeof createTypedRule> = createTypedRule<
    [],
    MessageId
>({
    create(context) {
        if (getConfigFileKind(context.filename) === null) {
            return {};
        }

        return {
            Property(node) {
                if (
                    !propertyPathEndsWith(
                        getPropertyPath(node),
                        globalsPathSuffix
                    ) ||
                    !isBooleanLiteral(node.value, true)
                ) {
                    return;
                }

                context.report({
                    messageId: "vitestGlobals",
                    node: node.value,
                });
            },
        };
    },
    defaultOptions: [],
    meta: {
        deprecated: false,
        docs: {
            description:
                "disallow `test.globals: true` in Vitest config to keep test APIs explicit via imports.",
            frozen: false,
            recommended: false,
            requiresTypeChecking: false,
            url: "https://nick2bad4u.github.io/eslint-plugin-vite/docs/rules/no-vitest-globals",
            viteConfigs: [
                "vite.configs.strict",
                "vite.configs.all",
                "vite.configs.configs",
                "vite.configs.vitest",
            ],
        },
        messages: {
            vitestGlobals:
                "Avoid `test.globals: true`; explicit imports (`import { describe, it, expect } from 'vitest'`) keep API usage clearer and reduce accidental global coupling.",
        },
        schema: [],
        type: "suggestion",
    },
    name: "no-vitest-globals",
});

export default noVitestGlobalsRule;
