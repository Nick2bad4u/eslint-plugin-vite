import {
    getPropertyPath,
    getStaticStringValue,
    propertyPathEndsWith,
} from "../_internal/ast.js";
import { getConfigFileKind } from "../_internal/config-files.js";
import { createTypedRule } from "../_internal/typed-rule.js";

type MessageId = "emptyProjectName";

const projectNamePathSuffix = ["test", "name"] as const;

/**
 * Disallow empty Vitest `test.name` values in config and inline project
 * definitions.
 */
const noEmptyVitestProjectNameRule: ReturnType<typeof createTypedRule> =
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
                            projectNamePathSuffix
                        ) ||
                        (node.value.type !== "Literal" &&
                            node.value.type !== "TemplateLiteral")
                    ) {
                        return;
                    }

                    const staticName = getStaticStringValue(node.value);

                    if (
                        staticName === undefined ||
                        staticName.trim().length > 0
                    ) {
                        return;
                    }

                    context.report({
                        messageId: "emptyProjectName",
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
                    "disallow empty Vitest project names (`test.name`) in config and workspace entries.",
                frozen: false,
                recommended: false,
                requiresTypeChecking: false,
                url: "https://nick2bad4u.github.io/eslint-plugin-vite/docs/rules/no-empty-vitest-project-name",
                viteConfigs: [
                    "vite.configs.strict",
                    "vite.configs.all",
                    "vite.configs.configs",
                    "vite.configs.vitest",
                ],
            },
            messages: {
                emptyProjectName:
                    "Avoid empty `test.name` values; project names should be non-empty to keep workspace reporting and selection clear.",
            },
            schema: [],
            type: "problem",
        },
        name: "no-empty-vitest-project-name",
    });

export default noEmptyVitestProjectNameRule;
