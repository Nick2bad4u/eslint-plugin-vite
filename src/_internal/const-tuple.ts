import type { UnknownArray } from "type-fest";

/** Preserve literal tuple inference without relying on `as const` assertions. */
export const constTuple = <const TValues extends Readonly<UnknownArray>>(
    ...values: TValues
): TValues => values;
