import type { TSESTree } from "@typescript-eslint/utils";

import { AST_NODE_TYPES } from "@typescript-eslint/utils";
import { isDefined } from "ts-extras";

import {
    getPropertyPath,
    getStaticStringValue,
    propertyPathEndsWith,
} from "../_internal/ast.js";
import { getConfigFileKind } from "../_internal/config-files.js";
import { constTuple } from "../_internal/const-tuple.js";
import { createTypedRule } from "../_internal/typed-rule.js";

type MessageId = "missingSequenceSeed";

const shufflePathSuffix = constTuple("test", "sequence", "shuffle");

const seedPathSuffix = constTuple("test", "sequence", "seed");

const isBooleanLiteral = (
    node: Readonly<TSESTree.Property["value"]>,
    expected: boolean
): boolean => node.type === AST_NODE_TYPES.Literal && node.value === expected;

const hasStaticSeedValue = (
    node: Readonly<TSESTree.Property["value"]>
): boolean => {
    if (node.type === AST_NODE_TYPES.Literal) {
        return node.value !== null;
    }

    if (node.type === AST_NODE_TYPES.TemplateLiteral) {
        const staticValue = getStaticStringValue(node);

        return isDefined(staticValue);
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
