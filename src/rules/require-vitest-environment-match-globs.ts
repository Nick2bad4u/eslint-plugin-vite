import type { TSESTree } from "@typescript-eslint/utils";

import { isDefined } from "ts-extras";

import {
    getPropertyPath,
    getStaticStringValue,
    propertyPathEndsWith,
} from "../_internal/ast.js";
import { getConfigFileKind } from "../_internal/config-files.js";
import { createTypedRule } from "../_internal/typed-rule.js";

type MessageId = "missingEnvironmentMatchGlobs";

const environmentPathSuffix = ["test", "environment"] as const;

const environmentMatchGlobsPathSuffix = [
    "test",
    "environmentMatchGlobs",
] as const;

const getStaticString = (
    node: Readonly<TSESTree.Property["value"]>
): string | undefined => {
    if (node.type === "Literal" && typeof node.value === "string") {
        return node.value.trim();
    }

    if (node.type === "TemplateLiteral") {
        return getStaticStringValue(node)?.trim();
    }

    return undefined;
};

const hasNonEmptyEnvironmentMatchGlobs = (
    node: Readonly<TSESTree.Property["value"]>
): boolean => node.type === "ArrayExpression" && node.elements.length > 0;

/**
 * Require explicit `test.environmentMatchGlobs` when multiple static
 * `test.environment` values are configured in the same file.
 */
const requireVitestEnvironmentMatchGlobsRule: ReturnType<
    typeof createTypedRule
> = createTypedRule<[], MessageId>({
    create(context) {
        if (getConfigFileKind(context.filename) === null) {
            return {};
        }

        const environments = new Set<string>();
        let firstEnvironmentNode: null | Readonly<TSESTree.Node> = null;
        let hasEnvironmentMatchGlobs = false;

        return {
            "Program:exit"() {
                if (
                    environments.size < 2 ||
                    hasEnvironmentMatchGlobs ||
                    firstEnvironmentNode === null
                ) {
                    return;
                }

                context.report({
                    messageId: "missingEnvironmentMatchGlobs",
                    node: firstEnvironmentNode,
                });
            },
            Property(node) {
                const propertyPath = getPropertyPath(node);

                if (
                    propertyPathEndsWith(
                        propertyPath,
                        environmentMatchGlobsPathSuffix
                    ) &&
                    hasNonEmptyEnvironmentMatchGlobs(node.value)
                ) {
                    hasEnvironmentMatchGlobs = true;

                    return;
                }

                if (
                    !propertyPathEndsWith(propertyPath, environmentPathSuffix)
                ) {
                    return;
                }

                const environmentName = getStaticString(node.value);

                if (
                    !isDefined(environmentName) ||
                    environmentName.length === 0
                ) {
                    return;
                }

                firstEnvironmentNode ??= node.value;
                environments.add(environmentName);
            },
        };
    },
    meta: {
        deprecated: false,
        docs: {
            description:
                "require explicit non-empty `test.environmentMatchGlobs` when multiple static `test.environment` values are used in one config file.",
            frozen: false,
            recommended: false,
            requiresTypeChecking: false,
            url: "https://nick2bad4u.github.io/eslint-plugin-vite/docs/rules/require-vitest-environment-match-globs",
            viteConfigs: [
                "vite.configs.strict",
                "vite.configs.all",
                "vite.configs.configs",
                "vite.configs.vitest",
            ],
        },
        messages: {
            missingEnvironmentMatchGlobs:
                "Multiple `test.environment` values are configured in this file; add explicit `test.environmentMatchGlobs` so environment routing stays deterministic.",
        },
        schema: [],
        type: "problem",
    },
    name: "require-vitest-environment-match-globs",
});

export default requireVitestEnvironmentMatchGlobsRule;
