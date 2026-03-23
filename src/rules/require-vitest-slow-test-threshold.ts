import { getPropertyPath, propertyPathEndsWith } from "../_internal/ast.js";
import {
    type ConfigFileKind,
    getConfigFileKind,
} from "../_internal/config-files.js";
import { createTypedRule } from "../_internal/typed-rule.js";

type MessageId = "missingSlowTestThreshold";

const slowTestThresholdPathSuffix = ["test", "slowTestThreshold"] as const;

const shouldRequireSlowThreshold = (
    configFileKind: ConfigFileKind,
    hasAnyTestConfig: boolean
): boolean => configFileKind === "vitest" || hasAnyTestConfig;

/** Require explicit `test.slowTestThreshold` in Vitest-oriented config. */
const requireVitestSlowTestThresholdRule: ReturnType<typeof createTypedRule> =
    createTypedRule<[], MessageId>({
        create(context) {
            const configFileKind = getConfigFileKind(context.filename);

            if (configFileKind === null) {
                return {};
            }

            let hasAnyTestConfig = false;
            let hasSlowTestThreshold = false;

            return {
                "Program:exit"(node) {
                    if (
                        hasSlowTestThreshold ||
                        !shouldRequireSlowThreshold(
                            configFileKind,
                            hasAnyTestConfig
                        )
                    ) {
                        return;
                    }

                    context.report({
                        messageId: "missingSlowTestThreshold",
                        node,
                    });
                },
                Property(node) {
                    const propertyPath = getPropertyPath(node);

                    if (propertyPath[0] === "test") {
                        hasAnyTestConfig = true;
                    }

                    if (
                        propertyPathEndsWith(
                            propertyPath,
                            slowTestThresholdPathSuffix
                        )
                    ) {
                        hasSlowTestThreshold = true;
                    }
                },
            };
        },
        defaultOptions: [],
        meta: {
            deprecated: false,
            docs: {
                description:
                    "require explicit `test.slowTestThreshold` in committed Vitest config.",
                frozen: false,
                recommended: false,
                requiresTypeChecking: false,
                url: "https://nick2bad4u.github.io/eslint-plugin-vite/docs/rules/require-vitest-slow-test-threshold",
                viteConfigs: [
                    "vite.configs.strict",
                    "vite.configs.all",
                    "vite.configs.vitest",
                    "vite.configs.vitest-bench",
                ],
            },
            messages: {
                missingSlowTestThreshold:
                    "Set `test.slowTestThreshold` explicitly for predictable slow-test reporting.",
            },
            schema: [],
            type: "suggestion",
        },
        name: "require-vitest-slow-test-threshold",
    });

export default requireVitestSlowTestThresholdRule;
