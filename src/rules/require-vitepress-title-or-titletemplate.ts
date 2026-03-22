import { getPropertyPath, propertyPathEndsWith } from "../_internal/ast.js";
import {
    getConfigFileKind,
    normalizeFilename,
} from "../_internal/config-files.js";
import { createTypedRule } from "../_internal/typed-rule.js";

type MessageId = "missingTitleMetadata";

const titlePathSuffix = ["title"] as const;
const titleTemplatePathSuffix = ["titleTemplate"] as const;

const isVitePressConfigFile = (filename: string): boolean => {
    const normalized = normalizeFilename(filename).toLowerCase();

    return /(?:^|\/)\.vitepress\/config\./u.test(normalized);
};

/**
 * Require at least one of `title` or `titleTemplate` in `.vitepress/config.*`.
 */
const requireVitePressTitleOrTitleTemplateRule: ReturnType<
    typeof createTypedRule
> = createTypedRule<[], MessageId>({
    create(context) {
        if (
            getConfigFileKind(context.filename) === null ||
            !isVitePressConfigFile(context.filename)
        ) {
            return {};
        }

        let hasTitleMetadata = false;

        return {
            "Program:exit"(node) {
                if (hasTitleMetadata) {
                    return;
                }

                context.report({
                    messageId: "missingTitleMetadata",
                    node,
                });
            },
            Property(node) {
                const propertyPath = getPropertyPath(node);

                if (
                    !propertyPathEndsWith(propertyPath, titlePathSuffix) &&
                    !propertyPathEndsWith(propertyPath, titleTemplatePathSuffix)
                ) {
                    return;
                }

                hasTitleMetadata = true;
            },
        };
    },
    defaultOptions: [],
    meta: {
        deprecated: false,
        docs: {
            description:
                "require at least one of `title` or `titleTemplate` in committed VitePress config.",
            frozen: false,
            recommended: false,
            requiresTypeChecking: false,
            url: "https://nick2bad4u.github.io/eslint-plugin-vite/docs/rules/require-vitepress-title-or-titletemplate",
            viteConfigs: [
                "vite.configs.strict",
                "vite.configs.all",
                "vite.configs.vitepress",
            ],
        },
        messages: {
            missingTitleMetadata:
                "Configure at least one of `title` or `titleTemplate` in VitePress config for predictable site metadata.",
        },
        schema: [],
        type: "problem",
    },
    name: "require-vitepress-title-or-titletemplate",
});

export default requireVitePressTitleOrTitleTemplateRule;
