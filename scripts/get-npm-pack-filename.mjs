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
    let candidates = [];

    if (Array.isArray(metadata)) {
        candidates = metadata;
    } else if (isRecord(metadata)) {
        candidates = Object.values(metadata).flatMap((value) =>
            Array.isArray(value) ? value : [value]
        );
    }

    const filenames = candidates
        .filter(isRecord)
        .map((candidate) => candidate["filename"])
        .filter((filename) => typeof filename === "string");

    if (filenames.length !== 1) {
        throw new Error(
            `Expected exactly one npm pack filename, received ${filenames.length}.`
        );
    }

    const filename = filenames[0];

    if (
        filename === "." ||
        filename === ".." ||
        filename.includes("/") ||
        filename.includes("\\")
    ) {
        throw new Error(
            "Expected npm pack metadata to contain a safe filename."
        );
    }

    return filename;
};

/** Read npm pack metadata from standard input without accepting a file path. */
const readStandardInput = async () => {
    const chunks = [];

    for await (const chunk of process.stdin) {
        chunks.push(chunk);
    }

    return Buffer.concat(chunks).toString("utf8");
};

const entryPath = process.argv[1];
const isMain =
    entryPath !== undefined &&
    import.meta.url === pathToFileURL(resolve(entryPath)).href;

if (isMain) {
    const metadata = JSON.parse(await readStandardInput());

    process.stdout.write(getNpmPackFilename(metadata));
}
