import type { TSESTree } from "@typescript-eslint/utils";

import { createTypedRule } from "../_internal/typed-rule.js";

type MessageId = "mixedApis";

const testApiNames = new Set(["it", "test"]);
const benchApiNames = new Set(["bench"]);

const getImportedNamesBySource = (
    node: Readonly<TSESTree.ImportDeclaration>
): ReadonlyMap<string, string> => {
    const names = new Map<string, string>();

    for (const specifier of node.specifiers) {
        if (specifier.type !== "ImportSpecifier") {
            continue;
        }

        names.set(
            specifier.local.name,
            specifier.imported.type === "Identifier"
                ? specifier.imported.name
                : specifier.imported.value
        );
    }

    return names;
};

/** Disallow mixing Vitest correctness tests and benchmark APIs within one file. */
const noMixedTestAndBenchApisRule: ReturnType<typeof createTypedRule> =
    createTypedRule<[], MessageId>({
        create(context) {
            let hasVitestImport = false;
            const importedNames = new Map<string, string>();
            let firstBenchCall: null | TSESTree.CallExpression = null;
            let firstTestCall: null | TSESTree.CallExpression = null;

            return {
                CallExpression(node) {
                    if (node.callee.type !== "Identifier") {
                        return;
                    }

                    const importedName = importedNames.get(node.callee.name);

                    const isTestApi =
                        importedName === undefined
                            ? hasVitestImport &&
                              testApiNames.has(node.callee.name)
                            : testApiNames.has(importedName);
                    const isBenchApi =
                        importedName === undefined
                            ? hasVitestImport &&
                              benchApiNames.has(node.callee.name)
                            : benchApiNames.has(importedName);

                    if (isTestApi && firstTestCall === null) {
                        firstTestCall = node;
                    }

                    if (isBenchApi && firstBenchCall === null) {
                        firstBenchCall = node;
                    }
                },
                ImportDeclaration(node) {
                    if (node.source.value !== "vitest") {
                        return;
                    }

                    hasVitestImport = true;

                    for (const [
                        localName,
                        importedName,
                    ] of getImportedNamesBySource(node)) {
                        importedNames.set(localName, importedName);
                    }
                },
                "Program:exit"() {
                    if (firstBenchCall === null || firstTestCall === null) {
                        return;
                    }

                    context.report({
                        messageId: "mixedApis",
                        node: firstBenchCall,
                    });
                },
            };
        },
        meta: {
            deprecated: false,
            docs: {
                description:
                    "disallow mixing Vitest benchmark APIs and test APIs in the same file.",
                frozen: false,
                recommended: true,
                requiresTypeChecking: false,
                url: "https://nick2bad4u.github.io/eslint-plugin-vite/docs/rules/no-mixed-test-and-bench-apis",
                viteConfigs: [
                    "vite.configs.recommended",
                    "vite.configs.strict",
                    "vite.configs.all",
                    "vite.configs.vitest",
                    "vite.configs.vitest-bench",
                ],
            },
            messages: {
                mixedApis:
                    "Do not mix Vitest `bench()` calls with `it()` or `test()` in the same file; keep benchmarks isolated from correctness tests.",
            },
            schema: [],
            type: "problem",
        },
        name: "no-mixed-test-and-bench-apis",
    });

export default noMixedTestAndBenchApisRule;
