import { describe, expect, it } from "vitest";

import { getNpmPackFilename } from "../scripts/get-npm-pack-filename.mjs";

describe("npm pack metadata", () => {
    it("reads npm 11 array output", () => {
        expect.hasAssertions();

        expect(
            getNpmPackFilename([{ filename: "typpi-eslint-plugin-vite.tgz" }])
        ).toBe("typpi-eslint-plugin-vite.tgz");
    });

    it("reads npm 12 package-keyed object output", () => {
        expect.hasAssertions();

        expect(
            getNpmPackFilename({
                "@typpi/eslint-plugin-vite": {
                    filename: "typpi-eslint-plugin-vite.tgz",
                },
            })
        ).toBe("typpi-eslint-plugin-vite.tgz");
    });

    it("reads package-keyed array values", () => {
        expect.hasAssertions();

        expect(
            getNpmPackFilename({
                "@typpi/eslint-plugin-vite": [
                    { filename: "typpi-eslint-plugin-vite.tgz" },
                ],
            })
        ).toBe("typpi-eslint-plugin-vite.tgz");
    });

    it("rejects metadata without a filename", () => {
        expect.hasAssertions();

        expect(() => getNpmPackFilename({})).toThrow(
            "Expected exactly one npm pack filename, received 0."
        );
    });

    it("rejects ambiguous workspace metadata", () => {
        expect.hasAssertions();

        expect(() =>
            getNpmPackFilename([
                { filename: "first.tgz" },
                { filename: "second.tgz" },
            ])
        ).toThrow("Expected exactly one npm pack filename, received 2.");
    });

    it("rejects filenames that can escape the package directory", () => {
        expect.hasAssertions();

        expect(() =>
            getNpmPackFilename([{ filename: "../unexpected.tgz" }])
        ).toThrow("Expected npm pack metadata to contain a safe filename.");
    });
});
