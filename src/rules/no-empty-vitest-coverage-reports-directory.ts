import {
    getPropertyPath,
    getStaticStringValue,
    propertyPathEndsWith,
} from "../_internal/ast.js";
import { getConfigFileKind } from "../_internal/config-files.js";
import { createTypedRule } from "../_internal/typed-rule.js";

type MessageId = "emptyCoverageReportsDirectory";

const coverageReportsDirectoryPathSuffix = [
    "test",
    "coverage",
    "reportsDirectory",
] as const;

/** Disallow empty Vitest coverage report directory strings. */
const noEmptyVitestCoverageReportsDirectoryRule: ReturnType<
    typeof createTypedRule
> = createTypedRule<[], MessageId>({
    create(context) {
        if (getConfigFileKind(context.filename) === null) {
            return {};
        }

        return {
            Property(node) {
                if (
                    !propertyPathEndsWith(
                        getPropertyPath(node),
                        coverageReportsDirectoryPathSuffix
                    ) ||
                    (node.value.type !== "Literal" &&
                        node.value.type !== "TemplateLiteral")
                ) {
                    return;
                }

                const staticDirectory = getStaticStringValue(node.value);

                if (
                    staticDirectory === undefined ||
                    staticDirectory.trim().length > 0
                ) {
                    return;
                }

                context.report({
                    messageId: "emptyCoverageReportsDirectory",
                    node: node.value,
                });
            },
        };
    },
    meta: {
        deprecated: false,
        docs: {
            description:
                "disallow empty Vitest `test.coverage.reportsDirectory` strings.",
            frozen: false,
            recommended: false,
            requiresTypeChecking: false,
            url: "https://nick2bad4u.github.io/eslint-plugin-vite/docs/rules/no-empty-vitest-coverage-reports-directory",
            viteConfigs: [
                "vite.configs.strict",
                "vite.configs.all",
                "vite.configs.configs",
                "vite.configs.vitest",
            ],
        },
        messages: {
            emptyCoverageReportsDirectory:
                "Avoid empty `test.coverage.reportsDirectory` values; use a non-empty stable path for coverage artifacts.",
        },
        schema: [],
        type: "problem",
    },
    name: "no-empty-vitest-coverage-reports-directory",
});

export default noEmptyVitestCoverageReportsDirectoryRule;
