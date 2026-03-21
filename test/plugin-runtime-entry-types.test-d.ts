import type { ESLint } from "eslint";

import vitePlugin from "../plugin.mjs";

const runtimePlugin = vitePlugin as unknown as ESLint.Plugin;

runtimePlugin satisfies ESLint.Plugin;
