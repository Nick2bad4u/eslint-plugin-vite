import { readFileSync } from "node:fs";
import * as path from "node:path";
import { describe, expect, it } from "vitest";

import {
    replacePresetMatrix,
    replacePresetRulesTable,
} from "../scripts/sync-presets-rules-matrix.mjs";
import { assertOrAutoWriteSyncedFile } from "./_internal/docs-sync.js";

const presetsDirectoryPath = path.join(
    process.cwd(),
    "docs",
    "rules",
    "presets"
);

const presetNames: readonly Parameters<typeof replacePresetRulesTable>[1][] = [
    "all",
    "client",
    "configs",
    "recommended",
    "strict",
    "vitepress",
    "vitest",
    "vitest-bench",
];

describe("preset docs sync", () => {
    it("matches the generated preset matrix", () => {
        const presetsIndexPath = path.join(presetsDirectoryPath, "index.md");
        const presetsIndexContents = readFileSync(presetsIndexPath, "utf8");

        expect(() => {
            assertOrAutoWriteSyncedFile({
                absolutePath: presetsIndexPath,
                currentContents: presetsIndexContents,
                nextContents: replacePresetMatrix(presetsIndexContents),
                syncCommand: "npm run sync:presets-rules-matrix:write",
            });
        }).not.toThrow();
    });

    it("matches the generated per-preset rule tables", () => {
        for (const presetName of presetNames) {
            const presetPath = path.join(
                presetsDirectoryPath,
                `${presetName}.md`
            );
            const presetContents = readFileSync(presetPath, "utf8");

            expect(() => {
                assertOrAutoWriteSyncedFile({
                    absolutePath: presetPath,
                    currentContents: presetContents,
                    nextContents: replacePresetRulesTable(
                        presetContents,
                        presetName
                    ),
                    syncCommand: "npm run sync:presets-rules-matrix:write",
                });
            }).not.toThrow();
        }
    });
});
