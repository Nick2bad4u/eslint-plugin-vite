import type { TSESTree } from "@typescript-eslint/utils";

import {
    getStaticStringValue,
    isImportMetaEnvMemberExpression,
} from "../_internal/ast.js";
import { isLikelyClientFile } from "../_internal/config-files.js";
import { createTypedRule } from "../_internal/typed-rule.js";

type MessageId = "restrictedEnvKey";

type RuleOptions = [
    Readonly<{
        allowPrefixes?: readonly string[];
    }>,
];

const builtInImportMetaEnvKeys = new Set([
    "BASE_URL",
    "DEV",
    "MODE",
    "PROD",
    "SSR",
]);

const defaultOptions = [
    {
        allowPrefixes: ["VITE_"],
    },
] as const satisfies RuleOptions;

const getStaticEnvKey = (
    node: Readonly<TSESTree.MemberExpression>
): string | undefined => {
    if (!node.computed && node.property.type === "Identifier") {
        return node.property.name;
    }

    return getStaticStringValue(node.property);
};

/**
 * Restrict client-visible `import.meta.env` access to built-ins and approved
 * prefixes.
 */
const noRestrictedImportMetaEnvRule: ReturnType<typeof createTypedRule> =
    createTypedRule<RuleOptions, MessageId>({
        create(context, [options]) {
            if (!isLikelyClientFile(context.filename)) {
                return {};
            }

            const allowPrefixes =
                options.allowPrefixes ?? defaultOptions[0].allowPrefixes;

            return {
                MemberExpression(node) {
                    if (!isImportMetaEnvMemberExpression(node.object)) {
                        return;
                    }

                    const envKey = getStaticEnvKey(node);

                    if (
                        envKey === undefined ||
                        builtInImportMetaEnvKeys.has(envKey)
                    ) {
                        return;
                    }

                    if (
                        allowPrefixes.some((prefix) =>
                            envKey.startsWith(prefix)
                        )
                    ) {
                        return;
                    }

                    context.report({
                        data: {
                            envKey,
                        },
                        messageId: "restrictedEnvKey",
                        node: node.property,
                    });
                },
            };
        },
        meta: {
            defaultOptions: [
                {
                    allowPrefixes: ["VITE_"],
                },
            ],
            deprecated: false,
            docs: {
                description:
                    "disallow client-side `import.meta.env` keys that are not built-in Vite keys and do not match an allowed public prefix such as `VITE_`.",
                frozen: false,
                recommended: false,
                requiresTypeChecking: false,
                url: "https://nick2bad4u.github.io/eslint-plugin-vite/docs/rules/no-restricted-import-meta-env",
                viteConfigs: [
                    "vite.configs.strict",
                    "vite.configs.all",
                    "vite.configs.client",
                    "vite.configs.vitepress",
                ],
            },
            messages: {
                restrictedEnvKey:
                    "`import.meta.env.{{ envKey }}` is not a built-in Vite key and does not match an allowed public env prefix such as `VITE_`.",
            },
            schema: [
                {
                    additionalProperties: false,
                    properties: {
                        allowPrefixes: {
                            description:
                                "List of public env key prefixes that are allowed in client-side import.meta.env access.",
                            items: {
                                type: "string",
                            },
                            type: "array",
                        },
                    },
                    type: "object",
                },
            ],
            type: "problem",
        },
        name: "no-restricted-import-meta-env",
    });

export default noRestrictedImportMetaEnvRule;
