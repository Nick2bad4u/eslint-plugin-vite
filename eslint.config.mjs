import nick2bad4u from "eslint-config-nick2bad4u";

import vite from "./plugin.mjs";

/** @type {import("eslint").Linter.Config[]} */
const config = [
    ...nick2bad4u.configs.withoutVite,

    // Local Plugin Config
    // This lets us use the plugin's rules in this repository without needing to publish the plugin first.
    {
        files: ["src/**/*.{js,mjs,cjs,ts,mts,cts,tsx,jsx}"],
        name: "Local Vite",
        plugins: {
            vite: vite,
        },
        rules: {
            ...vite.configs.all.rules,
        },
    },
    // Add repository-specific config entries below as needed.
];

export default config;
