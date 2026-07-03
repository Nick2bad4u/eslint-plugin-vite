import { existsSync, readFileSync } from "node:fs";
import * as path from "node:path";
import { describe, expect, it } from "vitest";

import vitePlugin from "../src/plugin.js";

interface RuleDocsWithCatalog {
    ruleId: string;
}

const requiredHeadings = [
    "## Targeted pattern scope",
    "## What this rule reports",
    "## Why this rule exists",
    "## ❌ Incorrect",
    "## ✅ Correct",
    "## Behavior and migration notes",
    "## ESLint flat config example",
    "## When not to use it",
    "## Package documentation",
    "## Further reading",
];

describe("rule docs integrity", () => {
    it("keeps every rule doc file present and aligned", () => {
        expect.hasAssertions();

        for (const [ruleName, ruleModule] of Object.entries(vitePlugin.rules)) {
            const docsPath = path.join(
                process.cwd(),
                "docs",
                "rules",
                `${ruleName}.md`
            );
            const docs = ruleModule.meta.docs as
                RuleDocsWithCatalog | undefined;

            expect(existsSync(docsPath)).toBe(true);

            const contents = readFileSync(docsPath, "utf8");

            expect(contents).toContain(`# ${ruleName}`);
            expect(docs?.ruleId).toBeDefined();

            if (docs?.ruleId === undefined) {
                throw new Error(`Missing rule catalog ID for ${ruleName}`);
            }

            expect(contents).toContain(`> **Rule catalog ID:** ${docs.ruleId}`);

            for (const heading of requiredHeadings) {
                expect(contents).toContain(heading);
            }
        }
    });
});
