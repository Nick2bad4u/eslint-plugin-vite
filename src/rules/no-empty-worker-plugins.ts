import type { TSESTree } from "@typescript-eslint/utils";

import { getPropertyPath, propertyPathEndsWith } from "../_internal/ast.js";
import { getConfigFileKind } from "../_internal/config-files.js";
import { createTypedRule } from "../_internal/typed-rule.js";

type MessageId = "emptyWorkerPlugins";

const workerPluginsPathSuffix = ["worker", "plugins"] as const;

const isEmptyStaticArray = (
    node: Readonly<TSESTree.Property["value"]>
): boolean => node.type === "ArrayExpression" && node.elements.length === 0;

/** Disallow `worker.plugins: []` in Vite config files. */
const noEmptyWorkerPluginsRule: ReturnType<typeof createTypedRule> =
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
                            workerPluginsPathSuffix
                        ) ||
                        !isEmptyStaticArray(node.value)
                    ) {
                        return;
                    }

                    context.report({
                        messageId: "emptyWorkerPlugins",
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
                    "disallow empty `worker.plugins` arrays in committed Vite config.",
                frozen: false,
                recommended: false,
                requiresTypeChecking: false,
                url: "https://nick2bad4u.github.io/eslint-plugin-vite/docs/rules/no-empty-worker-plugins",
                viteConfigs: [
                    "vite.configs.strict",
                    "vite.configs.all",
                    "vite.configs.configs",
                ],
            },
            messages: {
                emptyWorkerPlugins:
                    "`worker.plugins` is empty. Remove it or provide plugin factories.",
            },
            schema: [],
            type: "problem",
        },
        name: "no-empty-worker-plugins",
    });

export default noEmptyWorkerPluginsRule;
