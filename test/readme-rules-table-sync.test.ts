import { readFileSync } from "node:fs";
import * as path from "node:path";
import { describe, expect, it } from "vitest";

import { replaceReadmeRulesTable } from "../scripts/sync-readme-rules-table.mjs";
import { assertOrAutoWriteSyncedFile } from "./_internal/docs-sync.js";

const readmePath = path.join(process.cwd(), "README.md");

describe("rEADME rules table sync", () => {
    it("matches the generated rules table", () => {
        expect.hasAssertions();

        const readme = readFileSync(readmePath, "utf8");

        expect(() => {
            assertOrAutoWriteSyncedFile({
                absolutePath: readmePath,
                currentContents: readme,
                nextContents: replaceReadmeRulesTable(readme),
                syncCommand: "npm run sync:readme-rules-table:write",
            });
        }).not.toThrow();
    });
});
