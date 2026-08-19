import { describe, expect, it } from "vitest";

import { transformManifest } from "../.npm-extension.mjs";

describe("npm dependency manifest extension", () => {
    it("widens only Madge 8's stale TypeScript peer range", () => {
        expect.hasAssertions();

        const publishedManifest = {
            name: "madge",
            peerDependencies: { typescript: "^5.4.4" },
            version: "8.0.0",
        };

        expect(transformManifest(publishedManifest)).toStrictEqual({
            ...publishedManifest,
            peerDependencies: { typescript: "^5.4.4 || ^6.0.2" },
        });
        expect(publishedManifest.peerDependencies.typescript).toBe("^5.4.4");
    });

    it("leaves unrelated packages and Madge majors unchanged", () => {
        expect.hasAssertions();

        const unrelatedManifest = {
            name: "other-package",
            version: "8.0.0",
        };
        const futureMadgeManifest = {
            name: "madge",
            peerDependencies: { typescript: ">=6" },
            version: "9.0.0",
        };

        expect(transformManifest(unrelatedManifest)).toBe(unrelatedManifest);
        expect(transformManifest(futureMadgeManifest)).toBe(
            futureMadgeManifest
        );
    });

    it.each([
        ["missing peer metadata", { name: "madge", version: "8.0.0" }],
        [
            "changed peer metadata",
            {
                name: "madge",
                peerDependencies: { typescript: "^5.4.4 || ^6" },
                version: "8.1.0",
            },
        ],
    ])("rejects Madge 8 with %s", (_caseName, manifest) => {
        expect.hasAssertions();

        expect(() => transformManifest(manifest)).toThrow(
            "no longer has the expected TypeScript peer range"
        );
    });
});
