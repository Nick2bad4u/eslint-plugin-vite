export interface ReadmeRuleModule {
    readonly meta: {
        readonly docs: {
            readonly description?: string | undefined;
            readonly ruleNumber?: number | undefined;
            readonly viteConfigs?: readonly string[] | string | undefined;
        };
        readonly fixable?: "code" | undefined;
        readonly hasSuggestions?: boolean | undefined;
    };
}

export const README_RULES_START: "<!-- begin generated rules table -->";
export const README_RULES_END: "<!-- end generated rules table -->";

export function renderPresetLegend(): string;

export function renderReadmeRulesTable(plugin?: {
    readonly rules: Readonly<Record<string, ReadmeRuleModule>>;
}): string;

export function replaceReadmeRulesTable(markdown: string): string;
