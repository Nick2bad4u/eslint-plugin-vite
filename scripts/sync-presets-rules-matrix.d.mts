export interface PresetsRuleModule {
    readonly meta: {
        readonly docs: {
            readonly ruleNumber?: number | undefined;
            readonly viteConfigs?: readonly string[] | string | undefined;
        };
        readonly fixable?: "code" | undefined;
        readonly hasSuggestions?: boolean | undefined;
    };
}

export const PRESET_MATRIX_START: "<!-- begin generated preset matrix -->";
export const PRESET_MATRIX_END: "<!-- end generated preset matrix -->";
export const PRESET_RULES_START: "<!-- begin generated preset rules -->";
export const PRESET_RULES_END: "<!-- end generated preset rules -->";

export function renderPresetMatrix(plugin?: {
    readonly rules: Readonly<Record<string, PresetsRuleModule>>;
}): string;

export function renderPresetRulesTable(
    configName:
        | "recommended"
        | "strict"
        | "all"
        | "configs"
        | "client"
        | "vitepress"
        | "vitest"
        | "vitest-bench",
    plugin?: {
        readonly rules: Readonly<Record<string, PresetsRuleModule>>;
    }
): string;

export function replacePresetMatrix(markdown: string): string;

export function replacePresetRulesTable(
    markdown: string,
    configName:
        | "recommended"
        | "strict"
        | "all"
        | "configs"
        | "client"
        | "vitepress"
        | "vitest"
        | "vitest-bench"
): string;
