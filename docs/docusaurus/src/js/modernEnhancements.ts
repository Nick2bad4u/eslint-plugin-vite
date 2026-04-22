/**
 * Lightweight client-side enhancement bootstrap for the docs app.
 *
 * This module intentionally avoids framework coupling and only applies safe,
 * idempotent DOM tweaks after route changes.
 */

/** Delay used to wait for the current page content to settle. */
const ROUTE_REFRESH_DELAY_MS = 80;

/**
 * Add rel attributes to external links opened in a new tab.
 */
const hardenExternalLinks = (): void => {
    const links =
        document.querySelectorAll<HTMLAnchorElement>('a[target="_blank"]');

    for (const link of links) {
        const relValues = new Set(
            (link.getAttribute("rel") ?? "")
                .split(/\s+/u)
                .map((value) => value.trim())
                .filter(Boolean)
        );

        relValues.add("noopener");
        relValues.add("noreferrer");

        link.setAttribute("rel", Array.from(relValues).join(" "));
    }
};

/**
 * Run all non-destructive DOM enhancements.
 */
const runEnhancements = (): void => {
    hardenExternalLinks();
};

/**
 * Schedule enhancement pass after route transitions.
 */
const scheduleEnhancements = (): void => {
    globalThis.setTimeout(runEnhancements, ROUTE_REFRESH_DELAY_MS);
};

if (
    typeof globalThis.window !== "undefined" &&
    typeof globalThis.document !== "undefined"
) {
    runEnhancements();
    globalThis.window.addEventListener("popstate", scheduleEnhancements);
    globalThis.window.addEventListener("hashchange", scheduleEnhancements);
}
