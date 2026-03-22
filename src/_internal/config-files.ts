/** Supported config file kinds recognized by the plugin. */
export type ConfigFileKind = "vite" | "vitest" | "workspace";

const viteConfigFilePattern = /(?:^|[/\\])vite\.config\.[cm]?[jt]sx?$/u;
const vitePressConfigFilePattern =
    /(?:^|[/\\])\.vitepress[/\\]config\.[cm]?[jt]sx?$/u;
const vitestConfigFilePattern = /(?:^|[/\\])vitest\.config\.[cm]?[jt]sx?$/u;
const vitestWorkspaceFilePattern =
    /(?:^|[/\\])vitest\.workspace\.[cm]?[jt]sx?$/u;
const testDirectoryPattern = /(?:^|[/\\])(?:test|tests)(?:[/\\]|$)/u;
const testFilenamePattern = /\.(?:bench|spec|test)\.[cm]?[jt]sx?$/u;

/** Normalize a filename to forward-slash separators for cross-platform matching. */
export const normalizeFilename = (filename: string): string =>
    filename.replaceAll("\\", "/");

/** Resolve the recognized config file kind from a filename. */
export const getConfigFileKind = (filename: string): ConfigFileKind | null => {
    const normalizedFilename = normalizeFilename(filename);

    if (vitestWorkspaceFilePattern.test(normalizedFilename)) {
        return "workspace";
    }

    if (vitestConfigFilePattern.test(normalizedFilename)) {
        return "vitest";
    }

    if (
        viteConfigFilePattern.test(normalizedFilename) ||
        vitePressConfigFilePattern.test(normalizedFilename)
    ) {
        return "vite";
    }

    return null;
};

/** Check whether the file is a recognized Vite or Vitest config file. */
export const isConfigFile = (filename: string): boolean =>
    getConfigFileKind(filename) !== null;

/** Check whether the file looks like a test or benchmark source file. */
export const isTestLikeFile = (filename: string): boolean =>
    testDirectoryPattern.test(normalizeFilename(filename)) ||
    testFilenamePattern.test(normalizeFilename(filename));

/** Check whether a file is a likely client/runtime source file. */
export const isLikelyClientFile = (filename: string): boolean =>
    !isConfigFile(filename) && !isTestLikeFile(filename);
