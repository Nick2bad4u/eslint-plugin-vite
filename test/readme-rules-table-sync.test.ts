import { readFileSync } from "node:fs";
import * as path from "node:path";
import { describe, expect, it } from "vitest";

import {
    README_RULES_END,
    README_RULES_START,
    renderReadmeRulesTable,
} from "../scripts/sync-readme-rules-table.mjs";

const normalizeLineEndings = (contents: string): string =>
    contents.replaceAll("\r\n", "\n");

const readGeneratedSection = (contents: string) => {
    const startIndex = contents.indexOf(README_RULES_START);
    const endIndex = contents.indexOf(README_RULES_END);

    return normalizeLineEndings(
        contents.slice(startIndex, endIndex + README_RULES_END.length)
    );
};

describe("rEADME rules table sync", () => {
    it("matches the generated rules table", () => {
        const readme = readFileSync(
            path.join(process.cwd(), "README.md"),
            "utf8"
        );
        const expectedSection = normalizeLineEndings(
            `${README_RULES_START}\n${renderReadmeRulesTable()}\n${README_RULES_END}`
        );

        expect(readGeneratedSection(readme)).toBe(expectedSection);
    });
});
