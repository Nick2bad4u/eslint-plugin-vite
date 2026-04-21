import type { TSESLint, TSESTree } from "@typescript-eslint/utils";

import { arrayIncludes } from "ts-extras";

import { findPropertyByName } from "../_internal/ast.js";
import { getConfigFileKind } from "../_internal/config-files.js";
import { createTypedRule } from "../_internal/typed-rule.js";
import {
    getInlineVitestProjectEntries,
    getVitestProjectFactoryCallName,
    getVitestProjectTestObject,
    isVitestProjectsProperty,
} from "../_internal/vitest-projects.js";

type MessageId = "unsupportedProjectOption";
type UnsupportedProjectOption = Readonly<{
    guidance: string;
    optionName: string;
}>;

const unsupportedProjectOptions: readonly UnsupportedProjectOption[] = [
    {
        guidance:
            "Move coverage configuration to the root Vitest config because coverage runs for the whole process.",
        optionName: "coverage",
    },
    {
        guidance:
            "Move reporters to the root Vitest config because reporters are only supported once per run.",
        optionName: "reporters",
    },
    {
        guidance:
            "Move `resolveSnapshotPath` to the root Vitest config because only the root resolver is respected.",
        optionName: "resolveSnapshotPath",
    },
] as const;

const reportUnsupportedProjectOptions = (
    context: Readonly<TSESLint.RuleContext<MessageId, []>>,
    projectObject: Readonly<TSESTree.ObjectExpression>
): void => {
    const testObject = getVitestProjectTestObject(projectObject);

    if (testObject === undefined) {
        return;
    }

    for (const unsupportedOption of unsupportedProjectOptions) {
        const property = findPropertyByName(
            testObject,
            unsupportedOption.optionName
        );

        if (property === undefined) {
            continue;
        }

        context.report({
            data: unsupportedOption,
            messageId: "unsupportedProjectOption",
            node: property,
        });
    }
};

/** Disallow documented root-only Vitest options inside project configurations. */
const noUnsupportedProjectOptionsRule: ReturnType<typeof createTypedRule> =
    createTypedRule<[], MessageId>({
        create(context) {
            if (getConfigFileKind(context.filename) === null) {
                return {};
            }

            const reportUnsupportedOptionsInProjectEntries = (
                projectEntries: ReturnType<typeof getInlineVitestProjectEntries>
            ): void => {
                for (const projectEntry of projectEntries) {
                    if (
                        getVitestProjectFactoryCallName(projectEntry) ===
                        "defineProject"
                    ) {
                        continue;
                    }

                    reportUnsupportedProjectOptions(
                        context,
                        projectEntry.projectObject
                    );
                }
            };

            return {
                CallExpression(node) {
                    if (
                        node.callee.type !== "Identifier" ||
                        !arrayIncludes(
                            ["defineProject", "defineWorkspace"] as const,
                            node.callee.name
                        )
                    ) {
                        return;
                    }

                    if (node.callee.name === "defineWorkspace") {
                        const [workspaceArgument] = node.arguments;

                        if (workspaceArgument?.type !== "ArrayExpression") {
                            return;
                        }

                        reportUnsupportedOptionsInProjectEntries(
                            getInlineVitestProjectEntries(
                                workspaceArgument,
                                "workspace"
                            )
                        );

                        return;
                    }

                    const [firstArgument] = node.arguments;

                    if (
                        firstArgument === undefined ||
                        firstArgument.type === "SpreadElement" ||
                        firstArgument.type !== "ObjectExpression"
                    ) {
                        return;
                    }

                    reportUnsupportedProjectOptions(context, firstArgument);
                },
                Property(node) {
                    if (
                        !isVitestProjectsProperty(node) ||
                        node.value.type !== "ArrayExpression"
                    ) {
                        return;
                    }

                    reportUnsupportedOptionsInProjectEntries(
                        getInlineVitestProjectEntries(node.value, "projects")
                    );
                },
            };
        },
        meta: {
            deprecated: false,
            docs: {
                description:
                    "disallow documented root-only Vitest options such as `coverage`, `reporters`, and `resolveSnapshotPath` inside project configs.",
                frozen: false,
                recommended: true,
                requiresTypeChecking: false,
                url: "https://nick2bad4u.github.io/eslint-plugin-vite/docs/rules/no-unsupported-project-options",
                viteConfigs: [
                    "vite.configs.recommended",
                    "vite.configs.strict",
                    "vite.configs.all",
                    "vite.configs.vitest",
                ],
            },
            messages: {
                unsupportedProjectOption:
                    "Vitest project configs should not declare root-only `test.{{ optionName }}`. {{ guidance }}",
            },
            schema: [],
            type: "problem",
        },
        name: "no-unsupported-project-options",
    });

export default noUnsupportedProjectOptionsRule;
