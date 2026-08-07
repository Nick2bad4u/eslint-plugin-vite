import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

/** Determine whether a value is a non-array object. */
const isRecord = (value) =>
    typeof value === "object" && value !== null && !Array.isArray(value);

/**
 * Extract the single tarball filename from npm pack JSON metadata.
 *
 * Npm 11 emits an array while npm 12 can emit an object keyed by package name.
 */
export const getNpmPackFilename = (metadata) => {
    const candidates = Array.isArray(metadata)
        ? metadata
        : isRecord(metadata)
          ? Object.values(metadata).flatMap((value) =>
                Array.isArray(value) ? value : [value]
            )
          : [];
    const filenames = candidates
        .filter(isRecord)
        .map((candidate) => candidate["filename"])
        .filter((filename) => typeof filename === "string");

    if (filenames.length !== 1) {
        throw new Error(
            `Expected exactly one npm pack filename, received ${filenames.length}.`
        );
    }

    return filenames[0];
};

const entryPath = process.argv[1];
const isMain =
    entryPath !== undefined &&
    import.meta.url === pathToFileURL(resolve(entryPath)).href;

if (isMain) {
    const metadataPath = process.argv[2];

    if (metadataPath === undefined) {
        throw new Error("Usage: node scripts/get-npm-pack-filename.mjs <path>");
    }

    const metadata = JSON.parse(await readFile(metadataPath, "utf8"));

    process.stdout.write(getNpmPackFilename(metadata));
}
