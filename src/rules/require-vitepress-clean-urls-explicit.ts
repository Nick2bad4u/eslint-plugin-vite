import { getPropertyPath, propertyPathEndsWith } from "../_internal/ast.js";
import {
    getConfigFileKind,
    normalizeFilename,
} from "../_internal/config-files.js";
import { createTypedRule } from "../_internal/typed-rule.js";

type MessageId = "missingCleanUrls";

const cleanUrlsPathSuffix = ["cleanUrls"] as const;

const isVitePressConfigFile = (filename: string): boolean => {
    const normalized = normalizeFilename(filename).toLowerCase();

    return /(?:^|\/)\.vitepress\/config\./u.test(normalized);
};

/**
 * Require explicit `cleanUrls` in `.vitepress/config.*` for predictable deploy
 * behavior.
 */
const requireVitePressCleanUrlsExplicitRule: ReturnType<
    typeof createTypedRule
> = createTypedRule<[], MessageId>({
    create(context) {
        if (
            getConfigFileKind(context.filename) === null ||
            !isVitePressConfigFile(context.filename)
        ) {
            return {};
        }

        let hasCleanUrls = false;

        return {
            "Program:exit"(node) {
                if (hasCleanUrls) {
                    return;
                }

                context.report({
                    messageId: "missingCleanUrls",
                    node,
                });
            },
            Property(node) {
                if (
                    !propertyPathEndsWith(
                        getPropertyPath(node),
                        cleanUrlsPathSuffix
                    )
                ) {
                    return;
                }

                hasCleanUrls = true;
            },
        };
    },
    meta: {
        deprecated: false,
        docs: {
            description:
                "require explicit `cleanUrls` in committed VitePress config.",
            frozen: false,
            recommended: false,
            requiresTypeChecking: false,
            url: "https://nick2bad4u.github.io/eslint-plugin-vite/docs/rules/require-vitepress-clean-urls-explicit",
            viteConfigs: [
                "vite.configs.strict",
                "vite.configs.all",
                "vite.configs.vitepress",
            ],
        },
        messages: {
            missingCleanUrls:
                "Set `cleanUrls` explicitly in VitePress config so routing behavior is intentional across environments.",
        },
        schema: [],
        type: "suggestion",
    },
    name: "require-vitepress-clean-urls-explicit",
});

export default requireVitePressCleanUrlsExplicitRule;
