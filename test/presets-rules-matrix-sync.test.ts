import { readFileSync } from "node:fs";
import * as path from "node:path";
import { describe, expect, it } from "vitest";

import {
    PRESET_MATRIX_END,
    PRESET_MATRIX_START,
    PRESET_RULES_END,
    PRESET_RULES_START,
    renderPresetMatrix,
    renderPresetRulesTable,
} from "../scripts/sync-presets-rules-matrix.mjs";

const normalizeLineEndings = (contents: string): string =>
    contents.replaceAll("\r\n", "\n");

const readSection = (
    contents: string,
    startMarker: string,
    endMarker: string
) => {
    const startIndex = contents.indexOf(startMarker);
    const endIndex = contents.indexOf(endMarker);

    return normalizeLineEndings(
        contents.slice(startIndex, endIndex + endMarker.length)
    );
};

const presetNames = [
    "all",
    "client",
    "configs",
    "recommended",
    "strict",
    "vitest",
    "vitest-bench",
] as const;

describe("preset docs sync", () => {
    it("matches the generated preset matrix", () => {
        const contents = readFileSync(
            path.join(process.cwd(), "docs", "rules", "presets", "index.md"),
            "utf8"
        );

        expect(
            readSection(contents, PRESET_MATRIX_START, PRESET_MATRIX_END)
        ).toBe(
            normalizeLineEndings(
                `${PRESET_MATRIX_START}\n${renderPresetMatrix()}\n${PRESET_MATRIX_END}`
            )
        );
    });

    it("matches the generated per-preset rule tables", () => {
        for (const presetName of presetNames) {
            const contents = readFileSync(
                path.join(
                    process.cwd(),
                    "docs",
                    "rules",
                    "presets",
                    `${presetName}.md`
                ),
                "utf8"
            );

            expect(
                readSection(contents, PRESET_RULES_START, PRESET_RULES_END)
            ).toBe(
                normalizeLineEndings(
                    `${PRESET_RULES_START}\n${renderPresetRulesTable(presetName)}\n${PRESET_RULES_END}`
                )
            );
        }
    });
});
