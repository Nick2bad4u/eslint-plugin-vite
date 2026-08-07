import { spawn } from "node:child_process";
import { access, mkdir, mkdtemp, readFile, rm } from "node:fs/promises";
import { findPackageJSON } from "node:module";
import { dirname, isAbsolute, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

import { getNpmPackFilename } from "./get-npm-pack-filename.mjs";

const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const temporaryRoot = join(repositoryRoot, "temp");

/**
 * @param {unknown} value - Value to test.
 *
 * @returns {value is Record<string, unknown>} Whether the value is a record.
 */
const isRecord = (value) =>
    typeof value === "object" && value !== null && !Array.isArray(value);

/**
 * Run a command and optionally capture its standard output.
 *
 * @param {string} command - Executable to run.
 * @param {readonly string[]} arguments_ - Arguments passed to the executable.
 * @param {boolean} [captureStandardOutput] - Whether to capture standard
 *   output.
 *
 * @returns {Promise<string>} The captured standard output, when requested.
 */
const runCommand = async (command, arguments_, captureStandardOutput = false) =>
    new Promise((resolvePromise, rejectPromise) => {
        const invocation = [command, ...arguments_]
            .map((argument) => JSON.stringify(argument))
            .join(" ");
        const child = spawn(command, arguments_, {
            cwd: repositoryRoot,
            env: process.env,
            stdio: [
                "inherit",
                captureStandardOutput ? "pipe" : "inherit",
                "inherit",
            ],
        });
        /** @type {string[]} */
        const outputChunks = [];

        /** @param {string} chunk - Standard-output chunk. */
        const collectOutput = (chunk) => {
            outputChunks.push(chunk);
        };

        if (captureStandardOutput) {
            child.stdout?.setEncoding("utf8");
            child.stdout?.on("data", collectOutput);
        }

        child.on("error", (error) => {
            rejectPromise(
                new Error(`Unable to start ${invocation}.`, { cause: error })
            );
        });
        child.on("close", (exitCode, signal) => {
            if (exitCode === null) {
                rejectPromise(
                    new Error(
                        `${invocation} was terminated by signal ${signal ?? "unknown"}.`
                    )
                );
                return;
            }

            if (exitCode !== 0) {
                rejectPromise(
                    new Error(`${invocation} exited with code ${exitCode}.`)
                );
                return;
            }

            resolvePromise(outputChunks.join(""));
        });
    });

/**
 * Resolve a declared package binary without assuming its internal layout.
 *
 * @param {string} packageName - Installed package name.
 * @param {string} executableName - Key in the package's bin map.
 */
const resolvePackageBinary = async (packageName, executableName) => {
    const manifestPath = findPackageJSON(packageName, import.meta.url);

    if (manifestPath === undefined) {
        throw new Error(`Unable to locate ${packageName}/package.json.`);
    }

    /** @type {unknown} */
    const manifest = JSON.parse(await readFile(manifestPath, "utf8"));

    if (!isRecord(manifest)) {
        throw new Error(`${packageName}/package.json is not an object.`);
    }

    const bin = manifest["bin"];
    const declaredPath =
        typeof bin === "string"
            ? bin
            : isRecord(bin) && typeof bin[executableName] === "string"
              ? bin[executableName]
              : undefined;

    if (declaredPath === undefined) {
        throw new Error(
            `${packageName} does not declare the ${executableName} binary.`
        );
    }

    const packageRoot = dirname(manifestPath);
    const executablePath = resolve(packageRoot, declaredPath);
    const relativePath = relative(packageRoot, executablePath);

    if (
        relativePath === ".." ||
        relativePath.startsWith(`..${sep}`) ||
        isAbsolute(relativePath)
    ) {
        throw new Error(
            `${packageName} declares a binary outside its package directory.`
        );
    }

    return executablePath;
};

/** Resolve CLI entrypoints from installed package manifests. */
const resolveCliEntrypoints = async () => {
    const [attw, publint] = await Promise.all([
        resolvePackageBinary("@arethetypeswrong/cli", "attw"),
        resolvePackageBinary("publint", "publint"),
    ]);

    return {
        attw,
        publint,
    };
};

/** Pack once with the active npm CLI and run package analyzers on that tarball. */
const lintPackageTarball = async () => {
    const npmExecutable = process.env["npm_execpath"];

    if (npmExecutable === undefined || npmExecutable.length === 0) {
        throw new Error(
            "npm_execpath is unavailable. Run this check through its npm script."
        );
    }

    const arguments_ = process.argv.slice(2);
    const publintOnly = arguments_.includes("--publint-only");
    const attwArguments = arguments_.filter(
        (argument) => argument !== "--publint-only"
    );
    const cli = await resolveCliEntrypoints();

    await Promise.all([access(cli.publint), access(cli.attw)]);
    await mkdir(temporaryRoot, { recursive: true });

    const packDirectory = await mkdtemp(join(temporaryRoot, "package-check-"));
    let succeeded = false;

    try {
        const packOutput = await runCommand(
            process.execPath,
            [
                npmExecutable,
                "pack",
                "--json",
                "--ignore-scripts",
                "--pack-destination",
                packDirectory,
            ],
            true
        );
        const filename = getNpmPackFilename(JSON.parse(packOutput));
        const tarball = join(packDirectory, filename);

        await access(tarball);
        await runCommand(process.execPath, [
            cli.publint,
            "run",
            tarball,
        ]);

        if (!publintOnly) {
            await runCommand(process.execPath, [
                cli.attw,
                ...attwArguments,
                tarball,
            ]);
        }

        succeeded = true;
    } finally {
        if (succeeded) {
            await rm(packDirectory, { force: true, recursive: true });
        } else {
            console.error(`Preserved package-check files at ${packDirectory}`);
        }
    }
};

try {
    await lintPackageTarball();
} catch (error) {
    console.error(error);
    process.exitCode = 1;
}
