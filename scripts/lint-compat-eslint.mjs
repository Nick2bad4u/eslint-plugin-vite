#!/usr/bin/env node

import assert from "node:assert/strict";
import process from "node:process";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { ESLint } from "eslint";

const scriptPath = fileURLToPath(import.meta.url);
const repositoryRoot = resolve(dirname(scriptPath), "..");

/**
 * @typedef {Readonly<{
 *     code: string;
 *     expectedRuleIds: readonly string[];
 *     filePath: string;
 *     name: string;
 * }>} SmokeCase
 */

/**
 * @typedef {Readonly<{
 *     configs: Readonly<{
 *         configs: import("eslint").Linter.Config;
 *     }>;
 *     meta: Readonly<{
 *         namespace: string;
 *     }>;
 * }>} CompatPlugin
 */

/**
 * @param {readonly string[]} argumentList
 *
 * @returns {{ expectedEslintMajor: number | null }}
 */
const parseArguments = (argumentList) => {
    /** @type {number | null} */
    let expectedEslintMajor = null;

    for (const argument of argumentList) {
        if (!argument.startsWith("--expect-eslint-major=")) {
            throw new TypeError(`Unknown argument: ${argument}`);
        }

        const rawValue = argument.slice("--expect-eslint-major=".length);
        const numericValue = Number.parseInt(rawValue, 10);

        if (!Number.isInteger(numericValue) || numericValue <= 0) {
            throw new TypeError(
                `Expected a positive integer for --expect-eslint-major, received: ${rawValue}`
            );
        }

        expectedEslintMajor = numericValue;
    }

    return { expectedEslintMajor };
};

/**
 * @param {string} version
 *
 * @returns {number}
 */
const getMajorVersion = (version) => {
    const [rawMajorVersion] = version.split(".");
    const majorVersion = Number.parseInt(rawMajorVersion ?? "", 10);

    if (!Number.isInteger(majorVersion) || majorVersion <= 0) {
        throw new TypeError(
            `Unable to parse ESLint major version from: ${version}`
        );
    }

    return majorVersion;
};

/**
 * @param {CompatPlugin} vitePlugin
 *
 * @returns {readonly SmokeCase[]}
 */
const getSmokeCases = (vitePlugin) => {
    const configsPreset = vitePlugin.configs.configs;
    const presetRules = configsPreset.rules ?? {};

    assert.ok(
        presetRules["vite/config-require-define-config"] === "error",
        "Expected the configs preset to enable vite/config-require-define-config."
    );

    return [
        {
            code: "import { defineConfig } from 'vite'; export default defineConfig({});",
            expectedRuleIds: [],
            filePath: resolve(
                repositoryRoot,
                "temp",
                "eslint-compat",
                "valid",
                "vite.config.ts"
            ),
            name: "accepts defineConfig() in vite.config.ts",
        },
        {
            code: "export default { server: { port: 5173 } };",
            expectedRuleIds: ["vite/config-require-define-config"],
            filePath: resolve(
                repositoryRoot,
                "temp",
                "eslint-compat",
                "invalid",
                "vite.config.ts"
            ),
            name: "reports bare object export in vite.config.ts",
        },
    ];
};

/**
 * @param {CompatPlugin} vitePlugin
 *
 * @returns {ESLint}
 */
const createCompatEslint = (vitePlugin) =>
    new ESLint({
        cwd: repositoryRoot,
        ignore: false,
        overrideConfig: [vitePlugin.configs.configs],
        overrideConfigFile: true,
    });

/**
 * @param {import("eslint").ESLint.LintResult["messages"]} messages
 *
 * @returns {readonly string[]}
 */
const getRuleIds = (messages) =>
    messages
        .map((message) => message.ruleId)
        .filter((ruleId) => typeof ruleId === "string")
        .toSorted((left, right) => left.localeCompare(right));

const main = async () => {
    const { expectedEslintMajor } = parseArguments(process.argv.slice(2));
    const eslintMajorVersion = getMajorVersion(ESLint.version);

    if (
        expectedEslintMajor !== null &&
        eslintMajorVersion !== expectedEslintMajor
    ) {
        throw new Error(
            `Expected ESLint major ${expectedEslintMajor}, but found ${ESLint.version}.`
        );
    }

    const pluginModule = await import("../plugin.mjs");
    const vitePlugin = pluginModule.default;

    assert.equal(
        vitePlugin.meta.namespace,
        "vite",
        "Expected the public runtime entrypoint to expose the vite namespace."
    );

    const eslint = createCompatEslint(vitePlugin);

    for (const smokeCase of getSmokeCases(vitePlugin)) {
        const [result] = await eslint.lintText(smokeCase.code, {
            filePath: smokeCase.filePath,
            warnIgnored: false,
        });
        const actualRuleIds = getRuleIds(result?.messages ?? []);
        const expectedRuleIds = [...smokeCase.expectedRuleIds].toSorted(
            (left, right) => left.localeCompare(right)
        );

        assert.deepEqual(
            actualRuleIds,
            expectedRuleIds,
            `${smokeCase.name} failed under ESLint ${ESLint.version}.`
        );
    }

    process.stdout.write(
        `ESLint compatibility smoke check passed for ESLint ${ESLint.version}.\n`
    );
};

await main();
