import type { TSESTree } from "@typescript-eslint/utils";

import {
    getPropertyPath,
    getStaticStringValue,
    propertyPathEndsWith,
} from "../_internal/ast.js";
import { getConfigFileKind } from "../_internal/config-files.js";
import { createTypedRule } from "../_internal/typed-rule.js";

type MessageId = "rootReportsDirectory";

const reportsDirectoryPathSuffix = [
    "test",
    "coverage",
    "reportsDirectory",
] as const;

const isRootLikeCoverageDirectory = (
    node: Readonly<TSESTree.Property["value"]>
): boolean => {
    let rawValue: string | undefined = undefined;

    if (node.type === "Literal" && typeof node.value === "string") {
        rawValue = node.value;
    } else if (node.type === "TemplateLiteral") {
        rawValue = getStaticStringValue(node);
    }

    if (rawValue === undefined) {
        return false;
    }

    const trimmed = rawValue.trim();

    if (trimmed.length === 0) {
        return false;
    }

    let withoutTrailingSlashes = trimmed.replaceAll("\\", "/");

    while (withoutTrailingSlashes.endsWith("/")) {
        withoutTrailingSlashes = withoutTrailingSlashes.slice(0, -1);
    }

    return withoutTrailingSlashes === "." || withoutTrailingSlashes === "";
};

/** Disallow root-like coverage output directories such as `.` or `./`. */
const noVitestCoverageTempDirInRepoRootRule: ReturnType<
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
                        reportsDirectoryPathSuffix
                    ) ||
                    !isRootLikeCoverageDirectory(node.value)
                ) {
                    return;
                }

                context.report({
                    messageId: "rootReportsDirectory",
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
                "disallow root-like `test.coverage.reportsDirectory` paths (for example `.` or `./`).",
            frozen: false,
            recommended: false,
            requiresTypeChecking: false,
            url: "https://nick2bad4u.github.io/eslint-plugin-vite/docs/rules/no-vitest-coverage-temp-dir-in-repo-root",
            viteConfigs: [
                "vite.configs.strict",
                "vite.configs.all",
                "vite.configs.configs",
                "vite.configs.vitest",
            ],
        },
        messages: {
            rootReportsDirectory:
                "Avoid root-like `test.coverage.reportsDirectory` paths; write coverage output to a dedicated subdirectory to prevent repository-root pollution.",
        },
        schema: [],
        type: "problem",
    },
    name: "no-vitest-coverage-temp-dir-in-repo-root",
});

export default noVitestCoverageTempDirInRepoRootRule;
