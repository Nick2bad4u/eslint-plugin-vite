/** Canonical flat-config preset keys exposed through `plugin.configs`. */
export const viteConfigNames = [
    "recommended",
    "strict",
    "all",
    "configs",
    "client",
    "vitepress",
    "vitest",
    "vitest-bench",
] as const;

/** Metadata contract shared across preset wiring, docs, and README rendering. */
export type ViteConfigMetadata = Readonly<{
    description: string;
    icon: string;
    presetName: `vite:${ViteConfigName}`;
    readmeOrder: number;
    requiresTypeChecking: boolean;
}>;

/** Canonical flat-config preset key type exposed through `plugin.configs`. */
export type ViteConfigName = (typeof viteConfigNames)[number];

/** Canonical metadata for every exported preset key. */
export const viteConfigMetadataByName: Readonly<
    Record<ViteConfigName, ViteConfigMetadata>
> = {
    all: {
        description: "Every rule shipped by eslint-plugin-vite.",
        icon: "🟣",
        presetName: "vite:all",
        readmeOrder: 3,
        requiresTypeChecking: false,
    },
    client: {
        description:
            "Rules for client-side Vite source that uses import.meta.env and import.meta.glob.",
        icon: "🌐",
        presetName: "vite:client",
        readmeOrder: 5,
        requiresTypeChecking: false,
    },
    configs: {
        description:
            "Rules for Vite and Vitest config files, including env, alias, deprecation, and server-hardening checks.",
        icon: "⚙️",
        presetName: "vite:configs",
        readmeOrder: 4,
        requiresTypeChecking: false,
    },
    recommended: {
        description:
            "Balanced default preset for common Vite, Vitest, and workspace pitfalls.",
        icon: "🟡",
        presetName: "vite:recommended",
        readmeOrder: 1,
        requiresTypeChecking: false,
    },
    strict: {
        description:
            "Recommended rules plus stricter guidance for config migrations, server safety, env access, and Vitest workspaces.",
        icon: "🔴",
        presetName: "vite:strict",
        readmeOrder: 2,
        requiresTypeChecking: false,
    },
    vitepress: {
        description:
            "Rules focused on VitePress sites that rely on Vite client APIs and public env handling.",
        icon: "📚",
        presetName: "vite:vitepress",
        readmeOrder: 6,
        requiresTypeChecking: false,
    },
    vitest: {
        description:
            "Rules focused on Vitest config files, workspaces, and project organization.",
        icon: "🧪",
        presetName: "vite:vitest",
        readmeOrder: 7,
        requiresTypeChecking: false,
    },
    "vitest-bench": {
        description:
            "Rules focused on Vitest bench files and keeping benchmark suites separate from test suites.",
        icon: "🏎️",
        presetName: "vite:vitest-bench",
        readmeOrder: 8,
        requiresTypeChecking: false,
    },
};

/** Stable README legend/rendering order for preset icons. */
export const viteConfigNamesByReadmeOrder: readonly ViteConfigName[] = [
    "recommended",
    "strict",
    "all",
    "configs",
    "client",
    "vitepress",
    "vitest",
    "vitest-bench",
];

/** Metadata references supported in `meta.docs.viteConfigs`. */
export const viteConfigReferenceToName: Readonly<{
    "vite.configs.all": "all";
    "vite.configs.client": "client";
    "vite.configs.configs": "configs";
    "vite.configs.recommended": "recommended";
    "vite.configs.strict": "strict";
    "vite.configs.vitepress": "vitepress";
    "vite.configs.vitest": "vitest";
    "vite.configs.vitest-bench": "vitest-bench";
    'vite.configs["vitest-bench"]': "vitest-bench";
}> = {
    "vite.configs.all": "all",
    "vite.configs.client": "client",
    "vite.configs.configs": "configs",
    "vite.configs.recommended": "recommended",
    "vite.configs.strict": "strict",
    "vite.configs.vitepress": "vitepress",
    "vite.configs.vitest": "vitest",
    "vite.configs.vitest-bench": "vitest-bench",
    'vite.configs["vitest-bench"]': "vitest-bench",
};

/** Fully-qualified preset reference type accepted in docs metadata. */
export type ViteConfigReference = keyof typeof viteConfigReferenceToName;

/** Check whether a string is a supported preset reference. */
export const isViteConfigReference = (
    value: string
): value is ViteConfigReference =>
    Object.hasOwn(viteConfigReferenceToName, value);
