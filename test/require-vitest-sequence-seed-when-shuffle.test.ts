import { describe, expect, it } from "vitest";

import requireVitestSequenceSeedWhenShuffleRule from "../src/rules/require-vitest-sequence-seed-when-shuffle.js";
import { createRuleTester } from "./_internal/ruleTester.js";

describe("require-vitest-sequence-seed-when-shuffle", () => {
    createRuleTester().run(
        "require-vitest-sequence-seed-when-shuffle",
        requireVitestSequenceSeedWhenShuffleRule,
        {
            invalid: [
                {
                    code: "import { defineConfig } from 'vitest/config'; export default defineConfig({ test: { sequence: { shuffle: true } } });",
                    errors: [{ messageId: "missingSequenceSeed" }],
                    filename: "vitest.config.ts",
                },
            ],
            valid: [
                {
                    code: "import { defineConfig } from 'vitest/config'; export default defineConfig({ test: { sequence: { shuffle: true, seed: 42 } } });",
                    filename: "vitest.config.ts",
                },
                {
                    code: "import { defineConfig } from 'vitest/config'; export default defineConfig({ test: { sequence: { shuffle: false } } });",
                    filename: "vitest.config.ts",
                },
            ],
        }
    );

    it("exposes rule metadata", () => {
        expect.hasAssertions();
        expect(
            requireVitestSequenceSeedWhenShuffleRule.meta.messages
        ).toBeDefined();
    });
});
