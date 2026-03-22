import { getStaticStringValue, matchesPropertyPath } from "../_internal/ast.js";
import { isConfigFile } from "../_internal/config-files.js";
import { createTypedRule } from "../_internal/typed-rule.js";

type DeprecatedConfigPath = Readonly<{
    current: string;
    guidance: string;
    path: readonly string[];
}>;

type MessageId = "deprecatedConfigOption";

const deprecatedConfigPaths: readonly DeprecatedConfigPath[] = [
    {
        current: "esbuild",
        guidance: "Use the top-level `oxc` option instead.",
        path: ["esbuild"],
    },
    {
        current: "build.polyfillModulePreload",
        guidance: "Use `build.modulePreload.polyfill` instead.",
        path: ["build", "polyfillModulePreload"],
    },
    {
        current: "build.rollupOptions",
        guidance: "Use `build.rolldownOptions` instead.",
        path: ["build", "rollupOptions"],
    },
    {
        current: "optimizeDeps.disabled",
        guidance:
            "Use `optimizeDeps.noDiscovery` together with explicit `optimizeDeps.include` entries instead of the deprecated switch.",
        path: ["optimizeDeps", "disabled"],
    },
    {
        current: "optimizeDeps.esbuildOptions",
        guidance: "Use `optimizeDeps.rolldownOptions` instead.",
        path: ["optimizeDeps", "esbuildOptions"],
    },
    {
        current: "worker.rollupOptions",
        guidance: "Use `worker.rolldownOptions` instead.",
        path: ["worker", "rollupOptions"],
    },
] as const;

/**
 * Disallow deprecated Vite config options and values that now have safer
 * replacements.
 */
const noDeprecatedConfigOptionsRule: ReturnType<typeof createTypedRule> =
    createTypedRule<[], MessageId>({
        create(context) {
            if (!isConfigFile(context.filename)) {
                return {};
            }

            return {
                Property(node) {
                    if (node.parent.type !== "ObjectExpression") {
                        return;
                    }

                    for (const deprecatedPath of deprecatedConfigPaths) {
                        if (!matchesPropertyPath(node, deprecatedPath.path)) {
                            continue;
                        }

                        context.report({
                            data: deprecatedPath,
                            messageId: "deprecatedConfigOption",
                            node,
                        });
                        return;
                    }

                    if (!matchesPropertyPath(node, ["build", "minify"])) {
                        return;
                    }

                    if (
                        node.value.type !== "Literal" &&
                        node.value.type !== "TemplateLiteral"
                    ) {
                        return;
                    }

                    const minifier = getStaticStringValue(node.value);

                    if (minifier !== "esbuild") {
                        return;
                    }

                    context.report({
                        data: {
                            current: 'build.minify: "esbuild"',
                            guidance:
                                'Use `build.minify: "oxc"` or rely on Vite\'s default minifier instead.',
                        },
                        messageId: "deprecatedConfigOption",
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
                    "disallow deprecated Vite config options and deprecated config values that now have newer replacements.",
                frozen: false,
                recommended: false,
                requiresTypeChecking: false,
                url: "https://nick2bad4u.github.io/eslint-plugin-vite/docs/rules/no-deprecated-config-options",
                viteConfigs: [
                    "vite.configs.strict",
                    "vite.configs.all",
                    "vite.configs.configs",
                ],
            },
            messages: {
                deprecatedConfigOption:
                    "Avoid deprecated Vite config option `{{ current }}`. {{ guidance }}",
            },
            schema: [],
            type: "suggestion",
        },
        name: "no-deprecated-config-options",
    });

export default noDeprecatedConfigOptionsRule;
