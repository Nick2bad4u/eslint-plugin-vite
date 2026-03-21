import { matchesPropertyPath } from "../_internal/ast.js";
import { isConfigFile } from "../_internal/config-files.js";
import { createTypedRule } from "../_internal/typed-rule.js";

type MessageId = "unsafeServerOption";

const isBooleanLiteral = (value: unknown, expected: boolean): boolean =>
    typeof value === "object" &&
    value !== null &&
    "type" in value &&
    value.type === "Literal" &&
    "value" in value &&
    value.value === expected;

const noUnsafeServerOptionsRule: ReturnType<typeof createTypedRule> =
    createTypedRule<[], MessageId>({
        create(context) {
            if (!isConfigFile(context.filename)) {
                return {};
            }

            return {
                Property(node) {
                    if (
                        (matchesPropertyPath(node, [
                            "server",
                            "allowedHosts",
                        ]) ||
                            matchesPropertyPath(node, [
                                "preview",
                                "allowedHosts",
                            ])) &&
                        isBooleanLiteral(node.value, true)
                    ) {
                        context.report({
                            data: {
                                guidance:
                                    "Use an explicit host allowlist instead of `true`; wildcard hosts weaken Vite's DNS rebinding protection.",
                                optionPath: matchesPropertyPath(node, [
                                    "server",
                                    "allowedHosts",
                                ])
                                    ? "server.allowedHosts"
                                    : "preview.allowedHosts",
                            },
                            messageId: "unsafeServerOption",
                            node: node.value,
                        });
                        return;
                    }

                    if (
                        (matchesPropertyPath(node, ["server", "cors"]) ||
                            matchesPropertyPath(node, ["preview", "cors"])) &&
                        isBooleanLiteral(node.value, true)
                    ) {
                        context.report({
                            data: {
                                guidance:
                                    "Prefer an explicit origin policy; `true` allows any website to request your dev or preview server.",
                                optionPath: matchesPropertyPath(node, [
                                    "server",
                                    "cors",
                                ])
                                    ? "server.cors"
                                    : "preview.cors",
                            },
                            messageId: "unsafeServerOption",
                            node: node.value,
                        });
                        return;
                    }

                    if (
                        matchesPropertyPath(node, [
                            "server",
                            "fs",
                            "strict",
                        ]) &&
                        isBooleanLiteral(node.value, false)
                    ) {
                        context.report({
                            data: {
                                guidance:
                                    "Keep Vite's filesystem sandbox enabled and expand `server.fs.allow` intentionally when you need extra paths.",
                                optionPath: "server.fs.strict",
                            },
                            messageId: "unsafeServerOption",
                            node: node.value,
                        });
                    }
                },
            };
        },
        defaultOptions: [],
        meta: {
            deprecated: false,
            docs: {
                description:
                    "disallow unsafe Vite server and preview options that weaken host, origin, or filesystem protections.",
                frozen: false,
                recommended: false,
                requiresTypeChecking: false,
                url: "https://nick2bad4u.github.io/eslint-plugin-vite/docs/rules/no-unsafe-server-options",
                viteConfigs: [
                    "vite.configs.strict",
                    "vite.configs.all",
                    "vite.configs.configs",
                ],
            },
            messages: {
                unsafeServerOption:
                    "Avoid unsafe Vite option `{{ optionPath }}`. {{ guidance }}",
            },
            schema: [],
            type: "problem",
        },
        name: "no-unsafe-server-options",
    });

export default noUnsafeServerOptionsRule;
