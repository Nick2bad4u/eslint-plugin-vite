import type { TSESTree } from "@typescript-eslint/utils";

import { getPropertyPath, propertyPathEndsWith } from "../_internal/ast.js";
import { getConfigFileKind } from "../_internal/config-files.js";
import { createTypedRule } from "../_internal/typed-rule.js";

type MessageId = "passWithNoTests";

const passWithNoTestsPathSuffix = ["test", "passWithNoTests"] as const;

const isBooleanLiteral = (
    node: Readonly<TSESTree.Property["value"]>,
    expected: boolean
): boolean => node.type === "Literal" && node.value === expected;

/**
 * Disallow `test.passWithNoTests: true` in Vitest config to avoid masking
 * missing test discovery.
 */
const noPassWithNoTestsRule: ReturnType<typeof createTypedRule> =
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
                            passWithNoTestsPathSuffix
                        ) ||
                        !isBooleanLiteral(node.value, true)
                    ) {
                        return;
                    }

                    context.report({
                        messageId: "passWithNoTests",
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
                    "disallow `test.passWithNoTests: true` in Vitest configuration because it can hide missing test discovery.",
                frozen: false,
                recommended: false,
                requiresTypeChecking: false,
                url: "https://nick2bad4u.github.io/eslint-plugin-vite/docs/rules/no-pass-with-no-tests",
                viteConfigs: [
                    "vite.configs.strict",
                    "vite.configs.all",
                    "vite.configs.configs",
                    "vite.configs.vitest",
                ],
            },
            messages: {
                passWithNoTests:
                    "Avoid `test.passWithNoTests: true`; this can let suites pass when tests are accidentally not discovered.",
            },
            schema: [],
            type: "problem",
        },
        name: "no-pass-with-no-tests",
    });

export default noPassWithNoTestsRule;
