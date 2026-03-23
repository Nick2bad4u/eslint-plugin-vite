import type { TSESTree } from "@typescript-eslint/utils";

import { getPropertyPath, propertyPathEndsWith } from "../_internal/ast.js";
import {
    getConfigFileKind,
    normalizeFilename,
} from "../_internal/config-files.js";
import { createTypedRule } from "../_internal/typed-rule.js";

type MessageId = "defaultCacheDirInMonorepo" | "missingCacheDirInMonorepo";

const cacheDirPathSuffix = ["cacheDir"] as const;
const testCacheDirPathSuffix = ["test", "cacheDir"] as const;
const testCacheDirAltPathSuffix = [
    "test",
    "cache",
    "dir",
] as const;

const monorepoPathPattern =
    /(?:^|\/)(?:apps|libs|modules|packages|services)\//u;

const defaultCacheDirValues = new Set([
    "./.vitest",
    "./node_modules/.vitest",
    ".vitest",
    "node_modules/.vitest",
]);

const getStaticString = (
    node: Readonly<TSESTree.Property["value"]>
): null | string => {
    if (node.type === "Literal" && typeof node.value === "string") {
        return node.value;
    }

    if (
        node.type === "TemplateLiteral" &&
        node.expressions.length === 0 &&
        node.quasis.length === 1
    ) {
        return node.quasis[0]?.value.cooked ?? null;
    }

    return null;
};

const isLikelyMonorepoConfig = (filename: string): boolean => {
    const normalized = normalizeFilename(filename).toLowerCase();

    return monorepoPathPattern.test(normalized);
};

/**
 * In likely monorepos, disallow relying on default cache-dir behavior and
 * require explicit non-default cache dirs for Vitest.
 */
const noVitestDefaultCacheDirInMonorepoRule: ReturnType<
    typeof createTypedRule
> = createTypedRule<[], MessageId>({
    create(context) {
        const configFileKind = getConfigFileKind(context.filename);

        if (configFileKind === null) {
            return {};
        }

        const likelyMonorepo =
            configFileKind === "workspace" ||
            isLikelyMonorepoConfig(context.filename);

        if (!likelyMonorepo) {
            return {};
        }

        let hasAnyTestConfig = false;
        let hasExplicitCacheDir = false;
        let hasDefaultCacheDir = false;
        let firstTestPropertyNode: null | TSESTree.Property = null;
        let defaultCacheDirNode: null | TSESTree.Property = null;
        let defaultCacheDirValue: null | string = null;

        return {
            "Program:exit"(programNode) {
                if (!hasAnyTestConfig && configFileKind !== "workspace") {
                    return;
                }

                if (!hasExplicitCacheDir) {
                    context.report({
                        messageId: "missingCacheDirInMonorepo",
                        node: firstTestPropertyNode ?? programNode,
                    });

                    return;
                }

                if (!hasDefaultCacheDir) {
                    return;
                }

                context.report({
                    data: {
                        value: defaultCacheDirValue ?? "node_modules/.vitest",
                    },
                    messageId: "defaultCacheDirInMonorepo",
                    node:
                        defaultCacheDirNode ??
                        firstTestPropertyNode ??
                        programNode,
                });
            },
            Property(node) {
                const propertyPath = getPropertyPath(node);

                if (propertyPath[0] === "test") {
                    hasAnyTestConfig = true;

                    if (firstTestPropertyNode === null) {
                        firstTestPropertyNode = node;
                    }
                }

                if (
                    !propertyPathEndsWith(propertyPath, cacheDirPathSuffix) &&
                    !propertyPathEndsWith(
                        propertyPath,
                        testCacheDirPathSuffix
                    ) &&
                    !propertyPathEndsWith(
                        propertyPath,
                        testCacheDirAltPathSuffix
                    )
                ) {
                    return;
                }

                hasExplicitCacheDir = true;

                const staticString = getStaticString(node.value);

                if (staticString === null) {
                    return;
                }

                if (defaultCacheDirValues.has(staticString)) {
                    hasDefaultCacheDir = true;
                    defaultCacheDirNode = node;
                    defaultCacheDirValue = staticString;
                }
            },
        };
    },
    defaultOptions: [],
    meta: {
        deprecated: false,
        docs: {
            description:
                "require explicit non-default Vitest cache directories in likely monorepos.",
            frozen: false,
            recommended: false,
            requiresTypeChecking: false,
            url: "https://nick2bad4u.github.io/eslint-plugin-vite/docs/rules/no-vitest-default-cache-dir-in-monorepo",
            viteConfigs: [
                "vite.configs.strict",
                "vite.configs.all",
                "vite.configs.vitest",
                "vite.configs.vitest-bench",
            ],
        },
        messages: {
            defaultCacheDirInMonorepo:
                "Use a non-default cache dir in monorepos to avoid cross-project cache collisions (current value: {{value}}).",
            missingCacheDirInMonorepo:
                "Set an explicit Vitest cache dir in monorepos for deterministic cache ownership.",
        },
        schema: [],
        type: "suggestion",
    },
    name: "no-vitest-default-cache-dir-in-monorepo",
});

export default noVitestDefaultCacheDirInMonorepoRule;
