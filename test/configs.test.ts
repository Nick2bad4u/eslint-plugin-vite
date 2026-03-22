import { describe, expect, it } from "vitest";

import type { ViteConfigName } from "../src/plugin.js";

import vitePlugin from "../src/plugin.js";

const getRuleIds = (configName: ViteConfigName) =>
    Object.keys(vitePlugin.configs[configName].rules).toSorted((left, right) =>
        left.localeCompare(right)
    );

describe("plugin configs", () => {
    it("exposes every documented preset key", () => {
        expect(
            Object.keys(vitePlugin.configs).toSorted((left, right) =>
                left.localeCompare(right)
            )
        ).toEqual([
            "all",
            "client",
            "configs",
            "recommended",
            "strict",
            "vitepress",
            "vitest",
            "vitest-bench",
        ]);
    });

    it("registers the plugin on every config", () => {
        for (const config of Object.values(vitePlugin.configs)) {
            expect(config.plugins?.["vite"]).toBeDefined();
            expect(config.languageOptions?.["parser"]).toBeDefined();
        }
    });

    it("keeps strict and all as supersets", () => {
        const recommendedRuleIds = new Set(getRuleIds("recommended"));
        const strictRuleIds = new Set(getRuleIds("strict"));
        const allRuleIds = new Set(getRuleIds("all"));

        for (const ruleId of recommendedRuleIds) {
            expect(strictRuleIds.has(ruleId)).toBeTruthy();
            expect(allRuleIds.has(ruleId)).toBeTruthy();
        }

        for (const ruleId of strictRuleIds) {
            expect(allRuleIds.has(ruleId)).toBeTruthy();
        }
    });
});
