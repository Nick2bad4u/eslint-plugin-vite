import { writeFileSync } from "node:fs";

const getProcessEnv = (): Record<string, string | undefined> => {
    const processValue: unknown = Reflect.get(globalThis, "process");

    if (
        processValue === null ||
        typeof processValue !== "object" ||
        !("env" in processValue)
    ) {
        return {};
    }

    const processEnv: unknown = Reflect.get(processValue, "env");

    if (processEnv === null || typeof processEnv !== "object") {
        return {};
    }

    const normalizedEnv: Record<string, string | undefined> = {};

    for (const [envKey, envValue] of Object.entries(processEnv)) {
        if (typeof envValue === "string" || envValue === undefined) {
            normalizedEnv[envKey] = envValue;
        }
    }

    return normalizedEnv;
};

const isCiEnvironment = (): boolean => {
    const ci = getProcessEnv()["CI"];

    return ci === "1" || ci === "true";
};

/**
 * Auto-writes generated docs updates during local test runs by default.
 *
 * Set `VITE_DOCS_SYNC_AUTO_WRITE=0` to disable local auto-write behavior.
 */
const shouldAutoWriteSyncedDocs = (): boolean =>
    !isCiEnvironment() && getProcessEnv()["VITE_DOCS_SYNC_AUTO_WRITE"] !== "0";

type AssertOrAutoWriteSyncedFileOptions = Readonly<{
    absolutePath: string;
    currentContents: string;
    nextContents: string;
    syncCommand: string;
}>;

/**
 * Ensure generated docs are synchronized. During local runs, stale files are
 * auto-updated to keep rule-development workflows frictionless; during CI, the
 * mismatch fails with an actionable command.
 */
export const assertOrAutoWriteSyncedFile = ({
    absolutePath,
    currentContents,
    nextContents,
    syncCommand,
}: AssertOrAutoWriteSyncedFileOptions): void => {
    if (currentContents === nextContents) {
        return;
    }

    if (shouldAutoWriteSyncedDocs()) {
        writeFileSync(absolutePath, nextContents, "utf8");

        return;
    }

    throw new Error(
        [
            "Generated docs are out of sync.",
            `Run: ${syncCommand}`,
            "To auto-write during local tests, leave `VITE_DOCS_SYNC_AUTO_WRITE` unset or set it to `1`.",
        ].join("\n")
    );
};
