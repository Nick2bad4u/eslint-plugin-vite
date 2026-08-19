import jsonPlugin from "@eslint/json";
import { ESLint } from "eslint";
import { describe, expect, it } from "vitest";

import type { ViteConfigName } from "../src/plugin.js";

import vitePlugin from "../src/plugin.js";

const getRuleIds = (configName: ViteConfigName) =>
    Object.keys(vitePlugin.configs[configName].rules).toSorted((left, right) =>
        left.localeCompare(right)
    );

describe("plugin configs", () => {
    it("exposes every documented preset key", () => {
        expect.hasAssertions();
        expect(
            Object.keys(vitePlugin.configs).toSorted((left, right) =>
                left.localeCompare(right)
            )
        ).toStrictEqual([
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
        expect.hasAssertions();

        for (const config of Object.values(vitePlugin.configs)) {
            expect(config.plugins?.["vite"]).toBeDefined();
            expect(config.languageOptions?.["parser"]).toBeDefined();
        }
    });

    it("scopes every preset to JavaScript and TypeScript files", () => {
        expect.hasAssertions();

        for (const config of Object.values(vitePlugin.configs)) {
            expect(config.files).toStrictEqual([
                "**/*.{js,cjs,mjs,jsx,ts,cts,mts,tsx}",
            ]);
        }
    });

    it("declares JavaScript as the only supported rule language", () => {
        expect.hasAssertions();

        for (const rule of Object.values(vitePlugin.rules)) {
            expect(rule.meta).toHaveProperty("languages", ["js/js"]);
        }
    });

    it("does not apply a preset to ESLint's JSON language", async () => {
        expect.hasAssertions();

        const eslint = new ESLint({
            overrideConfig: [
                {
                    files: ["**/*.json"],
                    language: "json/json",
                    plugins: { json: jsonPlugin },
                },
                vitePlugin.configs.recommended,
            ],
            overrideConfigFile: true,
        });

        const [result] = await eslint.lintText('{"name":"vite"}', {
            filePath: "fixture.json",
        });

        expect(result?.errorCount).toBe(0);
        expect(result?.warningCount).toBe(0);
    });

    it("keeps strict and all as supersets", () => {
        expect.hasAssertions();

        const recommendedRuleIds = new Set(getRuleIds("recommended"));
        const strictRuleIds = new Set(getRuleIds("strict"));
        const allRuleIds = new Set(getRuleIds("all"));

        for (const ruleId of recommendedRuleIds) {
            expect(strictRuleIds.has(ruleId)).toBe(true);
            expect(allRuleIds.has(ruleId)).toBe(true);
        }

        for (const ruleId of strictRuleIds) {
            expect(allRuleIds.has(ruleId)).toBe(true);
        }
    });
});
