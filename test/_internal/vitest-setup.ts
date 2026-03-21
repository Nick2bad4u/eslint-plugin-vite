/* eslint-disable vitest/no-hooks, vitest/require-top-level-describe -- Global test setup needs a process-wide afterEach hook outside individual suites. */
import { afterEach, vi } from "vitest";

afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
});

/* eslint-enable vitest/no-hooks, vitest/require-top-level-describe -- Re-enable suite-only rules after the global cleanup hook setup. */
