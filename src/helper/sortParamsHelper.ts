/**
 * Returns a query string with all params in their original order, but with
 * the "page" parameter moved to the end.
 */
export const sortParamsWithPageLast = (params: URLSearchParams): string => {
    const entries = Array.from(params.entries());
    const filtered = entries.filter(([key]) => key !== "page");
    const pageEntry = entries.find(([key]) => key === "page");

    const sorted = [...filtered];
    if (pageEntry) {
        sorted.push(pageEntry);
    }
    return new URLSearchParams(sorted).toString();
};
