import type { TSESTree } from "@typescript-eslint/utils";

import { getPropertyPath, getStaticStringValue } from "../_internal/ast.js";
import { getConfigFileKind } from "../_internal/config-files.js";
import { createTypedRule } from "../_internal/typed-rule.js";

type MessageId = "singleThreadPool";

const getStaticNumericValue = (
    node: Readonly<TSESTree.Property["value"]>
): number | undefined => {
    if (node.type === "Literal" && typeof node.value === "number") {
        return node.value;
    }

    if (
        node.type === "Literal" &&
        typeof node.value === "string" &&
        node.value.trim().length > 0
    ) {
        const parsed = Number(node.value);

        return Number.isFinite(parsed) ? parsed : undefined;
    }

    if (node.type === "TemplateLiteral") {
        const staticValue = getStaticStringValue(node);

        if (staticValue === undefined || staticValue.trim().length === 0) {
            return undefined;
        }

        const parsed = Number(staticValue);

        return Number.isFinite(parsed) ? parsed : undefined;
    }

    return undefined;
};

/**
 * Disallow single-thread pool options (`threads/maxThreads/maxWorkers: 1`) in
 * shared Vitest config.
 */
const noVitestSingleThreadPoolByDefaultRule: ReturnType<
    typeof createTypedRule
> = createTypedRule<[], MessageId>({
    create(context) {
        if (getConfigFileKind(context.filename) === null) {
            return {};
        }

        return {
            Property(node) {
                const propertyPath = getPropertyPath(node);
                const lastSegment = propertyPath.at(-1);

                if (
                    !propertyPath.includes("test") ||
                    !propertyPath.includes("poolOptions") ||
                    (lastSegment !== "threads" &&
                        lastSegment !== "maxThreads" &&
                        lastSegment !== "maxWorkers") ||
                    getStaticNumericValue(node.value) !== 1
                ) {
                    return;
                }

                context.report({
                    messageId: "singleThreadPool",
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
                "disallow single-thread Vitest pool settings in committed shared config.",
            frozen: false,
            recommended: false,
            requiresTypeChecking: false,
            url: "https://nick2bad4u.github.io/eslint-plugin-vite/docs/rules/no-vitest-single-thread-pool-by-default",
            viteConfigs: [
                "vite.configs.strict",
                "vite.configs.all",
                "vite.configs.configs",
                "vite.configs.vitest",
            ],
        },
        messages: {
            singleThreadPool:
                "Avoid single-thread pool defaults (`threads/maxThreads/maxWorkers: 1`) in committed config; this can hide concurrency issues and reduce CI throughput.",
        },
        schema: [],
        type: "problem",
    },
    name: "no-vitest-single-thread-pool-by-default",
});

export default noVitestSingleThreadPoolByDefaultRule;
