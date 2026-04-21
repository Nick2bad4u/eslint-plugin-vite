import { describe, expect, it } from "vitest";

import { validateRuleCatalogIntegrity } from "../src/_internal/rule-catalog.js";

describe("rule catalog", () => {
    it("keeps stable sequential rule ids", () => {
        expect.hasAssertions();
        expect(validateRuleCatalogIntegrity()).toBeTruthy();
    });
});
