import { isImportMetaEnvMemberExpression } from "../_internal/ast.js";
import { isConfigFile } from "../_internal/config-files.js";
import { createTypedRule } from "../_internal/typed-rule.js";

type MessageId = "noImportMetaEnvInConfig";

/**
 * Disallow `import.meta.env` inside Vite and Vitest config evaluation.
 */
const noImportMetaEnvInConfigRule: ReturnType<typeof createTypedRule> =
    createTypedRule<[], MessageId>({
        create(context) {
            if (!isConfigFile(context.filename)) {
                return {};
            }

            return {
                MemberExpression(node) {
                    if (!isImportMetaEnvMemberExpression(node)) {
                        return;
                    }

                    context.report({
                        messageId: "noImportMetaEnvInConfig",
                        node,
                    });
                },
            };
        },
        defaultOptions: [],
        meta: {
            deprecated: false,
            docs: {
                description:
                    "disallow `import.meta.env` while Vite or Vitest config files are being evaluated; use `process.env` or `loadEnv(...)` instead.",
                frozen: false,
                recommended: true,
                requiresTypeChecking: false,
                url: "https://nick2bad4u.github.io/eslint-plugin-vite/docs/rules/no-import-meta-env-in-config",
                viteConfigs: [
                    "vite.configs.recommended",
                    "vite.configs.strict",
                    "vite.configs.all",
                    "vite.configs.configs",
                    "vite.configs.vitest",
                ],
            },
            messages: {
                noImportMetaEnvInConfig:
                    "Do not read `import.meta.env` while the config is being evaluated. Use `process.env` for already-exported environment variables or `loadEnv(...)` to read `.env*` files for config decisions.",
            },
            schema: [],
            type: "problem",
        },
        name: "no-import-meta-env-in-config",
    });

export default noImportMetaEnvInConfigRule;
