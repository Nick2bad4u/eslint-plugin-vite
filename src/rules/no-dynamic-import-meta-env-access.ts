import { isImportMetaEnvMemberExpression } from "../_internal/ast.js";
import { createTypedRule } from "../_internal/typed-rule.js";

/** Disallow dynamic `import.meta.env[key]` access in client-side code. */
const noDynamicImportMetaEnvAccessRule: ReturnType<typeof createTypedRule> =
    createTypedRule<[], "dynamicAccess">({
        create(context) {
            return {
                MemberExpression(node) {
                    if (!isImportMetaEnvMemberExpression(node.object)) {
                        return;
                    }

                    if (!node.computed || node.property.type === "Literal") {
                        return;
                    }

                    context.report({
                        messageId: "dynamicAccess",
                        node: node.property,
                    });
                },
            };
        },
        meta: {
            deprecated: false,
            docs: {
                description:
                    "disallow dynamic `import.meta.env[key]` access that cannot be statically replaced by Vite during builds.",
                frozen: false,
                recommended: true,
                requiresTypeChecking: false,
                url: "https://nick2bad4u.github.io/eslint-plugin-vite/docs/rules/no-dynamic-import-meta-env-access",
                viteConfigs: [
                    "vite.configs.recommended",
                    "vite.configs.strict",
                    "vite.configs.all",
                    "vite.configs.client",
                    "vite.configs.vitepress",
                ],
            },
            messages: {
                dynamicAccess:
                    "Avoid dynamic `import.meta.env[key]` access; use a statically named `import.meta.env.VITE_*` property instead.",
            },
            schema: [],
            type: "problem",
        },
        name: "no-dynamic-import-meta-env-access",
    });

export default noDynamicImportMetaEnvAccessRule;
