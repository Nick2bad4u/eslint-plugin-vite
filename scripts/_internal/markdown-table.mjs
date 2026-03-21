/**
 * Detect the dominant line ending for a text file.
 *
 * @param {string} contents
 *
 * @returns {"\n" | "\r\n"}
 */
export const detectLineEnding = (contents) =>
    contents.includes("\r\n") ? "\r\n" : "\n";

/** @typedef {"left" | "center" | "right"} MarkdownTableAlignment */

/**
 * Pad a cell according to the target alignment.
 *
 * @param {string} value
 * @param {number} width
 * @param {MarkdownTableAlignment} alignment
 *
 * @returns {string}
 */
const padCell = (value, width, alignment) => {
    if (alignment === "right") {
        return value.padStart(width);
    }

    if (alignment === "center") {
        const totalPadding = width - value.length;
        const leftPadding = Math.floor(totalPadding / 2);
        const rightPadding = totalPadding - leftPadding;

        return `${" ".repeat(leftPadding)}${value}${" ".repeat(rightPadding)}`;
    }

    return value.padEnd(width);
};

/**
 * Render an alignment marker for a markdown table column.
 *
 * @param {number} width
 * @param {MarkdownTableAlignment} alignment
 *
 * @returns {string}
 */
const renderAlignmentCell = (width, alignment) => {
    const safeWidth = Math.max(width, 3);

    if (alignment === "right") {
        return `${"-".repeat(safeWidth - 1)}:`;
    }

    if (alignment === "center") {
        return `:${"-".repeat(safeWidth - 2)}:`;
    }

    return `:${"-".repeat(safeWidth - 1)}`;
};

/**
 * Render a markdown table with deterministic spacing.
 *
 * @param {readonly string[][]} rows
 * @param {readonly MarkdownTableAlignment[]} alignments
 *
 * @returns {string}
 */
export const renderMarkdownTable = (rows, alignments) => {
    if (rows.length === 0) {
        return "";
    }

    const [firstRow] = rows;

    if (firstRow === undefined) {
        return "";
    }

    const columnCount = firstRow.length;
    const columnWidths = Array.from({ length: columnCount }, (_, columnIndex) =>
        Math.max(...rows.map((row) => row[columnIndex]?.length ?? 0), 3)
    );

    /**
     * @param {readonly string[]} row
     *
     * @returns {string}
     */
    const renderRow = (row) =>
        `| ${row
            /**
             * @param {string} cell
             * @param {number} columnIndex
             *
             * @returns {string}
             */
            .map((cell, columnIndex) =>
                padCell(
                    cell,
                    columnWidths[columnIndex] ?? cell.length,
                    alignments[columnIndex] ?? "left"
                )
            )
            .join(" | ")} |`;

    const header = renderRow(firstRow);
    const separator = `| ${columnWidths
        .map((width, columnIndex) =>
            renderAlignmentCell(width, alignments[columnIndex] ?? "left")
        )
        .join(" | ")} |`;
    const body = rows.slice(1).map(renderRow);

    return [
        header,
        separator,
        ...body,
    ].join("\n");
};
