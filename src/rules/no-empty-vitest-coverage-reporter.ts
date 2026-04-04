import type { TSESTree } from "@typescript-eslint/utils";

import { getPropertyPath, propertyPathEndsWith } from "../_internal/ast.js";
import { getConfigFileKind } from "../_internal/config-files.js";
import { createTypedRule } from "../_internal/typed-rule.js";

type MessageId = "emptyCoverageReporter";

const coverageReporterPathSuffix = [
    "test",
    "coverage",
    "reporter",
] as const;

const isEmptyArrayExpression = (
    node: Readonly<TSESTree.Property["value"]>
): node is TSESTree.ArrayExpression =>
    node.type === "ArrayExpression" && node.elements.length === 0;

/** Disallow empty Vitest coverage reporter arrays. */
const noEmptyVitestCoverageReporterRule: ReturnType<typeof createTypedRule> =
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
                            coverageReporterPathSuffix
                        ) ||
                        !isEmptyArrayExpression(node.value)
                    ) {
                        return;
                    }

                    context.report({
                        messageId: "emptyCoverageReporter",
                        node: node.value,
                    });
                },
            };
        },
        meta: {
            deprecated: false,
            docs: {
                description:
                    "disallow empty Vitest `test.coverage.reporter` arrays that suppress report output.",
                frozen: false,
                recommended: false,
                requiresTypeChecking: false,
                url: "https://nick2bad4u.github.io/eslint-plugin-vite/docs/rules/no-empty-vitest-coverage-reporter",
                viteConfigs: [
                    "vite.configs.strict",
                    "vite.configs.all",
                    "vite.configs.configs",
                    "vite.configs.vitest",
                ],
            },
            messages: {
                emptyCoverageReporter:
                    "Avoid `test.coverage.reporter: []`; an empty reporter list disables meaningful coverage report output.",
            },
            schema: [],
            type: "problem",
        },
        name: "no-empty-vitest-coverage-reporter",
    });

export default noEmptyVitestCoverageReporterRule;
