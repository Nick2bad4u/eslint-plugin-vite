// @ts-check

import { readFile, writeFile } from "node:fs/promises";

const sourcePath = new URL("../plugin.d.cts", import.meta.url);
const outputPath = new URL("../dist/plugin.d.cts", import.meta.url);
const sourceImportPath = '"./plugin.d.mts"';
const emittedImportPath = '"../plugin.d.mts"';

const declarationSource = await readFile(sourcePath, "utf8");

if (!declarationSource.includes(sourceImportPath)) {
    throw new Error(
        `Expected ${sourcePath.pathname} to reference ${sourceImportPath}.`
    );
}

const emittedDeclaration = declarationSource.replaceAll(
    sourceImportPath,
    emittedImportPath
);

await writeFile(outputPath, emittedDeclaration);
