import type { TSESTree } from "@typescript-eslint/utils";

import {
    getPropertyPath,
    getStaticStringValue,
    propertyPathEndsWith,
} from "../_internal/ast.js";
import { getConfigFileKind } from "../_internal/config-files.js";
import { createTypedRule } from "../_internal/typed-rule.js";

type MessageId = "missingSequenceSeed";

const shufflePathSuffix = [
    "test",
    "sequence",
    "shuffle",
] as const;

const seedPathSuffix = [
    "test",
    "sequence",
    "seed",
] as const;

const isBooleanLiteral = (
    node: Readonly<TSESTree.Property["value"]>,
    expected: boolean
): boolean => node.type === "Literal" && node.value === expected;

const hasStaticSeedValue = (
    node: Readonly<TSESTree.Property["value"]>
): boolean => {
    if (node.type === "Literal") {
        return node.value !== null;
    }

    if (node.type === "TemplateLiteral") {
        const staticValue = getStaticStringValue(node);

        return staticValue !== undefined;
    }

    return false;
};

/**
 * Require explicit `test.sequence.seed` whenever `test.sequence.shuffle` is
 * enabled.
 */
const requireVitestSequenceSeedWhenShuffleRule: ReturnType<
    typeof createTypedRule
> = createTypedRule<[], MessageId>({
    create(context) {
        if (getConfigFileKind(context.filename) === null) {
            return {};
        }

        let firstShuffleTrueNode: null | TSESTree.Node = null;
        let hasSeed = false;

        return {
            "Program:exit"() {
                if (firstShuffleTrueNode === null || hasSeed) {
                    return;
                }

                context.report({
                    messageId: "missingSequenceSeed",
                    node: firstShuffleTrueNode,
                });
            },
            Property(node) {
                const propertyPath = getPropertyPath(node);

                if (
                    propertyPathEndsWith(propertyPath, shufflePathSuffix) &&
                    isBooleanLiteral(node.value, true)
                ) {
                    firstShuffleTrueNode ??= node.value;
                }

                if (
                    propertyPathEndsWith(propertyPath, seedPathSuffix) &&
                    hasStaticSeedValue(node.value)
                ) {
                    hasSeed = true;
                }
            },
        };
    },
    defaultOptions: [],
    meta: {
        deprecated: false,
        docs: {
            description:
                "require explicit `test.sequence.seed` when `test.sequence.shuffle` is enabled.",
            frozen: false,
            recommended: false,
            requiresTypeChecking: false,
            url: "https://nick2bad4u.github.io/eslint-plugin-vite/docs/rules/require-vitest-sequence-seed-when-shuffle",
            viteConfigs: [
                "vite.configs.strict",
                "vite.configs.all",
                "vite.configs.configs",
                "vite.configs.vitest",
            ],
        },
        messages: {
            missingSequenceSeed:
                "When `test.sequence.shuffle` is enabled, provide an explicit `test.sequence.seed` so order-dependent failures are reproducible.",
        },
        schema: [],
        type: "problem",
    },
    name: "require-vitest-sequence-seed-when-shuffle",
});

export default requireVitestSequenceSeedWhenShuffleRule;
